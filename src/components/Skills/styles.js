import styled from 'styled-components';
import colors from '../../assets/styles/variables/colors';
import metrics from '../../assets/styles/variables/metrics';

export const SkillsSection = styled.section`
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
`;

export const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const SkillCategory = styled.div`
  padding: 32px;
  background: ${colors.bgSecondary};
  border: 1px solid ${colors.border};
  border-radius: ${metrics.radius.large};
  transition: border-color 0.3s ease;

  &:hover {
    border-color: ${colors.borderLight};
  }
`;

export const CategoryIcon = styled.div`
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: ${colors.accent};
  margin-bottom: 16px;
`;

export const CategoryTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${colors.text.light.very};
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${colors.border};
`;

export const SkillList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const SkillItem = styled.li``;

export const SkillName = styled.span`
  font-size: 0.9rem;
  color: ${colors.text.light.little};
  transition: color 0.3s ease;

  &:hover {
    color: ${colors.text.light.medium};
  }
`;
