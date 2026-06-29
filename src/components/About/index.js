import React from 'react';
import {
  AboutSection,
  SectionHeader,
  SectionLabel,
  SectionTitle,
  AboutGrid,
  AboutText,
  AboutParagraph,
  AboutImageWrapper,
  AboutImage,
  StatsRow,
  StatItem,
  StatNumber,
  StatLabel,
} from './styles';

export default function About() {
  return (
    <AboutSection id="about">
      <SectionHeader>
        <SectionLabel>About Me</SectionLabel>
        <SectionTitle>Crafting digital experiences with purpose</SectionTitle>
      </SectionHeader>
      <AboutGrid>
        <AboutText>
          <AboutParagraph>
            I'm a software developer with a passion for building clean, efficient,
            and user-friendly applications. I enjoy turning complex problems into
            simple, beautiful solutions.
          </AboutParagraph>
          <AboutParagraph>
            With experience across frontend and backend technologies, I bring a
            holistic approach to every project. I believe great software is built
            at the intersection of design, technology, and empathy.
          </AboutParagraph>
          <AboutParagraph>
            When I'm not coding, you can find me exploring new technologies,
            contributing to open source, or learning something new.
          </AboutParagraph>
          <StatsRow>
            <StatItem>
              <StatNumber>3+</StatNumber>
              <StatLabel>Years Experience</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>20+</StatNumber>
              <StatLabel>Projects Completed</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>10+</StatNumber>
              <StatLabel>Technologies</StatLabel>
            </StatItem>
          </StatsRow>
        </AboutText>
        <AboutImageWrapper>
          <AboutImage>
            <div className="placeholder">AL</div>
          </AboutImage>
        </AboutImageWrapper>
      </AboutGrid>
    </AboutSection>
  );
}
