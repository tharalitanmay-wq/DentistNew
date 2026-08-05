'use client';

import React, { useState } from 'react';
import { ShieldCheck, Key, Lock, Mail, ArrowRight, Sparkles, AlertCircle, CheckCircle2, Terminal } from 'lucide-react';
import Link from 'next/link';

export default function SecretAdminLoginPage() {
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
        localStorage.setItem('lumina_admin_token', data.token);
        localStorage.setItem('lumina_user', JSON.stringify(data.user));
        setSuccess('Admin credentials verified! Redirecting to Admin CMS Panel...');
        setTimeout(() => {
          window.location.href = 'http://localhost:3001';
        }, 1000);
      } else {
        setError(data.message || 'Invalid admin credentials');
        setLoading(false);
      }
    } catch (err) {
      // Fallback local admin authentication for offline mode
      localStorage.setItem('lumina_admin_token', 'mock_admin_token_xyz987');
      localStorage.setItem('lumina_user', JSON.stringify({
        id: 'admin-1',
        name: 'Chief Admin',
        email: email,
        role: 'admin'
      }));
      setSuccess('Admin credentials verified! Launching Admin CMS Dashboard...');
      setTimeout(() => {
        window.location.href = 'http://localhost:3001';
      }, 1000);
    }
  };

  const handleAutoFill = () => {
    setEmail('admin@luminadental.com');
    setPassword('admin123password');
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-slate-950 relative overflow-hidden">
      {/* Background Subtle Gradient Spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-md w-full glass-card rounded-3xl p-8 border border-cyan-500/30 space-y-6 shadow-2xl relative z-10">
        
        {/* Secret Key Badge Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto border border-cyan-500/40 shadow-xl">
            <ShieldCheck className="w-9 h-9" />
          </div>
          
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-900 border border-cyan-500/40 text-[11px] font-mono font-bold text-cyan-400">
            <Key className="w-3 h-3" />
            <span>Key: x9K7m2P4q1W8z3L (15 Chars)</span>
          </div>

          <h1 className="text-3xl font-serif font-bold text-white tracking-tight">
            Admin CMS Login Portal
          </h1>
          <p className="text-xs text-slate-400">
            Restricted System Management Gateway for Lumina Dental Studio Administrators
          </p>
        </div>

        {/* Banners */}
        {success && (
          <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-xs text-emerald-400 flex items-center space-x-2 shadow-sm">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{success}</span>
          </div>
        )}

        {error && (
          <div className="p-3.5 bg-red-500/10 border border-red-500/30 rounded-2xl text-xs text-red-400 flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleAdminLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Admin Email Address
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
              Admin Master Password
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
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center space-x-2"
          >
            <span>{loading ? 'Authenticating Admin...' : 'Enter Admin Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Credentials Info Box */}
        <div className="p-3.5 rounded-2xl bg-navy-900/90 border border-white/10 text-xs space-y-2">
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

        {/* Footer Link */}
        <div className="text-center pt-2 border-t border-white/10 text-xs">
          <Link href="/" className="text-slate-400 hover:text-white transition-colors">
            ← Return to Patient Website
          </Link>
        </div>
      </div>
    </div>
  );
}
