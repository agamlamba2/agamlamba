import React, { useEffect } from 'react';

import Navbar from '../components/Navbar';
import PageHero from '../components/PageHero';
import ProjectReel from '../components/ProjectReel';
import Contact from '../components/Contact';

export default function Projects() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageHero
        title="Projects"
        intro="A selection of product design work across fintech, health, media, and beyond."
      />
      <Navbar />
      <ProjectReel />
      <Contact />
    </>
  );
}
