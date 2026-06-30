import React, { useEffect, useRef, useState, useCallback } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import {
  Section,
  Pin,
  Slide,
  SlideBg,
  SlideOverlay,
  SlideContent,
  SlideTitle,
  SlideDesc,
  CaseLink,
  Index,
  IndexItem,
  IndexFill,
} from './styles';
import { projects } from '../../data/projects';

export default function ProjectReel() {
  const sectionRef = useRef(null);
  const fillRefs = useRef([]);
  const tickingRef = useRef(false);
  const [active, setActive] = useState(0);
  const N = projects.length;

  const update = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const total = section.offsetHeight - window.innerHeight;
    const progress = Math.max(0, Math.min(-rect.top / total, 1));
    const activeFloat = progress * (N - 1);
    const next = Math.round(activeFloat);

    setActive((prev) => (prev === next ? prev : next));
    fillRefs.current.forEach((el, i) => {
      if (!el) return;
      const w = Math.max(0, 1 - Math.abs(activeFloat - i)) * 100;
      el.style.width = `${w}%`;
    });
    tickingRef.current = false;
  }, [N]);

  useEffect(() => {
    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [update]);

  const jumpTo = (i) => {
    const section = sectionRef.current;
    if (!section) return;
    const total = section.offsetHeight - window.innerHeight;
    const top = section.offsetTop + (i / (N - 1)) * total;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <Section ref={sectionRef} style={{ height: `${N * 100}vh` }} aria-label="Project reel">
      <Pin>
        {projects.map((project, i) => (
          <Slide key={project.slug} $active={i === active}>
            <SlideBg $src={project.cover} $active={i === active} />
            <SlideOverlay />
            <SlideContent>
              <SlideTitle>{project.title}</SlideTitle>
              <SlideDesc>{project.overview || project.desc}</SlideDesc>
              <CaseLink to={`/${project.slug}`}>
                Open case study <FiArrowRight />
              </CaseLink>
            </SlideContent>
          </Slide>
        ))}

        <Index>
          {projects.map((project, i) => (
            <IndexItem key={project.slug} $active={i === active} onClick={() => jumpTo(i)}>
              {project.title}
              <IndexFill
                ref={(el) => {
                  fillRefs.current[i] = el;
                }}
              />
            </IndexItem>
          ))}
        </Index>
      </Pin>
    </Section>
  );
}
