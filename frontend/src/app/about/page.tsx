'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sparkles, ShieldCheck, Award, ArrowRight,
  Users, Star, CalendarCheck, Microscope,
  Zap, Heart, Smile, BadgeCheck
} from 'lucide-react';

export default function AboutPage() {
  const values = [
    { icon: Smile,       title: 'Bespoke Artistry',     desc: 'Every veneer and crown is individually handcrafted to harmonise with your unique facial anatomy and skin tone.' },
    { icon: Heart,       title: 'Zero Anxiety Care',    desc: 'Pain-free laser treatments, noise-cancelling headphones, and aromatherapy ensure total tranquillity.' },
    { icon: Microscope,  title: 'Clinical Precision',   desc: 'Sub-millimetre 3D computer guidance ensures perfection, longevity, and biological integrity in every procedure.' },
    { icon: BadgeCheck,  title: '5-Star Concierge',     desc: 'Private consultation suites, flexible EMI financing, and dedicated patient-care coordinators at every step.' },
  ];

  const stats = [
    { value: '12,000+', label: 'Happy Patients', icon: Users },
    { value: '4.9 ★',   label: 'Google Rating',  icon: Star },
    { value: '18 Yrs',  label: 'Of Excellence',  icon: Award },
    { value: '99%',     label: 'Success Rate',   icon: CalendarCheck },
  ];

  const technologies = [
    { name: 'CBCT 3D Imaging',         desc: 'Full-jaw cone beam CT scanning for precision diagnosis' },
    { name: 'CAD/CAM Ceramic Milling', desc: 'Same-day crowns crafted in-house with digital precision' },
    { name: 'Diode Laser Therapy',     desc: 'Pain-free gum contouring & cavity treatment' },
    { name: 'Intraoral Scanner',       desc: 'Impression-free digital scans for aligners & implants' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">

      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-navy-800 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Heritage &amp; Philosophy</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white">Redefining The Dental Experience</h1>
        <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
          Established in the heart of India, Pearl Dental Care bridges advanced surgical precision with the warmth of personalised care — trusted by over 12,000 families across the region.
        </p>
      </div>

      {/* Story + Clinic Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-serif font-bold text-white">Where Clinical Innovation Meets Compassionate Care</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Dr. Priya Sharma founded Pearl Dental Care with a singular vision — to eliminate the fear and discomfort associated with traditional dentistry and create a sanctuary of health, beauty, and confidence.
          </p>
          <p className="text-sm text-slate-300 leading-relaxed">
            Our team of MDS-qualified specialists, trained at premier institutions including AIIMS and Manipal, use cutting-edge technology such as 3D intraoral scanners, CAD/CAM ceramic milling, and pain-free diode lasers to craft long-lasting, luminous smiles.
          </p>
          <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-300">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
              <span>IDA &amp; MCI Accredited</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-cyan-400 shrink-0" />
              <span>State Award — Best Dental Clinic 2023</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-cyan-400 shrink-0" />
              <span>ISO 9001:2015 Certified</span>
            </div>
          </div>
        </div>

        {/* Clinic Stats Card */}
        <div className="glass-card rounded-3xl border border-cyan-500/30 shadow-2xl overflow-hidden">
          <div className="grid grid-cols-2 divide-x divide-y divide-white/10">
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col items-center justify-center py-8 px-4 space-y-1 hover:bg-cyan-500/5 transition-colors">
                <s.icon className="w-6 h-6 text-cyan-400 mb-1" />
                <span className="text-2xl font-extrabold text-white">{s.value}</span>
                <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">{s.label}</span>
              </div>
            ))}
          </div>

          <div className="p-6 border-t border-white/10 space-y-3">
            <span className="text-[10px] uppercase tracking-widest font-bold text-cyan-400 flex items-center gap-1.5">
              <Zap className="w-3 h-3" /> Advanced Technology We Use
            </span>
            <div className="space-y-2">
              {technologies.map((t, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 hover:bg-cyan-500/10 transition-colors border border-white/5 hover:border-cyan-500/20">
                  <div className="w-2 h-2 mt-1.5 rounded-full bg-cyan-400 shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-white block">{t.name}</span>
                    <span className="text-[11px] text-slate-400">{t.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Values Grid */}
      <div className="space-y-8">
        <div className="text-center">
          <span className="text-xs uppercase font-bold tracking-widest text-cyan-400">Pillars of Excellence</span>
          <h2 className="text-3xl font-serif font-bold text-white mt-1">Our Core Values</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <div key={i} className="glass-card rounded-2xl p-6 border border-white/10 space-y-3 hover:border-cyan-500/40 transition-all group">
              <div className="w-11 h-11 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center group-hover:bg-cyan-500/25 transition-colors">
                <v.icon className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">{v.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Banner */}
      <div className="glass-card rounded-3xl p-8 md:p-12 border border-cyan-500/30 text-center space-y-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-sky-500/5 pointer-events-none" />
        <span className="text-xs uppercase font-bold tracking-widest text-cyan-400">Ready to Transform Your Smile?</span>
        <h3 className="text-3xl font-serif font-bold text-white">Visit Our State-of-the-Art Clinic</h3>
        <p className="text-sm text-slate-300 max-w-xl mx-auto">
          Experience world-class dentistry in a warm, welcoming environment. Book your free consultation today and take the first step towards a healthier, more confident smile.
        </p>
        <Link
          href="/appointment"
          className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan-400 to-sky-300 text-slate-950 font-bold text-xs uppercase tracking-wider hover:scale-105 transition-all shadow-lg shadow-cyan-500/25"
        >
          <span>Book Free Consultation</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
