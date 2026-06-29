import React, { useState, useEffect } from 'react';
import {
  Nav,
  NavContainer,
  Logo,
  NavRight,
  NavLink,
  MenuButton,
  MenuOverlay,
  MenuContent,
  MenuItem,
  MenuClose,
  MenuFooter,
  MenuSocials,
  MenuSocialLink,
} from './styles';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleClick = (id) => {
    setMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <>
      <Nav $scrolled={scrolled}>
        <NavContainer>
          <Logo onClick={() => handleClick('hero')}>
            Agam Lamba
          </Logo>
          <NavRight>
            <NavLink onClick={() => handleClick('projects')}>Work</NavLink>
            <NavLink onClick={() => handleClick('about')}>About</NavLink>
            <NavLink onClick={() => handleClick('contact')}>Contact</NavLink>
            <MenuButton onClick={() => setMenuOpen(true)} aria-label="Open menu">
              <span />
              <span />
            </MenuButton>
          </NavRight>
        </NavContainer>
      </Nav>
      <MenuOverlay $open={menuOpen}>
        <MenuClose onClick={() => setMenuOpen(false)} aria-label="Close menu">
          <span />
          <span />
        </MenuClose>
        <MenuContent>
          <MenuItem onClick={() => handleClick('hero')}>Home</MenuItem>
          <MenuItem onClick={() => handleClick('about')}>About</MenuItem>
          <MenuItem onClick={() => handleClick('services')}>Services</MenuItem>
          <MenuItem onClick={() => handleClick('projects')}>Work</MenuItem>
          <MenuItem onClick={() => handleClick('contact')}>Contact</MenuItem>
        </MenuContent>
        <MenuFooter>
          <MenuSocials>
            <MenuSocialLink href="https://github.com/agamlamba2" target="_blank" rel="noopener noreferrer">GitHub</MenuSocialLink>
            <MenuSocialLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</MenuSocialLink>
            <MenuSocialLink href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</MenuSocialLink>
          </MenuSocials>
        </MenuFooter>
      </MenuOverlay>
    </>
  );
}
