'use client';

import React from 'react';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-slate-300 text-xs sm:text-sm leading-relaxed">
      <h1 className="text-3xl font-serif font-bold text-white">Terms of Service & Clinical Care</h1>
      <p className="text-slate-400">Effective Date: January 1, 2026</p>

      <div className="space-y-4 glass-card rounded-3xl p-8 border border-white/10">
        <h3 className="text-base font-bold text-white">1. Appointment Scheduling & Cancellation Policy</h3>
        <p>We request at least 24 hours notice for appointment rescheduling or cancellations to allow another patient in urgent need to utilize the time slot.</p>

        <h3 className="text-base font-bold text-white">2. Medical Guarantee & Follow-Up</h3>
        <p>All porcelain veneers and implant restorations come with a comprehensive clinical structural warranty provided routine 6-month hygiene visits are maintained.</p>
      </div>
    </div>
  );
}
