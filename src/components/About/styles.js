import styled from 'styled-components';
import colors from '../../assets/styles/variables/colors';
import metrics from '../../assets/styles/variables/metrics';

export const AboutSection = styled.section`
  padding: ${metrics.sectionPadding} 0;

  @media (max-width: 768px) {
    padding: ${metrics.sectionPaddingMobile} 0;
  }
`;

export const AboutContainer = styled.div`
  max-width: ${metrics.maxWidth};
  margin: 0 auto;
  padding: 0 ${metrics.paddingHorizontal};

  @media (max-width: 768px) {
    padding: 0 ${metrics.paddingHorizontalMobile};
  }
`;

export const AboutLabel = styled.p`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${colors.primary};
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 48px;
`;

export const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 48px;
  }
`;

export const AboutLeft = styled.div``;

export const AboutTitle = styled.h2`
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 700;
  line-height: 1.2;
  color: ${colors.white};
  letter-spacing: -1px;
  margin-bottom: 48px;
`;

export const AboutImageWrapper = styled.div`
  width: 100%;
  max-width: 480px;
`;

export const AboutImagePlaceholder = styled.div`
  width: 100%;
  aspect-ratio: 4 / 5;
  background: ${colors.bgCard};
  border-radius: ${metrics.radius.large};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  span {
    font-size: 5rem;
    font-weight: 800;
    color: ${colors.borderLight};
    letter-spacing: -2px;
  }
`;

export const AboutRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const AboutDescription = styled.p`
  font-size: 1.05rem;
  line-height: 1.8;
  color: ${colors.gray};
  margin-bottom: 24px;

  &:last-of-type {
    margin-bottom: 48px;
  }
`;

export const AboutStats = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
  }
`;

export const StatItem = styled.div``;

export const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  color: ${colors.white};
  letter-spacing: -1px;
  margin-bottom: 4px;
`;

export const StatLabel = styled.div`
  font-size: 0.8rem;
  color: ${colors.gray};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const StatDivider = styled.div`
  width: 1px;
  height: 60px;
  background: ${colors.borderLight};

  @media (max-width: 480px) {
    width: 60px;
    height: 1px;
  }
`;
