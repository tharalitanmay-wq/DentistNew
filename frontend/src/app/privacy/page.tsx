'use client';

import React from 'react';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-slate-300 text-xs sm:text-sm leading-relaxed">
      <h1 className="text-3xl font-serif font-bold text-white">Privacy Policy & Patient Data Encryption</h1>
      <p className="text-slate-400">Effective Date: January 1, 2026</p>

      <div className="space-y-4 glass-card rounded-3xl p-8 border border-white/10">
        <h3 className="text-base font-bold text-white">1. Patient Information Confidentiality</h3>
        <p>Lumina Dental Studio complies with HIPAA and strict international medical data protection regulations. All uploaded X-rays, 3D CBCT scans, and medical history notes are end-to-end encrypted.</p>

        <h3 className="text-base font-bold text-white">2. Medical File Usage</h3>
        <p>Your uploaded reports are strictly accessible by your designated attending specialist doctor and surgical team for diagnosis and treatment planning.</p>

        <h3 className="text-base font-bold text-white">3. Third-Party Disclosures</h3>
        <p>We will never sell, rent, or commercialize your personal or medical data to third-party advertisers.</p>
      </div>
    </div>
  );
}
