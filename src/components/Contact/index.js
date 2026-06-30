import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  ContactSection,
  ContactLeft,
  ContactTitle,
  ContactTitleAccent,
  ContactActions,
  ContactButton,
  AccentBar,
  Filling,
  ContactButtonText,
} from './styles';

const buttons = [
  { label: 'Linkedin', href: 'https://www.linkedin.com/in/agamlamba/', external: true },
  { label: 'Book a meeting', href: 'https://calendly.com/agamlamba2/30min', external: true },
  { label: 'Email me', href: 'mailto:agamlamba2@gmail.com', external: false },
  {
    label: 'Download CV',
    href: 'https://www.dropbox.com/scl/fi/b92qa01p9q5m0mhhhizwy/Agam-Lamba-CV-v12-2026-compressed.pdf?rlkey=myfhl8lalme49w53od7z31fct&st=2mmmdgo6&e=1&dl=0',
    external: true,
  },
];

export default function Contact() {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const actionsRef = useRef(null);
  const fillRefs = useRef([]);
  const tickingRef = useRef(false);
  const [leftVisible, setLeftVisible] = useState(false);
  const [actionsVisible, setActionsVisible] = useState(false);

  // Section reveal (fade + slide), both directions.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === leftRef.current) setLeftVisible(entry.isIntersecting);
          if (entry.target === actionsRef.current) setActionsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.15 }
    );
    if (leftRef.current) observer.observe(leftRef.current);
    if (actionsRef.current) observer.observe(actionsRef.current);
    return () => observer.disconnect();
  }, []);

  // Scroll-driven red "filling" wipe per row, staggered, reverses on scroll up.
  const update = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight;
    const clamp = (v) => Math.max(0, Math.min(v, 1));
    const progress = clamp((vh - rect.top) / (vh * 0.85));
    fillRefs.current.forEach((el, i) => {
      if (!el) return;
      const w = clamp((progress - i * 0.07) * 1.7) * 100;
      el.style.width = `${w}%`;
    });
    tickingRef.current = false;
  }, []);

  useEffect(() => {
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
  }, [update]);

  return (
    <ContactSection id="contact" ref={sectionRef}>
      <ContactLeft ref={leftRef} className={leftVisible ? 'visible' : ''}>
        <ContactTitle>
          Let's make something together, <ContactTitleAccent>say hi.</ContactTitleAccent>
        </ContactTitle>
      </ContactLeft>
      <ContactActions ref={actionsRef} className={actionsVisible ? 'visible' : ''}>
        {buttons.map((btn, i) => (
          <ContactButton
            key={btn.label}
            href={btn.href}
            {...(btn.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            <Filling
              ref={(el) => {
                fillRefs.current[i] = el;
              }}
            />
            <AccentBar />
            <ContactButtonText>{btn.label}</ContactButtonText>
          </ContactButton>
        ))}
      </ContactActions>
    </ContactSection>
  );
}
