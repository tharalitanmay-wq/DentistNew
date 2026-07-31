'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Clock, User, ArrowRight, Search } from 'lucide-react';

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const articles = [
    {
      id: 1,
      title: 'The Art of Porcelain Veneers: How Bespoke Smiles are Crafted',
      slug: 'art-of-porcelain-veneers',
      excerpt: 'Discover the meticulous craftsmanship, color translucency matching, and digital smile design behind natural porcelain veneers.',
      category: 'Cosmetic Dentistry',
      author: 'Dr. Evelyn Sterling',
      readTime: '6 min read',
      date: 'July 24, 2026',
      coverImage: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=1200'
    },
    {
      id: 2,
      title: 'Why Computer-Guided Dental Implants outlast Traditional Bridges',
      slug: 'guided-dental-implants-vs-bridges',
      excerpt: 'Explore why titanium and zirconia implants preserve jawbone density and provide a lifetime structural foundation.',
      category: 'Implants',
      author: 'Dr. Julian Vance',
      readTime: '5 min read',
      date: 'July 18, 2026',
      coverImage: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1200'
    },
    {
      id: 3,
      title: 'Invisalign vs. Porcelain Veneers: Which Right For Your Smile?',
      slug: 'invisalign-vs-veneers-guide',
      excerpt: 'Compare treatment duration, teeth preparation, and aesthetic results to choose your ideal smile path.',
      category: 'Orthodontics',
      author: 'Dr. Aria Chen',
      readTime: '7 min read',
      date: 'July 10, 2026',
      coverImage: 'https://images.unsplash.com/photo-1594824813566-78a9c30f40d2?auto=format&fit=crop&q=80&w=1200'
    }
  ];

  const filtered = articles.filter(a =>
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

      {/* Header & Search */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Dental Intelligence</span>
        <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white">Articles & Insights</h1>
        <p className="text-sm text-slate-300">Expert guidance on cosmetic dentistry, implantology, and oral care.</p>

        <div className="pt-4 max-w-md mx-auto relative">
          <input
            type="text"
            placeholder="Search articles by topic..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-navy-900 border border-white/15 rounded-full text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filtered.map((art) => (
          <div
            key={art.id}
            className="glass-card rounded-3xl overflow-hidden border border-white/10 hover:border-cyan-500/40 transition-all hover:-translate-y-2 group shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="relative h-56 overflow-hidden">
                <img src={art.coverImage} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-3 right-3 bg-navy-900/90 text-cyan-400 text-[10px] font-bold px-3 py-1 rounded-full border border-cyan-500/30">
                  {art.category}
                </span>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex items-center space-x-3 text-[11px] text-slate-400">
                  <span className="flex items-center"><User className="w-3 h-3 mr-1 text-cyan-400" />{art.author}</span>
                  <span>•</span>
                  <span className="flex items-center"><Clock className="w-3 h-3 mr-1 text-cyan-400" />{art.readTime}</span>
                </div>
                <h3 className="text-lg font-serif font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {art.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">{art.excerpt}</p>
              </div>
            </div>

            <div className="p-6 pt-0">
              <Link
                href={`/blog/${art.slug}`}
                className="w-full py-2.5 rounded-xl bg-navy-800 hover:bg-cyan-500 hover:text-slate-950 text-cyan-400 text-xs font-bold transition-all text-center flex items-center justify-center space-x-2"
              >
                <span>Read Full Article</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
