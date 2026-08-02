'use client';

import React, { useState, useEffect } from 'react';
import { Settings, Save, CheckCircle2, ShieldCheck, RefreshCw } from 'lucide-react';

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    heroHeadline: 'Precision Dentistry. Bespoke Elegance.',
    heroSubtext: 'Experience luxury dental care with world-class specialists and cutting-edge 3D technology.',
    phone: '+1 (800) 555-LUMINA',
    emergencyPhone: '+1 (800) 999-DENT',
    address: '740 Park Avenue, Suite 12B, New York, NY 10021',
    announcementBanner: '✨ Complimentary Cosmetic Smile Simulation for New Patients',
    metaTitle: 'Pearl Dental Care | Luxury Dental Excellence',
    metaDescription: 'Pinnacle of cosmetic dentistry, dental implants, and porcelain veneers.'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-serif font-bold text-white">CMS & Site Settings</h1>
        <p className="text-xs text-slate-400">Configure global website content, emergency numbers, and SEO metadata</p>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-xs text-emerald-400 flex items-center space-x-2">
          <CheckCircle2 className="w-5 h-5" />
          <span>Global website settings updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-8 border border-white/10 space-y-6">
        <h3 className="text-lg font-bold text-white border-b border-white/10 pb-3">Homepage Content</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Hero Main Headline</label>
            <input
              type="text"
              value={form.heroHeadline}
              onChange={(e) => setForm({ ...form, heroHeadline: e.target.value })}
              className="w-full px-4 py-2.5 bg-navy-900 border border-white/15 rounded-xl text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Hero Subtext Description</label>
            <textarea
              rows={2}
              value={form.heroSubtext}
              onChange={(e) => setForm({ ...form, heroSubtext: e.target.value })}
              className="w-full px-4 py-2.5 bg-navy-900 border border-white/15 rounded-xl text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Announcement Top Banner Text</label>
            <input
              type="text"
              value={form.announcementBanner}
              onChange={(e) => setForm({ ...form, announcementBanner: e.target.value })}
              className="w-full px-4 py-2.5 bg-navy-900 border border-white/15 rounded-xl text-xs text-white"
            />
          </div>
        </div>

        <h3 className="text-lg font-bold text-white border-b border-white/10 pb-3 pt-4">Contact & Location</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Concierge Hotline</label>
            <input
              type="text"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-4 py-2.5 bg-navy-900 border border-white/15 rounded-xl text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">24/7 Emergency Hotline</label>
            <input
              type="text"
              value={form.emergencyPhone}
              onChange={(e) => setForm({ ...form, emergencyPhone: e.target.value })}
              className="w-full px-4 py-2.5 bg-navy-900 border border-white/15 rounded-xl text-xs text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Studio Address</label>
          <input
            type="text"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="w-full px-4 py-2.5 bg-navy-900 border border-white/15 rounded-xl text-xs text-white"
          />
        </div>

        <h3 className="text-lg font-bold text-white border-b border-white/10 pb-3 pt-4">SEO & Metadata</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Default Meta Title</label>
            <input
              type="text"
              value={form.metaTitle}
              onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
              className="w-full px-4 py-2.5 bg-navy-900 border border-white/15 rounded-xl text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Meta Description</label>
            <textarea
              rows={2}
              value={form.metaDescription}
              onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
              className="w-full px-4 py-2.5 bg-navy-900 border border-white/15 rounded-xl text-xs text-white"
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 rounded-full bg-cyan-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-cyan-400 transition-all flex items-center space-x-2 shadow-lg shadow-cyan-500/20"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
}
