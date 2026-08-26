'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sparkles, ShieldCheck, Award, ArrowRight,
  Users, Star, CalendarCheck, Microscope,
  Zap, Heart, Smile, BadgeCheck, CheckCircle2, Clock, MapPin
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function AboutPage() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const values = [
    { icon: Smile,       title: 'Bespoke Artistry',     desc: 'Every veneer and crown is individually handcrafted to harmonise with your unique facial anatomy and smile aesthetics.' },
    { icon: Heart,       title: 'Zero Anxiety Care',    desc: 'Pain-free laser treatments, cold-laser anesthesia, and soothing serene environments for total patient comfort.' },
    { icon: Microscope,  title: 'Clinical Precision',   desc: 'Sub-millimetre 3D computer guidance ensures longevity, natural harmony, and biological integrity in every procedure.' },
    { icon: BadgeCheck,  title: '5-Star Concierge',     desc: 'Private consultation suites, flexible 0% APR financing, and dedicated care coordinators at every step.' },
  ];

  const stats = [
    { value: '12,000+', label: 'Smiles Transformed', icon: Users },
    { value: '4.9 ★',   label: 'Google Rating (480+)', icon: Star },
    { value: '18 Yrs',  label: 'Clinical Excellence', icon: Award },
    { value: '99.8%',   label: 'Patient Satisfaction', icon: CalendarCheck },
  ];

  const technologies = [
    { name: 'CBCT 3D X-Ray Imaging',   desc: 'Ultra-low radiation 3D bone and nerve structure visualization for safe implants.' },
    { name: 'CAD/CAM Ceramic Milling', desc: 'Same-day precision field-spat ceramic veneers and crowns crafted in-house.' },
    { name: 'Diode Laser Therapy',     desc: 'Needle-free, drill-free laser gum sculpting and cavity preparation.' },
    { name: 'iTero 5D Intraoral Scanner', desc: 'Mess-free digital 3D scans capturing 100,000 data points in under 60 seconds.' },
  ];

  const accreditations = [
    'IDA & MCI Accredited Specialists',
    'American Academy of Cosmetic Dentistry (AACD)',
    'ISO 9001:2015 Certified Sterilization Facility',
    'Invisalign Diamond Plus Provider 2026',
  ];

  return (
    <div className={`min-h-screen pb-20 space-y-16 sm:space-y-24 ${
      isLight ? 'bg-[#FAF7F2] text-slate-900' : 'bg-navy-950 text-white'
    }`}>

      {/* 1. Clear Header Hero Section */}
      <section className={`relative pt-28 pb-16 px-4 sm:px-6 lg:px-8 border-b ${
        isLight ? 'bg-gradient-to-b from-white via-[#FAF7F2] to-[#FAF7F2] border-amber-900/10' : 'bg-navy-900/60 border-white/10'
      }`}>
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className={`inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider ${
            isLight ? 'bg-amber-100/60 border-amber-300 text-[#7A2818]' : 'bg-navy-800 border-amber-500/30 text-amber-300'
          }`}>
            <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>Our Heritage &amp; Philosophy</span>
          </div>

          <h1 className={`text-4xl sm:text-6xl font-serif font-bold tracking-tight leading-tight ${
            isLight ? 'text-[#7A2818]' : 'text-amber-200'
          }`}>
            Redefining Luxury Dentistry
          </h1>

          <p className={`text-base sm:text-lg max-w-2xl mx-auto font-serif leading-relaxed ${
            isLight ? 'text-slate-700' : 'text-slate-300'
          }`}>
            Founded on the principles of surgical precision, bespoke aesthetics, and patient comfort, Pearl Dental Studio bridges clinical mastery with 5-star concierge care.
          </p>
        </div>
      </section>

      {/* 2. Story + Clinic Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Story Text */}
          <div className="space-y-6">
            <span className="text-xs uppercase font-serif font-bold tracking-[0.25em] text-[#C5A059] dark:text-amber-400">
              Who We Are
            </span>
            <h2 className={`text-3xl sm:text-4xl font-serif font-bold ${
              isLight ? 'text-[#7A2818]' : 'text-white'
            }`}>
              Where Innovation Meets Compassion
            </h2>

            <p className={`text-sm sm:text-base leading-relaxed ${
              isLight ? 'text-slate-700' : 'text-slate-300'
            }`}>
              Dr. Ananya Sharma founded Pearl Dental Studio with a singular vision — to eliminate dental anxiety and provide a peaceful sanctuary where patients receive life-changing aesthetic transformations.
            </p>

            <p className={`text-sm sm:text-base leading-relaxed ${
              isLight ? 'text-slate-700' : 'text-slate-300'
            }`}>
              Our team of MDS-qualified master specialists, trained at premier global institutions including AIIMS and Harvard AACD fellowships, utilize state-of-the-art 3D intraoral scanners, computer-guided implant systems, and drill-free lasers to deliver radiant, lasting smiles.
            </p>

            {/* Accreditations List */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {accreditations.map((acc, idx) => (
                <div key={idx} className={`flex items-center space-x-2 p-2.5 rounded-xl border ${
                  isLight ? 'bg-white border-amber-900/10 text-slate-800' : 'bg-navy-900/80 border-white/5 text-slate-200'
                }`}>
                  <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span className="font-medium">{acc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Image Showcase */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-amber-900/10 dark:border-white/10 group">
            <img
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1000"
              alt="Pearl Dental Clinic Environment"
              className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/90 dark:bg-navy-900/90 backdrop-blur-md border border-white/20 text-xs flex justify-between items-center">
              <div>
                <span className="font-serif font-bold text-slate-900 dark:text-white block text-sm">Park Avenue Studio</span>
                <span className="text-slate-600 dark:text-slate-400 text-[11px]">Private Consultation &amp; 3D Imaging Suites</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold text-[10px] uppercase">
                5-Star Facility
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Key Statistics Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`rounded-3xl p-8 md:p-12 border shadow-xl ${
          isLight ? 'bg-white border-amber-900/10' : 'bg-navy-900/80 border-white/10'
        }`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-amber-900/10 dark:divide-white/10">
            {stats.map((s, i) => (
              <div key={i} className={`flex flex-col items-center justify-center text-center space-y-2 ${i !== 0 ? 'pt-6 md:pt-0' : ''}`}>
                <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  <s.icon className="w-6 h-6" />
                </div>
                <span className={`text-3xl sm:text-4xl font-serif font-bold ${
                  isLight ? 'text-[#7A2818]' : 'text-amber-200'
                }`}>
                  {s.value}
                </span>
                <span className={`text-xs uppercase font-bold tracking-wider ${
                  isLight ? 'text-slate-600' : 'text-slate-400'
                }`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Core Pillars of Excellence */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <span className="text-xs uppercase font-serif font-bold tracking-[0.25em] text-[#C5A059] dark:text-amber-400">
            Our Commitment
          </span>
          <h2 className={`text-3xl sm:text-4xl font-serif font-bold ${
            isLight ? 'text-[#7A2818]' : 'text-white'
          }`}>
            Pillars of Excellence
          </h2>
          <p className={`text-sm ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Built upon uncompromising quality standards, patient safety, and artistic dental perfection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <div
              key={i}
              className={`rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 space-y-4 shadow-sm ${
                isLight
                  ? 'bg-white border-amber-900/10 hover:border-amber-500/50 hover:shadow-md'
                  : 'bg-navy-900/60 border-white/10 hover:border-amber-400/40'
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 text-white flex items-center justify-center shadow-md">
                <v.icon className="w-6 h-6" />
              </div>
              <h3 className={`text-lg font-serif font-bold ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                {v.title}
              </h3>
              <p className={`text-xs leading-relaxed ${
                isLight ? 'text-slate-600' : 'text-slate-400'
              }`}>
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Technology & Equipment Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`rounded-3xl p-8 md:p-12 border ${
          isLight ? 'bg-[#F4EFE6] border-amber-900/10' : 'bg-navy-900/90 border-white/10'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <span className="text-xs uppercase font-serif font-bold tracking-[0.25em] text-[#C5A059] dark:text-amber-400">
                Cutting-Edge Care
              </span>
              <h2 className={`text-3xl font-serif font-bold ${
                isLight ? 'text-[#7A2818]' : 'text-white'
              }`}>
                State-of-the-Art Clinical Technology
              </h2>
              <p className={`text-xs sm:text-sm leading-relaxed ${
                isLight ? 'text-slate-700' : 'text-slate-300'
              }`}>
                We continuously invest in next-generation diagnostic and therapeutic equipment to ensure pain-free, fast, and sub-millimeter precise treatments.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {technologies.map((t, i) => (
                  <div key={i} className={`p-4 rounded-2xl border transition-all ${
                    isLight ? 'bg-white border-amber-900/10' : 'bg-navy-950 border-white/5'
                  }`}>
                    <span className={`text-xs font-serif font-bold block ${
                      isLight ? 'text-[#7A2818]' : 'text-amber-300'
                    }`}>
                      {t.name}
                    </span>
                    <p className={`text-[11px] mt-1 leading-relaxed ${
                      isLight ? 'text-slate-600' : 'text-slate-400'
                    }`}>
                      {t.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-xl border border-amber-900/10 dark:border-white/10">
              <img
                src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1000"
                alt="3D Scanner & Dental Technology"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Consultation Call-to-Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 md:p-14 bg-gradient-to-r from-[#7A2818] via-[#8C3D2B] to-[#7A2818] text-white text-center space-y-6 relative overflow-hidden shadow-2xl border border-amber-300/30">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="text-xs uppercase font-serif font-bold tracking-[0.25em] text-amber-300">
              Begin Your Journey
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-amber-100">
              Ready to Transform Your Smile?
            </h2>
            <p className="text-sm text-amber-100/90 leading-relaxed font-serif">
              Experience world-class dentistry in a serene luxury studio. Reserve your personalized consultation today.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/appointment"
                className="w-full sm:w-auto px-10 py-4 rounded-sm bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#B38F48] hover:from-[#B38F48] hover:to-[#C5A059] text-[#2B2110] font-bold text-xs uppercase tracking-widest transition-all shadow-lg hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>Book Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 rounded-sm bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-widest border border-white/20 transition-all flex items-center justify-center"
              >
                <span>Contact Studio</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
