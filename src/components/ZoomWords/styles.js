import styled from 'styled-components';
import colors from '../../assets/styles/variables/colors';

// Tall section gives scroll room; the inner pin stays fixed while words zoom.
export const Section = styled.section`
  position: relative;
  height: 300vh;
  background: ${colors.bg};

  @media (max-width: 768px) {
    height: 240vh;
  }
`;

export const Pin = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const Word = styled.div`
  position: absolute;
  will-change: transform, opacity;
  text-align: center;
  padding: 0 24px;

  span {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: clamp(3rem, 12vw, 180px);
    font-weight: 800;
    letter-spacing: -3px;
    line-height: 1;
    color: ${colors.white};
  }
`;
