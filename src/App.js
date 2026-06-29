import React from 'react';

import FontStyles from './assets/styles/fonts';
import GlobalStyles from './assets/styles/global';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <FontStyles />
      <GlobalStyles />
      <Hero />
      <Navbar />
      <Contact />
      <Footer />
    </>
  );
}
