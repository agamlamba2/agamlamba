import styled from 'styled-components';
import colors from '../../assets/styles/variables/colors';
import metrics from '../../assets/styles/variables/metrics';

export const ContactSection = styled.section`
  padding: 120px ${metrics.paddingHorizontal};
  max-width: ${metrics.maxWidth};
  margin: 0 auto;
`;

export const SectionHeader = styled.div`
  margin-bottom: 60px;
  text-align: center;
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

export const ContactContent = styled.div`
  text-align: center;
`;

export const ContactText = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${colors.text.light.little};
  max-width: 550px;
  margin: 0 auto 48px;
`;

export const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  max-width: 600px;
  margin: 0 auto 48px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const ContactCard = styled.a`
  display: block;
  padding: 32px;
  background: ${colors.bgSecondary};
  border: 1px solid ${colors.border};
  border-radius: ${metrics.radius.large};
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${colors.accent};
    transform: translateY(-2px);
  }
`;

export const ContactCardIcon = styled.div`
  color: ${colors.accent};
  margin-bottom: 16px;
`;

export const ContactCardTitle = styled.h3`
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${colors.text.light.little};
  margin-bottom: 8px;
`;

export const ContactCardValue = styled.p`
  font-size: 0.95rem;
  color: ${colors.text.light.very};
`;

export const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
`;

export const SocialLink = styled.a`
  width: 48px;
  height: 48px;
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
