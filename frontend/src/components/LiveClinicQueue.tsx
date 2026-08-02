'use client';

import React, { useState, useEffect } from 'react';
import { Users, Clock, CheckCircle2, Sparkles, RefreshCw, AlertCircle, MapPin, Hash } from 'lucide-react';

export default function LiveClinicQueue() {
  const [queueData, setQueueData] = useState<{
    waitingCount: number;
    treatedCount: number;
    totalToday: number;
    queue: any[];
  }>({
    waitingCount: 0,
    treatedCount: 0,
    totalToday: 0,
    queue: []
  });

  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  const fetchLiveQueue = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/queue/today');
      const data = await res.json();
      if (data.success) {
        setQueueData({
          waitingCount: data.waitingCount,
          treatedCount: data.treatedCount,
          totalToday: data.totalToday,
          queue: data.queue || []
        });
        setLastUpdated(new Date().toLocaleTimeString());
      }
    } catch (error) {
      console.log('Error loading live queue:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveQueue();
    // Auto-refresh live count every 5 seconds
    const interval = setInterval(fetchLiveQueue, 5000);
    return () => clearInterval(interval);
  }, []);

  const waitingList = queueData.queue.filter((q) => !q.isTreated);

  return (
    <div className="w-full glass-card rounded-3xl p-6 sm:p-8 border border-cyan-500/30 space-y-6 relative overflow-hidden bg-gradient-to-br from-slate-950 via-navy-950 to-slate-950 shadow-2xl">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[90px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
            </span>
            <span className="text-[11px] font-mono uppercase tracking-widest text-rose-400 font-bold">
              LIVE CLINIC QUEUE STATUS
            </span>
          </div>
          <h3 className="text-2xl font-serif font-bold text-white flex items-center">
            <MapPin className="w-5 h-5 text-cyan-400 mr-2 shrink-0" />
            Offline Centre Live Waiting Counter
          </h3>
          <p className="text-xs text-slate-400">
            Real-time walk-in queue at Lumina Dental Studio. Auto-refreshes live as patients are treated.
          </p>
        </div>

        <div className="flex items-center space-x-3 self-start sm:self-auto">
          <div className="text-[10px] font-mono text-slate-400 text-right hidden sm:block">
            <span>Auto-refreshes daily</span>
            <span className="block text-cyan-400">Updated: {lastUpdated || 'Just now'}</span>
          </div>
          <button
            onClick={fetchLiveQueue}
            className="p-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-cyan-400 border border-cyan-500/20 text-xs font-bold flex items-center space-x-2 transition-all"
            title="Refresh Queue"
          >
            <RefreshCw className="w-4 h-4 animate-spin-slow" />
          </button>
        </div>
      </div>

      {/* Live Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Waiting Count Card */}
        <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block">
              Currently Waiting
            </span>
            <div className="text-3xl font-serif font-bold text-white mt-1">
              {loading ? '...' : queueData.waitingCount} <span className="text-xs font-sans text-amber-200 font-normal">patients in line</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <Clock className="w-6 h-6 animate-pulse" />
          </div>
        </div>

        {/* Treated Count Card */}
        <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider block">
              Patients Treated Today
            </span>
            <div className="text-3xl font-serif font-bold text-white mt-1">
              {loading ? '...' : queueData.treatedCount} <span className="text-xs font-sans text-emerald-200 font-normal">completed</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        {/* Total Registered Today */}
        <div className="p-5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-cyan-300 uppercase tracking-wider block">
              Total Walk-Ins Today
            </span>
            <div className="text-3xl font-serif font-bold text-white mt-1">
              {loading ? '...' : queueData.totalToday} <span className="text-xs font-sans text-cyan-200 font-normal">registered</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
            <Users className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Currently Waiting Tokens Banner */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-300 flex items-center">
            <Hash className="w-3.5 h-3.5 text-cyan-400 mr-1.5" />
            Tokens Currently in Line:
          </span>
          <span className="text-[11px] text-slate-400">
            {waitingList.length > 0 ? `${waitingList.length} Active Tokens` : 'No Patients Waiting'}
          </span>
        </div>

        {waitingList.length === 0 ? (
          <div className="p-4 rounded-2xl bg-navy-900/60 border border-white/5 text-center text-xs text-slate-400 flex items-center justify-center space-x-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>The queue is currently empty! Walk-in patients can receive immediate consultation.</span>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {waitingList.map((item) => (
              <div
                key={item.id}
                className="px-3.5 py-2 rounded-xl bg-navy-900/90 border border-cyan-500/30 text-xs font-mono flex items-center space-x-2 shadow-sm"
              >
                <span className="font-bold text-cyan-300 bg-cyan-500/20 px-2 py-0.5 rounded text-[11px]">
                  {item.tokenNumber}
                </span>
                <span className="text-slate-300 text-[11px] truncate max-w-[140px]">
                  {item.reason}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
