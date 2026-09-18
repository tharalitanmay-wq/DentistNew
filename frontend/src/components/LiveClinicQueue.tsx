'use client';

import React, { useState, useEffect } from 'react';
import { Users, Clock, CheckCircle2, Sparkles, RefreshCw, AlertCircle, MapPin, Hash } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { getApiUrl } from '@/config/api';

export default function LiveClinicQueue() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
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
      const res = await fetch(getApiUrl('/api/queue/today'));
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
    // Auto-refresh live count every 15 seconds
    const interval = setInterval(fetchLiveQueue, 15000);
    return () => clearInterval(interval);
  }, []);

  const waitingList = queueData.queue.filter((q) => !q.isTreated);

  return (
    <div
      className={`w-full rounded-3xl p-6 sm:p-8 border space-y-6 relative overflow-hidden transition-colors shadow-2xl ${
        isLight
          ? 'bg-white/95 border-slate-200 text-slate-900 shadow-slate-200/60'
          : 'bg-gradient-to-br from-slate-950 via-navy-950 to-slate-950 border-cyan-500/30 text-white shadow-2xl'
      }`}
    >
      {/* Background Decorative Glow */}
      <div
        className={`absolute top-0 right-0 w-64 h-64 blur-[90px] rounded-full pointer-events-none ${
          isLight ? 'bg-cyan-500/10' : 'bg-cyan-500/10'
        }`}
      />

      {/* Header */}
      <div
        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6 ${
          isLight ? 'border-slate-200' : 'border-white/10'
        }`}
      >
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
            </span>
            <span
              className={`text-[11px] font-mono uppercase tracking-widest font-bold ${
                isLight ? 'text-rose-600 font-extrabold' : 'text-rose-400'
              }`}
            >
              LIVE CLINIC QUEUE STATUS
            </span>
          </div>
          <h3
            className={`text-2xl font-serif font-bold flex items-center ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}
          >
            <MapPin className={`w-5 h-5 mr-2 shrink-0 ${isLight ? 'text-cyan-600' : 'text-cyan-400'}`} />
            Offline Centre Live Waiting Counter
          </h3>
          <p className={`text-xs ${isLight ? 'text-slate-600 font-medium' : 'text-slate-400'}`}>
            Real-time walk-in queue at Lumina Dental Studio. Auto-refreshes live as patients are treated.
          </p>
        </div>

        <div className="flex items-center space-x-3 self-start sm:self-auto">
          <div className="text-[10px] font-mono text-right hidden sm:block">
            <span className={isLight ? 'text-slate-600 font-medium' : 'text-slate-400'}>Auto-refreshes daily</span>
            <span className={`block font-bold ${isLight ? 'text-cyan-700' : 'text-cyan-400'}`}>
              Updated: {lastUpdated || 'Just now'}
            </span>
          </div>
          <button
            onClick={fetchLiveQueue}
            className={`p-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all border ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200 text-cyan-800 border-slate-300 shadow-sm'
                : 'bg-navy-900 hover:bg-navy-800 text-cyan-400 border-cyan-500/20'
            }`}
            title="Refresh Queue"
          >
            <RefreshCw className="w-4 h-4 animate-spin-slow" />
          </button>
        </div>
      </div>

      {/* Live Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Waiting Count Card */}
        <div
          className={`p-5 rounded-2xl border flex items-center justify-between transition-all ${
            isLight
              ? 'bg-amber-100/80 border-amber-300/90 shadow-sm'
              : 'bg-amber-500/10 border-amber-500/30'
          }`}
        >
          <div>
            <span
              className={`text-[11px] uppercase tracking-wider block ${
                isLight ? 'text-amber-900 font-extrabold' : 'text-amber-300 font-bold'
              }`}
            >
              Currently Waiting
            </span>
            <div
              className={`text-3xl font-serif font-bold mt-1 ${
                isLight ? 'text-amber-950 font-black' : 'text-white'
              }`}
            >
              {loading ? '...' : queueData.waitingCount}{' '}
              <span
                className={`text-xs font-sans font-bold ${
                  isLight ? 'text-amber-900' : 'text-amber-200 font-normal'
                }`}
              >
                patients in line
              </span>
            </div>
          </div>
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold ${
              isLight ? 'bg-amber-500/30 text-amber-900' : 'bg-amber-500/20 text-amber-400'
            }`}
          >
            <Clock className="w-6 h-6 animate-pulse" />
          </div>
        </div>

        {/* Treated Count Card */}
        <div
          className={`p-5 rounded-2xl border flex items-center justify-between transition-all ${
            isLight
              ? 'bg-emerald-100/80 border-emerald-300/90 shadow-sm'
              : 'bg-emerald-500/10 border-emerald-500/30'
          }`}
        >
          <div>
            <span
              className={`text-[11px] uppercase tracking-wider block ${
                isLight ? 'text-emerald-900 font-extrabold' : 'text-emerald-300 font-bold'
              }`}
            >
              Patients Treated Today
            </span>
            <div
              className={`text-3xl font-serif font-bold mt-1 ${
                isLight ? 'text-emerald-950 font-black' : 'text-white'
              }`}
            >
              {loading ? '...' : queueData.treatedCount}{' '}
              <span
                className={`text-xs font-sans font-bold ${
                  isLight ? 'text-emerald-900' : 'text-emerald-200 font-normal'
                }`}
              >
                completed
              </span>
            </div>
          </div>
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold ${
              isLight ? 'bg-emerald-500/30 text-emerald-900' : 'bg-emerald-500/20 text-emerald-400'
            }`}
          >
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        {/* Total Registered Today */}
        <div
          className={`p-5 rounded-2xl border flex items-center justify-between transition-all ${
            isLight
              ? 'bg-sky-100/80 border-sky-300/90 shadow-sm'
              : 'bg-cyan-500/10 border-cyan-500/30'
          }`}
        >
          <div>
            <span
              className={`text-[11px] uppercase tracking-wider block ${
                isLight ? 'text-sky-900 font-extrabold' : 'text-cyan-300 font-bold'
              }`}
            >
              Total Walk-Ins Today
            </span>
            <div
              className={`text-3xl font-serif font-bold mt-1 ${
                isLight ? 'text-sky-950 font-black' : 'text-white'
              }`}
            >
              {loading ? '...' : queueData.totalToday}{' '}
              <span
                className={`text-xs font-sans font-bold ${
                  isLight ? 'text-sky-900' : 'text-cyan-200 font-normal'
                }`}
              >
                registered
              </span>
            </div>
          </div>
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold ${
              isLight ? 'bg-sky-500/30 text-sky-900' : 'bg-cyan-500/20 text-cyan-400'
            }`}
          >
            <Users className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Currently Waiting Tokens Banner */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <span className={`text-xs font-bold flex items-center ${isLight ? 'text-slate-900' : 'text-slate-300'}`}>
            <Hash className={`w-3.5 h-3.5 mr-1.5 ${isLight ? 'text-cyan-700' : 'text-cyan-500'}`} />
            Tokens Currently in Line:
          </span>
          <span className={`text-[11px] font-bold ${isLight ? 'text-slate-700' : 'text-slate-400'}`}>
            {waitingList.length > 0 ? `${waitingList.length} Active Tokens` : 'No Patients Waiting'}
          </span>
        </div>

        {waitingList.length === 0 ? (
          <div
            className={`p-4 rounded-2xl border text-center text-xs flex items-center justify-center space-x-2 ${
              isLight
                ? 'bg-white border-slate-200 text-slate-800 font-medium shadow-sm'
                : 'bg-navy-900/60 border-white/5 text-slate-400'
            }`}
          >
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <span>The queue is currently empty! Walk-in patients can receive immediate consultation.</span>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {waitingList.map((item) => (
              <div
                key={item.id}
                className={`px-3.5 py-2 rounded-xl border text-xs font-mono flex items-center space-x-2 shadow-sm transition-all ${
                  isLight
                    ? 'bg-white border-slate-300 text-slate-900 shadow-sm'
                    : 'bg-navy-900/90 border-cyan-500/30 text-slate-200'
                }`}
              >
                <span
                  className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                    isLight
                      ? 'bg-cyan-100 text-cyan-950 border border-cyan-300 font-extrabold'
                      : 'bg-cyan-500/20 text-cyan-300'
                  }`}
                >
                  {item.tokenNumber}
                </span>
                <span
                  className={`text-[11px] font-bold truncate max-w-[140px] ${
                    isLight ? 'text-slate-900' : 'text-slate-300'
                  }`}
                >
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
