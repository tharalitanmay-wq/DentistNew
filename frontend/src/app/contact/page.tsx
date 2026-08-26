'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import { getApiUrl } from '@/config/api';
import { useTheme } from '@/context/ThemeContext';

export default function ContactPage() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(getApiUrl('/api/contact'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <div className={`min-h-screen pb-20 space-y-16 ${
      isLight ? 'bg-[#FAF7F2] text-slate-900' : 'bg-navy-950 text-white'
    }`}>

      {/* Header */}
      <section className={`pt-28 pb-12 px-4 sm:px-6 lg:px-8 border-b ${
        isLight ? 'bg-gradient-to-b from-white to-[#FAF7F2] border-amber-900/10' : 'bg-navy-900/60 border-white/10'
      }`}>
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-serif font-bold uppercase tracking-[0.25em] text-[#C5A059] dark:text-amber-400">
            Park Avenue Concierge
          </span>
          <h1 className={`text-4xl sm:text-6xl font-serif font-bold ${
            isLight ? 'text-[#7A2818]' : 'text-amber-200'
          }`}>
            Contact Pearl Dental Studio
          </h1>
          <p className={`text-sm sm:text-base font-serif leading-relaxed ${
            isLight ? 'text-slate-700' : 'text-slate-300'
          }`}>
            We invite you to experience private concierge care, bespoke smile consultations, and 24/7 priority support.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Form Container */}
          <div className={`rounded-3xl p-8 border space-y-6 shadow-xl ${
            isLight ? 'bg-white border-amber-900/10' : 'bg-navy-900/80 border-white/10'
          }`}>
            <h2 className={`text-2xl font-serif font-bold ${
              isLight ? 'text-[#7A2818]' : 'text-white'
            }`}>
              Send Us A Message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-semibold mb-1.5 ${
                    isLight ? 'text-slate-700' : 'text-slate-300'
                  }`}>Full Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="John Doe"
                    className={`w-full px-4 py-3 text-xs rounded-xl transition-all shadow-sm focus:outline-none ${
                      isLight
                        ? 'bg-[#FAF7F2] border border-slate-300 text-slate-900 focus:border-amber-600'
                        : 'bg-navy-950 border border-white/15 text-white focus:border-amber-400'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-semibold mb-1.5 ${
                    isLight ? 'text-slate-700' : 'text-slate-300'
                  }`}>Email Address</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="john@example.com"
                    className={`w-full px-4 py-3 text-xs rounded-xl transition-all shadow-sm focus:outline-none ${
                      isLight
                        ? 'bg-[#FAF7F2] border border-slate-300 text-slate-900 focus:border-amber-600'
                        : 'bg-navy-950 border border-white/15 text-white focus:border-amber-400'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-semibold mb-1.5 ${
                    isLight ? 'text-slate-700' : 'text-slate-300'
                  }`}>Phone Number</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className={`w-full px-4 py-3 text-xs rounded-xl transition-all shadow-sm focus:outline-none ${
                      isLight
                        ? 'bg-[#FAF7F2] border border-slate-300 text-slate-900 focus:border-amber-600'
                        : 'bg-navy-950 border border-white/15 text-white focus:border-amber-400'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-semibold mb-1.5 ${
                    isLight ? 'text-slate-700' : 'text-slate-300'
                  }`}>Inquiry Type</label>
                  <select
                    value={form.subject}
                    onChange={e => setForm({ ...form, subject: e.target.value })}
                    className={`w-full px-4 py-3 text-xs rounded-xl transition-all shadow-sm focus:outline-none ${
                      isLight
                        ? 'bg-[#FAF7F2] border border-slate-300 text-slate-900 focus:border-amber-600'
                        : 'bg-navy-950 border border-white/15 text-white focus:border-amber-400'
                    }`}
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Cosmetic Veneer Consultation">Cosmetic Veneer Consultation</option>
                    <option value="3D Guided Implant Consultation">3D Guided Implant Consultation</option>
                    <option value="Invisalign Orthodontics">Invisalign Orthodontics</option>
                    <option value="Media & Press">Media & Press</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={`block text-xs font-semibold mb-1.5 ${
                  isLight ? 'text-slate-700' : 'text-slate-300'
                }`}>Your Message</label>
                <textarea
                  rows={4}
                  required
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="How can our clinical concierge team assist your smile goals?"
                  className={`w-full px-4 py-3 text-xs rounded-xl transition-all shadow-sm focus:outline-none resize-none ${
                    isLight
                      ? 'bg-[#FAF7F2] border border-slate-300 text-slate-900 focus:border-amber-600'
                      : 'bg-navy-950 border border-white/15 text-white focus:border-amber-400'
                  }`}
                />
              </div>

              {/* High-Visibility Gold Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-full bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#B38F48] hover:from-[#B38F48] hover:to-[#C5A059] text-[#2B2110] font-sans font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center space-x-2 shadow-lg transform hover:scale-105 border border-amber-300/40"
              >
                <span>{loading ? 'Sending...' : 'Send Message'}</span>
                <Send className="w-4 h-4 text-[#2B2110]" />
              </button>

              {submitted && (
                <p className="text-xs text-center text-amber-700 dark:text-amber-300 font-bold">
                  ✓ Message received! Our Park Avenue concierge will contact you within 24 hours.
                </p>
              )}
            </form>
          </div>

          {/* Contact Information & Map Info */}
          <div className="space-y-8 flex flex-col justify-between">
            <div className={`rounded-3xl p-8 border space-y-6 shadow-xl ${
              isLight ? 'bg-white border-amber-900/10' : 'bg-navy-900/80 border-white/10'
            }`}>
              <h2 className={`text-2xl font-serif font-bold ${
                isLight ? 'text-[#7A2818]' : 'text-white'
              }`}>
                Studio Concierge Info
              </h2>
              
              <ul className="space-y-4 text-xs">
                <li className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className={`font-serif font-bold block ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      Park Avenue Studio
                    </span>
                    <span className={isLight ? 'text-slate-600' : 'text-slate-300'}>
                      740 Park Avenue, Suite 12B, New York, NY 10021
                    </span>
                  </div>
                </li>

                <li className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className={`font-serif font-bold block ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      Concierge Telephone
                    </span>
                    <span className={isLight ? 'text-slate-600' : 'text-slate-300'}>
                      +1 (800) 555-PEARL / Emergency: +1 (800) 999-DENT
                    </span>
                  </div>
                </li>

                <li className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className={`font-serif font-bold block ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      Email Concierge
                    </span>
                    <span className={isLight ? 'text-slate-600' : 'text-slate-300'}>
                      concierge@pearldental.com
                    </span>
                  </div>
                </li>

                <li className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className={`font-serif font-bold block ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      Studio Hours
                    </span>
                    <span className={isLight ? 'text-slate-600' : 'text-slate-300'}>
                      Monday - Friday: 8:00 AM - 7:00 PM<br />Saturday: 9:00 AM - 4:00 PM
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Map Simulation Block */}
            <div className="rounded-3xl overflow-hidden border border-amber-900/10 dark:border-white/10 h-64 relative shadow-xl">
              <iframe
                title="Park Avenue Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.876771804791!2d-73.96677568459341!3d40.76701597932598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258eb5b62b1b3%3A0xb3cf5d774f9d6c70!2s740%20Park%20Ave%2C%20New%20York%2C%20NY%2010021!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus"
                className="w-full h-full border-0 filter grayscale invert contrast-125 opacity-80"
                loading="lazy"
              ></iframe>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
