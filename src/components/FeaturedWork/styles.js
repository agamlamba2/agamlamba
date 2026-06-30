import styled from 'styled-components';
import { Link } from 'react-router-dom';
import colors from '../../assets/styles/variables/colors';

export const Section = styled.section`
  background: ${colors.bg};
  width: 100%;
  padding: 120px 96px;

  @media (max-width: 1200px) {
    padding: 96px 48px;
  }

  @media (max-width: 768px) {
    padding: 64px 20px;
  }
`;

export const Heading = styled.h2`
  font-size: clamp(2.5rem, 6vw, 60px);
  line-height: 1.13;
  font-weight: 800;
  color: ${colors.white};
  text-align: center;
  padding: 24px 0 80px;

  @media (max-width: 768px) {
    padding-bottom: 48px;
  }
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 120px;

  @media (max-width: 768px) {
    gap: 72px;
  }
`;

export const Project = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 32px;
  opacity: 0;
  transform: translateY(48px);
  transition: opacity 0.7s ease, transform 0.7s ease;

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    gap: 20px;
  }
`;

export const Cover = styled.div`
  position: relative;
  width: 100%;
  height: 600px;
  border-radius: 24px;
  overflow: hidden;

  @media (max-width: 1024px) {
    height: 440px;
  }

  @media (max-width: 768px) {
    height: 300px;
    border-radius: 16px;
  }
`;

export const CoverMedia = styled.div`
  position: absolute;
  inset: 0;
  background: ${({ $bg }) => $bg};
  background-size: cover;
  background-position: center;
  transition: transform 0.7s cubic-bezier(0.33, 1, 0.68, 1);

  ${Project}:hover & {
    transform: scale(1.05);
  }
`;

export const Meta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Title = styled.span`
  font-size: 26px;
  font-weight: 600;
  line-height: 40px;
  color: ${colors.white};

  @media (max-width: 768px) {
    font-size: 1.35rem;
    line-height: 1.3;
  }
`;

export const Arrow = styled.span`
  display: inline-flex;
  align-items: center;
  color: ${colors.white};
  transition: transform 0.3s ease;

  ${Project}:hover & {
    transform: translate(5px, -5px);
  }

  svg {
    width: 30px;
    height: 30px;
  }
`;

export const Desc = styled.p`
  font-size: 16px;
  line-height: 22px;
  color: #bdbdbd;
`;
