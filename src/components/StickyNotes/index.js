import React, { useState, useRef, useCallback } from 'react';
import { NotesLayer, Note } from './styles';

// Placeholder content in the spirit of mattholihan.design — swap for the real text.
const initialNotes = [
  { id: 1, text: "Hi, I'm Agam 👋", color: '#FEFF9C', rotate: -5, x: 0.06, y: 0.14 },
  { id: 2, text: 'Drag me around! ✨', color: '#FF9CEE', rotate: 4, x: 0.8, y: 0.1 },
  { id: 3, text: 'Design + Strategy', color: '#9CE3FF', rotate: -3, x: 0.05, y: 0.62 },
  { id: 4, text: 'Available for work ☕', color: '#FFC98A', rotate: 6, x: 0.82, y: 0.6 },
];

export default function StickyNotes() {
  const layerRef = useRef(null);
  const dragRef = useRef(null);
  const [positions, setPositions] = useState(() =>
    initialNotes.reduce((acc, n) => {
      acc[n.id] = { x: n.x, y: n.y };
      return acc;
    }, {})
  );

  const onPointerDown = useCallback((e, id) => {
    const layer = layerRef.current;
    if (!layer) return;
    const rect = layer.getBoundingClientRect();
    const noteRect = e.currentTarget.getBoundingClientRect();
    dragRef.current = {
      id,
      offsetX: e.clientX - noteRect.left,
      offsetY: e.clientY - noteRect.top,
      width: noteRect.width,
      height: noteRect.height,
      layerW: rect.width,
      layerH: rect.height,
      layerLeft: rect.left,
      layerTop: rect.top,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
    e.currentTarget.dataset.dragging = 'true';
  }, []);

  const onPointerMove = useCallback((e) => {
    const d = dragRef.current;
    if (!d) return;
    let px = e.clientX - d.layerLeft - d.offsetX;
    let py = e.clientY - d.layerTop - d.offsetY;
    px = Math.max(0, Math.min(px, d.layerW - d.width));
    py = Math.max(0, Math.min(py, d.layerH - d.height));
    setPositions((prev) => ({
      ...prev,
      [d.id]: { x: px / d.layerW, y: py / d.layerH },
    }));
  }, []);

  const onPointerUp = useCallback((e) => {
    if (dragRef.current) {
      e.currentTarget.dataset.dragging = 'false';
      dragRef.current = null;
    }
  }, []);

  return (
    <NotesLayer ref={layerRef}>
      {initialNotes.map((note) => {
        const pos = positions[note.id];
        return (
          <Note
            key={note.id}
            $color={note.color}
            $rotate={note.rotate}
            style={{ left: `${pos.x * 100}%`, top: `${pos.y * 100}%` }}
            onPointerDown={(e) => onPointerDown(e, note.id)}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            {note.text}
          </Note>
        );
      })}
    </NotesLayer>
  );
}
