import styled from 'styled-components';
import colors from '../../assets/styles/variables/colors';
import metrics from '../../assets/styles/variables/metrics';

export const ContactSection = styled.section`
  padding: ${metrics.sectionPadding} 0;

  @media (max-width: 768px) {
    padding: ${metrics.sectionPaddingMobile} 0;
  }
`;

export const ContactContainer = styled.div`
  max-width: ${metrics.maxWidth};
  margin: 0 auto;
  padding: 0 ${metrics.paddingHorizontal};

  @media (max-width: 768px) {
    padding: 0 ${metrics.paddingHorizontalMobile};
  }
`;

export const ContactLabel = styled.p`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${colors.primary};
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 48px;
`;

export const ContactTitle = styled.h2`
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 800;
  color: ${colors.white};
  line-height: 1.1;
  letter-spacing: -2px;
  margin-bottom: 32px;
`;

export const ContactTitleAccent = styled.span`
  color: ${colors.primary};
`;

export const ContactDescription = styled.p`
  font-size: 1.05rem;
  line-height: 1.8;
  color: ${colors.gray};
  max-width: 500px;
  margin-bottom: 48px;
`;

export const ContactCTA = styled.div`
  margin-bottom: 48px;
`;

export const ContactEmail = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 16px;
  font-size: clamp(1.25rem, 3vw, 2rem);
  font-weight: 700;
  color: ${colors.white};
  padding: 20px 32px;
  border: 1px solid ${colors.borderLight};
  border-radius: 60px;
  transition: all 0.3s ease;
  letter-spacing: -0.5px;

  &:hover {
    border-color: ${colors.primary};
    background: ${colors.primary};
  }

  @media (max-width: 480px) {
    padding: 16px 24px;
  }
`;

export const ContactEmailArrow = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ContactDivider = styled.div`
  height: 1px;
  background: ${colors.borderLight};
  margin-bottom: 40px;
`;

export const ContactSocials = styled.div`
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
`;

export const ContactSocialLink = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  color: ${colors.gray};
  transition: color 0.3s ease;

  &:hover {
    color: ${colors.primary};
  }
`;
