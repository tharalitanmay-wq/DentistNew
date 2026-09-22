'use client';

import React, { useState } from 'react';
import { Sparkles, MoveHorizontal, Columns, Sliders, CheckCircle2 } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface TransformationItem {
  id: string;
  title: string;
  subtitle: string;
  before: string;
  after: string;
  details: string[];
}

const PRESET_TRANSFORMATIONS: TransformationItem[] = [
  {
    id: 'veneers',
    title: '10 Upper Porcelain Veneers',
    subtitle: 'Full shade BL1 bleach transformation resolving discolored, uneven teeth',
    before: '/images/transformations/before-veneers.png?v=5',
    after: '/images/transformations/after-veneers.png?v=5',
    details: ['E.max Porcelain Veneers', 'Shade BL1 Bright White', 'Symmetrical Arch Alignment']
  },
  {
    id: 'whitening',
    title: 'Laser Teeth Whitening',
    subtitle: '8 shades brighter in a single 45-minute in-office treatment',
    before: '/images/transformations/before-whitening.png?v=5',
    after: '/images/transformations/after-whitening.png?v=5',
    details: ['Philips Zoom! Laser', 'Zero Sensitivity Protocol', 'Enamel Gloss Seal']
  }
];

interface BeforeAfterProps {
  beforeImage?: string;
  afterImage?: string;
  title?: string;
  subtitle?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  title,
  subtitle
}: BeforeAfterProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [activePresetIndex, setActivePresetIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'slider' | 'side-by-side'>('slider');
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const activePreset = PRESET_TRANSFORMATIONS[activePresetIndex];
  const currentBefore = beforeImage || activePreset.before;
  const currentAfter = afterImage || activePreset.after;
  const currentTitle = title || activePreset.title;
  const currentSubtitle = subtitle || activePreset.subtitle;

  const updateSliderPosition = (clientX: number, target: HTMLDivElement) => {
    const rect = target.getBoundingClientRect();
    const x = clientX - rect.left;
    const pos = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pos);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    updateSliderPosition(e.clientX, e.currentTarget);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    updateSliderPosition(e.touches[0].clientX, e.currentTarget);
  };

  return (
    <div className={`relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden glass-card p-3 sm:p-4 border shadow-xl transition-all ${
      isLight ? 'bg-white/90 border-slate-200 shadow-slate-200/50' : 'bg-slate-900/80 border-white/15 shadow-black/40'
    }`}>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-white/10 mb-3">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-amber-600 dark:text-yellow-400 text-[10px] font-bold uppercase tracking-widest mb-0.5">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>Real Patient Transformations</span>
          </div>
          <h3 className={`text-base sm:text-lg font-serif font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
            {currentTitle}
          </h3>
          <p className={`text-[11px] mt-0.5 max-w-xl ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            {currentSubtitle}
          </p>
        </div>

        {/* View Mode Controls (Slider vs Side-by-Side) */}
        <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl border border-slate-200 dark:border-white/10 self-start md:self-center">
          <button
            onClick={() => setViewMode('slider')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'slider'
                ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 shadow-md shadow-amber-400/20'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Slider View</span>
          </button>
          <button
            onClick={() => setViewMode('side-by-side')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'side-by-side'
                ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 shadow-md shadow-amber-400/20'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            <span>Side-by-Side</span>
          </button>
        </div>
      </div>

      {/* Treatment Case Selection Tabs */}
      {!beforeImage && (
        <div className="flex flex-wrap gap-2 mb-6">
          {PRESET_TRANSFORMATIONS.map((preset, idx) => (
            <button
              key={preset.id}
              onClick={() => setActivePresetIndex(idx)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                activePresetIndex === idx
                  ? 'bg-amber-400/10 border-amber-400 text-amber-600 dark:text-yellow-400'
                  : 'bg-transparent border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-amber-400/50'
              }`}
            >
              {preset.title}
            </button>
          ))}
        </div>
      )}

      {/* Main Image Showcase */}
      {viewMode === 'slider' ? (
        /* INTERACTIVE SLIDER VIEW */
        <div
          className="relative h-[160px] sm:h-[220px] md:h-[260px] w-full select-none cursor-ew-resize overflow-hidden rounded-xl border border-slate-200 dark:border-white/10 shadow-inner group"
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
        >
          {/* AFTER IMAGE (Background) */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src={currentAfter}
              alt="After Treatment Smile Transformation"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute top-4 right-4 bg-amber-500 text-slate-950 text-[11px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg border border-white/20 flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-slate-950 animate-pulse"></span>
              <span>AFTER TREATMENT</span>
            </div>
          </div>

          {/* BEFORE IMAGE (Clipped Overlay - 1:1 Pixel Match) */}
          <div
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
          >
            <img
              src={currentBefore}
              alt="Before Treatment Smile"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute top-4 left-4 bg-slate-950/90 text-slate-100 text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg border border-white/20">
              BEFORE TREATMENT
            </div>
          </div>

          {/* SLIDER DIVIDER LINE & HANDLE */}
          <div
            className="absolute inset-y-0 w-0.5 bg-gradient-to-b from-yellow-300 via-white to-yellow-300 pointer-events-none shadow-[0_0_15px_rgba(250,204,21,0.8)]"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 flex items-center justify-center shadow-2xl border-2 border-white ring-4 ring-amber-400/30">
              <MoveHorizontal className="w-5 h-5 font-bold text-slate-950" />
            </div>
          </div>

          {/* Drag Instruction Banner */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-950/70 text-slate-200 text-xs px-4 py-1.5 rounded-full backdrop-blur-md border border-white/10 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
            Drag slider left or right to compare
          </div>
        </div>
      ) : (
        /* SIDE-BY-SIDE VIEW ("both aside") */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* BEFORE PHOTO */}
          <div className="relative h-[150px] sm:h-[200px] rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-lg group">
            <img
              src={currentBefore}
              alt="Before Treatment Smile"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4 bg-slate-950/90 text-slate-100 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider border border-white/20 shadow-md">
              BEFORE TREATMENT
            </div>
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/90 to-transparent p-4 text-white">
              <p className="text-xs font-medium text-slate-300">Initial Smile Condition</p>
            </div>
          </div>

          {/* AFTER PHOTO */}
          <div className="relative h-[150px] sm:h-[200px] rounded-xl overflow-hidden border border-amber-400/40 shadow-lg shadow-amber-400/10 group">
            <img
              src={currentAfter}
              alt="After Treatment Smile Transformation"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 text-xs font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md border border-white/20 flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-slate-950 animate-pulse"></span>
              <span>AFTER TRANSFORMATION</span>
            </div>
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/90 to-transparent p-4 text-white">
              <p className="text-xs font-medium text-amber-300">Final Clinical Result</p>
            </div>
          </div>
        </div>
      )}

      {/* Clinical Highlights / Details */}
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
        {activePreset.details.map((detail, i) => (
          <div
            key={i}
            className={`flex items-center space-x-2 p-3 rounded-xl border text-xs font-medium ${
              isLight
                ? 'bg-slate-50 border-slate-200 text-slate-700'
                : 'bg-slate-800/50 border-white/5 text-slate-300'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <span>{detail}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
