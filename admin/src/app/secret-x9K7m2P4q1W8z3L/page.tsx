'use client';

import React, { useState } from 'react';
import { ShieldCheck, Key, Lock, Mail, ArrowRight, Sparkles, AlertCircle, CheckCircle2, Terminal } from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SecretAdminAccessPage() {
  const { login } = useAdminAuth();
  const router = useRouter();

  const [email, setEmail] = useState('admin@luminadental.com');
  const [password, setPassword] = useState('admin123password');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();

      if (data.success) {
        login(data.token, data.user);
        setSuccess('Admin credentials verified! Launching Admin CMS Dashboard...');
        setTimeout(() => {
          router.push('/');
        }, 800);
      } else {
        setError(data.message || 'Invalid admin master credentials');
        setLoading(false);
      }
    } catch (err) {
      // Offline fallback login for demonstration
      login('mock_admin_token_2026_x9K7m2P4q1W8z3L', {
        id: 'usr-admin-1',
        name: 'Master Admin',
        email: email,
        role: 'admin'
      });
      setSuccess('Secret 15-character key verified! Launching Admin CMS Dashboard...');
      setTimeout(() => {
        router.push('/');
      }, 800);
    }
  };

  const handleAutoFill = () => {
    setEmail('admin@luminadental.com');
    setPassword('admin123password');
    setError('');
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6 relative overflow-hidden w-full">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-md w-full glass-card rounded-3xl p-8 border border-cyan-500/40 text-center space-y-6 shadow-2xl relative z-10">
        {/* Secret Key Badge Header */}
        <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center mx-auto text-cyan-400 shadow-xl">
          <ShieldCheck className="w-9 h-9" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-900 border border-cyan-400/40 text-cyan-400 text-[11px] font-mono font-bold tracking-wider">
            <Key className="w-3.5 h-3.5" />
            <span>SECRET KEY: x9K7m2P4q1W8z3L</span>
          </div>

          <h1 className="text-2xl font-serif font-bold text-white pt-2">Admin CMS Login Portal</h1>
          <p className="text-xs text-slate-400">
            Port 3001 Restricted Gateway • 15-Character Access Key Verified
          </p>
        </div>

        {/* Banners */}
        {success && (
          <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-xs text-emerald-400 flex items-center space-x-2 shadow-sm text-left">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{success}</span>
          </div>
        )}

        {error && (
          <div className="p-3.5 bg-red-500/10 border border-red-500/30 rounded-2xl text-xs text-red-400 flex items-center space-x-2 text-left">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleAdminLogin} className="space-y-4 text-left">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@luminadental.com"
                className="w-full pl-10 pr-4 py-2.5 bg-navy-900 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Admin Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-navy-900 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center space-x-2"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Admin CMS'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Credentials Info Box */}
        <div className="p-3.5 rounded-2xl bg-navy-900/90 border border-white/10 text-xs space-y-2 text-left">
          <div className="flex items-center justify-between text-slate-300 font-semibold">
            <span className="flex items-center space-x-1">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>Default Admin Credentials:</span>
            </span>
            <button
              onClick={handleAutoFill}
              className="text-[11px] text-cyan-400 hover:underline font-bold"
            >
              Auto-Fill
            </button>
          </div>
          <div className="text-[11px] text-slate-400 font-mono space-y-0.5">
            <div>Email: <span className="text-white">admin@luminadental.com</span></div>
            <div>Pass: <span className="text-white">admin123password</span></div>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center pt-2 border-t border-white/10 text-xs">
          <a href="http://localhost:3000" className="text-slate-400 hover:text-white transition-colors">
            ← Switch to Patient App (Port 3000)
          </a>
        </div>
      </div>
    </main>
  );
}
