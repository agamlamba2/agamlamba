import styled from 'styled-components';

export const NotesLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  pointer-events: none;
  z-index: 50;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Note = styled.div`
  position: absolute;
  width: 240px;
  padding: 24px 22px 22px;
  background: ${({ $color }) => $color};
  color: #000000;
  border-radius: 2px;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.35);
  transform: rotate(${({ $rotate }) => $rotate}deg);
  cursor: grab;
  pointer-events: auto;
  touch-action: none;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1rem;
  line-height: 1.45;
  font-weight: 600;
  transition: box-shadow 0.2s ease;

  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 22px;
    background: rgba(255, 255, 255, 0.35);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  &[data-dragging='true'] {
    cursor: grabbing;
    box-shadow: 0 22px 40px rgba(0, 0, 0, 0.5);
    z-index: 100;
  }
`;

export const NoteTitle = styled.p`
  font-size: 1rem;
  font-weight: 700;
  color: #000000;
  margin-bottom: 12px;
`;

export const NoteForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const NoteInput = styled.input`
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  color: #000000;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  padding: 8px 10px;
  outline: none;

  &::placeholder {
    color: rgba(0, 0, 0, 0.45);
  }

  &:focus {
    border-color: rgba(0, 0, 0, 0.6);
  }
`;

export const NoteTextarea = styled.textarea`
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  color: #000000;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  padding: 8px 10px;
  resize: none;
  outline: none;
  min-height: 56px;

  &::placeholder {
    color: rgba(0, 0, 0, 0.45);
  }

  &:focus {
    border-color: rgba(0, 0, 0, 0.6);
  }
`;

export const NoteButton = styled.button`
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  color: #ffffff;
  background: #000000;
  border: none;
  border-radius: 4px;
  padding: 9px 12px;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.85;
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

export const NoteStatus = styled.p`
  font-size: 0.9rem;
  font-weight: 600;
  color: #000000;
`;
