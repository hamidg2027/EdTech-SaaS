'use client';
import { useState } from 'react';
import { BookOpen, Plus, Users, DollarSign, Calendar, Layers } from 'lucide-react';
import { Group } from '@/lib/types';

const initialGroups: Group[] = [
  { id: '1', name: 'فوج البكالوريا - علوم طبيعية', subject: 'علوم الطبيعة والحياة', grade_level: '3 ثانوي', monthly_price: 3000, student_count: 18 },
  { id: '2', name: 'فوج البكالوريا - رياضيات', subject: 'رياضيات', grade_level: '3 ثانوي', monthly_price: 3000, student_count: 16 },
  { id: '3', name: 'فوج 4 متوسط - فيزياء', subject: 'علوم فيزيائية', grade_level: '4 متوسط (BEM)', monthly_price: 2500, student_count: 14 },
  { id: '4', name: 'فوج 2 ثانوي - لغات أجنبية', subject: 'لغة إنجليزية', grade_level: '2 ثانوي', monthly_price: 2200, student_count: 12 },
];

export default function GroupsPage() {
  const [groups, setGroups] = useState<Group[]>(initialGroups);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">الأفواج والمجموعات</h2>
          <p className="text-sm text-slate-500 mt-1">تنظيم الأفواج الدراسية، المستويات، وأسعار الاشتراكات الشهرية</p>
        </div>
        <button
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-md shadow-emerald-700/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>إنشاء فوج جديد</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {groups.map((grp) => (
          <div key={grp.id} className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between hover:border-emerald-500/50 transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md">
                  {grp.grade_level}
                </span>
                <span className="text-xs font-bold text-slate-700 font-mono">
                  {grp.monthly_price} دج / شهر
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-800">{grp.name}</h3>
              <p className="text-xs text-slate-500">المادة: {grp.subject}</p>
            </div>

            <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <Users className="w-4 h-4 text-emerald-600" />
                <span>{grp.student_count || 0} طالب مسجل</span>
              </div>
              <button className="text-xs font-bold text-emerald-600 hover:text-emerald-700">
                تفاصيل الفوج ←
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
