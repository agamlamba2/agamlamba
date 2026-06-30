import React from 'react';
import { Routes, Route } from 'react-router-dom';

import FontStyles from './assets/styles/fonts';
import GlobalStyles from './assets/styles/global';
import Home from './pages/Home';
import Project from './pages/Project';

export default function App() {
  return (
    <>
      <FontStyles />
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project" element={<Project />} />
      </Routes>
    </>
  );
}
