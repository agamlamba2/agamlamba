import React, { useState } from 'react';
import {
  GateWrap,
  GateCard,
  GateBadge,
  GateTitle,
  GateText,
  GateForm,
  GateInput,
  GateButton,
  GateError,
} from './styles';

const PASSWORD = 'AgamPortfolio@2026';
const STORAGE_KEY = 'portfolio-unlocked';

// Soft, session-based gate: once the correct password is entered, every
// protected project stays unlocked for the rest of the browser session.
export default function ProjectGate({ children }) {
  const [unlocked, setUnlocked] = useState(
    () => typeof window !== 'undefined' && window.sessionStorage.getItem(STORAGE_KEY) === 'true'
  );
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  if (unlocked) return children;

  const onSubmit = (e) => {
    e.preventDefault();
    if (value === PASSWORD) {
      window.sessionStorage.setItem(STORAGE_KEY, 'true');
      setUnlocked(true);
    } else {
      setError(true);
    }
  };

  return (
    <GateWrap>
      <GateCard>
        <GateBadge>Protected</GateBadge>
        <GateTitle>This project is locked</GateTitle>
        <GateText>
          Enter the password to view this case study. Once unlocked, you can
          browse all projects for this session.
        </GateText>
        <GateForm onSubmit={onSubmit}>
          <GateInput
            type="password"
            placeholder="Password"
            value={value}
            $error={error}
            autoFocus
            onChange={(e) => {
              setValue(e.target.value);
              if (error) setError(false);
            }}
          />
          <GateButton type="submit">Unlock</GateButton>
          <GateError>{error ? 'Incorrect password — please try again.' : ''}</GateError>
        </GateForm>
      </GateCard>
    </GateWrap>
  );
}
