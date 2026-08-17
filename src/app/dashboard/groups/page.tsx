'use client';
import { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Plus, 
  Users, 
  DollarSign, 
  Calendar, 
  Clock, 
  MapPin, 
  X, 
  Edit3, 
  Trash2, 
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { initialGroups, initialStudents } from '@/lib/mockData';
import { Group, Student } from '@/lib/types';
import Link from 'next/link';

export default function GroupsPage() {
  const [groups, setGroups] = useState<Group[]>(initialGroups);
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedGroupDetails, setSelectedGroupDetails] = useState<Group | null>(null);
  const [deletingGroup, setDeletingGroup] = useState<Group | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    grade_level: '3 ثانوي',
    monthly_price: 3000,
    teacher_name: '',
    room: 'القاعة 1',
    schedule: '',
  });

  useEffect(() => {
    const saved = localStorage.getItem('cm_groups');
    if (saved) {
      try { setGroups(JSON.parse(saved)); } catch(e){}
    }
    const savedStudents = localStorage.getItem('cm_students');
    if (savedStudents) {
      try { setStudents(JSON.parse(savedStudents)); } catch(e){}
    }
  }, []);

  function saveGroupsToStorage(newList: Group[]) {
    setGroups(newList);
    localStorage.setItem('cm_groups', JSON.stringify(newList));
  }

  function handleCreateGroup(e: React.FormEvent) {
    e.preventDefault();
    const newGroup: Group = {
      id: `grp-${Date.now()}`,
      name: formData.name.trim(),
      subject: formData.subject.trim(),
      grade_level: formData.grade_level,
      monthly_price: Number(formData.monthly_price),
      teacher_name: formData.teacher_name.trim() || 'أستاذ المادة',
      room: formData.room.trim() || 'القاعة 1',
      schedule: formData.schedule.trim() || 'يحدد لاحقاً',
      student_count: 0,
      created_at: new Date().toISOString(),
    };

    saveGroupsToStorage([...groups, newGroup]);
    setFormData({
      name: '',
      subject: '',
      grade_level: '3 ثانوي',
      monthly_price: 3000,
      teacher_name: '',
      room: 'القاعة 1',
      schedule: '',
    });
    setIsAddModalOpen(false);
  }

  function confirmDeleteGroup() {
    if (!deletingGroup) return;
    const updated = groups.filter(g => g.id !== deletingGroup.id);
    saveGroupsToStorage(updated);
    setDeletingGroup(null);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">الأفواج والمجموعات</h2>
          <p className="text-sm text-slate-500 mt-1">إنشاء وإدارة الأفواج الدراسية، أوقات الحصص، وأسعار الاشتراكات</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-md shadow-emerald-700/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>إنشاء فوج جديد</span>
        </button>
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {groups.map((grp) => {
          const enrolledStudents = students.filter(s => (s.enrolled_groups || []).includes(grp.id));

          return (
            <div key={grp.id} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between hover:border-emerald-500/50 transition-all">
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
                <p className="text-xs text-slate-500">المادة: {grp.subject} • {grp.teacher_name}</p>

                <div className="p-3 bg-slate-50 rounded-xl space-y-1 text-xs text-slate-600 border border-slate-100">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{grp.schedule || 'لم يحدد التوقيت'}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{grp.room || 'القاعة العامة'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-slate-600 font-semibold">
                  <Users className="w-4 h-4 text-emerald-600" />
                  <span>{enrolledStudents.length} طلاب مسجلين</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedGroupDetails(grp)}
                    className="text-xs font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    تفاصيل الفوج ←
                  </button>
                  <button
                    onClick={() => setDeletingGroup(grp)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
                    title="حذف الفوج"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Create New Group */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 text-base">إنشاء فوج دراسي جديد</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateGroup} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">اسم الفوج *</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: فوج البكالوريا - علوم طبيعية"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">المادة الدراسية *</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: علوم، رياضيات"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">المستوى</label>
                  <select
                    value={formData.grade_level}
                    onChange={(e) => setFormData({ ...formData, grade_level: e.target.value })}
                    className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  >
                    <option value="3 ثانوي (BAC)">3 ثانوي (BAC)</option>
                    <option value="2 ثانوي">2 ثانوي</option>
                    <option value="1 ثانوي">1 ثانوي</option>
                    <option value="4 متوسط (BEM)">4 متوسط (BEM)</option>
                    <option value="3 متوسط">3 متوسط</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">أستاذ المادة</label>
                  <input
                    type="text"
                    placeholder="مثال: أ. بن علي"
                    value={formData.teacher_name}
                    onChange={(e) => setFormData({ ...formData, teacher_name: e.target.value })}
                    className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">سعر الاشتراك الشهري (دج)</label>
                  <input
                    type="number"
                    required
                    value={formData.monthly_price}
                    onChange={(e) => setFormData({ ...formData, monthly_price: Number(e.target.value) })}
                    className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">برنامج وتوقيت الحصص الأسبوعي</label>
                <input
                  type="text"
                  placeholder="مثال: السبت 14:00 - 16:00 • الثلاثاء 16:00 - 18:00"
                  value={formData.schedule}
                  onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                  className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">القاعة</label>
                <input
                  type="text"
                  placeholder="مثال: القاعة 1 أو القاعة 2"
                  value={formData.room}
                  onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                  className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-md shadow-emerald-700/20"
                >
                  إنشاء الفوج
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

      {/* Modal: Group Details */}
      {selectedGroupDetails && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl border border-slate-100 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-bold text-slate-800 text-lg">{selectedGroupDetails.name}</h3>
                <span className="text-xs text-slate-400">
                  {selectedGroupDetails.grade_level} • {selectedGroupDetails.teacher_name}
                </span>
              </div>
              <button onClick={() => setSelectedGroupDetails(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Group Specs */}
            <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs">
              <div>
                <span className="text-slate-400 block">برنامج الحصص:</span>
                <strong className="text-slate-700">{selectedGroupDetails.schedule || 'غير محدد'}</strong>
              </div>
              <div>
                <span className="text-slate-400 block">سعر الاشتراك:</span>
                <strong className="text-emerald-700 font-mono">{selectedGroupDetails.monthly_price} دج / شهر</strong>
              </div>
              <div>
                <span className="text-slate-400 block">القاعة:</span>
                <strong className="text-slate-700">{selectedGroupDetails.room}</strong>
              </div>
              <div>
                <span className="text-slate-400 block">الأستاذ المشرف:</span>
                <strong className="text-slate-700">{selectedGroupDetails.teacher_name}</strong>
              </div>
            </div>

            {/* Students List in Group */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-700">قائمة الطلاب المسجلين في هذا الفوج:</h4>
                <Link
                  href="/dashboard/attendance"
                  className="text-xs font-semibold text-emerald-600 hover:text-emerald-700"
                >
                  تسجيل الحضور الآن ←
                </Link>
              </div>

              <div className="divide-y divide-slate-100 border border-slate-100 rounded-2xl max-h-48 overflow-y-auto">
                {students.filter(s => (s.enrolled_groups || []).includes(selectedGroupDetails.id)).length > 0 ? (
                  students
                    .filter(s => (s.enrolled_groups || []).includes(selectedGroupDetails.id))
                    .map(student => (
                      <div key={student.id} className="p-3 flex items-center justify-between hover:bg-slate-50 text-xs">
                        <div>
                          <strong className="text-slate-800 block">{student.first_name} {student.last_name}</strong>
                          <span className="font-mono text-slate-400">{student.student_code}</span>
                        </div>
                        <span className="font-mono text-slate-500">{student.parent_phone}</span>
                      </div>
                    ))
                ) : (
                  <div className="p-4 text-center text-xs text-slate-400">
                    لا يوجد طلاب مسجلين في هذا الفوج حالياً.
                  </div>
                )}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedGroupDetails(null)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Delete Group Confirmation */}
      {deletingGroup && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl border border-slate-100 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-800 text-base">تأكيد حذف الفوج</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              هل أنت متأكد من رغبتك في حذف <strong>{deletingGroup.name}</strong>؟
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={confirmDeleteGroup}
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors"
              >
                نعم، احذف الفوج
              </button>
              <button
                onClick={() => setDeletingGroup(null)}
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
