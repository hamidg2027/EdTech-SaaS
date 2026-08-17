'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { School, Search, ArrowLeft, ShieldCheck, QrCode } from 'lucide-react';
import Link from 'next/link';

export default function ParentLookupPage() {
  const [code, setCode] = useState('');
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (code.trim()) {
      router.push(`/parent/${code.trim()}`);
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between">
      <header className="px-6 lg:px-12 py-6 flex items-center justify-between border-b border-slate-800">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-900/50">
            <School className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-base leading-tight">بوابة أولياء الأمور</h1>
            <span className="text-xs text-emerald-400 font-medium">متابعة أداء الطالب</span>
          </div>
        </Link>
        <Link href="/dashboard" className="text-xs text-slate-400 hover:text-slate-200">
          دخول الإدارة
        </Link>
      </header>

      <main className="max-w-md mx-auto w-full px-6 py-12 flex-1 flex flex-col justify-center">
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-8 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-emerald-950 border border-emerald-700 text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
            <QrCode className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">متابعة الطالب</h2>
            <p className="text-xs text-slate-400 mt-1">
              أدخل كود الطالب الموجود على بطاقة المركز لعرض تقرير الحضور والدرجات
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                required
                placeholder="أدخل كود الطالب (مثال: STD-1001)"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full text-center font-mono text-base tracking-wider uppercase p-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-emerald-900/40 text-sm"
            >
              <span>عرض التقرير</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-slate-700/60 text-xs text-slate-400">
            أو جرب أحد الأكواد التجريبية: <br />
            <button onClick={() => router.push('/parent/STD-1001')} className="font-mono text-emerald-400 hover:underline mx-1">STD-1001</button>
            •
            <button onClick={() => router.push('/parent/STD-1002')} className="font-mono text-emerald-400 hover:underline mx-1">STD-1002</button>
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-xs text-slate-500 border-t border-slate-800">
        بوابة أولياء الأمور © 2026
      </footer>
    </div>
  );
}
