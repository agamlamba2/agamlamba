import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import colors from '../../assets/styles/variables/colors';

/* Scroll-driven "flicker" wheel (liminalrecruitment.com): the section pins while
   scroll scrubs a tilted wheel of competencies past a focus line — the nearest
   item is sharp and full-size, the rest blur, shrink and fade with distance.
   The tilt eases from flat to -30deg as the section is entered. */

const competencies = [
  'Product Leadership',
  'Product Ownership',
  'Design Engineering',
  'Design Ops',
  'Product Design',
  'Strategic Execution',
  'Market Research & Testing',
  'Native Apps',
  'Responsive Web Design',
  'Design Systems',
  'Accessibility',
  'UI Design',
  'UX Design',
  'AI & Conversation Design',
  'Rapid Prototyping',
  'Motion and Interactions',
  'Brand Design Strategy',
  'UX Writing',
  'Stakeholder Relationships',
];

const GAP = 120; // px between slots on the wheel
const CYCLES = 1.5; // how many full passes of the list one scroll-through makes
const TILT = -30; // final stage rotation (deg)
const TILT_IN = 0.12; // fraction of scroll used to ease the tilt in
const SMOOTH = 0.14; // per-frame (60fps) glide toward the scroll target
const SCALE_FALL = 0.09; // scale lost per slot away from the focus line
const OPACITY_FALL = 0.14; // opacity lost per slot
const BLUR_RISE = 1.1; // px of blur gained per slot

const Section = styled.section`
  position: relative;
  background: ${colors.bg};
  height: 380vh;
`;

const Pin = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
`;

/* Rotor sits on the focus point; rotating it keeps the focused item in place. */
const Rotor = styled.div`
  position: absolute;
  left: 26%;
  top: 50%;
  will-change: transform;

  @media (max-width: 900px) {
    left: 16%;
  }
`;

const FlickerLabel = styled.p`
  position: absolute;
  left: -64px;
  top: 0;
  transform: translateY(-50%) rotate(180deg);
  writing-mode: vertical-rl;
  white-space: nowrap;
  font-size: 0.95rem;
  font-weight: 600;
  color: ${colors.grayLight};
`;

const Item = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: left center;
  will-change: transform, opacity, filter;
  white-space: nowrap;

  span {
    font-size: clamp(2.5rem, 5vw, 64px);
    font-weight: 800;
    letter-spacing: -2px;
    line-height: 1;
    color: ${colors.white};
  }
`;

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
const clamp01 = (v) => Math.max(0, Math.min(v, 1));

export default function CompetencyFlicker({ label = 'Competencies  include' }) {
  const sectionRef = useRef(null);
  const rotorRef = useRef(null);
  const itemRefs = useRef([]);
  const rafRef = useRef(0);
  const runningRef = useRef(false);
  const targetRef = useRef(0);
  const curRef = useRef(0);
  const lastRef = useRef(0);

  useEffect(() => {
    const N = competencies.length;
    const TOTAL = N * GAP;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const render = (p) => {
      if (rotorRef.current) {
        const rot = TILT * easeOutCubic(clamp01(p / TILT_IN));
        rotorRef.current.style.transform = `rotate(${rot.toFixed(2)}deg)`;
      }
      const phase = p * TOTAL * CYCLES;
      let activeIdx = 0;
      let activeDist = Infinity;
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        let y = ((((i * GAP - phase) % TOTAL) + TOTAL * 1.5) % TOTAL) - TOTAL / 2;
        const slots = Math.abs(y) / GAP;
        const scale = Math.max(1 - slots * SCALE_FALL, 0.3);
        const opacity = Math.max(1 - slots * OPACITY_FALL, 0);
        const blur = slots * BLUR_RISE;
        el.style.transform = `translate(0, ${y.toFixed(2)}px) scale(${scale.toFixed(4)})`;
        el.style.opacity = opacity.toFixed(4);
        el.style.filter = `blur(${blur.toFixed(2)}px)`;
        if (Math.abs(y) < activeDist) {
          activeDist = Math.abs(y);
          activeIdx = i;
        }
      });
      itemRefs.current.forEach((el, i) => {
        if (el) el.setAttribute('aria-current', i === activeIdx ? 'true' : 'false');
      });
    };

    // Read scroll progress through the pinned section; returns near-view state.
    const read = () => {
      const el = sectionRef.current;
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      targetRef.current = clamp01(-rect.top / Math.max(total, 1));
      return rect.bottom > -200 && rect.top < window.innerHeight + 200;
    };

    if (reduced) {
      read();
      render(0.5); // static mid-wheel frame, no motion
      return undefined;
    }

    const tick = (now) => {
      const dt = lastRef.current ? Math.min(now - lastRef.current, 64) : 16.7;
      lastRef.current = now;
      const inView = read();
      const k = 1 - Math.pow(1 - SMOOTH, dt / (1000 / 60));
      curRef.current += (targetRef.current - curRef.current) * k;
      render(curRef.current);
      if (!inView && Math.abs(targetRef.current - curRef.current) < 0.001) {
        runningRef.current = false;
        lastRef.current = 0;
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    const kick = () => {
      if (runningRef.current) return;
      runningRef.current = true;
      lastRef.current = 0;
      rafRef.current = requestAnimationFrame(tick);
    };

    read();
    curRef.current = targetRef.current;
    render(curRef.current);
    window.addEventListener('scroll', kick, { passive: true });
    window.addEventListener('resize', kick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      runningRef.current = false;
      window.removeEventListener('scroll', kick);
      window.removeEventListener('resize', kick);
    };
  }, []);

  return (
    <Section ref={sectionRef} aria-label={label}>
      <Pin>
        <Rotor ref={rotorRef}>
          <FlickerLabel>{label}</FlickerLabel>
          {competencies.map((c, i) => (
            <Item
              key={c}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
            >
              <span>{c}</span>
            </Item>
          ))}
        </Rotor>
      </Pin>
    </Section>
  );
}
