'use client';

import React from 'react';
import Link from 'next/link';
import { Star, Award, Calendar, CheckCircle2, Mail, Clock } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function DoctorsPage() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const doctors = [
    {
      name: 'Dr. Ananya Sharma',
      title: 'Chief Cosmetic Dentist & Director',
      specialization: 'Cosmetic Dentistry & Porcelain Veneers',
      experience: '16+ Years Experience',
      bio: 'Internationally acclaimed smile design expert trained at AIIMS New Delhi. Dr. Sharma specialises in full-mouth rehabilitation, porcelain veneers, and high-precision aesthetic dentistry for discerning patients.',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600',
      rating: 5.0,
      consultationFee: 250,
      availableDays: ['Mon', 'Tue', 'Thu', 'Fri'],
      education: ['BDS - AIIMS New Delhi', 'MDS Prosthodontics - Maulana Azad Institute', 'Fellowship - AACD USA']
    },
    {
      name: 'Dr. Rajesh Kapoor',
      title: 'Lead Implant Specialist & Oral Surgeon',
      specialization: 'Dental Implants & All-on-4 Restoration',
      experience: '14+ Years Experience',
      bio: 'Pioneer in computer-guided implantology and bone regeneration techniques. Dr. Kapoor completed advanced training at Manipal College of Dental Sciences and has performed over 4,000 successful implant procedures.',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600',
      rating: 4.9,
      consultationFee: 300,
      availableDays: ['Mon', 'Wed', 'Fri'],
      education: ['BDS - KMC Manipal', 'MDS Oral Surgery - Kasturba Medical College', 'Maxillofacial Fellowship - SGPGI']
    },
    {
      name: 'Dr. Vikramaditya Verma',
      title: 'Orthodontics & Invisalign Specialist',
      specialization: 'Clear Aligners & Invisible Orthodontics',
      experience: '10+ Years Experience',
      bio: 'Diamond Plus Invisalign provider and top-rated orthodontist from KGMU Lucknow. Dr. Verma specialises in adult orthodontics, facial symmetry balancing, and discreet teeth-straightening solutions.',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600',
      rating: 5.0,
      consultationFee: 200,
      availableDays: ['Tue', 'Wed', 'Sat'],
      education: ['BDS - KGMU Lucknow', 'MDS Orthodontics - KGMU Lucknow', 'Invisalign Diamond Plus Certified']
    }
  ];

  return (
    <div className={`min-h-screen pb-20 space-y-16 ${
      isLight ? 'bg-[#FAF7F2] text-slate-900' : 'bg-navy-950 text-white'
    }`}>

      {/* Clear Header */}
      <section className={`pt-28 pb-12 px-4 sm:px-6 lg:px-8 border-b ${
        isLight ? 'bg-gradient-to-b from-white to-[#FAF7F2] border-amber-900/10' : 'bg-navy-900/60 border-white/10'
      }`}>
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-serif font-bold uppercase tracking-[0.25em] text-[#C5A059] dark:text-amber-400">
            Board Certified Specialists
          </span>
          <h1 className={`text-4xl sm:text-6xl font-serif font-bold ${
            isLight ? 'text-[#7A2818]' : 'text-amber-200'
          }`}>
            Our Master Clinicians
          </h1>
          <p className={`text-sm sm:text-base font-serif leading-relaxed ${
            isLight ? 'text-slate-700' : 'text-slate-300'
          }`}>
            World-renowned experts dedicated to clinical excellence, smile design artistry, and patient-first care.
          </p>
        </div>
      </section>

      {/* Doctors List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {doctors.map((doc, idx) => (
          <div
            key={idx}
            className={`rounded-3xl p-6 sm:p-10 border flex flex-col md:flex-row gap-8 items-center transition-all duration-300 shadow-xl ${
              isLight
                ? 'bg-white border-amber-900/10 hover:border-amber-500/50'
                : 'bg-navy-900/80 border-white/10 hover:border-amber-400/40'
            }`}
          >
            <div className="w-full md:w-72 h-80 rounded-2xl overflow-hidden relative shrink-0">
              <img src={doc.avatar} alt={doc.name} className="w-full h-full object-cover" />
              <div className="absolute bottom-3 left-3 bg-[#2B2110]/90 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-400/30 flex items-center space-x-1">
                <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
                <span>{doc.rating} Rating</span>
              </div>
            </div>

            <div className="flex-1 space-y-4 w-full">
              <div>
                <span className="text-xs font-serif font-bold text-[#C5A059] dark:text-amber-400 uppercase tracking-wider block">
                  {doc.title}
                </span>
                <h2 className={`text-2xl sm:text-3xl font-serif font-bold ${
                  isLight ? 'text-[#7A2818]' : 'text-white'
                }`}>
                  {doc.name}
                </h2>
                <p className={`text-xs font-semibold mt-1 ${
                  isLight ? 'text-amber-900' : 'text-amber-300'
                }`}>
                  {doc.specialization} • {doc.experience}
                </p>
              </div>

              <p className={`text-xs sm:text-sm leading-relaxed ${
                isLight ? 'text-slate-600' : 'text-slate-300'
              }`}>
                {doc.bio}
              </p>

              <div className={`space-y-2 pt-3 border-t text-xs ${
                isLight ? 'border-amber-900/10 text-slate-700' : 'border-white/10 text-slate-300'
              }`}>
                <div className="font-serif font-bold">Credentials &amp; Education:</div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {doc.education.map((edu, i) => (
                    <li key={i} className={`flex items-center space-x-2 text-[11px] ${
                      isLight ? 'text-slate-600' : 'text-slate-400'
                    }`}>
                      <Award className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                      <span>{edu}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t ${
                isLight ? 'border-amber-900/10' : 'border-white/10'
              }`}>
                <div className={`text-xs ${
                  isLight ? 'text-slate-600' : 'text-slate-400'
                }`}>
                  <span>Available Days: </span>
                  <span className="font-bold text-slate-900 dark:text-white">{doc.availableDays.join(', ')}</span>
                  <span className="ml-3 text-amber-700 dark:text-amber-300 font-bold">Consultation: ${doc.consultationFee}</span>
                </div>

                {/* High Visibility Consultation Button */}
                <Link
                  href={`/appointment?doctor=${encodeURIComponent(doc.name)}`}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#B38F48] hover:from-[#B38F48] hover:to-[#C5A059] text-[#2B2110] font-sans font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center space-x-2 shadow-lg transform hover:scale-105 border border-amber-300/40"
                >
                  <Calendar className="w-4 h-4 text-[#2B2110]" />
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
