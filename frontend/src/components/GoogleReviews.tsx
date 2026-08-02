'use client';

import React from 'react';
import { Star, ShieldCheck, Quote } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function GoogleReviews() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const reviews = [
    {
      id: 1,
      author: 'Evelyn Montgomery',
      role: 'Fashion Executive',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Pearl Dental Care is the absolute pinnacle of luxury. Dr. Sterling designed 10 upper porcelain veneers that literally transformed my face. The pain-free laser technology and spa atmosphere made it effortless.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    },
    {
      id: 2,
      author: 'Marcus Brody',
      role: 'Architect',
      rating: 5,
      date: '1 month ago',
      comment: 'Had full computer-guided dental implants done by Dr. Vance. The precision and 3D imaging technology blew me away. I felt zero pain, and the final zirconia crowns are identical to my natural teeth.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
    },
    {
      id: 3,
      author: 'Seraphina Rossi',
      role: 'Art Director',
      rating: 5,
      date: '3 weeks ago',
      comment: 'Invisalign with Dr. Chen was a dream! The 3D iTero scan showed me my final smile before we even started. The studio on Park Avenue feels like a 5-star Beverly Hills spa.',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200'
    }
  ];

  return (
    <div className="w-full py-12">
      {/* Header Widget */}
      <div className={`flex flex-col sm:flex-row items-center justify-between glass-card p-6 rounded-3xl border mb-8 max-w-4xl mx-auto shadow-xl ${
        isLight ? 'bg-white border-slate-200 shadow-slate-200/50' : 'bg-navy-800/60 border-white/10'
      }`}>
        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
          <div className="w-12 h-12 rounded-2xl bg-white p-2.5 flex items-center justify-center shadow-lg border border-slate-200">
            <svg viewBox="0 0 24 24" className="w-full h-full">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
          </div>
          <div>
            <div className="flex items-center space-x-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
              <span className={`text-sm font-bold ml-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>5.0 / 5.0 Rating</span>
            </div>
            <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Based on 480+ Verified Luxury Patient Reviews on Google</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-xs text-cyan-700 dark:text-cyan-400 font-semibold bg-cyan-500/10 px-4 py-2 rounded-full border border-cyan-500/20">
          <ShieldCheck className="w-4 h-4" />
          <span>100% Verified Experience</span>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((r) => (
          <div
            key={r.id}
            className={`glass-card rounded-2xl p-6 border flex flex-col justify-between transition-all hover:-translate-y-1 shadow-lg ${
              isLight ? 'bg-white border-slate-200 hover:border-cyan-500' : 'border-white/10 hover:border-cyan-500/40'
            }`}
          >
            <div className="space-y-3">
              <Quote className="w-8 h-8 text-cyan-500/30" />
              <div className="flex text-amber-500">
                {[...Array(r.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <p className={`text-xs leading-relaxed italic ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>"{r.comment}"</p>
            </div>

            <div className={`flex items-center space-x-3 pt-6 border-t mt-4 ${isLight ? 'border-slate-100' : 'border-white/5'}`}>
              <img
                src={r.avatar}
                alt={r.author}
                className="w-10 h-10 rounded-full object-cover border border-cyan-400/50"
              />
              <div>
                <h5 className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{r.author}</h5>
                <span className={`text-[10px] block ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{r.role} • {r.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
