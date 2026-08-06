import React from 'react';

interface ToothIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export default function ToothIcon({ className = "w-6 h-6 text-cyan-600 dark:text-cyan-400", ...props }: ToothIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Scandinavian Continuous Line Art Tooth */}
      <path
        d="M 12 3.5 C 9.5 3.5 7.5 2 4.5 4 C 2.2 5.5 2.2 9.5 3.2 13 C 4.2 16.5 6 18.5 7.2 21 C 7.6 21.8 8.6 21.8 9 20.5 C 9.8 17.5 10.6 14.5 12 13.8 C 13.4 14.5 14.2 17.5 15 20.5 C 15.4 21.8 16.4 21.8 16.8 21 C 18 18.5 19.8 16.5 20.8 13 C 21.8 9.5 21.8 5.5 19.5 4 C 16.5 2 14.5 3.5 12 3.5 Z M 12 3.5 C 11.5 6.5 9.5 8.5 7.5 9.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}



