'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  CheckSquare, 
  Award, 
  CreditCard, 
  UserCheck, 
  Sparkles,
  School,
  GraduationCap,
  Briefcase,
  X
} from 'lucide-react';

export const menuItems = [
  { name: 'لوحة التحكم', href: '/dashboard', icon: LayoutDashboard },
  { name: 'هيئة التدريس (الأساتذة)', href: '/dashboard/teachers', icon: GraduationCap },
  { name: 'المجموعات والأفواج', href: '/dashboard/groups', icon: BookOpen },
  { name: 'الطلاب', href: '/dashboard/students', icon: Users },
  { name: 'تسجيل الحضور', href: '/dashboard/attendance', icon: CheckSquare },
  { name: 'الدرجات والاختبارات', href: '/dashboard/grades', icon: Award },
  { name: 'المدفوعات والاشتراكات', href: '/dashboard/payments', icon: CreditCard },
  { name: 'بوابة الأستاذ', href: '/dashboard/teacher-portal', icon: Briefcase },
  { name: 'بوابة أولياء الأمور', href: '/parent', icon: UserCheck },
];

export default function Sidebar({
  mobileOpen = false,
  setMobileOpen,
}: {
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {/* 1. Desktop Sidebar (Always visible on large screens lg:) */}
      <aside className="hidden lg:flex w-64 bg-slate-900 text-slate-100 flex-col h-screen sticky top-0 border-l border-slate-800 z-30">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-900/50">
              <School className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-base leading-tight">مدير المراكز</h1>
              <span className="text-xs text-emerald-400 font-medium">Center Manager SaaS</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40 font-bold'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800 m-3 rounded-2xl bg-slate-800/40">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold mb-1">
            <Sparkles className="w-4 h-4" />
            <span>إدارة متعددة الصلاحيات</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            إدارة المركز • لوحة الأستاذ • بوابة ولي الأمر
          </p>
        </div>
      </aside>

      {/* 2. Mobile Drawer / Sidebar Overlay (Only on mobile when toggled) */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileOpen && setMobileOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative w-4/5 max-w-xs bg-slate-900 text-slate-100 flex flex-col h-full z-10 shadow-2xl border-l border-slate-800">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
                  <School className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-bold text-sm text-white">مدير المراكز</h2>
                  <span className="text-[10px] text-emerald-400">القائمة الرئيسية</span>
                </div>
              </div>
              <button
                onClick={() => setMobileOpen && setMobileOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen && setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40 font-bold'
                        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-slate-800 bg-slate-950/40">
              <p className="text-[11px] text-slate-500 text-center">
                نظام إدارة مراكز الدروس © 2026
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
