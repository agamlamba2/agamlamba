import React, { useState, useRef, useCallback } from 'react';
import {
  NotesLayer,
  Note,
  NoteTitle,
  NoteForm,
  NoteInput,
  NoteTextarea,
  NoteButton,
  NoteStatus,
} from './styles';

const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/agamlamba2@gmail.com';

// Notes 1 & 2 are fixed copy; note 3 is a "leave me a message" form.
// Positions (fractions of the viewport) are chosen to clear the hero text
// and reset on every page load (state is not persisted).
const notes = [
  {
    id: 1,
    text: "I'm currently a Lead Designer for BFS & Design Systems at Ubank. Australia's first digital bank company.",
    color: '#FEFF9C',
    rotate: -4,
    x: 0.63,
    y: 0.07,
  },
  {
    id: 2,
    text: "I've been in the design industry for over 13 years, with a background in product design and a Bachelor's Degree in Design Computing from USyd",
    color: '#FF9CEE',
    rotate: 4,
    x: 0.04,
    y: 0.42,
  },
  {
    id: 3,
    form: true,
    color: '#9CE3FF',
    rotate: -3,
    x: 0.66,
    y: 0.4,
  },
];

export default function StickyNotes() {
  const layerRef = useRef(null);
  const dragRef = useRef(null);

  const [positions, setPositions] = useState(() =>
    notes.reduce((acc, n) => {
      acc[n.id] = { x: n.x, y: n.y };
      return acc;
    }, {})
  );
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

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
      if (dist < 5) return; // small move = click
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

  const stop = useCallback((e) => e.stopPropagation(), []);

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setStatus('sending');
    try {
      const res = await fetch(FORMSUBMIT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          email: formData.get('email'),
          message: formData.get('message'),
          _subject: 'New message from your portfolio',
        }),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch (err) {
      setStatus('error');
    }
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

        if (note.form) {
          return (
            <Note key={note.id} {...common}>
              <NoteTitle>Leave me a message</NoteTitle>
              {status === 'sent' ? (
                <NoteStatus>Thanks! I'll be in touch ✌️</NoteStatus>
              ) : (
                <NoteForm onSubmit={onSubmit}>
                  <NoteInput
                    type="email"
                    name="email"
                    placeholder="Your email"
                    required
                    onPointerDown={stop}
                  />
                  <NoteTextarea
                    name="message"
                    placeholder="Your message…"
                    required
                    onPointerDown={stop}
                  />
                  <NoteButton
                    type="submit"
                    onPointerDown={stop}
                    disabled={status === 'sending'}
                  >
                    {status === 'sending' ? 'Sending…' : 'Send'}
                  </NoteButton>
                  {status === 'error' && (
                    <NoteStatus>Something went wrong — try again.</NoteStatus>
                  )}
                </NoteForm>
              )}
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
