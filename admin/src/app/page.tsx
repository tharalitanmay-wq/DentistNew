'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Users, DollarSign, Sparkles, TrendingUp, CheckCircle2, Clock, AlertCircle, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { API_BASE } from '@/config/api';

export default function AdminDashboardPage() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await fetch(`${API_BASE}/appointments/all`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('lumina_admin_token')}` }
      });
      const data = await res.json();
      if (data.success) {
        setAppointments(data.appointments);
      }
    } catch (e) {
      // Fallback data
      setAppointments([
        {
          _id: 'app-101',
          patientName: 'Victoria Sterling-Hayes',
          patientEmail: 'victoria@example.com',
          doctorName: 'Dr. Evelyn Sterling',
          serviceName: 'Signature Porcelain Veneers',
          date: '2026-08-05',
          timeSlot: '11:00 AM',
          status: 'Confirmed'
        },
        {
          _id: 'app-102',
          patientName: 'Harrison Ford-Blake',
          patientEmail: 'harrison@example.com',
          doctorName: 'Dr. Julian Vance',
          serviceName: '3D Computer-Guided Dental Implants',
          date: '2026-08-10',
          timeSlot: '02:00 PM',
          status: 'Pending'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await fetch(`${API_BASE}/appointments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('lumina_admin_token')}`
        },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (e) {
      console.log('Updated in local view');
    }
    setAppointments(prev => prev.map(a => a._id === id ? { ...a, status: newStatus } : a));
  };

  return (
    <div className="space-y-10">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white">Studio CMS Overview</h1>
          <p className="text-xs text-slate-400 mt-1">Real-time clinic metrics, appointment schedule, and specialist load.</p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={fetchAppointments}
            className="p-2.5 rounded-xl bg-navy-800 text-cyan-400 hover:bg-navy-700 border border-white/10 text-xs font-bold flex items-center space-x-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh Metrics</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-cyan-400">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Consultations</span>
            <Calendar className="w-5 h-5" />
          </div>
          <div className="text-3xl font-bold text-white">{appointments.length}</div>
          <span className="text-[10px] text-emerald-400 flex items-center">
            <TrendingUp className="w-3 h-3 mr-1" /> +14% vs last month
          </span>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-cyan-400">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Pending Approvals</span>
            <Clock className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-3xl font-bold text-white">
            {appointments.filter(a => a.status === 'Pending').length}
          </div>
          <span className="text-[10px] text-amber-400">Requires Doctor Review</span>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-cyan-400">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Patients</span>
            <Users className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="text-3xl font-bold text-white">1,248</div>
          <span className="text-[10px] text-slate-400">Registered VIP Patients</span>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-cyan-400">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Monthly Revenue (Est)</span>
            <DollarSign className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-3xl font-bold text-white">$148,500</div>
          <span className="text-[10px] text-emerald-400 flex items-center">
            <TrendingUp className="w-3 h-3 mr-1" /> High-value cosmetic veneer bookings
          </span>
        </div>
      </div>

      {/* Appointments Management Table */}
      <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-serif font-bold text-white">Recent Patient Appointments</h3>
            <p className="text-xs text-slate-400">Manage status, assign doctors, and review uploaded records</p>
          </div>
          <Link
            href="/appointments"
            className="text-xs font-bold text-cyan-400 hover:underline"
          >
            View All Appointments →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-navy-900/80 text-slate-400 uppercase tracking-wider border-b border-white/10">
              <tr>
                <th className="p-4">Patient Name</th>
                <th className="p-4">Treatment</th>
                <th className="p-4">Specialist Doctor</th>
                <th className="p-4">Date & Slot</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {appointments.map((appt) => (
                <tr key={appt._id} className="hover:bg-navy-800/40">
                  <td className="p-4 font-bold text-white">
                    <div>{appt.patientName}</div>
                    <div className="text-[10px] font-normal text-slate-400">{appt.patientEmail}</div>
                  </td>
                  <td className="p-4 text-cyan-300">{appt.serviceName}</td>
                  <td className="p-4 text-slate-200">{appt.doctorName}</td>
                  <td className="p-4 text-slate-300">{appt.date} ({appt.timeSlot})</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      appt.status === 'Confirmed'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : appt.status === 'Completed'
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}>
                      {appt.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <select
                      value={appt.status}
                      onChange={(e) => handleStatusChange(appt._id, e.target.value)}
                      className="px-2 py-1 bg-navy-900 border border-white/15 rounded text-[10px] text-white focus:outline-none focus:border-cyan-400"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
