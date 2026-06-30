import React from 'react';

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import StickyNotes from '../components/StickyNotes';
import Companies from '../components/Companies';
import Projects from '../components/Projects';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <StickyNotes />
      <Navbar />
      <Companies />
      <Projects />
      <Contact />
    </>
  );
}
