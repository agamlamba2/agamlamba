import React from 'react';

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import StickyNotes from '../components/StickyNotes';
import Companies from '../components/Companies';
import FeaturedWork from '../components/FeaturedWork';
import ZoomWords from '../components/ZoomWords';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <StickyNotes />
      <Navbar />
      <Companies />
      <FeaturedWork />
      <ZoomWords />
      <Contact />
    </>
  );
}
