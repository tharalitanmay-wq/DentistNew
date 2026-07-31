'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, User, Share2, Sparkles, Calendar } from 'lucide-react';

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <Link href="/blog" className="inline-flex items-center space-x-2 text-xs font-semibold text-cyan-400 hover:underline">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Articles</span>
      </Link>

      <div className="space-y-4">
        <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
          Cosmetic Dentistry
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
          The Art of Porcelain Veneers: How Bespoke Smiles are Crafted
        </h1>
        <div className="flex items-center space-x-6 text-xs text-slate-400 border-b border-white/10 pb-6">
          <span className="flex items-center"><User className="w-4 h-4 mr-1 text-cyan-400" /> Dr. Evelyn Sterling</span>
          <span className="flex items-center"><Clock className="w-4 h-4 mr-1 text-cyan-400" /> 6 min read</span>
          <span className="flex items-center"><Calendar className="w-4 h-4 mr-1 text-cyan-400" /> July 24, 2026</span>
        </div>
      </div>

      <div className="h-96 rounded-3xl overflow-hidden glass-card border border-white/10">
        <img
          src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=1200"
          alt="Porcelain Veneers"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed space-y-6">
        <p>
          Porcelain veneers are widely regarded as the pinnacle of cosmetic dentistry. Unlike traditional crowns that cover the entire tooth structure, veneers are handcrafted ceramic shells meticulously bonded to the front surface of teeth.
        </p>

        <h3 className="text-xl font-serif font-bold text-white">Digital Smile Design (DSD)</h3>
        <p>
          At Lumina Dental Studio, every transformation begins with high-definition 3D digital scans and facial symmetry analysis. We map out golden proportions tailored uniquely to your jaw structure, lip curvature, and skin tone translucency.
        </p>

        <h3 className="text-xl font-serif font-bold text-white">Micro-Layering Feldspathic Porcelain</h3>
        <p>
          Our master ceramists use field-spat ceramic layering to mimic the natural translucency and enamel ridges of youth. The result is a luminous, high-wattage smile that never looks artificially opaque.
        </p>
      </div>

      <div className="glass-card rounded-2xl p-6 border border-cyan-500/30 flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold text-white">Ready for your own 3D Smile Design consultation?</h4>
          <p className="text-xs text-slate-400 mt-0.5">Meet with Dr. Evelyn Sterling at our Park Avenue studio.</p>
        </div>
        <Link
          href="/appointment"
          className="px-6 py-2.5 rounded-full bg-cyan-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-cyan-400 transition-all"
        >
          Book Consultation
        </Link>
      </div>
    </div>
  );
}
