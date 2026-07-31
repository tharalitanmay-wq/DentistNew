'use client';

import React, { useState } from 'react';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import { Sparkles } from 'lucide-react';

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Veneers', 'Implants', 'Orthodontics', 'Clinic Facility'];

  const galleryItems = [
    {
      id: 1,
      title: '10 Upper Porcelain Veneers',
      category: 'Veneers',
      before: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1200',
      after: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=1200',
      desc: 'Complete shade BL1 bleach transformation resolving fluorosis staining and chip wear.'
    },
    {
      id: 2,
      title: 'Full Arch All-on-4 Implant Reconstruction',
      category: 'Implants',
      before: 'https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&q=80&w=1200',
      after: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200',
      desc: 'Computer-guided titanium implant bridge replacing failing dentition.'
    },
    {
      id: 3,
      title: 'Invisalign 8-Month Alignment',
      category: 'Orthodontics',
      before: 'https://images.unsplash.com/photo-1594824813566-78a9c30f40d2?auto=format&fit=crop&q=80&w=1200',
      after: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1200',
      desc: 'Correction of midline shift and crowding with invisible aligners.'
    }
  ];

  const filtered = activeCategory === 'All' ? galleryItems : galleryItems.filter(g => g.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Smile Transformations</span>
        <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white">Before & After Gallery</h1>
        <p className="text-sm text-slate-300">Explore verified real patient smile designs crafted at Lumina Dental Studio.</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all border ${
              activeCategory === cat
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/20'
                : 'bg-navy-900 text-slate-300 border-white/10 hover:border-cyan-400'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Items */}
      <div className="space-y-16">
        {filtered.map((item) => (
          <div key={item.id} className="space-y-4">
            <BeforeAfterSlider
              beforeImage={item.before}
              afterImage={item.after}
              title={item.title}
              subtitle={item.desc}
            />
          </div>
        ))}
      </div>

    </div>
  );
}
