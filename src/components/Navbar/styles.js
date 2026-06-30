import styled from 'styled-components';
import colors from '../../assets/styles/variables/colors';
import metrics from '../../assets/styles/variables/metrics';

export const Nav = styled.nav`
  position: sticky;
  bottom: 0;
  z-index: 100;
  padding: 0 48px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);

  @media (max-width: 768px) {
    padding: 0 ${metrics.paddingHorizontalMobile};
  }
`;

export const NavInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32px 0;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    align-items: flex-start;
    padding: 24px 0;
  }
`;

export const NavBrand = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const NavLogoIcon = styled.img`
  height: 28px;
  width: auto;

  @media (max-width: 768px) {
    height: 24px;
  }
`;

export const NavLogoText = styled.span`
  font-size: 1.15rem;
  font-weight: 700;
  color: ${colors.white};
  letter-spacing: -0.3px;
`;

export const NavLogoAccent = styled.span`
  color: ${colors.primary};
`;

export const NavMenu = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 80px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: flex-start;
    gap: 20px;
  }
`;

export const NavLink = styled.a`
  font-size: 0.95rem;
  font-weight: 500;
  color: ${colors.gray};
  transition: color 0.3s ease;
  letter-spacing: 0.2px;

  &:hover {
    color: ${colors.white};
  }
`;
