import React from 'react';
import { FiArrowUpRight, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import {
  ContactSection,
  ContactContainer,
  ContactLabel,
  ContactTitle,
  ContactTitleAccent,
  ContactDescription,
  ContactCTA,
  ContactEmail,
  ContactEmailArrow,
  ContactSocials,
  ContactSocialLink,
  ContactDivider,
} from './styles';

export default function Contact() {
  return (
    <ContactSection id="contact">
      <ContactContainer>
        <ContactLabel>Get in Touch</ContactLabel>
        <ContactTitle>
          Have a project in mind?<br />
          <ContactTitleAccent>Let's talk.</ContactTitleAccent>
        </ContactTitle>
        <ContactDescription>
          I'm always interested in hearing about new projects and opportunities.
          Whether you have a question or just want to say hi, feel free to reach out.
        </ContactDescription>
        <ContactCTA>
          <ContactEmail href="mailto:agamlamba2@gmail.com">
            agamlamba2@gmail.com
            <ContactEmailArrow>
              <FiArrowUpRight size={24} />
            </ContactEmailArrow>
          </ContactEmail>
        </ContactCTA>
        <ContactDivider />
        <ContactSocials>
          <ContactSocialLink href="https://github.com/agamlamba2" target="_blank" rel="noopener noreferrer">
            <FiGithub size={20} />
            GitHub
          </ContactSocialLink>
          <ContactSocialLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FiLinkedin size={20} />
            LinkedIn
          </ContactSocialLink>
          <ContactSocialLink href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FiTwitter size={20} />
            Twitter
          </ContactSocialLink>
        </ContactSocials>
      </ContactContainer>
    </ContactSection>
  );
}
