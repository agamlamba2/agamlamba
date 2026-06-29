import React from 'react';

import FontStyles from './assets/styles/fonts';
import GlobalStyles from './assets/styles/global';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <FontStyles />
      <GlobalStyles />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
