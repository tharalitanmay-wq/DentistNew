'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Sparkles, Calendar, Phone, Menu, X, Sun, Moon, User } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import SpecularButton from '@/components/SpecularButton';
import GooeyNav from '@/components/GooeyNav';
import ToothIcon from '@/components/ToothIcon';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Live Queue', href: '/queue' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Doctors', href: '/doctors' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? theme === 'light' 
          ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200 py-3 shadow-md' 
          : 'bg-navy-900/80 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl' 
        : 'bg-transparent py-5'
    }`}>
      {/* Top Banner Announcement */}
      <div className={`hidden lg:flex justify-between items-center px-8 pb-2 border-b text-xs tracking-wider ${
        theme === 'light' ? 'border-slate-200 text-slate-600' : 'border-white/5 text-slate-400'
      }`}>
        <div className="flex items-center space-x-6">
          <span className="flex items-center text-cyan-600 dark:text-cyan-400 font-medium">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between mt-1">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-slate-900 dark:bg-navy-900 rounded-[10px] flex items-center justify-center p-1">
              <ToothIcon className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <span className="text-xl font-serif font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
              PEARL
            </span>
            <span className="block text-[10px] tracking-[0.25em] text-cyan-600 dark:text-cyan-400 uppercase font-medium">
              Dental Care
            </span>
          </div>
        </Link>

        {/* Desktop React Bits GooeyNav Integration */}
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

          {/* User Account or Login */}
          {user ? (
            <div className="flex items-center space-x-2">
              <Link
                href="/dashboard"
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                  theme === 'light'
                    ? 'bg-slate-100 border-cyan-500/40 text-cyan-700 hover:bg-cyan-50'
                    : 'bg-navy-800 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-navy-950'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>{user.name.split(' ')[0]}</span>
              </Link>
            </div>
          ) : (
            <Link
              href="/dashboard"
              className={`text-xs px-3 py-1.5 transition-colors ${
                theme === 'light' ? 'text-slate-700 hover:text-cyan-600' : 'text-slate-300 hover:text-cyan-400'
              }`}
            >
              Sign In
            </Link>
          )}

          {/* React Bits SpecularButton Integration for BOOK APPOINTMENT */}
          <SpecularButton
            size="sm"
            radius={999}
            tint="#0284c7"
            tintOpacity={0.9}
            blur={8}
            textColor="#ffffff"
            lineColor="#ffffff"
            baseColor="#0369a1"
            intensity={1.2}
            shineSize={12}
            shineFade={35}
            thickness={1.5}
            speed={0.4}
            followMouse={true}
            autoAnimate={true}
            onClick={() => router.push('/appointment')}
            className="font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/30 font-sans"
          >
            <Calendar className="w-4 h-4 mr-1 text-white" />
            <span>BOOK APPOINTMENT</span>
          </SpecularButton>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center space-x-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-slate-100 dark:bg-navy-800 border border-slate-300 dark:border-white/10"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-100 dark:bg-navy-800 border border-slate-300 dark:border-white/10"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className={`md:hidden backdrop-blur-2xl border-b px-6 py-6 space-y-4 ${
          theme === 'light' ? 'bg-white/95 border-slate-200' : 'bg-navy-900/95 border-white/10'
        }`}>
          <nav className="flex flex-col space-y-2">
            {navItems.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium ${
                  pathname === link.href
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : theme === 'light' ? 'text-slate-800 hover:bg-slate-100' : 'text-slate-300 hover:bg-navy-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-cyan-600 border border-cyan-500/30 flex items-center justify-between"
            >
              <span>Patient Dashboard</span>
              <User className="w-4 h-4" />
            </Link>
            
            <div className="pt-2">
              <SpecularButton
                size="md"
                radius={999}
                tint="#0284c7"
                tintOpacity={0.9}
                blur={8}
                textColor="#ffffff"
                lineColor="#ffffff"
                baseColor="#0369a1"
                intensity={1.2}
                speed={0.4}
                autoAnimate={true}
                onClick={() => {
                  setMobileMenuOpen(false);
                  router.push('/appointment');
                }}
                className="w-full font-bold text-xs uppercase tracking-wider"
              >
                <Calendar className="w-4 h-4 mr-1 text-white" />
                <span>BOOK APPOINTMENT</span>
              </SpecularButton>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
