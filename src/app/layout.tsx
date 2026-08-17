import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "مدير مراكز الدروس الخصوصية | Center Manager",
  description: "نظام متكامل لإدارة مراكز الدعم المدرسي، الطلاب، الحضور، المدفوعات، ومتابعة أولياء الأمور",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
