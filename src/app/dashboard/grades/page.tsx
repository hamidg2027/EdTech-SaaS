'use client';
import { useState, useEffect } from 'react';
import { Award, Plus, Trash2, X, Filter, GraduationCap } from 'lucide-react';
import { initialGrades, initialStudents, initialGroups, initialTeachers } from '@/lib/mockData';
import { Grade, Student, Group, Teacher } from '@/lib/types';

export default function GradesPage() {
  const [grades, setGrades] = useState<Grade[]>(initialGrades);
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [groups, setGroups] = useState<Group[]>(initialGroups);
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filterSubject, setFilterSubject] = useState('ALL');

  const [formData, setFormData] = useState({
    student_id: '',
    group_id: '',
    exam_title: '',
    score: 16,
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
    const savedTeachers = localStorage.getItem('cm_teachers');
    if (savedTeachers) try { setTeachers(JSON.parse(savedTeachers)); } catch(e){}
  }, []);

  function saveGradesToStorage(newList: Grade[]) {
    setGrades(newList);
    localStorage.setItem('cm_grades', JSON.stringify(newList));
  }

  function handleAddGrade(e: React.FormEvent) {
    e.preventDefault();
    const student = students.find(s => s.id === formData.student_id) || students[0];
    const group = groups.find(g => g.id === formData.group_id) || groups[0];
    const teacher = teachers.find(t => t.id === group.teacher_id || t.full_name === group.teacher_name) || teachers[0];

    const newGrade: Grade = {
      id: `grd-${Date.now()}`,
      student_id: student.id,
      student_name: `${student.first_name} ${student.last_name}`,
      group_id: group.id,
      group_name: group.name,
      subject: group.subject || teacher.subject,
      teacher_name: group.teacher_name || teacher.full_name,
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

  const filteredGrades = filterSubject === 'ALL'
    ? grades
    : grades.filter(g => g.subject === filterSubject);

  const distinctSubjects = Array.from(new Set(grades.map(g => g.subject)));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">سجل الدرجات والاختبارات</h2>
          <p className="text-sm text-slate-500 mt-1">متابعة علامات الطلاب مصنفة حسب المواد، الأساتذة، والأطوار التعليمية</p>
        </div>
        <button
          onClick={() => {
            setFormData({
              student_id: students[0]?.id || '',
              group_id: groups[0]?.id || '',
              exam_title: '',
              score: 16,
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

      {/* Filter by Subject */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3">
        <Filter className="w-4 h-4 text-slate-400" />
        <span className="text-xs font-semibold text-slate-600">تصفية حسب المادة:</span>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterSubject('ALL')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
              filterSubject === 'ALL' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            جميع المواد ({grades.length})
          </button>
          {distinctSubjects.map(subj => (
            <button
              key={subj}
              onClick={() => setFilterSubject(subj)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                filterSubject === subj ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {subj}
            </button>
          ))}
        </div>
      </div>

      {/* Grades Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <table className="w-full text-right border-collapse text-sm">
          <thead>
            <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 text-xs font-semibold">
              <th className="py-3.5 px-4">الطالب</th>
              <th className="py-3.5 px-4">المادة والأستاذ المشرف</th>
              <th className="py-3.5 px-4">الفوج</th>
              <th className="py-3.5 px-4">عنوان الاختبار</th>
              <th className="py-3.5 px-4">العلامة</th>
              <th className="py-3.5 px-4">ملاحظة الأستاذ لولي الأمر</th>
              <th className="py-3.5 px-4 text-center">حذف</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredGrades.map((g) => {
              const pct = ((g.score / g.max_score) * 100).toFixed(0);
              return (
                <tr key={g.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-800">{g.student_name}</td>
                  <td className="py-3.5 px-4">
                    <strong className="text-emerald-700 block text-xs">{g.subject}</strong>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <GraduationCap className="w-3 h-3 text-slate-400" />
                      {g.teacher_name}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-500">{g.group_name}</td>
                  <td className="py-3.5 px-4 text-xs font-semibold text-slate-700">{g.exam_title}</td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold font-mono text-emerald-700 block text-sm">
                      {g.score} / {g.max_score}
                    </span>
                    <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
                      {pct}%
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-600 max-w-xs">
                    {g.notes ? (
                      <span className="p-1.5 rounded-lg bg-slate-50 border border-slate-100 block text-[11px]">
                        « {g.notes} »
                      </span>
                    ) : (
                      <span className="text-slate-300 italic text-xs">لا توجد ملاحظة</span>
                    )}
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
              <h3 className="font-bold text-slate-800 text-base">رصد علامات اختبار جديد</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddGrade} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">اختر الفوج الدراسي والمادة</label>
                <select
                  value={formData.group_id}
                  onChange={(e) => setFormData({ ...formData, group_id: e.target.value })}
                  className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                >
                  {groups.map(g => (
                    <option key={g.id} value={g.id}>{g.name} ({g.teacher_name})</option>
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
                <label className="block text-xs font-semibold text-slate-700 mb-1">عنوان الفرض / الاختبار *</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: فرض الثلاثي الأول"
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
                <label className="block text-xs font-semibold text-slate-700 mb-1">ملاحظة الأستاذ لولي الأمر</label>
                <input
                  type="text"
                  placeholder="مثال: إجابة ممتازة، ينصح بالتركيز على التمارين التركيبية..."
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
                  حفظ ورصد العلامة
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
