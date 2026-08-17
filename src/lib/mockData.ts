import { Group, Student, Grade, Payment, AttendanceRecord } from './types';

export const initialGroups: Group[] = [
  {
    id: 'grp-1',
    name: 'فوج البكالوريا - علوم طبيعية',
    subject: 'علوم الطبيعة والحياة',
    grade_level: '3 ثانوي',
    monthly_price: 3000,
    teacher_name: 'أ. بن علي',
    room: 'القاعة 1',
    schedule: 'السبت 14:00 - 16:00 • الثلاثاء 16:00 - 18:00',
    student_count: 3
  },
  {
    id: 'grp-2',
    name: 'فوج البكالوريا - رياضيات',
    subject: 'رياضيات',
    grade_level: '3 ثانوي',
    monthly_price: 3000,
    teacher_name: 'أ. مرواني',
    room: 'القاعة 2',
    schedule: 'الأحد 16:00 - 18:00 • الأربعاء 16:00 - 18:00',
    student_count: 2
  },
  {
    id: 'grp-3',
    name: 'فوج 4 متوسط - فيزياء',
    subject: 'علوم فيزيائية',
    grade_level: '4 متوسط (BEM)',
    monthly_price: 2500,
    teacher_name: 'أ. قاسمي',
    room: 'القاعة 1',
    schedule: 'الجمعة 09:00 - 11:00 • الإثنين 17:00 - 19:00',
    student_count: 2
  }
];

export const initialStudents: Student[] = [
  {
    id: 'std-1',
    first_name: 'أحمد',
    last_name: 'براهيمي',
    student_code: 'STD-1001',
    parent_phone: '0550123456',
    enrolled_groups: ['grp-1', 'grp-2'],
    notes: 'طالب ممتاز ومواظب'
  },
  {
    id: 'std-2',
    first_name: 'سارة',
    last_name: 'قاسمي',
    student_code: 'STD-1002',
    parent_phone: '0661987654',
    enrolled_groups: ['grp-1'],
    notes: 'تحتاج تركيز في المنهجية'
  },
  {
    id: 'std-3',
    first_name: 'محمد',
    last_name: 'زياني',
    student_code: 'STD-1003',
    parent_phone: '0770554433',
    enrolled_groups: ['grp-3'],
    notes: ''
  },
  {
    id: 'std-4',
    first_name: 'إيمان',
    last_name: 'علوي',
    student_code: 'STD-1004',
    parent_phone: '0541223344',
    enrolled_groups: ['grp-1', 'grp-3'],
    notes: ''
  },
  {
    id: 'std-5',
    first_name: 'يوسف',
    last_name: 'مهدي',
    student_code: 'STD-1005',
    parent_phone: '0678990011',
    enrolled_groups: ['grp-2'],
    notes: ''
  }
];

export const initialGrades: Grade[] = [
  {
    id: 'grd-1',
    student_id: 'std-1',
    student_name: 'أحمد براهيمي',
    group_id: 'grp-1',
    group_name: 'فوج البكالوريا - علوم طبيعية',
    exam_title: 'اختبار تقييمي 1 (تركيب البروتين)',
    score: 18.5,
    max_score: 20,
    exam_date: '2026-08-05',
    notes: 'إجابة نموذجية وتحليل دقيق'
  },
  {
    id: 'grd-2',
    student_id: 'std-2',
    student_name: 'سارة قاسمي',
    group_id: 'grp-1',
    group_name: 'فوج البكالوريا - علوم طبيعية',
    exam_title: 'اختبار تقييمي 1 (تركيب البروتين)',
    score: 19,
    max_score: 20,
    exam_date: '2026-08-05',
    notes: 'ممتازة جداً'
  },
  {
    id: 'grd-3',
    student_id: 'std-3',
    student_name: 'محمد زياني',
    group_id: 'grp-3',
    group_name: 'فوج 4 متوسط - فيزياء',
    exam_title: 'فرض تجريبي (الظواهر الكهربائية)',
    score: 14,
    max_score: 20,
    exam_date: '2026-08-10',
    notes: 'تحسن ملحوظ عن الفرض السابق'
  }
];

export const initialPayments: Payment[] = [
  {
    id: 'pay-1',
    student_id: 'std-1',
    student_name: 'أحمد براهيمي',
    group_id: 'grp-1',
    group_name: 'فوج البكالوريا - علوم طبيعية',
    amount: 3000,
    payment_date: '2026-08-02',
    month: 'أوت 2026',
    status: 'paid',
    notes: 'وصل رقم #104'
  },
  {
    id: 'pay-2',
    student_id: 'std-2',
    student_name: 'سارة قاسمي',
    group_id: 'grp-1',
    group_name: 'فوج البكالوريا - علوم طبيعية',
    amount: 3000,
    payment_date: '2026-08-05',
    month: 'أوت 2026',
    status: 'paid',
    notes: 'نقداً'
  },
  {
    id: 'pay-3',
    student_id: 'std-3',
    student_name: 'محمد زياني',
    group_id: 'grp-3',
    group_name: 'فوج 4 متوسط - فيزياء',
    amount: 2500,
    payment_date: '-',
    month: 'أوت 2026',
    status: 'pending',
    notes: 'مستحق الدفع'
  }
];
