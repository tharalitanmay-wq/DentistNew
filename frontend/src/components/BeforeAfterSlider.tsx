'use client';

import React, { useState } from 'react';
import { Sparkles, MoveHorizontal } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface BeforeAfterProps {
  beforeImage: string;
  afterImage: string;
  title: string;
  subtitle: string;
}

export default function BeforeAfterSlider({
  beforeImage = 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1200',
  afterImage = 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=1200',
  title = 'Smile Transformation',
  subtitle = 'Drag slider to reveal 10 Upper Porcelain Veneers result'
}: BeforeAfterProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [sliderPos, setSliderPos] = useState(50);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pos = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pos);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const pos = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pos);
  };

  return (
    <div className={`relative w-full max-w-4xl mx-auto rounded-3xl overflow-hidden glass-card p-2 border shadow-2xl ${
      isLight ? 'bg-white border-slate-200 shadow-slate-200/50' : 'border-white/15'
    }`}>
      <div className="text-center py-4 px-6">
        <h3 className={`text-xl md:text-2xl font-serif font-bold flex items-center justify-center space-x-2 ${
          isLight ? 'text-slate-900' : 'text-white'
        }`}>
          <Sparkles className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
          <span>{title}</span>
        </h3>
        <p className={`text-xs mt-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>{subtitle}</p>
      </div>

      <div
        className="relative h-[320px] sm:h-[420px] md:h-[500px] w-full select-none cursor-ew-resize overflow-hidden rounded-2xl"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* AFTER IMAGE (Background) */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src={afterImage}
            alt="After Smile Transformation"
            className="w-full h-full object-cover"
          />
          <span className="absolute top-4 right-4 bg-cyan-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
            After Transformation
          </span>
        </div>

        {/* BEFORE IMAGE (Clipped Foreground) */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-white shadow-2xl"
          style={{ width: `${sliderPos}%` }}
        >
          <img
            src={beforeImage}
            alt="Before Smile Transformation"
            className="absolute inset-0 w-full h-full object-cover max-w-none"
            style={{ width: '100%', height: '100%' }}
          />
          <span className="absolute top-4 left-4 bg-slate-900/90 text-slate-100 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg border border-white/10">
            Before Treatment
          </span>
        </div>

        {/* SLIDER HANDLE */}
        <div
          className="absolute inset-y-0 w-1 bg-gradient-to-b from-cyan-400 via-white to-cyan-400 cursor-ew-resize pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-cyan-500 text-white flex items-center justify-center shadow-xl border-2 border-white">
            <MoveHorizontal className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
}
