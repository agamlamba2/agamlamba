import React from 'react';
import styled from 'styled-components';

import Navbar from '../components/Navbar';
import Contact from '../components/Contact';
import colors from '../assets/styles/variables/colors';

const Intro = styled.section`
  background: ${colors.bg};
  min-height: 60vh;
  padding: 200px 48px 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 140px 20px 80px;
  }
`;

const Title = styled.h1`
  font-size: clamp(3rem, 7vw, 6rem);
  font-weight: 800;
  letter-spacing: -3px;
  line-height: 1;
  color: ${colors.white};
`;

const Subtitle = styled.p`
  margin-top: 24px;
  font-size: 1.25rem;
  color: ${colors.gray};
  max-width: 540px;
  line-height: 1.6;
`;

export default function Project() {
  return (
    <>
      <Navbar overlay={false} />
      <Intro>
        <Title>Projects</Title>
        <Subtitle>
          A closer look at selected work is coming soon. Check back shortly to
          explore case studies in detail.
        </Subtitle>
      </Intro>
      <Contact />
    </>
  );
}
