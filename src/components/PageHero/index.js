import React from 'react';
import {
  HeroSection,
  Aurora,
  HeroContent,
  HeroHeading,
  HeroBottom,
  HeroBottomSpacer,
  HeroParagraph,
} from './styles';

export default function PageHero({ title, intro }) {
  return (
    <HeroSection>
      <Aurora aria-hidden="true" />
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
