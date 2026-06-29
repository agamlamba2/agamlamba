import styled from 'styled-components';
import colors from '../../assets/styles/variables/colors';
import metrics from '../../assets/styles/variables/metrics';

export const Nav = styled.nav`
  position: relative;
  z-index: 100;
  padding: 0 ${metrics.paddingHorizontal};

  @media (max-width: 768px) {
    padding: 0 ${metrics.paddingHorizontalMobile};
  }
`;

export const NavGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  max-width: ${metrics.maxWidth};
  margin: 0 auto;
  padding: 32px 0;
  border-top: 1px solid ${colors.borderLight};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 24px 0;
  }
`;

export const NavBrand = styled.a`
  display: inline-block;
`;

export const NavLogo = styled.img`
  height: 24px;
  width: auto;

  @media (max-width: 768px) {
    height: 20px;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 32px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: flex-start;
    gap: 20px;
  }
`;

export const NavLink = styled.a`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${colors.gray};
  transition: color 0.3s ease;
  letter-spacing: 0.2px;

  &:hover {
    color: ${colors.white};
  }
`;
