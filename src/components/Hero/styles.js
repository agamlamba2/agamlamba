import styled, { keyframes } from 'styled-components';
import colors from '../../assets/styles/variables/colors';
import metrics from '../../assets/styles/variables/metrics';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(8px); }
`;

export const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 0 ${metrics.paddingHorizontal};
  text-align: center;
`;

export const HeroContent = styled.div`
  max-width: 800px;
`;

export const Greeting = styled.p`
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: ${colors.accent};
  margin-bottom: 20px;
  animation: ${fadeInUp} 0.8s ease forwards;
`;

export const HeroTitle = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 700;
  color: ${colors.text.light.very};
  line-height: 1.1;
  margin-bottom: 20px;
  animation: ${fadeInUp} 0.8s ease 0.2s forwards;
  opacity: 0;
`;

export const HeroSubtitle = styled.h2`
  font-size: clamp(1.2rem, 3vw, 1.6rem);
  font-weight: 300;
  color: ${colors.text.light.little};
  margin-bottom: 24px;
  letter-spacing: 2px;
  animation: ${fadeInUp} 0.8s ease 0.4s forwards;
  opacity: 0;
`;

export const HeroDescription = styled.p`
  font-size: 1.05rem;
  line-height: 1.8;
  color: ${colors.text.light.little};
  max-width: 550px;
  margin: 0 auto;
  animation: ${fadeInUp} 0.8s ease 0.6s forwards;
  opacity: 0;
`;

export const ScrollIndicator = styled.button`
  position: absolute;
  bottom: 40px;
  background: none;
  border: 1px solid ${colors.borderLight};
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.text.light.little};
  animation: ${bounce} 2s ease infinite, ${fadeInUp} 0.8s ease 0.8s forwards;
  opacity: 0;
  transition: border-color 0.3s ease, color 0.3s ease;

  &:hover {
    border-color: ${colors.accent};
    color: ${colors.accent};
  }
`;
