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

import coverTaste from '../../assets/images/img_project_cover_taste.webp';
import coverUta from '../../assets/images/img_project_cover_uta.webp';
import coverSimplicity from '../../assets/images/img_project_cover_simplicity.webp';
import coverHomein from '../../assets/images/img_project_cover_homein.webp';
import coverWestpac from '../../assets/images/img_project_cover_westpac.webp';

const projects = [
  {
    title: 'Taste.com.au',
    desc: 'Product Design: Web Redesign & Research',
    cover: coverTaste,
    url: '/project',
  },
  {
    title: 'Universal Task Assistant',
    desc: 'Product Design: App & Branding',
    cover: coverUta,
    url: '/project',
  },
  {
    title: 'Simplicity Accelerator',
    desc: 'Product Design: Responsive Web Design & Platform Redesign',
    cover: coverSimplicity,
    url: '/project',
  },
  {
    title: 'Home-in (CommBank)',
    desc: 'Multi-channel Design Strategy',
    cover: coverHomein,
    url: '/project',
  },
  {
    title: 'Westpac Mobile Banking',
    desc: 'Product Design: App, Website, and Branding',
    cover: coverWestpac,
    url: '/project',
  },
];

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

  const bg = project.cover ? `url(${project.cover})` : project.bg;

  return (
    <Project ref={ref} to={project.url} className={visible ? 'visible' : ''}>
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

export default function FeaturedWork() {
  return (
    <Section id="projects">
      <Heading>Featured work</Heading>
      <List>
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </List>
    </Section>
  );
}
