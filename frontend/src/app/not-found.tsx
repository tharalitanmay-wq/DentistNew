'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
        <Sparkles className="w-10 h-10 animate-spin" />
      </div>
      <h1 className="text-6xl font-serif font-bold text-white">404</h1>
      <h2 className="text-2xl font-serif text-cyan-400">Page Missing or Moved</h2>
      <p className="text-xs text-slate-400 max-w-md mx-auto">
        The requested dental consultation or page route could not be found. Let us guide you back to our studio homepage.
      </p>
      <Link
        href="/"
        className="px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan-400 to-sky-300 text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all inline-flex items-center space-x-2 shadow-lg shadow-cyan-500/25"
      >
        <Home className="w-4 h-4" />
        <span>Return to Lumina Home</span>
      </Link>
    </div>
  );
}
