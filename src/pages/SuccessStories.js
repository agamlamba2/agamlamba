import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import Navbar from '../components/Navbar';
import PageHero from '../components/PageHero';
import Contact from '../components/Contact';
import colors from '../assets/styles/variables/colors';
import { testimonials } from '../data/testimonials';

const Section = styled.section`
  background: ${colors.bg};
  padding: 112px 96px 128px;

  @media (max-width: 1200px) {
    padding: 88px 48px 104px;
  }
  @media (max-width: 768px) {
    padding: 64px 20px 80px;
  }
`;

/* Two independent columns (not a uniform grid) — even entries left, odd right. */
const Columns = styled.div`
  display: flex;
  gap: 64px;
  align-items: flex-start;
  max-width: 1184px;
  margin: 0 auto;

  @media (max-width: 1000px) {
    flex-direction: column;
    gap: 80px;
  }
`;

const Column = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 80px;

  @media (max-width: 1000px) {
    width: 100%;
  }
`;

const Story = styled.figure`
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 44px;
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s ease, transform 0.7s ease;

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Header = styled.div`
  display: flex;
  gap: 32px;
  align-items: flex-start;
`;

const Avatar = styled.div`
  flex-shrink: 0;
  width: 104px;
  height: 104px;
  border-radius: 50%;
  overflow: hidden;
  display: grid;
  place-items: center;
  font-size: 2rem;
  font-weight: 700;
  color: ${colors.white};
  background: linear-gradient(135deg, ${colors.primary}, #7a0f2b);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Details = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-left: 36px;
  padding-bottom: 8px;
  border-left: 4px solid ${colors.primary};
`;

const NameRole = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Name = styled.p`
  font-size: 26px;
  font-weight: 700;
  line-height: 40px;
  color: ${colors.white};
`;

const Role = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  color: rgba(255, 255, 255, 0.6);
`;

const Company = styled.p`
  font-size: 20px;
  font-weight: 700;
  line-height: 26px;
  color: ${colors.primary};
`;

const Quote = styled.blockquote`
  margin: 0;
  font-size: 20px;
  font-weight: 400;
  line-height: 26px;
  color: #f2f2f2;
`;

const QuoteP = styled.p`
  & + & {
    margin-top: 26px;
  }
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
    <Story ref={ref} className={visible ? 'visible' : ''}>
      <Header>
        <Avatar aria-hidden="true">
          {item.avatar ? <img src={item.avatar} alt="" /> : initials}
        </Avatar>
        <Details>
          <NameRole>
            <Name>{item.name}</Name>
            <Role>{item.role}</Role>
          </NameRole>
          <Company>{item.company}</Company>
        </Details>
      </Header>
      <Quote>
        {item.quote.split('\n').map((para, i) => (
          <QuoteP key={i}>{para}</QuoteP>
        ))}
      </Quote>
    </Story>
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
