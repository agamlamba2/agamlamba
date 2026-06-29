import styled from 'styled-components';
import colors from '../../assets/styles/variables/colors';
import metrics from '../../assets/styles/variables/metrics';

export const ServicesSection = styled.section`
  padding: ${metrics.sectionPadding} 0;

  @media (max-width: 768px) {
    padding: ${metrics.sectionPaddingMobile} 0;
  }
`;

export const ServicesContainer = styled.div`
  max-width: ${metrics.maxWidth};
  margin: 0 auto;
  padding: 0 ${metrics.paddingHorizontal};

  @media (max-width: 768px) {
    padding: 0 ${metrics.paddingHorizontalMobile};
  }
`;

export const ServicesLabel = styled.p`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${colors.primary};
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 16px;
`;

export const ServicesTitle = styled.h2`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: ${colors.white};
  letter-spacing: -1px;
  margin-bottom: 60px;
`;

export const ServicesList = styled.div``;

export const ServiceDivider = styled.div`
  height: 1px;
  background: ${colors.borderLight};
`;

export const ServiceItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 40px;
  padding: 40px 0;
  transition: all 0.3s ease;
  cursor: default;

  &:hover {
    padding-left: 16px;
  }

  @media (max-width: 768px) {
    gap: 24px;
    padding: 28px 0;
  }
`;

export const ServiceNumber = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${colors.primary};
  flex-shrink: 0;
  padding-top: 8px;
`;

export const ServiceContent = styled.div``;

export const ServiceName = styled.h3`
  font-size: clamp(1.25rem, 2.5vw, 1.75rem);
  font-weight: 700;
  color: ${colors.white};
  margin-bottom: 12px;
  letter-spacing: -0.5px;
`;

export const ServiceDescription = styled.p`
  font-size: 0.95rem;
  line-height: 1.7;
  color: ${colors.gray};
  max-width: 500px;
`;
