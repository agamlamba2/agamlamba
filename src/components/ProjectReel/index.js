import React, { useEffect, useRef, useState, useCallback } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import {
  Section,
  Pin,
  TextCol,
  TextItem,
  Title,
  Desc,
  CaseLink,
  Stage,
  Card,
  Rail,
  Dot,
} from './styles';
import { projects } from '../../data/projects';

export default function ProjectReel() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
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

    setActive((prev) => {
      const next = Math.round(activeFloat);
      return prev === next ? prev : next;
    });

    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const offset = i - activeFloat; // 0 = centred, <0 above, >0 below
      const y = offset * 76; // vh — cards scroll up through the centre frame
      const rotateX = offset * -10; // 3D curve as cards enter/leave
      const scale = Math.max(0.72, 1 - Math.abs(offset) * 0.12);
      const opacity = Math.max(0, 1.15 - Math.abs(offset) * 0.62);
      el.style.transform =
        `translate(-50%, -50%) translateY(${y.toFixed(2)}vh) ` +
        `rotateX(${rotateX.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
      el.style.opacity = opacity.toFixed(3);
      el.style.zIndex = String(100 - Math.round(Math.abs(offset) * 10));
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
        <TextCol>
          {projects.map((project, i) => (
            <TextItem key={project.slug} $active={i === active}>
              <Title>{project.title}</Title>
              <Desc>{project.overview || project.desc}</Desc>
              <CaseLink to={`/${project.slug}`}>
                Open case study <FiArrowRight />
              </CaseLink>
            </TextItem>
          ))}
        </TextCol>

        <Stage>
          {projects.map((project, i) => (
            <Card
              key={project.slug}
              $src={project.cover}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
            />
          ))}
        </Stage>

        <Rail>
          {projects.map((project, i) => (
            <Dot
              key={project.slug}
              $active={i === active}
              onClick={() => jumpTo(i)}
              aria-label={project.title}
            />
          ))}
        </Rail>
      </Pin>
    </Section>
  );
}
