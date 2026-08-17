# نظام إدارة مراكز الدروس الخصوصية (Center Manager SaaS)

تطبيق ويب مجاني متكامل لإدارة مراكز الدعم المدرسي، المجموعات، الحضور بـ QR Code، المدفوعات، وبوابة متابعة أولياء الأمور.

## 🚀 التقنيات المستخدمة (مجانية 100%):
- **Next.js 14 (App Router & TypeScript)**
- **Tailwind CSS & Lucide Icons**
- **Supabase** (قاعدة بيانات PostgreSQL + مصادقة)
- **Vercel** (استضافة مجانية)

---

## 🛠️ خطوات التشغيل محلياً:

1. **فك ضغط المجلد وفتح المشروع في Terminal:**
   ```bash
   cd center-manager
   ```

2. **تثبيت الحزم والمكتبات:**
   ```bash
   npm install
   ```

3. **إعداد قاعدة بيانات Supabase:**
   - افتح مشروعك في [Supabase](https://supabase.com).
   - اذهب إلى **SQL Editor** ونفّذ الكود الموجود في ملف `supabase_schema.sql`.

4. **إعداد المتغيرات البيئية:**
   - انسخ ملف `.env.example` إلى `.env.local`:
     ```bash
     cp .env.example .env.local
     ```
   - ضع فيه رابط مشروع Supabase ومفتاح `anon key`.

5. **تشغيل الخادم المحلي:**
   ```bash
   npm run dev
   ```
   افتح المتصفح على: `http://localhost:3000`

---

## 📦 النشر على GitHub و Vercel:

1. **الرفع على GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Center Manager SaaS"
   git branch -M main
   git remote add origin https://github.com/your-username/center-manager.git
   git push -u origin main
   ```

2. **الربط مع Vercel:**
   - سجل في [Vercel](https://vercel.com) بحساب GitHub.
   - اختر المستودع واضغط **Import**.
   - أضف المتغيرات `NEXT_PUBLIC_SUPABASE_URL` و `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
   - اضغط **Deploy**.
