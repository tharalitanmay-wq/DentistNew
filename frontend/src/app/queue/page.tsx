'use client';

import React from 'react';
import LiveClinicQueue from '@/components/LiveClinicQueue';

export default function QueuePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center space-y-3">
        <span className="text-xs uppercase font-bold tracking-widest text-cyan-600 dark:text-cyan-400">
          Walk-In Patient Tracker
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 dark:text-white">
          Live Offline Centre Waiting Queue
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Check live patient waiting count and active token positions at our physical dental clinic.
        </p>
      </div>

      <LiveClinicQueue />
    </div>
  );
}
