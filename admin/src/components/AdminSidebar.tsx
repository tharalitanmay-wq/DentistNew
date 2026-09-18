'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Calendar, Stethoscope, Sparkles, BookOpen,
  Settings, LogOut, ExternalLink, ShieldCheck, FileText, Users
} from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext';

export default function AdminSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAdminAuth();

  const links = [
    { name: 'Dashboard Overview', href: '/', icon: LayoutDashboard },
    { name: 'Appointments Manager', href: '/appointments', icon: Calendar },
    { name: 'Offline Centre Queue', href: '/queue', icon: Users },
    { name: 'Doctors & Specialists', href: '/doctors', icon: Stethoscope },
    { name: 'Services & Pricing', href: '/services', icon: Sparkles },
    { name: 'Blog CMS', href: '/blogs', icon: BookOpen },
    { name: 'CMS & Site Settings', href: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-navy-900 border-r border-white/10 flex flex-col justify-between p-5 min-h-screen">
      <div className="space-y-8">
        {/* Brand */}
        <Link href="/" className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5">
            <div className="w-full h-full bg-navy-950 rounded-[10px] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <span className="text-xl font-serif font-bold text-white tracking-tight">PEARL</span>
            <span className="block text-[10px] tracking-widest text-cyan-400 uppercase font-bold">Admin CMS</span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="space-y-1">
          {links.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${isActive
                    ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20 font-bold'
                    : 'text-slate-300 hover:bg-navy-800 hover:text-white'
                  }`}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Info */}
      <div className="space-y-4 pt-6 border-t border-white/10">
        <div className="flex items-center space-x-3 px-2">
          <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs">
            A
          </div>
          <div className="overflow-hidden">
            <span className="text-xs font-bold text-white block truncate">{user?.name || 'Master Admin'}</span>
            <span className="text-[10px] text-cyan-400 block uppercase font-bold">SuperAdmin</span>
          </div>
        </div>

        <div className="space-y-2">
          <a
            href="http://localhost:3000"
            target="_blank"
            rel="noreferrer"
            className="w-full py-2 px-3 rounded-xl bg-navy-800 hover:bg-navy-700 text-slate-300 text-xs font-medium flex items-center justify-center space-x-2 border border-white/5 transition-all"
          >
            <span>View Client Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={logout}
            className="w-full py-2 px-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold flex items-center justify-center space-x-2 border border-red-500/20 transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
