import Link from 'next/link';
import { School, CheckCircle2, ShieldCheck, Users, TrendingUp, QrCode, ArrowLeft } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between">
      {/* Header */}
      <header className="px-6 lg:px-12 py-6 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-900/50">
            <School className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">مدير مراكز الدروس</h1>
            <span className="text-xs text-emerald-400 font-medium">Center Manager SaaS</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/parent"
            className="text-xs font-semibold px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all border border-slate-700"
          >
            بوابة ولي الأمر
          </Link>
          <Link
            href="/dashboard"
            className="text-xs font-semibold px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md shadow-emerald-900/40"
          >
            لوحة الإدارة
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-5xl mx-auto px-6 py-16 text-center space-y-8 flex-1 flex flex-col justify-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-semibold mx-auto">
          <span>✨ الحل الذكي لمراكز الدعم والدروس الخصوصية</span>
        </div>

        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
          ودّع دفاتر الحضور وجداول Excel.. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
            نظام متكامل لإدارة مركزك في مكان واحد
          </span>
        </h1>

        <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          إدارة الأفواج والطلاب، تسجيل الحضور في ثوانٍ عبر QR Code، تتبع الاشتراكات والدفعات الشهرية، وتقارير تفاعلية فورية لأولياء الأمور.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-emerald-900/50 transition-all text-sm"
          >
            <span>الدخول إلى لوحة التحكم</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <Link
            href="/parent"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold px-8 py-3.5 rounded-xl transition-all text-sm"
          >
            <span>تجربة متابعة طالب (لأولياء الأمور)</span>
          </Link>
        </div>

        {/* Features Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 text-right">
          <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center">
              <QrCode className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">تسجيل حضور فوري بـ QR</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              بطاقة ذكية لكل طالب برمز QR لمسح الحضور بلمح البصر دون تضييع وقت الحصة.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">شفافية مع ولي الأمر</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              رابط مباشر لولي الأمر لمتابعة نسبة الحضور، تطور الدرجات، وحالة الاشتراك المالي.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">تتبع الاشتراكات والديون</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              كشف تلقائي للمتأخرات المالية وتنبيهات مستحقات الحصص الشهرية للأفواج.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-slate-500 border-t border-slate-800">
        مدير مراكز الدروس الخصوصية © 2026 — مبني باستخدام Next.js و Supabase
      </footer>
    </div>
  );
}
