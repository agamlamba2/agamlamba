import React from 'react';

import FontStyles from './assets/styles/fonts';
import GlobalStyles from './assets/styles/global';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Contact from './components/Contact';

export default function App() {
  return (
    <>
      <FontStyles />
      <GlobalStyles />
      <Hero />
      <Navbar />
      <Projects />
      <Contact />
    </>
  );
}
