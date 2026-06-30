import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  HeroSection,
  SlidesWrapper,
  SlideImage,
  HeroOverlay,
  HeroContent,
  HeroHeading,
  HeroBottom,
  HeroBottomSpacer,
  HeroParagraph,
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
  const wrapperRef = useRef(null);
  const tickingRef = useRef(false);

  const nextSlide = useCallback(() => {
    setCurrent(prev => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  useEffect(() => {
    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      window.requestAnimationFrame(() => {
        const progress = Math.min(window.scrollY / window.innerHeight, 1);
        if (wrapperRef.current) {
          wrapperRef.current.style.transform = `scale(${1 - progress * 0.18})`;
          wrapperRef.current.style.borderRadius = `${progress * 28}px`;
        }
        tickingRef.current = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <HeroSection id="hero">
      <SlidesWrapper ref={wrapperRef}>
        {slides.map((src, index) => (
          <SlideImage key={index} $src={src} $active={index === current} />
        ))}
        <HeroOverlay />
      </SlidesWrapper>
      <HeroContent>
        <HeroHeading>
          Hi&nbsp;👋🏼,<br />I'm Agam.
        </HeroHeading>
        <HeroBottom>
          <HeroBottomSpacer />
          <HeroParagraph>
            A creative soul living on the intersection of great customer
            experience and delivering challenging strategic visions.
          </HeroParagraph>
        </HeroBottom>
      </HeroContent>
    </HeroSection>
  );
}
