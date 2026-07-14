import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import colors from '../../assets/styles/variables/colors';

/* Tilted slot-machine "flicker" wheel (liminalrecruitment.com-style): the list
   of competencies cycles continuously past a focus line; the item nearest the
   line is sharp and full-size, the rest blur, shrink and fade with distance. */

const competencies = [
  'Product Design',
  'Product Management',
  'Service Design',
  'UI Design',
  'User Research',
  'Product Leadership',
  'UX Design',
  'Design Systems',
  'Design Leadership',
  'Design Engineering',
  'Brand Design',
  'Design Ops',
  'Content Design',
  'CX Design',
];

const GAP = 90; // px between slots on the wheel
const SPEED = 110; // px per second the wheel turns
const SCALE_FALL = 0.09; // scale lost per slot away from the focus line
const OPACITY_FALL = 0.14; // opacity lost per slot
const BLUR_RISE = 1.1; // px of blur gained per slot

const Section = styled.section`
  position: relative;
  background: ${colors.bg};
  min-height: 92vh;
  overflow: hidden;
`;

const Stage = styled.div`
  position: absolute;
  left: 14%;
  top: 18%;
  transform: rotate(-30deg);
  transform-origin: 46px 11px;

  @media (max-width: 900px) {
    left: 8%;
  }
`;

const FlickerLabel = styled.p`
  font-size: 1rem;
  font-weight: 600;
  color: ${colors.grayLight};
  margin-bottom: 40px;
`;

const List = styled.ul`
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
  height: 520px;
  width: 90vw;
`;

const Item = styled.li`
  position: absolute;
  top: 50%;
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

export default function CompetencyFlicker({ label = 'My design competencies include' }) {
  const listRef = useRef(null);
  const itemRefs = useRef([]);
  const rafRef = useRef(0);
  const runningRef = useRef(false);
  const phaseRef = useRef(0);
  const lastRef = useRef(0);

  useEffect(() => {
    const N = competencies.length;
    const TOTAL = N * GAP;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const render = () => {
      let activeIdx = 0;
      let activeDist = Infinity;
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        // Wheel position: wraps so the strip is endless; 0 = on the focus line.
        let y = ((i * GAP + phaseRef.current) % TOTAL) - TOTAL / 2;
        if (y < -TOTAL / 2) y += TOTAL;
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

    if (reduced) {
      render(); // static frame, no motion
      return undefined;
    }

    const tick = (now) => {
      const dt = lastRef.current ? Math.min(now - lastRef.current, 64) : 16.7;
      lastRef.current = now;
      phaseRef.current = (phaseRef.current - (SPEED * dt) / 1000 + TOTAL) % TOTAL;
      render();
      rafRef.current = requestAnimationFrame(tick);
    };

    // Only spin while on screen.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !runningRef.current) {
          runningRef.current = true;
          lastRef.current = 0;
          rafRef.current = requestAnimationFrame(tick);
        } else if (!entry.isIntersecting && runningRef.current) {
          runningRef.current = false;
          cancelAnimationFrame(rafRef.current);
        }
      },
      { threshold: 0.05 }
    );
    if (listRef.current) observer.observe(listRef.current);

    render();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <Section aria-label={label}>
      <Stage>
        <FlickerLabel>{label}</FlickerLabel>
        <List ref={listRef}>
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
        </List>
      </Stage>
    </Section>
  );
}
