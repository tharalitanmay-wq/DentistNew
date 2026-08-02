'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export interface ToothCardProps {
  title: string;
  desc: string;
  price: string;
  tag: string;
  img: string;
  appointmentUrl?: string;
  className?: string;
}

export default function ToothCard({
  title,
  desc,
  price,
  tag,
  img,
  appointmentUrl,
  className = ''
}: ToothCardProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const href = appointmentUrl || `/appointment?service=${encodeURIComponent(title)}`;

  // SVG Tooth path matching user reference image
  const toothPath100 = "M 32,6 C 42,6 45,14 50,14 C 55,14 58,6 68,6 C 85,6 94,18 90,38 C 86,58 76,64 74,74 C 72,84 68,96 62,96 C 57,96 55,84 52,70 C 51,60 49,60 48,70 C 45,84 43,96 38,96 C 32,96 28,84 26,74 C 24,64 14,58 10,38 C 6,18 15,6 32,6 Z";
  const toothPathBBox = "M 0.32,0.06 C 0.42,0.06 0.45,0.14 0.50,0.14 C 0.55,0.14 0.58,0.06 0.68,0.06 C 0.85,0.06 0.94,0.18 0.90,0.38 C 0.86,0.58 0.76,0.64 0.74,0.74 C 0.72,0.84 0.68,0.96 0.62,0.96 C 0.57,0.96 0.55,0.84 0.52,0.70 C 0.51,0.60 0.49,0.60 0.48,0.70 C 0.45,0.84 0.43,0.96 0.38,0.96 C 0.32,0.96 0.28,0.84 0.26,0.74 C 0.24,0.64 0.14,0.58 0.10,0.38 C 0.06,0.18 0.15,0.06 0.32,0.06 Z";

  return (
    <div className={`relative group w-full flex flex-col items-center select-none ${className}`}>
      {/* Hidden SVG Definition for Tooth Clip Path */}
      <svg width="0" height="0" className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <clipPath id="tooth-exact-clip" clipPathUnits="objectBoundingBox">
            <path d={toothPathBBox} />
          </clipPath>
        </defs>
      </svg>

      {/* Main Outer Container with Drop Shadow */}
      <div className="relative w-full h-[530px] transition-all duration-500 hover:-translate-y-2.5 filter drop-shadow-xl hover:drop-shadow-[0_20px_30px_rgba(6,182,212,0.25)]">

        {/* Tooth SVG Outline Border matching exact reference contour */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible"
        >
          {/* Outer Glow Outline */}
          <path
            d={toothPath100}
            fill="none"
            stroke={isLight ? 'rgba(6, 182, 212, 0.45)' : 'rgba(56, 189, 248, 0.65)'}
            strokeWidth="4"
            vectorEffect="non-scaling-stroke"
            className="filter drop-shadow-[0_0_15px_rgba(6,182,212,0.6)] group-hover:stroke-cyan-400 transition-colors duration-500"
          />
          {/* Inner Crisp Stroke */}
          <path
            d={toothPath100}
            fill="none"
            stroke={isLight ? '#0891b2' : '#38bdf8'}
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            className="opacity-90 group-hover:opacity-100 transition-opacity"
          />
        </svg>

        {/* Clipped Tooth Content Container */}
        <div
          style={{ clipPath: 'url(#tooth-exact-clip)' }}
          className={`w-full h-full flex flex-col relative z-10 transition-colors duration-500 ${
            isLight
              ? 'bg-gradient-to-b from-cyan-50/95 via-white to-slate-100'
              : 'bg-gradient-to-b from-navy-900/95 via-navy-950 to-slate-950'
          }`}
        >
          {/* Top Crown Image Container */}
          <div className="relative h-56 w-full overflow-hidden shrink-0">
            <img
              src={img}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-95 group-hover:brightness-105"
            />
            <div className={`absolute inset-0 ${
              isLight
                ? 'bg-gradient-to-t from-white via-white/40 to-transparent'
                : 'bg-gradient-to-t from-navy-950 via-navy-950/50 to-transparent'
            }`} />

            {/* Tag Badge */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 z-10">
              <span className="bg-cyan-500/90 dark:bg-cyan-600/90 text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-md border border-white/20 backdrop-blur-md flex items-center gap-1 whitespace-nowrap">
                <Sparkles className="w-3 h-3 text-cyan-200" />
                {tag}
              </span>
            </div>
          </div>

          {/* Middle Body Content */}
          <div className="flex-1 px-8 pt-2 pb-16 flex flex-col justify-between text-center items-center">
            <div className="space-y-2 max-w-[82%]">
              <h3 className={`text-base sm:text-lg font-bold font-serif leading-snug transition-colors ${
                isLight ? 'text-slate-900 group-hover:text-cyan-700' : 'text-white group-hover:text-cyan-300'
              }`}>
                {title}
              </h3>
              <p className={`text-xs leading-relaxed line-clamp-3 ${
                isLight ? 'text-slate-600' : 'text-slate-300'
              }`}>
                {desc}
              </p>
            </div>

            {/* Bottom Root Area (Price + CTA Button) */}
            <div className="w-full space-y-2 pt-2 border-t border-cyan-500/20 max-w-[76%] flex flex-col items-center">
              <span className="text-xs font-extrabold tracking-wide text-cyan-600 dark:text-cyan-400">
                {price}
              </span>

              <Link
                href={href}
                className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-cyan-500/30 hover:scale-105 active:scale-95"
              >
                <span>Book Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Tooth Root Base Indicator Accent */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[8px] font-bold text-cyan-500/80 dark:text-cyan-400/80 uppercase tracking-widest pointer-events-none z-30">
          🦷 Lumina Tooth
        </div>
      </div>
    </div>
  );
}
