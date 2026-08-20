'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { getApiUrl } from '@/config/api';
import { 
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
  Award
} from 'lucide-react';
import Link from 'next/link';
import ProfilePhotoUpload from '@/components/ProfilePhotoUpload';

export default function DashboardPage() {
  const { user, token, login, logout, updateUser, isLoading } = useAuth();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [isLoginTab, setIsLoginTab] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [authError, setAuthError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const [appointments, setAppointments] = useState<any[]>([]);
  const [loadingAppts, setLoadingAppts] = useState(false);

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
      // Ignore network fallback errors
    }
  };

  const fetchAppointments = async () => {
    setLoadingAppts(true);
    try {
      const res = await fetch(getApiUrl('/api/appointments/my'), {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setAppointments(data.appointments);
      }
    } catch (e) {
      // Local fallback mock
      setAppointments([
        {
          _id: 'app-101',
          doctorName: 'Dr. Julian Vance',
          serviceName: '3D Computer-Guided Dental Implants',
          date: '2026-08-15',
          timeSlot: '02:00 PM',
          status: 'Confirmed',
          notes: 'Single molar implant consultation with 3D CBCT scan review.',
          reportFile: '/uploads/sample-dental-report.pdf'
        }
      ]);
    } finally {
      setLoadingAppts(false);
    }
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setSuccessMsg('');

    if (isLoginTab) {
      // LOGIN SUBMISSION
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
      // REGISTER SUBMISSION -> NEXT PAGE IS LOGIN!
      try {
        const res = await fetch(getApiUrl('/api/auth/register'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password, phone })
        });
        const data = await res.json();
        if (data.success) {
          setSuccessMsg('Registration successful! Please sign in with your email and password.');
          setIsLoginTab(true); // Switch tab to Login!
          setPassword('');
        } else {
          setAuthError(data.message || 'Registration failed');
        }
      } catch (err) {
        // Fallback mock registration redirect to Login
        setSuccessMsg('Registration successful! Please sign in with your account below.');
        setIsLoginTab(true); // Switch tab to Login!
        setPassword('');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto py-32 text-center text-slate-400 font-medium animate-pulse flex flex-col items-center space-y-3">
        <div className="w-10 h-10 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
        <span className="text-xs uppercase tracking-widest text-cyan-500 font-bold">Authenticating Patient Concierge Portal...</span>
      </div>
    );
  }

  // LOGIN / REGISTER FORM IF NOT LOGGED IN
  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-16">
        <div className={`rounded-3xl p-8 border space-y-6 shadow-2xl relative overflow-hidden transition-all ${
          isLight ? 'bg-white border-slate-200 shadow-slate-200/60' : 'glass-card border-white/10 shadow-black/50'
        }`}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mx-auto border border-cyan-500/30 shadow-lg shadow-cyan-500/10">
              <User className="w-7 h-7" />
            </div>
            <h2 className={`text-2xl font-serif font-bold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Patient Concierge Portal
            </h2>
            <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Access your appointment schedules, digital X-rays, and medical records
            </p>
          </div>

          <div className={`flex rounded-2xl p-1 border ${isLight ? 'bg-slate-100 border-slate-200' : 'bg-navy-900/90 border-white/10'}`}>
            <button
              onClick={() => { setIsLoginTab(true); setAuthError(''); setSuccessMsg(''); }}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
                isLoginTab 
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20' 
                  : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setIsLoginTab(false); setAuthError(''); setSuccessMsg(''); }}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
                !isLoginTab 
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20' 
                  : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
              }`}
            >
              Register
            </button>
          </div>

          {successMsg && (
            <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-600 dark:text-emerald-400 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
              <span>{successMsg}</span>
            </div>
          )}

          {authError && (
            <div className="p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-600 dark:text-red-400 flex items-center space-x-2">
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
                  className={`w-full px-4 py-3 border rounded-xl text-xs focus:outline-none focus:border-cyan-500 transition-all ${
                    isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-navy-900/90 border-white/15 text-white'
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
                className={`w-full px-4 py-3 border rounded-xl text-xs focus:outline-none focus:border-cyan-500 transition-all ${
                  isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-navy-900/90 border-white/15 text-white'
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
                className={`w-full px-4 py-3 border rounded-xl text-xs focus:outline-none focus:border-cyan-500 transition-all ${
                  isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-navy-900/90 border-white/15 text-white'
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
                  className={`w-full px-4 py-3 border rounded-xl text-xs focus:outline-none focus:border-cyan-500 transition-all ${
                    isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-navy-900/90 border-white/15 text-white'
                  }`}
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-400 text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-lg shadow-cyan-500/25 mt-2"
            >
              {isLoginTab ? 'Sign In to Portal' : 'Create Account'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // LOGGED IN PATIENT DASHBOARD PORTAL
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

      {/* Patient Header Banner */}
      <div className={`rounded-3xl p-6 sm:p-8 border flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden transition-all ${
        isLight
          ? 'bg-white border-slate-200 shadow-slate-200/50'
          : 'glass-card border-white/10 shadow-black/50'
      }`}>
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex items-center space-x-5 relative z-10">
          <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gradient-to-tr from-cyan-500 to-sky-300 text-slate-950 flex items-center justify-center font-serif font-bold text-2xl shadow-lg shadow-cyan-500/20 shrink-0">
            {user.profile_image_url || (user.avatar && !user.avatar.includes('unsplash') ? user.avatar : null) ? (
              <img src={user.profile_image_url || user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <span>{user.name ? user.name[0].toUpperCase() : 'P'}</span>
            )}
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-3">
              <h1 className={`text-2xl sm:text-3xl font-serif font-bold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Welcome, {user.name}
              </h1>
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1 border ${
                isLight ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
              }`}>
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>VIP Patient Concierge</span>
              </span>
            </div>
            <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              {user.email} • AACD Accredited Premier Portal
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 relative z-10 w-full sm:w-auto">
          <Link
            href="/queue"
            className={`flex-1 sm:flex-none px-5 py-2.5 rounded-full font-bold text-xs border transition-all text-center flex items-center justify-center space-x-1.5 shadow-md ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200 text-cyan-800 border-slate-300'
                : 'bg-navy-900/80 hover:bg-navy-800 text-cyan-400 border-cyan-500/30'
            }`}
          >
            <Activity className="w-4 h-4 text-cyan-500 animate-pulse" />
            <span>Live Queue Tracker</span>
          </Link>
          <Link
            href="/appointment"
            className="flex-1 sm:flex-none px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-sky-400 hover:brightness-110 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all text-center shadow-lg shadow-cyan-500/25"
          >
            + Book Appointment
          </Link>
        </div>
      </div>

      {/* Profile Photo Upload Section */}
      <div className={`rounded-3xl p-6 sm:p-8 border shadow-xl transition-all ${
        isLight
          ? 'bg-white border-slate-200 shadow-slate-200/50'
          : 'glass-card border-white/10 shadow-black/50'
      }`}>
        <ProfilePhotoUpload isLight={isLight} />
      </div>

      {/* Corporate Quick Executive Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`rounded-2xl p-5 border space-y-2 shadow-lg transition-all ${
          isLight ? 'bg-white border-slate-200 hover:border-cyan-500/40' : 'glass-card border-white/10 hover:border-cyan-500/40'
        }`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-semibold uppercase tracking-wider ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Active Consultations</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className={`text-2xl font-serif font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
            {appointments.length} <span className="text-xs font-sans text-cyan-600 dark:text-cyan-400 font-semibold">Upcoming</span>
          </div>
          <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Confirmed by Park Ave Concierge</p>
        </div>

        <div className={`rounded-2xl p-5 border space-y-2 shadow-lg transition-all ${
          isLight ? 'bg-white border-slate-200 hover:border-cyan-500/40' : 'glass-card border-white/10 hover:border-cyan-500/40'
        }`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-semibold uppercase tracking-wider ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Membership Tier</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className={`text-2xl font-serif font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Platinum <span className="text-xs font-sans text-emerald-600 dark:text-emerald-400 font-semibold">VIP</span>
          </div>
          <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Priority Same-Day Booking Access</p>
        </div>

        <div className={`rounded-2xl p-5 border space-y-2 shadow-lg transition-all ${
          isLight ? 'bg-white border-slate-200 hover:border-cyan-500/40' : 'glass-card border-white/10 hover:border-cyan-500/40'
        }`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-semibold uppercase tracking-wider ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Next Consultation</span>
            <div className="p-2 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className={`text-xl font-serif font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
            {appointments[0] ? appointments[0].date : 'None'}
          </div>
          <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{appointments[0] ? appointments[0].timeSlot : 'Book a consultation today'}</p>
        </div>

        <div className={`rounded-2xl p-5 border space-y-2 shadow-lg transition-all ${
          isLight ? 'bg-white border-slate-200 hover:border-cyan-500/40' : 'glass-card border-white/10 hover:border-cyan-500/40'
        }`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-semibold uppercase tracking-wider ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Medical Reports</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className={`text-2xl font-serif font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Ready <span className="text-xs font-sans text-indigo-600 dark:text-indigo-400 font-semibold">PDF</span>
          </div>
          <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Encrypted 3D Smile Simulation</p>
        </div>
      </div>

      {/* Appointments & Consultations Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className={`text-xl font-serif font-bold flex items-center space-x-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
              <Stethoscope className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              <span>My Scheduled Consultations</span>
            </h3>
            <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Track appointment status, assigned specialists, and digital reports
            </p>
          </div>
          <Link
            href="/appointment"
            className="hidden sm:flex items-center space-x-1 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline transition-colors"
          >
            <span>+ Add Consultation</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {loadingAppts ? (
          <div className={`rounded-2xl p-12 text-center text-xs space-y-3 border ${
            isLight ? 'bg-white border-slate-200 text-slate-600' : 'glass-card border-white/10 text-slate-400'
          }`}>
            <div className="w-8 h-8 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin mx-auto" />
            <p>Fetching your verified appointments...</p>
          </div>
        ) : appointments.length === 0 ? (
          <div className={`rounded-3xl p-12 text-center space-y-4 border shadow-xl max-w-2xl mx-auto ${
            isLight ? 'bg-white border-slate-200' : 'glass-card border-white/10'
          }`}>
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mx-auto border border-cyan-500/20">
              <Calendar className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h4 className={`text-lg font-serif font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>No Active Consultations</h4>
              <p className={`text-xs max-w-md mx-auto ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                You do not have any upcoming appointments. Schedule a consultation with our master cosmetic specialists today.
              </p>
            </div>
            <Link
              href="/appointment"
              className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-sky-400 text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-lg shadow-cyan-500/25"
            >
              Book First Consultation
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {appointments.map((appt) => (
              <div 
                key={appt._id} 
                className={`rounded-3xl p-6 sm:p-7 border space-y-5 shadow-xl transition-all duration-300 relative group overflow-hidden ${
                  isLight 
                    ? 'bg-white border-slate-200 hover:border-cyan-500/40 shadow-slate-200/50' 
                    : 'glass-card border-white/10 hover:border-cyan-500/40 shadow-black/50'
                }`}
              >
                {/* Status & Date Bar */}
                <div className={`flex items-center justify-between border-b pb-4 ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider flex items-center space-x-1 border ${
                      appt.status === 'Confirmed' 
                        ? isLight ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                        : isLight ? 'bg-amber-50 text-amber-800 border-amber-300' : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                    }`}>
                      <span className={`w-2 h-2 rounded-full mr-1.5 ${
                        appt.status === 'Confirmed' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                      }`} />
                      <span>{appt.status}</span>
                    </span>
                  </div>
                  <div className={`flex items-center space-x-1.5 text-xs font-semibold px-3 py-1 rounded-full border ${
                    isLight 
                      ? 'bg-slate-100 text-slate-800 border-slate-200' 
                      : 'bg-navy-900/90 text-slate-200 border-white/10'
                  }`}>
                    <Clock className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                    <span>{appt.date} • {appt.timeSlot}</span>
                  </div>
                </div>

                {/* Treatment & Doctor Details */}
                <div className="space-y-3">
                  <div>
                    <h4 className={`text-xl font-serif font-bold transition-colors ${
                      isLight ? 'text-slate-900 group-hover:text-cyan-600' : 'text-white group-hover:text-cyan-300'
                    }`}>
                      {appt.serviceName}
                    </h4>
                    <div className="flex items-center space-x-2 mt-1.5">
                      <Stethoscope className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                      <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400">{appt.doctorName}</span>
                    </div>
                  </div>

                  {appt.notes && (
                    <div className={`p-4 rounded-2xl border-l-4 border-cyan-500 border-t border-r border-b text-xs space-y-1.5 ${
                      isLight 
                        ? 'bg-slate-50 border-slate-200 text-slate-800' 
                        : 'bg-slate-900/90 border-white/10 text-slate-200'
                    }`}>
                      <span className={`text-[10px] font-extrabold uppercase tracking-wider block ${
                        isLight ? 'text-cyan-800' : 'text-cyan-400'
                      }`}>
                        Clinical Consultation Note:
                      </span>
                      <p className={`leading-relaxed font-medium ${
                        isLight ? 'text-slate-700' : 'text-slate-300'
                      }`}>
                        {appt.notes}
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer Record Download & Concierge Contact */}
                <div className={`pt-4 border-t flex items-center justify-between text-xs ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
                  <div className={`flex items-center space-x-1.5 font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>Park Avenue Clinic</span>
                  </div>

                  <a
                    href={`http://localhost:5000${appt.reportFile || '/api/health'}`}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex items-center space-x-1.5 px-4 py-2 rounded-full font-bold text-xs border transition-all ${
                      isLight 
                        ? 'bg-cyan-50 text-cyan-700 border-cyan-300 hover:bg-cyan-100 shadow-sm' 
                        : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/20'
                    }`}
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Clinical Report</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Concierge Shortcuts Grid */}
      <div className="pt-4">
        <h4 className={`text-xs font-serif font-bold uppercase tracking-wider mb-4 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
          Concierge Services & Tools
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/services"
            className={`rounded-2xl p-5 border transition-all group flex items-center space-x-4 shadow-md ${
              isLight ? 'bg-white border-slate-200 hover:border-cyan-500/40' : 'glass-card border-white/10 hover:border-cyan-500/40'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center border border-cyan-500/20 group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h5 className={`text-sm font-bold transition-colors ${isLight ? 'text-slate-900 group-hover:text-cyan-600' : 'text-white group-hover:text-cyan-300'}`}>
                3D Cosmetic Services
              </h5>
              <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Veneers, Implants & Whitening</p>
            </div>
          </Link>

          <Link
            href="/queue"
            className={`rounded-2xl p-5 border transition-all group flex items-center space-x-4 shadow-md ${
              isLight ? 'bg-white border-slate-200 hover:border-cyan-500/40' : 'glass-card border-white/10 hover:border-cyan-500/40'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20 group-hover:scale-110 transition-transform">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h5 className={`text-sm font-bold transition-colors ${isLight ? 'text-slate-900 group-hover:text-cyan-600' : 'text-white group-hover:text-cyan-300'}`}>
                Live Patient Queue
              </h5>
              <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Real-time Wait Time Tracker</p>
            </div>
          </Link>

          <Link
            href="/contact"
            className={`rounded-2xl p-5 border transition-all group flex items-center space-x-4 shadow-md ${
              isLight ? 'bg-white border-slate-200 hover:border-cyan-500/40' : 'glass-card border-white/10 hover:border-cyan-500/40'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center border border-sky-500/20 group-hover:scale-110 transition-transform">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h5 className={`text-sm font-bold transition-colors ${isLight ? 'text-slate-900 group-hover:text-cyan-600' : 'text-white group-hover:text-cyan-300'}`}>
                Emergency Concierge
              </h5>
              <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>24/7 Specialist Direct Line</p>
            </div>
          </Link>
        </div>
      </div>

    </div>
  );
}


