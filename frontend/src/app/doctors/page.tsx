'use client';

import React from 'react';
import Link from 'next/link';
import { Star, Award, Calendar, CheckCircle2, Mail, Clock } from 'lucide-react';

export default function DoctorsPage() {
  const doctors = [
    {
      name: 'Dr. Evelyn Sterling',
      title: 'Chief Cosmetic Dentist & Director',
      specialization: 'Cosmetic Dentistry & Porcelain Veneers',
      experience: '16+ Years Experience',
      bio: 'Renowned world leader in smile design, porcelain veneers, and full-mouth rehabilitation. Dr. Sterling blends medical precision with high fashion artistry.',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800',
      rating: 5.0,
      consultationFee: 250,
      availableDays: ['Mon', 'Tue', 'Thu', 'Fri'],
      education: ['DDS - Harvard School of Dental Medicine', 'Fellowship - AACD']
    },
    {
      name: 'Dr. Julian Vance',
      title: 'Lead Implant Specialist & Oral Surgeon',
      specialization: 'Dental Implants & All-on-4 Restoration',
      experience: '14+ Years Experience',
      bio: 'Pioneer in minimally invasive computer-guided implantology and bone regeneration techniques. Over 4,000 successful implant placements.',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800',
      rating: 4.9,
      consultationFee: 300,
      availableDays: ['Mon', 'Wed', 'Fri'],
      education: ['DMD - Columbia University Dentistry', 'Maxillofacial Fellowship - Johns Hopkins']
    },
    {
      name: 'Dr. Aria Chen',
      title: 'Orthodontics & Invisalign Specialist',
      specialization: 'Clear Aligners & Invisible Orthodontics',
      experience: '10+ Years Experience',
      bio: 'Diamond Plus Invisalign provider specializing in adult orthodontics, facial symmetry balancing, and discreet teeth straightening.',
      avatar: 'https://images.unsplash.com/photo-1594824813566-78a9c30f40d2?auto=format&fit=crop&q=80&w=800',
      rating: 5.0,
      consultationFee: 200,
      availableDays: ['Tue', 'Wed', 'Sat'],
      education: ['DDS - UPenn Dental Medicine', 'MS Orthodontics - NYU']
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Board Certified Specialists</span>
        <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white">Our Dental Team</h1>
        <p className="text-sm text-slate-300">Dedicated masters in aesthetic smile engineering and oral surgical care.</p>
      </div>

      <div className="space-y-10">
        {doctors.map((doc, idx) => (
          <div
            key={idx}
            className="glass-card rounded-3xl p-6 sm:p-10 border border-white/10 flex flex-col md:flex-row gap-8 items-center hover:border-cyan-500/40 transition-all shadow-xl"
          >
            <div className="w-full md:w-72 h-80 rounded-2xl overflow-hidden relative shrink-0">
              <img src={doc.avatar} alt={doc.name} className="w-full h-full object-cover" />
              <div className="absolute bottom-3 left-3 bg-navy-900/90 text-amber-400 text-xs font-bold px-3 py-1 rounded-full border border-white/10 flex items-center space-x-1">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{doc.rating} Rating</span>
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">{doc.title}</span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">{doc.name}</h2>
                <p className="text-xs text-cyan-300 font-medium mt-0.5">{doc.specialization} • {doc.experience}</p>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{doc.bio}</p>

              <div className="space-y-2 pt-2 border-t border-white/5 text-xs text-slate-300">
                <div className="font-semibold text-white">Credentials & Education:</div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {doc.education.map((edu, i) => (
                    <li key={i} className="flex items-center space-x-2 text-[11px] text-slate-400">
                      <Award className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{edu}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/5">
                <div className="text-xs text-slate-400">
                  <span>Available: </span>
                  <span className="font-semibold text-white">{doc.availableDays.join(', ')}</span>
                  <span className="ml-3 text-cyan-400 font-bold">Consultation: ${doc.consultationFee}</span>
                </div>

                <Link
                  href={`/appointment?doctor=${encodeURIComponent(doc.name)}`}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-400 to-sky-300 text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/20"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Consultation</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
