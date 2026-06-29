import React from 'react';
import logo from '../../assets/images/AL Logo.svg';
import {
  Nav,
  NavGrid,
  NavBrand,
  NavLogo,
  NavMenu,
  NavLink,
} from './styles';

export default function Navbar() {
  return (
    <Nav>
      <NavGrid>
        <NavBrand href="#hero">
          <NavLogo src={logo} alt="Agam Lamba" />
        </NavBrand>
        <NavMenu>
          <NavLink href="/projects">Projects</NavLink>
          <NavLink href="/work-with-me">Work with me</NavLink>
          <NavLink href="#contact">Success stories</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </NavMenu>
      </NavGrid>
    </Nav>
  );
}
