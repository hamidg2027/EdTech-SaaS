'use client';
import { useState, useEffect } from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  QrCode, 
  Phone, 
  Edit3, 
  Trash2, 
  X,
  CheckCircle,
  ExternalLink,
  Calendar,
  Clock,
  BookOpen,
  MapPin,
  FileText
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { initialStudents, initialGroups } from '@/lib/mockData';
import { Student, Group } from '@/lib/types';
import Link from 'next/link';

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [groups, setGroups] = useState<Group[]>(initialGroups);
  const [search, setSearch] = useState('');

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [deletingStudent, setDeletingStudent] = useState<Student | null>(null);
  const [viewingScheduleStudent, setViewingScheduleStudent] = useState<Student | null>(null);
  const [selectedStudentQr, setSelectedStudentQr] = useState<Student | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    parent_phone: '',
    student_code: '',
    enrolled_groups: [] as string[],
    notes: '',
  });

  // Load from localStorage if present
  useEffect(() => {
    const saved = localStorage.getItem('cm_students');
    if (saved) {
      try { setStudents(JSON.parse(saved)); } catch(e){}
    }
    const savedGroups = localStorage.getItem('cm_groups');
    if (savedGroups) {
      try { setGroups(JSON.parse(savedGroups)); } catch(e){}
    }
  }, []);

  function saveStudentsToStorage(newList: Student[]) {
    setStudents(newList);
    localStorage.setItem('cm_students', JSON.stringify(newList));
  }

  // Handle Add Student
  function handleAddStudent(e: React.FormEvent) {
    e.preventDefault();
    const newCode = formData.student_code.trim() || `STD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newStudent: Student = {
      id: `std-${Date.now()}`,
      first_name: formData.first_name.trim(),
      last_name: formData.last_name.trim(),
      parent_phone: formData.parent_phone.trim(),
      student_code: newCode,
      enrolled_groups: formData.enrolled_groups,
      notes: formData.notes.trim(),
      created_at: new Date().toISOString(),
    };

    saveStudentsToStorage([newStudent, ...students]);
    resetForm();
    setIsAddModalOpen(false);
  }

  // Handle Edit Student
  function handleEditStudent(e: React.FormEvent) {
    e.preventDefault();
    if (!editingStudent) return;

    const updatedList = students.map(s => {
      if (s.id === editingStudent.id) {
        return {
          ...s,
          first_name: formData.first_name.trim(),
          last_name: formData.last_name.trim(),
          parent_phone: formData.parent_phone.trim(),
          student_code: formData.student_code.trim() || s.student_code,
          enrolled_groups: formData.enrolled_groups,
          notes: formData.notes.trim(),
        };
      }
      return s;
    });

    saveStudentsToStorage(updatedList);
    resetForm();
    setEditingStudent(null);
  }

  // Handle Delete Student
  function confirmDelete() {
    if (!deletingStudent) return;
    const updated = students.filter(s => s.id !== deletingStudent.id);
    saveStudentsToStorage(updated);
    setDeletingStudent(null);
  }

  function openEditModal(student: Student) {
    setEditingStudent(student);
    setFormData({
      first_name: student.first_name,
      last_name: student.last_name,
      parent_phone: student.parent_phone,
      student_code: student.student_code,
      enrolled_groups: student.enrolled_groups || [],
      notes: student.notes || '',
    });
  }

  function resetForm() {
    setFormData({
      first_name: '',
      last_name: '',
      parent_phone: '',
      student_code: '',
      enrolled_groups: [],
      notes: '',
    });
  }

  function toggleGroupEnrollment(groupId: string) {
    setFormData(prev => {
      const exists = (prev.enrolled_groups || []).includes(groupId);
      return {
        ...prev,
        enrolled_groups: exists 
          ? prev.enrolled_groups.filter(id => id !== groupId)
          : [...prev.enrolled_groups, groupId]
      };
    });
  }

  const filteredStudents = students.filter(s => 
    s.first_name.toLowerCase().includes(search.toLowerCase()) || 
    s.last_name.toLowerCase().includes(search.toLowerCase()) || 
    s.student_code.toLowerCase().includes(search.toLowerCase()) ||
    s.parent_phone.includes(search)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">إدارة الطلاب</h2>
          <p className="text-sm text-slate-500 mt-1">إضافة وتعديل وحذف الطلاب، عرض جداول الحصص الأسبوعية، وبطاقات QR</p>
        </div>
        <button
          onClick={() => { resetForm(); setIsAddModalOpen(true); }}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-md shadow-emerald-700/20 transition-all"
        >
          <UserPlus className="w-4 h-4" />
          <span>إضافة طالب جديد</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="بحث بالاسم أو الكود أو الهاتف..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pr-9 pl-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white"
          />
        </div>
        <span className="text-xs text-slate-500 font-medium">
          إجمالي المسجلين: <strong>{filteredStudents.length}</strong> طالب
        </span>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 text-xs font-semibold">
                <th className="py-3.5 px-4">الطالب</th>
                <th className="py-3.5 px-4">الكود</th>
                <th className="py-3.5 px-4">هاتف ولي الأمر</th>
                <th className="py-3.5 px-4">الأفواج المسجل بها</th>
                <th className="py-3.5 px-4 text-center">جدول التوقيت</th>
                <th className="py-3.5 px-4 text-center">رمز QR</th>
                <th className="py-3.5 px-4 text-center">تقرير ولي الأمر</th>
                <th className="py-3.5 px-4 text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((student) => {
                const enrolled = groups.filter(g => (student.enrolled_groups || []).includes(g.id));

                return (
                  <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-800">
                      {student.first_name} {student.last_name}
                      {student.notes && <span className="block text-[11px] text-slate-400 font-normal">{student.notes}</span>}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-mono text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-md font-bold">
                        {student.student_code}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <a href={`tel:${student.parent_phone}`} className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-emerald-600 font-mono">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        {student.parent_phone}
                      </a>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1">
                        {enrolled.length > 0 ? (
                          enrolled.map(g => (
                            <span key={g.id} className="text-[11px] font-medium bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md">
                              {g.name}
                            </span>
                          ))
                        ) : (
                          <span className="text-[11px] text-slate-400 italic">غير مسجل بأي فوج</span>
                        )}
                      </div>
                    </td>

                    {/* Timetable Button */}
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => setViewingScheduleStudent(student)}
                        className="inline-flex items-center gap-1 text-xs text-blue-700 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg font-medium transition-colors"
                        title="عرض جدول التوقيت والحصص"
                      >
                        <Calendar className="w-3.5 h-3.5 text-blue-600" />
                        <span>جدول الحصص</span>
                      </button>
                    </td>

                    {/* QR Button */}
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => setSelectedStudentQr(student)}
                        className="inline-flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg font-medium transition-colors"
                      >
                        <QrCode className="w-3.5 h-3.5" />
                        بطاقة QR
                      </button>
                    </td>

                    {/* Parent Report Link */}
                    <td className="py-3.5 px-4 text-center">
                      <Link
                        href={`/parent/${student.student_code}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 text-xs text-slate-700 hover:text-emerald-700 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-lg font-medium transition-colors"
                      >
                        <span>فتح التقرير</span>
                        <ExternalLink className="w-3 h-3 text-slate-400" />
                      </Link>
                    </td>

                    {/* Edit & Delete Actions */}
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => openEditModal(student)}
                          className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                          title="تعديل بيانات الطالب"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeletingStudent(student)}
                          className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="حذف الطالب"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Add Student */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 text-base">إضافة طالب جديد</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddStudent} className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">الاسم *</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: أحمد"
                    value={formData.first_name}
                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                    className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">اللقب *</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: براهيمي"
                    value={formData.last_name}
                    onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                    className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">رقم هاتف ولي الأمر (واتساب) *</label>
                <input
                  type="tel"
                  required
                  placeholder="0550123456"
                  value={formData.parent_phone}
                  onChange={(e) => setFormData({ ...formData, parent_phone: e.target.value })}
                  className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">كود الطالب (اختياري - يولد تلقائياً)</label>
                <input
                  type="text"
                  placeholder="STD-XXXX"
                  value={formData.student_code}
                  onChange={(e) => setFormData({ ...formData, student_code: e.target.value })}
                  className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">تسجيل الطالب في الأفواج:</label>
                <div className="space-y-2 max-h-36 overflow-y-auto p-2 bg-slate-50 rounded-xl border border-slate-200">
                  {groups.map(g => (
                    <label key={g.id} className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={(formData.enrolled_groups || []).includes(g.id)}
                        onChange={() => toggleGroupEnrollment(g.id)}
                        className="rounded text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>{g.name} ({g.monthly_price} دج)</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">ملاحظات إضافية</label>
                <input
                  type="text"
                  placeholder="ملاحظات حول مستوى الطالب أو وضعه..."
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
                  حفظ وإضافة
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

      {/* Modal: Edit Student */}
      {editingStudent && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 text-base">تعديل بيانات الطالب</h3>
              <button onClick={() => setEditingStudent(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditStudent} className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">الاسم</label>
                  <input
                    type="text"
                    required
                    value={formData.first_name}
                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                    className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">اللقب</label>
                  <input
                    type="text"
                    required
                    value={formData.last_name}
                    onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                    className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">رقم هاتف ولي الأمر</label>
                <input
                  type="tel"
                  required
                  value={formData.parent_phone}
                  onChange={(e) => setFormData({ ...formData, parent_phone: e.target.value })}
                  className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">كود الطالب</label>
                <input
                  type="text"
                  required
                  value={formData.student_code}
                  onChange={(e) => setFormData({ ...formData, student_code: e.target.value })}
                  className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">الأفواج المسجل بها:</label>
                <div className="space-y-2 max-h-36 overflow-y-auto p-2 bg-slate-50 rounded-xl border border-slate-200">
                  {groups.map(g => (
                    <label key={g.id} className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={(formData.enrolled_groups || []).includes(g.id)}
                        onChange={() => toggleGroupEnrollment(g.id)}
                        className="rounded text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>{g.name} ({g.monthly_price} دج)</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">ملاحظات</label>
                <input
                  type="text"
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
                  حفظ التعديلات
                </button>
                <button
                  type="button"
                  onClick={() => setEditingStudent(null)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold rounded-xl text-xs transition-colors"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Delete Student Confirmation */}
      {deletingStudent && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl border border-slate-100 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-800 text-base">تأكيد حذف الطالب</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              هل أنت متأكد من رغبتك في حذف الطالب <strong>{deletingStudent.first_name} {deletingStudent.last_name}</strong>؟ سيتم إزالة جميع بيانات الحضور والدرجات المرتبطة به.
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={confirmDelete}
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors"
              >
                نعم، احذف الطالب
              </button>
              <button
                onClick={() => setDeletingStudent(null)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold rounded-xl text-xs transition-colors"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Student Schedule / Timetable Viewer */}
      {viewingScheduleStudent && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-slate-100 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-base">
                    جدول توقيت: {viewingScheduleStudent.first_name} {viewingScheduleStudent.last_name}
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">الكود: {viewingScheduleStudent.student_code}</span>
                </div>
              </div>
              <button onClick={() => setViewingScheduleStudent(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Schedule List */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-600">الحصص الأسبوعية المبرمجة:</h4>
              {groups.filter(g => (viewingScheduleStudent.enrolled_groups || []).includes(g.id)).length > 0 ? (
                groups.filter(g => (viewingScheduleStudent.enrolled_groups || []).includes(g.id)).map(grp => (
                  <div key={grp.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-sm text-slate-800">{grp.name}</h5>
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                        {grp.subject}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span><strong>التوقيت:</strong> {grp.schedule || 'يحدد لاحقاً'}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-slate-500" />
                        <span><strong>المكان:</strong> {grp.room || 'القاعة الرئيسية'} ({grp.teacher_name || 'أستاذ المادة'})</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-xs text-slate-400 bg-slate-50 rounded-2xl">
                  لم يتم تسجيل الطالب في أي فوج حتى الآن. يمكنك تعديل بياناته لإضافته إلى الأفواج.
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-between items-center border-t border-slate-100">
              <Link
                href={`/parent/${viewingScheduleStudent.student_code}`}
                target="_blank"
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
              >
                <span>معاينة كما يراها ولي الأمر</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={() => setViewingScheduleStudent(null)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: QR Code */}
      {selectedStudentQr && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 text-center space-y-5">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">بطاقة الحضور الذكية</span>
              <button onClick={() => setSelectedStudentQr(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 inline-block shadow-inner">
              <QRCodeSVG value={selectedStudentQr.student_code} size={180} />
            </div>

            <div>
              <h3 className="font-bold text-lg text-slate-800">{selectedStudentQr.first_name} {selectedStudentQr.last_name}</h3>
              <p className="font-mono text-xs text-slate-500 mt-1">{selectedStudentQr.student_code}</p>
            </div>

            <button
              onClick={() => window.print()}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs transition-all"
            >
              طباعة البطاقة
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
