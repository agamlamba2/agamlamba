import React from 'react';
import { MarqueeSection, MarqueeTrack, MarqueeItem, MarqueeDot } from './styles';

export default function Marquee({ items, speed = 30 }) {
  const content = items || [
    'Software Development',
    'Web Applications',
    'UI/UX Design',
    'React',
    'Node.js',
    'Full Stack',
  ];

  const doubled = [...content, ...content];

  return (
    <MarqueeSection>
      <MarqueeTrack $speed={speed}>
        {doubled.map((item, i) => (
          <React.Fragment key={i}>
            <MarqueeItem>{item}</MarqueeItem>
            <MarqueeDot />
          </React.Fragment>
        ))}
      </MarqueeTrack>
    </MarqueeSection>
  );
}
