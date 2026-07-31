'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Sparkles, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Park Avenue Concierge</span>
        <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white">Contact Lumina Studio</h1>
        <p className="text-sm text-slate-300">We invite you to experience private dental concierge care.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="glass-card rounded-3xl p-8 border border-white/10 space-y-6 shadow-xl">
          <h3 className="text-2xl font-serif font-bold text-white">Send Private Inquiry</h3>

          {submitted ? (
            <div className="p-6 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-cyan-400 mx-auto" />
              <h4 className="text-lg font-bold text-white">Inquiry Received</h4>
              <p className="text-xs text-slate-300">Our patient concierge coordinator will contact you within 2 business hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Victoria Sterling"
                    className="w-full px-4 py-2.5 bg-navy-900 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-2.5 bg-navy-900 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="victoria@example.com"
                  className="w-full px-4 py-2.5 bg-navy-900 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Interested Treatment</label>
                <select className="w-full px-4 py-2.5 bg-navy-900 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400">
                  <option>Porcelain Veneers</option>
                  <option>3D Dental Implants</option>
                  <option>Invisalign Orthodontics</option>
                  <option>Laser Spa Whitening</option>
                  <option>General Consultation</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Message or Specific Requests</label>
                <textarea
                  rows={4}
                  placeholder="Please describe your smile goals or preferred consultation dates..."
                  className="w-full px-4 py-2.5 bg-navy-900 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-300 text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/25"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>

        {/* Contact Info & Map Simulation */}
        <div className="space-y-8">
          <div className="glass-card rounded-3xl p-8 border border-white/10 space-y-6">
            <h3 className="text-xl font-serif font-bold text-white">Studio Concierge Details</h3>
            <ul className="space-y-4 text-xs">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Location Address</span>
                  <span className="text-slate-300">740 Park Avenue, Suite 12B, New York, NY 10021</span>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Concierge Telephone</span>
                  <span className="text-slate-300">+1 (800) 555-LUMINA / Emergency: +1 (800) 999-DENT</span>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Email Concierge</span>
                  <span className="text-slate-300">concierge@luminadental.com</span>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Studio Hours</span>
                  <span className="text-slate-300">Monday - Friday: 8:00 AM - 7:00 PM<br />Saturday: 9:00 AM - 4:00 PM</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Map Simulation Block */}
          <div className="glass-card rounded-3xl overflow-hidden border border-white/10 h-64 relative shadow-xl">
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
  );
}
