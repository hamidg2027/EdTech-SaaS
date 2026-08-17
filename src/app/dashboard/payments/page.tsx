'use client';
import { useState, useEffect } from 'react';
import { CreditCard, Plus, CheckCircle, Clock, Trash2, X } from 'lucide-react';
import { initialPayments, initialStudents, initialGroups } from '@/lib/mockData';
import { Payment, Student, Group } from '@/lib/types';

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>(initialPayments);
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [groups, setGroups] = useState<Group[]>(initialGroups);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    student_id: '',
    group_id: '',
    amount: 3000,
    month: 'أوت 2026',
    payment_date: new Date().toISOString().split('T')[0],
    status: 'paid' as 'paid' | 'pending',
    notes: '',
  });

  useEffect(() => {
    const savedPayments = localStorage.getItem('cm_payments');
    if (savedPayments) try { setPayments(JSON.parse(savedPayments)); } catch(e){}
    const savedStudents = localStorage.getItem('cm_students');
    if (savedStudents) try { setStudents(JSON.parse(savedStudents)); } catch(e){}
    const savedGroups = localStorage.getItem('cm_groups');
    if (savedGroups) try { setGroups(JSON.parse(savedGroups)); } catch(e){}
  }, []);

  function savePaymentsToStorage(newList: Payment[]) {
    setPayments(newList);
    localStorage.setItem('cm_payments', JSON.stringify(newList));
  }

  function handleRecordPayment(e: React.FormEvent) {
    e.preventDefault();
    const student = students.find(s => s.id === formData.student_id) || students[0];
    const group = groups.find(g => g.id === formData.group_id) || groups[0];

    const newPayment: Payment = {
      id: `pay-${Date.now()}`,
      student_id: student.id,
      student_name: `${student.first_name} ${student.last_name}`,
      group_id: group.id,
      group_name: group.name,
      amount: Number(formData.amount),
      payment_date: formData.payment_date,
      month: formData.month,
      status: formData.status,
      notes: formData.notes.trim(),
    };

    savePaymentsToStorage([newPayment, ...payments]);
    setIsAddModalOpen(false);
  }

  function toggleStatus(id: string) {
    const updated = payments.map(p => {
      if (p.id === id) {
        return {
          ...p,
          status: p.status === 'paid' ? 'pending' : ('paid' as 'paid' | 'pending'),
          payment_date: p.status === 'pending' ? new Date().toISOString().split('T')[0] : '-'
        };
      }
      return p;
    });
    savePaymentsToStorage(updated);
  }

  function deletePayment(id: string) {
    savePaymentsToStorage(payments.filter(p => p.id !== id));
  }

  const totalPaid = payments.filter(p => p.status === 'paid').reduce((acc, curr) => acc + curr.amount, 0);
  const totalPending = payments.filter(p => p.status === 'pending').reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">الاشتراكات والمدفوعات</h2>
          <p className="text-sm text-slate-500 mt-1">تسجيل المدفوعات الشهرية وتتبع المتأخرات المالية للطلاب</p>
        </div>
        <button
          onClick={() => {
            setFormData({
              student_id: students[0]?.id || '',
              group_id: groups[0]?.id || '',
              amount: groups[0]?.monthly_price || 3000,
              month: 'أوت 2026',
              payment_date: new Date().toISOString().split('T')[0],
              status: 'paid',
              notes: '',
            });
            setIsAddModalOpen(true);
          }}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-md shadow-emerald-700/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>تسجيل دفعة جديدة</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">إجمالي المبالغ المحصلة</span>
          <div className="text-2xl font-black text-emerald-600 mt-1 font-mono">{totalPaid.toLocaleString()} دج</div>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">مستحقات معلقة / متأخرات</span>
          <div className="text-2xl font-black text-amber-600 mt-1 font-mono">{totalPending.toLocaleString()} دج</div>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">إجمالي عدد الاشتراكات</span>
          <div className="text-2xl font-black text-slate-800 mt-1">{payments.length}</div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <table className="w-full text-right border-collapse text-sm">
          <thead>
            <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 text-xs font-semibold">
              <th className="py-3.5 px-4">الطالب</th>
              <th className="py-3.5 px-4">الفوج</th>
              <th className="py-3.5 px-4">شهر الاشتراك</th>
              <th className="py-3.5 px-4">المبلغ</th>
              <th className="py-3.5 px-4">تاريخ الدفع</th>
              <th className="py-3.5 px-4">ملاحظة</th>
              <th className="py-3.5 px-4 text-center">الحالة (انقر للتغيير)</th>
              <th className="py-3.5 px-4 text-center">حذف</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {payments.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3.5 px-4 font-bold text-slate-800">{p.student_name}</td>
                <td className="py-3.5 px-4 text-xs text-slate-600">{p.group_name}</td>
                <td className="py-3.5 px-4 text-xs text-slate-700">{p.month}</td>
                <td className="py-3.5 px-4 font-mono font-bold text-slate-800">{p.amount} دج</td>
                <td className="py-3.5 px-4 text-xs text-slate-500 font-mono">{p.payment_date}</td>
                <td className="py-3.5 px-4 text-xs text-slate-400">{p.notes || '-'}</td>
                <td className="py-3.5 px-4 text-center">
                  <button
                    onClick={() => toggleStatus(p.id)}
                    className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full cursor-pointer transition-all"
                  >
                    {p.status === 'paid' ? (
                      <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                        <CheckCircle className="w-3 h-3" /> تم الدفع
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full">
                        <Clock className="w-3 h-3" /> معلق / مستحق
                      </span>
                    )}
                  </button>
                </td>
                <td className="py-3.5 px-4 text-center">
                  <button
                    onClick={() => deletePayment(p.id)}
                    className="p-1 text-slate-400 hover:text-rose-600 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal: Add Payment */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 text-base">تسجيل دفعة اشتراك</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRecordPayment} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">اختر الطالب</label>
                <select
                  value={formData.student_id}
                  onChange={(e) => setFormData({ ...formData, student_id: e.target.value })}
                  className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                >
                  {students.map(s => (
                    <option key={s.id} value={s.id}>{s.first_name} {s.last_name} ({s.student_code})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">اختر الفوج</label>
                <select
                  value={formData.group_id}
                  onChange={(e) => {
                    const selGrp = groups.find(g => g.id === e.target.value);
                    setFormData({ 
                      ...formData, 
                      group_id: e.target.value,
                      amount: selGrp ? selGrp.monthly_price : formData.amount
                    });
                  }}
                  className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                >
                  {groups.map(g => (
                    <option key={g.id} value={g.id}>{g.name} ({g.monthly_price} دج)</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">المبلغ (دج) *</label>
                  <input
                    type="number"
                    required
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                    className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">شهر الاشتراك</label>
                  <input
                    type="text"
                    required
                    placeholder="أوت 2026"
                    value={formData.month}
                    onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                    className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">حالة الدفع</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'paid' | 'pending' })}
                  className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                >
                  <option value="paid">تم الدفع (خالص)</option>
                  <option value="pending">معلق (مستحق)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">ملاحظات / رقم الوصل</label>
                <input
                  type="text"
                  placeholder="مثال: وصل رقم #120 أو دفع نقداً"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-md shadow-emerald-700/20"
                >
                  حفظ الدفعة
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold rounded-xl text-xs transition-colors"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
