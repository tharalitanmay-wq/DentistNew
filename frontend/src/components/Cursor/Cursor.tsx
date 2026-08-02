'use client';

import React, { useState } from 'react';
import { useCursor } from './useCursor';
import './Cursor.css';

export interface CursorProps {
  /** Path to custom syringe cursor image asset */
  imageSrc?: string;
}

/**
 * Premium Custom Dental Syringe Mouse Cursor Component.
 * High-performance 60 FPS animation with needle tip hotspot precision,
 * micro-tilt physics, hover scale glow, and injection click animation.
 */
export default function Cursor({ imageSrc = '/assets/cursor/injection.svg' }: CursorProps) {
  const { cursorElementRef, isHovered, isClicking, isMobile } = useCursor();
  const [imgError, setImgError] = useState(false);

  // Automatically disable on mobile phone screens
  if (isMobile) {
    return null;
  }

  return (
    <div
      ref={cursorElementRef}
      className={`dental-syringe-cursor-container ${isHovered ? 'is-hovered' : ''} ${
        isClicking ? 'is-clicking' : ''
      }`}
      aria-hidden="true"
    >
      <div className="dental-syringe-inner">
        {!imgError ? (
          /* Syringe Image Asset */
          <img
            src={imageSrc}
            alt="Dental Syringe Cursor"
            className="dental-syringe-img"
            loading="eager"
            onError={() => setImgError(true)}
          />
        ) : (
          /* High-Resolution Inline Vector Syringe Fallback */
          <svg
            viewBox="0 0 120 120"
            className="dental-syringe-img"
            style={{ width: '100%', height: '100%' }}
          >
            <defs>
              <linearGradient id="needle-metal-inline" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#cbd5e1" />
                <stop offset="100%" stopColor="#64748b" />
              </linearGradient>
              <linearGradient id="barrel-glass-inline" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
                <stop offset="70%" stopColor="rgba(241,245,249,0.85)" />
                <stop offset="100%" stopColor="rgba(203,213,225,0.7)" />
              </linearGradient>
              <linearGradient id="anesthetic-liquid-inline" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            <g>
              <line x1="0" y1="0" x2="22" y2="22" stroke="url(#needle-metal-inline)" strokeWidth="2.5" strokeLinecap="round" />
              <polygon points="19,16 27,24 23,28 15,20" fill="#94a3b8" stroke="#475569" strokeWidth="0.8" />
              <polygon points="23,20 31,28 27,32 19,24" fill="#0284c7" opacity="0.85" />
              <g transform="rotate(45 0 0)">
                <rect x="25" y="-7" width="52" height="14" rx="2" fill="url(#barrel-glass-inline)" stroke="#475569" strokeWidth="1.2" />
                <rect x="26" y="-5.5" width="34" height="11" fill="url(#anesthetic-liquid-inline)" />
                <line x1="32" y1="-6" x2="32" y2="-1" stroke="#1e293b" strokeWidth="0.8" />
                <line x1="38" y1="-6" x2="38" y2="-3" stroke="#1e293b" strokeWidth="0.8" />
                <line x1="44" y1="-6" x2="44" y2="-1" stroke="#1e293b" strokeWidth="0.8" />
                <line x1="50" y1="-6" x2="50" y2="-3" stroke="#1e293b" strokeWidth="0.8" />
                <line x1="56" y1="-6" x2="56" y2="-1" stroke="#1e293b" strokeWidth="0.8" />
                <rect x="60" y="-6" width="6" height="12" rx="1" fill="#0f172a" />
                <rect x="77" y="-12" width="4" height="24" rx="1.5" fill="#f8fafc" stroke="#475569" strokeWidth="1.2" />
                <rect x="66" y="-2.5" width="30" height="5" fill="#e2e8f0" stroke="#64748b" strokeWidth="0.8" />
                <rect x="96" y="-9" width="4" height="18" rx="1" fill="#0ea5e9" stroke="#0284c7" strokeWidth="1" />
              </g>
            </g>
          </svg>
        )}

        {/* Hotspot Precision Dot at Needle Tip (0,0) */}
        <div className="needle-hotspot-dot" />

        {/* Anesthetic Droplet Animation Element */}
        <div className="anesthetic-droplet" />
      </div>
    </div>
  );
}
