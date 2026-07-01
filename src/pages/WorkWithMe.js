import React, { useEffect } from 'react';
import styled from 'styled-components';

import Navbar from '../components/Navbar';
import PageHero from '../components/PageHero';
import Contact from '../components/Contact';
import colors from '../assets/styles/variables/colors';

/* PLACEHOLDER figures — replace with the real numbers. */
const stats = [
  { value: '20+', label: 'Products shipped' },
  { value: '16', label: 'Brands & clients' },
  { value: '6', label: 'Major banks' },
  { value: '10M+', label: 'Users reached' },
];

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

      <Contact />
    </>
  );
}
