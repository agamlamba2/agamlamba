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
const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const REEL_MS = 1500; // fast auto-reel through every project
const SKEW_MS = 650; // settle: flatten -> floating skewed sheet

export default function ProjectReel() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const tickingRef = useRef(false);
  const introRef = useRef({ started: false, done: false, raf: 0 });
  const [active, setActive] = useState(0);
  const [settled, setSettled] = useState(false);
  const N = projects.length;

  // Position every card for a given focus (activeFloat) and skew amount (0..1).
  const render = useCallback((activeFloat, skew) => {
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const offset = i - activeFloat; // 0 = centred, <0 above, >0 below
      const y = offset * 76; // vh — cards travel up through the centre frame
      const rotateX = offset * -10;
      const scale = clamp(1 - Math.abs(offset) * 0.12, 0.72, 1);
      const opacity = clamp(1.15 - Math.abs(offset) * 0.62);
      const rotZ = skew * -3; // slight tilt -> floating sheet
      const skewY = skew * -2.6;
      const tx = skew * 3; // drifts right as it becomes a sheet
      el.style.transform =
        `translate(-50%, -50%) translateX(${tx.toFixed(2)}vw) translateY(${y.toFixed(2)}vh) ` +
        `perspective(1600px) rotateX(${rotateX.toFixed(2)}deg) rotateZ(${rotZ.toFixed(2)}deg) ` +
        `skewY(${skewY.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
      el.style.opacity = opacity.toFixed(3);
      el.style.zIndex = String(100 - Math.round(Math.abs(offset) * 10));
    });
  }, []);

  // Scroll-driven carousel (only after the intro has settled).
  const updateScroll = useCallback(() => {
    const section = sectionRef.current;
    if (section && introRef.current.done) {
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      const progress = clamp(-rect.top / total);
      const activeFloat = progress * (N - 1);
      setActive((prev) => {
        const next = Math.round(activeFloat);
        return prev === next ? prev : next;
      });
      render(activeFloat, 1);
    }
    tickingRef.current = false;
  }, [N, render]);

  // Intro: auto-reel through all projects, then skew into the floating sheet.
  const playIntro = useCallback(() => {
    const intro = introRef.current;
    if (intro.started) return;
    intro.started = true;
    const start = performance.now();
    const step = (now) => {
      const t = now - start;
      if (t < REEL_MS) {
        // reel sweeps from the last project up to the first (flat)
        const p = easeInOut(t / REEL_MS);
        render((N - 1) * (1 - p), 0);
        intro.raf = requestAnimationFrame(step);
      } else if (t < REEL_MS + SKEW_MS) {
        const s = easeOut((t - REEL_MS) / SKEW_MS);
        render(0, s);
        if (!settled) setSettled(true);
        intro.raf = requestAnimationFrame(step);
      } else {
        render(0, 1);
        intro.done = true;
        setSettled(true);
      }
    };
    intro.raf = requestAnimationFrame(step);
  }, [N, render, settled]);

  useEffect(() => {
    render(N - 1, 0); // start on the reel's first frame

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) playIntro();
      },
      { threshold: 0.4 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);

    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      window.requestAnimationFrame(updateScroll);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    const intro = introRef.current;
    return () => {
      observer.disconnect();
      cancelAnimationFrame(intro.raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [N, render, playIntro, updateScroll]);

  const jumpTo = (i) => {
    const section = sectionRef.current;
    if (!section) return;
    const total = section.offsetHeight - window.innerHeight;
    const top = section.offsetTop + (i / (N - 1)) * total;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <Section ref={sectionRef} style={{ height: `${N * 100}vh` }} aria-label="Project reel">
      <Pin>
        <TextCol>
          {projects.map((project, i) => (
            <TextItem key={project.slug} $active={settled && i === active}>
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

        <Rail $shown={settled}>
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
