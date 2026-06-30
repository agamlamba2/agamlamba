import React, { useEffect, useRef } from 'react';
import { Section, Pin, Word } from './styles';

const words = ['Ideate', 'Innovate', 'Accelerate'];

export default function ZoomWords() {
  const sectionRef = useRef(null);
  const wordRefs = useRef([]);
  const tickingRef = useRef(false);

  useEffect(() => {
    const clamp = (v, min, max) => Math.max(min, Math.min(v, max));
    const N = words.length;

    const update = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      const progress = clamp(-rect.top / total, 0, 1);

      wordRefs.current.forEach((el, i) => {
        if (!el) return;
        const center = N > 1 ? i / (N - 1) : 0.5;
        const half = N > 1 ? 1 / (N - 1) : 1;
        const t = clamp((progress - center) / half, -1, 1);
        const dist = Math.abs(t);
        el.style.opacity = String(1 - dist);
        el.style.transform = `scale(${1 + dist * 1.2})`;
      });
      tickingRef.current = false;
    };

    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <Section ref={sectionRef} aria-label="My process">
      <Pin>
        {words.map((word, i) => (
          <Word
            key={word}
            ref={(el) => {
              wordRefs.current[i] = el;
            }}
          >
            <span>{word}</span>
          </Word>
        ))}
      </Pin>
    </Section>
  );
}
