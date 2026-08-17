'use client';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar: Permanent on Desktop (lg:), Drawer on Mobile */}
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main App Content: Full Width on Mobile, Padded beside sidebar on Desktop */}
      <div className="flex-1 flex flex-col min-w-0 w-full overflow-hidden">
        <Header onToggleMobileMenu={() => setMobileOpen(!mobileOpen)} />
        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
