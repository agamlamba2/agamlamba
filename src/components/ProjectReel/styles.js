import styled from 'styled-components';
import { Link } from 'react-router-dom';
import colors from '../../assets/styles/variables/colors';

export const Section = styled.section`
  position: relative;
  background: ${colors.bg};
`;

export const Pin = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
`;

export const Slide = styled.div`
  position: absolute;
  inset: 0;
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transition: opacity 0.8s ease;
  pointer-events: ${({ $active }) => ($active ? 'auto' : 'none')};
`;

export const SlideBg = styled.div`
  position: absolute;
  inset: 0;
  background-image: url(${({ $src }) => $src});
  background-size: cover;
  background-position: center;
  transform: scale(${({ $active }) => ($active ? 1.04 : 1)});
  transition: transform 6s ease;
`;

export const SlideOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
`;

export const SlideContent = styled.div`
  position: relative;
  z-index: 2;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 48px 160px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 0 20px 180px;
  }
`;

export const SlideTitle = styled.h2`
  font-size: clamp(3rem, 9vw, 128px);
  font-weight: 800;
  letter-spacing: -3px;
  line-height: 1;
  color: ${colors.white};
  text-shadow: 0 2px 18px rgba(0, 0, 0, 0.5);
`;

export const SlideDesc = styled.p`
  margin-top: 24px;
  max-width: 520px;
  font-size: 1.15rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.88);
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.5);
`;

export const CaseLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-top: 32px;
  font-size: 1rem;
  font-weight: 600;
  color: ${colors.white};
  width: fit-content;

  svg {
    width: 20px;
    height: 20px;
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateX(5px);
  }
`;

export const Index = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 48px;
  z-index: 3;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 48px;
  display: flex;
  flex-wrap: wrap;
  gap: 28px;

  @media (max-width: 768px) {
    padding: 0 20px;
    bottom: 28px;
    gap: 16px;
  }
`;

export const IndexItem = styled.button`
  position: relative;
  background: none;
  border: none;
  padding: 0 0 8px;
  cursor: pointer;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: ${colors.white};
  opacity: ${({ $active }) => ($active ? 1 : 0.4)};
  transition: opacity 0.3s ease;
  white-space: nowrap;

  &:hover {
    opacity: 1;
  }
`;

export const IndexFill = styled.span`
  position: absolute;
  left: 0;
  bottom: 0;
  height: 2px;
  width: 0%;
  background: ${colors.primary};
`;
