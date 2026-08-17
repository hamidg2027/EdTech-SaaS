'use client';
import { useState } from 'react';
import { CheckCircle2, XCircle, Clock, Save, Calendar, CheckSquare, Sparkles } from 'lucide-react';

interface AttendanceStudent {
  id: string;
  name: string;
  code: string;
  status: 'present' | 'absent' | 'late';
}

const mockStudentsList: AttendanceStudent[] = [
  { id: '1', name: 'أحمد براهيمي', code: 'STD-1001', status: 'present' },
  { id: '2', name: 'سارة قاسمي', code: 'STD-1002', status: 'present' },
  { id: '3', name: 'محمد زياني', code: 'STD-1003', status: 'absent' },
  { id: '4', name: 'إيمان علوي', code: 'STD-1004', status: 'present' },
  { id: '5', name: 'يوسف مهدي', code: 'STD-1005', status: 'late' },
];

export default function AttendancePage() {
  const [selectedGroup, setSelectedGroup] = useState('1');
  const [sessionDate, setSessionDate] = useState(new Date().toISOString().split('T')[0]);
  const [students, setStudents] = useState<AttendanceStudent[]>(mockStudentsList);
  const [savedSuccess, setSavedSuccess] = useState(false);

  function setStatus(id: string, status: 'present' | 'absent' | 'late') {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status } : s));
  }

  function handleSave() {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  }

  const presentCount = students.filter(s => s.status === 'present').length;
  const absentCount = students.filter(s => s.status === 'absent').length;
  const lateCount = students.filter(s => s.status === 'late').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">تسجيل الحضور السريع</h2>
          <p className="text-sm text-slate-500 mt-1">تحديد حضور وغياب الطلاب بنقرة زر وتحديث تقرير ولي الأمر فورياً</p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md shadow-emerald-700/20 transition-all"
        >
          <Save className="w-4 h-4" />
          <span>حفظ سجل الحضور</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>تم حفظ الحضور بنجاح وتحديث إحصائيات الطلاب!</span>
        </div>
      )}

      {/* Selectors Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">اختر الفوج</label>
          <select
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          >
            <option value="1">فوج البكالوريا - علوم طبيعية</option>
            <option value="2">فوج البكالوريا - رياضيات</option>
            <option value="3">فوج 4 متوسط - فيزياء</option>
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

        <div className="flex items-end justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
          <div className="text-center">
            <span className="text-[10px] text-slate-500 font-medium">حاضر</span>
            <div className="text-sm font-black text-emerald-600">{presentCount}</div>
          </div>
          <div className="text-center">
            <span className="text-[10px] text-slate-500 font-medium">غائب</span>
            <div className="text-sm font-black text-rose-600">{absentCount}</div>
          </div>
          <div className="text-center">
            <span className="text-[10px] text-slate-500 font-medium">متأخر</span>
            <div className="text-sm font-black text-amber-600">{lateCount}</div>
          </div>
        </div>
      </div>

      {/* Attendance List */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="divide-y divide-slate-100">
          {students.map((student) => (
            <div key={student.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors">
              <div>
                <h4 className="font-bold text-slate-800 text-sm">{student.name}</h4>
                <span className="text-xs font-mono text-slate-400">{student.code}</span>
              </div>

              {/* Status Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setStatus(student.id, 'present')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
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
                  onClick={() => setStatus(student.id, 'absent')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
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
                  onClick={() => setStatus(student.id, 'late')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
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
      </div>
    </div>
  );
}
