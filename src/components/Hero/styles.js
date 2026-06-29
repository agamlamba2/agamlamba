import styled, { keyframes } from 'styled-components';
import colors from '../../assets/styles/variables/colors';
import metrics from '../../assets/styles/variables/metrics';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
`;

const lineGrow = keyframes`
  from { height: 0; }
  to { height: 80px; }
`;

export const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 160px ${metrics.paddingHorizontal} 60px;
  max-width: ${metrics.maxWidth};
  margin: 0 auto;
  width: 100%;

  @media (max-width: 768px) {
    padding: 140px ${metrics.paddingHorizontalMobile} 40px;
  }
`;

export const HeroContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const HeroLabel = styled.p`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${colors.gray};
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 32px;
  animation: ${fadeInUp} 0.8s ease forwards;
`;

export const HeroTitle = styled.h1`
  font-size: clamp(3rem, 9vw, 7rem);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -3px;
  color: ${colors.white};

  @media (max-width: 480px) {
    letter-spacing: -1.5px;
  }
`;

export const HeroTitleLine = styled.span`
  display: block;
  opacity: 0;
  animation: ${fadeInUp} 0.8s ease forwards;

  &:nth-child(1) { animation-delay: 0.1s; }
  &:nth-child(2) { animation-delay: 0.25s; }
  &:nth-child(3) { animation-delay: 0.4s; }
`;

export const HeroTitleAccent = styled.span`
  color: ${colors.primary};
`;

export const HeroBottom = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 40px;
  padding-top: 60px;
  opacity: 0;
  animation: ${fadeInUp} 0.8s ease 0.6s forwards;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const HeroDescription = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  color: ${colors.gray};
  max-width: 360px;
  font-weight: 400;
`;

export const ScrollLine = styled.div`
  width: 1px;
  height: 0;
  background: ${colors.primary};
  animation: ${lineGrow} 1s ease 1s forwards;

  @media (max-width: 768px) {
    display: none;
  }
`;
