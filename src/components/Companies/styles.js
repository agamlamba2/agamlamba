import styled from 'styled-components';
import colors from '../../assets/styles/variables/colors';

export const CompaniesSection = styled.section`
  background: ${colors.bg};
  width: 100%;
  padding: 112px 96px;

  @media (max-width: 1200px) {
    padding: 72px 48px;
  }

  @media (max-width: 768px) {
    padding: 32px 20px;
  }
`;

export const CompaniesContainer = styled.div`
  padding: 48px 24px;

  @media (max-width: 768px) {
    padding: 24px 12px;
  }
`;

export const CompaniesLabel = styled.p`
  font-size: 26px;
  font-weight: 600;
  line-height: 40px;
  color: #8f8f8f;
  text-align: center;
  padding-top: 24px;
  padding-bottom: 24px;

  @media (max-width: 768px) {
    font-size: 1.25rem;
    line-height: 1.5;
  }
`;

export const LogoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const LogoCell = styled.div`
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  opacity: 0.75;
  overflow: hidden; /* clips each logo so it slides up into the frame */

  &:hover {
    opacity: 1;
  }

  @media (max-width: 768px) {
    height: 120px;
  }
`;

export const LogoImg = styled.img`
  height: ${({ $height }) => $height}px;
  width: auto;
  max-width: 100%;
  object-fit: contain;
  will-change: transform;

  /* transform is set inline per-frame for the staggered slide-up */

  @media (max-width: 768px) {
    height: ${({ $height }) => Math.round($height * 0.85)}px;
  }
`;
