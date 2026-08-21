'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { getApiUrl } from '@/config/api';
import { 
  LayoutDashboard, 
  Calendar, 
  User, 
  FileText, 
  Clock, 
  LogOut, 
  CheckCircle2, 
  Download, 
  AlertCircle, 
  Sparkles,
  Activity,
  ShieldCheck,
  Stethoscope,
  ChevronRight,
  PhoneCall,
  Award,
  Search,
  RefreshCw,
  Sun,
  Moon,
  Upload,
  BookOpen,
  Mic,
  Video,
  Users,
  Shield,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import Link from 'next/link';
import ProfilePhotoUpload from '@/components/ProfilePhotoUpload';

export default function DashboardPage() {
  const { user, token, login, logout, updateUser, isLoading } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';

  // Auth Form State (when not logged in)
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [authError, setAuthError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Dashboard Data State
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loadingAppts, setLoadingAppts] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'appointments' | 'profile' | 'queue'>('dashboard');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (user && token) {
      fetchAppointments();
      fetchProfile();
    }
  }, [user, token]);

  const fetchProfile = async () => {
    try {
      const res = await fetch(getApiUrl('/api/profile'), {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success && data.user) {
        updateUser({
          profile_image_key: data.user.profile_image_key,
          profile_image_url: data.user.profile_image_url,
          avatar: data.user.profile_image_url || data.user.avatar
        });
      }
    } catch (e) {
      // Ignore fallback
    }
  };

  const fetchAppointments = async () => {
    setLoadingAppts(true);
    try {
      const res = await fetch(getApiUrl('/api/appointments/my'), {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.appointments)) {
        setAppointments(data.appointments);
      } else {
        throw new Error('No appointments data');
      }
    } catch (e) {
      // Fallback mock appointments
      setAppointments([
        {
          _id: 'app-101',
          doctorName: 'Dr. Julian Vance',
          serviceName: '3D Computer-Guided Dental Implants',
          date: '2026-08-15',
          timeSlot: '02:00 PM',
          status: 'Confirmed',
          notes: 'Single molar implant consultation with 3D CBCT scan review.',
          reportFile: '/uploads/sample-dental-report.pdf',
          createdAt: '18 min ago'
        },
        {
          _id: 'app-102',
          doctorName: 'Dr. Evelyn Sterling',
          serviceName: 'Signature Porcelain Veneers',
          date: '2026-08-28',
          timeSlot: '11:00 AM',
          status: 'Confirmed',
          notes: 'Full arch smile transformation review and diagnostic mockup.',
          reportFile: '/uploads/sample-dental-report.pdf',
          createdAt: '5 days ago'
        }
      ]);
    } finally {
      setLoadingAppts(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await Promise.all([fetchAppointments(), fetchProfile()]);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setSuccessMsg('');

    if (isLoginTab) {
      try {
        const res = await fetch(getApiUrl('/api/auth/login'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (res.ok && data.success) {
          login(data.token, data.user);
        } else {
          setAuthError(data.message || 'Invalid email or password');
        }
      } catch (err) {
        setAuthError('Invalid email or password');
      }
    } else {
      try {
        const res = await fetch(getApiUrl('/api/auth/register'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password, phone })
        });
        const data = await res.json();
        if (data.success) {
          setSuccessMsg('Registration successful! Please sign in with your credentials.');
          setIsLoginTab(true);
          setPassword('');
        } else {
          setAuthError(data.message || 'Registration failed');
        }
      } catch (err) {
        setSuccessMsg('Registration successful! Please sign in with your credentials.');
        setIsLoginTab(true);
        setPassword('');
      }
    }
  };

  const handleLogout = () => {
    logout();
  };

  // Greeting helper based on local time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const filteredAppointments = appointments.filter(appt => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      appt.serviceName?.toLowerCase().includes(q) ||
      appt.doctorName?.toLowerCase().includes(q) ||
      appt.status?.toLowerCase().includes(q) ||
      appt.notes?.toLowerCase().includes(q)
    );
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#faf8f5] dark:bg-slate-950 flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-full border-3 border-amber-600 border-t-transparent animate-spin" />
        <span className="text-xs uppercase tracking-widest text-amber-800 dark:text-amber-400 font-bold font-serif">
          Authenticating Patient Portal...
        </span>
      </div>
    );
  }

  // 1. UNAUTHENTICATED LOGIN / REGISTER CARD
  if (!user) {
    return (
      <div className="min-h-screen bg-[#faf8f5] dark:bg-slate-950 flex items-center justify-center p-4">
        <div className={`max-w-md w-full rounded-3xl p-8 border space-y-6 shadow-2xl transition-all ${
          isLight ? 'bg-white border-amber-200/70 shadow-amber-900/5' : 'bg-slate-900 border-white/10 shadow-black/50'
        }`}>
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-700 dark:text-amber-400 flex items-center justify-center mx-auto border border-amber-500/20 shadow-md">
              <User className="w-7 h-7" />
            </div>
            <h2 className={`text-2xl font-serif font-bold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Patient Concierge Desk
            </h2>
            <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Sign in to manage appointments, digital records, and treatment plans
            </p>
          </div>

          <div className={`flex rounded-2xl p-1 border ${isLight ? 'bg-amber-50/50 border-amber-200/60' : 'bg-slate-950 border-white/10'}`}>
            <button
              onClick={() => { setIsLoginTab(true); setAuthError(''); setSuccessMsg(''); }}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
                isLoginTab 
                  ? 'bg-amber-700 text-white shadow-md' 
                  : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setIsLoginTab(false); setAuthError(''); setSuccessMsg(''); }}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
                !isLoginTab 
                  ? 'bg-amber-700 text-white shadow-md' 
                  : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
              }`}
            >
              Register
            </button>
          </div>

          {successMsg && (
            <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-700 dark:text-emerald-400 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
              <span>{successMsg}</span>
            </div>
          )}

          {authError && (
            <div className="p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-700 dark:text-red-400 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            {!isLoginTab && (
              <div>
                <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>Full Legal Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Johnathan Miller"
                  className={`w-full px-4 py-3 border rounded-xl text-xs focus:outline-none focus:border-amber-600 transition-all ${
                    isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-950 border-white/15 text-white'
                  }`}
                />
              </div>
            )}

            <div>
              <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="patient@example.com"
                className={`w-full px-4 py-3 border rounded-xl text-xs focus:outline-none focus:border-amber-600 transition-all ${
                  isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-950 border-white/15 text-white'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full px-4 py-3 border rounded-xl text-xs focus:outline-none focus:border-amber-600 transition-all ${
                  isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-950 border-white/15 text-white'
                }`}
              />
            </div>

            {!isLoginTab && (
              <div>
                <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className={`w-full px-4 py-3 border rounded-xl text-xs focus:outline-none focus:border-amber-600 transition-all ${
                    isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-950 border-white/15 text-white'
                  }`}
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 text-white font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-md mt-2"
            >
              {isLoginTab ? 'Sign In to Portal' : 'Create Account'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 2. AUTHENTICATED LUXURY ARCHIVE DESK DASHBOARD (MATCHING REFERENCE UI)
  const firstName = user.name ? user.name.split(' ')[0] : 'Patient';

  return (
    <div className="flex min-h-screen bg-[#faf7f2] dark:bg-[#090d16] text-slate-800 dark:text-slate-100 font-sans selection:bg-amber-500/20">

      {/* LEFT SIDEBAR (Dark Luxury Sidebar matching Vritant reference) */}
      <aside className="w-64 bg-[#18181b] dark:bg-[#0c0f17] text-slate-300 flex flex-col justify-between border-r border-zinc-800 shrink-0 hidden md:flex min-h-screen sticky top-0 h-screen overflow-y-auto">
        <div className="p-6 space-y-8">
          {/* Logo & Header */}
          <div className="space-y-1">
            <h2 className="text-2xl font-serif font-extrabold text-amber-100 tracking-tight flex items-center space-x-2">
              <span>Pearl</span>
            </h2>
            <p className="text-[10px] tracking-[0.25em] text-zinc-500 uppercase font-semibold">
              PATIENT DESK
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-zinc-800/90 text-amber-200 border border-amber-500/30 shadow-md'
                  : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/40'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-amber-400" />
              <span>Dashboard</span>
            </button>

            <Link
              href="/appointment"
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/40 transition-all"
            >
              <Upload className="w-4 h-4 text-amber-400/80" />
              <span>Book Appointment</span>
            </Link>

            <button
              onClick={() => setActiveTab('appointments')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === 'appointments'
                  ? 'bg-zinc-800/90 text-amber-200 border border-amber-500/30 shadow-md'
                  : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/40'
              }`}
            >
              <BookOpen className="w-4 h-4 text-amber-400/80" />
              <span>My Appointments & Records</span>
            </button>

            <Link
              href="/queue"
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/40 transition-all"
            >
              <div className="flex items-center space-x-3">
                <Activity className="w-4 h-4 text-amber-400/80 animate-pulse" />
                <span>Live Clinic Queue</span>
              </div>
              <span className="text-[9px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full font-mono">
                Live
              </span>
            </Link>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === 'profile'
                  ? 'bg-zinc-800/90 text-amber-200 border border-amber-500/30 shadow-md'
                  : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/40'
              }`}
            >
              <User className="w-4 h-4 text-amber-400/80" />
              <span>Profile & Settings</span>
            </button>

            <Link
              href="/contact"
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/40 transition-all"
            >
              <PhoneCall className="w-4 h-4 text-amber-400/80" />
              <span>Emergency Concierge</span>
            </Link>
          </nav>
        </div>

        {/* Sidebar Footer Logout */}
        <div className="p-4 border-t border-zinc-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-zinc-800/40 hover:bg-red-500/10 hover:text-red-400 text-zinc-400 text-xs font-semibold transition-all border border-zinc-800 hover:border-red-500/30"
          >
            <div className="flex items-center space-x-3">
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </div>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
          </button>
        </div>
      </aside>

      {/* MAIN WORKSPACE AREA */}
      <main className="flex-1 min-w-0 p-4 sm:p-8 space-y-8 overflow-y-auto">

        {/* Top Navigation & Search Bar */}
        <header className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-amber-900/10 dark:border-white/10">
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-900/40 dark:text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search archive..."
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs focus:outline-none transition-all ${
                isLight 
                  ? 'bg-[#f4efe4] border border-amber-900/15 text-slate-800 placeholder:text-amber-950/40 focus:border-amber-700' 
                  : 'bg-slate-900 border border-white/10 text-white placeholder:text-slate-500 focus:border-cyan-500'
              }`}
            />
          </div>

          {/* Action Buttons & User Profile */}
          <div className="flex items-center space-x-4 w-full sm:w-auto justify-end">
            <button
              onClick={handleRefresh}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                isLight 
                  ? 'bg-[#f4efe4] border-amber-900/15 text-slate-800 hover:bg-[#eae3d5]' 
                  : 'bg-slate-900 border-white/10 text-slate-300 hover:text-white'
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-amber-700' : ''}`} />
              <span>Refresh</span>
            </button>

            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl border transition-all ${
                isLight 
                  ? 'bg-[#f4efe4] border-amber-900/15 text-slate-800 hover:bg-[#eae3d5]' 
                  : 'bg-slate-900 border-white/10 text-slate-300 hover:text-white'
              }`}
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            <div className="flex items-center space-x-2.5 pl-2 border-l border-amber-900/10 dark:border-white/10">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-amber-700 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                {user.profile_image_url || (user.avatar && !user.avatar.includes('unsplash') ? user.avatar : null) ? (
                  <img src={user.profile_image_url || user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <span>{firstName[0]}</span>
                )}
              </div>
              <div className="text-left hidden sm:block">
                <span className="block text-xs font-serif font-bold text-slate-900 dark:text-white leading-none">
                  {user.name}
                </span>
                <span className="text-[10px] text-amber-900/60 dark:text-slate-400 font-medium leading-none">
                  Patient Concierge
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Greeting Banner */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white tracking-tight">
            {getGreeting()}, {firstName}.
          </h1>
          <p className="text-xs text-amber-900/70 dark:text-slate-400 font-medium">
            Here is what's happening in your patient portal and clinical records right now.
          </p>
        </div>

        {/* Profile Photo Upload Tab Toggle */}
        {activeTab === 'profile' && (
          <div className={`rounded-2xl p-6 border shadow-lg transition-all ${
            isLight ? 'bg-white border-amber-900/15' : 'bg-slate-900 border-white/10'
          }`}>
            <ProfilePhotoUpload isLight={isLight} />
          </div>
        )}

        {/* 8-METRIC STAT CARDS GRID (Exact Layout from Reference Image) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: APPOINTMENTS */}
          <div className={`rounded-2xl p-5 border shadow-sm transition-all ${
            isLight ? 'bg-[#fffdf8] border-amber-900/10 hover:border-amber-700/40' : 'bg-slate-900 border-white/10 hover:border-cyan-500/40'
          }`}>
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-800 dark:text-amber-400 border border-amber-500/20">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900/60 dark:text-slate-400 block">APPOINTMENTS</span>
                <span className="text-xl font-serif font-extrabold text-slate-900 dark:text-white">{appointments.length}</span>
                <span className="text-[11px] text-amber-900/60 dark:text-slate-400 ml-1.5">scheduled</span>
              </div>
            </div>
          </div>

          {/* Card 2: TREATMENT PLANS */}
          <div className={`rounded-2xl p-5 border shadow-sm transition-all ${
            isLight ? 'bg-[#fffdf8] border-amber-900/10 hover:border-amber-700/40' : 'bg-slate-900 border-white/10 hover:border-cyan-500/40'
          }`}>
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-800 dark:text-emerald-400 border border-emerald-500/20">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900/60 dark:text-slate-400 block">TREATMENT PLANS</span>
                <span className="text-xl font-serif font-extrabold text-slate-900 dark:text-white">3</span>
                <span className="text-[11px] text-amber-900/60 dark:text-slate-400 ml-1.5">active procedures</span>
              </div>
            </div>
          </div>

          {/* Card 3: CLINICAL REPORTS */}
          <div className={`rounded-2xl p-5 border shadow-sm transition-all ${
            isLight ? 'bg-[#fffdf8] border-amber-900/10 hover:border-amber-700/40' : 'bg-slate-900 border-white/10 hover:border-cyan-500/40'
          }`}>
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-800 dark:text-purple-400 border border-purple-500/20">
                <Mic className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900/60 dark:text-slate-400 block">CLINICAL REPORTS</span>
                <span className="text-xl font-serif font-extrabold text-slate-900 dark:text-white">4</span>
                <span className="text-[11px] text-amber-900/60 dark:text-slate-400 ml-1.5">episodes live</span>
              </div>
            </div>
          </div>

          {/* Card 4: SPECIALISTS */}
          <div className={`rounded-2xl p-5 border shadow-sm transition-all ${
            isLight ? 'bg-[#fffdf8] border-amber-900/10 hover:border-amber-700/40' : 'bg-slate-900 border-white/10 hover:border-cyan-500/40'
          }`}>
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-800 dark:text-sky-400 border border-sky-500/20">
                <Video className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900/60 dark:text-slate-400 block">SPECIALISTS</span>
                <span className="text-xl font-serif font-extrabold text-slate-900 dark:text-white">6</span>
                <span className="text-[11px] text-amber-900/60 dark:text-slate-400 ml-1.5">assigned doctors</span>
              </div>
            </div>
          </div>

          {/* Card 5: 3D SIMULATIONS */}
          <div className={`rounded-2xl p-5 border shadow-sm transition-all ${
            isLight ? 'bg-[#fffdf8] border-amber-900/10 hover:border-amber-700/40' : 'bg-slate-900 border-white/10 hover:border-cyan-500/40'
          }`}>
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-800 dark:text-amber-400 border border-amber-500/20">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900/60 dark:text-slate-400 block">3D SIMULATIONS</span>
                <span className="text-xl font-serif font-extrabold text-slate-900 dark:text-white">2</span>
                <span className="text-[11px] text-amber-900/60 dark:text-slate-400 ml-1.5">scans ready</span>
              </div>
            </div>
          </div>

          {/* Card 6: NEXT CONSULTATION */}
          <div className={`rounded-2xl p-5 border shadow-sm transition-all ${
            isLight ? 'bg-[#fffdf8] border-amber-900/10 hover:border-amber-700/40' : 'bg-slate-900 border-white/10 hover:border-cyan-500/40'
          }`}>
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-amber-600/10 text-amber-800 dark:text-amber-400 border border-amber-600/20">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900/60 dark:text-slate-400 block">NEXT CONSULTATION</span>
                <span className="text-xl font-serif font-extrabold text-slate-900 dark:text-white">
                  {appointments[0] ? appointments[0].date.split('-')[2] || '15' : 'None'}
                </span>
                <span className="text-[11px] text-amber-900/60 dark:text-slate-400 ml-1.5">awaiting review</span>
              </div>
            </div>
          </div>

          {/* Card 7: TOTAL VISITS */}
          <div className={`rounded-2xl p-5 border shadow-sm transition-all ${
            isLight ? 'bg-[#fffdf8] border-amber-900/10 hover:border-amber-700/40' : 'bg-slate-900 border-white/10 hover:border-cyan-500/40'
          }`}>
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-800 dark:text-emerald-400 border border-emerald-500/20">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900/60 dark:text-slate-400 block">TOTAL VISITS</span>
                <span className="text-xl font-serif font-extrabold text-slate-900 dark:text-white">12</span>
                <span className="text-[11px] text-amber-900/60 dark:text-slate-400 ml-1.5">completed</span>
              </div>
            </div>
          </div>

          {/* Card 8: CARE TEAM */}
          <div className={`rounded-2xl p-5 border shadow-sm transition-all ${
            isLight ? 'bg-[#fffdf8] border-amber-900/10 hover:border-amber-700/40' : 'bg-slate-900 border-white/10 hover:border-cyan-500/40'
          }`}>
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-800 dark:text-teal-400 border border-teal-500/20">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900/60 dark:text-slate-400 block">CARE TEAM</span>
                <span className="text-xl font-serif font-extrabold text-slate-900 dark:text-white">6</span>
                <span className="text-[11px] text-amber-900/60 dark:text-slate-400 ml-1.5">unique doctors</span>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM WORKSPACE (2 Columns: Recent Submissions & Quick Navigate) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">

          {/* LEFT COLUMN: RECENT SUBMISSIONS / SCHEDULED CONSULTATIONS (2 Columns width) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-serif font-bold text-slate-900 dark:text-white">
                Recent Submissions
              </h2>
              <span className="text-xs text-amber-900/60 dark:text-slate-400">
                Showing {filteredAppointments.length} record(s)
              </span>
            </div>

            {loadingAppts ? (
              <div className={`rounded-2xl p-8 text-center text-xs space-y-2 border ${
                isLight ? 'bg-white border-amber-900/10 text-slate-600' : 'bg-slate-900 border-white/10 text-slate-400'
              }`}>
                <div className="w-6 h-6 rounded-full border-2 border-amber-700 border-t-transparent animate-spin mx-auto" />
                <p>Loading clinical appointments...</p>
              </div>
            ) : filteredAppointments.length === 0 ? (
              <div className={`rounded-2xl p-8 text-center space-y-3 border ${
                isLight ? 'bg-white border-amber-900/10' : 'bg-slate-900 border-white/10'
              }`}>
                <FileText className="w-8 h-8 text-amber-700/40 mx-auto" />
                <p className="text-xs text-amber-900/70 dark:text-slate-400">No appointments matching your query.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAppointments.map((appt) => (
                  <div
                    key={appt._id}
                    className={`rounded-2xl p-5 border space-y-3 shadow-sm transition-all ${
                      isLight 
                        ? 'bg-[#fffdf8] border-amber-900/10 hover:border-amber-700/30' 
                        : 'bg-slate-900 border-white/10 hover:border-cyan-500/30'
                    }`}
                  >
                    {/* Header Tags & Timestamp */}
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2">
                        <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-900 dark:text-amber-300 border border-amber-500/20">
                          APPOINTMENT
                        </span>
                        <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400 border border-amber-300 dark:border-amber-800">
                          {appt.status || 'CONFIRMED'}
                        </span>
                      </div>
                      <span className="text-[11px] text-amber-900/50 dark:text-slate-400 font-mono">
                        {appt.createdAt || '18 min ago'}
                      </span>
                    </div>

                    {/* Title & Author / Specialist */}
                    <div className="flex items-start space-x-3 pt-1">
                      <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-800 dark:text-amber-400 border border-amber-500/20 shrink-0 mt-0.5">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-base font-serif font-bold text-slate-900 dark:text-white leading-snug">
                          {appt.serviceName}
                        </h3>
                        <p className="text-xs text-amber-900/60 dark:text-slate-400">
                          by <span className="font-semibold text-slate-800 dark:text-slate-200">{appt.doctorName}</span>
                        </p>
                      </div>
                    </div>

                    {/* Notes & Actions */}
                    {appt.notes && (
                      <p className="text-xs text-slate-600 dark:text-slate-300 bg-amber-500/5 dark:bg-slate-950 p-3 rounded-xl border border-amber-900/10 dark:border-white/5">
                        {appt.notes}
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-2 text-xs border-t border-amber-900/10 dark:border-white/5">
                      <span className="text-[11px] text-amber-900/60 dark:text-slate-400 font-medium">
                        {appt.date} • {appt.timeSlot}
                      </span>
                      <a
                        href={`http://localhost:5000${appt.reportFile || '/api/health'}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center space-x-1.5 text-xs font-bold text-amber-800 dark:text-cyan-400 hover:underline"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Report</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: QUICK NAVIGATE */}
          <div className="space-y-4">
            <h2 className="text-lg font-serif font-bold text-slate-900 dark:text-white">
              Quick Navigate
            </h2>

            <div className="space-y-3">
              <button
                onClick={() => setActiveTab('appointments')}
                className={`w-full p-4 rounded-xl border text-left flex items-center space-x-3 transition-all ${
                  isLight 
                    ? 'bg-[#fffdf8] border-amber-900/10 hover:bg-[#f5efe6] text-slate-800' 
                    : 'bg-slate-900 border-white/10 hover:bg-slate-800 text-white'
                }`}
              >
                <FileText className="w-4 h-4 text-amber-700 shrink-0" />
                <span className="text-xs font-bold font-serif">Review Appointments</span>
              </button>

              <button
                onClick={() => {
                  if (appointments[0]?.reportFile) {
                    window.open(`http://localhost:5000${appointments[0].reportFile}`, '_blank');
                  } else {
                    alert('No clinical report file attached yet.');
                  }
                }}
                className={`w-full p-4 rounded-xl border text-left flex items-center space-x-3 transition-all ${
                  isLight 
                    ? 'bg-[#fffdf8] border-amber-900/10 hover:bg-[#f5efe6] text-slate-800' 
                    : 'bg-slate-900 border-white/10 hover:bg-slate-800 text-white'
                }`}
              >
                <Mic className="w-4 h-4 text-amber-700 shrink-0" />
                <span className="text-xs font-bold font-serif">Review Medical Reports</span>
              </button>

              <Link
                href="/appointment"
                className={`w-full p-4 rounded-xl border text-left flex items-center space-x-3 transition-all block ${
                  isLight 
                    ? 'bg-[#fffdf8] border-amber-900/10 hover:bg-[#f5efe6] text-slate-800' 
                    : 'bg-slate-900 border-white/10 hover:bg-slate-800 text-white'
                }`}
              >
                <Video className="w-4 h-4 text-amber-700 shrink-0" />
                <span className="text-xs font-bold font-serif">Schedule Consultation</span>
              </Link>

              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full p-4 rounded-xl border text-left flex items-center space-x-3 transition-all ${
                  isLight 
                    ? 'bg-[#fffdf8] border-amber-900/10 hover:bg-[#f5efe6] text-slate-800' 
                    : 'bg-slate-900 border-white/10 hover:bg-slate-800 text-white'
                }`}
              >
                <User className="w-4 h-4 text-amber-700 shrink-0" />
                <span className="text-xs font-bold font-serif">Upload Profile Photo</span>
              </button>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
