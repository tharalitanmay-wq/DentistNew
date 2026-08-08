'use client';

import React from 'react';
import Link from 'next/link';
import { Star, Award, Calendar, CheckCircle2, Mail, Clock } from 'lucide-react';

export default function DoctorsPage() {
  const doctors = [
    {
      name: 'Dr. Priya Sharma',
      title: 'Chief Cosmetic Dentist & Director',
      specialization: 'Cosmetic Dentistry & Porcelain Veneers',
      experience: '16+ Years Experience',
      bio: 'Internationally acclaimed smile design expert trained at AIIMS New Delhi. Dr. Sharma specialises in full-mouth rehabilitation, porcelain veneers, and high-precision aesthetic dentistry for discerning patients.',
      avatar: '/doctor_priya.png',
      rating: 5.0,
      consultationFee: 250,
      availableDays: ['Mon', 'Tue', 'Thu', 'Fri'],
      education: ['BDS - AIIMS New Delhi', 'MDS Prosthodontics - Maulana Azad Institute', 'Fellowship - AACD USA']
    },
    {
      name: 'Dr. Arjun Mehta',
      title: 'Lead Implant Specialist & Oral Surgeon',
      specialization: 'Dental Implants & All-on-4 Restoration',
      experience: '14+ Years Experience',
      bio: 'Pioneer in computer-guided implantology and bone regeneration techniques. Dr. Mehta completed advanced training at Manipal College of Dental Sciences and has performed over 4,000 successful implant procedures.',
      avatar: '/doctor_arjun.png',
      rating: 4.9,
      consultationFee: 300,
      availableDays: ['Mon', 'Wed', 'Fri'],
      education: ['BDS - KMC Manipal', 'MDS Oral Surgery - Kasturba Medical College', 'Maxillofacial Fellowship - SGPGI']
    },
    {
      name: 'Dr. Kavitha Nair',
      title: 'Orthodontics & Invisalign Specialist',
      specialization: 'Clear Aligners & Invisible Orthodontics',
      experience: '10+ Years Experience',
      bio: 'Diamond Plus Invisalign provider and top-rated orthodontist from Chennai. Dr. Nair specialises in adult orthodontics, facial symmetry balancing, and discreet teeth-straightening solutions.',
      avatar: '/doctor_kavitha.png',
      rating: 5.0,
      consultationFee: 200,
      availableDays: ['Tue', 'Wed', 'Sat'],
      education: ['BDS - Sri Ramachandra University (MAHER)', 'MDS Orthodontics - Saveetha Dental College', 'Invisalign Diamond Plus Certified']
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
