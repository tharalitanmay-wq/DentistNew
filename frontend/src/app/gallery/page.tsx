'use client';

import React, { useState } from 'react';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import { Sparkles } from 'lucide-react';

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Veneers', 'Whitening'];

  const galleryItems = [
    {
      id: 1,
      title: '10 Upper Porcelain Veneers',
      category: 'Veneers',
      before: '/api/transformations/before-veneers',
      after: '/api/transformations/after-veneers',
      desc: 'Complete shade BL1 bleach transformation resolving enamel wear and discolored teeth.'
    },
    {
      id: 2,
      title: 'Laser Teeth Whitening',
      category: 'Whitening',
      before: '/api/transformations/before-whitening',
      after: '/api/transformations/after-whitening',
      desc: '8-shade brighter smile transformation achieved with in-office laser whitening.'
    }
  ];

  const filtered = activeCategory === 'All' ? galleryItems : galleryItems.filter(g => g.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

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
                : 'bg-slate-900 text-slate-300 border-white/10 hover:border-cyan-400'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Items */}
      <div className="space-y-12">
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
