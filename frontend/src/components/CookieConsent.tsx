'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cookie, X } from 'lucide-react';

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('lumina_cookie_consent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('lumina_cookie_consent', 'accepted');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:right-auto md:max-w-md z-50 p-5 rounded-2xl bg-navy-900/95 backdrop-blur-2xl border border-cyan-500/30 text-white shadow-2xl space-y-3">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-2 text-cyan-400">
          <Cookie className="w-5 h-5" />
          <h4 className="text-sm font-bold">Privacy & Cookie Preferences</h4>
        </div>
        <button onClick={() => setShow(false)} className="text-slate-400 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      </div>
      <p className="text-xs text-slate-300 leading-relaxed">
        We use essential cookies and encryption to ensure your luxury patient portal experience is secure, personal, and smooth.
      </p>
      <div className="flex items-center space-x-3 pt-1">
        <button
          onClick={handleAccept}
          className="flex-1 py-2 px-4 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-300 text-slate-950 font-bold text-xs hover:brightness-110 transition-all shadow-md shadow-cyan-500/20"
        >
          Accept All Cookies
        </button>
        <button
          onClick={() => setShow(false)}
          className="py-2 px-3 rounded-xl bg-navy-800 text-slate-400 text-xs hover:text-white border border-white/10"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
