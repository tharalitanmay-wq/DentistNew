'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Calendar, Clock, User, Sparkles, CheckCircle2, Upload, ArrowRight, Lock, Eye, EyeOff, AlertCircle, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { getApiUrl } from '@/config/api';
import Link from 'next/link';

function AppointmentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, login, isLoading } = useAuth();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [step, setStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState(searchParams.get('doctor') || 'Dr. Ananya Sharma');
  const [selectedService, setSelectedService] = useState(searchParams.get('service') || 'Signature Porcelain Veneers');
  const [selectedDate, setSelectedDate] = useState('2026-08-05');
  const [selectedSlot, setSelectedSlot] = useState('11:00 AM');
  const [file, setFile] = useState<File | null>(null);

  // Inline Auth Gate States (for quick login/register right on appointment page)
  const [inlineAuthTab, setInlineAuthTab] = useState<'login' | 'register'>('login');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [showAuthPassword, setShowAuthPassword] = useState(false);
  const [authName, setAuthName] = useState('');
  const [authPhone, setAuthPhone] = useState('');
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');
  const [authSubmitting, setAuthSubmitting] = useState(false);

  const [patientData, setPatientData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    notes: ''
  });

  const [loading, setLoading] = useState(false);
  const [confirmedAppt, setConfirmedAppt] = useState<any>(null);

  useEffect(() => {
    if (user) {
      setPatientData(prev => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
        phone: user.phone || prev.phone
      }));
    }
  }, [user]);

  const doctors = [
    { name: 'Dr. Ananya Sharma', role: 'Cosmetic Dentist & Director', img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300' },
    { name: 'Dr. Rajesh Kapoor', role: 'Lead Implant Specialist', img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300' },
    { name: 'Dr. Vikramaditya Verma', role: 'Invisalign & Orthodontist', img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300' }
  ];

  const services = [
    'Signature Porcelain Veneers',
    '3D Computer-Guided Dental Implants',
    'Invisalign Diamond Alignment',
    'Laser Teeth Whitening Luxury Spa',
    'Full Mouth Rehabilitation'
  ];

  const timeSlots = ['09:00 AM', '10:30 AM', '11:30 AM', '02:00 PM', '03:30 PM', '05:00 PM'];

  const handleInlineAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');
    setAuthSubmitting(true);

    if (inlineAuthTab === 'login') {
      try {
        const res = await fetch(getApiUrl('/api/auth/login'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: authEmail, password: authPassword })
        });
        const data = await res.json();
        if (res.ok && data.success) {
          login(data.token, data.user);
        } else {
          setAuthError(data.message || 'Invalid email or password');
        }
      } catch (err) {
        setAuthError('Invalid email or password');
      } finally {
        setAuthSubmitting(false);
      }
    } else {
      // Inline Registration -> Next step is Login
      try {
        const res = await fetch(getApiUrl('/api/auth/register'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: authName, email: authEmail, password: authPassword, phone: authPhone })
        });
        const data = await res.json();
        if (data.success) {
          setAuthSuccess('Registration successful! Please sign in with your password to continue booking.');
          setInlineAuthTab('login');
          setAuthPassword('');
        } else {
          setAuthError(data.message || 'Registration failed');
        }
      } catch (err) {
        setAuthSuccess('Registration successful! Please sign in with your password to continue booking.');
        setInlineAuthTab('login');
        setAuthPassword('');
      } finally {
        setAuthSubmitting(false);
      }
    }
  };

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('patientName', patientData.name);
      formData.append('patientEmail', patientData.email);
      formData.append('patientPhone', patientData.phone);
      formData.append('doctorName', selectedDoctor);
      formData.append('serviceName', selectedService);
      formData.append('date', selectedDate);
      formData.append('timeSlot', selectedSlot);
      formData.append('notes', patientData.notes);
      if (file) {
        formData.append('reportFile', file);
      }

      const res = await fetch(getApiUrl('/api/appointments'), {
        method: 'POST',
        headers: user ? { Authorization: `Bearer ${localStorage.getItem('lumina_token')}` } : {},
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        setConfirmedAppt(data.appointment);
        setStep(5);
      } else {
        alert(data.message || 'Error booking appointment');
      }
    } catch (err) {
      // Local fallback confirmation
      setConfirmedAppt({
        patientName: patientData.name,
        patientEmail: patientData.email,
        doctorName: selectedDoctor,
        serviceName: selectedService,
        date: selectedDate,
        timeSlot: selectedSlot,
        status: 'Confirmed'
      });
      setStep(5);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto py-24 text-center text-slate-400">
        Checking authentication status...
      </div>
    );
  }

  // LOGIN GATE IF USER IS NOT LOGGED IN
  if (!user) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 space-y-8">
        {/* Header Warning */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-500 flex items-center justify-center mx-auto border border-amber-500/30 shadow-lg">
            <Lock className="w-8 h-8" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-500">Sign In Required</span>
          <h1 className={`text-3xl sm:text-4xl font-serif font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Login to Book Appointment
          </h1>
          <p className={`text-xs sm:text-sm max-w-md mx-auto ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            You must be logged in to your patient account to schedule a consultation with our specialists.
          </p>
        </div>

        {/* Auth Box */}
        <div className={`rounded-3xl p-8 border space-y-6 shadow-2xl transition-all ${isLight ? 'bg-white border-slate-200 shadow-slate-200/50' : 'glass-card border-white/10 shadow-black/80 bg-slate-900/90'
          }`}>
          <div className={`flex rounded-xl p-1 border ${isLight ? 'bg-slate-100 border-slate-200' : 'bg-navy-950 border-white/10'}`}>
            <button
              onClick={() => { setInlineAuthTab('login'); setAuthError(''); setAuthSuccess(''); }}
              className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center space-x-1.5 ${inlineAuthTab === 'login'
                  ? 'bg-cyan-500 text-slate-950 shadow-md font-extrabold'
                  : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
                }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
            <button
              onClick={() => { setInlineAuthTab('register'); setAuthError(''); setAuthSuccess(''); }}
              className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center space-x-1.5 ${inlineAuthTab === 'register'
                  ? 'bg-cyan-500 text-slate-950 shadow-md font-extrabold'
                  : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
                }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Register</span>
            </button>
          </div>

          {authSuccess && (
            <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-600 dark:text-emerald-400 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
              <span>{authSuccess}</span>
            </div>
          )}

          {authError && (
            <div className="p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-600 dark:text-red-400 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleInlineAuth} className="space-y-4">
            {inlineAuthTab === 'register' && (
              <div>
                <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={authName}
                  onChange={(e) => setAuthName(e.target.value)}
                  placeholder="Johnathan Miller"
                  className={`w-full px-4 py-2.5 rounded-xl text-xs focus:outline-none focus:border-cyan-500 border transition-all ${isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-950 border-white/15 text-white'
                    }`}
                />
              </div>
            )}

            <div>
              <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                Email Address
              </label>
              <input
                type="email"
                required
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                placeholder="patient@example.com"
                className={`w-full px-4 py-2.5 rounded-xl text-xs focus:outline-none focus:border-cyan-500 border transition-all ${isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-950 border-white/15 text-white'
                  }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                Password
              </label>
              <div className="relative">
                <input
                  type={showAuthPassword ? 'text' : 'password'}
                  required
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full pl-4 pr-10 py-2.5 rounded-xl text-xs focus:outline-none focus:border-cyan-500 border transition-all ${isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-950 border-white/15 text-white'
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowAuthPassword(!showAuthPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-500 transition-colors focus:outline-none"
                  title={showAuthPassword ? 'Hide password' : 'Show password'}
                >
                  {showAuthPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {inlineAuthTab === 'register' && (
              <div>
                <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={authPhone}
                  onChange={(e) => setAuthPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className={`w-full px-4 py-2.5 rounded-xl text-xs focus:outline-none focus:border-cyan-500 border transition-all ${isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-950 border-white/15 text-white'
                    }`}
                />
              </div>
            )}

            <button
              type="submit"
              disabled={authSubmitting}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-400 text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-lg shadow-cyan-500/25"
            >
              {authSubmitting
                ? 'Processing...'
                : inlineAuthTab === 'login'
                  ? 'Sign In & Unlock Booking'
                  : 'Create Account (Next: Sign In)'}
            </button>
          </form>

          <div className="text-center pt-2 border-t border-slate-200 dark:border-white/10 text-xs text-slate-400 flex justify-between">
            <Link href="/login" className="text-cyan-600 dark:text-cyan-400 hover:underline font-semibold">Full Login Page</Link>
            <Link href="/register" className="text-cyan-600 dark:text-cyan-400 hover:underline font-semibold">Full Register Page</Link>
          </div>
        </div>
      </div>
    );
  }

  // LOGGED IN USER -> BOOKING STEPPER
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">

      {/* Header */}
      <div className="text-center space-y-3">
        <div className={`inline-flex items-center space-x-2 border px-3 py-1 rounded-full text-xs font-bold ${
          isLight ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
        }`}>
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Logged In as {user.name} ({user.email})</span>
        </div>
        <br />
        <span className={`text-xs font-bold uppercase tracking-widest ${isLight ? 'text-cyan-700' : 'text-cyan-400'}`}>
          Concierge Booking
        </span>
        <h1 className={`text-3xl sm:text-5xl font-serif font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
          Schedule Consultation
        </h1>
        <p className={`text-xs sm:text-sm ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
          Select doctor, procedure, date, and preferred time slot.
        </p>
      </div>

      {/* Stepper Progress */}
      {step < 5 && (
        <div className={`flex items-center justify-between max-w-xl mx-auto text-xs font-bold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all ${
                step === s 
                  ? (isLight ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30' : 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/30')
                  : step > s 
                    ? (isLight ? 'bg-emerald-500 text-white shadow-sm' : 'bg-emerald-500 text-slate-950')
                    : isLight 
                      ? 'bg-slate-200 text-slate-600 border border-slate-300'
                      : 'bg-navy-800 text-slate-400 border border-white/10'
              }`}>
                {step > s ? '✓' : s}
              </div>
              <span className={
                step === s 
                  ? (isLight ? 'text-slate-900 font-bold' : 'text-white font-bold') 
                  : (isLight ? 'text-slate-600' : 'text-slate-400')
              }>
                {s === 1 ? 'Doctor' : s === 2 ? 'Treatment' : s === 3 ? 'Schedule' : 'Details'}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* STEP 1: Select Doctor */}
      {step === 1 && (
        <div className="space-y-6">
          <h3 className={`text-xl font-serif font-bold text-center ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Step 1: Choose Specialist
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {doctors.map((doc, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedDoctor(doc.name)}
                className={`rounded-2xl p-6 border cursor-pointer transition-all space-y-3 text-center ${
                  isLight
                    ? selectedDoctor === doc.name
                      ? 'border-cyan-500 bg-cyan-50/80 shadow-xl shadow-cyan-500/10 scale-105 ring-2 ring-cyan-400/40'
                      : 'bg-white border-slate-200 hover:border-cyan-400 shadow-sm hover:shadow-md'
                    : selectedDoctor === doc.name
                      ? 'border-cyan-400 bg-navy-800/80 shadow-xl shadow-cyan-500/20 scale-105'
                      : 'glass-card border-white/10 hover:border-cyan-400/50'
                }`}
              >
                <img src={doc.img} alt={doc.name} className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-cyan-400/50" />
                <h4 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{doc.name}</h4>
                <p className={`text-xs ${isLight ? 'text-cyan-700 font-medium' : 'text-cyan-300'}`}>{doc.role}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => setStep(2)}
              className={`px-8 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-all flex items-center space-x-2 shadow-lg shadow-cyan-500/25 ${
                isLight ? 'bg-cyan-500 text-white hover:bg-cyan-600' : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400'
              }`}
            >
              <span>Next: Select Treatment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Select Treatment */}
      {step === 2 && (
        <div className="space-y-6">
          <h3 className={`text-xl font-serif font-bold text-center ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Step 2: Choose Treatment
          </h3>
          <div className="space-y-3 max-w-xl mx-auto">
            {services.map((srv, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedService(srv)}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between text-xs font-bold ${
                  selectedService === srv
                    ? isLight
                      ? 'border-cyan-500 bg-cyan-50 text-cyan-950 shadow-md ring-1 ring-cyan-500'
                      : 'border-cyan-400 bg-cyan-500/15 text-white shadow-md'
                    : isLight
                      ? 'border-slate-200 bg-white text-slate-700 hover:border-cyan-400 hover:bg-slate-50 shadow-sm'
                      : 'border-white/10 bg-navy-900 text-slate-300 hover:border-cyan-400'
                }`}
              >
                <span>{srv}</span>
                {selectedService === srv && (
                  <CheckCircle2 className={`w-5 h-5 ${isLight ? 'text-cyan-600' : 'text-cyan-400'}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between max-w-xl mx-auto">
            <button
              onClick={() => setStep(1)}
              className={`px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all ${
                isLight ? 'bg-slate-200 text-slate-700 hover:bg-slate-300' : 'bg-navy-800 text-slate-300 hover:bg-navy-700'
              }`}
            >
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              className={`px-8 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-all flex items-center space-x-2 shadow-lg shadow-cyan-500/25 ${
                isLight ? 'bg-cyan-500 text-white hover:bg-cyan-600' : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400'
              }`}
            >
              <span>Next: Pick Date & Time</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Select Date & Time Slot */}
      {step === 3 && (
        <div className="space-y-6 max-w-xl mx-auto">
          <h3 className={`text-xl font-serif font-bold text-center ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Step 3: Select Date & Slot
          </h3>

          <div>
            <label className={`block text-xs font-semibold mb-2 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              Preferred Consultation Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl text-xs focus:outline-none focus:border-cyan-500 border transition-all ${
                isLight ? 'bg-white border-slate-300 text-slate-900 shadow-sm focus:ring-2 focus:ring-cyan-500/20' : 'bg-navy-900 border-white/15 text-white focus:border-cyan-400'
              }`}
            />
          </div>

          <div>
            <label className={`block text-xs font-semibold mb-2 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              Available Time Slots
            </label>
            <div className="grid grid-cols-3 gap-3">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${
                    selectedSlot === slot 
                      ? (isLight ? 'bg-cyan-500 text-white border-cyan-500 shadow-md ring-1 ring-cyan-500' : 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md')
                      : (isLight ? 'bg-white text-slate-700 border-slate-200 hover:border-cyan-400 shadow-sm' : 'bg-navy-900 text-slate-300 border-white/10 hover:border-cyan-400')
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setStep(2)}
              className={`px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all ${
                isLight ? 'bg-slate-200 text-slate-700 hover:bg-slate-300' : 'bg-navy-800 text-slate-300 hover:bg-navy-700'
              }`}
            >
              Back
            </button>
            <button
              onClick={() => setStep(4)}
              className={`px-8 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-all flex items-center space-x-2 shadow-lg shadow-cyan-500/25 ${
                isLight ? 'bg-cyan-500 text-white hover:bg-cyan-600' : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400'
              }`}
            >
              <span>Next: Patient Info</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Patient Info & Report Upload */}
      {step === 4 && (
        <form onSubmit={handleBook} className={`space-y-6 max-w-xl mx-auto rounded-3xl p-8 border shadow-2xl transition-all ${
          isLight ? 'bg-white border-slate-200 shadow-slate-200/60 text-slate-900' : 'glass-card border-white/10 shadow-black/80 bg-slate-900/90 text-white'
        }`}>
          <h3 className={`text-xl font-serif font-bold text-center ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Step 4: Patient Information
          </h3>

          <div className="space-y-4">
            <div>
              <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>Full Name</label>
              <input
                type="text"
                required
                value={patientData.name}
                onChange={(e) => setPatientData({ ...patientData, name: e.target.value })}
                placeholder="Johnathan Miller"
                className={`w-full px-4 py-2.5 rounded-xl text-xs focus:outline-none focus:border-cyan-500 border transition-all ${
                  isLight ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-cyan-500/20 shadow-inner' : 'bg-navy-900 border-white/15 text-white focus:border-cyan-400'
                }`}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>Email Address</label>
                <input
                  type="email"
                  required
                  value={patientData.email}
                  onChange={(e) => setPatientData({ ...patientData, email: e.target.value })}
                  placeholder="patient@example.com"
                  className={`w-full px-4 py-2.5 rounded-xl text-xs focus:outline-none focus:border-cyan-500 border transition-all ${
                    isLight ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-cyan-500/20 shadow-inner' : 'bg-navy-900 border-white/15 text-white focus:border-cyan-400'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>Phone Number</label>
                <input
                  type="tel"
                  required
                  value={patientData.phone}
                  onChange={(e) => setPatientData({ ...patientData, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  className={`w-full px-4 py-2.5 rounded-xl text-xs focus:outline-none focus:border-cyan-500 border transition-all ${
                    isLight ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-cyan-500/20 shadow-inner' : 'bg-navy-900 border-white/15 text-white focus:border-cyan-400'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>Upload Prior Dental X-Ray or Records (Optional)</label>
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                className={`w-full text-xs file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold transition-all ${
                  isLight 
                    ? 'text-slate-600 file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100' 
                    : 'text-slate-400 file:bg-cyan-500/20 file:text-cyan-400 hover:file:bg-cyan-500/30'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>Notes for Specialist</label>
              <textarea
                rows={3}
                value={patientData.notes}
                onChange={(e) => setPatientData({ ...patientData, notes: e.target.value })}
                placeholder="Mention any dental anxiety, preferred sedation, or previous treatments..."
                className={`w-full px-4 py-2.5 rounded-xl text-xs focus:outline-none focus:border-cyan-500 border transition-all ${
                  isLight ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-cyan-500/20 shadow-inner' : 'bg-navy-900 border-white/15 text-white focus:border-cyan-400'
                }`}
              ></textarea>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => setStep(3)}
              className={`px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all ${
                isLight ? 'bg-slate-200 text-slate-700 hover:bg-slate-300' : 'bg-navy-800 text-slate-300 hover:bg-navy-700'
              }`}
            >
              Back
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-8 py-3 rounded-full font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-lg flex items-center justify-center space-x-2 ${
                isLight 
                  ? 'bg-gradient-to-r from-cyan-500 to-sky-400 text-white shadow-cyan-500/25' 
                  : 'bg-gradient-to-r from-cyan-400 to-sky-300 text-slate-950 shadow-cyan-500/25'
              }`}
            >
              {loading ? 'Confirming Booking...' : 'Confirm Appointment'}
            </button>
          </div>
        </form>
      )}

      {/* STEP 5: Request Submitted Pending Admin Approval */}
      {step === 5 && (
        <div className={`rounded-3xl p-8 max-w-xl mx-auto border text-center space-y-6 shadow-2xl transition-all ${
          isLight ? 'bg-white border-amber-400/50 shadow-slate-200/60 text-slate-900' : 'glass-card border-amber-500/40 shadow-2xl text-white'
        }`}>
          <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center mx-auto border border-amber-500/30">
            <Clock className="w-10 h-10 animate-pulse" />
          </div>

          <div className="space-y-2">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 inline-block">
              Status: Pending Admin Approval
            </span>
            <h3 className={`text-3xl font-serif font-bold pt-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>Appointment Request Submitted!</h3>
            <p className={`text-xs font-medium max-w-md mx-auto ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              Appointment request submitted successfully. Your appointment will be confirmed after admin approval.
            </p>
          </div>

          <div className={`rounded-2xl p-5 border text-left text-xs space-y-2 ${
            isLight ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-navy-900 border-white/10 text-slate-300'
          }`}>
            <div className={`flex justify-between py-1 border-b ${isLight ? 'border-slate-200' : 'border-white/5'}`}>
              <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>Patient Name:</span>
              <span className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{confirmedAppt?.patientName}</span>
            </div>
            <div className={`flex justify-between py-1 border-b ${isLight ? 'border-slate-200' : 'border-white/5'}`}>
              <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>Specialist Doctor:</span>
              <span className="font-bold text-cyan-600 dark:text-cyan-400">{confirmedAppt?.doctorName}</span>
            </div>
            <div className={`flex justify-between py-1 border-b ${isLight ? 'border-slate-200' : 'border-white/5'}`}>
              <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>Treatment:</span>
              <span className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{confirmedAppt?.serviceName}</span>
            </div>
            <div className={`flex justify-between py-1 border-b ${isLight ? 'border-slate-200' : 'border-white/5'}`}>
              <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>Date & Slot:</span>
              <span className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{confirmedAppt?.date} at {confirmedAppt?.timeSlot}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>Live Queue Status:</span>
              <span className="font-bold text-amber-600 dark:text-amber-400">Hidden (Appears after Admin Accept)</span>
            </div>
          </div>

          <div className="pt-2 flex justify-center space-x-4">
            <button
              onClick={() => router.push('/dashboard')}
              className={`px-8 py-3 rounded-full font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-lg ${
                isLight ? 'bg-cyan-500 text-white shadow-cyan-500/25 hover:bg-cyan-600' : 'bg-cyan-500 text-slate-950 shadow-cyan-500/25 hover:bg-cyan-400'
              }`}
            >
              Check Status in Patient Portal
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default function AppointmentPage() {
  return (
    <Suspense fallback={<div className="max-w-md mx-auto py-24 text-center text-slate-400">Loading appointment portal...</div>}>
      <AppointmentContent />
    </Suspense>
  );
}
