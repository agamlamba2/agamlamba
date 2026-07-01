import styled, { keyframes } from 'styled-components';
import colors from '../../assets/styles/variables/colors';

const slideIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const HeroSection = styled.section`
  position: relative;
  height: calc(62vh + 64px);
  min-height: 524px;
  width: 100%;
  background: ${colors.bg};
  border-top: 1px solid #4f4f4f;
  border-bottom: 1px solid #4f4f4f;
  overflow: hidden;
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  height: 100%;
  width: 100%;
  padding: 48px 48px 128px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding: 40px 20px 120px;
  }
`;

export const HeroHeading = styled.h1`
  font-size: clamp(2.5rem, 5.5vw, 76px);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -2px;
  color: ${colors.white};
  text-shadow: 0px 2px 12px rgba(0, 0, 0, 0.48);
  animation: ${slideIn} 0.8s ease forwards;

  @media (max-width: 480px) {
    letter-spacing: -1.5px;
  }
`;

export const HeroBottom = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 208px;
  width: 100%;

  @media (max-width: 1200px) {
    gap: 80px;
  }

  @media (max-width: 768px) {
    gap: 0;
  }
`;

export const HeroBottomSpacer = styled.div`
  width: 466px;
  flex-shrink: 0;

  @media (max-width: 1200px) {
    width: 380px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const HeroParagraph = styled.p`
  flex: 1;
  min-width: 0;
  font-size: 26px;
  line-height: 40px;
  font-weight: 600;
  letter-spacing: 0;
  color: ${colors.white};
  text-align: left;
  text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.64);
  animation: ${slideIn} 0.8s ease 0.2s forwards;
  opacity: 0;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    line-height: 1.5;
  }
`;
