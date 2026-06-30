import React, { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import styled from 'styled-components';

import Navbar from '../components/Navbar';
import Contact from '../components/Contact';
import ProjectGate from '../components/ProjectGate';
import colors from '../assets/styles/variables/colors';
import { projects, getProject } from '../data/projects';

const Article = styled.article`
  background: ${colors.bg};
  padding: 64px 48px 0;

  @media (max-width: 768px) {
    padding: 40px 20px 0;
  }
`;

const Inner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const Back = styled(Link)`
  display: inline-block;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${colors.gray};
  margin-bottom: 48px;
  transition: color 0.3s ease;

  &:hover {
    color: ${colors.white};
  }
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 7vw, 5.5rem);
  font-weight: 800;
  letter-spacing: -3px;
  line-height: 1.02;
  color: ${colors.white};
`;

const Subtitle = styled.p`
  margin-top: 20px;
  font-size: 1.25rem;
  color: ${colors.grayLight};
  max-width: 640px;
  line-height: 1.5;
`;

const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 48px;
  margin-top: 48px;
  padding-top: 32px;
  border-top: 1px solid #2a2a2a;
`;

const MetaItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const MetaLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: ${colors.grayDark};
`;

const MetaValue = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: ${colors.white};
`;

const Hero = styled.div`
  margin-top: 64px;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 24px;
  overflow: hidden;
  background-image: url(${({ $src }) => $src});
  background-size: cover;
  background-position: center;

  @media (max-width: 768px) {
    border-radius: 14px;
    aspect-ratio: 4 / 3;
  }
`;

const Body = styled.div`
  max-width: 760px;
  margin: 96px auto 0;
  display: flex;
  flex-direction: column;
  gap: 64px;

  @media (max-width: 768px) {
    margin-top: 64px;
    gap: 48px;
  }
`;

const Overview = styled.p`
  font-size: clamp(1.25rem, 2.4vw, 1.75rem);
  line-height: 1.5;
  font-weight: 500;
  color: ${colors.white};
`;

const BlockHeading = styled.h2`
  font-size: 1.6rem;
  font-weight: 700;
  color: ${colors.white};
  margin-bottom: 16px;
  letter-spacing: -0.5px;
`;

const BlockText = styled.p`
  font-size: 1.05rem;
  line-height: 1.7;
  color: ${colors.grayLight};
`;

const FullImage = styled.img`
  width: 100%;
  border-radius: 16px;
  display: block;
`;

const Duo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Caption = styled.p`
  margin-top: 12px;
  font-size: 0.85rem;
  color: ${colors.gray};
  text-align: center;
`;

const FullBleed = styled.div`
  max-width: none;
  width: 100%;
`;

const NextWrap = styled.div`
  max-width: 1100px;
  margin: 140px auto 0;
  padding-top: 48px;
  border-top: 1px solid #2a2a2a;

  @media (max-width: 768px) {
    margin-top: 96px;
  }
`;

const NextLabel = styled.span`
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: ${colors.grayDark};
`;

const NextLink = styled(Link)`
  display: block;
  margin-top: 8px;
  font-size: clamp(1.8rem, 4vw, 3rem);
  font-weight: 800;
  letter-spacing: -1.5px;
  color: ${colors.white};
  transition: color 0.3s ease;

  &:hover {
    color: ${colors.primary};
  }
`;

function Section({ block }) {
  if (block.type === 'text') {
    return (
      <div>
        {block.heading && <BlockHeading>{block.heading}</BlockHeading>}
        <BlockText>{block.body}</BlockText>
      </div>
    );
  }
  if (block.type === 'image') {
    const img = (
      <figure>
        <FullImage src={block.src} alt={block.caption || ''} />
        {block.caption && <Caption>{block.caption}</Caption>}
      </figure>
    );
    return block.fullBleed ? <FullBleed>{img}</FullBleed> : img;
  }
  if (block.type === 'duo') {
    return (
      <Duo>
        {block.src.map((s, i) => (
          <FullImage key={i} src={s} alt="" />
        ))}
      </Duo>
    );
  }
  return null;
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProject(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) return <Navigate to="/" replace />;

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <Navbar overlay={false} />
      <ProjectGate>
        <Article>
          <Inner>
            <Back to="/#projects">← Back to work</Back>
            <Title>{project.title}</Title>
            {project.overview && <Subtitle>{project.desc}</Subtitle>}
            <MetaRow>
              {project.meta.map((m) => (
                <MetaItem key={m.label}>
                  <MetaLabel>{m.label}</MetaLabel>
                  <MetaValue>{m.value}</MetaValue>
                </MetaItem>
              ))}
            </MetaRow>
            <Hero $src={project.cover} />
          </Inner>

          <Body>
            {project.overview && <Overview>{project.overview}</Overview>}
            {project.sections.map((block, i) => (
              <Section key={i} block={block} />
            ))}
          </Body>

          <NextWrap>
            <NextLabel>Next project</NextLabel>
            <NextLink to={`/${next.slug}`}>{next.title} →</NextLink>
          </NextWrap>
        </Article>
        <Contact />
      </ProjectGate>
    </>
  );
}
