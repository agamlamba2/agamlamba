import styled from 'styled-components';
import colors from '../../assets/styles/variables/colors';

export const GateWrap = styled.div`
  min-height: 100vh;
  background: ${colors.bg};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120px 24px;
`;

export const GateCard = styled.div`
  width: 100%;
  max-width: 420px;
  text-align: center;
`;

export const GateBadge = styled.div`
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${colors.primary};
  margin-bottom: 16px;
`;

export const GateTitle = styled.h1`
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  letter-spacing: -1.5px;
  color: ${colors.white};
  margin-bottom: 12px;
`;

export const GateText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: ${colors.gray};
  margin-bottom: 32px;
`;

export const GateForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const GateInput = styled.input`
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1rem;
  color: ${colors.white};
  background: ${colors.bgCard};
  border: 1px solid ${({ $error }) => ($error ? colors.primary : '#4f4f4f')};
  border-radius: 8px;
  padding: 14px 16px;
  outline: none;
  transition: border-color 0.2s ease;

  &::placeholder {
    color: ${colors.grayDark};
  }

  &:focus {
    border-color: ${({ $error }) => ($error ? colors.primary : colors.white)};
  }
`;

export const GateButton = styled.button`
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: ${colors.white};
  background: ${colors.primary};
  border: none;
  border-radius: 8px;
  padding: 14px 16px;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

export const GateError = styled.p`
  font-size: 0.85rem;
  color: ${colors.primary};
  min-height: 1.1em;
`;
