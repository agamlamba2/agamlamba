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

// Scroll phases (as a fraction of the pinned section's scroll range):
//  0.00 -> REEL_END : auto-reel — every project sweeps up through the frame,
//                     oldest (last) to latest (first), flat.
//  REEL_END -> SKEW_END : the stack skews and drifts right into a floating sheet.
//  SKEW_END -> 1.00 : carousel — scroll pages between projects, sheet stays floating.
const REEL_END = 0.3;
const SKEW_END = 0.42;

const SPACING = 52; // vh between adjacent cards in the reel
const SKEW_ROT_Z = -4; // deg tilt of the settled sheet
const SKEW_Y = -3; // deg vertical shear of the settled sheet
const SKEW_TX = 4; // vw the sheet drifts right as it settles

export default function ProjectReel() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const railRef = useRef(null);
  const tickingRef = useRef(false);
  const [active, setActive] = useState(0);
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

  const update = useCallback(() => {
    const section = sectionRef.current;
    if (section) {
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      const p = clamp(-rect.top / total);

      let activeFloat;
      let skew;
      if (p < REEL_END) {
        // reel sweeps from the last project up to the first, flat
        const local = p / REEL_END;
        activeFloat = (N - 1) * (1 - local);
        skew = 0;
      } else if (p < SKEW_END) {
        // settle the first project into the floating sheet
        const s = easeOut((p - REEL_END) / (SKEW_END - REEL_END));
        activeFloat = 0;
        skew = s;
      } else {
        // carousel through the projects, sheet stays floating
        const c = (p - SKEW_END) / (1 - SKEW_END);
        activeFloat = clamp(c, 0, 1) * (N - 1);
        skew = 1;
      }

      render(activeFloat, skew);

      const next = clamp(Math.round(activeFloat), 0, N - 1);
      setActive((prev) => (prev === next ? prev : next));

      if (railRef.current) {
        railRef.current.style.opacity = p >= REEL_END ? '1' : '0';
      }
    }
    tickingRef.current = false;
  }, [N, render]);

  useEffect(() => {
    update();
    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      window.requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [update]);

  // Jump the scroll so a given project sits centred in the carousel phase.
  const jumpTo = (i) => {
    const section = sectionRef.current;
    if (!section) return;
    const total = section.offsetHeight - window.innerHeight;
    const p = SKEW_END + (i / (N - 1)) * (1 - SKEW_END);
    window.scrollTo({ top: section.offsetTop + p * total, behavior: 'smooth' });
  };

  return (
    <Section ref={sectionRef} style={{ height: `${(N + 1) * 100}vh` }} aria-label="Project reel">
      <Pin>
        <TextCol>
          {projects.map((project, i) => (
            <TextItem key={project.slug} $active={i === active}>
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
