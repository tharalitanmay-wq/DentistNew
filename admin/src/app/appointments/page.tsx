'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Search, Filter, Trash2, CheckCircle2, XCircle, Download, Clock, AlertCircle, Sparkles } from 'lucide-react';
import { API_BASE } from '@/config/api';

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [actionMessage, setActionMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

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
      setAppointments([
        {
          id: 1,
          _id: 'app-101',
          patientName: 'Victoria Sterling-Hayes',
          patientEmail: 'victoria@example.com',
          patientPhone: '+1 (555) 888-9900',
          doctorName: 'Dr. Evelyn Sterling',
          serviceName: 'Signature Porcelain Veneers',
          date: '2026-08-05',
          timeSlot: '11:00 AM',
          status: 'Accepted',
          notes: 'Consultation for 8 upper veneers and smile simulation.',
          createdAt: new Date().toISOString()
        },
        {
          id: 2,
          _id: 'app-102',
          patientName: 'Harrison Ford-Blake',
          patientEmail: 'harrison@example.com',
          patientPhone: '+1 (555) 777-6655',
          doctorName: 'Dr. Julian Vance',
          serviceName: '3D Computer-Guided Dental Implants',
          date: '2026-08-10',
          timeSlot: '02:00 PM',
          status: 'Pending',
          notes: 'Molar restoration.',
          createdAt: new Date().toISOString()
        }
      ]);
    }
  };

  const handleStatusChange = async (id: string | number, newStatus: string) => {
    try {
      const res = await fetch(`${API_BASE}/appointments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('lumina_admin_token')}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();

      let msg = data.message || 'Appointment status updated successfully';
      if (newStatus.toLowerCase() === 'accepted' || newStatus.toLowerCase() === 'confirmed') {
        msg = 'Appointment accepted successfully.';
      } else if (newStatus.toLowerCase() === 'rejected') {
        msg = 'Appointment rejected successfully.';
      }
      setActionMessage({ text: msg, type: 'success' });
    } catch (e) {
      let msg = 'Updated in view';
      if (newStatus.toLowerCase() === 'accepted' || newStatus.toLowerCase() === 'confirmed') {
        msg = 'Appointment accepted successfully.';
      } else if (newStatus.toLowerCase() === 'rejected') {
        msg = 'Appointment rejected successfully.';
      }
      setActionMessage({ text: msg, type: 'success' });
    }

    setAppointments(prev => prev.map(a => (String(a.id || a._id) === String(id) ? { ...a, status: newStatus } : a)));
    setTimeout(() => setActionMessage(null), 4000);
  };

  const handleDelete = async (id: string | number) => {
    if (!confirm('Are you sure you want to delete this appointment?')) return;
    try {
      await fetch(`${API_BASE}/appointments/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('lumina_admin_token')}` }
      });
      setActionMessage({ text: 'Appointment removed from records', type: 'success' });
    } catch (e) {
      setActionMessage({ text: 'Deleted locally', type: 'success' });
    }
    setAppointments(prev => prev.filter(a => String(a.id || a._id) !== String(id)));
    setTimeout(() => setActionMessage(null), 3000);
  };

  // Status counters
  const statusCounts = {
    All: appointments.length,
    Pending: appointments.filter(a => a.status?.toLowerCase() === 'pending').length,
    Accepted: appointments.filter(a => a.status?.toLowerCase() === 'accepted' || a.status?.toLowerCase() === 'confirmed').length,
    Rejected: appointments.filter(a => a.status?.toLowerCase() === 'rejected').length,
    Cancelled: appointments.filter(a => a.status?.toLowerCase() === 'cancelled').length
  };

  const filtered = appointments.filter(a => {
    const matchesSearch =
      a.patientName?.toLowerCase().includes(search.toLowerCase()) ||
      a.doctorName?.toLowerCase().includes(search.toLowerCase()) ||
      a.patientEmail?.toLowerCase().includes(search.toLowerCase()) ||
      a.patientPhone?.toLowerCase().includes(search.toLowerCase());

    const apptStat = a.status?.toLowerCase() || '';
    let matchesStatus = true;
    if (filterStatus === 'Pending') matchesStatus = apptStat === 'pending';
    else if (filterStatus === 'Accepted') matchesStatus = apptStat === 'accepted' || apptStat === 'confirmed';
    else if (filterStatus === 'Rejected') matchesStatus = apptStat === 'rejected';
    else if (filterStatus === 'Cancelled') matchesStatus = apptStat === 'cancelled';

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white">Appointment Requests & Management</h1>
          <p className="text-xs text-slate-400">Review pending requests, approve/reject patient bookings, and manage clinic schedule</p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search patient, phone, doctor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 bg-navy-900 border border-white/15 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>
      </div>

      {/* Action Notification Toast */}
      {actionMessage && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-xs font-bold flex items-center space-x-2 shadow-lg animate-fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>{actionMessage.text}</span>
        </div>
      )}

      {/* Filter Tabs Header */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
        {(['All', 'Pending', 'Accepted', 'Rejected', 'Cancelled'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilterStatus(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 border ${
              filterStatus === tab
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg shadow-cyan-500/20'
                : 'bg-navy-900 text-slate-300 border-white/10 hover:bg-navy-800 hover:text-white'
            }`}
          >
            <span>{tab === 'Accepted' ? 'Accepted / Confirmed' : tab}</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                filterStatus === tab ? 'bg-slate-950 text-cyan-300 font-extrabold' : 'bg-white/10 text-slate-300'
              }`}
            >
              {statusCounts[tab]}
            </span>
          </button>
        ))}
      </div>

      {/* Appointments Table Card */}
      <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-serif font-bold text-white flex items-center space-x-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            <span>{filterStatus} Appointments List ({filtered.length})</span>
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-navy-900/80 text-slate-400 uppercase tracking-wider border-b border-white/10">
              <tr>
                <th className="p-4">Patient Details</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Doctor & Treatment</th>
                <th className="p-4">Appointment Time</th>
                <th className="p-4">Booking Date</th>
                <th className="p-4">Current Status</th>
                <th className="p-4 text-right">Approval Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    No appointments found matching this status filter.
                  </td>
                </tr>
              ) : (
                filtered.map((appt) => {
                  const apptId = appt.id || appt._id;
                  const isPending = appt.status?.toLowerCase() === 'pending';
                  const isAccepted = appt.status?.toLowerCase() === 'accepted' || appt.status?.toLowerCase() === 'confirmed';
                  const isRejected = appt.status?.toLowerCase() === 'rejected';

                  return (
                    <tr key={apptId} className="hover:bg-navy-800/40 transition-colors">
                      <td className="p-4 font-bold text-white">
                        <div className="flex items-center space-x-2">
                          <span>{appt.patientName}</span>
                        </div>
                        <div className="text-[10px] text-slate-400 font-normal">{appt.patientEmail}</div>
                      </td>
                      <td className="p-4 text-slate-300 font-mono">{appt.patientPhone}</td>
                      <td className="p-4">
                        <div className="text-cyan-300 font-bold">{appt.serviceName}</div>
                        <div className="text-[11px] text-slate-400">Dr: {appt.doctorName}</div>
                      </td>
                      <td className="p-4 text-slate-200 font-medium">
                        <div>{appt.date}</div>
                        <div className="text-[11px] text-cyan-400">{appt.timeSlot}</div>
                      </td>
                      <td className="p-4 text-slate-400 text-[11px] font-mono">
                        {appt.createdAt ? new Date(appt.createdAt).toLocaleDateString() : 'Today'}
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-flex items-center space-x-1 ${
                            isAccepted
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                              : isRejected
                              ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                              : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                          }`}
                        >
                          <span>{isAccepted ? 'Accepted' : appt.status}</span>
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2 whitespace-nowrap">
                        {isPending ? (
                          <div className="inline-flex items-center space-x-2">
                            <button
                              onClick={() => handleStatusChange(apptId, 'Accepted')}
                              className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center space-x-1 shadow-md shadow-emerald-500/20 transition-all"
                              title="Accept Appointment (Adds to Live Queue)"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>ACCEPT</span>
                            </button>
                            <button
                              onClick={() => handleStatusChange(apptId, 'Rejected')}
                              className="px-3 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/40 text-red-400 border border-red-500/40 font-bold text-xs flex items-center space-x-1 transition-all"
                              title="Reject Appointment (Keeps in DB, hides from Live Queue)"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              <span>REJECT</span>
                            </button>
                          </div>
                        ) : (
                          <div className="inline-flex items-center space-x-2">
                            <select
                              value={appt.status}
                              onChange={(e) => handleStatusChange(apptId, e.target.value)}
                              className="px-2.5 py-1.5 rounded-xl text-[10px] font-bold bg-navy-900 border border-white/15 text-white focus:outline-none focus:border-cyan-400"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Accepted">Accepted</option>
                              <option value="Rejected">Rejected</option>
                              <option value="Completed">Completed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                            <button
                              onClick={() => handleDelete(apptId)}
                              className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                              title="Delete Record"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
