import React from 'react';

interface ToothIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  sparkle?: boolean;
}

export default function ToothIcon({ className = "w-5 h-5 text-cyan-400", sparkle = true, ...props }: ToothIconProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Main Tooth Silhouette */}
      <path
        d="M 32,6 C 42,6 45,14 50,14 C 55,14 58,6 68,6 C 85,6 94,18 90,38 C 86,58 76,64 74,74 C 72,84 68,96 62,96 C 57,96 55,84 52,70 C 51,60 49,60 48,70 C 45,84 43,96 38,96 C 32,96 28,84 26,74 C 24,64 14,58 10,38 C 6,18 15,6 32,6 Z"
        fill="currentColor"
      />
      
      {/* Sparkle Accent on top right crown */}
      {sparkle && (
        <path
          d="M 72 16 C 72 20 74 22 78 22 C 74 22 72 24 72 28 C 72 24 70 22 66 22 C 70 22 72 20 72 16 Z"
          fill="#38bdf8"
        />
      )}
    </svg>
  );
}
