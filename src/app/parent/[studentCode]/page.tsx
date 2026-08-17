import Link from 'next/link';
import { 
  School, 
  CheckCircle2, 
  XCircle, 
  TrendingUp, 
  Award, 
  Calendar, 
  Clock, 
  MapPin, 
  DollarSign, 
  ArrowRight,
  GraduationCap,
  Sparkles
} from 'lucide-react';
import { initialStudents, initialGroups, initialGrades, initialTeachers } from '@/lib/mockData';

export default function StudentParentReportPage({
  params,
}: {
  params: { studentCode: string };
}) {
  const code = params.studentCode.toUpperCase();
  const student = initialStudents.find(s => s.student_code.toUpperCase() === code) || initialStudents[0];
  const enrolledGroups = initialGroups.filter(g => (student.enrolled_groups || []).includes(g.id));
  const studentGrades = initialGrades.filter(g => g.student_id === student.id || g.student_name.includes(student.first_name));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16">
      {/* Top Banner */}
      <header className="bg-slate-900 text-white px-6 py-6 border-b border-slate-800">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-900/50">
              <School className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-base md:text-lg">تقرير متابعة الطالب الشامل</h1>
              <span className="text-xs text-emerald-400">مركز النجاح للدروس الخصوصية والدعم المدرسي</span>
            </div>
          </div>

          <Link
            href="/parent"
            className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 px-3.5 py-2 rounded-xl border border-slate-700 transition-colors"
          >
            <span>بحث عن طالب آخر</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-6 pt-8 space-y-6">
        {/* Student Profile Card */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full mb-2">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>الطور {student.stage || 'الثانوي'} • {student.grade_level || '3 ثانوي (BAC)'}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-800">{student.first_name} {student.last_name}</h2>
            <p className="text-xs text-slate-500 mt-1">
              رقم الكود: <span className="font-mono font-bold text-slate-700">{student.student_code}</span> • هاتف الولي: <span className="font-mono">{student.parent_phone}</span>
            </p>
          </div>

          <div className="flex gap-4">
            <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl text-center min-w-[110px]">
              <span className="text-[11px] text-slate-500 font-medium">نسبة الحضور</span>
              <div className="text-2xl font-black text-emerald-600 mt-1">89%</div>
              <span className="text-[10px] text-slate-400">8 من 9 حصص</span>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl text-center min-w-[110px]">
              <span className="text-[11px] text-slate-500 font-medium">المعدل العام</span>
              <div className="text-2xl font-black text-blue-600 mt-1">17.2 / 20</div>
              <span className="text-[10px] text-emerald-600 font-semibold">+15% تطور مستمر</span>
            </div>
          </div>
        </div>

        {/* 📚 MULTI-SUBJECT TEACHER REVIEWS SECTION */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-emerald-600" />
              <div>
                <h3 className="font-bold text-slate-800 text-base">تقييم الأساتذة المشرفين حسب كل مادة</h3>
                <p className="text-xs text-slate-500">علامات الاختبارات وملاحظات الأساتذة التربوية الموجهة لولي الأمر</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {enrolledGroups.map((grp) => {
              const grpGrades = studentGrades.filter(g => g.group_id === grp.id || g.subject === grp.subject);
              const latestGrade = grpGrades[0];

              return (
                <div key={grp.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                        {grp.subject.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-800">{grp.subject} ({grp.name})</h4>
                        <span className="text-xs text-slate-500 flex items-center gap-1">
                          <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                          الأستاذ المشرف: <strong>{grp.teacher_name}</strong>
                        </span>
                      </div>
                    </div>

                    {latestGrade && (
                      <div className="text-left sm:text-right">
                        <span className="text-[11px] text-slate-400 block">آخر تقييم</span>
                        <div className="text-lg font-black font-mono text-emerald-700">
                          {latestGrade.score} / {latestGrade.max_score}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Teacher's Feedback */}
                  {latestGrade ? (
                    <div className="p-3 bg-white rounded-xl border border-slate-200/60 space-y-1">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                        <span>عنوان التقييم: {latestGrade.exam_title}</span>
                        <span className="text-slate-400 font-mono">{latestGrade.exam_date}</span>
                      </div>
                      <p className="text-xs text-emerald-900 bg-emerald-50/70 p-2 rounded-lg border border-emerald-100/80 font-medium">
                        🗣️ <strong>ملاحظة الأستاذ {grp.teacher_name}:</strong> « {latestGrade.notes || 'مستوى ممتاز ومواظبة جيدة'} »
                      </p>
                    </div>
                  ) : (
                    <div className="p-3 bg-white rounded-xl text-xs text-slate-400">
                      سيتم إضافة تقييم مادة {grp.subject} من طرف الأستاذ المشرف قريباً.
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 📅 TIMETABLE SECTION */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-slate-800 text-base">جدول التوقيت وبرنامج الحصص الأسبوعي للطالب</h3>
            </div>
            <span className="text-xs font-semibold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full">
              {enrolledGroups.length} مواد مسجل بها
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {enrolledGroups.map((grp) => (
              <div key={grp.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-800">{grp.name}</h4>
                  <span className="text-[11px] font-bold text-emerald-700 bg-white border border-slate-200 px-2.5 py-0.5 rounded-md">
                    {grp.subject}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span><strong>الأيام والتوقيت:</strong> {grp.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <span><strong>المكان:</strong> {grp.room} (المشرف: {grp.teacher_name})</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Status Card */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-sm">حالة الاشتراك المالي لشهر أوت 2026</h4>
              <span className="text-xs text-emerald-600 font-semibold">خالص بالكامل — شكراً لكم</span>
            </div>
          </div>

          <span className="text-xs font-bold bg-emerald-600 text-white px-3 py-1.5 rounded-xl">
            مستوفى
          </span>
        </div>
      </main>
    </div>
  );
}
