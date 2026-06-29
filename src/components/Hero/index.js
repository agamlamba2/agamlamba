import React, { useState, useEffect, useCallback } from 'react';
import {
  HeroSection,
  HeroContent,
  HeroGrid,
  HeroLeft,
  HeroHeading,
  HeroRight,
  HeroParagraph,
  HeroSlider,
  SlideImage,
  SliderDots,
  SliderDot,
  HeroFilling,
} from './styles';

const slides = [
  { alt: 'Agam', color: '#1a1a2a' },
  { alt: 'Team', color: '#2a1a1a' },
  { alt: 'Expo', color: '#1a2a1a' },
  { alt: 'Tools', color: '#1a1a1a' },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [fillingWidth, setFillingWidth] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent(prev => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 2500);
    return () => clearInterval(timer);
  }, [nextSlide]);

  useEffect(() => {
    setTimeout(() => setFillingWidth(100), 300);
  }, []);

  return (
    <HeroSection id="hero">
      <HeroContent>
        <HeroGrid>
          <HeroLeft>
            <HeroHeading>
              Hi&nbsp;👋🏼,<br />I'm Agam.
            </HeroHeading>
          </HeroLeft>
          <HeroRight>
            <HeroParagraph>
              A creative soul living on the intersection of great customer
              experience and delivering challenging strategic visions.
            </HeroParagraph>
          </HeroRight>
        </HeroGrid>
        <HeroSlider>
          {slides.map((slide, index) => (
            <SlideImage
              key={index}
              $active={index === current}
              style={{ background: slide.color }}
            >
              <span>{slide.alt}</span>
            </SlideImage>
          ))}
          <SliderDots>
            {slides.map((_, index) => (
              <SliderDot
                key={index}
                $active={index === current}
                onClick={() => setCurrent(index)}
              />
            ))}
          </SliderDots>
        </HeroSlider>
      </HeroContent>
      <HeroFilling style={{ width: `${fillingWidth}%` }} />
    </HeroSection>
  );
}
