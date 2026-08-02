'use client';

import React, { useState, useEffect } from 'react';
import { Users, Clock, CheckCircle2, UserPlus, RefreshCw, AlertCircle, Trash2, Phone, Hash, FileText } from 'lucide-react';

export default function AdminQueuePage() {
  const [queue, setQueue] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [waitingCount, setWaitingCount] = useState(0);
  const [treatedCount, setTreatedCount] = useState(0);
  const [totalToday, setTotalToday] = useState(0);

  // Form State
  const [patientName, setPatientName] = useState('');
  const [patientNumber, setPatientNumber] = useState('');
  const [reason, setReason] = useState('');
  const [tokenNumber, setTokenNumber] = useState('');
  const [isTreated, setIsTreated] = useState('no'); // 'no' or 'yes'
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchQueue();
    const interval = setInterval(fetchQueue, 5000); // Auto-refresh every 5s
    return () => clearInterval(interval);
  }, []);

  const fetchQueue = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/queue/today');
      const data = await res.json();
      if (data.success) {
        setQueue(data.queue);
        setWaitingCount(data.waitingCount);
        setTreatedCount(data.treatedCount);
        setTotalToday(data.totalToday);

        // Auto suggest next token if empty
        if (!tokenNumber && data.queue) {
          const nextNum = data.totalToday + 1;
          setTokenNumber(`TK-${String(nextNum).padStart(2, '0')}`);
        }
      }
    } catch (error) {
      console.log('Error fetching queue:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPatient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !patientNumber || !reason) {
      setMessage({ type: 'error', text: 'Please fill in Name, Phone Number, and Reason.' });
      return;
    }

    setSubmitting(true);
    setMessage(null);

    try {
      const res = await fetch('http://localhost:5000/api/queue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientName,
          patientNumber,
          reason,
          tokenNumber: tokenNumber || `TK-${String(totalToday + 1).padStart(2, '0')}`,
          isTreated: isTreated === 'yes'
        })
      });

      const data = await res.json();
      if (data.success) {
        setMessage({ type: 'success', text: `Patient ${patientName} added to live queue! Token: ${data.entry.tokenNumber}` });
        setPatientName('');
        setPatientNumber('');
        setReason('');
        setTokenNumber('');
        setIsTreated('no');
        fetchQueue();
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to add patient.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Could not connect to backend server.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleTreated = async (id: number, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    // Optimistic UI update
    setQueue(prev => prev.map(item => item.id === id ? { ...item, isTreated: newStatus } : item));

    try {
      await fetch(`http://localhost:5000/api/queue/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isTreated: newStatus })
      });
      fetchQueue();
    } catch (error) {
      console.log('Status update error:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to remove this patient from today\'s queue?')) return;
    setQueue(prev => prev.filter(item => item.id !== id));

    try {
      await fetch(`http://localhost:5000/api/queue/${id}`, {
        method: 'DELETE'
      });
      fetchQueue();
    } catch (error) {
      console.log('Delete error:', error);
    }
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white flex items-center">
            <Users className="w-8 h-8 text-cyan-400 mr-3" />
            Offline Centre Live Queue
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Register walk-in patients and manage real-time waiting queue displayed on the website.
          </p>
        </div>

        <button
          onClick={fetchQueue}
          className="px-4 py-2 rounded-xl bg-navy-800 text-cyan-400 hover:bg-navy-700 border border-white/10 text-xs font-bold flex items-center space-x-2 w-fit"
        >
          <RefreshCw className="w-4 h-4 animate-spin-slow" />
          <span>Refresh Live Queue</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-card rounded-2xl p-6 border border-cyan-500/30 space-y-2 bg-cyan-950/20">
          <div className="flex items-center justify-between text-cyan-400">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Live Waiting in Queue</span>
            <Clock className="w-6 h-6 text-amber-400 animate-pulse" />
          </div>
          <div className="text-4xl font-bold text-white">{waitingCount}</div>
          <p className="text-[11px] text-amber-400">Displayed as live waiting count on website</p>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-emerald-500/30 space-y-2 bg-emerald-950/20">
          <div className="flex items-center justify-between text-emerald-400">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Patients Treated Today</span>
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
          </div>
          <div className="text-4xl font-bold text-white">{treatedCount}</div>
          <p className="text-[11px] text-emerald-400">Consultation completed today</p>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-cyan-400">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Walk-ins Today</span>
            <UserPlus className="w-6 h-6 text-indigo-400" />
          </div>
          <div className="text-4xl font-bold text-white">{totalToday}</div>
          <p className="text-[11px] text-slate-400">Auto-resets every day</p>
        </div>
      </div>

      {/* Main Grid: Add Form + Live Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Form Column: Add Walk-in Patient */}
        <div className="glass-card rounded-3xl p-6 border border-cyan-500/20 space-y-6 h-fit">
          <div className="border-b border-white/10 pb-4">
            <h2 className="text-lg font-serif font-bold text-white flex items-center">
              <UserPlus className="w-5 h-5 text-cyan-400 mr-2" />
              Register Offline Walk-in
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Fill patient details to add them to today's queue</p>
          </div>

          {message && (
            <div className={`p-3.5 rounded-xl text-xs flex items-center space-x-2 ${
              message.type === 'success' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
            }`}>
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{message.text}</span>
            </div>
          )}

          <form onSubmit={handleAddPatient} className="space-y-4">
            {/* Patient Name */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Patient Name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Alexander Vance"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-navy-950/80 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Phone Number <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. +1 (555) 019-2834"
                  value={patientNumber}
                  onChange={(e) => setPatientNumber(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 bg-navy-950/80 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            {/* Reason */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Reason for Visit <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <FileText className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Tooth ache, Whitening, Cleaning"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 bg-navy-950/80 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            {/* Token Number & Treated Dropdown */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Token Number
                </label>
                <div className="relative">
                  <Hash className="w-3.5 h-3.5 text-cyan-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="TK-01"
                    value={tokenNumber}
                    onChange={(e) => setTokenNumber(e.target.value)}
                    className="w-full pl-8 pr-2 py-2.5 bg-navy-950/80 border border-white/15 rounded-xl text-xs text-cyan-300 font-mono font-bold focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Patient Treated?
                </label>
                <select
                  value={isTreated}
                  onChange={(e) => setIsTreated(e.target.value)}
                  className="w-full px-3 py-2.5 bg-navy-950/80 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400 font-bold"
                >
                  <option value="no">No (In Queue)</option>
                  <option value="yes">Yes (Treated)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center justify-center space-x-2 transition-all duration-200 shadow-lg shadow-cyan-500/20"
            >
              <UserPlus className="w-4 h-4" />
              <span>{submitting ? 'Adding...' : 'Add Patient to Live Queue'}</span>
            </button>
          </form>
        </div>

        {/* Live Queue Table Column */}
        <div className="lg:col-span-2 glass-card rounded-3xl p-6 border border-white/10 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-serif font-bold text-white flex items-center">
                Today's Live Queue List
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Toggle "Patient Treated" column to YES when consultation finishes to reduce website queue count.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-navy-900/90 text-slate-400 uppercase tracking-wider border-b border-white/10">
                <tr>
                  <th className="p-3.5">Token #</th>
                  <th className="p-3.5">Patient Details</th>
                  <th className="p-3.5">Reason for Visit</th>
                  <th className="p-3.5">Patient Treated?</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {queue.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-400">
                      No walk-in patients registered for today yet. Use the form on the left to add one!
                    </td>
                  </tr>
                ) : (
                  queue.map((item) => (
                    <tr key={item.id} className={`hover:bg-navy-800/40 transition-colors ${item.isTreated ? 'opacity-60 bg-emerald-950/10' : ''}`}>
                      <td className="p-3.5 font-mono font-bold text-cyan-300">
                        <span className="px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-400/20">
                          {item.tokenNumber}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <div className="font-bold text-white text-sm">{item.patientName}</div>
                        <div className="text-[11px] text-slate-400">{item.patientNumber}</div>
                      </td>
                      <td className="p-3.5 text-slate-300 max-w-xs truncate">{item.reason}</td>
                      <td className="p-3.5">
                        <button
                          onClick={() => handleToggleTreated(item.id, item.isTreated)}
                          className={`px-3 py-1.5 rounded-full text-[11px] font-bold flex items-center space-x-1.5 border transition-all duration-200 ${
                            item.isTreated
                              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/30'
                              : 'bg-amber-500/20 text-amber-400 border-amber-500/40 hover:bg-amber-500/30 animate-pulse'
                          }`}
                        >
                          {item.isTreated ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>YES (Treated)</span>
                            </>
                          ) : (
                            <>
                              <Clock className="w-3.5 h-3.5" />
                              <span>NO (In Queue)</span>
                            </>
                          )}
                        </button>
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/20 transition-colors"
                          title="Remove patient"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
