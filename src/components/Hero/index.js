import React, { useState, useEffect, useCallback } from 'react';
import {
  HeroSection,
  SlideImage,
  HeroOverlay,
  HeroContent,
  HeroHeading,
  HeroParagraph,
  SliderDots,
  SliderDot,
} from './styles';

import imgMe from '../../assets/images/img_me.webp';
import imgTeam from '../../assets/images/img_team.webp';
import imgExpo from '../../assets/images/img_expo.webp';
import imgHackathon from '../../assets/images/img_hackathon.webp';
import imgMentor from '../../assets/images/img_mentor.webp';
import imgTools from '../../assets/images/img_tools.webp';
import imgUbank from '../../assets/images/img_ubank.webp';
import imgX15 from '../../assets/images/img_x15.webp';

const slides = [imgMe, imgTeam, imgExpo, imgHackathon, imgMentor, imgTools, imgUbank, imgX15];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent(prev => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 3000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <HeroSection id="hero">
      {slides.map((src, index) => (
        <SlideImage key={index} $src={src} $active={index === current} />
      ))}
      <HeroOverlay />
      <HeroContent>
        <HeroHeading>
          Hi&nbsp;👋🏼,<br />I'm Agam.
        </HeroHeading>
        <HeroParagraph>
          A creative soul living on the intersection of great customer
          experience and delivering challenging strategic visions.
        </HeroParagraph>
      </HeroContent>
      <SliderDots>
        {slides.map((_, index) => (
          <SliderDot
            key={index}
            $active={index === current}
            onClick={() => setCurrent(index)}
          />
        ))}
      </SliderDots>
    </HeroSection>
  );
}
