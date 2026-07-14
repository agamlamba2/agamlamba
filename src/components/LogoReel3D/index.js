import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import colors from '../../assets/styles/variables/colors';
import { logos } from '../Companies';

/* 3D rotating logo reel (liminalrecruitment.com community loop): the logos sit
   on dark cards arranged around a ring — like a film-camera rolodex — that
   auto-spins, while scroll tilts the camera so you look down into the ring as
   it travels up the viewport. */

const SPIN_SPEED = 4.5; // deg per second the ring turns (slow rolodex)
const TILT_BASE = 10; // deg of downward tilt when the ring is viewport-centred
const TILT_RANGE = 48; // extra deg of tilt as the ring moves toward the top
const CARD_GAP = 12; // px between neighbouring cards on the ring

const Section = styled.section`
  background: ${colors.bg};
  width: 100%;
  padding: 96px 0 112px;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 56px 0 72px;
  }
`;

const Label = styled.p`
  font-size: 26px;
  font-weight: 600;
  line-height: 40px;
  color: #8f8f8f;
  text-align: center;
  padding: 24px 0 40px;

  @media (max-width: 768px) {
    font-size: 1.25rem;
    line-height: 1.5;
  }
`;

const Viewport = styled.div`
  position: relative;
  width: 100%;
  height: 420px;
  perspective: 2400px;
  perspective-origin: 50% 50%;

  @media (max-width: 768px) {
    height: 320px;
  }
`;

const Tilt = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform-style: preserve-3d;
  will-change: transform;
`;

const Ring = styled.div`
  position: absolute;
  transform-style: preserve-3d;
  will-change: transform;
`;

const CardSlot = styled.div`
  position: absolute;
  transform-style: preserve-3d;
`;

const Face = styled.div`
  position: absolute;
  display: grid;
  place-items: center;
  border-radius: 14px;
  background: #101010;
  border: 1px solid #262626;
  backface-visibility: hidden;

  img {
    max-width: 70%;
    object-fit: contain;
    opacity: 0.92;
  }
`;

export default function LogoReel3D({ label = 'Companies I’ve start up' }) {
  const viewportRef = useRef(null);
  const tiltRef = useRef(null);
  const ringRef = useRef(null);
  const slotRefs = useRef([]);
  const rafRef = useRef(0);
  const runningRef = useRef(false);
  const angleRef = useRef(0);
  const lastRef = useRef(0);

  useEffect(() => {
    const N = logos.length;
    const viewport = viewportRef.current;
    if (!viewport) return undefined;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Size the cards and ring radius to the viewport.
    const layout = () => {
      const mobile = window.innerWidth <= 768;
      const cardW = mobile ? 92 : 124;
      const cardH = mobile ? 62 : 84;
      const radius = ((cardW + CARD_GAP) * N) / (2 * Math.PI);
      slotRefs.current.forEach((slot, i) => {
        if (!slot) return;
        slot.style.transform = `rotateY(${((360 / N) * i).toFixed(3)}deg) translateZ(${radius.toFixed(1)}px)`;
        slot.querySelectorAll('div').forEach((face) => {
          face.style.width = `${cardW}px`;
          face.style.height = `${cardH}px`;
          face.style.left = `${-cardW / 2}px`;
          face.style.top = `${-cardH / 2}px`;
        });
      });
    };
    layout();

    const render = () => {
      const rect = viewport.getBoundingClientRect();
      const vh = window.innerHeight;
      // How far the ring sits above the viewport centre (0 = centred).
      const norm = Math.max(
        -0.12,
        Math.min((vh / 2 - (rect.top + rect.height / 2)) / (vh * 0.75), 1)
      );
      const tilt = TILT_BASE + norm * TILT_RANGE;
      if (tiltRef.current) {
        tiltRef.current.style.transform = `rotateX(${tilt.toFixed(2)}deg)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `rotateY(${angleRef.current.toFixed(2)}deg)`;
      }
    };

    if (reduced) {
      render(); // static ring, no spin
      window.addEventListener('resize', layout);
      return () => window.removeEventListener('resize', layout);
    }

    const tick = (now) => {
      const dt = lastRef.current ? Math.min(now - lastRef.current, 64) : 16.7;
      lastRef.current = now;
      angleRef.current = (angleRef.current + (SPIN_SPEED * dt) / 1000) % 360;
      render();
      rafRef.current = requestAnimationFrame(tick);
    };

    // Only spin while on screen.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !runningRef.current) {
          runningRef.current = true;
          lastRef.current = 0;
          rafRef.current = requestAnimationFrame(tick);
        } else if (!entry.isIntersecting && runningRef.current) {
          runningRef.current = false;
          cancelAnimationFrame(rafRef.current);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(viewport);

    const onResize = () => layout();
    window.addEventListener('resize', onResize);
    render();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
      runningRef.current = false;
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <Section aria-label={label}>
      <Label>{label}</Label>
      <Viewport ref={viewportRef}>
        <Tilt ref={tiltRef}>
          <Ring ref={ringRef}>
            {logos.map((l, i) => (
              <CardSlot
                key={l.alt}
                ref={(el) => {
                  slotRefs.current[i] = el;
                }}
              >
                {/* Double-sided card so the logo reads correctly from both sides. */}
                <Face>
                  <img src={l.src} alt={l.alt} style={{ height: l.height * 0.8 }} />
                </Face>
                <Face style={{ transform: 'rotateY(180deg)' }}>
                  <img src={l.src} alt="" aria-hidden="true" style={{ height: l.height * 0.8 }} />
                </Face>
              </CardSlot>
            ))}
          </Ring>
        </Tilt>
      </Viewport>
    </Section>
  );
}
