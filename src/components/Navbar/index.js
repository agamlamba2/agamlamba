import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/images/AL Full Logo Transparent.svg';
import {
  Nav,
  NavInner,
  NavBrand,
  NavLogoIcon,
  NavMenu,
  NavLink,
} from './styles';

const links = [
  { label: 'Projects', to: '/project' },
  { label: 'Work with me', to: '/work-with-me' },
  { label: 'My approach', to: '/my-approach' },
  { label: 'Success stories', to: '/success-stories' },
];

export default function Navbar({ overlay = true }) {
  const { pathname } = useLocation();

  return (
    <Nav $overlay={overlay}>
      <NavInner>
        <NavBrand as={Link} to="/">
          <NavLogoIcon src={logo} alt="Agam Lamba" />
        </NavBrand>
        <NavMenu>
          {links.map((link) => (
            <NavLink key={link.to} as={Link} to={link.to} $active={pathname === link.to}>
              {link.label}
            </NavLink>
          ))}
        </NavMenu>
      </NavInner>
    </Nav>
  );
}
