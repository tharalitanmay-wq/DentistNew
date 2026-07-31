'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ShieldCheck, Award, Heart, CheckCircle2, ArrowRight, Stethoscope } from 'lucide-react';
import ModelViewer from '@/components/ModelViewer';

export default function AboutPage() {
  const values = [
    { title: 'Bespoke Artistry', desc: 'Every veneer and crown is individually handcrafted to harmonize with your unique facial anatomy and skin tone.' },
    { title: 'Zero Anxiety Care', desc: 'State-of-the-art twilight IV sedation, noise-canceling headphones, and aromatherapy ensure total tranquility.' },
    { title: 'Clinical Precision', desc: 'Sub-millimeter 3D computer guidance ensures perfection, longevity, and biological integrity.' },
    { title: '5-Star Concierge', desc: 'Private consultation suites, flexible financing, and concierge transport assistance.' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20 relative overflow-hidden">

      {/* Background 3D Rotating Stethoscope Element */}
      <div className="absolute -top-10 right-0 w-[450px] h-[450px] opacity-30 pointer-events-none z-0 hidden lg:block">
        <ModelViewer
          width="100%"
          height="100%"
          autoRotate={true}
          autoRotateSpeed={0.5}
          enableManualRotation={true}
          showScreenshotButton={false}
        />
      </div>

      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto relative z-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-navy-800 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Heritage & Philosophy</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white">Redefining The Dental Experience</h1>
        <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
          Founded on Park Avenue, Lumina Dental Studio bridges the gap between high-fashion facial aesthetics and advanced surgical precision.
        </p>
      </div>

      {/* Hero Banner Grid with Interactive 3D Model Viewer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-10">
        <div className="space-y-6">
          <h2 className="text-3xl font-serif font-bold text-white">Where Clinical Innovation Meets Luxury Hospitality</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Dr. Evelyn Sterling established Lumina with a singular vision: to eliminate the cold, sterile environment of traditional dentistry and create a sanctuary of health, beauty, and relaxation.
          </p>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Our team of AACD-accredited specialists and Johns Hopkins-trained implant surgeons leverage 3D intraoral imaging, CAD/CAM ceramic milling, and pain-free lasers to craft long-lasting, luminous smiles.
          </p>

          <div className="pt-2 flex items-center space-x-6 text-xs text-slate-300">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              <span>AACD Accredited</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-cyan-400" />
              <span>Global Top 1% Specialists</span>
            </div>
          </div>
        </div>

        {/* 3D Stethoscope / Instrument Interactive Showcase Card */}
        <div className="relative rounded-3xl overflow-hidden glass-card border border-cyan-500/30 shadow-2xl p-4 flex flex-col items-center justify-center min-h-[380px]">
          <div className="absolute top-4 left-4 z-10 flex items-center space-x-2 bg-navy-900/80 px-3 py-1 rounded-full border border-cyan-500/30 text-xs font-bold text-cyan-400">
            <Stethoscope className="w-4 h-4 text-cyan-400" />
            <span>Interactive 3D Clinical Equipment</span>
          </div>

          <ModelViewer
            width="100%"
            height={320}
            autoRotate={true}
            autoRotateSpeed={0.4}
            enableManualRotation={true}
            enableMouseParallax={true}
            showScreenshotButton={false}
          />

          <span className="text-[10px] text-slate-400 tracking-wider uppercase font-semibold text-center mt-2">
            Drag to rotate 3D Stethoscope in real-time
          </span>
        </div>
      </div>

      {/* Values Grid */}
      <div className="space-y-8 relative z-10">
        <div className="text-center">
          <span className="text-xs uppercase font-bold tracking-widest text-cyan-400">Pillars of Excellence</span>
          <h2 className="text-3xl font-serif font-bold text-white mt-1">Our Core Values</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <div key={i} className="glass-card rounded-2xl p-6 border border-white/10 space-y-3 hover:border-cyan-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                0{i + 1}
              </div>
              <h4 className="text-base font-bold text-white">{v.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Virtual Tour Banner */}
      <div className="glass-card rounded-3xl p-8 md:p-12 border border-cyan-500/30 text-center space-y-6 relative overflow-hidden z-10">
        <h3 className="text-3xl font-serif font-bold text-white">Experience Our Park Avenue Studio</h3>
        <p className="text-xs text-slate-300 max-w-xl mx-auto">
          Equipped with private treatment suites, panoramic Manhattan views, and ambient light therapy.
        </p>
        <Link
          href="/appointment"
          className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan-400 to-sky-300 text-slate-950 font-bold text-xs uppercase tracking-wider hover:scale-105 transition-all shadow-lg shadow-cyan-500/25"
        >
          <span>Schedule Private Studio Visit</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
