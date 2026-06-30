import React, { useEffect, useRef } from 'react';
import { Section, Pin, Word } from './styles';

const words = ['Design Leader', 'Product Strategist', 'Tech Entrepreneur'];

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
        // Each word owns its own 1/N segment, fading 0 -> 1 -> 0 within it,
        // so it is fully gone before the next word appears (no overlap).
        const center = (i + 0.5) / N;
        const half = 0.5 / N;
        const t = clamp((progress - center) / half, -1, 1);
        el.style.opacity = String(1 - Math.abs(t));
        // Fade in while shrinking from large -> 1, then keep shrinking
        // slightly past 1 as it fades out (never grows back up).
        const scale = t <= 0 ? 1 + -t * 1.2 : 1 - t * 0.18;
        el.style.transform = `scale(${scale})`;
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
