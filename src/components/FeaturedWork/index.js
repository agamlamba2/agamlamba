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

// Cover images aren't available yet — each card uses its brand background
// for now. Drop a `cover` image into the data below to swap it in.
const projects = [
  {
    title: 'Taste.com.au',
    desc: 'Product Design: Web Redesign & Research',
    bg: '#eaebec',
    url: '/project',
  },
  {
    title: 'Universal Task Assistant',
    desc: 'Product Design: App & Branding',
    bg: 'radial-gradient(circle at 70% 30%, #1c1c1c, #000000)',
    url: '/project',
  },
  {
    title: 'Simplicity Accelerator',
    desc: 'Product Design: Responsive Web Design & Platform Redesign',
    bg: 'linear-gradient(180deg, #003149 0%, #003d5b 100%)',
    url: '/project',
  },
  {
    title: 'Home-in (CommBank)',
    desc: 'Multi-channel Design Strategy',
    bg: 'linear-gradient(57.95deg, #017f76 23.585%, #00385b 87.143%)',
    url: '/project',
  },
  {
    title: 'Westpac Mobile Banking',
    desc: 'Product Design: App, Website, and Branding',
    bg: 'linear-gradient(120deg, #990000 0%, #5e0000 100%)',
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
