import React, { useState, useEffect } from 'react';
import {
  FooterSection,
  FooterContainer,
  FooterLinks,
  FooterLink,
  FooterFilling,
} from './styles';

export default function Footer() {
  const [fillingWidth, setFillingWidth] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFillingWidth(100);
        }
      },
      { threshold: 0.5 }
    );

    const el = document.getElementById('footer');
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <FooterSection id="footer">
      <FooterContainer>
        <FooterLinks>
          <FooterLink href="https://webflow.com" target="_blank" rel="noopener noreferrer">
            Powered by Webflow
          </FooterLink>
          <FooterLink href="/licensing">Licensing</FooterLink>
          <FooterLink href="/style-guide">Style Guide</FooterLink>
          <FooterLink href="/changelog">Changelog</FooterLink>
        </FooterLinks>
      </FooterContainer>
      <FooterFilling style={{ width: `${fillingWidth}%` }} />
    </FooterSection>
  );
}
