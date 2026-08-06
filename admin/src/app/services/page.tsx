'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Sparkles, CheckCircle2 } from 'lucide-react';
import { API_BASE } from '@/config/api';

export default function AdminServicesPage() {
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch(`${API_BASE}/services`);
      const data = await res.json();
      if (data.success) setServices(data.services);
    } catch (e) {
      setServices([
        { _id: 'srv-1', name: 'Signature Porcelain Veneers', category: 'Cosmetic', priceRange: '$1,200 - $2,500' },
        { _id: 'srv-2', name: '3D Computer-Guided Dental Implants', category: 'Implants', priceRange: '$2,500 - $4,800' },
        { _id: 'srv-3', name: 'Invisalign Diamond Alignment', category: 'Orthodontics', priceRange: '$3,500 - $6,500' }
      ]);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this clinical service?')) {
      setServices(services.filter(s => s._id !== id));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white">Services & Pricing CMS</h1>
          <p className="text-xs text-slate-400">Manage dental procedures, price ranges, and descriptions</p>
        </div>
      </div>

      <div className="glass-card rounded-3xl p-6 border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-navy-900/80 text-slate-400 uppercase tracking-wider border-b border-white/10">
              <tr>
                <th className="p-4">Procedure Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Estimated Price Range</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {services.map((srv) => (
                <tr key={srv._id} className="hover:bg-navy-800/40">
                  <td className="p-4 font-bold text-white">{srv.name}</td>
                  <td className="p-4 text-cyan-400">{srv.category}</td>
                  <td className="p-4 text-slate-300">{srv.priceRange}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDelete(srv._id)}
                      className="p-1.5 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20"
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
