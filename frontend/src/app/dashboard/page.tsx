'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Calendar, User, FileText, Clock, LogOut, CheckCircle2, Download, AlertCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, token, login, logout, isLoading } = useAuth();

  const [isLoginTab, setIsLoginTab] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [authError, setAuthError] = useState('');

  const [appointments, setAppointments] = useState<any[]>([]);
  const [loadingAppts, setLoadingAppts] = useState(false);

  useEffect(() => {
    if (user && token) {
      fetchAppointments();
    }
  }, [user, token]);

  const fetchAppointments = async () => {
    setLoadingAppts(true);
    try {
      const res = await fetch('http://localhost:5000/api/appointments/my', {
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
          doctorName: 'Dr. Evelyn Sterling',
          serviceName: 'Signature Porcelain Veneers',
          date: '2026-08-05',
          timeSlot: '11:00 AM',
          status: 'Confirmed',
          notes: 'Consultation for 8 upper veneers and smile simulation.'
        }
      ]);
    } finally {
      setLoadingAppts(false);
    }
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    const endpoint = isLoginTab ? '/api/auth/login' : '/api/auth/register';
    const payload = isLoginTab ? { email, password } : { name, email, password, phone };

    try {
      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        login(data.token, data.user);
      } else {
        setAuthError(data.message || 'Authentication failed');
      }
    } catch (err) {
      // Fallback mock login for offline mode
      login('mock_jwt_token_123', {
        id: 'usr-1',
        name: name || 'Demo Patient',
        email: email || 'patient@example.com',
        role: 'patient',
        phone: phone || '+1 555-0199'
      });
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto py-24 text-center text-slate-400">
        Loading Patient Portal...
      </div>
    );
  }

  // LOGIN / REGISTER FORM IF NOT LOGGED IN
  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="glass-card rounded-3xl p-8 border border-white/10 space-y-6 shadow-2xl">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto border border-cyan-500/30">
              <User className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-white">Patient Concierge Portal</h2>
            <p className="text-xs text-slate-400">Sign in to view appointments, medical records, and reports</p>
          </div>

          <div className="flex bg-navy-900 rounded-xl p-1 border border-white/10">
            <button
              onClick={() => setIsLoginTab(true)}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                isLoginTab ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLoginTab(false)}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                !isLoginTab ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400'
              }`}
            >
              Register
            </button>
          </div>

          {authError && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-400 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            {!isLoginTab && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Johnathan Miller"
                  className="w-full px-4 py-2.5 bg-navy-900 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="patient@example.com"
                className="w-full px-4 py-2.5 bg-navy-900 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 bg-navy-900 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            {!isLoginTab && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-2.5 bg-navy-900 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-300 text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-lg shadow-cyan-500/25"
            >
              {isLoginTab ? 'Sign In to Portal' : 'Create Patient Account'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // LOGGED IN PATIENT DASHBOARD PORTAL
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">

      {/* Patient Header */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-serif font-bold text-2xl border border-cyan-500/30">
            {user.name[0]}
          </div>
          <div>
            <h1 className="text-2xl font-serif font-bold text-white">Welcome, {user.name}</h1>
            <p className="text-xs text-slate-400">{user.email} • Concierge VIP Member</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/appointment"
            className="px-5 py-2.5 rounded-full bg-cyan-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-cyan-400 transition-all"
          >
            + New Appointment
          </Link>
          <button
            onClick={logout}
            className="p-2.5 rounded-full bg-navy-800 text-slate-400 hover:text-red-400 border border-white/10 transition-all"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Appointments List */}
      <div className="space-y-6">
        <h3 className="text-xl font-serif font-bold text-white flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-cyan-400" />
          <span>My Scheduled Consultations</span>
        </h3>

        {loadingAppts ? (
          <div className="text-xs text-slate-400 py-8">Loading appointments...</div>
        ) : appointments.length === 0 ? (
          <div className="glass-card rounded-2xl p-8 text-center space-y-3">
            <p className="text-xs text-slate-400">You currently have no scheduled appointments.</p>
            <Link
              href="/appointment"
              className="inline-block px-6 py-2.5 rounded-full bg-cyan-500 text-slate-950 font-bold text-xs"
            >
              Book First Appointment
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {appointments.map((appt) => (
              <div key={appt._id} className="glass-card rounded-2xl p-6 border border-white/10 space-y-4 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    appt.status === 'Confirmed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}>
                    {appt.status}
                  </span>
                  <span className="text-xs text-slate-400">{appt.date} at {appt.timeSlot}</span>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-white">{appt.serviceName}</h4>
                  <p className="text-xs text-cyan-300 font-medium">Specialist: {appt.doctorName}</p>
                  {appt.notes && <p className="text-xs text-slate-400 mt-2 bg-navy-900/60 p-2.5 rounded-xl border border-white/5">{appt.notes}</p>}
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Status: {appt.status}</span>
                  {appt.reportFile && (
                    <a
                      href={`http://localhost:5000${appt.reportFile}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-cyan-400 font-bold flex items-center space-x-1 hover:underline"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Record</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
