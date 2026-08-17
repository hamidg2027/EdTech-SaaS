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
  BookOpen
} from 'lucide-react';
import { initialStudents, initialGroups } from '@/lib/mockData';

export default function StudentParentReportPage({
  params,
}: {
  params: { studentCode: string };
}) {
  const code = params.studentCode.toUpperCase();
  const student = initialStudents.find(s => s.student_code.toUpperCase() === code) || initialStudents[0];
  const enrolledGroups = initialGroups.filter(g => (student.enrolled_groups || []).includes(g.id));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16">
      {/* Top Header */}
      <header className="bg-slate-900 text-white px-6 py-6 border-b border-slate-800">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-900/50">
              <School className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-base">تقرير متابعة الطالب</h1>
              <span className="text-xs text-emerald-400">مركز النجاح للدروس الخصوصية</span>
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

      {/* Content Container */}
      <main className="max-w-4xl mx-auto px-6 pt-8 space-y-6">
        {/* Student Profile Card */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full mb-2">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>طالب نشط ومسجل بالمركز</span>
            </div>
            <h2 className="text-2xl font-black text-slate-800">{student.first_name} {student.last_name}</h2>
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
              <span className="text-[11px] text-slate-500 font-medium">معدل الاختبارات</span>
              <div className="text-2xl font-black text-blue-600 mt-1">18.5 / 20</div>
              <span className="text-[10px] text-emerald-600 font-semibold">+15% تطور</span>
            </div>
          </div>
        </div>

        {/* 📅 WEEKLY TIMETABLE SECTION FOR PARENT */}
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
            {enrolledGroups.length > 0 ? (
              enrolledGroups.map((grp) => (
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
                      <span><strong>أيام وتوقيت الحصص:</strong> {grp.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                      <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <span><strong>المكان:</strong> {grp.room} (المشرف: {grp.teacher_name})</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 p-6 text-center text-xs text-slate-400">
                لا توجد حصص مبرمجة حالياً.
              </div>
            )}
          </div>
        </div>

        {/* Attendance History */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-slate-800 text-base">سجل الحضور والغياب الأخير</h3>
            </div>
            <span className="text-xs text-slate-400">محدث لحظياً</span>
          </div>

          <div className="space-y-2">
            {[
              { date: '15 أوت 2026', topic: 'الانقسام الخيطي المتساوي وتطبيقاته', status: 'حاضر', ok: true },
              { date: '12 أوت 2026', topic: 'آلية تركيب البروتين - مرحلة الترجمة', status: 'حاضر', ok: true },
              { date: '08 أوت 2026', topic: 'بنية الـ ARN الرسول والاستنساخ', status: 'غائب (بعذر)', ok: false },
              { date: '05 أوت 2026', topic: 'مدخل عام للوحدة الأولى', status: 'حاضر', ok: true },
            ].map((sess, idx) => (
              <div key={idx} className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                <div>
                  <span className="font-bold text-slate-800 block text-sm">{sess.topic}</span>
                  <span className="text-slate-400">{sess.date}</span>
                </div>
                <div>
                  {sess.ok ? (
                    <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-md">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {sess.status}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 font-bold text-rose-700 bg-rose-100 px-2.5 py-1 rounded-md">
                      <XCircle className="w-3.5 h-3.5" />
                      {sess.status}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Results & Progress */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-slate-800 text-base">نتائج الاختبارات وملاحظات الأساتذة</h3>
            </div>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
              تطور إيجابي مستمر 📈
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
              <span className="text-xs text-slate-500">الاختبار التقييمي الأول (01 أوت)</span>
              <div className="text-xl font-bold font-mono text-slate-700">14.0 / 20</div>
              <p className="text-[11px] text-slate-500">ملاحظة الأستاذ: استيعاب جيد مع الحاجة للتركيز على المنهجية</p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/60 space-y-1.5">
              <span className="text-xs text-emerald-700 font-medium">الاختبار التقييمي الثاني (15 أوت)</span>
              <div className="text-xl font-black font-mono text-emerald-700">18.5 / 20</div>
              <p className="text-[11px] text-emerald-800 font-medium">ملاحظة الأستاذ: تحسن ممتاز جداً في الإجابة والتحليل</p>
            </div>
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
