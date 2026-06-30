import styled, { css } from 'styled-components';
import colors from '../../assets/styles/variables/colors';

const borderColor = '#4f4f4f';

const animateIn = css`
  opacity: 0;
  transform: translateX(40px);
  transition: opacity 0.6s ease, transform 0.6s ease;

  &.visible {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const ContactSection = styled.section`
  background: ${colors.bg};
  display: flex;
  gap: 208px;
  align-items: flex-end;
  padding: 0 0 0 48px;
  border-top: 1px solid ${borderColor};
  border-bottom: 1px solid ${borderColor};

  @media (max-width: 1200px) {
    gap: 80px;
  }

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 60px;
    padding: 0 20px;
  }
`;

export const ContactLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 64px;
  width: 466px;
  flex-shrink: 0;
  ${animateIn}

  @media (max-width: 1200px) {
    width: 380px;
  }

  @media (max-width: 900px) {
    width: 100%;
    padding-bottom: 0;
    padding-top: 80px;
  }
`;

export const ContactTitle = styled.h2`
  font-size: 86px;
  font-weight: 800;
  color: ${colors.white};
  line-height: 86px;
  width: 100%;

  @media (max-width: 1200px) {
    font-size: 64px;
    line-height: 64px;
  }

  @media (max-width: 480px) {
    font-size: 48px;
    line-height: 52px;
  }
`;

export const ContactTitleAccent = styled.span`
  color: ${colors.primary};
`;

export const ContactActions = styled.div`
  border-left: 1px solid ${borderColor};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  opacity: 0.9;
  flex: 1;
  min-width: 0;

  @media (max-width: 900px) {
    width: 100%;
    border-left: none;
    border-top: 1px solid ${borderColor};
  }
`;

export const AccentBar = styled.div`
  width: 0;
  align-self: stretch;
  background: ${colors.primary};
  flex-shrink: 0;
  transition: width 0.3s ease;
`;

export const ContactButton = styled.a`
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 200px;
  padding: 0 40px 40px 48px;
  background: ${colors.bg};
  border-bottom: 1px solid ${borderColor};
  position: relative;
  overflow: hidden;

  /* Sequential fade/slide-in on scroll; reveal delay staggered per row
     (set inline) while hover padding stays instant. */
  opacity: 0;
  transform: translateX(40px);
  transition: opacity 0.6s ease var(--reveal-delay, 0s),
    transform 0.6s ease var(--reveal-delay, 0s), padding-left 0.3s ease;

  &.visible {
    opacity: 1;
    transform: translateX(0);
  }

  ${AccentBar} {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 1;
  }

  &:hover {
    padding-left: 64px;

    ${AccentBar} {
      width: 6px;
    }
  }

  @media (max-width: 900px) {
    height: 160px;
    padding: 0 24px 32px 32px;

    &:hover {
      padding-left: 48px;
    }
  }

  @media (max-width: 480px) {
    height: 120px;
    padding: 0 20px 24px 24px;
  }
`;

export const ContactButtonText = styled.span`
  position: relative;
  z-index: 1;
  font-size: 20px;
  font-weight: 600;
  color: #f2f2f2;
  line-height: 26px;
  white-space: nowrap;
  transition: transform 0.3s ease;

  ${ContactButton}:hover & {
    transform: translateX(4px);
  }
`;
