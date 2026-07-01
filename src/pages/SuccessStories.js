import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import Navbar from '../components/Navbar';
import PageHero from '../components/PageHero';
import Contact from '../components/Contact';
import colors from '../assets/styles/variables/colors';
import quoteIcon from '../assets/quotation.svg';
import { testimonials } from '../data/testimonials';

const Section = styled.section`
  background: ${colors.bg};
  padding: 96px 96px 120px;

  @media (max-width: 1200px) {
    padding: 80px 48px 96px;
  }
  @media (max-width: 768px) {
    padding: 56px 20px 72px;
  }
`;

const SectionHead = styled.div`
  max-width: 760px;
  margin: 0 auto 64px;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: clamp(2.25rem, 5vw, 56px);
  font-weight: 800;
  letter-spacing: -1.5px;
  line-height: 1.1;
  color: ${colors.white};
`;

/* Two independent columns (not a uniform grid) — even entries left, odd right. */
const Columns = styled.div`
  display: flex;
  gap: 24px;
  align-items: flex-start;
  max-width: 1136px;
  margin: 0 auto;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const Column = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const Card = styled.figure`
  margin: 0;
  position: relative;
  background: ${colors.bg};
  border: 1px solid ${colors.borderLight};
  border-radius: 16px;
  padding: 32px 32px 56px;
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s ease, transform 0.7s ease, border-color 0.3s ease;

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }

  &:hover {
    border-color: ${colors.primary};
  }
`;

const Header = styled.div`
  display: flex;
  gap: 24px;
  align-items: flex-start;
`;

const Avatar = styled.div`
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  display: grid;
  place-items: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: ${colors.white};
  background: linear-gradient(135deg, ${colors.primary}, #7a0f2b);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DetailRow = styled.div`
  display: flex;
  gap: 16px;
  align-items: stretch;
  min-height: 80px;
`;

const Separator = styled.span`
  flex-shrink: 0;
  width: 4px;
  background: ${colors.primary};
  border-radius: 2px;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 4px 0;
`;

const Name = styled.p`
  font-size: 14px;
  font-weight: 700;
  line-height: 16px;
  color: ${colors.white};
`;

const Role = styled.p`
  margin-top: 8px;
  font-size: 10px;
  font-weight: 400;
  line-height: 16px;
  color: rgba(255, 255, 255, 0.6);
`;

const Company = styled.p`
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
  color: ${colors.primary};
`;

const QuoteOpen = styled.img`
  display: block;
  width: 40px;
  height: 28px;
  margin: 28px 0 12px;
`;

const QuoteText = styled.blockquote`
  margin: 0;
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
  color: ${colors.white};
  white-space: pre-line;
`;

const QuoteClose = styled.img`
  position: absolute;
  right: 16px;
  bottom: 16px;
  width: 40px;
  height: 28px;
  transform: rotate(180deg);
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
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function TestimonialCard({ item }) {
  const [ref, visible] = useReveal();
  const initials = item.name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  return (
    <Card ref={ref} className={visible ? 'visible' : ''}>
      <Header>
        <Avatar aria-hidden="true">
          {item.avatar ? <img src={item.avatar} alt="" /> : initials}
        </Avatar>
        <DetailRow>
          <Separator aria-hidden="true" />
          <Details>
            <div>
              <Name>{item.name}</Name>
              <Role>{item.role}</Role>
            </div>
            <Company>{item.company}</Company>
          </Details>
        </DetailRow>
      </Header>

      <QuoteOpen src={quoteIcon} alt="" aria-hidden="true" />
      <QuoteText>{item.quote}</QuoteText>
      <QuoteClose src={quoteIcon} alt="" aria-hidden="true" />
    </Card>
  );
}

export default function SuccessStories() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const left = testimonials.filter((_, i) => i % 2 === 0);
  const right = testimonials.filter((_, i) => i % 2 === 1);

  return (
    <>
      <PageHero
        title="Success stories"
        intro="Hear from a few of the clients and colleagues I've worked with over the years."
      />
      <Navbar />

      <Section>
        <SectionHead>
          <SectionTitle>Kind words from the people I&rsquo;ve built with</SectionTitle>
        </SectionHead>
        <Columns>
          <Column>
            {left.map((t) => (
              <TestimonialCard key={t.name} item={t} />
            ))}
          </Column>
          <Column>
            {right.map((t) => (
              <TestimonialCard key={t.name} item={t} />
            ))}
          </Column>
        </Columns>
      </Section>

      <Contact />
    </>
  );
}
