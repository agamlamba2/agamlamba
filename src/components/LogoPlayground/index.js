import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import styled from 'styled-components';
import colors from '../../assets/styles/variables/colors';
import { logos } from '../Companies';

/* Interactive "logo playground" (liminalrecruitment.com-style): the company
   logos fall into the canvas as physical chips, stack up, and can be dragged
   and tossed around with the mouse. */

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
  border: 1px solid #2a2a2a;
  border-radius: 24px;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 440px;
    border-radius: 16px;
  }

  canvas {
    display: block;
    width: 100%;
    height: 100%;
    cursor: grab;
  }

  canvas:active {
    cursor: grabbing;
  }
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

      // Endless "community loop": no floor — chips fall through the column and
      // recycle back to the top, so the rain never stops.
      engine = Engine.create({ enableSleeping: false });
      engine.gravity.y = 0.32;

      // Side walls only, tall enough to cover the off-screen spawn zone.
      const wallOpts = { isStatic: true, friction: 0.1, restitution: 0.4 };
      Composite.add(engine.world, [
        Bodies.rectangle(-60, 0, 120, H * 4, wallOpts),
        Bodies.rectangle(W + 60, 0, 120, H * 4, wallOpts),
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
        // Scatter through the whole column (and above it) so the loop starts full.
        const y = H - ((i + Math.random()) / logos.length) * H * 2.2;
        const body = Bodies.rectangle(x, y, w, h, {
          chamfer: { radius: Math.min(h / 2, 24) },
          friction: 0.1,
          frictionAir: 0.03,
          restitution: 0.4,
          angle: (Math.random() - 0.5) * 0.6,
          angularVelocity: (Math.random() - 0.5) * 0.02,
          density: 0.0015,
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

      // The loop: once a chip clears the bottom edge, respawn it above the top.
      Matter.Events.on(engine, 'afterUpdate', () => {
        chips.forEach(({ body, h }) => {
          if (body.position.y - h / 2 > H + 40) {
            Body.setPosition(body, {
              x: 60 + Math.random() * Math.max(1, W - 120),
              y: -h - Math.random() * 160,
            });
            Body.setVelocity(body, { x: 0, y: 0.5 + Math.random() });
            Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.02);
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
      </CanvasWrap>
    </Section>
  );
}
