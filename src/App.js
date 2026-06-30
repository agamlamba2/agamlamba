import React from 'react';
import { Routes, Route } from 'react-router-dom';

import FontStyles from './assets/styles/fonts';
import GlobalStyles from './assets/styles/global';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import InfoPage from './pages/InfoPage';

export default function App() {
  return (
    <>
      <FontStyles />
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project" element={<Projects />} />
        <Route
          path="/work-with-me"
          element={
            <InfoPage
              title="Work with me"
              intro="Let's explore how we can collaborate — from product strategy through to design execution."
            />
          }
        />
        <Route
          path="/my-approach"
          element={
            <InfoPage
              title="My approach"
              intro="How I think about design — from first principles to shipping outcomes that matter."
            />
          }
        />
        <Route
          path="/success-stories"
          element={
            <InfoPage
              title="Success stories"
              intro="Hear from a few clients and colleagues I've worked with in the past."
            />
          }
        />
        <Route path="/:slug" element={<ProjectDetail />} />
      </Routes>
    </>
  );
}
