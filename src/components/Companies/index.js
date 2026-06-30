import React, { useEffect, useRef } from 'react';
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

// Each logo slides up into its frame, revealed one at a time bottom-row-first
// with a slight stagger as the section scrolls in — no fades.
const SLIDE = 110; // how far each logo starts below its frame (px)
const STAGGER = 0.045; // scroll-progress gap between consecutive logos
const WINDOW = 0.28; // scroll-progress span of each logo's slide
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

export default function Companies() {
  const gridRef = useRef(null);
  const imgRefs = useRef([]);
  const tickingRef = useRef(false);

  useEffect(() => {
    const clamp = (v) => Math.max(0, Math.min(v, 1));

    const update = () => {
      const grid = gridRef.current;
      if (grid) {
        const rect = grid.getBoundingClientRect();
        const vh = window.innerHeight;
        const r = clamp((vh - rect.top) / (vh * 0.9));
        const cols = window.innerWidth <= 768 ? 2 : 4;
        imgRefs.current.forEach((el, i) => {
          if (!el) return;
          const row = Math.floor(i / cols);
          const col = i % cols;
          // top row reveals first, moving down to the bottom row
          const order = row * cols + col;
          const local = clamp((r - order * STAGGER) / WINDOW);
          const y = (1 - easeOutCubic(local)) * SLIDE;
          el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
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
    <CompaniesSection id="companies">
      <CompaniesContainer>
        <CompaniesLabel>Companies I&rsquo;ve worked with</CompaniesLabel>
        <LogoGrid ref={gridRef}>
          {logos.map((logo, index) => (
            <LogoCell key={index}>
              <LogoImg
                src={logo.src}
                alt={logo.alt}
                $height={logo.height}
                ref={(el) => {
                  imgRefs.current[index] = el;
                }}
              />
            </LogoCell>
          ))}
        </LogoGrid>
      </CompaniesContainer>
    </CompaniesSection>
  );
}
