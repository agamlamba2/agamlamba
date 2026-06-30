import React, { useState, useRef, useCallback } from 'react';
import { NotesLayer, Note } from './styles';

const DEFAULT_NOTE_3 = 'Double-click to edit this note ✏️';

// Notes 1 & 2 are fixed copy; note 3 is editable by the visitor.
const notes = [
  {
    id: 1,
    text: "I'm currently a Lead Designer for BFS & Design Systems at Ubank. Australia's first digital bank company.",
    color: '#FEFF9C',
    rotate: -4,
    x: 0.05,
    y: 0.12,
  },
  {
    id: 2,
    text: "I've been in the design industry for over 13 years, with a background in product design and a Bachelor's Degree in Design Computing from USyd",
    color: '#FF9CEE',
    rotate: 4,
    x: 0.74,
    y: 0.1,
  },
  {
    id: 3,
    editable: true,
    color: '#9CE3FF',
    rotate: -3,
    x: 0.08,
    y: 0.58,
  },
];

export default function StickyNotes() {
  const layerRef = useRef(null);
  const dragRef = useRef(null);
  const note3Initial = useRef(
    (typeof window !== 'undefined' && window.localStorage.getItem('sticky-note-3')) || DEFAULT_NOTE_3
  );

  const [positions, setPositions] = useState(() =>
    notes.reduce((acc, n) => {
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
      started: false,
      startX: e.clientX,
      startY: e.clientY,
      offsetX: e.clientX - noteRect.left,
      offsetY: e.clientY - noteRect.top,
      width: noteRect.width,
      height: noteRect.height,
      layerW: rect.width,
      layerH: rect.height,
      layerLeft: rect.left,
      layerTop: rect.top,
      el: e.currentTarget,
      pointerId: e.pointerId,
    };
  }, []);

  const onPointerMove = useCallback((e) => {
    const d = dragRef.current;
    if (!d) return;
    if (!d.started) {
      const dist = Math.hypot(e.clientX - d.startX, e.clientY - d.startY);
      if (dist < 5) return; // small move = click (lets editable notes focus)
      d.started = true;
      d.el.setPointerCapture(d.pointerId);
      d.el.dataset.dragging = 'true';
    }
    let px = e.clientX - d.layerLeft - d.offsetX;
    let py = e.clientY - d.layerTop - d.offsetY;
    px = Math.max(0, Math.min(px, d.layerW - d.width));
    py = Math.max(0, Math.min(py, d.layerH - d.height));
    setPositions((prev) => ({
      ...prev,
      [d.id]: { x: px / d.layerW, y: py / d.layerH },
    }));
  }, []);

  const onPointerUp = useCallback(() => {
    const d = dragRef.current;
    if (d && d.started) d.el.dataset.dragging = 'false';
    dragRef.current = null;
  }, []);

  const onNoteInput = useCallback((e) => {
    window.localStorage.setItem('sticky-note-3', e.currentTarget.textContent);
  }, []);

  return (
    <NotesLayer ref={layerRef}>
      {notes.map((note) => {
        const pos = positions[note.id];
        const common = {
          $color: note.color,
          $rotate: note.rotate,
          style: { left: `${pos.x * 100}%`, top: `${pos.y * 100}%` },
          onPointerDown: (e) => onPointerDown(e, note.id),
          onPointerMove,
          onPointerUp,
          onPointerCancel: onPointerUp,
        };

        if (note.editable) {
          return (
            <Note
              key={note.id}
              {...common}
              contentEditable
              suppressContentEditableWarning
              spellCheck={false}
              onInput={onNoteInput}
            >
              {note3Initial.current}
            </Note>
          );
        }

        return (
          <Note key={note.id} {...common}>
            {note.text}
          </Note>
        );
      })}
    </NotesLayer>
  );
}
