import React, { useEffect, useRef, useState } from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import {
  Section,
  Heading,
  List,
  Project,
  Cover,
  CoverMedia,
  Meta,
  TitleRow,
  Title,
  Arrow,
  Desc,
} from './styles';

import { featuredProjects } from '../../data/projects';

function ProjectCard({ project }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const cover = project.featuredCover || project.cover;
  const bg = cover ? `url(${cover})` : project.bg;

  return (
    <Project ref={ref} to={`/${project.slug}`} className={visible ? 'visible' : ''}>
      <Cover>
        <CoverMedia $bg={bg} />
      </Cover>
      <Meta>
        <TitleRow>
          <Title>{project.title}</Title>
          <Arrow>
            <FiArrowUpRight />
          </Arrow>
        </TitleRow>
        <Desc>{project.desc}</Desc>
      </Meta>
    </Project>
  );
}

// Continuously-animated turbulence used by the cover hover ripple. Rendered once;
// the displacement only becomes visible when a card applies `filter: url(#paperWind)`.
function PaperWindFilter() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}
    >
      <defs>
        <filter id="paperWind" x="-8%" y="-8%" width="116%" height="116%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.009 0.013"
            numOctaves="2"
            seed="7"
            result="noise"
          >
            <animate
              attributeName="baseFrequency"
              dur="16s"
              values="0.009 0.013;0.013 0.009;0.009 0.013"
              calcMode="spline"
              keyTimes="0;0.5;1"
              keySplines="0.4 0 0.6 1;0.4 0 0.6 1"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="14"
            xChannelSelector="R"
            yChannelSelector="G"
          >
            <animate
              attributeName="scale"
              dur="7s"
              values="9;16;9"
              calcMode="spline"
              keyTimes="0;0.5;1"
              keySplines="0.45 0 0.55 1;0.45 0 0.55 1"
              repeatCount="indefinite"
            />
          </feDisplacementMap>
        </filter>
      </defs>
    </svg>
  );
}

export default function FeaturedWork() {
  return (
    <Section id="projects">
      <PaperWindFilter />
      <Heading>Featured work</Heading>
      <List>
        {featuredProjects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </List>
    </Section>
  );
}
