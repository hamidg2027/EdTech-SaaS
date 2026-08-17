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
  ExternalLink
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { supabase } from '@/lib/supabaseClient';
import { Student } from '@/lib/types';
import Link from 'next/link';

const sampleStudents: Student[] = [
  { id: '1', first_name: 'أحمد', last_name: 'براهيمي', student_code: 'STD-1001', parent_phone: '0550123456' },
  { id: '2', first_name: 'سارة', last_name: 'قاسمي', student_code: 'STD-1002', parent_phone: '0661987654' },
  { id: '3', first_name: 'محمد', last_name: 'زياني', student_code: 'STD-1003', parent_phone: '0770554433' },
  { id: '4', first_name: 'إيمان', last_name: 'علوي', student_code: 'STD-1004', parent_phone: '0541223344' },
  { id: '5', first_name: 'يوسف', last_name: 'مهدي', student_code: 'STD-1005', parent_phone: '0678990011' },
];

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>(sampleStudents);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudentQr, setSelectedStudentQr] = useState<Student | null>(null);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    parent_phone: '',
    student_code: '',
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  async function fetchStudents() {
    try {
      const { data, error } = await supabase.from('students').select('*').order('created_at', { ascending: false });
      if (data && data.length > 0) {
        setStudents(data);
      }
    } catch (e) {
      console.log('Using sample students data');
    }
  }

  async function handleAddStudent(e: React.FormEvent) {
    e.preventDefault();
    const code = formData.student_code || `STD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newStudent = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      parent_phone: formData.parent_phone,
      student_code: code,
    };

    try {
      const { data, error } = await supabase.from('students').insert([newStudent]).select();
      if (data && data[0]) {
        setStudents([data[0], ...students]);
      } else {
        setStudents([{ id: Date.now().toString(), ...newStudent }, ...students]);
      }
    } catch (err) {
      setStudents([{ id: Date.now().toString(), ...newStudent }, ...students]);
    }

    setFormData({ first_name: '', last_name: '', parent_phone: '', student_code: '' });
    setIsModalOpen(false);
  }

  const filteredStudents = students.filter(s => 
    s.first_name.includes(search) || 
    s.last_name.includes(search) || 
    s.student_code.includes(search) ||
    s.parent_phone.includes(search)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">قائمة الطلاب</h2>
          <p className="text-sm text-slate-500 mt-1">إدارة بيانات الطلاب، رموز QR، ومعلومات الاتصال بأولياء الأمور</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
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
            placeholder="بحث بالاسم أو الكود أو رقم الهاتف..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pr-9 pl-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white"
          />
        </div>
        <span className="text-xs text-slate-500 font-medium">
          إجمالي النتائج: <strong>{filteredStudents.length}</strong> طالب
        </span>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 text-xs font-semibold">
                <th className="py-3.5 px-4">الطالب</th>
                <th className="py-3.5 px-4">رقم الكود</th>
                <th className="py-3.5 px-4">هاتف ولي الأمر</th>
                <th className="py-3.5 px-4">رمز QR</th>
                <th className="py-3.5 px-4">بوابة المتابعة</th>
                <th className="py-3.5 px-4 text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-800">
                    {student.first_name} {student.last_name}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-mono text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md">
                      {student.student_code}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <a href={`tel:${student.parent_phone}`} className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-emerald-600 font-mono">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      {student.parent_phone}
                    </a>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => setSelectedStudentQr(student)}
                      className="inline-flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg font-medium transition-colors"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      عرض البطاقة
                    </button>
                  </td>
                  <td className="py-3.5 px-4">
                    <Link
                      href={`/parent/${student.student_code}`}
                      target="_blank"
                      className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium"
                    >
                      <span>تقرير ولي الأمر</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-1 text-slate-400 hover:text-slate-600 rounded">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-slate-400 hover:text-rose-600 rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Add Student */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 text-base">إضافة طالب جديد</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddStudent} className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">الاسم</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: أحمد"
                    value={formData.first_name}
                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                    className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">اللقب</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: براهيمي"
                    value={formData.last_name}
                    onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                    className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">رقم هاتف ولي الأمر (واتساب)</label>
                <input
                  type="tel"
                  required
                  placeholder="مثال: 0550123456"
                  value={formData.parent_phone}
                  onChange={(e) => setFormData({ ...formData, parent_phone: e.target.value })}
                  className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">كود الطالب (اختياري - سيولد تلقائياً)</label>
                <input
                  type="text"
                  placeholder="STD-XXXX"
                  value={formData.student_code}
                  onChange={(e) => setFormData({ ...formData, student_code: e.target.value })}
                  className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-md shadow-emerald-700/20"
                >
                  حفظ الطالب
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold rounded-xl text-xs transition-colors"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: QR Code Card */}
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

            <p className="text-[11px] text-slate-400">
              يمكن لمسؤول الحضور مسح هذا الرمز لتسجيل الحضور الفوري
            </p>

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
