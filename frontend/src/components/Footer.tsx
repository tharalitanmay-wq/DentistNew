'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Phone, Mail, MapPin, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import ToothIcon from '@/components/ToothIcon';

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer className={`relative text-slate-400 pt-20 pb-10 border-t transition-colors ${
      theme === 'light' ? 'bg-slate-100 border-slate-200 text-slate-600' : 'bg-navy-950 border-white/10 text-slate-400'
    } overflow-hidden`}>
      {/* Background Decorative Blur */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b ${
          theme === 'light' ? 'border-slate-300' : 'border-white/10'
        }`}>

          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center space-x-3.5 group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-400 via-sky-500 to-blue-600 p-0.5 shadow-md shadow-cyan-500/30">
                <div className="w-full h-full bg-slate-950 dark:bg-navy-950 rounded-[10px] flex items-center justify-center p-1.5">
                  <ToothIcon className="w-7 h-7" />
                </div>
              </div>
              <div>
                <span className={`text-2xl font-serif font-extrabold tracking-tight ${
                  theme === 'light' ? 'text-slate-950' : 'text-white'
                }`}>PEARL</span>
                <span className="block text-[11px] tracking-[0.25em] text-cyan-600 dark:text-cyan-400 uppercase font-bold">Dental Care</span>
              </div>
            </Link>
            <p className={`text-sm leading-relaxed max-w-md ${
              theme === 'light' ? 'text-slate-600' : 'text-slate-400'
            }`}>
              Pinnacle of luxury aesthetic dentistry, 3D computer-guided implants, and porcelain veneers. Redefining clinical precision in a peaceful spa environment.
            </p>
            <div className={`flex items-center space-x-3 text-xs ${
              theme === 'light' ? 'text-slate-700' : 'text-slate-300'
            }`}>
              <ShieldCheck className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>AACD Accredited Master Specialists & Board Certified Surgeons</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className={`text-sm font-semibold uppercase tracking-wider ${
              theme === 'light' ? 'text-slate-900' : 'text-white'
            }`}>Treatments</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/services" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Porcelain Veneers</Link></li>
              <li><Link href="/services" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">3D Dental Implants</Link></li>
              <li><Link href="/services" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Invisalign Alignment</Link></li>
              <li><Link href="/services" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Laser Teeth Whitening</Link></li>
              <li><Link href="/services" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Full Smile Rehab</Link></li>
              <li><Link href="/services" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Emergency Dental Care</Link></li>
            </ul>
          </div>

          {/* Clinic Hours & Contact */}
          <div className="space-y-4">
            <h4 className={`text-sm font-semibold uppercase tracking-wider ${
              theme === 'light' ? 'text-slate-900' : 'text-white'
            }`}>Concierge Contact</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                <span>740 Park Avenue, Suite 12B, New York, NY 10021</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                <span>+1 (800) 555-PEARL</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                <span>concierge@pearldental.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                <span>Mon - Fri: 8am - 7pm<br />Sat: 9am - 4pm</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="space-y-4">
            <h4 className={`text-sm font-semibold uppercase tracking-wider ${
              theme === 'light' ? 'text-slate-900' : 'text-white'
            }`}>VIP Newsletter</h4>
            <p className={`text-xs ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>Receive private cosmetic dentistry insights and seasonal smile design offers.</p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed to VIP Concierge Newsletter!'); }} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  className={`w-full px-4 py-2.5 text-xs rounded-xl focus:outline-none focus:border-cyan-500 border ${
                    theme === 'light' ? 'bg-white border-slate-300 text-slate-900 placeholder-slate-400' : 'bg-navy-900 border-white/10 text-white placeholder-slate-500'
                  }`}
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-3 bg-cyan-600 dark:bg-cyan-500 text-white dark:text-slate-950 rounded-lg font-semibold text-xs hover:bg-cyan-500 transition-colors"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Bottom Copyright & Admin Link */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 space-y-4 sm:space-y-0">
          <div>
            © {new Date().getFullYear()} Pearl Dental Care. All Rights Reserved.
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="hover:text-slate-700 dark:hover:text-slate-300">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-700 dark:hover:text-slate-300">Terms of Service</Link>
            <a href="http://localhost:3001" target="_blank" rel="noreferrer" className="text-cyan-600 dark:text-cyan-400 font-semibold hover:underline flex items-center space-x-1">
              <span>Admin CMS Portal</span>
              <ArrowRight className="w-3 h-3 ml-0.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
