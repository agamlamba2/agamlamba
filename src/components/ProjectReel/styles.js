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
  display: flex;
  align-items: center;
`;

/* ---- Left text column ---- */
export const TextCol = styled.div`
  position: relative;
  z-index: 3;
  width: 46%;
  padding: 0 0 0 48px;
  pointer-events: none;

  @media (max-width: 900px) {
    width: 100%;
    padding: 0 20px;
    text-align: center;
  }
`;

export const TextItem = styled.div`
  position: absolute;
  top: 50%;
  left: 48px;
  right: 24px;
  transform: translateY(-50%);
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transition: opacity 0.5s ease;
  pointer-events: ${({ $active }) => ($active ? 'auto' : 'none')};

  @media (max-width: 900px) {
    left: 20px;
    right: 20px;
  }
`;

export const Title = styled.h2`
  font-size: clamp(2.25rem, 4.5vw, 68px);
  font-weight: 800;
  letter-spacing: -2px;
  line-height: 1.02;
  color: ${colors.white};
`;

export const Desc = styled.p`
  margin-top: 24px;
  max-width: 440px;
  font-size: 1.1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.82);

  @media (max-width: 900px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

export const CaseLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-top: 32px;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: ${colors.white};

  svg {
    width: 20px;
    height: 20px;
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateX(6px);
  }
`;

/* ---- Right card conveyor ---- */
export const Stage = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 6%;
  left: 50%;
  perspective: 1600px;
  pointer-events: none;

  @media (max-width: 900px) {
    left: 0;
    right: 0;
    opacity: 0.28;
  }
`;

export const Card = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: min(42vw, 640px);
  height: min(58vh, 460px);
  margin: 0;
  border-radius: 8px;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  background-image: url(${({ $src }) => $src});
  will-change: transform, opacity;
  transform-origin: center center;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.45);

  @media (max-width: 900px) {
    width: 70vw;
    height: 40vh;
  }
`;

/* ---- Right dotted progress rail ---- */
export const Rail = styled.div`
  position: absolute;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 4;
  display: flex;
  flex-direction: column;
  gap: 14px;
  opacity: 0;
  transition: opacity 0.6s ease;

  @media (max-width: 900px) {
    right: 16px;
  }
`;

export const Dot = styled.button`
  width: 8px;
  height: 8px;
  padding: 0;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  background: ${({ $active }) => ($active ? colors.white : 'rgba(255,255,255,0.3)')};
  transform: scale(${({ $active }) => ($active ? 1.3 : 1)});
  transition: background 0.3s ease, transform 0.3s ease;

  &:hover {
    background: ${colors.white};
  }
`;
