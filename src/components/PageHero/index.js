import React, { useEffect, useRef } from 'react';
import {
  HeroSection,
  Aurora,
  HeroContent,
  HeroHeading,
  HeroBottom,
  HeroBottomSpacer,
  HeroParagraph,
} from './styles';

export default function PageHero({ title, intro }) {
  const sectionRef = useRef(null);
  const auroraRef = useRef(null);
  const target = useRef({ x: 0, y: 0 });
  const cur = useRef({ x: 0, y: 0 });
  const raf = useRef(0);
  const running = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    const aurora = auroraRef.current;
    if (!section || !aurora) return;

    // Start the aurora centred on the hero.
    const init = () => {
      const r = section.getBoundingClientRect();
      target.current = { x: r.width / 2, y: r.height / 2 };
      cur.current = { ...target.current };
      aurora.style.setProperty('--x', `${cur.current.x}px`);
      aurora.style.setProperty('--y', `${cur.current.y}px`);
    };
    init();

    // Ease the aurora toward the cursor for a soft, flowing follow.
    const tick = () => {
      const dx = target.current.x - cur.current.x;
      const dy = target.current.y - cur.current.y;
      cur.current.x += dx * 0.08;
      cur.current.y += dy * 0.08;
      aurora.style.setProperty('--x', `${cur.current.x.toFixed(1)}px`);
      aurora.style.setProperty('--y', `${cur.current.y.toFixed(1)}px`);
      if (Math.abs(dx) > 0.3 || Math.abs(dy) > 0.3) {
        raf.current = requestAnimationFrame(tick);
      } else {
        running.current = false;
      }
    };
    const kick = () => {
      if (running.current) return;
      running.current = true;
      raf.current = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      const r = section.getBoundingClientRect();
      target.current = { x: e.clientX - r.left, y: e.clientY - r.top };
      kick();
    };
    const onLeave = () => {
      const r = section.getBoundingClientRect();
      target.current = { x: r.width / 2, y: r.height / 2 };
      kick();
    };

    section.addEventListener('mousemove', onMove);
    section.addEventListener('mouseleave', onLeave);
    window.addEventListener('resize', init);
    return () => {
      cancelAnimationFrame(raf.current);
      section.removeEventListener('mousemove', onMove);
      section.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('resize', init);
    };
  }, []);

  return (
    <HeroSection ref={sectionRef}>
      <Aurora ref={auroraRef} aria-hidden="true" />
      <HeroContent>
        <HeroHeading>{title}</HeroHeading>
        <HeroBottom>
          <HeroBottomSpacer />
          <HeroParagraph>{intro}</HeroParagraph>
        </HeroBottom>
      </HeroContent>
    </HeroSection>
  );
}
