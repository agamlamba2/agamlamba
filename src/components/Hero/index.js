import React from 'react';
import { FiArrowDown } from 'react-icons/fi';
import {
  HeroSection,
  HeroContent,
  Greeting,
  HeroTitle,
  HeroSubtitle,
  HeroDescription,
  ScrollIndicator,
} from './styles';

export default function Hero() {
  const handleScroll = () => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <HeroSection id="hero">
      <HeroContent>
        <Greeting>Hello, I'm</Greeting>
        <HeroTitle>Agam Lamba</HeroTitle>
        <HeroSubtitle>Software Developer</HeroSubtitle>
        <HeroDescription>
          I design and build digital experiences that are thoughtful,
          elegant, and performant. Passionate about creating software
          that makes a difference.
        </HeroDescription>
      </HeroContent>
      <ScrollIndicator onClick={handleScroll}>
        <FiArrowDown size={20} />
      </ScrollIndicator>
    </HeroSection>
  );
}
