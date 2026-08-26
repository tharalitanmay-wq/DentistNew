'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';

export const HERO_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=2000',
    alt: 'Modern luxury dental clinic interior'
  },
  {
    url: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=2000',
    alt: '3D computer-guided dental implant treatment room'
  },
  {
    url: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=2000',
    alt: 'Bespoke porcelain veneer smile transformation studio'
  },
  {
    url: 'https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&q=80&w=2000',
    alt: 'Laser whitening luxury dental spa'
  },
  {
    url: 'https://images.unsplash.com/photo-1594824813566-78a9c30f40d2?auto=format&fit=crop&q=80&w=2000',
    alt: 'Radiant healthy aesthetic smile'
  },
  {
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=2000',
    alt: 'Serene dental consultation environment'
  }
];

export default function HeroBackgroundSlider() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [currentIndex, setCurrentIndex] = useState(0);

  // 1. Preload all background images to eliminate blank/flickering frames
  useEffect(() => {
    HERO_IMAGES.forEach((imgObj) => {
      const img = new Image();
      img.src = imgObj.url;
    });
  }, []);

  // 2. Continuous 5-second slideshow timer with automatic cleanup on unmount
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Slideshow Image Stack */}
      {HERO_IMAGES.map((image, idx) => {
        const isActive = idx === currentIndex;
        return (
          <div
            key={image.url}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={image.url}
              alt={image.alt}
              className={`w-full h-full object-cover object-center transition-transform duration-[6000ms] ease-out ${
                isActive ? 'scale-105 brightness-[1.02] contrast-[1.05]' : 'scale-100 brightness-100'
              }`}
              loading={idx === 0 ? 'eager' : 'lazy'}
            />
          </div>
        );
      })}

      {/* Consistent Subtle Vignette Overlay for Crisp Text Readability */}
      <div className={`absolute inset-0 z-20 transition-colors duration-500 ${
        isLight
          ? 'bg-gradient-to-b from-[#FAF7F2]/35 via-[#FAF7F2]/50 to-[#FAF7F2]'
          : 'bg-gradient-to-b from-navy-950/50 via-navy-950/70 to-navy-950'
      }`} />
      
      {/* Radial Ambient Glow */}
      <div className="absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
