import styled, { keyframes } from 'styled-components';
import colors from '../../assets/styles/variables/colors';
import metrics from '../../assets/styles/variables/metrics';

const slideIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const HeroSection = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const HeroContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: ${metrics.maxWidth};
  margin: 0 auto;
  width: 100%;
  padding: 0 ${metrics.paddingHorizontal};

  @media (max-width: 768px) {
    padding: 0 ${metrics.paddingHorizontalMobile};
  }
`;

export const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: end;
  padding: 160px 0 60px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 120px 0 40px;
    gap: 24px;
  }
`;

export const HeroLeft = styled.div`
  animation: ${slideIn} 0.8s ease forwards;
`;

export const HeroHeading = styled.h1`
  font-size: clamp(3.5rem, 8vw, 7rem);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -3px;
  color: ${colors.white};

  @media (max-width: 480px) {
    letter-spacing: -1.5px;
  }
`;

export const HeroRight = styled.div`
  padding-bottom: 16px;
  animation: ${slideIn} 0.8s ease 0.2s forwards;
  opacity: 0;
`;

export const HeroParagraph = styled.p`
  font-size: 1.05rem;
  line-height: 1.7;
  color: ${colors.gray};
  max-width: 420px;
`;

export const HeroSlider = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 7;
  border-radius: ${metrics.radius.large};
  overflow: hidden;
  margin-top: auto;
  animation: ${slideIn} 0.8s ease 0.4s forwards;
  opacity: 0;

  @media (max-width: 768px) {
    aspect-ratio: 16 / 9;
  }
`;

export const SlideImage = styled.div`
  position: absolute;
  inset: 0;
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transition: opacity 0.6s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    font-size: 3rem;
    font-weight: 800;
    color: rgba(255, 255, 255, 0.06);
    letter-spacing: -1px;
    text-transform: uppercase;
  }
`;

export const SliderDots = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 10;
`;

export const SliderDot = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: ${({ $active }) => ($active ? colors.white : 'rgba(255,255,255,0.3)')};
  transition: background 0.3s ease;
  cursor: pointer;

  &:hover {
    background: ${colors.white};
  }
`;
