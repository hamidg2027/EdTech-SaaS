'use client';
import { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Plus, 
  Phone, 
  BookOpen, 
  Users, 
  Trash2, 
  Edit3, 
  X, 
  ArrowRight,
  ExternalLink,
  Briefcase,
  Share2,
  Copy,
  Check
} from 'lucide-react';
import { initialTeachers, initialGroups } from '@/lib/mockData';
import { Teacher, Group } from '@/lib/types';
import Link from 'next/link';

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [groups, setGroups] = useState<Group[]>(initialGroups);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deletingTeacher, setDeletingTeacher] = useState<Teacher | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    full_name: '',
    subject: '',
    phone: '',
    email: '',
    stages: ['ثانوي'] as ('ثانوي' | 'متوسط' | 'ابتدائي')[],
  });

  useEffect(() => {
    const saved = localStorage.getItem('cm_teachers');
    if (saved) try { setTeachers(JSON.parse(saved)); } catch(e){}
    const savedGroups = localStorage.getItem('cm_groups');
    if (savedGroups) try { setGroups(JSON.parse(savedGroups)); } catch(e){}
  }, []);

  function saveTeachers(list: Teacher[]) {
    setTeachers(list);
    localStorage.setItem('cm_teachers', JSON.stringify(list));
  }

  function handleAddTeacher(e: React.FormEvent) {
    e.preventDefault();
    const newTch: Teacher = {
      id: `tch-${Date.now()}`,
      full_name: formData.full_name.trim(),
      subject: formData.subject.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      stages: formData.stages,
      created_at: new Date().toISOString(),
    };
    saveTeachers([...teachers, newTch]);
    setFormData({ full_name: '', subject: '', phone: '', email: '', stages: ['ثانوي'] });
    setIsAddModalOpen(false);
  }

  function confirmDelete() {
    if (!deletingTeacher) return;
    saveTeachers(teachers.filter(t => t.id !== deletingTeacher.id));
    setDeletingTeacher(null);
  }

  function toggleStage(stg: 'ثانوي' | 'متوسط' | 'ابتدائي') {
    setFormData(prev => {
      const current = prev.stages || [];
      return {
        ...prev,
        stages: current.includes(stg)
          ? current.filter(s => s !== stg)
          : [...current, stg]
      };
    });
  }

  function copyTeacherLink(teacherId: string) {
    const url = `${window.location.origin}/teacher/${teacherId}`;
    navigator.clipboard.writeText(url);
    setCopiedId(teacherId);
    setTimeout(() => setCopiedId(null), 2500);
  }

  function shareTeacherWhatsApp(teacher: Teacher) {
    const url = `${window.location.origin}/teacher/${teacher.id}`;
    const cleanPhone = teacher.phone.replace(/[^0-9]/g, '');
    const phoneFormatted = cleanPhone.startsWith('0') ? '213' + cleanPhone.substring(1) : cleanPhone;
    const message = encodeURIComponent(`مرحباً أستاذ ${teacher.full_name}،\nهذا هو رابط بوابتك الخاصة لإدارة حصص مادة ${teacher.subject} ورصد درجات وملاحظات الطلاب في مركز النجاح:\n${url}`);
    window.open(`https://wa.me/${phoneFormatted}?text=${message}`, '_blank');
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">هيئة التدريس والأساتذة</h2>
          <p className="text-sm text-slate-500 mt-1">إرسال روابط البوابات الخاصة للأساتذة عبر واتساب، إدارة المواد، والأفواج</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-md shadow-emerald-700/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة أستاذ جديد</span>
          </button>
        </div>
      </div>

      {/* Teachers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {teachers.map((teacher) => {
          const assignedGroups = groups.filter(g => g.teacher_id === teacher.id || g.teacher_name === teacher.full_name);

          return (
            <div key={teacher.id} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between hover:border-emerald-500/50 transition-all space-y-4">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-lg">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-800">{teacher.full_name}</h3>
                      <span className="text-xs text-emerald-600 font-semibold">{teacher.subject}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setDeletingTeacher(teacher)}
                    className="text-slate-300 hover:text-rose-600 p-1 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl space-y-2 text-xs border border-slate-100">
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="text-slate-400">الهاتف:</span>
                    <a href={`tel:${teacher.phone}`} className="font-mono text-slate-700 font-bold hover:text-emerald-600">
                      {teacher.phone}
                    </a>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="text-slate-400">الأطوار:</span>
                    <div className="flex gap-1">
                      {(teacher.stages || []).map(stg => (
                        <span key={stg} className="bg-white border border-slate-200 text-[10px] font-bold text-slate-700 px-2 py-0.5 rounded-md">
                          {stg}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-400 block">الأفواج المشرف عليها ({assignedGroups.length}):</span>
                  <div className="flex flex-wrap gap-1.5">
                    {assignedGroups.length > 0 ? (
                      assignedGroups.map(g => (
                        <span key={g.id} className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">
                          {g.name}
                        </span>
                      ))
                    ) : (
                      <span className="text-[11px] text-slate-400 italic">لا توجد أفواج مسندة</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Share & Actions */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => shareTeacherWhatsApp(teacher)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 rounded-xl transition-all shadow-xs"
                    title="إرسال الرابط مباشرة لحساب الأستاذ على واتساب"
                  >
                    <span>إرسال عبر واتساب 💬</span>
                  </button>

                  <button
                    onClick={() => copyTeacherLink(teacher.id)}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-all flex items-center gap-1"
                    title="نسخ الرابط الخاص بالأستاذ"
                  >
                    {copiedId === teacher.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedId === teacher.id ? 'تم النسخ' : 'نسخ'}</span>
                  </button>
                </div>

                <Link
                  href={`/teacher/${teacher.id}`}
                  target="_blank"
                  className="w-full block text-center text-xs font-semibold text-slate-500 hover:text-slate-800 py-1"
                >
                  معاينة بوابة الأستاذ في صفحة جديدة ↗
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Add Teacher */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 text-base">إضافة أستاذ جديد</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddTeacher} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">اسم الأستاذ الكامل *</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: أ. عبد الحميد بن علي"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">المادة الدراسية المشرف عليها *</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: علوم الطبيعة والحياة أو الرياضيات"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">رقم الهاتف (لواتساب) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="0661000000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">البريد الإلكتروني</label>
                  <input
                    type="email"
                    placeholder="teacher@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">الأطوار التي يدرّسها:</label>
                <div className="flex gap-4 p-2 bg-slate-50 rounded-xl border border-slate-200">
                  {(['ثانوي', 'متوسط', 'ابتدائي'] as const).map(stg => (
                    <label key={stg} className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={(formData.stages || []).includes(stg)}
                        onChange={() => toggleStage(stg)}
                        className="rounded text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>الطور ال{stg}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-md shadow-emerald-700/20"
                >
                  حفظ وإضافة الأستاذ
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

      {/* Modal: Delete Confirmation */}
      {deletingTeacher && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl border border-slate-100 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-800 text-base">تأكيد حذف الأستاذ</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              هل أنت متأكد من حذف <strong>{deletingTeacher.full_name}</strong>؟
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={confirmDelete}
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors"
              >
                نعم، احذف
              </button>
              <button
                onClick={() => setDeletingTeacher(null)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold rounded-xl text-xs transition-colors"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
