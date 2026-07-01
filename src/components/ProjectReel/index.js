import React, { useEffect, useRef, useState, useCallback } from 'react';
import { FiArrowRight } from 'react-icons/fi';
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

const clamp = (v, min = 0, max = 1) => Math.max(min, Math.min(v, max));
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

// Intro: auto-reel then skew into the tilted sheet (time-based, no scrolling).
const REEL_MS = 1400; // sweep every project up through the frame
const SKEW_MS = 650; // settle the first project into the floating sheet

// Carousel: after the tilt, scroll pages between projects.
const HOLD = 0.2; // scroll fraction held on project 0 right after the tilt
const SMOOTH = 0.09; // how fast the carousel eases toward the scroll (lower = more glide)

const SPACING = 52; // vh between adjacent cards in the reel
const SKEW_ROT_Z = -4; // deg tilt of the settled sheet
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
  const introRef = useRef({ started: false, done: false, t0: 0 });
  const [active, setActive] = useState(0);
  const [introDone, setIntroDone] = useState(false);
  const N = projects.length;

  // Position every card for a focus point (activeFloat) and a skew amount (0..1).
  const render = useCallback((activeFloat, skew) => {
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const offset = i - activeFloat; // 0 = centred, <0 above, >0 below
      const y = offset * SPACING; // vh — cards travel up through the frame
      const rotateX = offset * -8;
      const scale = clamp(1 - Math.abs(offset) * 0.1, 0.7, 1);
      const opacity = clamp(1.2 - Math.abs(offset) * 0.55);
      const rotZ = skew * SKEW_ROT_Z;
      const skewY = skew * SKEW_Y;
      const tx = skew * SKEW_TX;
      el.style.transform =
        `translate(-50%, -50%) translateX(${tx.toFixed(2)}vw) translateY(${y.toFixed(2)}vh) ` +
        `perspective(1600px) rotateX(${rotateX.toFixed(2)}deg) rotateZ(${rotZ.toFixed(2)}deg) ` +
        `skewY(${skewY.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
      el.style.opacity = opacity.toFixed(3);
      el.style.zIndex = String(100 - Math.round(Math.abs(offset) * 10));
    });
  }, []);

  const setRail = (shown) => {
    if (railRef.current) railRef.current.style.opacity = shown ? '1' : '0';
  };

  // Read where the section sits and (re)arm / trigger the auto-reel intro.
  const readScroll = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;
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
  }, [N, render]);

  const frame = useCallback(
    (now) => {
      const intro = introRef.current;

      // --- Auto-reel intro (time-based, ignores scroll) ---
      if (intro.started && !intro.done) {
        if (!intro.t0) intro.t0 = now;
        const t = now - intro.t0;
        if (t < REEL_MS) {
          const local = easeInOut(t / REEL_MS);
          render((N - 1) * (1 - local), 0);
          setRail(false);
        } else if (t < REEL_MS + SKEW_MS) {
          render(0, easeOut((t - REEL_MS) / SKEW_MS));
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

      // --- Carousel (scroll-driven, smoothed) — only after the tilt ---
      if (intro.done) {
        const p = targetRef.current;
        const carouselT = clamp((p - HOLD) / (1 - HOLD));
        const targetAF = carouselT * (N - 1);
        const diff = targetAF - curRef.current;
        if (Math.abs(diff) < 0.0006) {
          curRef.current = targetAF;
          render(curRef.current, 1);
          const next = clamp(Math.round(curRef.current), 0, N - 1);
          setActive((prev) => (prev === next ? prev : next));
          runningRef.current = false;
          return;
        }
        curRef.current += diff * SMOOTH;
        render(curRef.current, 1);
        const next = clamp(Math.round(curRef.current), 0, N - 1);
        setActive((prev) => (prev === next ? prev : next));
        rafRef.current = requestAnimationFrame(frame);
        return;
      }

      // --- Idle poster (intro not yet triggered) ---
      render(N - 1, 0);
      runningRef.current = false;
    },
    [N, render]
  );

  const kick = useCallback(() => {
    if (runningRef.current) return;
    runningRef.current = true;
    rafRef.current = requestAnimationFrame(frame);
  }, [frame]);

  useEffect(() => {
    readScroll();
    render(N - 1, 0);
    const onScroll = () => {
      readScroll();
      kick();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [readScroll, render, kick, N]);

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
              <Desc>{project.overview || project.desc}</Desc>
              <CaseLink to={`/${project.slug}`}>
                Open case study <FiArrowRight />
              </CaseLink>
            </TextItem>
          ))}
        </TextCol>

        <Stage>
          {projects.map((project, i) => (
            <Card
              key={project.slug}
              $src={project.cover}
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
              onClick={() => jumpTo(i)}
              aria-label={project.title}
            />
          ))}
        </Rail>
      </Pin>
    </Section>
  );
}
