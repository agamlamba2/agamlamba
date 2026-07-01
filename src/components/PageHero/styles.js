import styled, { keyframes } from 'styled-components';
import colors from '../../assets/styles/variables/colors';

const slideIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const HeroSection = styled.section`
  position: relative;
  height: calc(62vh + 64px);
  min-height: 524px;
  width: 100%;
  background: ${colors.bg};
  border-top: 1px solid #4f4f4f;
  border-bottom: 1px solid #4f4f4f;
  overflow: hidden;
`;

// Northern-lights curtains in red/crimson shades — self-animating, with a
// mouse-following bloom (position driven by --x/--y set in JS) that brightens
// the aurora where the cursor is.

// Vertical curtains sway, stretch and shimmer as they flow down from the top.
const auroraFlow = keyframes`
  0%,
  100% {
    transform: translateX(-2%) skewX(-5deg) scaleY(1);
    filter: blur(52px) saturate(1.2) hue-rotate(0deg);
    opacity: 0.9;
  }
  50% {
    transform: translateX(3%) skewX(5deg) scaleY(1.1);
    filter: blur(64px) saturate(1.35) hue-rotate(-12deg);
    opacity: 1;
  }
`;

// The cursor bloom breathes gently.
const auroraPulse = keyframes`
  0%,
  100% {
    filter: blur(56px) saturate(1.2);
    opacity: 0.85;
  }
  50% {
    filter: blur(66px) saturate(1.35);
    opacity: 1;
  }
`;

export const Aurora = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;

  /* Self-animating curtains hanging from the top edge. */
  &::before {
    content: '';
    position: absolute;
    inset: -12% -6% 0 -6%;
    background:
      radial-gradient(24% 88% at 20% -6%, rgba(226, 25, 73, 0.55), transparent 66%),
      radial-gradient(19% 72% at 38% -8%, rgba(255, 70, 110, 0.5), transparent 70%),
      radial-gradient(22% 92% at 55% -6%, rgba(190, 18, 80, 0.5), transparent 66%),
      radial-gradient(17% 70% at 72% -8%, rgba(255, 120, 70, 0.4), transparent 72%),
      radial-gradient(21% 84% at 88% -6%, rgba(168, 28, 120, 0.48), transparent 68%);
    filter: blur(52px) saturate(1.2);
    transform-origin: top center;
    will-change: transform, filter, opacity;
    animation: ${auroraFlow} 18s ease-in-out infinite;
  }

  /* Cursor bloom — a taller-than-wide light column that adds glow where the
     mouse is (screen blend brightens the curtains beneath it). */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 780px;
    height: 860px;
    transform: translate3d(calc(var(--x, 50%) - 390px), calc(var(--y, 50%) - 430px), 0);
    background:
      radial-gradient(38% 50% at 50% 44%, rgba(255, 72, 120, 0.55), transparent 70%),
      radial-gradient(28% 60% at 50% 40%, rgba(226, 25, 73, 0.5), transparent 72%),
      radial-gradient(24% 40% at 52% 56%, rgba(255, 140, 80, 0.34), transparent 72%);
    mix-blend-mode: screen;
    filter: blur(56px) saturate(1.2);
    will-change: transform, filter, opacity;
    animation: ${auroraPulse} 7s ease-in-out infinite;
  }

  @media (max-width: 768px) {
    &::after {
      width: 560px;
      height: 620px;
      transform: translate3d(calc(var(--x, 50%) - 280px), calc(var(--y, 50%) - 310px), 0);
    }
  }
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  height: 100%;
  width: 100%;
  padding: 48px 48px 128px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding: 40px 20px 120px;
  }
`;

export const HeroHeading = styled.h1`
  font-size: clamp(2.5rem, 5.5vw, 76px);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -2px;
  color: ${colors.white};
  text-shadow: 0px 2px 12px rgba(0, 0, 0, 0.48);
  animation: ${slideIn} 0.8s ease forwards;

  @media (max-width: 480px) {
    letter-spacing: -1.5px;
  }
`;

export const HeroBottom = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 208px;
  width: 100%;

  @media (max-width: 1200px) {
    gap: 80px;
  }

  @media (max-width: 768px) {
    gap: 0;
  }
`;

export const HeroBottomSpacer = styled.div`
  width: 466px;
  flex-shrink: 0;

  @media (max-width: 1200px) {
    width: 380px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const HeroParagraph = styled.p`
  flex: 1;
  min-width: 0;
  font-size: 26px;
  line-height: 40px;
  font-weight: 600;
  letter-spacing: 0;
  color: ${colors.white};
  text-align: left;
  text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.64);
  animation: ${slideIn} 0.8s ease 0.2s forwards;
  opacity: 0;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    line-height: 1.5;
  }
`;
