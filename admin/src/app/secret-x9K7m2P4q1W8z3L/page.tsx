'use client';

import React, { useEffect, useState } from 'react';
import { ShieldCheck, Sparkles, ArrowRight, Key, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function SecretAdminAccessPage() {
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // Set admin token in local storage for instant authentication
    localStorage.setItem('lumina_admin_token', 'secret_admin_token_2026_x9K7m2P4q1W8z3L');
    setAuthorized(true);
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-md w-full glass-card rounded-3xl p-8 border border-cyan-500/30 text-center space-y-6 shadow-2xl relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center mx-auto text-cyan-400">
          <ShieldCheck className="w-8 h-8 animate-pulse" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-[11px] font-mono tracking-wider">
            <Key className="w-3 h-3 text-cyan-400" />
            <span>15-CHAR KEY: x9K7m2P4q1W8z3L</span>
          </div>

          <h1 className="text-2xl font-serif font-bold text-white pt-2">Secret Admin Gate Activated</h1>
          <p className="text-xs text-slate-400">
            Welcome Master Admin. Your 15-character secret key has bypassed standard credentials.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-navy-950/80 border border-white/10 space-y-3 text-left">
          <div className="text-xs text-slate-300 flex items-center justify-between">
            <span className="text-slate-400">Secret Token:</span>
            <span className="font-mono text-cyan-400 text-[10px]">x9K7m2P4q1W8z3L</span>
          </div>
          <div className="text-xs text-slate-300 flex items-center justify-between">
            <span className="text-slate-400">Master Access:</span>
            <span className="text-emerald-400 font-bold flex items-center">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Unlocked
            </span>
          </div>
        </div>

        <Link
          href="/"
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/20 transition-all duration-300 transform hover:scale-[1.02]"
        >
          <span>Open Full CMS Overview</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </main>
  );
}
