'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Search, Filter, Trash2, CheckCircle2, Download } from 'lucide-react';

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/appointments/all', {
        headers: { Authorization: `Bearer ${localStorage.getItem('lumina_admin_token')}` }
      });
      const data = await res.json();
      if (data.success) {
        setAppointments(data.appointments);
      }
    } catch (e) {
      setAppointments([
        {
          _id: 'app-101',
          patientName: 'Victoria Sterling-Hayes',
          patientEmail: 'victoria@example.com',
          patientPhone: '+1 (555) 888-9900',
          doctorName: 'Dr. Evelyn Sterling',
          serviceName: 'Signature Porcelain Veneers',
          date: '2026-08-05',
          timeSlot: '11:00 AM',
          status: 'Confirmed',
          notes: 'Consultation for 8 upper veneers and smile simulation.'
        },
        {
          _id: 'app-102',
          patientName: 'Harrison Ford-Blake',
          patientEmail: 'harrison@example.com',
          patientPhone: '+1 (555) 777-6655',
          doctorName: 'Dr. Julian Vance',
          serviceName: '3D Computer-Guided Dental Implants',
          date: '2026-08-10',
          timeSlot: '02:00 PM',
          status: 'Pending',
          notes: 'Molar restoration.'
        }
      ]);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await fetch(`http://localhost:5000/api/appointments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('lumina_admin_token')}`
        },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (e) {
      console.log('Updated in view');
    }
    setAppointments(prev => prev.map(a => a._id === id ? { ...a, status: newStatus } : a));
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this appointment?')) return;
    try {
      await fetch(`http://localhost:5000/api/appointments/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('lumina_admin_token')}` }
      });
    } catch (e) {
      console.log('Deleted locally');
    }
    setAppointments(prev => prev.filter(a => a._id !== id));
  };

  const filtered = appointments.filter(a => {
    const matchesSearch = a.patientName.toLowerCase().includes(search.toLowerCase()) || a.doctorName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'All' || a.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white">Appointments Management</h1>
          <p className="text-xs text-slate-400">View, update, filter, or delete patient bookings</p>
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="text"
            placeholder="Search patient or doctor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 bg-navy-900 border border-white/15 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 bg-navy-900 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="glass-card rounded-3xl p-6 border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-navy-900/80 text-slate-400 uppercase tracking-wider border-b border-white/10">
              <tr>
                <th className="p-4">Patient</th>
                <th className="p-4">Phone / Contact</th>
                <th className="p-4">Treatment</th>
                <th className="p-4">Doctor</th>
                <th className="p-4">Date & Slot</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((appt) => (
                <tr key={appt._id} className="hover:bg-navy-800/40">
                  <td className="p-4 font-bold text-white">
                    <div>{appt.patientName}</div>
                    <div className="text-[10px] text-slate-400 font-normal">{appt.patientEmail}</div>
                  </td>
                  <td className="p-4 text-slate-300">{appt.patientPhone}</td>
                  <td className="p-4 text-cyan-300 font-medium">{appt.serviceName}</td>
                  <td className="p-4 text-slate-200">{appt.doctorName}</td>
                  <td className="p-4 text-slate-300">{appt.date} at {appt.timeSlot}</td>
                  <td className="p-4">
                    <select
                      value={appt.status}
                      onChange={(e) => handleStatusChange(appt._id, e.target.value)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold bg-navy-900 border text-white focus:outline-none ${
                        appt.status === 'Confirmed' ? 'border-emerald-500 text-emerald-400' : 'border-amber-500 text-amber-400'
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleDelete(appt._id)}
                      className="p-1.5 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20"
                      title="Delete Appointment"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
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
