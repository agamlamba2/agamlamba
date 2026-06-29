import styled from 'styled-components';
import colors from '../../assets/styles/variables/colors';
import metrics from '../../assets/styles/variables/metrics';

export const FooterSection = styled.footer`
  padding: 80px 0 40px;
  border-top: 1px solid ${colors.borderLight};
`;

export const FooterContainer = styled.div`
  max-width: ${metrics.maxWidth};
  margin: 0 auto;
  padding: 0 ${metrics.paddingHorizontal};

  @media (max-width: 768px) {
    padding: 0 ${metrics.paddingHorizontalMobile};
  }
`;

export const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 60px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 40px;
  }
`;

export const FooterLeft = styled.div``;

export const FooterLogo = styled.p`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${colors.white};
  margin-bottom: 8px;
  letter-spacing: -0.5px;
`;

export const FooterTagline = styled.p`
  font-size: 0.875rem;
  color: ${colors.gray};
`;

export const FooterRight = styled.div``;

export const FooterLinks = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
`;

export const FooterLink = styled.button`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${colors.gray};
  font-family: 'Plus Jakarta Sans', sans-serif;
  transition: color 0.3s ease;

  &:hover {
    color: ${colors.primary};
  }
`;

export const FooterBottom = styled.div`
  padding-top: 32px;
  border-top: 1px solid ${colors.borderLight};
`;

export const FooterCopyright = styled.p`
  font-size: 0.8rem;
  color: ${colors.grayDark};
`;
