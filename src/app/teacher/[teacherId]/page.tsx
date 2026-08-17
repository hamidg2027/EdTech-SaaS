'use client';
import { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  Award, 
  CheckCircle2, 
  Plus, 
  Clock, 
  MapPin, 
  Trash2, 
  Save,
  School,
  X,
  Phone
} from 'lucide-react';
import { initialTeachers, initialGroups, initialStudents, initialGrades } from '@/lib/mockData';
import { Teacher, Group, Student, Grade } from '@/lib/types';
import Link from 'next/link';

export default function StandaloneTeacherPage({
  params,
}: {
  params: { teacherId: string };
}) {
  const teacherId = params.teacherId;
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [groups, setGroups] = useState<Group[]>(initialGroups);
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [grades, setGrades] = useState<Grade[]>(initialGrades);
  const [isAddGradeModal, setIsAddGradeModal] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

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

  const teacher = teachers.find(t => t.id === teacherId) || teachers[0];
  const teacherGroups = groups.filter(g => g.teacher_id === teacher.id || g.teacher_name === teacher.full_name);
  const teacherGroupIds = teacherGroups.map(g => g.id);
  const teacherStudents = students.filter(s => (s.enrolled_groups || []).some(gid => teacherGroupIds.includes(gid)));
  const teacherGrades = grades.filter(g => g.teacher_name === teacher.full_name || teacherGroupIds.includes(g.group_id));

  const [gradeForm, setGradeForm] = useState({
    group_id: teacherGroups[0]?.id || '',
    student_id: teacherStudents[0]?.id || '',
    exam_title: '',
    score: 16,
    max_score: 20,
    exam_date: new Date().toISOString().split('T')[0],
    notes: '',
  });

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
      subject: teacher.subject,
      teacher_name: teacher.full_name,
      exam_title: gradeForm.exam_title.trim() || 'تقييم دوري',
      score: Number(gradeForm.score),
      max_score: Number(gradeForm.max_score),
      exam_date: gradeForm.exam_date,
      notes: gradeForm.notes.trim(),
    };

    const updated = [newGrade, ...grades];
    setGrades(updated);
    localStorage.setItem('cm_grades', JSON.stringify(updated));

    setSuccessMsg('تم رصد العلامة وملاحظة الأستاذ بنجاح وتحديث تقرير ولي الأمر فورياً!');
    setTimeout(() => setSuccessMsg(''), 4000);
    setIsAddGradeModal(false);
  }

  function deleteGrade(id: string) {
    const updated = grades.filter(g => g.id !== id);
    setGrades(updated);
    localStorage.setItem('cm_grades', JSON.stringify(updated));
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16">
      {/* Top Standalone Header */}
      <header className="bg-slate-900 text-white px-6 py-6 border-b border-slate-800 sticky top-0 z-20">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-900/50">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-lg">{teacher.full_name}</h1>
                <span className="text-[11px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800 px-2.5 py-0.5 rounded-full">
                  أستاذ مادة {teacher.subject}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">بوابة الأستاذ الخاصة — مركز النجاح للدروس الخصوصية</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-emerald-500" />
              {teacher.phone}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 pt-8 space-y-8">
        {successMsg && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-semibold flex items-center gap-2 shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Assigned Groups Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              <h2 className="font-bold text-slate-800 text-lg">الأفواج والحصص المسندة إليك ({teacherGroups.length})</h2>
            </div>
            <span className="text-xs text-slate-500">إجمالي الطلاب: {teacherStudents.length}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teacherGroups.map(grp => {
              const grpStudents = students.filter(s => (s.enrolled_groups || []).includes(grp.id));
              return (
                <div key={grp.id} className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] font-bold bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-md">
                        الطور {grp.stage} • {grp.grade_level}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">{grp.room}</span>
                    </div>
                    <h3 className="font-bold text-base text-slate-800">{grp.name}</h3>
                    <div className="p-2.5 bg-slate-50 rounded-xl space-y-1 text-xs text-slate-600 border border-slate-100">
                      <div className="flex items-center gap-1.5 font-medium">
                        <Clock className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>{grp.schedule || 'لم يحدد التوقيت'}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{grp.room || 'القاعة العامة'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 text-xs font-semibold text-slate-600 flex justify-between items-center">
                    <span>{grpStudents.length} طلاب مسجلين</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Grades and Student Notes Section */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 md:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-600" />
                <h2 className="font-bold text-slate-800 text-lg">سجل درجات الاختبارات وملاحظات الطلاب</h2>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                رصد علامات الفروض والاختبارات وكتابة التوجيهات والملاحظات المباشرة لأولياء الأمور
              </p>
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
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-5 py-3 rounded-xl shadow-md shadow-emerald-700/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>رصد علامة وملاحظة جديدة</span>
            </button>
          </div>

          {/* Grades Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 text-xs font-semibold">
                  <th className="py-3.5 px-4">الطالب</th>
                  <th className="py-3.5 px-4">الفوج</th>
                  <th className="py-3.5 px-4">عنوان الاختبار / الفرض</th>
                  <th className="py-3.5 px-4">العلامة</th>
                  <th className="py-3.5 px-4">ملاحظتك وتوجيهك لولي الأمر</th>
                  <th className="py-3.5 px-4">التاريخ</th>
                  <th className="py-3.5 px-4 text-center">حذف</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {teacherGrades.length > 0 ? (
                  teacherGrades.map((g) => (
                    <tr key={g.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-800">{g.student_name}</td>
                      <td className="py-3.5 px-4 text-xs text-slate-500">{g.group_name}</td>
                      <td className="py-3.5 px-4 text-xs font-semibold text-slate-700">{g.exam_title}</td>
                      <td className="py-3.5 px-4 font-bold font-mono text-emerald-700">
                        {g.score} / {g.max_score}
                      </td>
                      <td className="py-3.5 px-4 text-xs text-slate-600">
                        {g.notes ? (
                          <span className="p-2 rounded-xl bg-emerald-50/60 border border-emerald-100/80 text-emerald-900 block font-medium">
                            « {g.notes} »
                          </span>
                        ) : (
                          <span className="text-slate-300 italic">لا توجد ملاحظة</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-xs text-slate-400 font-mono">{g.exam_date}</td>
                      <td className="py-3.5 px-4 text-center">
                        <button onClick={() => deleteGrade(g.id)} className="text-slate-300 hover:text-rose-600 p-1">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center py-10 text-xs text-slate-400">
                      لم يتم رصد أي علامات بعد في مادتك. اضغط على الزر الأخضر أعلاه لإضافة علامة وملاحظة.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modal: Record Grade */}
      {isAddGradeModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-800 text-base">رصد علامة اختبار</h3>
                <span className="text-xs text-emerald-600">المادة: {teacher.subject}</span>
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
                <label className="block text-xs font-semibold text-slate-700 mb-1">ملاحظتك التربوية لولي الأمر</label>
                <textarea
                  rows={2}
                  placeholder="اكتب ملاحظاتك وتوجيهاتك لتحسين مستوى الطالب..."
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
