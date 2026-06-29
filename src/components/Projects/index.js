import React from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import {
  ProjectsSection,
  ProjectsContainer,
  ProjectsLabel,
  ProjectsTitle,
  ProjectsList,
  ProjectCard,
  ProjectImageArea,
  ProjectNumber,
  ProjectInfo,
  ProjectCategory,
  ProjectName,
  ProjectDescription,
  ProjectLink,
  ProjectDivider,
} from './styles';

const projects = [
  {
    category: 'Web Application',
    name: 'E-Commerce Platform',
    description: 'A full-stack e-commerce application with real-time inventory management, secure payments, and an intuitive admin dashboard.',
    color: '#1a0a0a',
  },
  {
    category: 'Mobile App',
    name: 'Fitness Tracker',
    description: 'A cross-platform mobile application for tracking workouts, nutrition, and health metrics with data visualization.',
    color: '#0a0a1a',
  },
  {
    category: 'Dashboard',
    name: 'Analytics Dashboard',
    description: 'An interactive data visualization dashboard providing real-time insights and customizable reporting for business metrics.',
    color: '#0a1a0a',
  },
  {
    category: 'API / Backend',
    name: 'Task Management API',
    description: 'A RESTful API with authentication, role-based access control, and real-time notifications for collaborative task management.',
    color: '#1a0a10',
  },
];

export default function Projects() {
  return (
    <ProjectsSection id="projects">
      <ProjectsContainer>
        <ProjectsLabel>Selected Work</ProjectsLabel>
        <ProjectsTitle>Recent projects</ProjectsTitle>
        <ProjectsList>
          {projects.map((project, index) => (
            <React.Fragment key={index}>
              <ProjectDivider />
              <ProjectCard href="#">
                <ProjectImageArea style={{ background: project.color }}>
                  <ProjectNumber>{String(index + 1).padStart(2, '0')}</ProjectNumber>
                </ProjectImageArea>
                <ProjectInfo>
                  <ProjectCategory>{project.category}</ProjectCategory>
                  <ProjectName>{project.name}</ProjectName>
                  <ProjectDescription>{project.description}</ProjectDescription>
                  <ProjectLink>
                    View Project <FiArrowUpRight size={16} />
                  </ProjectLink>
                </ProjectInfo>
              </ProjectCard>
            </React.Fragment>
          ))}
          <ProjectDivider />
        </ProjectsList>
      </ProjectsContainer>
    </ProjectsSection>
  );
}
