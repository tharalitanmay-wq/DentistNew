'use client';

import React from 'react';
import { useCursor } from './useCursor';
import './Cursor.css';

export default function Cursor() {
  const { dotRef, trailingRef, isHovered, isClicking, isMobile } = useCursor();

  if (isMobile) {
    return null;
  }

  return (
    <>
      {/* Sharp Inner Dot (Instant Target Tracker) */}
      <div
        ref={dotRef}
        className={`modern-cursor-dot ${isHovered ? 'is-hovered' : ''} ${isClicking ? 'is-clicking' : ''}`}
        aria-hidden="true"
      />

      {/* Trailing Outer Glow Dot / Ring (Smooth Lag Tracker) */}
      <div
        ref={trailingRef}
        className={`modern-cursor-trailing ${isHovered ? 'is-hovered' : ''} ${isClicking ? 'is-clicking' : ''}`}
        aria-hidden="true"
      />
    </>
  );
}
