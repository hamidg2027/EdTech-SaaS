'use client';
import { useState } from 'react';
import { CreditCard, Plus, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const mockPayments = [
  { id: '1', student: 'أحمد براهيمي', group: 'فوج البكالوريا - علوم', amount: 3000, date: '2026-08-10', month: 'أوت 2026', status: 'paid' },
  { id: '2', student: 'سارة قاسمي', group: 'فوج البكالوريا - علوم', amount: 3000, date: '2026-08-12', month: 'أوت 2026', status: 'paid' },
  { id: '3', student: 'محمد زياني', group: 'فوج 4 متوسط - فيزياء', amount: 2500, date: '-', month: 'أوت 2026', status: 'pending' },
  { id: '4', student: 'إيمان علوي', group: 'فوج البكالوريا - رياضيات', amount: 3000, date: '2026-08-15', month: 'أوت 2026', status: 'paid' },
];

export default function PaymentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">الاشتراكات والمدفوعات</h2>
          <p className="text-sm text-slate-500 mt-1">متابعة تحصيل الاشتراكات الشهرية وتنبيهات المتأخرات</p>
        </div>
        <button
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-md shadow-emerald-700/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>تسجيل دفعة جديدة</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <table className="w-full text-right border-collapse text-sm">
          <thead>
            <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 text-xs font-semibold">
              <th className="py-3.5 px-4">الطالب</th>
              <th className="py-3.5 px-4">الفوج</th>
              <th className="py-3.5 px-4">شهر الاشتراك</th>
              <th className="py-3.5 px-4">المبلغ</th>
              <th className="py-3.5 px-4">تاريخ الدفع</th>
              <th className="py-3.5 px-4 text-center">الحالة</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {mockPayments.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3.5 px-4 font-bold text-slate-800">{p.student}</td>
                <td className="py-3.5 px-4 text-xs text-slate-600">{p.group}</td>
                <td className="py-3.5 px-4 text-xs text-slate-700">{p.month}</td>
                <td className="py-3.5 px-4 font-mono font-bold text-slate-800">{p.amount} دج</td>
                <td className="py-3.5 px-4 text-xs text-slate-500 font-mono">{p.date}</td>
                <td className="py-3.5 px-4 text-center">
                  {p.status === 'paid' ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                      <CheckCircle className="w-3 h-3" /> تم الدفع
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full">
                      <Clock className="w-3 h-3" /> معلق / مستحق
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
