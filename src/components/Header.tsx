'use client';
import { Bell, Search, UserCircle, Plus, Menu, School } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { menuItems } from './Sidebar';

export default function Header({
  onToggleMobileMenu,
}: {
  onToggleMobileMenu?: () => void;
}) {
  const pathname = usePathname();

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
      {/* Top Header Bar */}
      <div className="h-16 px-4 md:px-6 flex items-center justify-between gap-3">
        {/* Left: Mobile Hamburger & Logo */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            aria-label="فتح القائمة"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="lg:hidden flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
              <School className="w-4 h-4" />
            </div>
            <span className="font-bold text-sm text-slate-800">مدير المراكز</span>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden lg:block relative w-72">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="بحث عن طالب، فوج، أو هاتف..."
              className="w-full pr-9 pl-4 py-2 text-sm bg-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all border border-transparent focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/dashboard/attendance"
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">تسجيل حضور</span>
            <span className="sm:hidden">حضور</span>
          </Link>

          <button className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 relative transition-colors">
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 bg-emerald-500 rounded-full absolute top-2 left-2 ring-2 ring-white"></span>
          </button>

          <div className="hidden sm:block h-6 w-px bg-slate-200"></div>

          <div className="flex items-center gap-2 text-right">
            <UserCircle className="w-8 h-8 text-slate-400" />
            <div className="hidden md:block">
              <div className="text-xs font-bold text-slate-800">مدير المركز</div>
              <div className="text-[10px] text-slate-500">مسؤول النظام</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Top Navigation Horizontal Bar (Scrollable on phone screens) */}
      <div className="lg:hidden px-3 py-2 bg-slate-50/90 border-t border-slate-100 overflow-x-auto flex gap-2 no-scrollbar">
        {menuItems.slice(0, 6).map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </header>
  );
}
