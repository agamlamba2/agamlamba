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
import logoBakersDelight from "../../assets/company-logos/Logo-Baker'sDelight-white.svg";
import logoClover from '../../assets/company-logos/Logo-Clover-White.svg';
import logoCohortGlobal from '../../assets/company-logos/Logo-Cohort-Global-white.svg';
import logoConcentrix from '../../assets/company-logos/Logo-Concentrix-white.svg';
import logoHomeIn from '../../assets/company-logos/Logo-Home-in-White.svg';
import logoJXT from '../../assets/company-logos/Logo-JXT-White.svg';
import logoKelly from '../../assets/company-logos/Logo-Kelly-White.svg';
import logoSydneyWater from '../../assets/company-logos/Logo-Logo-Sydney-Water-white.svg';
import logoMestudent from '../../assets/company-logos/Logo-Mestudent-white.svg';
import logoSemco from '../../assets/company-logos/Logo-Semco-white.svg';
import logoStar from '../../assets/company-logos/Logo-Star-white.svg';
import logoWoolworths from '../../assets/company-logos/Logo-Woolworths-white.svg';
import logoMyBeepr from '../../assets/company-logos/Logo-myBeepr-White.svg';
import logoXtend from '../../assets/company-logos/Logo-xtend-white.svg';

export const logos = [
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
  { src: logoBakersDelight, alt: "Baker's Delight", height: 24 },
  { src: logoClover, alt: 'Clover', height: 24 },
  { src: logoCohortGlobal, alt: 'Cohort Global', height: 25 },
  { src: logoConcentrix, alt: 'Concentrix', height: 24 },
  { src: logoHomeIn, alt: 'Home-in', height: 24 },
  { src: logoJXT, alt: 'JXT', height: 24 },
  { src: logoKelly, alt: 'Kelly', height: 24 },
  { src: logoSydneyWater, alt: 'Sydney Water', height: 24 },
  { src: logoMestudent, alt: 'Mestudent', height: 24 },
  { src: logoSemco, alt: 'Semco', height: 24 },
  { src: logoStar, alt: 'Star', height: 24 },
  { src: logoWoolworths, alt: 'Woolworths', height: 24 },
  { src: logoMyBeepr, alt: 'myBeepr', height: 24 },
  { src: logoXtend, alt: 'xtend', height: 24 },
];

// Each logo slides up into its frame, revealed one at a time bottom-row-first
// with a slight stagger as the section scrolls in — no fades.
const SLIDE = 110; // how far each logo starts below its frame (px)
const STAGGER = 0.045; // scroll-progress gap between consecutive logos
const WINDOW = 0.28; // scroll-progress span of each logo's slide
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

export default function Companies({ label = 'Companies I’ve worked with' }) {
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
        <CompaniesLabel>{label}</CompaniesLabel>
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
