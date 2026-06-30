import React from 'react';
import {
  HeroSection,
  HeroContent,
  HeroHeading,
  HeroBottom,
  HeroBottomSpacer,
  HeroParagraph,
} from './styles';

export default function PageHero({ title, intro }) {
  return (
    <HeroSection>
      <HeroContent>
        <HeroHeading>{title}</HeroHeading>
        <HeroBottom>
          <HeroBottomSpacer />
          <HeroParagraph>{intro}</HeroParagraph>
        </HeroBottom>
      </HeroContent>
    </HeroSection>
  );
}
