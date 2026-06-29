import styled from 'styled-components';
import colors from '../../assets/styles/variables/colors';
import metrics from '../../assets/styles/variables/metrics';

export const ProjectsSection = styled.section`
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

export const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ProjectCard = styled.div`
  background: ${colors.bgSecondary};
  border: 1px solid ${colors.border};
  border-radius: ${metrics.radius.large};
  overflow: hidden;
  transition: transform 0.3s ease, border-color 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: ${colors.borderLight};
  }
`;

export const ProjectImageArea = styled.div`
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    font-family: 'Playfair Display', serif;
    font-size: 4rem;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.08);
  }
`;

export const ProjectInfo = styled.div`
  padding: 28px;
`;

export const ProjectCategory = styled.p`
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${colors.accent};
  margin-bottom: 10px;
`;

export const ProjectName = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 1.4rem;
  font-weight: 600;
  color: ${colors.text.light.very};
  margin-bottom: 12px;
`;

export const ProjectDescription = styled.p`
  font-size: 0.95rem;
  line-height: 1.7;
  color: ${colors.text.light.little};
  margin-bottom: 20px;
`;

export const ProjectTech = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
`;

export const TechTag = styled.span`
  font-size: 0.75rem;
  padding: 4px 12px;
  background: ${colors.bgTertiary};
  border: 1px solid ${colors.border};
  border-radius: 20px;
  color: ${colors.text.light.little};
  letter-spacing: 0.5px;
`;

export const ProjectLinks = styled.div`
  display: flex;
  gap: 12px;
`;

export const ProjectLink = styled.a`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${colors.border};
  border-radius: 50%;
  color: ${colors.text.light.little};
  transition: all 0.3s ease;

  &:hover {
    border-color: ${colors.accent};
    color: ${colors.accent};
  }
`;
