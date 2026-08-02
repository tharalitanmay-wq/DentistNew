import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import AiAssistantModal from '@/components/AiAssistantModal';
import CookieConsent from '@/components/CookieConsent';
import Cursor from '@/components/Cursor/Cursor';

export const metadata: Metadata = {
  title: 'Pearl Dental Care | Luxury Cosmetic Dentistry & 3D Implants',
  description: 'Pinnacle of luxury aesthetic dentistry, porcelain veneers, computer-guided implants, and Invisalign on Park Avenue, New York.',
  keywords: ['cosmetic dentistry', 'porcelain veneers', 'dental implants', 'invisalign', 'luxury dental clinic', 'park avenue dentist'],
  openGraph: {
    title: 'Pearl Dental Care | Luxury Dentistry',
    description: 'Pinnacle of luxury aesthetic dentistry, porcelain veneers, and computer-guided implants.',
    images: ['https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200'],
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body className="bg-slate-50 text-slate-900 light:bg-slate-50 light:text-slate-900 min-h-screen flex flex-col selection:bg-cyan-500 selection:text-slate-950 transition-colors duration-300">
        <AuthProvider>
          <ThemeProvider>
            <Cursor />
            <Navbar />
            <main className="flex-grow pt-24">{children}</main>
            <Footer />
            <WhatsAppButton />
            <AiAssistantModal />
            <CookieConsent />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
