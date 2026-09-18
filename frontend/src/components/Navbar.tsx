'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Sparkles, Calendar, Phone, Menu, X, Sun, Moon, User, LogOut, Globe } from 'lucide-react';
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

  const isLight = theme === 'light';
  // Over dark hero only on the homepage when not scrolled
  const isOverDarkHero = pathname === '/' && !scrolled;

  // Adaptive contrast colors for logo and controls
  const logoMainColor = isOverDarkHero || !isLight 
    ? 'text-white' 
    : 'text-slate-900';
    
  const logoSubColor = isOverDarkHero || !isLight 
    ? 'text-[#F0C97A]' 
    : 'text-amber-700 font-extrabold';

  const loginTextColor = isOverDarkHero || !isLight
    ? 'text-slate-100 hover:text-amber-300'
    : 'text-slate-900 hover:text-amber-700';

  const loginIconColor = isOverDarkHero || !isLight
    ? 'text-amber-300'
    : 'text-amber-700';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? isLight 
          ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200/90 py-3 shadow-md' 
          : 'bg-navy-900/90 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl' 
        : pathname === '/'
          ? 'bg-transparent py-5'
          : isLight
            ? 'bg-[#FAF7F2]/90 backdrop-blur-md border-b border-amber-900/10 py-4'
            : 'bg-navy-950/90 backdrop-blur-md border-b border-white/10 py-4'
    }`}>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between mt-1">
        {/* Logo */}
        <Link href={user ? "/dashboard" : "/"} className="flex items-center group py-1" title="Dr. Neil Tran Dental Clinic">
          <div className="relative flex items-center justify-center px-2.5 py-1 rounded-2xl bg-white shadow-md border border-slate-200/90 group-hover:scale-105 group-hover:shadow-lg transition-all duration-300">
            <img 
              src="/logo.png" 
              alt="Dr. Neil Tran Dental Clinic" 
              className="h-10 sm:h-11 w-auto object-contain"
            />
          </div>
        </Link>

        {/* Desktop Navigation Items */}
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
        <div className="hidden sm:flex items-center space-x-4">
          {/* Light/Dark Mode Switcher */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full border transition-all hover:scale-105 ${
              isOverDarkHero
                ? 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                : isLight
                  ? 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
                  : 'bg-navy-800/60 border-white/10 text-slate-300 hover:text-amber-400'
            }`}
            title="Toggle Light/Dark Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-amber-800" />}
          </button>

          {/* User Account / Login / Menu */}
          {user ? (
            <div className="flex items-center space-x-3">
              <Link
                href="/dashboard"
                className={`group relative flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full border transition-all duration-300 shadow-sm ${
                  isLight
                    ? 'bg-amber-50 border-amber-300 text-slate-900 hover:border-amber-500'
                    : 'bg-navy-900/90 border-white/10 text-white hover:border-amber-400/50'
                }`}
              >
                <div className="w-6 h-6 rounded-full overflow-hidden bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 flex items-center justify-center font-bold text-[11px] shadow-sm shrink-0">
                  {user.profile_image_url || (user.avatar && !user.avatar.includes('unsplash') ? user.avatar : null) ? (
                    <img src={user.profile_image_url || user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <span>{user.name ? user.name[0].toUpperCase() : 'P'}</span>
                  )}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-serif font-bold leading-none tracking-tight group-hover:text-amber-700 transition-colors">
                    {user.name.split(' ')[0]}
                  </span>
                </div>
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 text-xs font-bold border border-red-500/20 transition-all duration-300"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className={`flex items-center space-x-1.5 text-xs font-serif font-bold tracking-widest uppercase transition-all px-3 py-1.5 ${loginTextColor}`}
              >
                <span>LOGIN</span>
                <Globe className={`w-4 h-4 ${loginIconColor}`} />
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex sm:hidden items-center space-x-2">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full border transition-all ${
              isOverDarkHero
                ? 'border-white/20 text-white bg-white/10'
                : isLight
                  ? 'border-slate-300 text-slate-800 bg-slate-100'
                  : 'border-white/10 text-slate-300 bg-navy-800/60'
            }`}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-amber-800" />}
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-xl border transition-colors ${
              isOverDarkHero
                ? 'bg-white/10 border-white/20 text-white'
                : isLight
                  ? 'bg-slate-100 border-slate-300 text-slate-800'
                  : 'bg-navy-800 border-white/10 text-white'
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
