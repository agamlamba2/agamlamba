import React, { useEffect, useRef, useState, useCallback } from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import {
  Section,
  Pin,
  TextCol,
  TextItem,
  Title,
  Desc,
  CaseLink,
  Stage,
  Card,
  Rail,
  Dot,
} from './styles';
import { projects } from '../../data/projects';
import ph1 from '../../assets/reel-placeholders/p1.svg';
import ph2 from '../../assets/reel-placeholders/p2.svg';
import ph3 from '../../assets/reel-placeholders/p3.svg';
import ph4 from '../../assets/reel-placeholders/p4.svg';
import ph5 from '../../assets/reel-placeholders/p5.svg';
import ph6 from '../../assets/reel-placeholders/p6.svg';

// Placeholder card art (not the real project screenshots) — one per project.
const placeholders = [ph1, ph2, ph3, ph4, ph5, ph6];

const clamp = (v, min = 0, max = 1) => Math.max(min, Math.min(v, max));
const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
// Gentle overshoot so the sheet settles with a soft bounce rather than a hard stop.
const easeOutBack = (t) => {
  const c1 = 1.15;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

// Pagination: at most 8 full-size pills; extras shrink (medium, then small) like
// an Instagram image carousel, and the window slides to keep the active one in view.
const MAX_FULL = 8;
const dotSize = (i, active, count) => {
  if (count <= MAX_FULL) return 'full';
  const half = Math.floor(MAX_FULL / 2);
  const start = clamp(active - half, 0, count - MAX_FULL);
  const end = start + MAX_FULL - 1;
  if (i >= start && i <= end) return 'full';
  const dist = i < start ? start - i : i - end;
  if (dist === 1) return 'medium';
  if (dist === 2) return 'small';
  return 'hidden';
};

// Intro: auto-reel then skew into the tilted sheet (time-based, no scrolling).
const REEL_MS = 1400; // sweep every project up through the frame
const SKEW_MS = 650; // settle the first project into the floating sheet

// Carousel: after the tilt, scroll pages between projects.
const HOLD = 0.2; // scroll fraction held on project 0 right after the tilt
const SMOOTH = 0.16; // per-frame (60fps) glide toward the scroll target; frame-rate corrected

// Tight vertical fan — cards overlap closely and curve like a spread deck.
const SPACING = 13; // vh between adjacent cards (small = close together / overlapping)
const ARC = 0.9; // vw of horizontal curve per offset² (bows the stack into a C)
const ARC_MAX = 16; // vw cap on the curve so far cards don't fly off
const FAN = 4; // deg each card rotates away from centre (the fan)
const SKEW_ROT_Z = -4; // deg extra tilt of the settled sheet
const SKEW_Y = -3; // deg vertical shear of the settled sheet
const SKEW_TX = 4; // vw the sheet drifts right as it settles

export default function ProjectReel() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const railRef = useRef(null);
  const targetRef = useRef(0); // scroll progress we want to reach (0..1)
  const curRef = useRef(0); // carousel focus currently rendered (eases toward target)
  const rafRef = useRef(0);
  const runningRef = useRef(false);
  const lastRef = useRef(0); // timestamp of previous frame (for frame-rate-independent easing)
  const introRef = useRef({ started: false, done: false, t0: 0 });
  const [active, setActive] = useState(0);
  const [introDone, setIntroDone] = useState(false);
  const N = projects.length;

  // Position every card for a focus point (activeFloat) and a skew amount (0..1).
  const render = useCallback((activeFloat, skew) => {
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const offset = i - activeFloat; // 0 = centred, <0 above, >0 below
      const abs = Math.abs(offset);
      const y = offset * SPACING; // vh — cards stack up/down, close together
      const arc = -Math.min(offset * offset * ARC, ARC_MAX); // vw — bows the stack into a C
      const rotateX = offset * -4;
      const rotZ = offset * FAN + skew * SKEW_ROT_Z; // fan spread + settle tilt
      const scale = clamp(1 - abs * 0.08, 0.74, 1);
      const opacity = clamp(1.3 - abs * 0.24);
      const skewY = skew * SKEW_Y;
      const tx = arc + skew * SKEW_TX;
      el.style.transform =
        `translate(-50%, -50%) translateX(${tx.toFixed(2)}vw) translateY(${y.toFixed(2)}vh) ` +
        `perspective(1600px) rotateX(${rotateX.toFixed(2)}deg) rotateZ(${rotZ.toFixed(2)}deg) ` +
        `skewY(${skewY.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
      el.style.opacity = opacity.toFixed(3);
      el.style.zIndex = String(100 - Math.round(abs * 10));
    });
  }, []);

  const setRail = (shown) => {
    if (railRef.current) railRef.current.style.opacity = shown ? '1' : '0';
  };

  // Read where the section sits, update the scroll target and (re)arm / trigger
  // the auto-reel intro. Returns whether the section is anywhere near the viewport.
  const readScroll = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return false;
    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight;
    const total = section.offsetHeight - vh;
    targetRef.current = clamp(-rect.top / total);

    const intro = introRef.current;
    // Re-arm once the section has fully left below the fold, so it replays on re-entry.
    if (intro.done && rect.top >= vh) {
      intro.started = false;
      intro.done = false;
      curRef.current = 0;
      setIntroDone(false);
      setActive(0);
      setRail(false);
      render(N - 1, 0);
    }
    // Trigger the intro as the section scrolls up into the fold.
    if (!intro.started && rect.top <= vh * 0.55 && rect.bottom > vh * 0.4) {
      intro.started = true;
      intro.done = false;
      intro.t0 = 0;
      setIntroDone(false);
    }

    return rect.bottom > -vh * 0.5 && rect.top < vh * 1.5;
  }, [N, render]);

  // One continuous rAF loop while the section is in view — decoupling the render
  // from scroll-event cadence is what makes the slide feel smooth.
  const frame = useCallback(
    (now) => {
      const dt = lastRef.current ? now - lastRef.current : 16.7;
      lastRef.current = now;

      const inView = readScroll();
      if (!inView) {
        runningRef.current = false;
        lastRef.current = 0;
        return; // out of view: stop the loop until scroll wakes it again
      }

      const intro = introRef.current;

      // --- Auto-reel intro (time-based, ignores scroll) ---
      if (intro.started && !intro.done) {
        if (!intro.t0) intro.t0 = now;
        const t = now - intro.t0;
        if (t < REEL_MS) {
          render((N - 1) * (1 - easeInOut(t / REEL_MS)), 0);
          setRail(false);
        } else if (t < REEL_MS + SKEW_MS) {
          render(0, easeOutBack((t - REEL_MS) / SKEW_MS));
          setRail(false);
        } else {
          render(0, 1);
          intro.done = true;
          curRef.current = 0;
          setIntroDone(true);
          setActive(0);
          setRail(true);
        }
        rafRef.current = requestAnimationFrame(frame);
        return;
      }

      // --- Carousel: ease the focus toward the scroll target every frame ---
      if (intro.done) {
        const targetAF = clamp((targetRef.current - HOLD) / (1 - HOLD)) * (N - 1);
        const diff = targetAF - curRef.current;
        if (Math.abs(diff) > 0.0004) {
          // frame-rate-independent lerp: same glide at 30, 60 or 120fps
          const k = 1 - Math.pow(1 - SMOOTH, dt / (1000 / 60));
          curRef.current += diff * k;
          if (Math.abs(targetAF - curRef.current) < 0.0004) curRef.current = targetAF;
          render(curRef.current, 1);
          const next = clamp(Math.round(curRef.current), 0, N - 1);
          setActive((prev) => (prev === next ? prev : next));
        }
        rafRef.current = requestAnimationFrame(frame);
        return;
      }

      // --- Idle poster (intro not yet triggered) ---
      render(N - 1, 0);
      rafRef.current = requestAnimationFrame(frame);
    },
    [N, render, readScroll]
  );

  const kick = useCallback(() => {
    if (runningRef.current) return;
    runningRef.current = true;
    lastRef.current = 0;
    rafRef.current = requestAnimationFrame(frame);
  }, [frame]);

  useEffect(() => {
    render(N - 1, 0);
    kick();
    const onScroll = () => kick();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(rafRef.current);
      runningRef.current = false;
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [render, kick, N]);

  // Jump the scroll so a given project sits centred in the carousel phase.
  const jumpTo = (i) => {
    const section = sectionRef.current;
    if (!section || !introRef.current.done) return;
    const total = section.offsetHeight - window.innerHeight;
    const p = HOLD + (i / (N - 1)) * (1 - HOLD);
    window.scrollTo({ top: section.offsetTop + p * total, behavior: 'smooth' });
  };

  return (
    <Section ref={sectionRef} style={{ height: `${(N + 1) * 100}vh` }} aria-label="Project reel">
      <Pin>
        <TextCol>
          {projects.map((project, i) => (
            <TextItem key={project.slug} $active={introDone && i === active}>
              <Title>{project.title}</Title>
              <Desc>{project.desc}</Desc>
              <CaseLink to={`/${project.slug}`}>
                Open case study <FiArrowUpRight />
              </CaseLink>
            </TextItem>
          ))}
        </TextCol>

        <Stage>
          {projects.map((project, i) => (
            <Card
              key={project.slug}
              $src={placeholders[i % placeholders.length]}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
            />
          ))}
        </Stage>

        <Rail ref={railRef}>
          {projects.map((project, i) => (
            <Dot
              key={project.slug}
              $active={i === active}
              $size={dotSize(i, active, N)}
              onClick={() => jumpTo(i)}
              aria-label={project.title}
            />
          ))}
        </Rail>
      </Pin>
    </Section>
  );
}
