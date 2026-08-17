'use client';
import { useState, useEffect } from 'react';
import { 
  Briefcase, 
  GraduationCap, 
  Users, 
  Award, 
  CheckSquare, 
  Plus, 
  Save, 
  Clock, 
  BookOpen, 
  CheckCircle2,
  Trash2,
  X
} from 'lucide-react';
import { initialTeachers, initialGroups, initialStudents, initialGrades } from '@/lib/mockData';
import { Teacher, Group, Student, Grade } from '@/lib/types';

export default function TeacherPortalPage() {
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [groups, setGroups] = useState<Group[]>(initialGroups);
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [grades, setGrades] = useState<Grade[]>(initialGrades);
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>(initialTeachers[0]?.id || 'tch-1');
  const [isAddGradeModal, setIsAddGradeModal] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Selected teacher
  const currentTeacher = teachers.find(t => t.id === selectedTeacherId) || teachers[0];
  // Filter groups assigned to this teacher
  const teacherGroups = groups.filter(g => g.teacher_id === currentTeacher.id || g.teacher_name === currentTeacher.full_name);
  const teacherGroupIds = teacherGroups.map(g => g.id);
  // Filter students enrolled in this teacher's groups
  const teacherStudents = students.filter(s => (s.enrolled_groups || []).some(gid => teacherGroupIds.includes(gid)));
  // Filter grades given by this teacher
  const teacherGrades = grades.filter(g => g.teacher_name === currentTeacher.full_name || teacherGroupIds.includes(g.group_id));

  const [gradeForm, setGradeForm] = useState({
    group_id: teacherGroups[0]?.id || '',
    student_id: teacherStudents[0]?.id || '',
    exam_title: '',
    score: 16,
    max_score: 20,
    exam_date: new Date().toISOString().split('T')[0],
    notes: '',
  });

  useEffect(() => {
    const savedTeachers = localStorage.getItem('cm_teachers');
    if (savedTeachers) try { setTeachers(JSON.parse(savedTeachers)); } catch(e){}
    const savedGroups = localStorage.getItem('cm_groups');
    if (savedGroups) try { setGroups(JSON.parse(savedGroups)); } catch(e){}
    const savedStudents = localStorage.getItem('cm_students');
    if (savedStudents) try { setStudents(JSON.parse(savedStudents)); } catch(e){}
    const savedGrades = localStorage.getItem('cm_grades');
    if (savedGrades) try { setGrades(JSON.parse(savedGrades)); } catch(e){}
  }, []);

  function handleSaveGrade(e: React.FormEvent) {
    e.preventDefault();
    const group = groups.find(g => g.id === gradeForm.group_id) || teacherGroups[0];
    const student = students.find(s => s.id === gradeForm.student_id) || teacherStudents[0];

    const newGrade: Grade = {
      id: `grd-${Date.now()}`,
      student_id: student.id,
      student_name: `${student.first_name} ${student.last_name}`,
      group_id: group.id,
      group_name: group.name,
      subject: currentTeacher.subject,
      teacher_name: currentTeacher.full_name,
      exam_title: gradeForm.exam_title.trim() || 'تقييم دوري',
      score: Number(gradeForm.score),
      max_score: Number(gradeForm.max_score),
      exam_date: gradeForm.exam_date,
      notes: gradeForm.notes.trim(),
    };

    const updated = [newGrade, ...grades];
    setGrades(updated);
    localStorage.setItem('cm_grades', JSON.stringify(updated));

    setSuccessMsg('تم حفظ العلامة وملاحظة الأستاذ وإرسالها لولي الأمر بنجاح!');
    setTimeout(() => setSuccessMsg(''), 4000);
    setIsAddGradeModal(false);
  }

  function deleteGrade(id: string) {
    const updated = grades.filter(g => g.id !== id);
    setGrades(updated);
    localStorage.setItem('cm_grades', JSON.stringify(updated));
  }

  return (
    <div className="space-y-6">
      {/* Header with Teacher Selector */}
      <div className="bg-slate-900 text-white p-6 md:p-8 rounded-3xl border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-900/50">
            <GraduationCap className="w-8 h-8" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-3 py-1 rounded-full mb-1">
              <span>بوابة الأستاذ المشرف</span>
            </div>
            <h2 className="text-2xl font-black">{currentTeacher.full_name}</h2>
            <p className="text-xs text-slate-300">
              أستاذ مادة: <strong>{currentTeacher.subject}</strong> • هاتف: <span className="font-mono">{currentTeacher.phone}</span>
            </p>
          </div>
        </div>

        {/* Switch Teacher for Preview */}
        <div className="bg-slate-800 p-3 rounded-2xl border border-slate-700">
          <label className="block text-[11px] text-slate-400 font-semibold mb-1">تبديل حساب الأستاذ (للمعاينة):</label>
          <select
            value={selectedTeacherId}
            onChange={(e) => setSelectedTeacherId(e.target.value)}
            className="p-2 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          >
            {teachers.map(t => (
              <option key={t.id} value={t.id}>{t.full_name} ({t.subject})</option>
            ))}
          </select>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Teacher's Groups Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-base">الأفواج المشرف عليها:</h3>
          <span className="text-xs text-slate-500">{teacherGroups.length} أفواج مخصصة</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {teacherGroups.map(grp => {
            const grpStudents = students.filter(s => (s.enrolled_groups || []).includes(grp.id));
            return (
              <div key={grp.id} className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md">
                    {grp.grade_level}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">{grp.room}</span>
                </div>
                <h4 className="font-bold text-sm text-slate-800">{grp.name}</h4>
                <p className="text-xs text-slate-400">{grp.schedule}</p>
                <div className="pt-2 border-t border-slate-100 text-xs font-semibold text-emerald-700 flex justify-between">
                  <span>{grpStudents.length} طلاب مسجلين</span>
                  <span>{grp.monthly_price} دج</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Teacher Grades Section */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="font-bold text-slate-800 text-base">سجل درجات مادة {currentTeacher.subject}</h3>
            <p className="text-xs text-slate-500 mt-0.5">رصد علامات الفروض والاختبارات وكتابة الملاحظات التربوية لأولياء الأمور</p>
          </div>

          <button
            onClick={() => {
              setGradeForm({
                group_id: teacherGroups[0]?.id || '',
                student_id: teacherStudents[0]?.id || '',
                exam_title: '',
                score: 16,
                max_score: 20,
                exam_date: new Date().toISOString().split('T')[0],
                notes: '',
              });
              setIsAddGradeModal(true);
            }}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-emerald-700/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>رصد علامة اختبار جديدة</span>
          </button>
        </div>

        {/* Grades Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 text-xs font-semibold">
                <th className="py-3 px-4">الطالب</th>
                <th className="py-3 px-4">الفوج</th>
                <th className="py-3 px-4">عنوان الاختبار / الفرض</th>
                <th className="py-3 px-4">العلامة</th>
                <th className="py-3 px-4">ملاحظة الأستاذ (تظهر لولي الأمر)</th>
                <th className="py-3 px-4">التاريخ</th>
                <th className="py-3 px-4 text-center">حذف</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {teacherGrades.length > 0 ? (
                teacherGrades.map((g) => (
                  <tr key={g.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-800">{g.student_name}</td>
                    <td className="py-3 px-4 text-xs text-slate-500">{g.group_name}</td>
                    <td className="py-3 px-4 text-xs font-semibold text-slate-700">{g.exam_title}</td>
                    <td className="py-3 px-4 font-bold font-mono text-emerald-700">
                      {g.score} / {g.max_score}
                    </td>
                    <td className="py-3 px-4 text-xs text-slate-600">
                      {g.notes ? (
                        <span className="p-1.5 rounded-lg bg-slate-50 border border-slate-100 block">
                          « {g.notes} »
                        </span>
                      ) : (
                        <span className="text-slate-300 italic">لا توجد ملاحظة</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-xs text-slate-400 font-mono">{g.exam_date}</td>
                    <td className="py-3 px-4 text-center">
                      <button onClick={() => deleteGrade(g.id)} className="text-slate-300 hover:text-rose-600 p-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-xs text-slate-400">
                    لم يتم رصد أي علامات من قبل هذا الأستاذ بعد. اضغط على الزر أعلاه لرصد علامة جديدة.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Add Grade by Teacher */}
      {isAddGradeModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-800 text-base">رصد علامة اختبار</h3>
                <span className="text-xs text-emerald-600">المادة: {currentTeacher.subject}</span>
              </div>
              <button onClick={() => setIsAddGradeModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveGrade} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">اختر الفوج</label>
                <select
                  value={gradeForm.group_id}
                  onChange={(e) => setGradeForm({ ...gradeForm, group_id: e.target.value })}
                  className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                >
                  {teacherGroups.map(g => (
                    <option key={g.id} value={g.id}>{g.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">اختر الطالب</label>
                <select
                  value={gradeForm.student_id}
                  onChange={(e) => setGradeForm({ ...gradeForm, student_id: e.target.value })}
                  className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                >
                  {teacherStudents.map(s => (
                    <option key={s.id} value={s.id}>{s.first_name} {s.last_name} ({s.student_code})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">عنوان الفرض / الاختبار *</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: فرض تجريبي في الاستدلال العلمي"
                  value={gradeForm.exam_title}
                  onChange={(e) => setGradeForm({ ...gradeForm, exam_title: e.target.value })}
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
                    value={gradeForm.score}
                    onChange={(e) => setGradeForm({ ...gradeForm, score: Number(e.target.value) })}
                    className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">العلامة الكاملة</label>
                  <input
                    type="number"
                    required
                    value={gradeForm.max_score}
                    onChange={(e) => setGradeForm({ ...gradeForm, max_score: Number(e.target.value) })}
                    className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">ملاحظة الأستاذ لولي الأمر (نصائح وتوجيهات)</label>
                <textarea
                  rows={2}
                  placeholder="اكتب توجيهاتك للطالب، نقاط القوة، وما يحتاج لمراجعته..."
                  value={gradeForm.notes}
                  onChange={(e) => setGradeForm({ ...gradeForm, notes: e.target.value })}
                  className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-md shadow-emerald-700/20"
                >
                  حفظ وتأكيد العلامة
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddGradeModal(false)}
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
