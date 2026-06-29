import React, { useState, useEffect } from 'react';
import { Nav, NavContainer, Logo, NavLinks, NavLink, MobileToggle, MobileMenu, MobileLink } from './styles';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (id) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Nav $scrolled={scrolled}>
      <NavContainer>
        <Logo href="#hero" onClick={() => handleClick('hero')}>
          Agam Lamba
        </Logo>
        <NavLinks>
          <NavLink onClick={() => handleClick('about')}>About</NavLink>
          <NavLink onClick={() => handleClick('projects')}>Projects</NavLink>
          <NavLink onClick={() => handleClick('skills')}>Skills</NavLink>
          <NavLink onClick={() => handleClick('contact')}>Contact</NavLink>
        </NavLinks>
        <MobileToggle onClick={() => setMobileOpen(!mobileOpen)} $open={mobileOpen}>
          <span />
          <span />
          <span />
        </MobileToggle>
      </NavContainer>
      <MobileMenu $open={mobileOpen}>
        <MobileLink onClick={() => handleClick('about')}>About</MobileLink>
        <MobileLink onClick={() => handleClick('projects')}>Projects</MobileLink>
        <MobileLink onClick={() => handleClick('skills')}>Skills</MobileLink>
        <MobileLink onClick={() => handleClick('contact')}>Contact</MobileLink>
      </MobileMenu>
    </Nav>
  );
}
