'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Star, Award, Stethoscope } from 'lucide-react';

export default function AdminDoctorsPage() {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    specialization: '',
    experience: '',
    consultationFee: 250,
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800',
    bio: ''
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/doctors');
      const data = await res.json();
      if (data.success) setDoctors(data.doctors);
    } catch (e) {
      setDoctors([
        {
          _id: 'doc-1',
          name: 'Dr. Evelyn Sterling',
          title: 'Chief Cosmetic Dentist & Director',
          specialization: 'Cosmetic Dentistry & Veneers',
          consultationFee: 250,
          avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800'
        },
        {
          _id: 'doc-2',
          name: 'Dr. Julian Vance',
          title: 'Lead Implant Specialist',
          specialization: 'Dental Implants & All-on-4',
          consultationFee: 300,
          avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800'
        }
      ]);
    }
  };

  const handleAddDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    const newDoc = { _id: 'doc-' + Date.now(), ...formData };
    setDoctors([...doctors, newDoc]);
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this doctor profile?')) {
      setDoctors(doctors.filter(d => d._id !== id));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white">Doctors & Specialists</h1>
          <p className="text-xs text-slate-400">Manage dental specialist profiles and consultation fees</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-2.5 rounded-full bg-cyan-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-cyan-400 flex items-center space-x-2 shadow-lg shadow-cyan-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add Specialist</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doc) => (
          <div key={doc._id} className="glass-card rounded-2xl p-6 border border-white/10 space-y-4 relative">
            <div className="flex items-center space-x-4">
              <img src={doc.avatar} alt={doc.name} className="w-16 h-16 rounded-full object-cover border-2 border-cyan-400/50" />
              <div>
                <h3 className="text-base font-bold text-white">{doc.name}</h3>
                <span className="text-xs font-semibold text-cyan-400 block">{doc.title}</span>
                <span className="text-[11px] text-slate-400 block">${doc.consultationFee} Consultation</span>
              </div>
            </div>
            <div className="pt-3 border-t border-white/5 flex justify-end space-x-2">
              <button
                onClick={() => handleDelete(doc._id)}
                className="p-2 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
          <form onSubmit={handleAddDoctor} className="glass-card rounded-3xl p-8 max-w-md w-full border border-cyan-500/30 space-y-4">
            <h3 className="text-xl font-serif font-bold text-white">Add Specialist Doctor</h3>

            <div>
              <label className="block text-xs text-slate-300 mb-1">Doctor Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Dr. Evelyn Sterling"
                className="w-full px-3 py-2 bg-navy-900 border border-white/15 rounded-xl text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-300 mb-1">Title & Role</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Chief Cosmetic Dentist"
                className="w-full px-3 py-2 bg-navy-900 border border-white/15 rounded-xl text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-300 mb-1">Consultation Fee ($)</label>
              <input
                type="number"
                required
                value={formData.consultationFee}
                onChange={(e) => setFormData({ ...formData, consultationFee: parseInt(e.target.value) })}
                className="w-full px-3 py-2 bg-navy-900 border border-white/15 rounded-xl text-xs text-white"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-xl bg-navy-800 text-slate-300 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
              >
                Save Doctor
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
