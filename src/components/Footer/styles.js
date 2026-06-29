import styled from 'styled-components';
import colors from '../../assets/styles/variables/colors';
import metrics from '../../assets/styles/variables/metrics';

export const FooterSection = styled.footer`
  position: relative;
  padding: 40px 0 0;
`;

export const FooterContainer = styled.div`
  max-width: ${metrics.maxWidth};
  margin: 0 auto;
  padding: 32px ${metrics.paddingHorizontal};
  border-top: 1px solid ${colors.borderLight};

  @media (max-width: 768px) {
    padding: 24px ${metrics.paddingHorizontalMobile};
  }
`;

export const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 32px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 20px;
  }
`;

export const FooterLink = styled.a`
  font-size: 0.85rem;
  font-weight: 500;
  color: ${colors.gray};
  transition: color 0.3s ease;

  &:hover {
    color: ${colors.white};
  }
`;

export const FooterFilling = styled.div`
  height: 4px;
  background: ${colors.primary};
  transition: width 1.5s ease;
  margin-top: 32px;
`;
