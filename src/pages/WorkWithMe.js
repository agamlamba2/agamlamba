import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import Navbar from '../components/Navbar';
import PageHero from '../components/PageHero';
import Companies from '../components/Companies';
import Contact from '../components/Contact';
import colors from '../assets/styles/variables/colors';

/* PLACEHOLDER copy — replace with your real About / Work-with-me content. */
const stats = [
  { value: '20+', label: 'Products shipped' },
  { value: '16', label: 'Brands & clients' },
  { value: '6', label: 'Major banks' },
  { value: '10M+', label: 'Users reached' },
];

const capabilities = [
  {
    title: 'Product strategy',
    body: 'Framing the right problems and turning fuzzy, ambiguous goals into a clear, shippable roadmap.',
  },
  {
    title: 'Design leadership',
    body: 'Leading teams and raising the craft bar — mentoring designers and aligning stakeholders around outcomes.',
  },
  {
    title: 'Design systems',
    body: 'Building scalable systems from zero to org-wide adoption so teams move faster and stay consistent.',
  },
  {
    title: 'Research & discovery',
    body: 'Making the customer real for everyone in the room, grounding decisions in evidence not opinion.',
  },
  {
    title: 'End-to-end product design',
    body: 'From first sketches through polished, accessible interfaces across web and mobile.',
  },
  {
    title: 'Brand & identity',
    body: 'Shaping cohesive brand experiences that carry through from identity to interface.',
  },
];

/* --- shared layout --- */
const Band = styled.section`
  background: ${colors.bg};
  padding: 96px 96px;

  @media (max-width: 1200px) {
    padding: 72px 48px;
  }
  @media (max-width: 768px) {
    padding: 56px 20px;
  }
`;

const Section = styled.section`
  background: ${colors.bg};
  padding: 40px 96px 96px;

  @media (max-width: 1200px) {
    padding: 32px 48px 80px;
  }
  @media (max-width: 768px) {
    padding: 24px 20px 64px;
  }
`;

const Inner = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const Kicker = styled.p`
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${colors.primary};
  margin-bottom: 20px;
`;

const Reveal = styled.div`
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s ease, transform 0.7s ease;

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

/* --- stats --- */
const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 48px 24px;
  }
`;

const Stat = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: clamp(2.75rem, 6vw, 4.5rem);
  font-weight: 800;
  letter-spacing: -2px;
  line-height: 1;
  color: ${colors.primary};
`;

const StatLabel = styled.div`
  margin-top: 12px;
  font-size: 1rem;
  font-weight: 500;
  color: ${colors.grayLight};
`;

/* --- intro / about --- */
const Statement = styled.h2`
  font-size: clamp(1.75rem, 3.6vw, 40px);
  font-weight: 700;
  letter-spacing: -1px;
  line-height: 1.25;
  color: ${colors.white};
  max-width: 900px;
`;

const Lead = styled.p`
  margin-top: 32px;
  max-width: 720px;
  font-size: clamp(1.1rem, 1.6vw, 1.25rem);
  line-height: 1.7;
  color: ${colors.grayLight};

  & + & {
    margin-top: 20px;
  }
`;

/* --- capabilities --- */
const SectionTitle = styled.h3`
  font-size: clamp(1.6rem, 3vw, 2.25rem);
  font-weight: 800;
  letter-spacing: -1px;
  color: ${colors.white};
  margin-bottom: 40px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 620px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  border-top: 2px solid ${colors.primary};
  padding: 24px 4px 0;
`;

const CardTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${colors.white};
  margin-bottom: 12px;
`;

const CardBody = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: ${colors.grayLight};
`;

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function RevealBlock({ children }) {
  const [ref, visible] = useReveal();
  return (
    <Reveal ref={ref} className={visible ? 'visible' : ''}>
      {children}
    </Reveal>
  );
}

export default function WorkWithMe() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageHero
        title="Work with me"
        intro="Let's explore how we can collaborate — from product strategy through to design execution."
      />
      <Navbar />

      <Band>
        <StatsRow>
          {stats.map((s) => (
            <Stat key={s.label}>
              <StatValue>{s.value}</StatValue>
              <StatLabel>{s.label}</StatLabel>
            </Stat>
          ))}
        </StatsRow>
      </Band>

      <Section>
        <Inner>
          <RevealBlock>
            <Kicker>About</Kicker>
            <Statement>
              I&rsquo;m a design leader who turns ambiguous, high-stakes problems into products
              people trust — pairing strong craft with genuine product strategy.
            </Statement>
            <Lead>
              Over the years I&rsquo;ve partnered with some of Australia&rsquo;s biggest banks and
              brands to ship work that moves metrics and raises the bar for the teams around me.
              I care about the whole journey: the research that makes the customer real, the systems
              that let teams move fast, and the details that make an experience feel effortless.
            </Lead>
            <Lead>
              Whether it&rsquo;s leading a design practice, standing up a design system from zero,
              or getting hands-on in the pixels, I focus on outcomes over output — and on leaving
              things better than I found them.
            </Lead>
          </RevealBlock>
        </Inner>
      </Section>

      <Section>
        <Inner>
          <RevealBlock>
            <SectionTitle>What I can help with</SectionTitle>
            <Grid>
              {capabilities.map((c) => (
                <Card key={c.title}>
                  <CardTitle>{c.title}</CardTitle>
                  <CardBody>{c.body}</CardBody>
                </Card>
              ))}
            </Grid>
          </RevealBlock>
        </Inner>
      </Section>

      <Companies label="Companies I’ve start up" />

      <Contact />
    </>
  );
}
