import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/AL Full Logo Transparent.svg';
import {
  Nav,
  NavInner,
  NavBrand,
  NavLogoIcon,
  NavMenu,
  NavLink,
} from './styles';

export default function Navbar({ overlay = true }) {
  return (
    <Nav $overlay={overlay}>
      <NavInner>
        <NavBrand as={Link} to="/">
          <NavLogoIcon src={logo} alt="Agam Lamba" />
        </NavBrand>
        <NavMenu>
          <NavLink as={Link} to="/project">Projects</NavLink>
          <NavLink as={Link} to="/project">Work with me</NavLink>
          <NavLink as={Link} to="/project">My approach</NavLink>
          <NavLink as={Link} to="/project">Success stories</NavLink>
        </NavMenu>
      </NavInner>
    </Nav>
  );
}
