import styled from 'styled-components';
import colors from '../../assets/styles/variables/colors';
import metrics from '../../assets/styles/variables/metrics';

export const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${({ $scrolled }) => $scrolled ? 'rgba(10, 10, 10, 0.95)' : 'transparent'};
  backdrop-filter: ${({ $scrolled }) => $scrolled ? 'blur(20px)' : 'none'};
  border-bottom: 1px solid ${({ $scrolled }) => $scrolled ? colors.border : 'transparent'};
  transition: all 0.3s ease;
`;

export const NavContainer = styled.div`
  max-width: ${metrics.maxWidth};
  margin: 0 auto;
  padding: 20px ${metrics.paddingHorizontal};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled.a`
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: ${colors.text.light.very};
  cursor: pointer;
  letter-spacing: 0.5px;

  &:hover {
    color: ${colors.accent};
  }
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavLink = styled.button`
  background: none;
  border: none;
  color: ${colors.text.light.little};
  font-size: 0.9rem;
  font-weight: 400;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: color 0.3s ease;
  font-family: 'Inter', sans-serif;

  &:hover {
    color: ${colors.accent};
  }
`;

export const MobileToggle = styled.button`
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  padding: 5px;

  span {
    display: block;
    width: 24px;
    height: 2px;
    background: ${colors.text.light.very};
    transition: all 0.3s ease;

    &:nth-child(1) {
      transform: ${({ $open }) => $open ? 'rotate(45deg) translateY(10px)' : 'none'};
    }
    &:nth-child(2) {
      opacity: ${({ $open }) => $open ? 0 : 1};
    }
    &:nth-child(3) {
      transform: ${({ $open }) => $open ? 'rotate(-45deg) translateY(-10px)' : 'none'};
    }
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

export const MobileMenu = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: ${({ $open }) => $open ? 'flex' : 'none'};
    flex-direction: column;
    padding: 20px ${metrics.paddingHorizontal} 30px;
    gap: 20px;
    background: rgba(10, 10, 10, 0.98);
    border-bottom: 1px solid ${colors.border};
  }
`;

export const MobileLink = styled.button`
  background: none;
  border: none;
  color: ${colors.text.light.medium};
  font-size: 1.1rem;
  font-weight: 400;
  text-align: left;
  font-family: 'Inter', sans-serif;
  letter-spacing: 1px;
  text-transform: uppercase;

  &:hover {
    color: ${colors.accent};
  }
`;
