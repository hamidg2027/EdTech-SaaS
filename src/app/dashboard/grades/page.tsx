'use client';
import { useState, useEffect } from 'react';
import { Award, Plus, Trash2, X, CheckCircle } from 'lucide-react';
import { initialGrades, initialStudents, initialGroups } from '@/lib/mockData';
import { Grade, Student, Group } from '@/lib/types';

export default function GradesPage() {
  const [grades, setGrades] = useState<Grade[]>(initialGrades);
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [groups, setGroups] = useState<Group[]>(initialGroups);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    student_id: '',
    group_id: '',
    exam_title: '',
    score: 15,
    max_score: 20,
    exam_date: new Date().toISOString().split('T')[0],
    notes: '',
  });

  useEffect(() => {
    const savedGrades = localStorage.getItem('cm_grades');
    if (savedGrades) try { setGrades(JSON.parse(savedGrades)); } catch(e){}
    const savedStudents = localStorage.getItem('cm_students');
    if (savedStudents) try { setStudents(JSON.parse(savedStudents)); } catch(e){}
    const savedGroups = localStorage.getItem('cm_groups');
    if (savedGroups) try { setGroups(JSON.parse(savedGroups)); } catch(e){}
  }, []);

  function saveGradesToStorage(newList: Grade[]) {
    setGrades(newList);
    localStorage.setItem('cm_grades', JSON.stringify(newList));
  }

  function handleAddGrade(e: React.FormEvent) {
    e.preventDefault();
    const student = students.find(s => s.id === formData.student_id) || students[0];
    const group = groups.find(g => g.id === formData.group_id) || groups[0];

    const newGrade: Grade = {
      id: `grd-${Date.now()}`,
      student_id: student.id,
      student_name: `${student.first_name} ${student.last_name}`,
      group_id: group.id,
      group_name: group.name,
      exam_title: formData.exam_title.trim() || 'اختبار تقييمي',
      score: Number(formData.score),
      max_score: Number(formData.max_score),
      exam_date: formData.exam_date,
      notes: formData.notes.trim(),
    };

    saveGradesToStorage([newGrade, ...grades]);
    setIsAddModalOpen(false);
  }

  function deleteGrade(id: string) {
    saveGradesToStorage(grades.filter(g => g.id !== id));
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">الدرجات والاختبارات</h2>
          <p className="text-sm text-slate-500 mt-1">رصد علامات الاختبارات والتقييمات الدورية لتحديث تقرير ولي الأمر فورياً</p>
        </div>
        <button
          onClick={() => {
            setFormData({
              student_id: students[0]?.id || '',
              group_id: groups[0]?.id || '',
              exam_title: '',
              score: 15,
              max_score: 20,
              exam_date: new Date().toISOString().split('T')[0],
              notes: '',
            });
            setIsAddModalOpen(true);
          }}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-md shadow-emerald-700/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>رصد علامة اختبار جديدة</span>
        </button>
      </div>

      {/* Grades Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <table className="w-full text-right border-collapse text-sm">
          <thead>
            <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 text-xs font-semibold">
              <th className="py-3.5 px-4">الطالب</th>
              <th className="py-3.5 px-4">الفوج</th>
              <th className="py-3.5 px-4">عنوان الاختبار</th>
              <th className="py-3.5 px-4">العلامة</th>
              <th className="py-3.5 px-4">النسبة</th>
              <th className="py-3.5 px-4">التاريخ وملاحظة الأستاذ</th>
              <th className="py-3.5 px-4 text-center">حذف</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {grades.map((g) => {
              const pct = ((g.score / g.maxScore) * 100).toFixed(0);
              return (
                <tr key={g.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-800">{g.student_name}</td>
                  <td className="py-3.5 px-4 text-xs text-slate-500">{g.group_name}</td>
                  <td className="py-3.5 px-4 text-xs font-semibold text-slate-700">{g.exam_title}</td>
                  <td className="py-3.5 px-4 font-bold font-mono text-emerald-700">
                    {g.score} / {g.max_score}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-xs font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md">
                      {pct}%
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-500">
                    <div>{g.exam_date}</div>
                    {g.notes && <span className="text-[11px] text-slate-400 italic">{g.notes}</span>}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => deleteGrade(g.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal: Record Grade */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 text-base">رصد علامات اختبار</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddGrade} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">اختر الفوج</label>
                <select
                  value={formData.group_id}
                  onChange={(e) => setFormData({ ...formData, group_id: e.target.value })}
                  className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                >
                  {groups.map(g => (
                    <option key={g.id} value={g.id}>{g.name}</option>
                  ))}
                </select>
              </div>

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
                <label className="block text-xs font-semibold text-slate-700 mb-1">عنوان الاختبار / الفرض *</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: فرض تجريبي في المنهجية"
                  value={formData.exam_title}
                  onChange={(e) => setFormData({ ...formData, exam_title: e.target.value })}
                  className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">العلامة المحصل عليها *</label>
                  <input
                    type="number"
                    step="0.25"
                    required
                    value={formData.score}
                    onChange={(e) => setFormData({ ...formData, score: Number(e.target.value) })}
                    className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">العلامة الكاملة</label>
                  <input
                    type="number"
                    required
                    value={formData.max_score}
                    onChange={(e) => setFormData({ ...formData, max_score: Number(e.target.value) })}
                    className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">ملاحظة الأستاذ (تظهر لولي الأمر)</label>
                <input
                  type="text"
                  placeholder="مثال: استيعاب ممتاز، ينصح بمواصلة التمارين..."
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
                  حفظ العلامة
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
