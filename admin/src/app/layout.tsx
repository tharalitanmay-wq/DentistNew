import type { Metadata } from 'next';
import './globals.css';
import { AdminAuthProvider } from '@/context/AdminAuthContext';
import AdminSidebar from '@/components/AdminSidebar';

export const metadata: Metadata = {
  title: 'Lumina Dental Studio | Admin CMS Dashboard',
  description: 'Role-based Admin Management Portal for Lumina Dental Studio.',
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-navy-950 text-slate-100 min-h-screen flex">
        <AdminAuthProvider>
          <div className="flex w-full min-h-screen">
            <AdminSidebar />
            <main className="flex-1 p-8 overflow-y-auto">{children}</main>
          </div>
        </AdminAuthProvider>
      </body>
    </html>
  );
}
