import React from 'react';

import FontStyles from './assets/styles/fonts';
import GlobalStyles from './assets/styles/global';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StickyNotes from './components/StickyNotes';
import Companies from './components/Companies';
import Projects from './components/Projects';
import Contact from './components/Contact';

export default function App() {
  return (
    <>
      <FontStyles />
      <GlobalStyles />
      <Hero />
      <StickyNotes />
      <Navbar />
      <Companies />
      <Projects />
      <Contact />
    </>
  );
}
