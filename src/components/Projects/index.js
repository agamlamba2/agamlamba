import React, { useState } from 'react';
import {
  ProjectsSection,
  ProjectsHeader,
  ProjectsTitle,
  ProjectsCount,
  ProjectsBody,
  ProjectList,
  ProjectItem,
  ProjectIndex,
  ProjectName,
  ProjectCategory,
  ProjectPreview,
  PreviewImage,
  PreviewMobile,
} from './styles';

import imgUbank from '../../assets/images/img_ubank.webp';
import imgX15 from '../../assets/images/img_x15.webp';
import imgExpo from '../../assets/images/img_expo.webp';
import imgHackathon from '../../assets/images/img_hackathon.webp';
import imgMentor from '../../assets/images/img_mentor.webp';
import imgTeam from '../../assets/images/img_team.webp';

const projects = [
  { name: 'uBank', category: 'Fintech · Product Design', image: imgUbank, url: '#' },
  { name: 'x15ventures', category: 'Venture Studio · Strategy', image: imgX15, url: '#' },
  { name: 'Expo Experience', category: 'Event · Brand', image: imgExpo, url: '#' },
  { name: 'Hackathon', category: 'Innovation · Prototyping', image: imgHackathon, url: '#' },
  { name: 'Mentorship', category: 'Education · Community', image: imgMentor, url: '#' },
  { name: 'Team Lab', category: 'Leadership · Culture', image: imgTeam, url: '#' },
];

export default function Projects() {
  const [active, setActive] = useState(0);

  return (
    <ProjectsSection id="projects">
      <ProjectsHeader>
        <ProjectsTitle>Selected work</ProjectsTitle>
        <ProjectsCount>{String(projects.length).padStart(2, '0')} projects</ProjectsCount>
      </ProjectsHeader>

      <ProjectsBody>
        <ProjectList onMouseLeave={() => setActive(0)}>
          {projects.map((project, index) => (
            <ProjectItem
              key={index}
              href={project.url}
              $dimmed={active !== index}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
            >
              <ProjectIndex>{String(index + 1).padStart(2, '0')}</ProjectIndex>
              <ProjectName>{project.name}</ProjectName>
              <ProjectCategory>{project.category}</ProjectCategory>
              <PreviewMobile $src={project.image} />
            </ProjectItem>
          ))}
        </ProjectList>

        <ProjectPreview>
          {projects.map((project, index) => (
            <PreviewImage
              key={index}
              $src={project.image}
              $active={active === index}
            />
          ))}
        </ProjectPreview>
      </ProjectsBody>
    </ProjectsSection>
  );
}
