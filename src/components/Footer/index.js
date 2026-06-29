import React from 'react';
import {
  FooterSection,
  FooterContainer,
  FooterContent,
  FooterLeft,
  FooterLogo,
  FooterTagline,
  FooterRight,
  FooterLinks,
  FooterLink,
  FooterBottom,
  FooterCopyright,
} from './styles';

export default function Footer() {
  const handleClick = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <FooterSection>
      <FooterContainer>
        <FooterContent>
          <FooterLeft>
            <FooterLogo>Agam Lamba</FooterLogo>
            <FooterTagline>Software Developer & Designer</FooterTagline>
          </FooterLeft>
          <FooterRight>
            <FooterLinks>
              <FooterLink onClick={() => handleClick('hero')}>Home</FooterLink>
              <FooterLink onClick={() => handleClick('about')}>About</FooterLink>
              <FooterLink onClick={() => handleClick('services')}>Services</FooterLink>
              <FooterLink onClick={() => handleClick('projects')}>Work</FooterLink>
              <FooterLink onClick={() => handleClick('contact')}>Contact</FooterLink>
            </FooterLinks>
          </FooterRight>
        </FooterContent>
        <FooterBottom>
          <FooterCopyright>
            &copy; {new Date().getFullYear()} Agam Lamba. All rights reserved.
          </FooterCopyright>
        </FooterBottom>
      </FooterContainer>
    </FooterSection>
  );
}
