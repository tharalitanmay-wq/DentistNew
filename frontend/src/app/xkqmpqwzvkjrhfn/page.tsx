'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Mail, Lock, Eye, EyeOff, AlertCircle, ArrowRight, Shield } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

function SecretAdminLoginContent() {
  const { user, login } = useAuth();
  const router = useRouter();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user && user.role === 'admin') {
      window.location.href = 'http://localhost:5000/admin';
    }
  }, [user]);

  const handleAdminLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setSubmitting(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        login(data.token, data.user);
        window.location.href = 'http://localhost:5000/admin';
      } else {
        setAuthError(data.message || 'Invalid admin credentials');
        setSubmitting(false);
      }
    } catch (err) {
      setAuthError('Invalid admin credentials');
      setSubmitting(false);
    }
  };

  return (
    <div className="relative max-w-lg mx-auto px-4 py-16">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>

      {/* Main Secret Admin Glassmorphic Card */}
      <div className={`relative rounded-3xl p-8 sm:p-10 border shadow-2xl space-y-6 backdrop-blur-xl transition-all ${
        isLight 
          ? 'bg-white/95 border-slate-200 shadow-slate-200/60' 
          : 'glass-card border-white/10 shadow-black/80 bg-slate-900/90'
      }`}>

        {/* Secret Admin Shield Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto border border-cyan-500/30 shadow-lg shadow-cyan-500/10">
            <ShieldCheck className="w-8 h-8 text-cyan-400" />
          </div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
            Restricted Admin Access Point
          </span>
          <h1 className={`text-2xl sm:text-3xl font-serif font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Secret Administrator Sign In
          </h1>
          <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Authorized clinic staff & administrator authentication portal
          </p>
        </div>

        {/* Error Banner */}
        {authError && (
          <div className="p-3.5 bg-red-500/10 border border-red-500/30 rounded-2xl text-xs text-red-400 flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{authError}</span>
          </div>
        )}

        {/* Secret Admin Form */}
        <form onSubmit={handleAdminLoginSubmit} className="space-y-4">
          <div>
            <label className={`block text-xs font-semibold mb-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              Admin Email / Username *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@pearldental.com"
                className={`w-full pl-10 pr-4 py-3 rounded-xl text-xs focus:outline-none focus:border-cyan-500 border transition-all ${
                  isLight ? 'bg-slate-50 border-slate-300 text-slate-900 shadow-inner' : 'bg-slate-950 border-white/15 text-white'
                }`}
              />
            </div>
          </div>

          <div>
            <label className={`block text-xs font-semibold mb-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              Admin Master Password *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full pl-10 pr-10 py-3 rounded-xl text-xs focus:outline-none focus:border-cyan-500 border transition-all ${
                  isLight ? 'bg-slate-50 border-slate-300 text-slate-900 shadow-inner' : 'bg-slate-950 border-white/15 text-white'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-500 transition-colors focus:outline-none"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-400 text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center space-x-2 mt-2"
          >
            <span>{submitting ? 'Authenticating Master Admin...' : 'Unlock Admin CMS'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-4 border-t border-slate-200 dark:border-white/10 text-[11px] text-slate-500 flex items-center justify-center space-x-1">
          <Shield className="w-3.5 h-3.5 text-cyan-400" />
          <span>Secured by Pearl Dental Care Master Auth Engine</span>
        </div>
      </div>
    </div>
  );
}

export default function SecretAdmin15RandomPage() {
  return (
    <Suspense fallback={<div className="max-w-md mx-auto py-32 text-center text-slate-400">Loading Secret Admin Portal...</div>}>
      <SecretAdminLoginContent />
    </Suspense>
  );
}
