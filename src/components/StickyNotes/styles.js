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
  color: #1a1a1a;
  border-radius: 2px;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.35);
  transform: rotate(${({ $rotate }) => $rotate}deg);
  cursor: grab;
  pointer-events: auto;
  touch-action: none;
  font-family: 'Bradley Hand', 'Segoe Print', 'Comic Sans MS', cursive;
  font-size: 1.05rem;
  line-height: 1.4;
  font-weight: 600;
  transition: box-shadow 0.2s ease;
  outline: none;
  caret-color: #1a1a1a;

  &[contenteditable='true'] {
    cursor: text;
  }

  &[contenteditable='true']:focus {
    box-shadow: 0 14px 30px rgba(0, 0, 0, 0.45);
  }

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
