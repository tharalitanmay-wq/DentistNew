'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Sparkles, Calendar, ArrowRight, ShieldCheck, Star, Award, CheckCircle2,
  ChevronDown, Cpu, Zap, Activity, HeartPulse, Stethoscope, PhoneCall
} from 'lucide-react';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import GoogleReviews from '@/components/GoogleReviews';
import CostEstimator from '@/components/CostEstimator';
import SpecularButton from '@/components/SpecularButton';
import PixelCard from '@/components/PixelCard';
import LiveClinicQueue from '@/components/LiveClinicQueue';
import LogoLoop from '@/components/LogoLoop';

import { useTheme } from '@/context/ThemeContext';

function AnimatedStat({
  targetNumber,
  prefix = '',
  suffix = '',
  decimals = 0,
  label,
  targetId,
  isLight
}: {
  targetNumber: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  targetId?: string;
  isLight: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const steps = 40;
    const increment = targetNumber / steps;
    const stepTime = duration / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= targetNumber) {
        setCount(targetNumber);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [targetNumber]);

  const handleClick = () => {
    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const formattedCount = decimals > 0 
    ? count.toFixed(decimals) 
    : Math.floor(count).toLocaleString('en-US');

  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer text-center space-y-1 py-2 px-3 rounded-2xl transition-all duration-300 hover:scale-105 hover:bg-amber-500/10"
      title={`Click to view ${label}`}
    >
      <div className={`text-2xl sm:text-3xl font-serif font-bold transition-colors group-hover:text-amber-600 dark:group-hover:text-amber-400 ${
        isLight ? 'text-[#7A2818]' : 'text-amber-200'
      }`}>
        <span>{prefix}{formattedCount}{suffix}</span>
      </div>
      <div className={`text-[11px] uppercase tracking-wider font-semibold group-hover:underline ${
        isLight ? 'text-[#8C3D2B]' : 'text-amber-300/80'
      }`}>{label}</div>
    </div>
  );
}

export default function HomePage() {
  const router = useRouter();
  const { theme } = useTheme();
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const stats = [
    { number: '16+', label: 'Years of Excellence', icon: Award },
    { number: '12,400+', label: 'Smiles Transformed', icon: Sparkles },
    { number: '99.8%', label: 'Patient Satisfaction', icon: ShieldCheck },
    { number: '5.0★', label: 'Google Rating (480+)', icon: Star },
  ];
  const partnerLogos = [
    {
      node: (
        <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white dark:bg-navy-900 border border-amber-900/15 dark:border-white/10 shadow-md hover:scale-105 transition-transform shrink-0">
          <img src="https://images.unsplash.com/photo-1594824813566-78a9c30f40d2?auto=format&fit=crop&q=80&w=200" alt="" className="w-6 h-6 rounded-full object-cover border border-amber-400/50 shadow-sm shrink-0" />
          <span className="text-[12px] font-sans font-semibold text-[#7A2818] dark:text-amber-300 tracking-wide whitespace-nowrap">Invisalign Diamond</span>
        </div>
      ),
      title: 'Invisalign Diamond'
    },
    {
      node: (
        <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white dark:bg-navy-900 border border-amber-900/15 dark:border-white/10 shadow-md hover:scale-105 transition-transform shrink-0">
          <img src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=200" alt="" className="w-6 h-6 rounded-full object-cover border border-amber-400/50 shadow-sm shrink-0" />
          <span className="text-[12px] font-sans font-semibold text-[#7A2818] dark:text-amber-300 tracking-wide whitespace-nowrap">AACD Cosmetic Masters</span>
        </div>
      ),
      title: 'AACD Cosmetic Masters'
    },
    {
      node: (
        <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white dark:bg-navy-900 border border-amber-900/15 dark:border-white/10 shadow-md hover:scale-105 transition-transform shrink-0">
          <img src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=200" alt="" className="w-6 h-6 rounded-full object-cover border border-amber-400/50 shadow-sm shrink-0" />
          <span className="text-[12px] font-sans font-semibold text-[#7A2818] dark:text-amber-300 tracking-wide whitespace-nowrap">iTero 5D Scanner</span>
        </div>
      ),
      title: 'iTero 5D Scanner'
    },
    {
      node: (
        <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white dark:bg-navy-900 border border-amber-900/15 dark:border-white/10 shadow-md hover:scale-105 transition-transform shrink-0">
          <img src="https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&q=80&w=200" alt="" className="w-6 h-6 rounded-full object-cover border border-amber-400/50 shadow-sm shrink-0" />
          <span className="text-[12px] font-sans font-semibold text-[#7A2818] dark:text-amber-300 tracking-wide whitespace-nowrap">Laser Whitening Spa</span>
        </div>
      ),
      title: 'Laser Whitening Spa'
    },
    {
      node: (
        <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white dark:bg-navy-900 border border-amber-900/15 dark:border-white/10 shadow-md hover:scale-105 transition-transform shrink-0">
          <img src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=200" alt="" className="w-6 h-6 rounded-full object-cover border border-amber-400/50 shadow-sm shrink-0" />
          <span className="text-[12px] font-sans font-semibold text-[#7A2818] dark:text-amber-300 tracking-wide whitespace-nowrap">Harvard & Columbia Masters</span>
        </div>
      ),
      title: 'Harvard & Columbia Masters'
    },
    {
      node: (
        <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white dark:bg-navy-900 border border-amber-900/15 dark:border-white/10 shadow-md hover:scale-105 transition-transform shrink-0">
          <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200" alt="" className="w-6 h-6 rounded-full object-cover border border-amber-400/50 shadow-sm shrink-0" />
          <span className="text-[12px] font-sans font-semibold text-[#7A2818] dark:text-amber-300 tracking-wide whitespace-nowrap">Biolase Painless Laser</span>
        </div>
      ),
      title: 'Biolase Painless Laser'
    },
    {
      node: (
        <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white dark:bg-navy-900 border border-amber-900/15 dark:border-white/10 shadow-md hover:scale-105 transition-transform shrink-0">
          <img src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=200" alt="" className="w-6 h-6 rounded-full object-cover border border-amber-400/50 shadow-sm shrink-0" />
          <span className="text-[12px] font-sans font-semibold text-[#7A2818] dark:text-amber-300 tracking-wide whitespace-nowrap">3D Guided Implants</span>
        </div>
      ),
      title: '3D Guided Implants'
    },
    {
      node: (
        <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white dark:bg-navy-900 border border-amber-900/15 dark:border-white/10 shadow-md hover:scale-105 transition-transform shrink-0">
          <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200" alt="" className="w-6 h-6 rounded-full object-cover border border-amber-400/50 shadow-sm shrink-0" />
          <span className="text-[12px] font-sans font-semibold text-[#7A2818] dark:text-amber-300 tracking-wide whitespace-nowrap">Top Clinic 2026</span>
        </div>
      ),
      title: 'Top Clinic 2026'
    }
  ];

  const services = [
    {
      title: 'Signature Porcelain Veneers',
      desc: 'Bespoke hand-crafted ceramic shells designed with 3D facial ratio modeling.',
      price: 'From $1,200 / tooth',
      tag: 'Cosmetic',
      img: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=600'
    },
    {
      title: '3D Computer-Guided Implants',
      desc: 'Permanent titanium & zirconia root restorations placed with robotic 3D accuracy.',
      price: 'From $2,500',
      tag: 'Implants',
      img: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600'
    },
    {
      title: 'Invisalign Invisible Orthodontics',
      desc: 'Discreet 3D aligner sequences straightening your teeth 50% faster than metal.',
      price: 'From $3,500',
      tag: 'Orthodontics',
      img: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=600'
    },
    {
      title: 'Laser Whitening Spa',
      desc: 'Cold-laser in-office whitening removing deep enamel discoloration in 60 mins.',
      price: 'From $450',
      tag: 'Spa & Whitening',
      img: 'https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&q=80&w=600'
    }
  ];

  const doctors = [
    {
      name: 'Dr. Ananya Sharma',
      role: 'Chief Cosmetic Dentist & Founder',
      degree: 'MDS AIIMS New Delhi • AACD Fellow',
      bio: 'Master of digital smile aesthetics, ultra-thin ceramic veneers, and laser dentistry.',
      img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600'
    },
    {
      name: 'Dr. Rajesh Kapoor',
      role: 'Lead Implant Surgeon',
      degree: 'MDS Manipal • ICOI Master Fellow',
      bio: 'Pioneer in painless 3D computer-guided dental implants and full-mouth rehabilitation.',
      img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600'
    },
    {
      name: 'Dr. Vikramaditya Verma',
      role: 'Chief Orthodontic Specialist',
      degree: 'MDS KGMU Lucknow • Diamond Plus Aligner Specialist',
      bio: 'Expert in invisible aligners, adult teeth straightening, and facial harmony alignment.',
      img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600'
    }
  ];

  const processSteps = [
    { num: '01', title: '3D Digital Scan', desc: 'Non-invasive iTero intraoral scanning captures 100,000 data points of your teeth.' },
    { num: '02', title: 'Facial Harmony Design', desc: 'We craft a custom digital preview aligned with your lip line and facial geometry.' },
    { num: '03', title: 'Pain-Free Treatment', desc: 'State-of-the-art cold laser and twilight sedation ensure effortless comfort.' },
    { num: '04', title: 'Pearl Smile Reveal', desc: 'Walk out with a radiant, natural-looking high-wattage smile guaranteed to last.' },
  ];

  const technologies = [
    { name: 'iTero Element 5D Scanner', desc: 'Instant 3D digital impressions without messy impression paste.', icon: Cpu },
    { name: 'CBCT 3D X-Ray Imaging', desc: 'Ultra-low radiation 3D bone and nerve structure visualization.', icon: Activity },
    { name: 'Biolase Waterlase Laser', desc: 'Drill-free, needle-free painless gum reshaping and cavity prep.', icon: Zap },
    { name: 'Computer-Guided Implants', desc: 'Sub-millimeter precision surgical placement templates.', icon: HeartPulse }
  ];

  const faqs = [
    {
      q: 'What makes Pearl Dental Care different from traditional dental clinics?',
      a: 'We combine 5-star hotel concierge service, serene spa environments, computer-guided 3D digital dentistry, and master AACD cosmetic specialists to deliver painless, life-changing smile outcomes.'
    },
    {
      q: 'How long do porcelain veneers last?',
      a: 'Our signature porcelain veneers are custom-milled from durable field-spat ceramic and typically last between 15 to 25 years with proper oral care and routine checkups.'
    },
    {
      q: 'Are dental implants painful?',
      a: 'No. Using computer-guided surgical templates and localized computer-controlled anesthesia (or optional IV sedation), patients report virtually zero pain during and after the procedure.'
    },
    {
      q: 'Can I see what my smile will look like before starting treatment?',
      a: 'Absolutedly! During your initial 3D Digital Smile Consultation, we generate a high-definition 3D simulation of your expected results.'
    }
  ];

  const isLight = theme === 'light';

  return (
    <div className="space-y-24 pb-20">

      {/* HERO SECTION — Left-Aligned Split Layout */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden -mt-24 pt-24 bg-gradient-to-br from-[#0B2B3A] via-[#0D3347] to-[#0A1F2E]">

        {/* Right side — Static Dental Image */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-[55%] z-0">
          <img
            src="/dental-hero.jpg"
            alt="Professional dentist at Pearl Dental Care clinic"
            className="w-full h-full object-cover object-center"
          />
          {/* Gradient fade from left so text is readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B2B3A] via-[#0B2B3A]/70 to-transparent" />
        </div>

        {/* Left side — Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16">
          <div className="max-w-xl lg:max-w-2xl space-y-7">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#C5A059]/20 border border-[#C5A059]/40 rounded-full px-4 py-1.5">
              <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
              <span className="text-[#F0C97A] font-sans text-xs font-semibold tracking-widest uppercase">
                Trusted by 12,400+ Patients
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] text-white">
              Your Perfect{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-[#F0C97A] via-[#D4AF37] to-[#C5A059] bg-clip-text text-transparent">
                  Smile
                </span>
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-[#F0C97A] to-transparent" />
              </span>
              {' '}Starts Here
            </h1>

            {/* Subheading */}
            <p className="font-sans text-base sm:text-lg text-slate-300 leading-relaxed max-w-lg">
              Experience world-class dental care — from <span className="text-[#F0C97A] font-semibold">Porcelain Veneers</span> &amp; <span className="text-[#F0C97A] font-semibold">3D Implants</span> to <span className="text-[#F0C97A] font-semibold">Invisalign</span> &amp; <span className="text-[#F0C97A] font-semibold">Laser Whitening</span>. Painless, precise &amp; personalised for you.
            </p>

            {/* Services Chips — All Equal Size */}
            <div className="grid grid-cols-3 gap-2">
              {['Porcelain Veneers', 'Dental Implants', 'Invisalign', 'Laser Whitening', 'Emergency Care', 'Teeth Cleaning'].map((s) => (
                <span
                  key={s}
                  className="bg-white/10 border border-white/20 backdrop-blur-sm text-white text-xs font-sans font-medium px-3 py-2.5 rounded-lg hover:bg-[#C5A059]/30 hover:border-[#C5A059]/50 transition-all duration-200 cursor-default text-center w-full"
                >
                  {s}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={() => router.push('/appointment')}
                className="group flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#B38F48] hover:from-[#D4AF37] hover:to-[#C5A059] text-[#1A0F00] font-sans font-bold text-sm tracking-widest uppercase rounded-sm shadow-lg shadow-amber-900/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 border border-amber-300/30"
              >
                Book Appointment
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  const element = document.getElementById('how-we-work-section');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    router.push('/services');
                  }
                }}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-sans font-bold text-sm tracking-widest uppercase rounded-sm border border-white/30 hover:border-[#C5A059]/60 transition-all duration-300"
              >
                Our Services
              </button>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10">
              {[
                { num: '16+', label: 'Years of Excellence', id: 'how-we-work-section' },
                { num: '12,400+', label: 'Smiles Transformed', id: 'before-after-section' },
                { num: '99.8%', label: 'Patient Satisfaction', id: 'google-reviews-section' },
                { num: '5.0 ★', label: 'Google Rating (480+)', id: 'google-reviews-section' },
              ].map((stat) => (
                <div
                  key={stat.num}
                  onClick={() => {
                    const el = document.getElementById(stat.id);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="group cursor-pointer text-center sm:text-left space-y-0.5 hover:scale-105 transition-transform duration-200"
                >
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-[#F0C97A] group-hover:text-white transition-colors">
                    {stat.num}
                  </div>
                  <div className="font-sans text-[11px] uppercase tracking-wider font-semibold text-slate-400 group-hover:text-[#F0C97A] transition-colors">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center space-y-1.5">
          <span className="text-[10px] uppercase font-sans tracking-[0.35em] text-[#C5A059] font-semibold">SCROLL</span>
          <div className="w-[1px] h-6 bg-gradient-to-b from-[#C5A059] to-transparent animate-pulse" />
        </div>
      </section>


      {/* React Bits LogoLoop Accredited Partners Marquee */}
      <section className={`py-6 border-y ${isLight ? 'bg-slate-100/60 border-slate-200' : 'bg-navy-950/60 border-white/10'}`}>
        <div className="max-w-7xl mx-auto px-4 overflow-hidden">
          <LogoLoop
            logos={partnerLogos}
            speed={70}
            direction="left"
            logoHeight={36}
            gap={24}
            hoverSpeed={0}
            pauseOnHover={true}
            scaleOnHover
            fadeOut
            fadeOutColor={isLight ? '#f1f5f9' : '#030712'}
            ariaLabel="Accreditation and technology partners"
          />
        </div>
      </section>

      {/* Live Offline Centre Queue Counter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <LiveClinicQueue />
      </section>

      {/* Dental Services Grid with React Bits PixelCard Integration */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-cyan-600 dark:text-cyan-400">Clinical Specialties</span>
          <h2 className={`text-3xl sm:text-5xl font-serif font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Bespoke Dental Treatments</h2>
          <p className={`text-sm max-w-xl mx-auto ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Engineered to restore optimal bite aesthetics, facial balance, and lifelong confidence.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((srv, idx) => (
            <PixelCard
              key={idx}
              variant="blue"
              className={`h-[440px] w-full ${isLight ? 'bg-white' : 'bg-navy-900/80'}`}
            >
              <div className="relative h-48 overflow-hidden w-full">
                <img
                  src={srv.img}
                  alt={srv.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                <span className="absolute top-3 right-3 bg-white/90 dark:bg-navy-900/80 backdrop-blur-md text-cyan-700 dark:text-cyan-400 text-[10px] font-bold px-3 py-1 rounded-full border border-cyan-500/30">
                  {srv.tag}
                </span>
              </div>
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between w-full">
                <div>
                  <h3 className={`text-lg font-bold transition-colors ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}>
                    {srv.title}
                  </h3>
                  <p className={`text-xs mt-2 leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>{srv.desc}</p>
                </div>
                <div className={`pt-4 border-t flex items-center justify-between w-full ${isLight ? 'border-slate-100' : 'border-white/5'}`}>
                  <span className="text-xs font-semibold text-cyan-700 dark:text-cyan-300">{srv.price}</span>
                  <Link
                    href={`/appointment?service=${encodeURIComponent(srv.title)}`}
                    className="p-2.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500 hover:text-white transition-all shadow-sm"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </PixelCard>
          ))}
        </div>
      </section>

      {/* Interactive Before & After Smile Slider Showcase */}
      <section id="before-after-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 scroll-mt-28">
        <BeforeAfterSlider />
      </section>

      {/* Doctors Profiles Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-cyan-600 dark:text-cyan-400">Master Clinicians</span>
          <h2 className={`text-3xl sm:text-5xl font-serif font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Meet Our Specialists</h2>
          <p className={`text-sm max-w-xl mx-auto ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>World-renowned experts dedicated to clinical excellence and patient-first care.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {doctors.map((doc, idx) => (
            <div
              key={idx}
              className={`glass-card rounded-3xl overflow-hidden border transition-all hover:-translate-y-2 group shadow-xl ${
                isLight ? 'bg-white border-slate-200 hover:border-cyan-500' : 'border-white/10 hover:border-cyan-500/40'
              }`}
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={doc.img}
                  alt={doc.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              </div>
              <div className="p-6 space-y-3">
                <h3 className={`text-xl font-serif font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{doc.name}</h3>
                <span className="text-xs font-semibold text-cyan-700 dark:text-cyan-400 block">{doc.role}</span>
                <span className={`text-[11px] block ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{doc.degree}</span>
                <p className={`text-xs pt-2 border-t ${isLight ? 'text-slate-600 border-slate-100' : 'text-slate-300 border-white/5'}`}>{doc.bio}</p>
                <Link
                  href={`/appointment?doctor=${encodeURIComponent(doc.name)}`}
                  className={`w-full mt-4 py-2.5 rounded-xl text-xs font-bold transition-all text-center block ${
                    isLight ? 'bg-slate-100 hover:bg-cyan-600 hover:text-white text-slate-800' : 'bg-navy-800 hover:bg-cyan-500 hover:text-slate-950 text-cyan-400'
                  }`}
                >
                  Book with {doc.name.split(' ')[1]}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Treatment Cost Estimator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CostEstimator />
      </section>

      {/* Treatment Process Timeline / How We Work */}
      <section id="how-we-work-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs uppercase font-serif font-bold tracking-[0.25em] text-[#C5A059] dark:text-amber-400">Our Method</span>
          <h2 className={`text-3xl sm:text-5xl font-serif font-bold ${isLight ? 'text-[#7A2818]' : 'text-amber-200'}`}>How We Work</h2>
          <p className={`text-sm max-w-xl mx-auto font-serif ${isLight ? 'text-amber-900/80' : 'text-amber-100/70'}`}>A seamless, discreet, and highly personalized step-by-step experience.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {processSteps.map((p, i) => (
            <div key={i} className={`glass-card rounded-2xl p-6 border relative space-y-3 ${
              isLight ? 'bg-white border-slate-200' : 'border-white/10'
            }`}>
              <span className="text-3xl font-serif font-bold text-cyan-600 dark:text-cyan-400">{p.num}</span>
              <h4 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{p.title}</h4>
              <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Technology Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`glass-card rounded-3xl p-8 md:p-12 border relative overflow-hidden ${
          isLight ? 'bg-white border-cyan-200 shadow-xl' : 'border-cyan-500/20'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">State-of-the-Art Equipment</span>
              <h2 className={`text-3xl sm:text-4xl font-serif font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>3D Digital & Painless Dentistry</h2>
              <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                We invest in the absolute latest medical technology to replace outdated uncomfortable dental tools with quiet lasers, instant 3D scans, and zero-anxiety sedation.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {technologies.map((t, i) => (
                  <div key={i} className={`flex items-start space-x-3 p-3 rounded-xl border ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-navy-900/60 border-white/5'
                  }`}>
                    <t.icon className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <h5 className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{t.name}</h5>
                      <p className={`text-[11px] mt-0.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>{t.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden h-80 lg:h-96 shadow-2xl border border-slate-200 dark:border-white/10">
              <img
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1000"
                alt="Dental Technology"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Google Reviews Testimonials */}
      <section id="google-reviews-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
        <GoogleReviews />
      </section>

      {/* FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-cyan-600 dark:text-cyan-400">Patient Intelligence</span>
          <h2 className={`text-3xl font-serif font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className={`glass-card rounded-2xl border overflow-hidden transition-all ${
                  isLight ? 'bg-white border-slate-200 shadow-sm' : 'border-white/10'
                }`}
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className={`w-full p-5 text-left flex items-center justify-between space-x-4 font-bold text-sm ${
                    isLight ? 'text-slate-900 hover:text-cyan-700' : 'text-white hover:text-cyan-400'
                  }`}
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className={`px-5 pb-5 text-xs leading-relaxed border-t pt-3 ${
                    isLight ? 'text-slate-600 border-slate-100' : 'text-slate-300 border-white/5'
                  }`}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Emergency Contact Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 rounded-3xl p-8 border border-red-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center space-x-4">
            <div className="p-4 bg-white/20 text-white rounded-2xl border border-white/30">
              <PhoneCall className="w-8 h-8 animate-bounce" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-red-100">24/7 Priority Concierge</span>
              <h3 className="text-2xl font-serif font-bold text-white">Dental Emergency or Acute Pain?</h3>
              <p className="text-xs text-red-100 mt-1">Immediate same-day appointments reserved for tooth trauma and swelling.</p>
            </div>
          </div>
          <a
            href="tel:18009993368"
            className="px-8 py-3.5 rounded-full bg-white hover:bg-slate-100 text-red-700 font-bold text-xs uppercase tracking-wider shadow-lg transition-all whitespace-nowrap"
          >
            Call Emergency Hotline
          </a>
        </div>
      </section>

    </div>
  );
}
