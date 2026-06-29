import styled from 'styled-components';
import colors from '../../assets/styles/variables/colors';
import metrics from '../../assets/styles/variables/metrics';

export const ProjectsSection = styled.section`
  padding: ${metrics.sectionPadding} 0;

  @media (max-width: 768px) {
    padding: ${metrics.sectionPaddingMobile} 0;
  }
`;

export const ProjectsContainer = styled.div`
  max-width: ${metrics.maxWidth};
  margin: 0 auto;
  padding: 0 ${metrics.paddingHorizontal};

  @media (max-width: 768px) {
    padding: 0 ${metrics.paddingHorizontalMobile};
  }
`;

export const ProjectsLabel = styled.p`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${colors.primary};
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 16px;
`;

export const ProjectsTitle = styled.h2`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: ${colors.white};
  letter-spacing: -1px;
  margin-bottom: 60px;
`;

export const ProjectsList = styled.div``;

export const ProjectDivider = styled.div`
  height: 1px;
  background: ${colors.borderLight};
`;

export const ProjectCard = styled.a`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  padding: 48px 0;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.85;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 32px 0;
  }
`;

export const ProjectImageArea = styled.div`
  aspect-ratio: 16 / 10;
  border-radius: ${metrics.radius.large};
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 24px;
  overflow: hidden;
`;

export const ProjectNumber = styled.span`
  font-size: 5rem;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.06);
  line-height: 1;
  letter-spacing: -2px;
`;

export const ProjectInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ProjectCategory = styled.p`
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${colors.primary};
  margin-bottom: 16px;
`;

export const ProjectName = styled.h3`
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  font-weight: 700;
  color: ${colors.white};
  margin-bottom: 16px;
  letter-spacing: -0.5px;
`;

export const ProjectDescription = styled.p`
  font-size: 0.95rem;
  line-height: 1.7;
  color: ${colors.gray};
  margin-bottom: 24px;
  max-width: 440px;
`;

export const ProjectLink = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${colors.white};
  transition: color 0.3s ease;

  &:hover {
    color: ${colors.primary};
  }
`;
