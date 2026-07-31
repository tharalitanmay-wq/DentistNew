'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Clock, CheckCircle2 } from 'lucide-react';
import CostEstimator from '@/components/CostEstimator';

export default function ServicesPage() {
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Pinnacle Treatments</span>
        <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white">Clinical Services</h1>
        <p className="text-sm text-slate-300">Advanced aesthetic & implant dentistry performed with 3D digital precision.</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all border ${
              filter === cat
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/20'
                : 'bg-navy-900 text-slate-300 border-white/10 hover:border-cyan-400'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Services List */}
      <div className="space-y-8">
        {filtered.map((srv, idx) => (
          <div
            key={idx}
            className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 flex flex-col lg:flex-row gap-8 items-center hover:border-cyan-500/40 transition-all shadow-xl"
          >
            <div className="w-full lg:w-1/3 h-64 rounded-2xl overflow-hidden relative shrink-0">
              <img src={srv.img} alt={srv.name} className="w-full h-full object-cover" />
              <span className="absolute top-3 left-3 bg-navy-900/90 text-cyan-400 text-[10px] font-bold px-3 py-1 rounded-full border border-cyan-500/30">
                {srv.category}
              </span>
            </div>

            <div className="flex-1 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="text-2xl font-serif font-bold text-white">{srv.name}</h3>
                <span className="text-sm font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20 w-fit">
                  {srv.price}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{srv.desc}</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {srv.benefits.map((b, i) => (
                  <div key={i} className="flex items-center space-x-1.5 text-[11px] text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-white/5">
                <span className="text-xs text-slate-400 flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1 text-cyan-400" />
                  {srv.duration}
                </span>
                <Link
                  href={`/appointment?service=${encodeURIComponent(srv.name)}`}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-400 to-sky-300 text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all flex items-center space-x-2 shadow-lg shadow-cyan-500/20"
                >
                  <span>Book Procedure</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Embedded Calculator */}
      <section className="pt-12">
        <CostEstimator />
      </section>

    </div>
  );
}
