'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen, Plus, Trash2, Edit2, Eye } from 'lucide-react';
import { API_BASE } from '@/config/api';

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch(`${API_BASE}/blogs`);
      const data = await res.json();
      if (data.success) setBlogs(data.blogs);
    } catch (e) {
      setBlogs([
        {
          _id: 'blg-1',
          title: 'The Art of Porcelain Veneers: How Bespoke Smiles are Crafted',
          category: 'Cosmetic Dentistry',
          author: 'Dr. Evelyn Sterling',
          isPublished: true
        },
        {
          _id: 'blg-2',
          title: 'Why Computer-Guided Dental Implants outlast Traditional Bridges',
          category: 'Implants',
          author: 'Dr. Julian Vance',
          isPublished: true
        }
      ]);
    }
  };

  const togglePublish = (id: string) => {
    setBlogs(prev => prev.map(b => b._id === id ? { ...b, isPublished: !b.isPublished } : b));
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete article?')) setBlogs(blogs.filter(b => b._id !== id));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white">Blog & Content CMS</h1>
          <p className="text-xs text-slate-400">Publish, edit, or archive dental intelligence articles</p>
        </div>
      </div>

      <div className="glass-card rounded-3xl p-6 border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-navy-900/80 text-slate-400 uppercase tracking-wider border-b border-white/10">
              <tr>
                <th className="p-4">Article Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Author</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {blogs.map((b) => (
                <tr key={b._id} className="hover:bg-navy-800/40">
                  <td className="p-4 font-bold text-white max-w-xs truncate">{b.title}</td>
                  <td className="p-4 text-cyan-400">{b.category}</td>
                  <td className="p-4 text-slate-300">{b.author}</td>
                  <td className="p-4">
                    <button
                      onClick={() => togglePublish(b._id)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        b.isPublished ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {b.isPublished ? 'Published' : 'Draft'}
                    </button>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button onClick={() => handleDelete(b._id)} className="p-1.5 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20">
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
