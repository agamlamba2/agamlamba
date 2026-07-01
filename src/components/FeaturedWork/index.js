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

import { projects } from '../../data/projects';

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
