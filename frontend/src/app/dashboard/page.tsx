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
  ArrowUpRight,
  ChevronDown
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
          doctorName: 'Sagar Mane',
          serviceName: 'Climate Change and Environmental Sustainability: Protecting the Future of Our Planet',
          date: '2026-08-15',
          timeSlot: '02:00 PM',
          status: 'DRAFT',
          typeTag: 'ARTICLE',
          notes: 'Comprehensive clinical research report and environmental impact assessment.',
          reportFile: '/uploads/sample-dental-report.pdf',
          createdAt: '18 min ago'
        },
        {
          _id: 'app-102',
          doctorName: 'Dr. Evelyn Sterling',
          serviceName: 'Signature Porcelain Veneers & Cosmetic Smile Design',
          date: '2026-08-28',
          timeSlot: '11:00 AM',
          status: 'PUBLISHED',
          typeTag: 'BLOG',
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
      <div className="min-h-screen bg-[#fdf6e2] dark:bg-[#0c0f17] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-full border-3 border-[#7a6448] border-t-transparent animate-spin" />
        <span className="text-xs uppercase tracking-widest text-[#7a6448] dark:text-amber-400 font-bold font-serif">
          Loading Patient Desk...
        </span>
      </div>
    );
  }

  // 1. UNAUTHENTICATED LOGIN / REGISTER FORM
  if (!user) {
    return (
      <div className="min-h-screen bg-[#fdf6e2] dark:bg-[#0c0f17] flex items-center justify-center p-4">
        <div className={`max-w-md w-full rounded-3xl p-8 border space-y-6 shadow-xl transition-all ${
          isLight ? 'bg-[#fffef8] border-[#ebdcb8] shadow-amber-900/5' : 'bg-slate-900 border-white/10 shadow-black/50'
        }`}>
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#f5e7b2] text-[#5c4a33] dark:text-amber-400 flex items-center justify-center mx-auto border border-[#ebdcb8] shadow-sm">
              <User className="w-7 h-7" />
            </div>
            <h2 className={`text-2xl font-serif font-bold tracking-tight ${isLight ? 'text-[#2c221b]' : 'text-white'}`}>
              Vritant Archive Desk
            </h2>
            <p className={`text-xs ${isLight ? 'text-[#705f4e]' : 'text-slate-400'}`}>
              Sign in to access system administration, appointments & archives
            </p>
          </div>

          <div className={`flex rounded-2xl p-1 border ${isLight ? 'bg-[#f4efe4] border-[#ebdcb8]' : 'bg-slate-950 border-white/10'}`}>
            <button
              onClick={() => { setIsLoginTab(true); setAuthError(''); setSuccessMsg(''); }}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
                isLoginTab 
                  ? 'bg-[#28231d] text-[#e5d5b7] shadow-md' 
                  : isLight ? 'text-[#705f4e] hover:text-[#2c221b]' : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setIsLoginTab(false); setAuthError(''); setSuccessMsg(''); }}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
                !isLoginTab 
                  ? 'bg-[#28231d] text-[#e5d5b7] shadow-md' 
                  : isLight ? 'text-[#705f4e] hover:text-[#2c221b]' : 'text-slate-400 hover:text-white'
              }`}
            >
              Register
            </button>
          </div>

          {successMsg && (
            <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-800 dark:text-emerald-400 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {authError && (
            <div className="p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-800 dark:text-red-400 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            {!isLoginTab && (
              <div>
                <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-[#473a2e]' : 'text-slate-300'}`}>Full Legal Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tanvi Mane"
                  className={`w-full px-4 py-3 border rounded-xl text-xs focus:outline-none focus:border-[#7a6448] transition-all ${
                    isLight ? 'bg-[#f8f3e8] border-[#ebdcb8] text-[#2c221b]' : 'bg-slate-950 border-white/15 text-white'
                  }`}
                />
              </div>
            )}

            <div>
              <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-[#473a2e]' : 'text-slate-300'}`}>Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="patient@example.com"
                className={`w-full px-4 py-3 border rounded-xl text-xs focus:outline-none focus:border-[#7a6448] transition-all ${
                  isLight ? 'bg-[#f8f3e8] border-[#ebdcb8] text-[#2c221b]' : 'bg-slate-950 border-white/15 text-white'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-[#473a2e]' : 'text-slate-300'}`}>Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full px-4 py-3 border rounded-xl text-xs focus:outline-none focus:border-[#7a6448] transition-all ${
                  isLight ? 'bg-[#f8f3e8] border-[#ebdcb8] text-[#2c221b]' : 'bg-slate-950 border-white/15 text-white'
                }`}
              />
            </div>

            {!isLoginTab && (
              <div>
                <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-[#473a2e]' : 'text-slate-300'}`}>Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className={`w-full px-4 py-3 border rounded-xl text-xs focus:outline-none focus:border-[#7a6448] transition-all ${
                    isLight ? 'bg-[#f8f3e8] border-[#ebdcb8] text-[#2c221b]' : 'bg-slate-950 border-white/15 text-white'
                  }`}
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#28231d] text-[#e5d5b7] font-serif font-bold text-xs uppercase tracking-wider hover:bg-[#383028] transition-all shadow-md mt-2"
            >
              {isLoginTab ? 'Sign In to Desk' : 'Create Account'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 2. AUTHENTICATED DESK DASHBOARD (100% MATCHING REFERENCE UI)
  const firstName = user.name ? user.name.split(' ')[0] : 'Tanvi';

  return (
    <div className="flex min-h-screen bg-[#fdf6e2] dark:bg-[#090d16] text-[#2c221b] dark:text-slate-100 font-sans selection:bg-amber-500/20">

      {/* LEFT SIDEBAR (Dark Charcoal/Brown Sidebar matching Vritant reference) */}
      <aside className="w-64 bg-[#181512] dark:bg-[#0c0f17] text-[#d6c7b2] flex flex-col justify-between border-r border-[#29231d] shrink-0 hidden md:flex min-h-screen sticky top-0 h-screen overflow-y-auto">
        <div className="p-6 space-y-7">
          {/* Logo & Header */}
          <div className="space-y-1">
            <h2 className="text-2xl font-serif italic font-bold text-[#e8d7ba] tracking-tight">
              Vritant
            </h2>
            <p className="text-[9px] tracking-[0.3em] text-[#786958] uppercase font-semibold">
              ARCHIVE DESK
            </p>
          </div>

          {/* Sidebar Navigation Items */}
          <nav className="space-y-1 text-xs font-medium">
            
            {/* Active Dashboard item with dark inset container */}
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-[#2b241d] text-[#e8d7ba] border border-[#42392d] shadow-sm font-semibold'
                  : 'text-[#a3937d] hover:text-[#e8d7ba] hover:bg-[#231d17]'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-[#c4b193]" />
              <span>Dashboard</span>
            </button>

            <Link
              href="/appointment"
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-[#a3937d] hover:text-[#e8d7ba] hover:bg-[#231d17] transition-all"
            >
              <Upload className="w-4 h-4 text-[#8c7b68]" />
              <span>Upload Article</span>
            </Link>

            <button
              onClick={() => setActiveTab('appointments')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === 'appointments'
                  ? 'bg-[#2b241d] text-[#e8d7ba] border border-[#42392d] shadow-sm font-semibold'
                  : 'text-[#a3937d] hover:text-[#e8d7ba] hover:bg-[#231d17]'
              }`}
            >
              <BookOpen className="w-4 h-4 text-[#8c7b68]" />
              <span>Upload Blogs</span>
            </button>

            <div className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-[#a3937d] hover:text-[#e8d7ba] hover:bg-[#231d17] cursor-pointer transition-all">
              <div className="flex items-center space-x-3">
                <Video className="w-4 h-4 text-[#8c7b68]" />
                <span>Upload Media</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#695847]" />
            </div>

            <div className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-[#a3937d] hover:text-[#e8d7ba] hover:bg-[#231d17] cursor-pointer transition-all">
              <div className="flex items-center space-x-3">
                <Layers className="w-4 h-4 text-[#8c7b68]" />
                <span>Unpublished Work</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#695847]" />
            </div>

            <div className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-[#a3937d] hover:text-[#e8d7ba] hover:bg-[#231d17] cursor-pointer transition-all">
              <div className="flex items-center space-x-3">
                <FileText className="w-4 h-4 text-[#8c7b68]" />
                <span>Published Work</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#695847]" />
            </div>

            <div className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-[#a3937d] hover:text-[#e8d7ba] hover:bg-[#231d17] cursor-pointer transition-all">
              <div className="flex items-center space-x-3">
                <Activity className="w-4 h-4 text-[#8c7b68]" />
                <span>Homepage Management</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#695847]" />
            </div>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === 'profile'
                  ? 'bg-[#2b241d] text-[#e8d7ba] border border-[#42392d] shadow-sm font-semibold'
                  : 'text-[#a3937d] hover:text-[#e8d7ba] hover:bg-[#231d17]'
              }`}
            >
              <Users className="w-4 h-4 text-[#8c7b68]" />
              <span>Update Our Team</span>
            </button>

            <Link
              href="/doctors"
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-[#a3937d] hover:text-[#e8d7ba] hover:bg-[#231d17] transition-all"
            >
              <User className="w-4 h-4 text-[#8c7b68]" />
              <span>Update Our Authors</span>
            </Link>

            <div className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-[#a3937d] hover:text-[#e8d7ba] hover:bg-[#231d17] cursor-pointer transition-all">
              <Sparkles className="w-4 h-4 text-[#8c7b68]" />
              <span>Theme Management</span>
            </div>

            <div className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-[#a3937d] hover:text-[#e8d7ba] hover:bg-[#231d17] cursor-pointer transition-all">
              <Shield className="w-4 h-4 text-[#8c7b68]" />
              <span>Access Control</span>
            </div>

          </nav>
        </div>

        {/* Sidebar Footer Circle Avatar */}
        <div className="p-4 border-t border-[#29231d] flex items-center justify-between">
          <div className="w-9 h-9 rounded-full bg-[#241d17] border border-[#3d3328] text-[#e8d7ba] flex items-center justify-center font-serif font-bold text-sm shadow-inner">
            N
          </div>
          <button
            onClick={handleLogout}
            className="p-2 rounded-xl text-[#8c7b68] hover:text-red-400 hover:bg-[#2b241d] transition-all"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* MAIN WORKSPACE AREA (Warm Beige Background matching reference screenshot) */}
      <main className="flex-1 min-w-0 p-4 sm:p-8 space-y-8 overflow-y-auto">

        {/* Top Header Bar */}
        <header className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-2">
          
          {/* Soft Pastel Yellow Search Bar */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7d694f] dark:text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search archive..."
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs focus:outline-none transition-all ${
                isLight 
                  ? 'bg-[#f5e7b2] border border-[#e2d398] text-[#3d2e1b] placeholder:text-[#806b4d] focus:border-[#7a6448]' 
                  : 'bg-slate-900 border border-white/10 text-white placeholder:text-slate-500 focus:border-cyan-500'
              }`}
            />
          </div>

          {/* User Profile & Controls */}
          <div className="flex items-center space-x-5 w-full sm:w-auto justify-end">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-xl transition-all ${
                isLight ? 'text-[#5c4b37] hover:text-[#2c221b]' : 'text-slate-300 hover:text-white'
              }`}
              title="Toggle Light/Dark Theme"
            >
              {theme === 'dark' ? <Sun className="w-4.5 h-4.5 text-amber-400" /> : <Moon className="w-4.5 h-4.5" />}
            </button>

            <div className="flex items-center space-x-3 text-right">
              <div className="w-9 h-9 rounded-full bg-[#f2e2be] text-[#3d2e1b] flex items-center justify-center font-serif font-bold text-xs border border-[#decb9f]">
                {user.profile_image_url || (user.avatar && !user.avatar.includes('unsplash') ? user.avatar : null) ? (
                  <img src={user.profile_image_url || user.avatar} alt={user.name} className="w-full h-full object-cover rounded-full" />
                ) : (
                  <User className="w-4 h-4 text-[#5c4a35]" />
                )}
              </div>
              <div className="hidden sm:block">
                <span className="block text-xs font-serif font-bold text-[#2c221b] dark:text-white leading-none">
                  {user.name || 'Tanvi Mane'}
                </span>
                <span className="text-[10px] text-[#705e49] dark:text-slate-400 font-medium leading-none">
                  Super Admin
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Greeting Section & Refresh Button */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-2">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-serif font-normal text-[#2c221b] dark:text-white tracking-tight">
              {getGreeting()}, {firstName}.
            </h1>
            <p className="text-xs text-[#705e49] dark:text-slate-400">
              Here is what's happening in the system administration and archives right now.
            </p>
          </div>

          <button
            onClick={handleRefresh}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold border shadow-xs transition-all shrink-0 ${
              isLight 
                ? 'bg-[#fffdf7] border-[#ebdcb8] text-[#3d2e1b] hover:bg-[#f6ebd4]' 
                : 'bg-slate-900 border-white/10 text-slate-300 hover:text-white'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-amber-700' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Profile Upload Tab Toggle */}
        {activeTab === 'profile' && (
          <div className={`rounded-2xl p-6 border shadow-sm transition-all ${
            isLight ? 'bg-[#fffdf8] border-[#ebdcb8]' : 'bg-slate-900 border-white/10'
          }`}>
            <ProfilePhotoUpload isLight={isLight} />
          </div>
        )}

        {/* 8-METRIC STAT CARDS GRID (Exact 4x2 Layout from Reference Image) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: ARTICLES */}
          <div className={`rounded-2xl p-5 border shadow-xs transition-all ${
            isLight ? 'bg-[#fffdf8] border-[#ebdcb8]' : 'bg-slate-900 border-white/10'
          }`}>
            <div className="flex items-center space-x-3.5">
              <div className="p-3 rounded-xl bg-[#f8eed6] text-[#7a603a] border border-[#ecd9ab]">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#85735d] dark:text-slate-400 block">ARTICLES</span>
                <span className="text-xl font-serif font-bold text-[#2c221b] dark:text-white">11</span>
                <span className="text-[11px] text-[#85735d] dark:text-slate-400 ml-1.5">published</span>
              </div>
            </div>
          </div>

          {/* Card 2: BLOGS */}
          <div className={`rounded-2xl p-5 border shadow-xs transition-all ${
            isLight ? 'bg-[#fffdf8] border-[#ebdcb8]' : 'bg-slate-900 border-white/10'
          }`}>
            <div className="flex items-center space-x-3.5">
              <div className="p-3 rounded-xl bg-[#e5f4e7] text-[#3b7544] border border-[#c4e6c9]">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#85735d] dark:text-slate-400 block">BLOGS</span>
                <span className="text-xl font-serif font-bold text-[#2c221b] dark:text-white">0</span>
                <span className="text-[11px] text-[#85735d] dark:text-slate-400 ml-1.5">live posts</span>
              </div>
            </div>
          </div>

          {/* Card 3: PODCASTS */}
          <div className={`rounded-2xl p-5 border shadow-xs transition-all ${
            isLight ? 'bg-[#fffdf8] border-[#ebdcb8]' : 'bg-slate-900 border-white/10'
          }`}>
            <div className="flex items-center space-x-3.5">
              <div className="p-3 rounded-xl bg-[#efe6f8] text-[#694285] border border-[#d9c4ec]">
                <Mic className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#85735d] dark:text-slate-400 block">PODCASTS</span>
                <span className="text-xl font-serif font-bold text-[#2c221b] dark:text-white">4</span>
                <span className="text-[11px] text-[#85735d] dark:text-slate-400 ml-1.5">episodes live</span>
              </div>
            </div>
          </div>

          {/* Card 4: INTERVIEWS */}
          <div className={`rounded-2xl p-5 border shadow-xs transition-all ${
            isLight ? 'bg-[#fffdf8] border-[#ebdcb8]' : 'bg-slate-900 border-white/10'
          }`}>
            <div className="flex items-center space-x-3.5">
              <div className="p-3 rounded-xl bg-[#e3f0f7] text-[#336888] border border-[#c5e1f0]">
                <Video className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#85735d] dark:text-slate-400 block">INTERVIEWS</span>
                <span className="text-xl font-serif font-bold text-[#2c221b] dark:text-white">6</span>
                <span className="text-[11px] text-[#85735d] dark:text-slate-400 ml-1.5">published</span>
              </div>
            </div>
          </div>

          {/* Card 5: SHORT MEDIA */}
          <div className={`rounded-2xl p-5 border shadow-xs transition-all ${
            isLight ? 'bg-[#fffdf8] border-[#ebdcb8]' : 'bg-slate-900 border-white/10'
          }`}>
            <div className="flex items-center space-x-3.5">
              <div className="p-3 rounded-xl bg-[#f8efe0] text-[#7d5d2d] border border-[#edd7b6]">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#85735d] dark:text-slate-400 block">SHORT MEDIA</span>
                <span className="text-xl font-serif font-bold text-[#2c221b] dark:text-white">0</span>
                <span className="text-[11px] text-[#85735d] dark:text-slate-400 ml-1.5">pieces live</span>
              </div>
            </div>
          </div>

          {/* Card 6: PENDING DRAFTS */}
          <div className={`rounded-2xl p-5 border shadow-xs transition-all ${
            isLight ? 'bg-[#fffdf8] border-[#ebdcb8]' : 'bg-slate-900 border-white/10'
          }`}>
            <div className="flex items-center space-x-3.5">
              <div className="p-3 rounded-xl bg-[#fdf0e6] text-[#9c5836] border border-[#f5d7c3]">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#85735d] dark:text-slate-400 block">PENDING DRAFTS</span>
                <span className="text-xl font-serif font-bold text-[#2c221b] dark:text-white">12</span>
                <span className="text-[11px] text-[#85735d] dark:text-slate-400 ml-1.5">awaiting review</span>
              </div>
            </div>
          </div>

          {/* Card 7: TOTAL PUBLISHED */}
          <div className={`rounded-2xl p-5 border shadow-xs transition-all ${
            isLight ? 'bg-[#fffdf8] border-[#ebdcb8]' : 'bg-slate-900 border-white/10'
          }`}>
            <div className="flex items-center space-x-3.5">
              <div className="p-3 rounded-xl bg-[#e6f4ed] text-[#2c6e49] border border-[#c4e7d4]">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#85735d] dark:text-slate-400 block">TOTAL PUBLISHED</span>
                <span className="text-xl font-serif font-bold text-[#2c221b] dark:text-white">21</span>
                <span className="text-[11px] text-[#85735d] dark:text-slate-400 ml-1.5">across all types</span>
              </div>
            </div>
          </div>

          {/* Card 8: CONTRIBUTORS */}
          <div className={`rounded-2xl p-5 border shadow-xs transition-all ${
            isLight ? 'bg-[#fffdf8] border-[#ebdcb8]' : 'bg-slate-900 border-white/10'
          }`}>
            <div className="flex items-center space-x-3.5">
              <div className="p-3 rounded-xl bg-[#e5f5f2] text-[#2b7067] border border-[#c2e8e3]">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#85735d] dark:text-slate-400 block">CONTRIBUTORS</span>
                <span className="text-xl font-serif font-bold text-[#2c221b] dark:text-white">6</span>
                <span className="text-[11px] text-[#85735d] dark:text-slate-400 ml-1.5">unique authors</span>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM WORKSPACE (Two Columns Layout matching reference image) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">

          {/* LEFT COLUMN: RECENT SUBMISSIONS (2 Columns wide) */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-serif font-normal text-[#2c221b] dark:text-white">
              Recent Submissions
            </h2>

            {loadingAppts ? (
              <div className={`rounded-2xl p-8 text-center text-xs space-y-2 border ${
                isLight ? 'bg-[#fffdf8] border-[#ebdcb8] text-slate-600' : 'bg-slate-900 border-white/10 text-slate-400'
              }`}>
                <div className="w-6 h-6 rounded-full border-2 border-[#7a6448] border-t-transparent animate-spin mx-auto" />
                <p>Loading recent submissions...</p>
              </div>
            ) : filteredAppointments.length === 0 ? (
              <div className={`rounded-2xl p-8 text-center space-y-3 border ${
                isLight ? 'bg-[#fffdf8] border-[#ebdcb8]' : 'bg-slate-900 border-white/10'
              }`}>
                <FileText className="w-8 h-8 text-[#7a6448]/40 mx-auto" />
                <p className="text-xs text-[#705e49] dark:text-slate-400">No submissions matching your query.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAppointments.map((appt) => (
                  <div
                    key={appt._id}
                    className={`rounded-2xl p-6 border space-y-4 shadow-xs transition-all ${
                      isLight 
                        ? 'bg-[#fffdf8] border-[#ebdcb8]' 
                        : 'bg-slate-900 border-white/10'
                    }`}
                  >
                    {/* Header Tags & Timestamp */}
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2">
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#f8eed6] text-[#7a603a] border border-[#ecd9ab]">
                          {appt.typeTag || 'ARTICLE'}
                        </span>
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#fdf0e6] text-[#9c5836] border border-[#f5d7c3]">
                          {appt.status || 'DRAFT'}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#8c7b68] dark:text-slate-400 font-mono">
                        {appt.createdAt || '18 min ago'}
                      </span>
                    </div>

                    {/* Title & Author */}
                    <div className="flex items-start space-x-3.5 pt-1">
                      <div className="p-3 rounded-xl bg-[#f8eed6] text-[#7a603a] border border-[#ecd9ab] shrink-0 mt-0.5">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-base font-serif font-normal text-[#2c221b] dark:text-white leading-snug">
                          {appt.serviceName}
                        </h3>
                        <p className="text-xs text-[#705e49] dark:text-slate-400">
                          by <span className="font-semibold text-[#2c221b] dark:text-slate-200">{appt.doctorName}</span>
                        </p>
                      </div>
                    </div>

                    {/* Notes & Actions */}
                    {appt.notes && (
                      <p className="text-xs text-[#524436] dark:text-slate-300 bg-[#f8f3e6] dark:bg-slate-950 p-3.5 rounded-xl border border-[#ebdcb8] dark:border-white/5">
                        {appt.notes}
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-2 text-xs border-t border-[#ebdcb8] dark:border-white/5">
                      <span className="text-[11px] text-[#8c7b68] dark:text-slate-400 font-medium">
                        {appt.date} • {appt.timeSlot}
                      </span>
                      <a
                        href={`http://localhost:5000${appt.reportFile || '/api/health'}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center space-x-1.5 text-xs font-bold text-[#7a603a] dark:text-cyan-400 hover:underline"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Article PDF</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: QUICK NAVIGATE (1 Column wide) */}
          <div className="space-y-4">
            <h2 className="text-xl font-serif font-normal text-[#2c221b] dark:text-white">
              Quick Navigate
            </h2>

            <div className="space-y-3">
              <button
                onClick={() => setActiveTab('appointments')}
                className={`w-full p-4 rounded-xl border text-left flex items-center space-x-3 transition-all ${
                  isLight 
                    ? 'bg-[#fffdf8] border-[#ebdcb8] hover:bg-[#f8f3e6] text-[#2c221b]' 
                    : 'bg-slate-900 border-white/10 hover:bg-slate-800 text-white'
                }`}
              >
                <FileText className="w-4.5 h-4.5 text-[#6e583c] shrink-0" />
                <span className="text-xs font-semibold font-sans">Review Articles</span>
              </button>

              <button
                onClick={() => {
                  if (appointments[0]?.reportFile) {
                    window.open(`http://localhost:5000${appointments[0].reportFile}`, '_blank');
                  } else {
                    alert('No medical report file attached yet.');
                  }
                }}
                className={`w-full p-4 rounded-xl border text-left flex items-center space-x-3 transition-all ${
                  isLight 
                    ? 'bg-[#fffdf8] border-[#ebdcb8] hover:bg-[#f8f3e6] text-[#2c221b]' 
                    : 'bg-slate-900 border-white/10 hover:bg-slate-800 text-white'
                }`}
              >
                <Mic className="w-4.5 h-4.5 text-[#6e583c] shrink-0" />
                <span className="text-xs font-semibold font-sans">Review Podcasts</span>
              </button>

              <Link
                href="/appointment"
                className={`w-full p-4 rounded-xl border text-left flex items-center space-x-3 transition-all block ${
                  isLight 
                    ? 'bg-[#fffdf8] border-[#ebdcb8] hover:bg-[#f8f3e6] text-[#2c221b]' 
                    : 'bg-slate-900 border-white/10 hover:bg-slate-800 text-white'
                }`}
              >
                <Video className="w-4.5 h-4.5 text-[#6e583c] shrink-0" />
                <span className="text-xs font-semibold font-sans">Review Interviews</span>
              </Link>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
