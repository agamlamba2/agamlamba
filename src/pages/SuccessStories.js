import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import Navbar from '../components/Navbar';
import PageHero from '../components/PageHero';
import Companies from '../components/Companies';
import Contact from '../components/Contact';
import colors from '../assets/styles/variables/colors';

/* ---------------------------------------------------------------------------
 * PLACEHOLDER CONTENT — replace the stats and testimonials below with the real
 * copy from agamlamba.com/success-stories. Structure/styling is ready to go.
 * ------------------------------------------------------------------------- */
const stats = [
  { value: '20+', label: 'Products shipped' },
  { value: '16', label: 'Brands & clients' },
  { value: '6', label: 'Major banks' },
  { value: '10M+', label: 'Users reached' },
];

const testimonials = [
  {
    quote:
      'Agam has a rare ability to turn messy, ambiguous problems into clean, shippable product decisions. He raised the bar for our whole design practice.',
    name: 'Jordan R.',
    role: 'Head of Product, Digital Bank',
  },
  {
    quote:
      'Working with Agam changed how our team thinks about research. He made the customer real for everyone in the room, not just the designers.',
    name: 'Priya S.',
    role: 'Design Lead, Fintech',
  },
  {
    quote:
      'He pairs strong craft with genuine strategic thinking — the kind of designer who quietly makes everyone around him better.',
    name: 'Marcus T.',
    role: 'Engineering Manager',
  },
  {
    quote:
      'Agam took our design system from zero to adopted across every team. Pragmatic, fast, and relentlessly focused on outcomes.',
    name: 'Elena K.',
    role: 'Product Director',
  },
  {
    quote:
      'One of the most thoughtful design leaders I have worked with. Calm under pressure and always anchored to the user.',
    name: 'David L.',
    role: 'Founder',
  },
  {
    quote:
      'From brand through to interface, Agam delivered work that genuinely moved our metrics. A true partner, not just a vendor.',
    name: 'Aisha N.',
    role: 'Marketing Lead',
  },
];

const Band = styled.section`
  background: ${colors.bg};
  border-bottom: 1px solid ${colors.borderLight};
  padding: 80px 96px;

  @media (max-width: 1200px) {
    padding: 64px 48px;
  }
  @media (max-width: 768px) {
    padding: 48px 20px;
  }
`;

const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 40px 24px;
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

const Section = styled.section`
  background: ${colors.bg};
  padding: 120px 96px;

  @media (max-width: 1200px) {
    padding: 96px 48px;
  }
  @media (max-width: 768px) {
    padding: 72px 20px;
  }
`;

const SectionHead = styled.div`
  max-width: 760px;
  margin: 0 auto 72px;
  text-align: center;

  @media (max-width: 768px) {
    margin-bottom: 48px;
  }
`;

const SectionKicker = styled.p`
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${colors.primary};
  margin-bottom: 16px;
`;

const SectionTitle = styled.h2`
  font-size: clamp(2.25rem, 5vw, 56px);
  font-weight: 800;
  letter-spacing: -1.5px;
  line-height: 1.1;
  color: ${colors.white};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.figure`
  margin: 0;
  background: ${colors.bgCard};
  border: 1px solid ${colors.borderLight};
  border-radius: 20px;
  padding: 36px 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.7s ease var(--d, 0s), transform 0.7s ease var(--d, 0s),
    border-color 0.3s ease, background 0.3s ease;

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }

  &:hover {
    border-color: ${colors.primary};
    background: ${colors.bgCardHover};
  }
`;

const Quote = styled.blockquote`
  margin: 0;
  font-size: 1.15rem;
  line-height: 1.6;
  color: ${colors.offWhite};

  &::before {
    content: '\\201C';
    display: block;
    font-size: 3rem;
    line-height: 0.4;
    color: ${colors.primary};
    margin-bottom: 12px;
  }
`;

const Author = styled.figcaption`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: auto;
`;

const Avatar = styled.span`
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 1rem;
  font-weight: 700;
  color: ${colors.white};
  background: linear-gradient(135deg, ${colors.primary}, #7a0f2b);
`;

const AuthorMeta = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorName = styled.span`
  font-size: 1rem;
  font-weight: 700;
  color: ${colors.white};
`;

const AuthorRole = styled.span`
  font-size: 0.85rem;
  color: ${colors.gray};
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
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Testimonial({ item, index }) {
  const [ref, visible] = useReveal();
  const initials = item.name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  return (
    <Card
      ref={ref}
      className={visible ? 'visible' : ''}
      style={{ '--d': `${(index % 3) * 0.1}s` }}
    >
      <Quote>{item.quote}</Quote>
      <Author>
        <Avatar aria-hidden="true">{initials}</Avatar>
        <AuthorMeta>
          <AuthorName>{item.name}</AuthorName>
          <AuthorRole>{item.role}</AuthorRole>
        </AuthorMeta>
      </Author>
    </Card>
  );
}

export default function SuccessStories() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageHero
        title="Success stories"
        intro="Hear from a few of the clients and colleagues I've worked with over the years."
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
        <SectionHead>
          <SectionKicker>Testimonials</SectionKicker>
          <SectionTitle>Kind words from the people I&rsquo;ve built with</SectionTitle>
        </SectionHead>
        <Grid>
          {testimonials.map((t, i) => (
            <Testimonial key={t.name} item={t} index={i} />
          ))}
        </Grid>
      </Section>

      <Companies />

      <Contact />
    </>
  );
}
