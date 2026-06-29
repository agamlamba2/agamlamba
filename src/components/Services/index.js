import React from 'react';
import {
  ServicesSection,
  ServicesContainer,
  ServicesLabel,
  ServicesTitle,
  ServicesList,
  ServiceItem,
  ServiceNumber,
  ServiceContent,
  ServiceName,
  ServiceDescription,
  ServiceDivider,
} from './styles';

const services = [
  {
    name: 'Web Development',
    description: 'Building responsive, performant web applications using modern frameworks and best practices.',
  },
  {
    name: 'Frontend Engineering',
    description: 'Creating pixel-perfect, interactive user interfaces with React, TypeScript, and modern CSS.',
  },
  {
    name: 'Backend Development',
    description: 'Designing robust APIs and server-side architectures with Node.js, Python, and cloud services.',
  },
  {
    name: 'UI/UX Design',
    description: 'Designing clean, intuitive interfaces that balance aesthetics with usability and accessibility.',
  },
];

export default function Services() {
  return (
    <ServicesSection id="services">
      <ServicesContainer>
        <ServicesLabel>Services</ServicesLabel>
        <ServicesTitle>What I do</ServicesTitle>
        <ServicesList>
          {services.map((service, index) => (
            <React.Fragment key={index}>
              <ServiceDivider />
              <ServiceItem>
                <ServiceNumber>{String(index + 1).padStart(2, '0')}</ServiceNumber>
                <ServiceContent>
                  <ServiceName>{service.name}</ServiceName>
                  <ServiceDescription>{service.description}</ServiceDescription>
                </ServiceContent>
              </ServiceItem>
            </React.Fragment>
          ))}
          <ServiceDivider />
        </ServicesList>
      </ServicesContainer>
    </ServicesSection>
  );
}
