import React from 'react';
import {
  ContactSection,
  ContactLeft,
  ContactTitle,
  ContactTitleAccent,
  ContactActions,
  ContactButton,
  ContactButtonAccented,
  AccentBar,
  AccentedContent,
  ContactButtonText,
} from './styles';

export default function Contact() {
  return (
    <ContactSection id="contact">
      <ContactLeft>
        <ContactTitle>
          Let's make something together, <ContactTitleAccent>say hi.</ContactTitleAccent>
        </ContactTitle>
      </ContactLeft>
      <ContactActions>
        <ContactButton href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <ContactButtonText>Linkedin</ContactButtonText>
        </ContactButton>
        <ContactButtonAccented href="mailto:agamlamba2@gmail.com">
          <AccentBar />
          <AccentedContent>
            <ContactButtonText>Email me</ContactButtonText>
          </AccentedContent>
        </ContactButtonAccented>
        <ContactButton href="mailto:agamlamba2@gmail.com">
          <ContactButtonText>Email me</ContactButtonText>
        </ContactButton>
        <ContactButton href="#" target="_blank" rel="noopener noreferrer">
          <ContactButtonText>Download CV</ContactButtonText>
        </ContactButton>
      </ContactActions>
    </ContactSection>
  );
}
