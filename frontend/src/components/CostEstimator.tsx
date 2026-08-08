'use client';

import React, { useState } from 'react';
import { Calculator, Sparkles, CheckCircle2, DollarSign, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';

export default function CostEstimator() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [procedure, setProcedure] = useState('veneers');
  const [teethCount, setTeethCount] = useState(6);
  const [hasInsurance, setHasInsurance] = useState(false);
  const [financingMonths, setFinancingMonths] = useState(24);

  const procedureRates: Record<string, { name: string; pricePerUnit: number; insuranceCoveragePct: number }> = {
    veneers: { name: 'Porcelain Veneers', pricePerUnit: 1400, insuranceCoveragePct: 0.1 },
    implants: { name: '3D Dental Implants', pricePerUnit: 2800, insuranceCoveragePct: 0.35 },
    invisalign: { name: 'Invisalign Full Treatment', pricePerUnit: 4500, insuranceCoveragePct: 0.25 },
    whitening: { name: 'Laser Spa Whitening', pricePerUnit: 550, insuranceCoveragePct: 0.0 },
    crowns: { name: 'Full Zirconia Crown', pricePerUnit: 1100, insuranceCoveragePct: 0.4 },
  };

  const current = procedureRates[procedure];
  const isFixedTreatment = procedure === 'invisalign' || procedure === 'whitening';
  const totalUnits = isFixedTreatment ? 1 : teethCount;
  const rawSubtotal = current.pricePerUnit * totalUnits;
  const insuranceSavings = hasInsurance ? Math.round(rawSubtotal * current.insuranceCoveragePct) : 0;
  const netTotal = Math.max(0, rawSubtotal - insuranceSavings);
  const monthlyPayment = Math.round(netTotal / financingMonths);

  return (
    <div className={`w-full max-w-4xl mx-auto glass-card rounded-3xl p-6 sm:p-8 md:p-10 border shadow-2xl relative overflow-hidden ${
      isLight ? 'bg-white border-slate-200 shadow-slate-200/50' : 'border-white/15'
    }`}>
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center space-x-3 mb-8">
        <div className="p-3 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 rounded-2xl border border-cyan-500/20">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h3 className={`text-xl sm:text-2xl font-serif font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Treatment Cost Estimator</h3>
          <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Calculate instant transparent estimates with 0% APR financing options</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          {/* Select Procedure */}
          <div>
            <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              Select Procedure
            </label>
            <select
              value={procedure}
              onChange={(e) => setProcedure(e.target.value)}
              className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:border-cyan-500 ${
                isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-navy-900 border-white/15 text-white'
              }`}
            >
              <option value="veneers">Porcelain Veneers ($1,400 / tooth)</option>
              <option value="implants">3D Dental Implants ($2,800 / tooth)</option>
              <option value="invisalign">Invisalign Full Treatment ($4,500 flat)</option>
              <option value="whitening">Laser Teeth Whitening ($550 flat)</option>
              <option value="crowns">Zirconia Crowns ($1,100 / tooth)</option>
            </select>
          </div>

          {/* Teeth Count Slider (If applicable) */}
          {!isFixedTreatment && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className={`text-xs font-semibold uppercase tracking-wider ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  Number of Teeth
                </label>
                <span className="text-sm font-bold text-cyan-600 dark:text-cyan-400">{teethCount} Teeth</span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                value={teethCount}
                onChange={(e) => setTeethCount(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-navy-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>1 Single</span>
                <span>6 Arch</span>
                <span>10 Smile Line</span>
                <span>20 Full Mouth</span>
              </div>
            </div>
          )}

          {/* Insurance Toggle */}
          <div className={`flex items-center justify-between p-4 rounded-xl border ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-navy-900/60 border-white/10'
          }`}>
            <div>
              <span className={`text-sm font-medium block ${isLight ? 'text-slate-900' : 'text-white'}`}>Apply Dental Insurance</span>
              <span className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Est. 10% - 40% coverage adjustment</span>
            </div>
            <input
              type="checkbox"
              checked={hasInsurance}
              onChange={(e) => setHasInsurance(e.target.checked)}
              className="w-5 h-5 accent-cyan-500 rounded cursor-pointer"
            />
          </div>

          {/* Financing Term */}
          <div>
            <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              0% APR Financing Duration
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[12, 24, 36].map((months) => (
                <button
                  key={months}
                  onClick={() => setFinancingMonths(months)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                    financingMonths === months
                      ? 'bg-cyan-500 text-white border-cyan-500 shadow-md shadow-cyan-500/20'
                      : isLight
                      ? 'bg-slate-100 text-slate-700 border-slate-300 hover:border-cyan-500'
                      : 'bg-navy-900 text-slate-300 border-white/10 hover:border-cyan-400'
                  }`}
                >
                  {months} Months
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Calculation Summary Card */}
        <div className="rounded-2xl p-6 border flex flex-col justify-between shadow-xl bg-white border-slate-200 shadow-slate-200/60">
          <div className="space-y-4">
            <span className="inline-flex items-center text-[10px] uppercase font-bold tracking-widest text-cyan-600 bg-cyan-50 px-3 py-1.5 rounded-full border border-cyan-200">
              <Sparkles className="w-3 h-3 mr-1" /> Estimated Breakout
            </span>

            <div className="space-y-1 pt-2 text-sm">
              <div className="flex justify-between items-center py-2.5 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Selected Procedure</span>
                <span className="font-bold text-slate-800 text-right max-w-[55%] leading-tight">{current.name}</span>
              </div>
              <div className="flex justify-between items-center py-2.5 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Quantity</span>
                <span className="font-bold text-slate-800">{totalUnits} {totalUnits === 1 ? 'Unit' : 'Teeth'}</span>
              </div>
              <div className="flex justify-between items-center py-2.5 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Estimated Gross Total</span>
                <span className="font-bold text-slate-800">${rawSubtotal.toLocaleString()}</span>
              </div>
              {hasInsurance && (
                <div className="flex justify-between items-center py-2.5 border-b border-slate-100">
                  <span className="text-emerald-600 font-medium">Insurance Benefit</span>
                  <span className="font-bold text-emerald-600">-${insuranceSavings.toLocaleString()}</span>
                </div>
              )}
            </div>

            <div className="pt-3 border-t-2 border-cyan-400">
              <span className="text-xs text-cyan-600 uppercase tracking-wider font-bold block mb-1">Estimated Net Investment</span>
              <div className="text-4xl font-serif font-extrabold text-slate-900">
                ${netTotal.toLocaleString()}
              </div>
            </div>

            <div className="p-4 bg-gradient-to-br from-cyan-500 to-sky-500 rounded-xl text-center shadow-lg shadow-cyan-500/30">
              <span className="text-xs text-cyan-100 font-semibold block mb-0.5">As low as</span>
              <span className="text-3xl font-extrabold text-white">${monthlyPayment} / mo</span>
              <span className="text-[10px] text-cyan-100 block mt-1">with 0% APR for {financingMonths} months</span>
            </div>
          </div>

          <Link
            href={`/appointment?service=${encodeURIComponent(current.name)}`}
            className="w-full mt-6 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 hover:brightness-110 transition-all shadow-lg shadow-cyan-500/30"
          >
            <span>Book Consultation for this Plan</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
