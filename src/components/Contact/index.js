import React, { useEffect, useRef, useState } from 'react';
import {
  ContactSection,
  ContactLeft,
  ContactTitle,
  ContactTitleAccent,
  ContactActions,
  ContactButton,
  ContactButtonIndented,
  IndentBar,
  IndentedButton,
  AccentBar,
  ContactButtonText,
} from './styles';

export default function Contact() {
  const leftRef = useRef(null);
  const actionsRef = useRef(null);
  const [leftVisible, setLeftVisible] = useState(false);
  const [actionsVisible, setActionsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === leftRef.current) {
            setLeftVisible(entry.isIntersecting);
          }
          if (entry.target === actionsRef.current) {
            setActionsVisible(entry.isIntersecting);
          }
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
      <ContactActions ref={actionsRef} className={actionsVisible ? 'visible' : ''}>
        <ContactButton href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <AccentBar />
          <ContactButtonText>Linkedin</ContactButtonText>
        </ContactButton>
        <ContactButtonIndented>
          <IndentBar />
          <IndentedButton href="mailto:agamlamba2@gmail.com">
            <ContactButtonText>Email me</ContactButtonText>
          </IndentedButton>
        </ContactButtonIndented>
        <ContactButton href="mailto:agamlamba2@gmail.com">
          <AccentBar />
          <ContactButtonText>Email me</ContactButtonText>
        </ContactButton>
        <ContactButton href="#" target="_blank" rel="noopener noreferrer">
          <AccentBar />
          <ContactButtonText>Download CV</ContactButtonText>
        </ContactButton>
      </ContactActions>
    </ContactSection>
  );
}
