import React, { useEffect, useRef, useState } from 'react';
import {
  ContactSection,
  ContactLeft,
  ContactTitle,
  ContactTitleAccent,
  ContactActions,
  ContactButton,
  AccentBar,
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
  const leftRef = useRef(null);
  const actionsRef = useRef(null);
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

  return (
    <ContactSection id="contact">
      <ContactLeft ref={leftRef} className={leftVisible ? 'visible' : ''}>
        <ContactTitle>
          Let's make something together, <ContactTitleAccent>say hi.</ContactTitleAccent>
        </ContactTitle>
      </ContactLeft>
      <ContactActions ref={actionsRef}>
        {buttons.map((btn, i) => (
          <ContactButton
            key={btn.label}
            href={btn.href}
            className={actionsVisible ? 'visible' : ''}
            style={{ '--reveal-delay': `${i * 0.12}s` }}
            {...(btn.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            <AccentBar />
            <ContactButtonText>{btn.label}</ContactButtonText>
          </ContactButton>
        ))}
      </ContactActions>
    </ContactSection>
  );
}
