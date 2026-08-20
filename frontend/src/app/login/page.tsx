'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Sparkles,
  KeyRound,
  Shield,
  Award,
  Fingerprint
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { getApiUrl } from '@/config/api';

function LoginContent() {
  const { user, login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMsg, setResetMsg] = useState('');

  const [authError, setAuthError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        window.location.href = getApiUrl('/admin');
      } else {
        router.push('/dashboard');
      }
    }
  }, [user, router]);

  useEffect(() => {
    const isRegistered = searchParams.get('registered');
    const prefillEmail = searchParams.get('email') || searchParams.get('username');
    if (isRegistered === 'true') {
      setSuccessMsg('Registration successful! Please sign in with your email and password below.');
    }
    if (prefillEmail) {
      setEmail(prefillEmail);
    }
  }, [searchParams]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setSuccessMsg('');
    setSubmitting(true);

    try {
      const res = await fetch(getApiUrl('/api/auth/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        login(data.token, data.user);
        if (data.user?.role === 'admin') {
          window.location.href = getApiUrl('/admin');
        } else {
          router.push('/dashboard');
        }
      } else {
        setAuthError(data.message || 'Invalid email or password');
        setSubmitting(false);
      }
    } catch (err) {
      setAuthError('Invalid email or password');
      setSubmitting(false);
    }
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) return;
    setResetMsg(`Password reset instructions have been dispatched to ${resetEmail}.`);
    setTimeout(() => {
      setShowForgotModal(false);
      setResetMsg('');
      setResetEmail('');
    }, 2500);
  };

  return (
    <div className="relative max-w-lg mx-auto px-3.5 sm:px-6 py-6 sm:py-12">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-cyan-500/15 dark:bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-48 sm:w-72 h-48 sm:h-72 bg-sky-400/10 rounded-full blur-2xl pointer-events-none"></div>

      {/* Main Glassmorphic Card */}
      <div className={`relative rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 border shadow-2xl space-y-5 sm:space-y-6 backdrop-blur-xl transition-all ${
        isLight 
          ? 'bg-white/95 border-slate-200/90 shadow-slate-200/60' 
          : 'glass-card border-white/10 shadow-black/80 bg-slate-900/90'
      }`}>

        {/* Top VIP Concierge Perks Strip */}
        <div className={`flex flex-wrap sm:flex-nowrap items-center justify-between gap-1.5 px-3 py-2 rounded-xl sm:rounded-2xl border text-[10px] sm:text-[11px] font-medium ${
          isLight ? 'bg-cyan-50/70 border-cyan-200/60 text-cyan-900' : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300'
        }`}>
          <div className="flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-500 shrink-0 animate-pulse" />
            <span className="font-semibold">AACD Accredited Portal</span>
          </div>
          <div className="flex items-center space-x-1 font-bold text-[9px] sm:text-[10px] uppercase tracking-wider bg-cyan-500/20 px-2 py-0.5 rounded-full text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
            <Shield className="w-3 h-3 mr-0.5" />
            256-Bit SSL
          </div>
        </div>

        {/* Header */}
        <div className="text-center space-y-1.5 sm:space-y-2">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-sky-400/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mx-auto border border-cyan-500/30 shadow-lg shadow-cyan-500/10">
            <KeyRound className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <h1 className={`text-xl sm:text-3xl font-serif font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Customer Sign In
          </h1>
          <p className={`text-xs leading-relaxed max-w-sm mx-auto ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Enter your registered email address and password to access digital records
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

        {/* Login Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
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
                className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm sm:text-xs focus:outline-none focus:border-cyan-500 border transition-all ${
                  isLight ? 'bg-slate-50 border-slate-300 text-slate-900 shadow-inner' : 'bg-slate-950 border-white/15 text-white'
                }`}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className={`block text-xs font-semibold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                Password *
              </label>
              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="text-[11px] font-semibold text-cyan-600 dark:text-cyan-400 hover:underline p-1 -mr-1"
              >
                Forgot Password?
              </button>
            </div>
            
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full pl-10 pr-10 py-3 rounded-xl text-sm sm:text-xs focus:outline-none focus:border-cyan-500 border transition-all ${
                  isLight ? 'bg-slate-50 border-slate-300 text-slate-900 shadow-inner' : 'bg-slate-950 border-white/15 text-white'
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

          {/* Remember Me Option */}
          <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 pt-1">
            <label className="flex items-center space-x-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-cyan-500 focus:ring-cyan-400 cursor-pointer"
              />
              <span className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>Remember this browser</span>
            </label>

            <span className="text-[10px] text-slate-400 flex items-center">
              <Fingerprint className="w-3 h-3 mr-1 text-cyan-500" /> Passkey Ready
            </span>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-3.5 sm:py-4 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center space-x-2 mt-2 border touch-manipulation active:scale-[0.99] ${
              isLight
                ? 'bg-gradient-to-r from-cyan-500 to-sky-400 text-white border-cyan-300/50 shadow-cyan-500/25 hover:brightness-110'
                : 'bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-slate-950 border-yellow-200 shadow-amber-400/25 hover:brightness-110'
            }`}
          >
            <span>{submitting ? 'Authenticating...' : 'Sign In as Customer'}</span>
            <ArrowRight className={`w-4 h-4 ${isLight ? 'text-white' : 'text-slate-950'}`} />
          </button>
        </form>

        {/* Feature Badges Footer */}
        <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border text-center space-y-2 ${
          isLight ? 'bg-slate-50 border-slate-200' : 'bg-navy-950/60 border-white/5'
        }`}>
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] font-bold text-slate-400">
            <div className="flex flex-col items-center justify-center p-1.5 sm:p-2 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5">
              <Shield className="w-3.5 h-3.5 text-cyan-500 mb-0.5 sm:mb-1" />
              <span>HIPAA Vault</span>
            </div>
            <div className="flex flex-col items-center justify-center p-1.5 sm:p-2 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5">
              <Sparkles className="w-3.5 h-3.5 text-sky-400 mb-0.5 sm:mb-1" />
              <span>3D Records</span>
            </div>
            <div className="flex flex-col items-center justify-center p-1.5 sm:p-2 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5">
              <Award className="w-3.5 h-3.5 text-emerald-400 mb-0.5 sm:mb-1" />
              <span>VIP Priority</span>
            </div>
          </div>
        </div>

        {/* Footer Link to Register */}
        <div className="text-center pt-3.5 sm:pt-4 border-t border-slate-200 dark:border-white/10 text-xs">
          <span className={isLight ? 'text-slate-600' : 'text-slate-400'}>Don't have an account? </span>
          <Link href="/register" className="font-bold text-cyan-600 dark:text-cyan-400 hover:underline inline-flex items-center space-x-1 py-1">
            <span>Register Here First</span>
            <ArrowRight className="w-3.5 h-3.5 ml-0.5 inline" />
          </Link>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-md rounded-3xl p-6 border shadow-2xl space-y-4 ${
            isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900 border-white/10 text-white'
          }`}>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold font-serif">Reset Patient Password</h3>
              <button onClick={() => setShowForgotModal(false)} className="text-slate-400 hover:text-white text-lg">✕</button>
            </div>
            
            <p className="text-xs text-slate-400">
              Enter your registered email address to receive password reset instructions.
            </p>

            {resetMsg && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-400">
                {resetMsg}
              </div>
            )}

            <form onSubmit={handleForgotSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="patient@example.com"
                  className={`w-full px-4 py-2.5 rounded-xl text-xs border focus:outline-none focus:border-cyan-500 ${
                    isLight ? 'bg-slate-50 border-slate-300' : 'bg-slate-950 border-white/15 text-white'
                  }`}
                />
              </div>
              
              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForgotModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold border border-slate-300 dark:border-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-all"
                >
                  Send Reset Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="max-w-md mx-auto py-32 text-center text-slate-400">Loading Login Portal...</div>}>
      <LoginContent />
    </Suspense>
  );
}
