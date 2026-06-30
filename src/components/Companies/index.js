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

// uBank is the anchor (index 2). Every other logo starts offset from its grid
// spot and slides in toward it as the section scrolls into view — no fades.
const UBANK_INDEX = 2;
const COL_STEP = 130; // horizontal-distance-from-uBank -> vertical slide (px)
const ROW_STEP = 90; // row-distance-from-uBank -> vertical slide (px)
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

export default function Companies() {
  const gridRef = useRef(null);
  const cellRefs = useRef([]);
  const tickingRef = useRef(false);

  useEffect(() => {
    const update = () => {
      const grid = gridRef.current;
      if (grid) {
        const rect = grid.getBoundingClientRect();
        const vh = window.innerHeight;
        // Driven off the grid itself so the slide plays out while the logos
        // are on screen: 0 as the grid enters from the bottom, 1 near the top.
        const r = Math.max(0, Math.min((vh - rect.top) / (vh * 0.9), 1));
        const e = easeOutCubic(r);
        const cols = window.innerWidth <= 768 ? 2 : 4;
        const ubankCol = UBANK_INDEX % cols;
        const ubankRow = Math.floor(UBANK_INDEX / cols);
        cellRefs.current.forEach((el, i) => {
          if (!el) return;
          const col = i % cols;
          const row = Math.floor(i / cols);
          const startY =
            Math.abs(col - ubankCol) * COL_STEP + (row - ubankRow) * ROW_STEP;
          const y = startY * (1 - e);
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
            <LogoCell
              key={index}
              ref={(el) => {
                cellRefs.current[index] = el;
              }}
            >
              <LogoImg src={logo.src} alt={logo.alt} $height={logo.height} />
            </LogoCell>
          ))}
        </LogoGrid>
      </CompaniesContainer>
    </CompaniesSection>
  );
}
