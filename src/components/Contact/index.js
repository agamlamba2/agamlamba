import React from 'react';
import { FiMail, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import {
  ContactSection,
  SectionHeader,
  SectionLabel,
  SectionTitle,
  ContactContent,
  ContactText,
  ContactGrid,
  ContactCard,
  ContactCardIcon,
  ContactCardTitle,
  ContactCardValue,
  SocialLinks,
  SocialLink,
} from './styles';

export default function Contact() {
  return (
    <ContactSection id="contact">
      <SectionHeader>
        <SectionLabel>Contact</SectionLabel>
        <SectionTitle>Let's work together</SectionTitle>
      </SectionHeader>
      <ContactContent>
        <ContactText>
          I'm always open to discussing new projects, creative ideas, or
          opportunities to be part of your vision. Feel free to reach out.
        </ContactText>
        <ContactGrid>
          <ContactCard href="mailto:agamlamba2@gmail.com">
            <ContactCardIcon>
              <FiMail size={24} />
            </ContactCardIcon>
            <ContactCardTitle>Email</ContactCardTitle>
            <ContactCardValue>agamlamba2@gmail.com</ContactCardValue>
          </ContactCard>
          <ContactCard href="https://github.com/agamlamba2" target="_blank" rel="noopener noreferrer">
            <ContactCardIcon>
              <FiGithub size={24} />
            </ContactCardIcon>
            <ContactCardTitle>GitHub</ContactCardTitle>
            <ContactCardValue>@agamlamba2</ContactCardValue>
          </ContactCard>
        </ContactGrid>
        <SocialLinks>
          <SocialLink href="https://github.com/agamlamba2" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FiGithub size={20} />
          </SocialLink>
          <SocialLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FiLinkedin size={20} />
          </SocialLink>
          <SocialLink href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <FiTwitter size={20} />
          </SocialLink>
        </SocialLinks>
      </ContactContent>
    </ContactSection>
  );
}
