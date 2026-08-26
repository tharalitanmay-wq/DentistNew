'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Clock, User, ArrowRight, Search } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function BlogPage() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [searchTerm, setSearchTerm] = useState('');

  const articles = [
    {
      id: 1,
      title: 'The Art of Porcelain Veneers: How Bespoke Smiles are Crafted',
      slug: 'art-of-porcelain-veneers',
      excerpt: 'Discover the meticulous craftsmanship, color translucency matching, and digital smile design behind natural porcelain veneers.',
      category: 'Cosmetic Dentistry',
      author: 'Dr. Ananya Sharma',
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
      author: 'Dr. Rajesh Kapoor',
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
      author: 'Dr. Vikramaditya Verma',
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
    <div className={`min-h-screen pb-20 space-y-16 ${
      isLight ? 'bg-[#FAF7F2] text-slate-900' : 'bg-navy-950 text-white'
    }`}>

      {/* Header & Search Bar */}
      <section className={`pt-28 pb-12 px-4 sm:px-6 lg:px-8 border-b ${
        isLight ? 'bg-gradient-to-b from-white to-[#FAF7F2] border-amber-900/10' : 'bg-navy-900/60 border-white/10'
      }`}>
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-serif font-bold uppercase tracking-[0.25em] text-[#C5A059] dark:text-amber-400">
            Dental Intelligence
          </span>
          <h1 className={`text-4xl sm:text-6xl font-serif font-bold ${
            isLight ? 'text-[#7A2818]' : 'text-amber-200'
          }`}>
            Articles &amp; Insights
          </h1>
          <p className={`text-sm sm:text-base font-serif leading-relaxed ${
            isLight ? 'text-slate-700' : 'text-slate-300'
          }`}>
            Expert guidance on cosmetic dentistry, computer-guided implantology, and smile wellness.
          </p>

          <div className="pt-4 max-w-md mx-auto relative">
            <input
              type="text"
              placeholder="Search articles by topic..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-3.5 rounded-full text-xs transition-all shadow-sm focus:outline-none ${
                isLight
                  ? 'bg-white border border-amber-900/20 text-slate-900 placeholder-slate-400 focus:border-amber-600'
                  : 'bg-navy-900 border border-white/15 text-white placeholder-slate-400 focus:border-amber-400'
              }`}
            />
            <Search className="w-4 h-4 text-amber-600 dark:text-amber-400 absolute left-4 top-4" />
          </div>
        </div>
      </section>

      {/* Clear Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filtered.map((art) => (
            <div
              key={art.id}
              className={`rounded-3xl overflow-hidden border flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xl group ${
                isLight
                  ? 'bg-white border-amber-900/10 hover:border-amber-500/50'
                  : 'bg-navy-900/80 border-white/10 hover:border-amber-400/40'
              }`}
            >
              <div>
                <div className="relative h-56 overflow-hidden">
                  <img src={art.coverImage} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-3 right-3 bg-[#2B2110]/90 text-amber-300 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-amber-400/30">
                    {art.category}
                  </span>
                </div>
                <div className="p-6 space-y-3">
                  <div className={`flex items-center space-x-3 text-[11px] font-medium ${
                    isLight ? 'text-slate-500' : 'text-slate-400'
                  }`}>
                    <span className="flex items-center"><User className="w-3.5 h-3.5 mr-1 text-amber-600 dark:text-amber-400" />{art.author}</span>
                    <span>•</span>
                    <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1 text-amber-600 dark:text-amber-400" />{art.readTime}</span>
                  </div>
                  <h2 className={`text-xl font-serif font-bold group-hover:text-amber-700 transition-colors ${
                    isLight ? 'text-[#7A2818]' : 'text-white'
                  }`}>
                    {art.title}
                  </h2>
                  <p className={`text-xs leading-relaxed ${
                    isLight ? 'text-slate-600' : 'text-slate-300'
                  }`}>
                    {art.excerpt}
                  </p>
                </div>
              </div>

              {/* High-Visibility Gold Action Button */}
              <div className="p-6 pt-0">
                <Link
                  href={`/blog/${art.slug}`}
                  className="w-full py-3 rounded-full bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#B38F48] hover:from-[#B38F48] hover:to-[#C5A059] text-[#2B2110] font-sans font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-md transform hover:scale-105 border border-amber-300/40"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4 text-[#2B2110]" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
