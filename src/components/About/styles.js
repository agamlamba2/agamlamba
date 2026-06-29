import styled from 'styled-components';
import colors from '../../assets/styles/variables/colors';
import metrics from '../../assets/styles/variables/metrics';

export const AboutSection = styled.section`
  padding: 120px ${metrics.paddingHorizontal};
  max-width: ${metrics.maxWidth};
  margin: 0 auto;
`;

export const SectionHeader = styled.div`
  margin-bottom: 60px;
`;

export const SectionLabel = styled.p`
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: ${colors.accent};
  margin-bottom: 16px;
`;

export const SectionTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 600;
  color: ${colors.text.light.very};
  line-height: 1.2;
  max-width: 600px;
`;

export const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

export const AboutText = styled.div``;

export const AboutParagraph = styled.p`
  font-size: 1.05rem;
  line-height: 1.8;
  color: ${colors.text.light.little};
  margin-bottom: 20px;

  &:last-of-type {
    margin-bottom: 40px;
  }
`;

export const AboutImageWrapper = styled.div`
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    order: -1;
  }
`;

export const AboutImage = styled.div`
  width: 100%;
  max-width: 400px;
  aspect-ratio: 3 / 4;
  background: ${colors.bgSecondary};
  border: 1px solid ${colors.border};
  border-radius: ${metrics.radius.large};
  overflow: hidden;
  position: relative;

  .placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Playfair Display', serif;
    font-size: 4rem;
    color: ${colors.borderLight};
    background: linear-gradient(135deg, ${colors.bgSecondary} 0%, ${colors.bgTertiary} 100%);
  }
`;

export const StatsRow = styled.div`
  display: flex;
  gap: 40px;

  @media (max-width: 480px) {
    gap: 24px;
  }
`;

export const StatItem = styled.div``;

export const StatNumber = styled.div`
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  font-weight: 700;
  color: ${colors.text.light.very};
  margin-bottom: 4px;
`;

export const StatLabel = styled.div`
  font-size: 0.8rem;
  color: ${colors.text.light.little};
  letter-spacing: 1px;
  text-transform: uppercase;
`;
