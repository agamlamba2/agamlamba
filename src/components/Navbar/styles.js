import styled from 'styled-components';
import colors from '../../assets/styles/variables/colors';
import metrics from '../../assets/styles/variables/metrics';

export const Nav = styled.nav`
  position: sticky;
  bottom: 0;
  z-index: 100;
  padding: 0 0 0 48px;
  background: rgba(0, 0, 0, 0.64);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);

  @media (max-width: 768px) {
    padding: 0 ${metrics.paddingHorizontalMobile};
  }
`;

export const NavInner = styled.div`
  display: flex;
  align-items: stretch;
  gap: 208px;
  height: 96px;

  @media (max-width: 1200px) {
    gap: 80px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    align-items: flex-start;
    height: auto;
    padding: 24px 0;
  }
`;

export const NavBrand = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 466px;
  flex-shrink: 0;

  @media (max-width: 1200px) {
    width: 380px;
  }

  @media (max-width: 768px) {
    width: auto;
  }
`;

export const NavLogoIcon = styled.img`
  height: 32px;
  width: auto;

  @media (max-width: 768px) {
    height: 28px;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  gap: 76px;
  flex-wrap: wrap;
  padding-left: 48px;
  border-left: 1px solid #4f4f4f;

  @media (max-width: 768px) {
    justify-content: flex-start;
    gap: 20px;
    padding-left: 0;
    border-left: none;
  }
`;

export const NavLink = styled.a`
  font-size: 16px;
  font-weight: 600;
  color: #828282;
  transition: color 0.3s ease;

  &:hover {
    color: ${colors.white};
  }
`;
