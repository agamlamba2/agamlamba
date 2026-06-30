import React from 'react';
import logo from '../../assets/images/AL Logo.svg';
import {
  Nav,
  NavInner,
  NavBrand,
  NavLogoIcon,
  NavLogoText,
  NavLogoAccent,
  NavMenu,
  NavLink,
} from './styles';

export default function Navbar() {
  return (
    <Nav>
      <NavInner>
        <NavBrand href="#hero">
          <NavLogoIcon src={logo} alt="AL" />
          <NavLogoText>Agam <NavLogoAccent>Lamba</NavLogoAccent></NavLogoText>
        </NavBrand>
        <NavMenu>
          <NavLink href="/projects">Projects</NavLink>
          <NavLink href="/work-with-me">Work with me</NavLink>
          <NavLink href="/my-approach">My approach</NavLink>
          <NavLink href="#contact">Success stories</NavLink>
        </NavMenu>
      </NavInner>
    </Nav>
  );
}
