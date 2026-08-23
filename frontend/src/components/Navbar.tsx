'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Sparkles, Calendar, Phone, Menu, X, Sun, Moon, User, LogOut } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import SpecularButton from '@/components/SpecularButton';
import GooeyNav from '@/components/GooeyNav';
import ToothIcon from '@/components/ToothIcon';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide Navbar completely on Login and Registration pages (MUST be placed after all hooks)
  if (pathname === '/login' || pathname === '/register' || pathname === '/signin') {
    return null;
  }

  const publicNavItems = [
    { label: 'Home', href: '/' },
    { label: 'Live Queue', href: '/queue' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Doctors', href: '/doctors' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ];

  const loggedInNavItems = [
    { label: 'Home', href: '/' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Live Queue', href: '/queue' },
    { label: 'Services', href: '/services' },
    { label: 'Doctors', href: '/doctors' },
    { label: 'Book Appointment', href: '/appointment' },
  ];

  const showGooeyNav = !user && pathname !== '/register' && pathname !== '/login' && pathname !== '/signin';
  const navItems = user ? loggedInNavItems : publicNavItems;

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? theme === 'light' 
          ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200 py-3 shadow-md' 
          : 'bg-navy-900/80 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl' 
        : 'bg-transparent py-5'
    }`}>
      {/* Top Banner Announcement - Visible only on Home Page */}
      {pathname === '/' && (
        <div className={`hidden lg:flex justify-between items-center px-8 pb-2 border-b text-xs tracking-wider ${
          theme === 'light' ? 'border-slate-200 text-slate-600' : 'border-white/5 text-slate-400'
        }`}>
          <div className="flex items-center space-x-6">
            <span className="flex items-center text-cyan-600 dark:text-cyan-400 font-medium">
              <Sparkles className="w-3.5 h-3.5 mr-1.5 animate-pulse text-cyan-500" />
              Complimentary 3D Cosmetic Smile Simulation for New Patients
            </span>
            <span className="flex items-center text-slate-600 dark:text-slate-400">
              <Phone className="w-3.5 h-3.5 mr-1.5 text-cyan-600 dark:text-cyan-400" />
              Concierge Emergency: +1 (800) 999-DENT
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-slate-600 dark:text-slate-400">740 Park Ave, New York</span>
            <span className="text-cyan-600 dark:text-cyan-400 font-semibold">Mon - Sat: 8am - 7pm</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between mt-1">
        {/* Logo */}
        <Link href={user ? "/dashboard" : "/"} className="flex items-center space-x-3 group py-1">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 group-hover:border-cyan-400 group-hover:bg-cyan-500/20 transition-all duration-300 shadow-sm shadow-cyan-500/20">
            <ToothIcon className="w-5 h-5 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-xl font-serif font-extrabold tracking-tight text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors leading-none">
              PEARL
            </span>
            <span className="text-[9px] tracking-[0.35em] text-cyan-600 dark:text-cyan-400 uppercase font-bold mt-1 leading-none">
              Dental Studio
            </span>
          </div>
        </Link>

        {/* Desktop React Bits GooeyNav Integration - Hidden after login and during registration/login */}
        {showGooeyNav && (
          <div className="hidden md:block">
            <GooeyNav
              items={navItems}
              particleCount={18}
              particleDistances={[80, 12]}
              particleR={250}
              animationTime={500}
              timeVariance={600}
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center space-x-3">
          {/* Light/Dark Mode Switcher */}
          <button
            onClick={toggleTheme}
            className={`p-2.5 rounded-full border transition-all hover:scale-105 ${
              theme === 'light'
                ? 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
                : 'bg-navy-800/60 border-white/10 text-slate-300 hover:text-cyan-400'
            }`}
            title="Toggle Light/Dark Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>

          {/* User Account / Login / Logout */}
          {user ? (
            <div className="flex items-center space-x-3">

              {/* User Avatar & Dashboard Link */}
              <Link
                href="/dashboard"
                className={`group relative flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full border transition-all duration-300 shadow-sm ${
                  theme === 'light'
                    ? 'bg-white border-slate-200 text-slate-800 hover:border-cyan-500/50 hover:shadow-cyan-500/10'
                    : 'bg-navy-900/90 border-white/10 text-white hover:border-cyan-400/50 hover:shadow-cyan-400/10'
                }`}
              >
                <div className="w-6 h-6 rounded-full overflow-hidden bg-gradient-to-tr from-cyan-500 to-sky-300 text-slate-950 flex items-center justify-center font-bold text-[11px] shadow-sm shrink-0">
                  {user.profile_image_url || (user.avatar && !user.avatar.includes('unsplash') ? user.avatar : null) ? (
                    <img src={user.profile_image_url || user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <span>{user.name ? user.name[0].toUpperCase() : 'P'}</span>
                  )}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold leading-none tracking-tight group-hover:text-cyan-500 transition-colors">
                    {user.name.split(' ')[0]}
                  </span>
                  <span className="text-[9px] text-slate-400 leading-none font-medium mt-0.5">
                    Patient Portal
                  </span>
                </div>
              </Link>

              {/* Executive Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-500 dark:text-red-400 text-xs font-bold border border-red-500/20 hover:border-red-500/40 transition-all duration-300 shadow-sm group"
                title="Sign Out of Patient Concierge"
              >
                <LogOut className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform duration-300" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link
                href="/login"
                className={`text-xs px-4 py-2 rounded-full transition-all font-bold ${
                  theme === 'light' 
                    ? 'text-slate-800 hover:text-cyan-600 hover:bg-slate-100' 
                    : 'text-slate-200 hover:text-cyan-400 hover:bg-white/5'
                }`}
              >
                Sign In
              </Link>

              <Link href="/appointment">
                <button className={`px-5 py-2.5 rounded-full font-extrabold text-xs uppercase tracking-wider transition-all flex items-center space-x-1.5 border shadow-lg hover:scale-105 ${
                  theme === 'light'
                    ? 'bg-slate-950 text-white border-slate-900 shadow-slate-950/30 hover:bg-slate-900'
                    : 'bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-slate-950 border-yellow-200 shadow-amber-400/30 hover:brightness-110'
                }`}>
                  <Calendar className={`w-3.5 h-3.5 ${theme === 'light' ? 'text-white' : 'text-slate-950'}`} />
                  <span>BOOK APPOINTMENT</span>
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex sm:hidden items-center space-x-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-white/10 text-slate-300"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-xl border transition-colors ${
              theme === 'light' ? 'bg-slate-100 border-slate-300 text-slate-800' : 'bg-navy-800 border-white/10 text-white'
            }`}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className={`sm:hidden border-b py-4 px-6 space-y-3 transition-colors ${
          theme === 'light' ? 'bg-white border-slate-200' : 'bg-navy-950 border-white/10'
        }`}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block text-xs font-semibold py-2 transition-colors ${
                pathname === item.href ? 'text-cyan-500' : theme === 'light' ? 'text-slate-700' : 'text-slate-300'
              }`}
            >
              {item.label}
            </Link>
          ))}

          {user ? (
            <div className="pt-2 border-t border-slate-200 dark:border-white/10 flex justify-between items-center">
              <span className="text-xs text-cyan-400 font-bold">Logged in as {user.name}</span>
              <button
                onClick={handleLogout}
                className="text-xs font-bold text-red-400 hover:underline"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="pt-2 border-t border-slate-200 dark:border-white/10 flex space-x-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 py-2 text-center text-xs font-bold rounded-xl bg-slate-100 dark:bg-navy-800 text-cyan-400"
              >
                Sign In
              </Link>
              <Link
                href="/appointment"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 py-2 text-center text-xs font-bold rounded-xl bg-cyan-500 text-slate-950"
              >
                Book
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
