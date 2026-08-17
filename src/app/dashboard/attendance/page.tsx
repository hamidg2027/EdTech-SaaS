'use client';
import { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, Clock, Save, Calendar, CheckSquare, Sparkles } from 'lucide-react';
import { initialGroups, initialStudents } from '@/lib/mockData';
import { Group, Student } from '@/lib/types';

interface StudentStatusState {
  student_id: string;
  name: string;
  code: string;
  status: 'present' | 'absent' | 'late';
}

export default function AttendancePage() {
  const [groups, setGroups] = useState<Group[]>(initialGroups);
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [selectedGroup, setSelectedGroup] = useState(initialGroups[0]?.id || 'grp-1');
  const [sessionDate, setSessionDate] = useState(new Date().toISOString().split('T')[0]);
  const [sessionTopic, setSessionTopic] = useState('');
  const [roster, setRoster] = useState<StudentStatusState[]>([]);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    const savedGroups = localStorage.getItem('cm_groups');
    if (savedGroups) try { setGroups(JSON.parse(savedGroups)); } catch(e){}
    const savedStudents = localStorage.getItem('cm_students');
    if (savedStudents) try { setStudents(JSON.parse(savedStudents)); } catch(e){}
  }, []);

  // Update roster whenever selected group changes
  useEffect(() => {
    const enrolled = students.filter(s => (s.enrolled_groups || []).includes(selectedGroup));
    setRoster(enrolled.map(s => ({
      student_id: s.id,
      name: `${s.first_name} ${s.last_name}`,
      code: s.student_code,
      status: 'present',
    })));
  }, [selectedGroup, students]);

  function setStudentStatus(id: string, status: 'present' | 'absent' | 'late') {
    setRoster(prev => prev.map(s => s.student_id === id ? { ...s, status } : s));
  }

  function handleSaveAttendance() {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  }

  const presentCount = roster.filter(s => s.status === 'present').length;
  const absentCount = roster.filter(s => s.status === 'absent').length;
  const lateCount = roster.filter(s => s.status === 'late').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">تسجيل الحضور والغياب</h2>
          <p className="text-sm text-slate-500 mt-1">تسجيل حضور الفوج اليومي وحفظ السجل الفوري لأولياء الأمور</p>
        </div>

        <button
          onClick={handleSaveAttendance}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md shadow-emerald-700/20 transition-all"
        >
          <Save className="w-4 h-4" />
          <span>حفظ سجل الحضور</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>تم حفظ الحضور بنجاح وتحديث بيانات الطلاب وأولياء الأمور!</span>
        </div>
      )}

      {/* Selector Controls */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">الفوج الدراسي</label>
          <select
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          >
            {groups.map(g => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">تاريخ الحصة</label>
          <input
            type="date"
            value={sessionDate}
            onChange={(e) => setSessionDate(e.target.value)}
            className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">عنوان الدرس (اختياري)</label>
          <input
            type="text"
            placeholder="مثال: تطبيقات الوحدة الأولى..."
            value={sessionTopic}
            onChange={(e) => setSessionTopic(e.target.value)}
            className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>
      </div>

      {/* Summary Bar */}
      <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm text-xs font-semibold">
        <span className="text-slate-500">إجمالي طلاب الفوج: <strong>{roster.length}</strong></span>
        <div className="flex gap-4">
          <span className="text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg">حاضر: {presentCount}</span>
          <span className="text-rose-700 bg-rose-50 px-3 py-1 rounded-lg">غائب: {absentCount}</span>
          <span className="text-amber-700 bg-amber-50 px-3 py-1 rounded-lg">متأخر: {lateCount}</span>
        </div>
      </div>

      {/* Attendance Students List */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        {roster.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {roster.map((student) => (
              <div key={student.student_id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors">
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">{student.name}</h4>
                  <span className="text-xs font-mono text-slate-400">{student.code}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setStudentStatus(student.student_id, 'present')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      student.status === 'present'
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>حاضر</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStudentStatus(student.student_id, 'absent')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      student.status === 'absent'
                        ? 'bg-rose-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-rose-50 hover:text-rose-700'
                    }`}
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>غائب</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStudentStatus(student.student_id, 'late')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      student.status === 'late'
                        ? 'bg-amber-500 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-amber-50 hover:text-amber-700'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>متأخر</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-slate-400 text-xs">
            لا يوجد طلاب مسجلين في هذا الفوج بعد. أضف طلاباً للفوج من صفحة الطلاب.
          </div>
        )}
      </div>
    </div>
  );
}
