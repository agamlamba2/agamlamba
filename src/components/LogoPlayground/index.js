import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import styled, { keyframes } from 'styled-components';
import colors from '../../assets/styles/variables/colors';
import { logos } from '../Companies';

/* Interactive "logo playground" (liminalrecruitment.com-style): the company
   logos drift down into the tank as physical chips and settle at the bottom,
   as if submerged in water — draggable and tossable with the mouse. */

const Section = styled.section`
  background: ${colors.bg};
  width: 100%;
  padding: 112px 96px 128px;

  @media (max-width: 1200px) {
    padding: 72px 48px 96px;
  }

  @media (max-width: 768px) {
    padding: 32px 20px 64px;
  }
`;

const causticsDrift = keyframes`
  0% { transform: translate3d(-4%, -2%, 0) scale(1.1); }
  50% { transform: translate3d(4%, 3%, 0) scale(1.25); }
  100% { transform: translate3d(-4%, -2%, 0) scale(1.1); }
`;

const surfaceShift = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: 200px 0; }
`;

const Label = styled.p`
  font-size: 26px;
  font-weight: 600;
  line-height: 40px;
  color: #8f8f8f;
  text-align: center;
  padding: 24px 0 48px;

  @media (max-width: 768px) {
    font-size: 1.25rem;
    line-height: 1.5;
  }
`;

const CanvasWrap = styled.div`
  position: relative;
  width: 100%;
  height: 560px;
  border-radius: 24px;
  overflow: hidden;
  /* Deep-water body + soft 5% primary-red glow (no border). */
  background: linear-gradient(180deg, #05171f 0%, #030c12 55%, #02080c 100%);
  box-shadow: 0 26px 80px rgba(226, 25, 73, 0.05), 0 4px 24px rgba(226, 25, 73, 0.05);

  @media (max-width: 768px) {
    height: 440px;
    border-radius: 16px;
  }

  canvas {
    position: relative;
    z-index: 1;
    display: block;
    width: 100%;
    height: 100%;
    cursor: grab;
    /* subtle refraction so the submerged chips ripple */
    filter: url(#waterWobble);
  }

  canvas:active {
    cursor: grabbing;
  }
`;

/* Rippling light on the "floor" of the tank. */
const Caustics = styled.div`
  position: absolute;
  inset: -20%;
  z-index: 2;
  pointer-events: none;
  mix-blend-mode: screen;
  opacity: 0.5;
  background:
    radial-gradient(38% 30% at 30% 40%, rgba(120, 220, 255, 0.16), transparent 60%),
    radial-gradient(30% 26% at 70% 60%, rgba(90, 190, 235, 0.14), transparent 60%),
    radial-gradient(44% 34% at 55% 25%, rgba(150, 235, 255, 0.12), transparent 60%);
  filter: blur(24px);
  animation: ${causticsDrift} 14s ease-in-out infinite;
`;

/* Cool depth tint + a shimmering surface line near the top. */
const WaterTint = styled.div`
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;
  background: linear-gradient(180deg, rgba(24, 130, 170, 0.16) 0%, rgba(6, 40, 66, 0.1) 45%, rgba(2, 12, 20, 0) 100%);
`;

const Surface = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  z-index: 4;
  pointer-events: none;
  background: repeating-linear-gradient(
    90deg,
    rgba(160, 235, 255, 0),
    rgba(160, 235, 255, 0.5) 40px,
    rgba(160, 235, 255, 0) 80px
  );
  opacity: 0.55;
  animation: ${surfaceShift} 6s linear infinite;
`;

const CHIP_PAD_X = 28; // horizontal padding inside each chip
const CHIP_PAD_Y = 18; // vertical padding inside each chip
const LOGO_SCALE = 1.35; // enlarge the grid logo heights for the canvas

export default function LogoPlayground() {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return undefined;

    const { Engine, Runner, Bodies, Body, Composite, Mouse, MouseConstraint } = Matter;

    let engine;
    let runner;
    let raf = 0;
    let disposed = false;
    const chips = []; // { body, img, w, h, logoW, logoH }

    // Preload logo images (CRA-inlined SVG urls are same-origin / data URIs).
    const images = logos.map((l) => {
      const img = new Image();
      img.src = l.src;
      return img;
    });
    let imagesReady = false;
    let inView = false;
    Promise.all(
      images.map(
        (img) =>
          new Promise((res) => {
            if (img.complete) res();
            else {
              img.onload = res;
              img.onerror = res;
            }
          })
      )
    ).then(() => {
      imagesReady = true;
      if (inView) start();
    });

    const start = () => {
      if (startedRef.current || disposed) return;
      startedRef.current = true;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const W = wrap.clientWidth;
      const H = wrap.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      const ctx = canvas.getContext('2d');
      ctx.scale(dpr, dpr);

      engine = Engine.create({ enableSleeping: true });
      engine.gravity.y = 0.5; // gentle "sinking through water" pull

      // Container walls (floor + sides + a ceiling high above the spawn point).
      const wallOpts = { isStatic: true, friction: 0.3, restitution: 0.2 };
      Composite.add(engine.world, [
        Bodies.rectangle(W / 2, H + 60, W + 240, 120, wallOpts),
        Bodies.rectangle(-60, H / 2 - 600, 120, H + 1400, wallOpts),
        Bodies.rectangle(W + 60, H / 2 - 600, 120, H + 1400, wallOpts),
      ]);

      // One chip per logo, spawned staggered above the canvas so they rain in.
      logos.forEach((l, i) => {
        const img = images[i];
        const logoH = l.height * LOGO_SCALE;
        const aspect =
          img.naturalWidth && img.naturalHeight ? img.naturalWidth / img.naturalHeight : 3;
        const logoW = logoH * aspect;
        const w = logoW + CHIP_PAD_X * 2;
        const h = logoH + CHIP_PAD_Y * 2;
        const x = 60 + Math.random() * Math.max(1, W - 120);
        const y = -h - i * 42 - Math.random() * 50;
        const body = Bodies.rectangle(x, y, w, h, {
          chamfer: { radius: Math.min(h / 2, 24) },
          friction: 0.2,
          frictionAir: 0.055, // water drag — chips descend slowly
          restitution: 0.2,
          angle: (Math.random() - 0.5) * 0.6,
          angularVelocity: (Math.random() - 0.5) * 0.01,
          density: 0.0012,
        });
        chips.push({ body, img, w, h, logoW, logoH });
        Composite.add(engine.world, body);
      });

      // Drag interaction.
      const mouse = Mouse.create(canvas);
      mouse.pixelRatio = dpr;
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse,
        constraint: { stiffness: 0.15, damping: 0.1, render: { visible: false } },
      });
      // Don't hijack page scrolling over the canvas.
      mouse.element.removeEventListener('wheel', mouse.mousewheel);
      mouse.element.removeEventListener('DOMMouseScroll', mouse.mousewheel);
      mouse.element.removeEventListener('touchstart', mouse.mousedown);
      mouse.element.removeEventListener('touchmove', mouse.mousemove);
      mouse.element.removeEventListener('touchend', mouse.mouseup);
      Composite.add(engine.world, mouseConstraint);

      // Wake bodies the pointer grabs.
      Matter.Events.on(mouseConstraint, 'startdrag', (e) => {
        if (e.body) Matter.Sleeping.set(e.body, false);
      });

      runner = Runner.create();
      Runner.run(runner, engine);

      const roundRect = (c, x, y, w, h, r) => {
        c.beginPath();
        c.moveTo(x + r, y);
        c.arcTo(x + w, y, x + w, y + h, r);
        c.arcTo(x + w, y + h, x, y + h, r);
        c.arcTo(x, y + h, x, y, r);
        c.arcTo(x, y, x + w, y, r);
        c.closePath();
      };

      const draw = () => {
        if (disposed) return;
        ctx.clearRect(0, 0, W, H);
        chips.forEach(({ body, img, w, h, logoW, logoH }) => {
          ctx.save();
          ctx.translate(body.position.x, body.position.y);
          ctx.rotate(body.angle);
          roundRect(ctx, -w / 2, -h / 2, w, h, Math.min(h / 2, 24));
          ctx.fillStyle = '#101010';
          ctx.fill();
          ctx.lineWidth = 1;
          ctx.strokeStyle = '#3a3a3a';
          ctx.stroke();
          if (img.complete && img.naturalWidth > 0) {
            ctx.drawImage(img, -logoW / 2, -logoH / 2, logoW, logoH);
          }
          ctx.restore();
        });
        raf = requestAnimationFrame(draw);
      };
      raf = requestAnimationFrame(draw);

      // Keep chips inside if the tab was backgrounded and physics exploded.
      Matter.Events.on(engine, 'afterUpdate', () => {
        chips.forEach(({ body }) => {
          if (body.position.y > H + 400) {
            Body.setPosition(body, { x: W / 2, y: -100 });
            Body.setVelocity(body, { x: 0, y: 0 });
            Matter.Sleeping.set(body, false);
          }
        });
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          inView = true;
          if (imagesReady) start();
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(wrap);

    return () => {
      disposed = true;
      observer.disconnect();
      cancelAnimationFrame(raf);
      if (runner) Matter.Runner.stop(runner);
      if (engine) {
        Matter.Composite.clear(engine.world, false);
        Matter.Engine.clear(engine);
      }
    };
  }, []);

  return (
    <Section aria-label="Companies logo playground">
      <Label>Companies I&rsquo;ve worked with</Label>
      <CanvasWrap ref={wrapRef}>
        <canvas ref={canvasRef} />
        <Caustics />
        <WaterTint />
        <Surface />
      </CanvasWrap>

      {/* Gentle animated refraction so the submerged chips ripple like water. */}
      <svg
        aria-hidden="true"
        focusable="false"
        style={{ position: 'absolute', width: 0, height: 0 }}
      >
        <defs>
          <filter id="waterWobble" x="-4%" y="-4%" width="108%" height="108%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.008 0.014"
              numOctaves="2"
              seed="4"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                dur="18s"
                values="0.008 0.014;0.013 0.010;0.008 0.014"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="10"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
    </Section>
  );
}
