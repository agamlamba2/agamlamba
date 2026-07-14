import React, { useEffect } from 'react';

import Navbar from '../components/Navbar';
import PageHero from '../components/PageHero';
import CompetencyFlicker from '../components/CompetencyFlicker';
import Contact from '../components/Contact';

export default function MyApproach() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageHero
        title="My approach"
        intro="How I think about design — from first principles to shipping outcomes that matter."
      />
      <Navbar />
      <CompetencyFlicker />
      <Contact />
    </>
  );
}
