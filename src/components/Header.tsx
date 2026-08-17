'use client';
import { Bell, Search, UserCircle, Plus } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="بحث عن طالب، فوج، أو هاتف..."
            className="w-full pr-9 pl-4 py-2 text-sm bg-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all border border-transparent focus:border-emerald-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/dashboard/attendance"
          className="hidden sm:flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>تسجيل حضور جديد</span>
        </Link>

        <button className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 relative transition-colors">
          <Bell className="w-5 h-5" />
          <span className="w-2 h-2 bg-emerald-500 rounded-full absolute top-2 left-2 ring-2 ring-white"></span>
        </button>

        <div className="h-8 w-px bg-slate-200"></div>

        <div className="flex items-center gap-2 text-right">
          <UserCircle className="w-8 h-8 text-slate-400" />
          <div className="hidden md:block">
            <div className="text-xs font-bold text-slate-800">مدير المركز</div>
            <div className="text-[10px] text-slate-500">مسؤول النظام</div>
          </div>
        </div>
      </div>
    </header>
  );
}
