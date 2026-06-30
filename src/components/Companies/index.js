import React, { useEffect, useRef, useState } from 'react';
import {
  CompaniesSection,
  CompaniesContainer,
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

export default function Companies() {
  const ref = useRef(null);
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
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <CompaniesSection id="companies">
      <CompaniesContainer ref={ref}>
        {logos.map((logo, index) => (
          <LogoCell key={index} $visible={visible} $delay={(index % 4) * 0.08 + Math.floor(index / 4) * 0.05}>
            <LogoImg src={logo.src} alt={logo.alt} $height={logo.height} />
          </LogoCell>
        ))}
      </CompaniesContainer>
    </CompaniesSection>
  );
}
