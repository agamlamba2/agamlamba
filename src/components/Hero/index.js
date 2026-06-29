import React from 'react';
import {
  HeroSection,
  HeroContent,
  HeroLabel,
  HeroTitle,
  HeroTitleLine,
  HeroTitleAccent,
  HeroBottom,
  HeroDescription,
  ScrollLine,
} from './styles';

export default function Hero() {
  return (
    <HeroSection id="hero">
      <HeroContent>
        <HeroLabel>Software Developer & Designer</HeroLabel>
        <HeroTitle>
          <HeroTitleLine>I build</HeroTitleLine>
          <HeroTitleLine>
            <HeroTitleAccent>digital</HeroTitleAccent> experiences
          </HeroTitleLine>
          <HeroTitleLine>that matter.</HeroTitleLine>
        </HeroTitle>
      </HeroContent>
      <HeroBottom>
        <HeroDescription>
          Crafting clean, performant, and user-focused applications
          from concept to deployment.
        </HeroDescription>
        <ScrollLine />
      </HeroBottom>
    </HeroSection>
  );
}
