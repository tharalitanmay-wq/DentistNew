'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Clock, CheckCircle2 } from 'lucide-react';
import CostEstimator from '@/components/CostEstimator';
import { useTheme } from '@/context/ThemeContext';

export default function ServicesPage() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Cosmetic Dentistry', 'Implantology', 'Orthodontics', 'Surgery & Restorative'];

  const services = [
    {
      name: 'Signature Porcelain Veneers',
      category: 'Cosmetic Dentistry',
      desc: 'Ultra-thin, custom handcrafted ceramic veneers that transform discolored, chipped, or misaligned teeth into a luminous Hollywood smile.',
      price: '$1,200 - $2,500 / tooth',
      duration: '60 mins per session',
      benefits: ['Minimal enamel removal', 'Natural light translucency', 'Stain-resistant porcelain', '15-20 year durability'],
      img: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800'
    },
    {
      name: '3D Computer-Guided Dental Implants',
      category: 'Implantology',
      desc: 'Permanent, natural-looking replacement for missing teeth using biocompatible titanium roots and custom zirconia crowns.',
      price: '$2,500 - $4,800',
      duration: '90 mins',
      benefits: ['Lifetime stability', 'Preserves jawbone structure', 'Seamless natural match', 'Single day restoration option'],
      img: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800'
    },
    {
      name: 'Invisalign Diamond Alignment',
      category: 'Orthodontics',
      desc: 'Virtually invisible removable aligners that gently shift your teeth into ideal alignment without metal wires or brackets.',
      price: '$3,500 - $6,500',
      duration: '30 mins check-in',
      benefits: ['100% invisible aligners', 'Removable for dining', 'Accelerated 6-12 mo options', '3D iTero digital preview'],
      img: 'https://images.unsplash.com/photo-1594824813566-78a9c30f40d2?auto=format&fit=crop&q=80&w=800'
    },
    {
      name: 'Laser Teeth Whitening Luxury Spa',
      category: 'Cosmetic Dentistry',
      desc: 'In-office cold-laser whitening treatment lifting enamel stains up to 8 shades lighter in less than 60 relaxing minutes.',
      price: '$450 - $750',
      duration: '60 mins',
      benefits: ['Instant 8-shade brightening', 'Zero tooth sensitivity formula', 'Includes luxury take-home touchup kit'],
      img: 'https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&q=80&w=800'
    },
    {
      name: 'Full Mouth Smile Rehabilitation',
      category: 'Surgery & Restorative',
      desc: 'Comprehensive restorative overhaul combining crowns, veneers, laser therapy, and bite realignment for optimal function & beauty.',
      price: '$8,000 - $22,000',
      duration: 'Multi-session custom plan',
      benefits: ['Comprehensive aesthetics & bite correction', 'Tailored sedation options', 'Custom 3D waxup mockups'],
      img: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800'
    }
  ];

  const filtered = filter === 'All' ? services : services.filter(s => s.category === filter);

  return (
    <div className={`min-h-screen pb-20 space-y-16 ${
      isLight ? 'bg-[#FAF7F2] text-slate-900' : 'bg-navy-950 text-white'
    }`}>

      {/* Header */}
      <section className={`pt-28 pb-12 px-4 sm:px-6 lg:px-8 border-b ${
        isLight ? 'bg-gradient-to-b from-white to-[#FAF7F2] border-amber-900/10' : 'bg-navy-900/60 border-white/10'
      }`}>
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-serif font-bold uppercase tracking-[0.25em] text-[#C5A059] dark:text-amber-400">
            Pinnacle Treatments
          </span>
          <h1 className={`text-4xl sm:text-6xl font-serif font-bold ${
            isLight ? 'text-[#7A2818]' : 'text-amber-200'
          }`}>
            Clinical Services
          </h1>
          <p className={`text-sm sm:text-base font-serif leading-relaxed ${
            isLight ? 'text-slate-700' : 'text-slate-300'
          }`}>
            Advanced aesthetic &amp; implant dentistry performed with sub-millimeter 3D digital precision.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* High-Visibility Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => {
            const isActive = filter === cat;
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
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

        {/* Clear Services Cards List */}
        <div className="space-y-8">
          {filtered.map((srv, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-6 sm:p-8 border flex flex-col lg:flex-row gap-8 items-center transition-all duration-300 shadow-xl ${
                isLight
                  ? 'bg-white border-amber-900/10 hover:border-amber-500/50'
                  : 'bg-navy-900/80 border-white/10 hover:border-amber-400/40'
              }`}
            >
              <div className="w-full lg:w-1/3 h-64 rounded-2xl overflow-hidden relative shrink-0">
                <img src={srv.img} alt={srv.name} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 bg-[#2B2110]/90 text-amber-300 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-amber-400/30">
                  {srv.category}
                </span>
              </div>

              <div className="flex-1 space-y-4 w-full">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h2 className={`text-2xl font-serif font-bold ${
                    isLight ? 'text-[#7A2818]' : 'text-white'
                  }`}>
                    {srv.name}
                  </h2>
                  <span className="text-xs font-serif font-bold text-amber-700 dark:text-amber-300 bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20 w-fit">
                    {srv.price}
                  </span>
                </div>
                
                <p className={`text-xs leading-relaxed ${
                  isLight ? 'text-slate-600' : 'text-slate-300'
                }`}>
                  {srv.desc}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {srv.benefits.map((b, i) => (
                    <div key={i} className={`flex items-center space-x-1.5 text-[11px] font-medium ${
                      isLight ? 'text-slate-700' : 'text-slate-300'
                    }`}>
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>

                <div className={`pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t ${
                  isLight ? 'border-amber-900/10' : 'border-white/10'
                }`}>
                  <span className={`text-xs flex items-center ${
                    isLight ? 'text-slate-600' : 'text-slate-400'
                  }`}>
                    <Clock className="w-4 h-4 mr-1.5 text-amber-600 dark:text-amber-400" />
                    {srv.duration}
                  </span>
                  
                  {/* High-Visibility Action Button */}
                  <Link
                    href={`/appointment?service=${encodeURIComponent(srv.name)}`}
                    className="w-full sm:w-auto px-8 py-3 rounded-full bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#B38F48] hover:from-[#B38F48] hover:to-[#C5A059] text-[#2B2110] font-sans font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-lg transform hover:scale-105 border border-amber-300/40"
                  >
                    <span>Book Procedure</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Embedded Calculator */}
        <section className="pt-8">
          <CostEstimator />
        </section>

      </div>

    </div>
  );
}
