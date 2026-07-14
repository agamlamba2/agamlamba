import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import styled from 'styled-components';
import colors from '../../assets/styles/variables/colors';
import { logos } from '../Companies';

/* Interactive "logo playground": the company logos fall into the container as
   physical chips, stack up, and can be dragged and tossed around. A white
   outline water surface — like a glass container filled ~70% — splashes and
   ripples as chips crash through it. No fills, outlines only. */

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
  border-radius: 24px;
  overflow: hidden;
  /* no border — just a soft 5% primary-red glow */
  box-shadow: 0 26px 80px rgba(226, 25, 73, 0.05), 0 4px 24px rgba(226, 25, 73, 0.05);

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

const WATER_LEVEL = 0.3; // surface sits 30% from the top => container 70% full
const WATER_COLUMNS = 130; // heightfield resolution
const SPRING = 0.02; // pull of each column back to rest
const DAMPING = 0.965; // energy loss per frame
const SPREAD = 0.24; // how strongly neighbours drag each other

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
    const chips = []; // { body, img, w, h, logoW, logoH, wasAbove }

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
      engine.gravity.y = 1;

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
        const y = -h - i * 90 - Math.random() * 60;
        const body = Bodies.rectangle(x, y, w, h, {
          chamfer: { radius: Math.min(h / 2, 24) },
          friction: 0.3,
          frictionAir: 0.008,
          restitution: 0.25,
          angle: (Math.random() - 0.5) * 0.6,
          density: 0.0015,
        });
        chips.push({ body, img, w, h, logoW, logoH, wasAbove: true });
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

      /* --- white-outline water simulation (1D spring heightfield) --- */
      const surfaceY = H * WATER_LEVEL;
      const colW = W / (WATER_COLUMNS - 1);
      const heights = new Float32Array(WATER_COLUMNS);
      const vels = new Float32Array(WATER_COLUMNS);
      const drops = []; // splash droplets: {x, y, vx, vy, r, life}

      const disturb = (x, power) => {
        const idx = Math.round(x / colW);
        for (let o = -2; o <= 2; o += 1) {
          const i = idx + o;
          if (i >= 0 && i < WATER_COLUMNS) vels[i] += power * (1 - Math.abs(o) * 0.3);
        }
      };

      const splashDrops = (x, power) => {
        const n = Math.min(Math.round(Math.abs(power) / 2), 7);
        for (let i = 0; i < n && drops.length < 40; i += 1) {
          drops.push({
            x: x + (Math.random() - 0.5) * 30,
            y: surfaceY,
            vx: (Math.random() - 0.5) * 3,
            vy: -Math.abs(power) * (0.35 + Math.random() * 0.5),
            r: 1.5 + Math.random() * 2.5,
            life: 1,
          });
        }
      };

      const stepWater = () => {
        // springs
        for (let i = 0; i < WATER_COLUMNS; i += 1) {
          vels[i] += -SPRING * heights[i];
          vels[i] *= DAMPING;
          heights[i] += vels[i];
        }
        // neighbour spread (two passes for smoothness)
        for (let pass = 0; pass < 2; pass += 1) {
          for (let i = 0; i < WATER_COLUMNS; i += 1) {
            const l = i > 0 ? heights[i - 1] : heights[i];
            const r = i < WATER_COLUMNS - 1 ? heights[i + 1] : heights[i];
            vels[i] += SPREAD * ((l + r) / 2 - heights[i]) * 0.5;
          }
        }
        // chips punching through the surface make splashes
        chips.forEach((c) => {
          const above = c.body.position.y < surfaceY;
          if (c.wasAbove && !above) {
            const vy = c.body.velocity.y;
            if (vy > 1.2) {
              disturb(c.body.position.x, Math.min(vy * 1.6, 16));
              splashDrops(c.body.position.x, Math.min(vy * 1.4, 14));
            }
          } else if (!c.wasAbove && above && c.body.velocity.y < -1.2) {
            disturb(c.body.position.x, Math.max(c.body.velocity.y * 1.2, -12));
          }
          c.wasAbove = above;
        });
        // droplets fly, fall and fade
        for (let i = drops.length - 1; i >= 0; i -= 1) {
          const d = drops[i];
          d.vy += 0.35;
          d.x += d.vx;
          d.y += d.vy;
          d.life -= 0.03;
          if (d.life <= 0 || d.y > surfaceY + 20) drops.splice(i, 1);
        }
      };

      // Calm ambient swell so the surface always waves gently, like the ocean.
      const swell = (i, t) =>
        Math.sin(i * 0.09 + t * 0.0011) * 2.6 + Math.sin(i * 0.023 - t * 0.0007) * 3.4;

      const drawWater = (t) => {
        ctx.beginPath();
        ctx.moveTo(0, surfaceY + heights[0] + swell(0, t));
        for (let i = 1; i < WATER_COLUMNS; i += 1) {
          ctx.lineTo(i * colW, surfaceY + heights[i] + swell(i, t));
        }
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.lineWidth = 1.6;
        ctx.stroke();
        // splash droplets — outline circles only
        drops.forEach((d) => {
          ctx.beginPath();
          ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 255, 255, ${(0.8 * d.life).toFixed(3)})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        });
      };

      const roundRect = (c, x, y, w, h, r) => {
        c.beginPath();
        c.moveTo(x + r, y);
        c.arcTo(x + w, y, x + w, y + h, r);
        c.arcTo(x + w, y + h, x, y + h, r);
        c.arcTo(x, y + h, x, y, r);
        c.arcTo(x, y, x + w, y, r);
        c.closePath();
      };

      const draw = (now) => {
        if (disposed) return;
        stepWater();
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
        drawWater(now || 0);
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
      </CanvasWrap>
    </Section>
  );
}
