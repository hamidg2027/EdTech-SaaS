'use client';
import { Award, Plus, TrendingUp } from 'lucide-react';

const mockGrades = [
  { id: '1', student: 'أحمد براهيمي', exam: 'اختبار تقييمي 1', score: 18.5, maxScore: 20, date: '2026-08-05' },
  { id: '2', student: 'سارة قاسمي', exam: 'اختبار تقييمي 1', score: 19, maxScore: 20, date: '2026-08-05' },
  { id: '3', student: 'محمد زياني', exam: 'اختبار تقييمي 1', score: 13, maxScore: 20, date: '2026-08-05' },
  { id: '4', student: 'إيمان علوي', exam: 'اختبار تقييمي 1', score: 16.5, maxScore: 20, date: '2026-08-05' },
];

export default function GradesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">الدرجات والاختبارات</h2>
          <p className="text-sm text-slate-500 mt-1">تسجيل علامات التقييم ومتابعة المنحنى البياني لتطور مستوى الطالب</p>
        </div>
        <button
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-md shadow-emerald-700/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>رصد علامات اختبار جديد</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <table className="w-full text-right border-collapse text-sm">
          <thead>
            <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 text-xs font-semibold">
              <th className="py-3.5 px-4">الطالب</th>
              <th className="py-3.5 px-4">اسم الاختبار</th>
              <th className="py-3.5 px-4">العلامة المحصل عليها</th>
              <th className="py-3.5 px-4">النسبة المئوية</th>
              <th className="py-3.5 px-4">التاريخ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {mockGrades.map((g) => {
              const pct = ((g.score / g.maxScore) * 100).toFixed(0);
              return (
                <tr key={g.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-800">{g.student}</td>
                  <td className="py-3.5 px-4 text-xs text-slate-600">{g.exam}</td>
                  <td className="py-3.5 px-4 font-bold font-mono text-emerald-700">
                    {g.score} / {g.maxScore}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-xs font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md">
                      {pct}%
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-500 font-mono">{g.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
