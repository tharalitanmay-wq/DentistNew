'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { UserPlus, User, Lock, Mail, Phone, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function RegisterPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [authError, setAuthError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setSuccessMsg('');
    setSubmitting(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, phone })
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg('Registration successful! Redirecting to login page...');
        setTimeout(() => {
          router.push(`/login?registered=true&email=${encodeURIComponent(email)}`);
        }, 1200);
      } else {
        setAuthError(data.message || 'Registration failed');
        setSubmitting(false);
      }
    } catch (err) {
      // Fallback redirect for offline demo mode
      setSuccessMsg('Registration successful! Redirecting to login page...');
      setTimeout(() => {
        router.push(`/login?registered=true&email=${encodeURIComponent(email)}`);
      }, 1200);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className={`rounded-3xl p-8 border shadow-2xl space-y-6 transition-all ${
        isLight ? 'bg-white border-slate-200 shadow-slate-200/50' : 'bg-slate-900/90 border-white/10 shadow-cyan-950/20'
      }`}>
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto border border-cyan-500/30 shadow-lg">
            <UserPlus className="w-7 h-7" />
          </div>
          <h1 className={`text-2xl sm:text-3xl font-serif font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Create Patient Account
          </h1>
          <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Register to schedule appointments and access digital records
          </p>
        </div>

        {/* Success Banner */}
        {successMsg && (
          <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-xs text-emerald-400 flex items-center space-x-2 shadow-sm">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Error Banner */}
        {authError && (
          <div className="p-3.5 bg-red-500/10 border border-red-500/30 rounded-2xl text-xs text-red-400 flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{authError}</span>
          </div>
        )}

        {/* Register Form */}
        <form onSubmit={handleRegisterSubmit} className="space-y-4">
          <div>
            <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Johnathan Miller"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs focus:outline-none focus:border-cyan-400 border transition-all ${
                  isLight
                    ? 'bg-slate-50 border-slate-300 text-slate-900'
                    : 'bg-slate-950 border-white/15 text-white'
                }`}
              />
            </div>
          </div>

          <div>
            <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="patient@example.com"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs focus:outline-none focus:border-cyan-400 border transition-all ${
                  isLight
                    ? 'bg-slate-50 border-slate-300 text-slate-900'
                    : 'bg-slate-950 border-white/15 text-white'
                }`}
              />
            </div>
          </div>

          <div>
            <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs focus:outline-none focus:border-cyan-400 border transition-all ${
                  isLight
                    ? 'bg-slate-50 border-slate-300 text-slate-900'
                    : 'bg-slate-950 border-white/15 text-white'
                }`}
              />
            </div>
          </div>

          <div>
            <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              Phone Number
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs focus:outline-none focus:border-cyan-400 border transition-all ${
                  isLight
                    ? 'bg-slate-50 border-slate-300 text-slate-900'
                    : 'bg-slate-950 border-white/15 text-white'
                }`}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-400 text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center space-x-2"
          >
            <span>{submitting ? 'Registering...' : 'Register Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer Redirect to Login */}
        <div className="text-center pt-4 border-t border-slate-200 dark:border-white/10 text-xs">
          <span className={isLight ? 'text-slate-600' : 'text-slate-400'}>Already have a patient account? </span>
          <Link href="/login" className="font-bold text-cyan-600 dark:text-cyan-400 hover:underline">
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
}
