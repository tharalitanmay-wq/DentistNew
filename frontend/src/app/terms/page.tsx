'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';

export default function TermsPage() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-xs sm:text-sm leading-relaxed ${
      isLight ? 'text-slate-700' : 'text-slate-300'
    }`}>
      <h1 className={`text-3xl font-serif font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
        Terms of Service & Clinical Care
      </h1>
      <p className={isLight ? 'text-slate-500' : 'text-slate-400'}>Effective Date: January 1, 2026</p>

      <div className={`space-y-4 rounded-3xl p-8 border shadow-xl transition-all ${
        isLight ? 'bg-white border-slate-200 text-slate-700' : 'glass-card border-white/10 text-slate-300'
      }`}>
        <h3 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
          1. Appointment Scheduling & Cancellation Policy
        </h3>
        <p>We request at least 24 hours notice for appointment rescheduling or cancellations to allow another patient in urgent need to utilize the time slot.</p>

        <h3 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
          2. Medical Guarantee & Follow-Up
        </h3>
        <p>All porcelain veneers and implant restorations come with a comprehensive clinical structural warranty provided routine 6-month hygiene visits are maintained.</p>
      </div>
    </div>
  );
}
