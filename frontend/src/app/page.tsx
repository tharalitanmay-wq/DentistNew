'use client';

import React, { useState } from 'react';
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
import { useTheme } from '@/context/ThemeContext';

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
      img: 'https://images.unsplash.com/photo-1594824813566-78a9c30f40d2?auto=format&fit=crop&q=80&w=600'
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
      name: 'Dr. Evelyn Sterling',
      role: 'Chief Cosmetic Dentist',
      degree: 'DDS Harvard • AACD Accredited',
      bio: 'Master of facial smile aesthetics and ultra-thin ceramic veneer artistry.',
      img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600'
    },
    {
      name: 'Dr. Julian Vance',
      role: 'Implant Surgeon',
      degree: 'DMD Columbia • Johns Hopkins Fellow',
      bio: 'Pioneer in computer-guided implantology and full-mouth rehabilitation.',
      img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600'
    },
    {
      name: 'Dr. Aria Chen',
      role: 'Orthodontic Specialist',
      degree: 'DDS UPenn • MS NYU',
      bio: 'Diamond Plus Invisalign provider specializing in adult facial symmetry.',
      img: 'https://images.unsplash.com/photo-1594824813566-78a9c30f40d2?auto=format&fit=crop&q=80&w=600'
    }
  ];

  const processSteps = [
    { num: '01', title: '3D Digital Scan', desc: 'Non-invasive iTero intraoral scanning captures 100,000 data points of your teeth.' },
    { num: '02', title: 'Facial Harmony Design', desc: 'We craft a custom digital preview aligned with your lip line and facial geometry.' },
    { num: '03', title: 'Pain-Free Treatment', desc: 'State-of-the-art cold laser and twilight sedation ensure effortless comfort.' },
    { num: '04', title: 'Lumina Smile Reveal', desc: 'Walk out with a radiant, natural-looking high-wattage smile guaranteed to last.' },
  ];

  const technologies = [
    { name: 'iTero Element 5D Scanner', desc: 'Instant 3D digital impressions without messy impression paste.', icon: Cpu },
    { name: 'CBCT 3D X-Ray Imaging', desc: 'Ultra-low radiation 3D bone and nerve structure visualization.', icon: Activity },
    { name: 'Biolase Waterlase Laser', desc: 'Drill-free, needle-free painless gum reshaping and cavity prep.', icon: Zap },
    { name: 'Computer-Guided Implants', desc: 'Sub-millimeter precision surgical placement templates.', icon: HeartPulse }
  ];

  const faqs = [
    {
      q: 'What makes Lumina Dental Studio different from traditional dental clinics?',
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

      {/* Light Luxury Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 -mt-24 pt-36 bg-slate-50 dark:bg-navy-950">
        {/* Background Image with Light Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=2000"
            alt="Lumina Dental Studio"
            className={`w-full h-full object-cover transition-all duration-1000 ${
              isLight ? 'brightness-[1.1] opacity-25 scale-105' : 'brightness-[0.35] scale-105'
            }`}
          />
          <div className={`absolute inset-0 ${
            isLight
              ? 'bg-gradient-to-b from-slate-50/90 via-slate-50/70 to-slate-100'
              : 'bg-gradient-to-t from-navy-950 via-navy-950/70 to-transparent'
          }`} />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-400/20 rounded-full blur-[120px] pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold tracking-tight leading-[1.1]">
            <span className={isLight ? 'text-slate-900' : 'text-white'}>Precision Dentistry.</span>{' '}
            <span className="gradient-text block mt-2">Bespoke Elegance.</span>
          </h1>

          <p className={`text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-normal leading-relaxed ${
            isLight ? 'text-slate-700' : 'text-slate-300'
          }`}>
            Experience world-class cosmetic dentistry, 3D computer-guided implants, and porcelain veneers in a tranquil, luxury Park Avenue studio environment.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <SpecularButton
              size="lg"
              radius={999}
              tint="#0284c7"
              tintOpacity={0.95}
              blur={12}
              textColor="#ffffff"
              lineColor="#ffffff"
              baseColor="#0369a1"
              intensity={1.3}
              shineSize={15}
              shineFade={35}
              thickness={1.5}
              speed={0.4}
              followMouse={true}
              autoAnimate={true}
              onClick={() => router.push('/appointment')}
              className="w-full sm:w-auto font-bold text-xs uppercase tracking-wider shadow-xl shadow-cyan-500/30"
            >
              <Calendar className="w-4 h-4 mr-1.5 text-white" />
              <span>BOOK APPOINTMENT</span>
            </SpecularButton>

            <Link
              href="/services"
              className={`w-full sm:w-auto px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider transition-all backdrop-blur-md flex items-center justify-center space-x-2 border ${
                isLight
                  ? 'bg-white/90 border-slate-300 text-slate-800 hover:border-cyan-600 hover:bg-slate-50 shadow-sm'
                  : 'bg-navy-800/80 border-white/20 text-white hover:border-cyan-400'
              }`}
            >
              <span>Explore Treatments</span>
              <ArrowRight className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            </Link>
          </div>

          {/* Social Proof Stats */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t max-w-4xl mx-auto ${
            isLight ? 'border-slate-200' : 'border-white/10'
          }`}>
            {stats.map((s, i) => (
              <div key={i} className="text-center space-y-1">
                <div className={`text-2xl sm:text-3xl font-serif font-bold ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  <span>{s.number}</span>
                </div>
                <div className={`text-[11px] uppercase tracking-wider ${
                  isLight ? 'text-slate-600' : 'text-slate-400'
                }`}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BeforeAfterSlider
          beforeImage="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1200"
          afterImage="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=1200"
          title="Transformational Results"
          subtitle="Drag the interactive slider to view real patient porcelain veneer results"
        />
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

      {/* Treatment Process Timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-cyan-600 dark:text-cyan-400">Seamless Journey</span>
          <h2 className={`text-3xl sm:text-5xl font-serif font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>The Lumina Treatment Process</h2>
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
