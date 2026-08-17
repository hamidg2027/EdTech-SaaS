import Link from 'next/link';
import { School, CheckCircle2, ShieldCheck, Users, TrendingUp, QrCode, ArrowLeft } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-emerald-500 selection:text-white">
      {/* Header */}
      <header className="px-6 lg:px-12 py-5 flex items-center justify-between border-b border-slate-800/80 bg-slate-950/60 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-900/50">
            <School className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-base leading-tight text-white">مدير مراكز الدروس</h1>
            <span className="text-[11px] text-emerald-400 font-medium tracking-wide">Center Manager SaaS</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/parent"
            className="text-xs font-semibold px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 transition-all border border-slate-800"
          >
            بوابة ولي الأمر
          </Link>
          <Link
            href="/dashboard"
            className="text-xs font-bold px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md shadow-emerald-900/40"
          >
            لوحة الإدارة
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-4xl mx-auto px-6 py-12 md:py-20 text-center space-y-8 flex-1 flex flex-col justify-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-800/80 text-emerald-300 text-xs font-semibold mx-auto shadow-inner">
          <span>✨ الحل الذكي الشامل لمراكز الدعم والدروس الخصوصية</span>
        </div>

        {/* Improved Heading with refined typography and line spacing */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white leading-[1.6] md:leading-[1.6] tracking-normal">
          ودّع دفاتر الحضور وجداول Excel.. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200 mt-2 inline-block">
            نظام متكامل لإدارة مركزك في مكان واحد
          </span>
        </h1>

        <p className="text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed md:leading-loose">
          تنظيم الأفواج والأساتذة، تسجيل الحضور بـ QR Code، تتبع الاشتراكات الشهرية، وتقارير تفاعلية فورية مخصصة لكل ولي أمر عبر واتساب.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-3.5 rounded-2xl shadow-lg shadow-emerald-900/50 hover:shadow-emerald-700/50 transition-all text-sm"
          >
            <span>الدخول إلى لوحة التحكم</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <Link
            href="/parent"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-semibold px-8 py-3.5 rounded-2xl transition-all text-sm"
          >
            <span>تجربة متابعة طالب (لأولياء الأمور)</span>
          </Link>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-10 text-right">
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 space-y-2.5 hover:border-slate-700 transition-all">
            <div className="w-11 h-11 rounded-2xl bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center shadow-inner">
              <QrCode className="w-5 h-5" />
            </div>
            <h3 className="text-sm md:text-base font-bold text-white">تسجيل حضور فوري بـ QR</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              بطاقة ذكية لكل طالب برمز QR لتسجيل الحضور بلمح البصر دون إضاعة وقت الحصص.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 space-y-2.5 hover:border-slate-700 transition-all">
            <div className="w-11 h-11 rounded-2xl bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center shadow-inner">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-sm md:text-base font-bold text-white">تقييم حسب المواد والأساتذة</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              رابط مباشر لولي الأمر لمتابعة الدرجات وملاحظات كل أستاذ مشرف وجدول الحصص الأسبوعي.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 space-y-2.5 hover:border-slate-700 transition-all">
            <div className="w-11 h-11 rounded-2xl bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center shadow-inner">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm md:text-base font-bold text-white">تتبع الاشتراكات والمدفوعات</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              كشف تلقائي للمتأخرات المالية ومتابعة دقيقة لمستحقات الأفواج والدفعات الشهرية.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-slate-500 border-t border-slate-900">
        مدير مراكز الدروس الخصوصية © 2026 — منصة سحابية لإدارة مراكز الدعم المدرسي
      </footer>
    </div>
  );
}
