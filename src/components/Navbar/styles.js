import styled, { keyframes } from 'styled-components';
import colors from '../../assets/styles/variables/colors';
import metrics from '../../assets/styles/variables/metrics';

export const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: ${({ $scrolled }) => $scrolled ? 'rgba(0, 0, 0, 0.9)' : 'transparent'};
  backdrop-filter: ${({ $scrolled }) => $scrolled ? 'blur(20px)' : 'none'};
  transition: all 0.4s ease;
`;

export const NavContainer = styled.div`
  max-width: ${metrics.maxWidth};
  margin: 0 auto;
  padding: 24px ${metrics.paddingHorizontal};
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding: 20px ${metrics.paddingHorizontalMobile};
  }
`;

export const Logo = styled.button`
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: ${colors.white};
  letter-spacing: -0.5px;
  cursor: pointer;
`;

export const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
`;

export const NavLink = styled.button`
  color: ${colors.grayLight};
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  transition: color 0.3s ease;
  font-family: 'Plus Jakarta Sans', sans-serif;

  &:hover {
    color: ${colors.white};
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const MenuButton = styled.button`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 8px;
  cursor: pointer;

  span {
    display: block;
    width: 28px;
    height: 2px;
    background: ${colors.white};
    transition: all 0.3s ease;
  }
`;

const overlayIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const MenuOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 200;
  background: ${colors.bg};
  display: ${({ $open }) => $open ? 'flex' : 'none'};
  flex-direction: column;
  justify-content: center;
  animation: ${overlayIn} 0.4s ease;
`;

export const MenuClose = styled.button`
  position: absolute;
  top: 24px;
  right: ${metrics.paddingHorizontal};
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  span {
    position: absolute;
    width: 28px;
    height: 2px;
    background: ${colors.white};

    &:first-child { transform: rotate(45deg); }
    &:last-child { transform: rotate(-45deg); }
  }

  @media (max-width: 768px) {
    right: ${metrics.paddingHorizontalMobile};
  }
`;

export const MenuContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 ${metrics.paddingHorizontal};

  @media (max-width: 768px) {
    padding: 0 ${metrics.paddingHorizontalMobile};
  }
`;

export const MenuItem = styled.button`
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 700;
  color: ${colors.white};
  text-align: left;
  line-height: 1.2;
  transition: color 0.3s ease;
  letter-spacing: -1px;

  &:hover {
    color: ${colors.primary};
  }
`;

export const MenuFooter = styled.div`
  position: absolute;
  bottom: 40px;
  left: 0;
  right: 0;
  padding: 0 ${metrics.paddingHorizontal};

  @media (max-width: 768px) {
    padding: 0 ${metrics.paddingHorizontalMobile};
  }
`;

export const MenuSocials = styled.div`
  display: flex;
  gap: 24px;
`;

export const MenuSocialLink = styled.a`
  font-size: 0.875rem;
  color: ${colors.gray};
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: ${colors.primary};
  }
`;
