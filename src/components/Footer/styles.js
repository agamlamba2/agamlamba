import styled from 'styled-components';
import colors from '../../assets/styles/variables/colors';
import metrics from '../../assets/styles/variables/metrics';

export const FooterSection = styled.footer`
  padding: 0 ${metrics.paddingHorizontal} 40px;
  max-width: ${metrics.maxWidth};
  margin: 0 auto;
`;

export const FooterDivider = styled.div`
  height: 1px;
  background: ${colors.border};
  margin-bottom: 40px;
`;

export const FooterContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FooterText = styled.p`
  font-size: 0.85rem;
  color: ${colors.text.light.little};
  letter-spacing: 0.5px;
`;
