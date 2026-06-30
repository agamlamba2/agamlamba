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
  border-top: 1px solid #4f4f4f;
  border-bottom: 1px solid #4f4f4f;
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
  background: rgba(0, 0, 0, 0.4);
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
  font-size: clamp(3.5rem, 8vw, 115px);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -3px;
  color: ${colors.white};
  text-shadow: 0px 2px 12px rgba(0, 0, 0, 0.48);
  animation: ${slideIn} 0.8s ease forwards;

  @media (max-width: 480px) {
    letter-spacing: -1.5px;
  }
`;

export const HeroParagraph = styled.p`
  align-self: flex-end;
  max-width: 480px;
  font-size: 26px;
  line-height: 40px;
  font-weight: 600;
  color: ${colors.white};
  text-align: left;
  text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.64);
  animation: ${slideIn} 0.8s ease 0.2s forwards;
  opacity: 0;

  @media (max-width: 768px) {
    font-size: 1.25rem;
    line-height: 1.5;
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
