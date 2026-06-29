import React from 'react';
import { FooterSection, FooterContent, FooterText, FooterDivider } from './styles';

export default function Footer() {
  return (
    <FooterSection>
      <FooterDivider />
      <FooterContent>
        <FooterText>&copy; {new Date().getFullYear()} Agam Lamba. All rights reserved.</FooterText>
      </FooterContent>
    </FooterSection>
  );
}
