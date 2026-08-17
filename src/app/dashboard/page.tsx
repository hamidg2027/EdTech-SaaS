'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Users, 
  BookOpen, 
  CheckCircle2, 
  DollarSign, 
  ArrowUpRight, 
  Clock, 
  Calendar,
  AlertCircle,
  PlusCircle
} from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    studentsCount: 48,
    groupsCount: 6,
    todayAttendanceRate: 92,
    monthlyRevenue: 144000,
  });

  useEffect(() => {
    async function loadStats() {
      try {
        const { count: studentsCount } = await supabase.from('students').select('*', { count: 'exact', head: true });
        const { count: groupsCount } = await supabase.from('groups').select('*', { count: 'exact', head: true });
        
        if (studentsCount !== null || groupsCount !== null) {
          setStats(prev => ({
            ...prev,
            studentsCount: studentsCount ?? prev.studentsCount,
            groupsCount: groupsCount ?? prev.groupsCount,
          }));
        }
      } catch (err) {
        console.log('Using sample preview stats');
      }
    }
    loadStats();
  }, []);

  return (
    <div className="space-y-8">
      {/* Title section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">نظرة عامة على المركز</h2>
          <p className="text-sm text-slate-500 mt-1">متابعة مباشرة للطلاب، الحصص اليومية، والوضع المالي</p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/dashboard/students"
            className="flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-all"
          >
            <PlusCircle className="w-4 h-4 text-emerald-600" />
            <span>إضافة طالب</span>
          </Link>
          <Link
            href="/dashboard/attendance"
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-md shadow-emerald-700/20 transition-all"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>أخذ الحضور اليوم</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-slate-500">إجمالي الطلاب المسجلين</span>
            <h3 className="text-2xl font-black text-slate-800 mt-2">{stats.studentsCount}</h3>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 mt-1">
              <ArrowUpRight className="w-3 h-3" /> +12% هذا الشهر
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-slate-500">الأفواج والمجموعات</span>
            <h3 className="text-2xl font-black text-slate-800 mt-2">{stats.groupsCount}</h3>
            <span className="text-[11px] text-slate-400 mt-1 block">موزعة على 3 مستويات</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-slate-500">نسبة الحضور اليومية</span>
            <h3 className="text-2xl font-black text-slate-800 mt-2">{stats.todayAttendanceRate}%</h3>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 mt-1">
              <CheckCircle2 className="w-3 h-3" /> التزام مرتفع
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-slate-500">التحصيل المالي (الشهر)</span>
            <h3 className="text-2xl font-black text-slate-800 mt-2">{stats.monthlyRevenue.toLocaleString()} دج</h3>
            <span className="text-[11px] text-slate-400 mt-1 block">82% تم تحصيله</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Grid: Schedule + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-slate-800 text-base">حصص اليوم المبرمجة</h3>
            </div>
            <span className="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">اليوم</span>
          </div>

          <div className="space-y-3">
            {[
              { time: '14:00 - 16:00', name: 'فوج البكالوريا - علوم طبيعية', room: 'القاعة 1', students: 18, teacher: 'أ. بن علي' },
              { time: '16:15 - 18:15', name: 'فوج 4 متوسط - رياضيات', room: 'القاعة 2', students: 14, teacher: 'أ. مرواني' },
              { time: '18:30 - 20:00', name: 'فوج 2 ثانوي - فيزياء', room: 'القاعة 1', students: 16, teacher: 'أ. قاسمي' },
            ].map((session, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-100 transition-all">
                <div className="flex items-center gap-4">
                  <div className="text-center px-3 py-1.5 bg-white rounded-lg border border-slate-200 shadow-xs">
                    <span className="text-xs font-bold text-slate-700 block">{session.time}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">{session.name}</h4>
                    <span className="text-xs text-slate-500">{session.teacher} • {session.room}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2.5 py-1 rounded-md">
                    {session.students} طالب
                  </span>
                  <Link
                    href="/dashboard/attendance"
                    className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 underline"
                  >
                    تسجيل
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Notices */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-amber-500" />
              <h3 className="font-bold text-slate-800 text-base">تنبيهات ومتابعات</h3>
            </div>
            
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/60 text-amber-900 text-xs leading-relaxed">
                <strong>4 طلاب</strong> متأخرون في دفع مستحقات شهر أغسطس.
              </div>
              <div className="p-3 rounded-xl bg-rose-50/60 border border-rose-200/60 text-rose-900 text-xs leading-relaxed">
                <strong>طالبان</strong> تجاوزا 3 غيابات متتالية في فوج الرياضيات.
              </div>
              <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200/60 text-emerald-900 text-xs leading-relaxed">
                تم إرسال تقارير الحضور تلقائياً إلى 42 ولي أمر عبر الرابط المباشر.
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 mt-6">
            <Link
              href="/parent"
              className="block text-center text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 py-2.5 rounded-xl transition-all"
            >
              تجربة بوابة أولياء الأمور
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
