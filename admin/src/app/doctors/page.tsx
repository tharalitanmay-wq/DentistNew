'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Star, Award, Stethoscope, X, Save, DollarSign, Image } from 'lucide-react';

export default function AdminDoctorsPage() {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingDoctorId, setEditingDoctorId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    title: '',
    specialization: '',
    experience: '12 Years Experience',
    consultationFee: 250,
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800',
    bio: 'Board-certified specialist dedicated to precision dentistry and patient comfort.'
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/doctors');
      const data = await res.json();
      if (data.success && data.doctors) {
        setDoctors(data.doctors);
        return;
      }
    } catch (e) {
      console.error(e);
    }

    // Default fallback initial list
    setDoctors([
      {
        _id: 'doc-1',
        id: '1',
        name: 'Dr. Evelyn Sterling',
        title: 'Chief Cosmetic Dentist & Director',
        specialization: 'Cosmetic Dentistry & Veneers',
        experience: '15+ Years Experience',
        consultationFee: 250,
        avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800',
        bio: 'Leading pioneer in digital smile design and minimally invasive porcelain veneers.'
      },
      {
        _id: 'doc-2',
        id: '2',
        name: 'Dr. Julian Vance',
        title: 'Lead Implant Specialist & Oral Surgeon',
        specialization: 'Dental Implants & All-on-4',
        experience: '12+ Years Experience',
        consultationFee: 300,
        avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800',
        bio: 'Expert in 3D computer-guided bone grafting and full-arch implant restorations.'
      },
      {
        _id: 'doc-3',
        id: '3',
        name: 'Dr. Aria Chen',
        title: 'Orthodontics & Invisalign Specialist',
        specialization: 'Invisalign & Clear Aligners',
        experience: '10+ Years Experience',
        consultationFee: 200,
        avatar: 'https://images.unsplash.com/photo-1594824813566-78a9c30f40d2?auto=format&fit=crop&q=80&w=800',
        bio: 'Diamond Invisalign provider specializing in discreet bite alignment.'
      }
    ]);
  };

  const handleOpenAdd = () => {
    setEditingDoctorId(null);
    setFormData({
      name: '',
      title: '',
      specialization: '',
      experience: '10+ Years Experience',
      consultationFee: 250,
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800',
      bio: 'Dedicated dental specialist providing world-class patient care.'
    });
    setShowModal(true);
  };

  const handleOpenEdit = (doc: any) => {
    setEditingDoctorId(String(doc._id || doc.id));
    setFormData({
      name: doc.name || '',
      title: doc.title || '',
      specialization: doc.specialization || '',
      experience: doc.experience || '10+ Years Experience',
      consultationFee: doc.consultationFee || 250,
      avatar: doc.avatar || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800',
      bio: doc.bio || ''
    });
    setShowModal(true);
  };

  const handleSaveDoctor = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingDoctorId) {
      // EDIT EXISTING DOCTOR
      try {
        const res = await fetch(`http://localhost:5000/api/doctors/${editingDoctorId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        const data = await res.json();
        if (data.success && data.doctor) {
          setDoctors(doctors.map(d => (String(d._id || d.id) === editingDoctorId ? data.doctor : d)));
          setShowModal(false);
          return;
        }
      } catch (err) {
        console.error(err);
      }

      // Offline fallback edit state update
      setDoctors(doctors.map(d => {
        if (String(d._id || d.id) === editingDoctorId) {
          return { ...d, ...formData };
        }
        return d;
      }));
    } else {
      // ADD NEW DOCTOR
      const newId = 'doc-' + Date.now();
      try {
        const res = await fetch('http://localhost:5000/api/doctors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        const data = await res.json();
        if (data.success && data.doctor) {
          setDoctors([...doctors, data.doctor]);
          setShowModal(false);
          return;
        }
      } catch (err) {
        console.error(err);
      }

      // Offline fallback add state update
      const newDoc = { _id: newId, id: newId, ...formData };
      setDoctors([...doctors, newDoc]);
    }

    setShowModal(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this doctor profile?')) return;

    try {
      await fetch(`http://localhost:5000/api/doctors/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.error(err);
    }

    setDoctors(doctors.filter(d => String(d._id || d.id) !== String(id)));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white">Doctors & Specialists</h1>
          <p className="text-xs text-slate-400">Manage dental specialist profiles, credentials, and consultation fees</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 rounded-full bg-cyan-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-cyan-400 flex items-center space-x-2 shadow-lg shadow-cyan-500/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Specialist</span>
        </button>
      </div>

      {/* Doctors Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doc) => {
          const docId = String(doc._id || doc.id);
          return (
            <div key={docId} className="glass-card rounded-2xl p-6 border border-white/10 space-y-4 relative flex flex-col justify-between hover:border-cyan-500/40 transition-all shadow-xl">
              <div className="space-y-3">
                <div className="flex items-center space-x-4">
                  <img
                    src={doc.avatar || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800'}
                    alt={doc.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-cyan-400/50 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-bold text-white truncate">{doc.name}</h3>
                    <span className="text-xs font-semibold text-cyan-400 block truncate">{doc.title}</span>
                    <span className="text-[11px] text-emerald-400 font-bold block mt-0.5">${doc.consultationFee} Consultation</span>
                  </div>
                </div>

                {doc.specialization && (
                  <p className="text-xs text-slate-300 bg-navy-900/60 p-2.5 rounded-xl border border-white/5">
                    {doc.specialization}
                  </p>
                )}
              </div>

              {/* Action Buttons (EDIT & DELETE) */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-medium">{doc.experience || 'Specialist Doctor'}</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleOpenEdit(doc)}
                    className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/30 text-xs transition-all flex items-center space-x-1"
                    title="Edit Doctor Details"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-bold">Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(docId)}
                    className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30 text-xs transition-all"
                    title="Delete Doctor"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ADD / EDIT DOCTOR MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <form onSubmit={handleSaveDoctor} className="glass-card rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-cyan-500/40 space-y-4 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-xl font-serif font-bold text-white flex items-center space-x-2">
                <Stethoscope className="w-5 h-5 text-cyan-400" />
                <span>{editingDoctorId ? 'Edit Doctor Profile' : 'Add Specialist Doctor'}</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-1.5 rounded-full bg-navy-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Doctor Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Dr. Evelyn Sterling"
                  className="w-full px-3.5 py-2.5 bg-navy-900 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Title & Position</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Chief Cosmetic Dentist & Director"
                  className="w-full px-3.5 py-2.5 bg-navy-900 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Specialization</label>
                  <input
                    type="text"
                    value={formData.specialization}
                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                    placeholder="Cosmetic Dentistry & Veneers"
                    className="w-full px-3.5 py-2.5 bg-navy-900 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Consultation Fee ($)</label>
                  <input
                    type="number"
                    required
                    value={formData.consultationFee}
                    onChange={(e) => setFormData({ ...formData, consultationFee: parseInt(e.target.value) || 0 })}
                    className="w-full px-3.5 py-2.5 bg-navy-900 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Experience Years / Title Tag</label>
                <input
                  type="text"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  placeholder="15+ Years Experience"
                  className="w-full px-3.5 py-2.5 bg-navy-900 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Photo Image URL</label>
                <input
                  type="url"
                  value={formData.avatar}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 bg-navy-900 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Biography / Summary</label>
                <textarea
                  rows={2}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Brief background and clinical focus..."
                  className="w-full px-3.5 py-2.5 bg-navy-900 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-5 py-2.5 rounded-xl bg-navy-800 text-slate-300 text-xs font-bold hover:bg-navy-700 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20 flex items-center space-x-1.5"
              >
                <Save className="w-4 h-4" />
                <span>{editingDoctorId ? 'Update Doctor Details' : 'Save New Doctor'}</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
