import styled, { keyframes } from 'styled-components';
import colors from '../../assets/styles/variables/colors';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const ProjectsSection = styled.section`
  background: ${colors.bg};
  min-height: 100vh;
  width: 100%;
  padding: 140px 48px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #4f4f4f;

  @media (max-width: 900px) {
    padding: 80px 20px;
  }
`;

export const ProjectsHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 80px;

  @media (max-width: 900px) {
    margin-bottom: 48px;
  }
`;

export const ProjectsTitle = styled.h2`
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 800;
  color: ${colors.white};
  letter-spacing: -1.5px;
`;

export const ProjectsCount = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: ${colors.gray};
`;

export const ProjectsBody = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.8fr;
  gap: 64px;
  flex: 1;
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

export const ProjectList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProjectItem = styled.a`
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 28px 0;
  border-bottom: 1px solid #2a2a2a;
  cursor: pointer;
  opacity: ${({ $dimmed }) => ($dimmed ? 0.35 : 1)};
  transition: opacity 0.4s ease, padding-left 0.4s ease;

  &:first-child {
    border-top: 1px solid #2a2a2a;
  }

  &:hover {
    padding-left: 20px;
  }

  @media (max-width: 900px) {
    &:hover {
      padding-left: 0;
    }
  }
`;

export const ProjectIndex = styled.span`
  font-size: 0.85rem;
  font-weight: 600;
  color: ${colors.primary};
  min-width: 32px;
`;

export const ProjectName = styled.span`
  font-size: clamp(1.5rem, 3vw, 2.6rem);
  font-weight: 700;
  color: ${colors.white};
  letter-spacing: -1px;
  transition: color 0.3s ease;
  flex: 1;
`;

export const ProjectCategory = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${colors.gray};
  white-space: nowrap;

  @media (max-width: 600px) {
    display: none;
  }
`;

export const ProjectPreview = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 5;
  border-radius: 16px;
  overflow: hidden;
  background: ${colors.bgCard};

  @media (max-width: 900px) {
    display: none;
  }
`;

export const PreviewImage = styled.div`
  position: absolute;
  inset: 0;
  background-image: url(${({ $src }) => $src});
  background-size: cover;
  background-position: center;
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transform: scale(${({ $active }) => ($active ? 1 : 1.08)});
  clip-path: ${({ $active }) =>
    $active ? 'inset(0 0 0 0)' : 'inset(100% 0 0 0)'};
  transition: opacity 0.8s ease, transform 0.9s ease,
    clip-path 0.7s cubic-bezier(0.76, 0, 0.24, 1);
`;

export const PreviewMobile = styled.div`
  display: none;

  @media (max-width: 900px) {
    display: block;
    width: 100%;
    aspect-ratio: 4 / 5;
    border-radius: 12px;
    overflow: hidden;
    margin-top: 16px;
    background-image: url(${({ $src }) => $src});
    background-size: cover;
    background-position: center;
    animation: ${fadeUp} 0.6s ease both;
  }
`;
