import React from 'react';

interface ToothIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  sparkle?: boolean;
}

export default function ToothIcon({ className = "w-7 h-7 text-cyan-400", sparkle = true, ...props }: ToothIconProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <defs>
        <linearGradient id="tooth-gradient-vivid" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="50%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#0369a1" />
        </linearGradient>
        <filter id="tooth-glow-vivid" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#0284c7" floodOpacity="0.8" />
        </filter>
      </defs>

      {/* Main Vivid Tooth Silhouette with White Contrast Outline */}
      <path
        d="M 32,6 C 42,6 45,14 50,14 C 55,14 58,6 68,6 C 85,6 94,18 90,38 C 86,58 76,64 74,74 C 72,84 68,96 62,96 C 57,96 55,84 52,70 C 51,60 49,60 48,70 C 45,84 43,96 38,96 C 32,96 28,84 26,74 C 24,64 14,58 10,38 C 6,18 15,6 32,6 Z"
        fill="url(#tooth-gradient-vivid)"
        stroke="#ffffff"
        strokeWidth="2.5"
        filter="url(#tooth-glow-vivid)"
      />
      
      {/* Inner Crown Curve Accent */}
      <path
        d="M 35 24 C 45 18 55 18 65 24"
        stroke="#ffffff"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Bright Sparkle Star Accent */}
      {sparkle && (
        <path
          d="M 74 14 C 74 18 76 20 80 20 C 76 20 74 22 74 26 C 74 22 72 20 68 20 C 72 20 74 18 74 14 Z"
          fill="#ffffff"
        />
      )}
    </svg>
  );
}
