import styled, { css } from 'styled-components';
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

  /* Each line eases in from the left with a gentle overshoot, staggered. */
  h2,
  p,
  a {
    opacity: 0;
    transform: translateX(-56px);
    transition: opacity 0.7s ease, transform 0.85s cubic-bezier(0.22, 1.2, 0.36, 1);
  }

  ${({ $active }) =>
    $active &&
    css`
      h2 {
        opacity: 1;
        transform: translateX(0);
        transition-delay: 0.1s;
      }
      p {
        opacity: 1;
        transform: translateX(0);
        transition-delay: 0.26s;
      }
      a {
        opacity: 1;
        transform: translateX(0);
        transition-delay: 0.42s;
      }
    `}

  @media (max-width: 900px) {
    left: 20px;
    right: 20px;
  }
`;

export const Title = styled.h2`
  font-size: clamp(2.25rem, 4vw, 60px);
  font-weight: 600;
  letter-spacing: -1px;
  line-height: 1.13;
  color: ${colors.white};
`;

export const Desc = styled.p`
  margin-top: 24px;
  max-width: 540px;
  font-size: clamp(1.1rem, 1.7vw, 26px);
  line-height: 1.54;
  font-weight: 500;
  color: #bdbdbd;

  @media (max-width: 900px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

export const CaseLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-top: 48px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0;
  text-transform: none;
  color: ${colors.white};

  svg {
    width: 30px;
    height: 30px;
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translate(5px, -5px);
  }
`;

/* ---- Right card conveyor ---- */
export const Stage = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 12%;
  left: 40%;
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

/* ---- Right pagination rail (vertical pills) ---- */
export const Rail = styled.div`
  position: absolute;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 4;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  opacity: 0;
  transition: opacity 0.6s ease;
  filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.25));

  @media (max-width: 900px) {
    right: 16px;
    gap: 16px;
  }
`;

const dashHeight = ({ $size }) =>
  $size === 'full' ? 32 : $size === 'medium' ? 20 : $size === 'small' ? 12 : 0;

export const Dot = styled.button`
  /* Hidden pills are removed from layout so they don't reserve gap space and
     push the visible cluster off-centre. */
  display: ${({ $size }) => ($size === 'hidden' ? 'none' : 'block')};
  width: 12px;
  height: ${(p) => dashHeight(p)}px;
  padding: 0;
  border: none;
  border-radius: 99px;
  cursor: pointer;
  background: ${({ $active }) => ($active ? colors.white : '#4f4f4f')};
  transition: height 0.35s cubic-bezier(0.22, 1.2, 0.36, 1), background 0.3s ease;

  &:hover {
    background: ${({ $active }) => ($active ? colors.white : '#6f6f6f')};
  }
`;
