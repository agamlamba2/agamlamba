import styled, { keyframes } from 'styled-components';
import colors from '../../assets/styles/variables/colors';

const scroll = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`;

export const MarqueeSection = styled.div`
  overflow: hidden;
  padding: 40px 0;
  border-top: 1px solid ${colors.borderLight};
  border-bottom: 1px solid ${colors.borderLight};
`;

export const MarqueeTrack = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  white-space: nowrap;
  animation: ${scroll} ${({ $speed }) => $speed}s linear infinite;
  width: max-content;
`;

export const MarqueeItem = styled.span`
  font-size: clamp(1.5rem, 4vw, 3rem);
  font-weight: 700;
  color: ${colors.white};
  letter-spacing: -1px;
  text-transform: uppercase;
  flex-shrink: 0;
`;

export const MarqueeDot = styled.span`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${colors.primary};
  flex-shrink: 0;
`;
