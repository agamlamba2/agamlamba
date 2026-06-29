import React from 'react';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import {
  ProjectsSection,
  SectionHeader,
  SectionLabel,
  SectionTitle,
  ProjectsGrid,
  ProjectCard,
  ProjectImageArea,
  ProjectInfo,
  ProjectCategory,
  ProjectName,
  ProjectDescription,
  ProjectLinks,
  ProjectLink,
  ProjectTech,
  TechTag,
} from './styles';

const projects = [
  {
    category: 'Web Application',
    name: 'E-Commerce Platform',
    description: 'A full-stack e-commerce application with real-time inventory management, secure payments, and an intuitive admin dashboard.',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    color: '#1a2a1a',
  },
  {
    category: 'Mobile App',
    name: 'Fitness Tracker',
    description: 'A cross-platform mobile application for tracking workouts, nutrition, and health metrics with data visualization.',
    tech: ['React Native', 'Firebase', 'Redux'],
    color: '#1a1a2a',
  },
  {
    category: 'Dashboard',
    name: 'Analytics Dashboard',
    description: 'An interactive data visualization dashboard providing real-time insights and customizable reporting for business metrics.',
    tech: ['React', 'D3.js', 'Python', 'PostgreSQL'],
    color: '#2a1a1a',
  },
  {
    category: 'API / Backend',
    name: 'Task Management API',
    description: 'A RESTful API with authentication, role-based access control, and real-time notifications for collaborative task management.',
    tech: ['Node.js', 'Express', 'JWT', 'Socket.io'],
    color: '#1a2a2a',
  },
];

export default function Projects() {
  return (
    <ProjectsSection id="projects">
      <SectionHeader>
        <SectionLabel>Projects</SectionLabel>
        <SectionTitle>Selected work</SectionTitle>
      </SectionHeader>
      <ProjectsGrid>
        {projects.map((project, index) => (
          <ProjectCard key={index}>
            <ProjectImageArea style={{ background: project.color }}>
              <span>{String(index + 1).padStart(2, '0')}</span>
            </ProjectImageArea>
            <ProjectInfo>
              <ProjectCategory>{project.category}</ProjectCategory>
              <ProjectName>{project.name}</ProjectName>
              <ProjectDescription>{project.description}</ProjectDescription>
              <ProjectTech>
                {project.tech.map((t, i) => (
                  <TechTag key={i}>{t}</TechTag>
                ))}
              </ProjectTech>
              <ProjectLinks>
                <ProjectLink href="#" aria-label="View project">
                  <FiExternalLink size={18} />
                </ProjectLink>
                <ProjectLink href="#" aria-label="View source">
                  <FiGithub size={18} />
                </ProjectLink>
              </ProjectLinks>
            </ProjectInfo>
          </ProjectCard>
        ))}
      </ProjectsGrid>
    </ProjectsSection>
  );
}
