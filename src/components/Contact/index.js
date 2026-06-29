import React from 'react';
import {
  ContactSection,
  ContactContainer,
  ContactGrid,
  ContactLeft,
  ContactTitle,
  ContactTitleAccent,
  ContactRight,
  ContactLinksList,
  ContactLinkItem,
  ContactLinkText,
  ContactDivider,
  VerticalAccent,
} from './styles';

export default function Contact() {
  return (
    <ContactSection id="contact">
      <ContactContainer>
        <ContactGrid>
          <ContactLeft>
            <ContactTitle>
              Let's make<br />
              something<br />
              together,<br />
              <ContactTitleAccent>say hi.</ContactTitleAccent>
            </ContactTitle>
          </ContactLeft>
          <VerticalAccent />
          <ContactRight>
            <ContactLinksList>
              <ContactDivider />
              <ContactLinkItem href="https://github.com/agamlamba2" target="_blank" rel="noopener noreferrer">
                <ContactLinkText>GitHub</ContactLinkText>
              </ContactLinkItem>
              <ContactDivider />
              <ContactLinkItem href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <ContactLinkText>LinkedIn</ContactLinkText>
              </ContactLinkItem>
              <ContactDivider />
              <ContactLinkItem href="mailto:agamlamba2@gmail.com">
                <ContactLinkText>Email me</ContactLinkText>
              </ContactLinkItem>
              <ContactDivider />
              <ContactLinkItem href="#" target="_blank" rel="noopener noreferrer">
                <ContactLinkText>Download CV</ContactLinkText>
              </ContactLinkItem>
              <ContactDivider />
            </ContactLinksList>
          </ContactRight>
        </ContactGrid>
      </ContactContainer>
    </ContactSection>
  );
}
