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

export const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 4px 1fr;
  gap: 0;
  align-items: center;
  min-height: 500px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 60px;
    min-height: auto;
  }
`;

export const ContactLeft = styled.div`
  padding-right: 80px;

  @media (max-width: 900px) {
    padding-right: 0;
  }
`;

export const ContactTitle = styled.h2`
  font-size: clamp(2.5rem, 5.5vw, 4.5rem);
  font-weight: 800;
  color: ${colors.white};
  line-height: 1.1;
  letter-spacing: -2px;
`;

export const ContactTitleAccent = styled.span`
  color: ${colors.primary};
  font-style: italic;
`;

export const VerticalAccent = styled.div`
  width: 4px;
  height: 100%;
  min-height: 400px;
  background: ${colors.primary};
  justify-self: center;

  @media (max-width: 900px) {
    display: none;
  }
`;

export const ContactRight = styled.div`
  padding-left: 80px;

  @media (max-width: 900px) {
    padding-left: 0;
  }
`;

export const ContactLinksList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContactDivider = styled.div`
  height: 1px;
  background: ${colors.borderLight};
`;

export const ContactLinkItem = styled.a`
  display: flex;
  align-items: center;
  padding: 32px 0;
  transition: all 0.3s ease;

  &:hover {
    padding-left: 16px;
  }
`;

export const ContactLinkText = styled.span`
  font-size: 1.1rem;
  font-weight: 500;
  color: ${colors.white};
  transition: color 0.3s ease;

  ${ContactLinkItem}:hover & {
    color: ${colors.primary};
  }
`;
