'use client';

import React, { useState } from 'react';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import { Sparkles, Star, Zap, CheckCircle2, ArrowRight, Activity, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';

export default function GalleryPage() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Cavity Restoration', 'Alignment & Braces', 'Veneers', 'Whitening'];

  const cavityBefore    = '/images/transformations/before-cavity.png?v=4';
  const cavityAfter     = '/images/transformations/after-cavity.png?v=4';
  const alignBefore     = '/images/transformations/before-alignment.png?v=4';
  const alignAfter      = '/images/transformations/after-alignment.png?v=4';
  const veneersBefore   = '/images/transformations/before-veneers.png?v=5';
  const veneersAfter    = '/images/transformations/after-veneers.png?v=5';
  const whitBefore      = '/images/transformations/before-whitening.png?v=5';
  const whitAfter       = '/images/transformations/after-whitening.png?v=5';

  const showAll         = activeCategory === 'All';
  const showCavity      = showAll || activeCategory === 'Cavity Restoration';
  const showAlignment   = showAll || activeCategory === 'Alignment & Braces';
  const showVeneers     = showAll || activeCategory === 'Veneers';
  const showWhitening   = showAll || activeCategory === 'Whitening';

  return (
    <div className={`min-h-screen pb-20 space-y-16 ${
      isLight ? 'bg-[#FAF7F2] text-slate-900' : 'bg-navy-950 text-white'
    }`}>

      {/* Header */}
      <section className={`pt-28 pb-12 px-4 sm:px-6 lg:px-8 border-b ${
        isLight ? 'bg-gradient-to-b from-white to-[#FAF7F2] border-amber-900/10' : 'bg-navy-900/60 border-white/10'
      }`}>
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className={`inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider ${
            isLight ? 'bg-amber-100/60 border-amber-300 text-[#7A2818]' : 'bg-navy-800 border-amber-500/30 text-amber-300'
          }`}>
            <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>Clinical &amp; Aesthetic Case Studies</span>
          </div>

          <h1 className={`text-4xl sm:text-6xl font-serif font-bold ${
            isLight ? 'text-[#7A2818]' : 'text-amber-200'
          }`}>
            Before &amp; After Gallery
          </h1>

          <p className={`text-sm sm:text-base font-serif leading-relaxed ${
            isLight ? 'text-slate-700' : 'text-slate-300'
          }`}>
            Explore verified clinical transformations — from cavity restorations to clear aligners and porcelain smile makeovers.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* High Visibility Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-xs font-serif font-bold transition-all shadow-md transform hover:scale-105 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#B38F48] text-[#2B2110] border border-amber-300/40'
                    : isLight
                      ? 'bg-white border border-amber-900/15 text-slate-800 hover:border-amber-500'
                      : 'bg-navy-900 border border-white/15 text-slate-200 hover:border-amber-400'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* ── CASE 1: CAVITY RESTORATION ── */}
        {showCavity && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            <div className="lg:col-span-3 space-y-3">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-[10px] font-bold uppercase tracking-widest">
                  <ShieldAlert className="w-3.5 h-3.5" /> Tooth Disease Treatment
                </span>
                <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Cavity &amp; Caries Repair</span>
              </div>
              <BeforeAfterSlider
                beforeImage={cavityBefore}
                afterImage={cavityAfter}
                title="Composite Cavity Restoration"
                subtitle="Elimination of severe dental caries and structural reconstruction with tooth-colored composite porcelain."
              />
            </div>

            <div className={`lg:col-span-2 rounded-3xl border p-6 sm:p-8 space-y-6 self-start shadow-xl ${
              isLight ? 'bg-white border-amber-900/10' : 'bg-navy-900/80 border-white/10'
            }`}>
              <div>
                <span className="text-[10px] uppercase tracking-widest font-bold text-rose-600 dark:text-rose-400 block mb-1">
                  Clinical Disease Protocol
                </span>
                <h3 className={`text-xl font-serif font-bold ${isLight ? 'text-[#7A2818]' : 'text-white'}`}>
                  Tooth Decay &amp; Cavity Repair
                </h3>
                <p className={`text-xs mt-1 leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                  Painless removal of deep enamel decay, sterilization, and microscopic filling matching natural tooth shade.
                </p>
              </div>

              <ul className="space-y-2.5">
                {['Painless Laser Cavity Excavation', 'Biocompatible Resin Composite', 'Shade-Matched Natural Finish', 'Prevents Root Canal & Tooth Loss'].map((item, i) => (
                  <li key={i} className={`flex items-center gap-2 text-xs ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className={`pt-4 border-t flex items-center justify-between gap-4 ${isLight ? 'border-amber-900/10' : 'border-white/10'}`}>
                <div>
                  <span className={`text-[10px] block ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Starting from</span>
                  <span className={`text-2xl font-serif font-bold ${isLight ? 'text-[#7A2818]' : 'text-white'}`}>$150</span>
                </div>
                
                {/* High Visibility Action Button */}
                <Link
                  href="/appointment?service=Cavity+Restoration"
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#B38F48] hover:from-[#B38F48] hover:to-[#C5A059] text-[#2B2110] font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg transform hover:scale-105 border border-amber-300/40"
                >
                  <span>Book Treatment</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ── CASE 2: ORTHODONTIC ALIGNMENT ── */}
        {showAlignment && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start pt-6">
            <div className="lg:col-span-3 space-y-3">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-widest">
                  <Activity className="w-3.5 h-3.5" /> Orthodontic Alignment
                </span>
                <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Crooked Teeth &amp; Gaps</span>
              </div>
              <BeforeAfterSlider
                beforeImage={alignBefore}
                afterImage={alignAfter}
                title="Clear Aligner Correction"
                subtitle="Correction of severe dental crowding and arch irregularity using 3D digital clear aligners."
              />
            </div>

            <div className={`lg:col-span-2 rounded-3xl border p-6 sm:p-8 space-y-6 self-start shadow-xl ${
              isLight ? 'bg-white border-amber-900/10' : 'bg-navy-900/80 border-white/10'
            }`}>
              <div>
                <span className="text-[10px] uppercase tracking-widest font-bold text-emerald-600 dark:text-emerald-400 block mb-1">
                  Orthodontic Plan
                </span>
                <h3 className={`text-xl font-serif font-bold ${isLight ? 'text-[#7A2818]' : 'text-white'}`}>
                  Clear Aligners &amp; Braces
                </h3>
                <p className={`text-xs mt-1 leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                  Invisible aligners tailored to correct bite malocclusion, tooth overlap, and gapped smile alignment.
                </p>
              </div>

              <ul className="space-y-2.5">
                {['Computer 3D Tooth Movement Scan', 'Removable & Virtually Invisible', 'Fixes Overbite, Underbite & Gaps', 'No Metal Wires or Bracket Pain'].map((item, i) => (
                  <li key={i} className={`flex items-center gap-2 text-xs ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className={`pt-4 border-t flex items-center justify-between gap-4 ${isLight ? 'border-amber-900/10' : 'border-white/10'}`}>
                <div>
                  <span className={`text-[10px] block ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Starting from</span>
                  <span className={`text-2xl font-serif font-bold ${isLight ? 'text-[#7A2818]' : 'text-white'}`}>$3,500</span>
                </div>
                
                {/* High Visibility Action Button */}
                <Link
                  href="/appointment?service=Orthodontics"
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#B38F48] hover:from-[#B38F48] hover:to-[#C5A059] text-[#2B2110] font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg transform hover:scale-105 border border-amber-300/40"
                >
                  <span>Get Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ── CASE 3: COSMETIC VENEERS ── */}
        {showVeneers && (
          <div className="space-y-3 pt-6">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-[10px] font-bold uppercase tracking-widest">
                <Star className="w-3.5 h-3.5 fill-current" /> Smile Redesign
              </span>
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Cosmetic Veneers</span>
            </div>
            <BeforeAfterSlider
              beforeImage={veneersBefore}
              afterImage={veneersAfter}
              title="10 Upper Porcelain Veneers"
              subtitle="Complete shade BL1 bleach transformation resolving enamel wear, chipping, and discolored teeth."
            />
          </div>
        )}

        {/* ── CASE 4: WHITENING ── */}
        {showWhitening && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start pt-6">
            <div className="lg:col-span-3 space-y-3">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-[10px] font-bold uppercase tracking-widest">
                  <Zap className="w-3.5 h-3.5" /> Express Whitening
                </span>
                <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Laser Whitening</span>
              </div>
              <BeforeAfterSlider
                beforeImage={whitBefore}
                afterImage={whitAfter}
                title="Laser Teeth Whitening"
                subtitle="8-shade brighter smile in a single 45-minute in-office session."
              />
            </div>

            <div className={`lg:col-span-2 rounded-3xl border p-6 sm:p-8 space-y-6 self-start shadow-xl ${
              isLight ? 'bg-white border-amber-900/10' : 'bg-navy-900/80 border-white/10'
            }`}>
              <div>
                <span className="text-[10px] uppercase tracking-widest font-bold text-amber-700 dark:text-amber-400 block mb-1">
                  Treatment Highlights
                </span>
                <h3 className={`text-xl font-serif font-bold ${isLight ? 'text-[#7A2818]' : 'text-white'}`}>
                  Laser Teeth Whitening Spa
                </h3>
                <p className={`text-xs mt-1 leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                  A single in-office session using cold laser whitening, delivering dramatic brightening with zero tooth sensitivity.
                </p>
              </div>

              <div className={`pt-4 border-t flex items-center justify-between gap-4 ${isLight ? 'border-amber-900/10' : 'border-white/10'}`}>
                <div>
                  <span className={`text-[10px] block ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Starting from</span>
                  <span className={`text-2xl font-serif font-bold ${isLight ? 'text-[#7A2818]' : 'text-white'}`}>$450</span>
                </div>
                
                {/* High Visibility Action Button */}
                <Link
                  href="/appointment?service=Laser+Whitening"
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#B38F48] hover:from-[#B38F48] hover:to-[#C5A059] text-[#2B2110] font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg transform hover:scale-105 border border-amber-300/40"
                >
                  <span>Book Whitening</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
