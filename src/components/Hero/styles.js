import styled, { keyframes } from 'styled-components';
import colors from '../../assets/styles/variables/colors';
import metrics from '../../assets/styles/variables/metrics';

const slideIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const HeroSection = styled.section`
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
`;

export const SlideImage = styled.div`
  position: absolute;
  inset: 0;
  background-image: url(${({ $src }) => $src});
  background-size: cover;
  background-position: center;
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transition: opacity 1s ease;
`;

export const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.35) 0%,
    rgba(0, 0, 0, 0) 35%,
    rgba(0, 0, 0, 0.15) 70%,
    rgba(0, 0, 0, 0.55) 100%
  );
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  height: 100%;
  max-width: ${metrics.maxWidth};
  margin: 0 auto;
  padding: 48px ${metrics.paddingHorizontal} 140px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding: 40px ${metrics.paddingHorizontalMobile} 120px;
  }
`;

export const HeroHeading = styled.h1`
  font-size: clamp(3.5rem, 8vw, 7rem);
  font-weight: 800;
  line-height: 1.02;
  letter-spacing: -3px;
  color: ${colors.white};
  animation: ${slideIn} 0.8s ease forwards;

  @media (max-width: 480px) {
    letter-spacing: -1.5px;
  }
`;

export const HeroParagraph = styled.p`
  align-self: flex-end;
  max-width: 460px;
  font-size: 1.4rem;
  line-height: 1.5;
  font-weight: 500;
  color: ${colors.white};
  text-align: left;
  animation: ${slideIn} 0.8s ease 0.2s forwards;
  opacity: 0;

  @media (max-width: 768px) {
    font-size: 1.15rem;
    max-width: 320px;
  }
`;

export const SliderDots = styled.div`
  position: absolute;
  bottom: 120px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 3;

  @media (max-width: 768px) {
    bottom: 100px;
  }
`;

export const SliderDot = styled.button`
  width: 9px;
  height: 9px;
  border-radius: 50%;
  border: none;
  background: ${({ $active }) => ($active ? colors.white : 'rgba(255,255,255,0.4)')};
  transition: background 0.3s ease;
  cursor: pointer;

  &:hover {
    background: ${colors.white};
  }
`;
