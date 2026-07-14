import React from 'react';
import { Routes, Route } from 'react-router-dom';

import FontStyles from './assets/styles/fonts';
import GlobalStyles from './assets/styles/global';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import SuccessStories from './pages/SuccessStories';
import WorkWithMe from './pages/WorkWithMe';
import MyApproach from './pages/MyApproach';

export default function App() {
  return (
    <>
      <FontStyles />
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project" element={<Projects />} />
        <Route path="/work-with-me" element={<WorkWithMe />} />
        <Route path="/my-approach" element={<MyApproach />} />
        <Route path="/success-stories" element={<SuccessStories />} />
        <Route path="/:slug" element={<ProjectDetail />} />
      </Routes>
    </>
  );
}
