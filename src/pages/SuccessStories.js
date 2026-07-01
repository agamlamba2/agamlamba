import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import Navbar from '../components/Navbar';
import PageHero from '../components/PageHero';
import Contact from '../components/Contact';
import colors from '../assets/styles/variables/colors';
import quoteIcon from '../assets/quotation.svg';

/* ---------------------------------------------------------------------------
 * Testimonials. Con Colovos is real (from the Figma). The rest are placeholders
 * — replace them with the real quotes. Add an `avatar` (imported from
 * src/assets/avatars/) to any entry to show a photo instead of the initials.
 * ------------------------------------------------------------------------- */
const testimonials = [
  {
    name: 'Con Colovos',
    role: 'Program Director, Service Delivery Infrastructure',
    company: 'Westpac Group',
    quote:
      'I have been with Westpac as a Program Director Technology for nearly six years, in that time I have worked on some significant technology programs which has posed challenges and complexity. One of the more significant programs I have been working on for the past 12 months has been the identification and implementation of an automated booking system for approximately 750 meeting rooms within the Westpac Group. I always like to push the envelope and try something different and new to obtain the best outcome. This is where Agam and his team come in. We were looking for a system that could be developed internally, not require much upkeep, provide seamless integration to the backend mobile applications within Westpac and provide a WOW factor to our users. Agam was working on a new QR Code system for multiple uses within the Bank and approached me and asked if I would be interested in looking at what he was working on and see if it could help. I sat down reviewed what Agam had developed and I was in awe. It was the perfect solution and no one else was doing it in any large corporate, kudos to Agam. Agam and his team diligently worked on the solution using QR Codes for the meeting rooms and it is commencing rollout the 18 February 2019 enterprise wide to all of WBC. Not only is it an extraordinary piece of work, but Agam has been the quiet achiever working with his team in the background doing what they had to do with minimal fuss and never missed a deadline, or created any risks or issues that could jeopardise the outcome. It also ended up creating a saving of over 500% in operational expenditure to the bank by the imagination, insight and hard work of one of the brightest young technologists I have ever had the pleasure of working with. Agam is a rising star in the new world of mobile applications and AI.',
  },
  {
    name: 'Priya S.',
    role: 'Design Lead',
    company: 'Fintech',
    quote:
      'Working with Agam changed how our team thinks about research. He made the customer real for everyone in the room, not just the designers.',
  },
  {
    name: 'Marcus T.',
    role: 'Engineering Manager',
    company: 'Digital Bank',
    quote:
      'He pairs strong craft with genuine strategic thinking — the kind of designer who quietly makes everyone around him better.',
  },
  {
    name: 'Elena K.',
    role: 'Product Director',
    company: 'SaaS',
    quote:
      'Agam took our design system from zero to adopted across every team. Pragmatic, fast, and relentlessly focused on outcomes.',
  },
];

const Section = styled.section`
  background: ${colors.bg};
  padding: 96px 96px 120px;

  @media (max-width: 1200px) {
    padding: 80px 48px 96px;
  }
  @media (max-width: 768px) {
    padding: 56px 20px 72px;
  }
`;

const SectionHead = styled.div`
  max-width: 760px;
  margin: 0 auto 64px;
  text-align: center;
`;

const SectionKicker = styled.p`
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${colors.primary};
  margin-bottom: 16px;
`;

const SectionTitle = styled.h2`
  font-size: clamp(2.25rem, 5vw, 56px);
  font-weight: 800;
  letter-spacing: -1.5px;
  line-height: 1.1;
  color: ${colors.white};
`;

const Masonry = styled.div`
  column-count: 2;
  column-gap: 24px;

  @media (max-width: 900px) {
    column-count: 1;
  }
`;

const Card = styled.figure`
  break-inside: avoid;
  margin: 0 0 24px;
  position: relative;
  background: ${colors.bg};
  border: 1px solid ${colors.borderLight};
  border-radius: 16px;
  padding: 32px;
  padding-bottom: 56px;
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s ease, transform 0.7s ease, border-color 0.3s ease;

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }

  &:hover {
    border-color: ${colors.primary};
  }
`;

const Header = styled.div`
  display: flex;
  gap: 24px;
  align-items: flex-start;
`;

const Avatar = styled.div`
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  display: grid;
  place-items: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: ${colors.white};
  background: linear-gradient(135deg, ${colors.primary}, #7a0f2b);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DetailRow = styled.div`
  display: flex;
  gap: 16px;
  align-items: stretch;
  min-height: 80px;
`;

const Separator = styled.span`
  flex-shrink: 0;
  width: 4px;
  background: ${colors.primary};
  border-radius: 2px;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 4px 0;
`;

const Name = styled.p`
  font-size: 14px;
  font-weight: 700;
  line-height: 16px;
  color: ${colors.white};
`;

const Role = styled.p`
  margin-top: 8px;
  font-size: 10px;
  font-weight: 400;
  line-height: 16px;
  color: rgba(255, 255, 255, 0.6);
`;

const Company = styled.p`
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
  color: ${colors.primary};
`;

const QuoteOpen = styled.img`
  display: block;
  width: 40px;
  height: 28px;
  margin: 28px 0 12px;
`;

const QuoteText = styled.blockquote`
  margin: 0;
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
  color: ${colors.white};
`;

const QuoteClose = styled.img`
  position: absolute;
  right: 16px;
  bottom: 16px;
  width: 40px;
  height: 28px;
  transform: rotate(180deg);
`;

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function TestimonialCard({ item }) {
  const [ref, visible] = useReveal();
  const initials = item.name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  return (
    <Card ref={ref} className={visible ? 'visible' : ''}>
      <Header>
        <Avatar aria-hidden="true">
          {item.avatar ? <img src={item.avatar} alt="" /> : initials}
        </Avatar>
        <DetailRow>
          <Separator aria-hidden="true" />
          <Details>
            <div>
              <Name>{item.name}</Name>
              <Role>{item.role}</Role>
            </div>
            <Company>{item.company}</Company>
          </Details>
        </DetailRow>
      </Header>

      <QuoteOpen src={quoteIcon} alt="" aria-hidden="true" />
      <QuoteText>{item.quote}</QuoteText>
      <QuoteClose src={quoteIcon} alt="" aria-hidden="true" />
    </Card>
  );
}

export default function SuccessStories() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageHero
        title="Success stories"
        intro="Hear from a few of the clients and colleagues I've worked with over the years."
      />
      <Navbar />

      <Section>
        <SectionHead>
          <SectionKicker>Testimonials</SectionKicker>
          <SectionTitle>Kind words from the people I&rsquo;ve built with</SectionTitle>
        </SectionHead>
        <Masonry>
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} item={t} />
          ))}
        </Masonry>
      </Section>

      <Contact />
    </>
  );
}
