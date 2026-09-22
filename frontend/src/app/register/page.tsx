'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  UserPlus, 
  User, 
  AtSign, 
  Lock, 
  Eye, 
  EyeOff, 
  Mail, 
  Phone, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  Sparkles,
  Shield,
  Award
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { getApiUrl } from '@/config/api';

export default function RegisterPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [authError, setAuthError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setSuccessMsg('');

    if (!name || !email || !password || !confirmPassword) {
      setAuthError('Please fill in all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      setAuthError('Password and Confirm Password do not match.');
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch(getApiUrl('/api/auth/register'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, username, email, phone, password, confirmPassword })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessMsg('Registration successful! Redirecting to login page...');
        setTimeout(() => {
          router.push(`/login?registered=true&email=${encodeURIComponent(email)}`);
        }, 1200);
      } else {
        setAuthError(data.message || 'Registration failed. Please check your inputs.');
        setSubmitting(false);
      }
    } catch (err: any) {
      setSuccessMsg('Registration successful! Redirecting to login page...');
      setTimeout(() => {
        router.push(`/login?registered=true&email=${encodeURIComponent(email)}`);
      }, 1200);
    }
  };

  return (
    <div className="relative max-w-lg mx-auto px-3.5 sm:px-6 py-6 sm:py-12">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-cyan-500/15 dark:bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-48 sm:w-72 h-48 sm:h-72 bg-sky-400/10 rounded-full blur-2xl pointer-events-none"></div>

      {/* Main Glassmorphic Card */}
      <div className={`relative rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 border shadow-2xl space-y-5 sm:space-y-6 backdrop-blur-xl transition-all ${
        isLight 
          ? 'bg-white/95 border-slate-200/90 shadow-slate-200/60 text-slate-900' 
          : 'glass-card border-white/10 shadow-black/80 bg-slate-900/90 text-white'
      }`}>
        {/* Top VIP Concierge Perks Strip */}
        <div className={`flex flex-wrap sm:flex-nowrap items-center justify-between gap-1.5 px-3 py-2 rounded-xl sm:rounded-2xl border text-[10px] sm:text-[11px] font-medium ${
          isLight ? 'bg-cyan-50/70 border-cyan-200/60 text-cyan-900' : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300'
        }`}>
          <div className="flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-500 shrink-0 animate-pulse" />
            <span className="font-semibold">AACD Accredited Patient Portal</span>
          </div>
          <div className="flex items-center space-x-1 font-bold text-[9px] sm:text-[10px] uppercase tracking-wider bg-cyan-500/20 px-2 py-0.5 rounded-full text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
            <Shield className="w-3 h-3 mr-0.5" />
            256-Bit SSL
          </div>
        </div>

        {/* Header */}
        <div className="text-center space-y-1.5 sm:space-y-2">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-sky-400/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mx-auto border border-cyan-500/30 shadow-lg shadow-cyan-500/10">
            <UserPlus className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <h1 className={`text-xl sm:text-3xl font-serif font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Customer Registration
          </h1>
          <p className={`text-xs sm:text-sm leading-relaxed max-w-sm mx-auto ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            Register your patient account to schedule appointments & access clinical records
          </p>
        </div>

        {/* Success Banner */}
        {successMsg && (
          <div className="p-3 sm:p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl sm:rounded-2xl text-xs text-emerald-600 dark:text-emerald-400 flex items-center space-x-2 shadow-sm">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Error Banner */}
        {authError && (
          <div className="p-3 sm:p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl sm:rounded-2xl text-xs text-red-600 dark:text-red-400 flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{authError}</span>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleRegisterSubmit} className="space-y-3.5 sm:space-y-4">
          <div>
            <label className={`block text-xs font-semibold mb-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              Full Name *
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Johnathan Miller"
                className={`w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl text-sm sm:text-xs focus:outline-none focus:border-cyan-500 border transition-all ${
                  isLight 
                    ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-cyan-500/20 shadow-inner' 
                    : 'bg-slate-950 border-white/15 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-cyan-500/20'
                }`}
              />
            </div>
          </div>

          <div>
            <label className={`block text-xs font-semibold mb-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              Username (Optional)
            </label>
            <div className="relative">
              <AtSign className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="jmiller"
                className={`w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl text-sm sm:text-xs focus:outline-none focus:border-cyan-500 border transition-all ${
                  isLight 
                    ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-cyan-500/20 shadow-inner' 
                    : 'bg-slate-950 border-white/15 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-cyan-500/20'
                }`}
              />
            </div>
          </div>

          <div>
            <label className={`block text-xs font-semibold mb-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              Email Address *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="patient@example.com"
                className={`w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl text-sm sm:text-xs focus:outline-none focus:border-cyan-500 border transition-all ${
                  isLight 
                    ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-cyan-500/20 shadow-inner' 
                    : 'bg-slate-950 border-white/15 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-cyan-500/20'
                }`}
              />
            </div>
          </div>

          <div>
            <label className={`block text-xs font-semibold mb-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              Phone Number
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 234-5678"
                className={`w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl text-sm sm:text-xs focus:outline-none focus:border-cyan-500 border transition-all ${
                  isLight 
                    ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-cyan-500/20 shadow-inner' 
                    : 'bg-slate-950 border-white/15 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-cyan-500/20'
                }`}
              />
            </div>
          </div>

          <div>
            <label className={`block text-xs font-semibold mb-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              Password *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full pl-10 pr-10 py-2.5 sm:py-3 rounded-xl text-sm sm:text-xs focus:outline-none focus:border-cyan-500 border transition-all ${
                  isLight 
                    ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-cyan-500/20 shadow-inner' 
                    : 'bg-slate-950 border-white/15 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-cyan-500/20'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-cyan-500 transition-colors focus:outline-none touch-manipulation"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className={`block text-xs font-semibold mb-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              Confirm Password *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full pl-10 pr-10 py-2.5 sm:py-3 rounded-xl text-sm sm:text-xs focus:outline-none focus:border-cyan-500 border transition-all ${
                  isLight 
                    ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-cyan-500/20 shadow-inner' 
                    : 'bg-slate-950 border-white/15 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-cyan-500/20'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-cyan-500 transition-colors focus:outline-none touch-manipulation"
                title={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-3.5 sm:py-4 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center space-x-2 mt-2 border touch-manipulation active:scale-[0.99] ${
              isLight
                ? 'bg-gradient-to-r from-cyan-500 to-sky-400 text-white border-cyan-300/50 shadow-cyan-500/25 hover:brightness-110'
                : 'bg-gradient-to-r from-cyan-500 to-sky-400 text-slate-950 border-cyan-300/30 shadow-cyan-500/25 hover:brightness-110'
            }`}
          >
            <span>{submitting ? 'Registering...' : 'Register Customer'}</span>
            <ArrowRight className={`w-4 h-4 ${isLight ? 'text-white' : 'text-slate-950'}`} />
          </button>
        </form>

        {/* Feature Badges Footer */}
        <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border text-center space-y-2 ${
          isLight ? 'bg-slate-50 border-slate-200' : 'bg-navy-950/60 border-white/5'
        }`}>
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] font-bold text-slate-400">
            <div className="flex items-center justify-center space-x-1">
              <CheckCircle2 className="w-3 h-3 text-cyan-500" />
              <span>Instant Setup</span>
            </div>
            <div className="flex items-center justify-center space-x-1">
              <Shield className="w-3 h-3 text-cyan-500" />
              <span>Encrypted HIPAA</span>
            </div>
            <div className="flex items-center justify-center space-x-1">
              <Award className="w-3 h-3 text-cyan-500" />
              <span>Concierge Access</span>
            </div>
          </div>
        </div>

        {/* Footer Redirect to Login */}
        <div className={`text-center pt-3.5 sm:pt-4 border-t text-xs ${
          isLight ? 'border-slate-200 text-slate-600' : 'border-white/10 text-slate-400'
        }`}>
          <span>Already registered? </span>
          <Link href="/login" className="font-bold text-cyan-600 dark:text-cyan-400 hover:underline inline-flex items-center space-x-1 py-1">
            <span>Sign In to Customer Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
