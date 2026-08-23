'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { gsap } from 'gsap';

export interface SyringeCursorProps {
  hideDefaultCursor?: boolean;
}

export default function SyringeCursor({ hideDefaultCursor = true }: SyringeCursorProps) {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const plungerRef = useRef<SVGGElement | null>(null);
  const dropletRef = useRef<SVGCircleElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false;
    const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth <= 768;
    return hasTouchScreen && isSmallScreen;
  }, []);

  useEffect(() => {
    if (isMobile || !cursorRef.current) return;

    const originalCursor = document.body.style.cursor;
    if (hideDefaultCursor) {
      document.body.style.cursor = 'none';
      
      // Inject global CSS rule to ensure cursor: none everywhere on desktop
      const styleEl = document.createElement('style');
      styleEl.id = 'syringe-cursor-style';
      styleEl.innerHTML = `
        @media (min-width: 769px) {
          *, *::before, *::after, a, button, input, select, textarea {
            cursor: none !important;
          }
        }
      `;
      document.head.appendChild(styleEl);
    }

    const cursor = cursorRef.current;

    // Set initial position
    gsap.set(cursor, {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      pointerEvents: 'none'
    });

    // Smooth Mouse Movement
    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: 'power2.out'
      });
    };

    // Click Animations (Inject Plunger)
    const onMouseDown = () => {
      setIsClicking(true);
      if (plungerRef.current) {
        gsap.to(plungerRef.current, {
          x: -8,
          y: -8,
          duration: 0.12,
          ease: 'power2.out'
        });
      }
      if (dropletRef.current) {
        gsap.fromTo(
          dropletRef.current,
          { opacity: 1, scale: 0.5, x: 0, y: 0 },
          { opacity: 0, scale: 2.5, x: -12, y: -12, duration: 0.35, ease: 'power1.out' }
        );
      }
    };

    const onMouseUp = () => {
      setIsClicking(false);
      if (plungerRef.current) {
        gsap.to(plungerRef.current, {
          x: 0,
          y: 0,
          duration: 0.25,
          ease: 'elastic.out(1, 0.5)'
        });
      }
    };

    // Detect Hover over interactive elements
    const interactiveSelector = 'button, a, input, select, textarea, [role="button"], .pixel-card, .cursor-target';
    
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.closest(interactiveSelector) || target.matches(interactiveSelector))) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', onMouseOver);

      document.body.style.cursor = originalCursor;
      const styleEl = document.getElementById('syringe-cursor-style');
      if (styleEl) styleEl.remove();
    };
  }, [hideDefaultCursor, isMobile]);

  if (isMobile) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[99999] pointer-events-none select-none transition-transform duration-200"
      style={{
        transformOrigin: '0px 0px', // Needle tip is at (0, 0)
      }}
    >
      <div className={`relative ${isHovered ? 'scale-110' : 'scale-100'} transition-transform duration-200`}>
        
        {/* Glowing aura around syringe needle tip on hover */}
        {isHovered && (
          <div className="absolute -top-3 -left-3 w-7 h-7 bg-cyan-400/40 rounded-full blur-md animate-ping pointer-events-none" />
        )}

        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          className="overflow-visible filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.35)]"
        >
          {/* Needle Tip Droplet (Fires on Click / Injection) */}
          <circle
            ref={dropletRef}
            cx="0"
            cy="0"
            r="4"
            fill="#86a57d"
            className="opacity-0"
          />

          {/* 1. Metallic Needle Shaft (Tip at 0,0) */}
          <line
            x1="0"
            y1="0"
            x2="22"
            y2="22"
            stroke={isHovered ? '#86a57d' : '#94a3b8'}
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* 2. Plastic Needle Hub Adapter */}
          <polygon
            points="20,16 28,24 24,28 16,20"
            fill="#cbd5e1"
            stroke="#64748b"
            strokeWidth="1"
          />
          <polygon
            points="24,20 32,28 28,32 20,24"
            fill="#6c8e63"
            opacity="0.8"
          />

          {/* 3. Main Translucent Syringe Barrel Cylinder */}
          <g transform="rotate(45 0 0)">
            {/* Barrel Body */}
            <rect
              x="26"
              y="-7"
              width="50"
              height="14"
              rx="2"
              fill="rgba(255, 255, 255, 0.85)"
              stroke="#475569"
              strokeWidth="1.5"
            />
            
            {/* Liquid / Anesthetic Level inside Barrel */}
            <rect
              x="27"
              y="-5.5"
              width="32"
              height="11"
              fill="url(#liquid-gradient)"
              opacity="0.75"
            />

            {/* Measurement Graduation Lines (0.5ml to 3ml) */}
            <line x1="33" y1="-6" x2="33" y2="-1" stroke="#334155" strokeWidth="1" />
            <line x1="39" y1="-6" x2="39" y2="-3" stroke="#334155" strokeWidth="1" />
            <line x1="45" y1="-6" x2="45" y2="-1" stroke="#334155" strokeWidth="1" />
            <line x1="51" y1="-6" x2="51" y2="-3" stroke="#334155" strokeWidth="1" />
            <line x1="57" y1="-6" x2="57" y2="-1" stroke="#334155" strokeWidth="1" />
            <line x1="63" y1="-6" x2="63" y2="-3" stroke="#334155" strokeWidth="1" />
            <line x1="69" y1="-6" x2="69" y2="-1" stroke="#334155" strokeWidth="1" />

            {/* Measurement Numbers */}
            <text x="31" y="4" fontSize="4" fontWeight="bold" fill="#0f172a">1</text>
            <text x="43" y="4" fontSize="4" fontWeight="bold" fill="#0f172a">2</text>
            <text x="55" y="4" fontSize="4" fontWeight="bold" fill="#0f172a">3ml</text>

            {/* Rubber Plunger Gasket (Black Gasket Inside Barrel) */}
            <rect
              x="58"
              y="-6"
              width="7"
              height="12"
              rx="1"
              fill="#1e293b"
              stroke="#0f172a"
              strokeWidth="1"
            />

            {/* Finger Grip Flange at Barrel Base */}
            <rect
              x="76"
              y="-13"
              width="4"
              height="26"
              rx="1.5"
              fill="rgba(241, 245, 249, 0.95)"
              stroke="#475569"
              strokeWidth="1.5"
            />
          </g>

          {/* 4. Movable Plunger Rod & Push Plate */}
          <g ref={plungerRef} transform="rotate(45 0 0)">
            {/* Plunger Shaft */}
            <rect
              x="65"
              y="-2.5"
              width="32"
              height="5"
              fill="#e2e8f0"
              stroke="#64748b"
              strokeWidth="1"
            />
            {/* Plunger Push Top Button */}
            <rect
              x="97"
              y="-10"
              width="4"
              height="20"
              rx="1.5"
              fill="#86a57d"
              stroke="#54734b"
              strokeWidth="1.5"
            />
          </g>

          {/* Gradient Definition for Anesthetic Liquid */}
          <defs>
            <linearGradient id="liquid-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#86a57d" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#54734b" stopOpacity="0.4" />
            </linearGradient>
          </defs>
        </svg>

        {/* Small Active Point Marker */}
        <div
          className={`absolute -top-1 -left-1 w-2 h-2 rounded-full transition-colors duration-200 ${
            isClicking
              ? 'bg-sky-400 scale-125'
              : isHovered
              ? 'bg-cyan-400 animate-ping'
              : 'bg-cyan-500/60'
          }`}
        />
      </div>
    </div>
  );
}
