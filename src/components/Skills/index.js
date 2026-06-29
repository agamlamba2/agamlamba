import React from 'react';
import {
  SkillsSection,
  SectionHeader,
  SectionLabel,
  SectionTitle,
  SkillsGrid,
  SkillCategory,
  CategoryTitle,
  CategoryIcon,
  SkillList,
  SkillItem,
  SkillName,
} from './styles';

const skillCategories = [
  {
    title: 'Frontend',
    icon: '01',
    skills: ['React', 'JavaScript', 'TypeScript', 'HTML & CSS', 'Styled Components', 'Redux'],
  },
  {
    title: 'Backend',
    icon: '02',
    skills: ['Node.js', 'Express', 'Python', 'REST APIs', 'GraphQL', 'PostgreSQL'],
  },
  {
    title: 'Tools & DevOps',
    icon: '03',
    skills: ['Git', 'Docker', 'AWS', 'CI/CD', 'Linux', 'Figma'],
  },
  {
    title: 'Soft Skills',
    icon: '04',
    skills: ['Problem Solving', 'Communication', 'Team Leadership', 'Agile', 'Mentoring', 'Critical Thinking'],
  },
];

export default function Skills() {
  return (
    <SkillsSection id="skills">
      <SectionHeader>
        <SectionLabel>Skills</SectionLabel>
        <SectionTitle>Technologies & expertise</SectionTitle>
      </SectionHeader>
      <SkillsGrid>
        {skillCategories.map((category, index) => (
          <SkillCategory key={index}>
            <CategoryIcon>{category.icon}</CategoryIcon>
            <CategoryTitle>{category.title}</CategoryTitle>
            <SkillList>
              {category.skills.map((skill, i) => (
                <SkillItem key={i}>
                  <SkillName>{skill}</SkillName>
                </SkillItem>
              ))}
            </SkillList>
          </SkillCategory>
        ))}
      </SkillsGrid>
    </SkillsSection>
  );
}
