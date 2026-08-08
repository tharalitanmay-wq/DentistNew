'use client';

import React, { useState } from 'react';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import { Sparkles, Star, Zap, CheckCircle2, ArrowRight, Activity, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Cavity Restoration', 'Alignment & Braces', 'Veneers', 'Whitening'];

  const cavityBefore    = '/images/transformations/before-cavity.png?v=4';
  const cavityAfter     = '/images/transformations/after-cavity.png?v=4';
  const alignBefore     = '/images/transformations/before-alignment.png?v=4';
  const alignAfter      = '/images/transformations/after-alignment.png?v=4';
  const veneersBefore   = '/images/transformations/before-veneers.png?v=4';
  const veneersAfter    = '/images/transformations/after-veneers.png?v=4';
  const whitBefore      = '/images/transformations/before-whitening.png?v=4';
  const whitAfter       = '/images/transformations/after-whitening.png?v=4';

  const showAll         = activeCategory === 'All';
  const showCavity      = showAll || activeCategory === 'Cavity Restoration';
  const showAlignment   = showAll || activeCategory === 'Alignment & Braces';
  const showVeneers     = showAll || activeCategory === 'Veneers';
  const showWhitening   = showAll || activeCategory === 'Whitening';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-navy-800 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Clinical &amp; Aesthetic Case Studies</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white">Before &amp; After Gallery</h1>
        <p className="text-sm text-slate-300">Explore verified clinical transformations — from severe cavity restorations to invisible aligners and smile makeovers.</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all border ${
              activeCategory === cat
                ? 'bg-cyan-500 text-white border-cyan-400 shadow-md shadow-cyan-500/30'
                : 'bg-white text-slate-700 border-slate-200 hover:border-cyan-400 hover:text-cyan-600 shadow-sm'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── CASE 1: CAVITY & DECAY RESTORATION ── */}
      {showCavity && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
          <div className="lg:col-span-3 space-y-3">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-[10px] font-bold uppercase tracking-widest">
                <ShieldAlert className="w-3 h-3" /> Tooth Disease Treatment
              </span>
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Cavity &amp; Caries Repair</span>
            </div>
            <BeforeAfterSlider
              beforeImage={cavityBefore}
              afterImage={cavityAfter}
              title="Composite Cavity Restoration"
              subtitle="Elimination of severe dental caries and structural reconstruction with tooth-colored composite porcelain."
            />
          </div>

          <div className="lg:col-span-2 glass-card rounded-2xl border border-white/10 p-6 space-y-5 self-start">
            <div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-rose-400 block mb-1">Clinical Disease Protocol</span>
              <h3 className="text-xl font-serif font-bold text-white">Tooth Decay &amp; Cavity Repair</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Painless removal of deep enamel decay, sterilization, and microscopic filling matching natural tooth shade.
              </p>
            </div>
            <ul className="space-y-2">
              {['Painless Laser Cavity Excavation', 'Biocompatible Resin Composite', 'Shade-Matched Natural Finish', 'Prevents Root Canal & Tooth Loss'].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block">Starting from</span>
                <span className="text-2xl font-extrabold text-white">₹1,999</span>
              </div>
              <Link
                href="/appointment?service=Cavity+Restoration"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold text-xs hover:brightness-110 transition-all shadow-lg shadow-rose-500/25"
              >
                Book Treatment <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ── CASE 2: ORTHODONTIC ALIGNMENT & BRACES ── */}
      {showAlignment && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
          <div className="lg:col-span-3 space-y-3">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase tracking-widest">
                <Activity className="w-3 h-3" /> Orthodontic Alignment
              </span>
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Crooked Teeth &amp; Gaps</span>
            </div>
            <BeforeAfterSlider
              beforeImage={alignBefore}
              afterImage={alignAfter}
              title="Clear Aligner Correction"
              subtitle="Correction of severe dental crowding and arch irregularity using 3D digital clear aligners."
            />
          </div>

          <div className="lg:col-span-2 glass-card rounded-2xl border border-white/10 p-6 space-y-5 self-start">
            <div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-emerald-400 block mb-1">Orthodontic Plan</span>
              <h3 className="text-xl font-serif font-bold text-white">Clear Aligners &amp; Braces</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Invisible aligners tailored to correct bite malocclusion, tooth overlap, and gapped smile alignment.
              </p>
            </div>
            <ul className="space-y-2">
              {['Computer 3D Tooth Movement Scan', 'Removable & Virtually Invisible', 'Fixes Overbite, Underbite & Gaps', 'No Metal Wires or Bracket Pain'].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block">Starting from</span>
                <span className="text-2xl font-extrabold text-white">₹24,999</span>
              </div>
              <Link
                href="/appointment?service=Orthodontics"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-white font-bold text-xs hover:brightness-110 transition-all shadow-lg shadow-emerald-500/25"
              >
                Get Consultation <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ── CASE 3: COSMETIC PORCELAIN VENEERS ── */}
      {showVeneers && (
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-bold uppercase tracking-widest">
              <Star className="w-3 h-3 fill-current" /> Smile Redesign
            </span>
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Cosmetic Veneers</span>
          </div>
          <BeforeAfterSlider
            beforeImage={veneersBefore}
            afterImage={veneersAfter}
            title="10 Upper Porcelain Veneers"
            subtitle="Complete shade BL1 bleach transformation resolving enamel wear, chipping, and discolored teeth."
          />
        </div>
      )}

      {/* ── CASE 4: LASER TEETH WHITENING ── */}
      {showWhitening && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
          <div className="lg:col-span-3 space-y-3">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold uppercase tracking-widest">
                <Zap className="w-3 h-3" /> Express Whitening
              </span>
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Laser Whitening</span>
            </div>
            <BeforeAfterSlider
              beforeImage={whitBefore}
              afterImage={whitAfter}
              title="Laser Teeth Whitening"
              subtitle="8-shade brighter smile in a single 45-minute in-office session."
            />
          </div>

          <div className="lg:col-span-2 glass-card rounded-2xl border border-white/10 p-6 space-y-5 self-start">
            <div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-cyan-400 block mb-1">Treatment Highlights</span>
              <h3 className="text-xl font-serif font-bold text-white">Laser Teeth Whitening</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                A single in-office session using the Philips Zoom! laser system, delivering dramatic results with zero sensitivity.
              </p>
            </div>
            <ul className="space-y-2">
              {['Philips Zoom! Laser System', '8 Shades Brighter in 45 min', 'Zero Sensitivity Protocol', 'Enamel Gloss Seal Finish'].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block">Starting from</span>
                <span className="text-2xl font-extrabold text-white">₹4,999</span>
              </div>
              <Link
                href="/appointment?service=Laser+Teeth+Whitening"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-400 text-white font-bold text-xs hover:brightness-110 transition-all shadow-lg shadow-cyan-500/25"
              >
                Book Now <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}


