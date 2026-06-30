import React, { useEffect } from 'react';

import Navbar from '../components/Navbar';
import PageHero from '../components/PageHero';
import Contact from '../components/Contact';

export default function InfoPage({ title, intro }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [title]);

  return (
    <>
      <PageHero title={title} intro={intro} />
      <Navbar />
      <Contact />
    </>
  );
}
