import React from 'react';
import {
  AboutSection,
  AboutContainer,
  AboutGrid,
  AboutLeft,
  AboutLabel,
  AboutTitle,
  AboutImageWrapper,
  AboutImagePlaceholder,
  AboutRight,
  AboutDescription,
  AboutStats,
  StatItem,
  StatNumber,
  StatLabel,
  StatDivider,
} from './styles';

export default function About() {
  return (
    <AboutSection id="about">
      <AboutContainer>
        <AboutLabel>About</AboutLabel>
        <AboutGrid>
          <AboutLeft>
            <AboutTitle>
              I'm a developer who cares about craft, clarity, and impact.
            </AboutTitle>
            <AboutImageWrapper>
              <AboutImagePlaceholder>
                <span>AL</span>
              </AboutImagePlaceholder>
            </AboutImageWrapper>
          </AboutLeft>
          <AboutRight>
            <AboutDescription>
              I'm Agam Lamba, a software developer passionate about building
              thoughtful digital products. I focus on writing clean, efficient
              code and creating interfaces that feel intuitive and purposeful.
            </AboutDescription>
            <AboutDescription>
              With experience across the full stack, I bring ideas to life — from
              early concepts to polished, production-ready applications. I believe
              in simplicity, performance, and attention to detail.
            </AboutDescription>
            <AboutStats>
              <StatItem>
                <StatNumber>3+</StatNumber>
                <StatLabel>Years of Experience</StatLabel>
              </StatItem>
              <StatDivider />
              <StatItem>
                <StatNumber>20+</StatNumber>
                <StatLabel>Projects Delivered</StatLabel>
              </StatItem>
              <StatDivider />
              <StatItem>
                <StatNumber>10+</StatNumber>
                <StatLabel>Technologies</StatLabel>
              </StatItem>
            </AboutStats>
          </AboutRight>
        </AboutGrid>
      </AboutContainer>
    </AboutSection>
  );
}
