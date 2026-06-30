import React, { useEffect, useRef, useState } from 'react';
import {
  CompaniesSection,
  CompaniesContainer,
  CompaniesLabel,
  LogoGrid,
  LogoCell,
  LogoImg,
} from './styles';

import logoCBA from '../../assets/company-logos/Logo-CBA-White.svg';
import logoWestpac from '../../assets/company-logos/Logo-Westpac-White.svg';
import logoUbank from '../../assets/company-logos/Logo-Ubank-white.svg';
import logoStGeorge from '../../assets/company-logos/Logo-St-George-White.svg';
import logoCoverMore from '../../assets/company-logos/Logo-CoverMore-White.svg';
import logoInvoCare from '../../assets/company-logos/Logo-InvoCare-White.svg';
import logoNewsCorp from '../../assets/company-logos/Logo-News-Corp-Australia-white.svg';
import logoNZME from '../../assets/company-logos/Logo-NZME.-White.svg';
import logoTelstra from '../../assets/company-logos/Logo-Telstra-White.svg';
import logoNSW from '../../assets/company-logos/Logo -NSW-Government-white.svg';
import logoDehancer from '../../assets/company-logos/Logo-Dehancer-white.svg';
import logoCSIRO from '../../assets/company-logos/Logo-CSIRO-white.svg';
import logoLawlab from '../../assets/company-logos/Logo-lawlab-white.svg';
import logoAvant from '../../assets/company-logos/Logo-AvantMutual-White.svg';
import logoPhysioInq from '../../assets/company-logos/Logo-PhysioInq-white.svg';
import logoLesMills from '../../assets/company-logos/Logo-LesMills-White.svg';

const logos = [
  { src: logoCBA, alt: 'Commonwealth Bank', height: 40 },
  { src: logoWestpac, alt: 'Westpac', height: 24 },
  { src: logoUbank, alt: 'uBank', height: 24 },
  { src: logoStGeorge, alt: 'St.George', height: 32 },
  { src: logoCoverMore, alt: 'Cover-More', height: 36 },
  { src: logoInvoCare, alt: 'InvoCare', height: 28 },
  { src: logoNewsCorp, alt: 'News Corp Australia', height: 28 },
  { src: logoNZME, alt: 'NZME', height: 24 },
  { src: logoTelstra, alt: 'Telstra', height: 28 },
  { src: logoNSW, alt: 'NSW Government', height: 48 },
  { src: logoDehancer, alt: 'Dehancer Film Emulation', height: 40 },
  { src: logoCSIRO, alt: 'CSIRO', height: 48 },
  { src: logoLawlab, alt: 'lawlab', height: 40 },
  { src: logoAvant, alt: 'Avant Mutual', height: 32 },
  { src: logoPhysioInq, alt: 'Physio Inq', height: 28 },
  { src: logoLesMills, alt: 'Les Mills', height: 20 },
];

// Per-column drift amplitude (px), alternating direction/speed — gives the
// gentle milliesdesign-style collage motion as the section scrolls.
const COL_FACTORS = [46, -30, 36, -50];

export default function Companies() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const cellRefs = useRef([]);
  const tickingRef = useRef(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const update = () => {
      const section = sectionRef.current;
      if (section) {
        const rect = section.getBoundingClientRect();
        const vh = window.innerHeight;
        const p = (vh / 2 - (rect.top + rect.height / 2)) / vh;
        const cols = window.innerWidth <= 768 ? 2 : 4;
        cellRefs.current.forEach((el, i) => {
          if (!el) return;
          const factor = COL_FACTORS[(i % cols) % COL_FACTORS.length];
          el.style.transform = `translate3d(0, ${(p * factor).toFixed(2)}px, 0)`;
        });
      }
      tickingRef.current = false;
    };
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
  }, []);

  return (
    <CompaniesSection id="companies" ref={sectionRef}>
      <CompaniesContainer ref={containerRef}>
        <CompaniesLabel>Companies I&rsquo;ve worked with</CompaniesLabel>
        <LogoGrid>
          {logos.map((logo, index) => (
            <LogoCell
              key={index}
              ref={(el) => {
                cellRefs.current[index] = el;
              }}
              $visible={visible}
              $delay={(index % 4) * 0.08 + Math.floor(index / 4) * 0.05}
            >
              <LogoImg src={logo.src} alt={logo.alt} $height={logo.height} />
            </LogoCell>
          ))}
        </LogoGrid>
      </CompaniesContainer>
    </CompaniesSection>
  );
}
