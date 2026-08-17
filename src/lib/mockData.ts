import { Teacher, Group, Student, Grade, Payment } from './types';

export const initialTeachers: Teacher[] = [
  {
    id: 'tch-1',
    full_name: 'أ. عبد الحميد بن علي',
    subject: 'علوم الطبيعة والحياة',
    phone: '0661112233',
    stages: ['ثانوي'],
    email: 'benali.sciences@gmail.com',
    color: 'emerald'
  },
  {
    id: 'tch-2',
    full_name: 'أ. سمير مرواني',
    subject: 'الرياضيات',
    phone: '0550445566',
    stages: ['ثانوي', 'متوسط'],
    email: 'marouani.math@gmail.com',
    color: 'blue'
  },
  {
    id: 'tch-3',
    full_name: 'أ. فريد قاسمي',
    subject: 'العلوم الفيزيائية',
    phone: '0770889900',
    stages: ['متوسط', 'ثانوي'],
    email: 'kassimi.physics@gmail.com',
    color: 'purple'
  },
  {
    id: 'tch-4',
    full_name: 'أ. ليلى عماري',
    subject: 'اللغة الفرنسية',
    phone: '0541223344',
    stages: ['متوسط', 'ابتدائي'],
    email: 'amari.francais@gmail.com',
    color: 'amber'
  }
];

export const initialGroups: Group[] = [
  {
    id: 'grp-1',
    name: 'فوج البكالوريا - علوم طبيعية',
    subject: 'علوم الطبيعة والحياة',
    stage: 'ثانوي',
    grade_level: '3 ثانوي (BAC)',
    monthly_price: 3000,
    teacher_id: 'tch-1',
    teacher_name: 'أ. عبد الحميد بن علي',
    room: 'القاعة 1',
    schedule: 'السبت 14:00 - 16:00 • الثلاثاء 16:00 - 18:00',
    student_count: 3
  },
  {
    id: 'grp-2',
    name: 'فوج البكالوريا - رياضيات',
    subject: 'الرياضيات',
    stage: 'ثانوي',
    grade_level: '3 ثانوي (BAC)',
    monthly_price: 3000,
    teacher_id: 'tch-2',
    teacher_name: 'أ. سمير مرواني',
    room: 'القاعة 2',
    schedule: 'الأحد 16:00 - 18:00 • الأربعاء 16:00 - 18:00',
    student_count: 2
  },
  {
    id: 'grp-3',
    name: 'فوج 4 متوسط - فيزياء',
    subject: 'العلوم الفيزيائية',
    stage: 'متوسط',
    grade_level: '4 متوسط (BEM)',
    monthly_price: 2500,
    teacher_id: 'tch-3',
    teacher_name: 'أ. فريد قاسمي',
    room: 'القاعة 1',
    schedule: 'الجمعة 09:00 - 11:00 • الإثنين 17:00 - 19:00',
    student_count: 2
  },
  {
    id: 'grp-4',
    name: 'فوج 4 متوسط - فرنسية',
    subject: 'اللغة الفرنسية',
    stage: 'متوسط',
    grade_level: '4 متوسط (BEM)',
    monthly_price: 2200,
    teacher_id: 'tch-4',
    teacher_name: 'أ. ليلى عماري',
    room: 'القاعة 3',
    schedule: 'السبت 10:00 - 12:00',
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
    stage: 'ثانوي',
    grade_level: '3 ثانوي (BAC)',
    enrolled_groups: ['grp-1', 'grp-2'],
    notes: 'طالب متميز ومواظب'
  },
  {
    id: 'std-2',
    first_name: 'سارة',
    last_name: 'قاسمي',
    student_code: 'STD-1002',
    parent_phone: '0661987654',
    stage: 'ثانوي',
    grade_level: '3 ثانوي (BAC)',
    enrolled_groups: ['grp-1'],
    notes: 'تحتاج للتركيز في منهجية الإجابة'
  },
  {
    id: 'std-3',
    first_name: 'محمد',
    last_name: 'زياني',
    student_code: 'STD-1003',
    parent_phone: '0770554433',
    stage: 'متوسط',
    grade_level: '4 متوسط (BEM)',
    enrolled_groups: ['grp-3', 'grp-4'],
    notes: 'تحسن مستواه بوضوح'
  },
  {
    id: 'std-4',
    first_name: 'إيمان',
    last_name: 'علوي',
    student_code: 'STD-1004',
    parent_phone: '0541223344',
    stage: 'ثانوي',
    grade_level: '3 ثانوي (BAC)',
    enrolled_groups: ['grp-1', 'grp-2'],
    notes: ''
  },
  {
    id: 'std-5',
    first_name: 'يوسف',
    last_name: 'مهدي',
    student_code: 'STD-1005',
    parent_phone: '0678990011',
    stage: 'متوسط',
    grade_level: '4 متوسط (BEM)',
    enrolled_groups: ['grp-3'],
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
    subject: 'علوم الطبيعة والحياة',
    teacher_name: 'أ. عبد الحميد بن علي',
    exam_title: 'اختبار تقييمي 1 (آلية تركيب البروتين)',
    score: 18.5,
    max_score: 20,
    exam_date: '2026-08-05',
    notes: 'تحليل دقيق ومنهجية ممتازة في الاستدلال العلمي'
  },
  {
    id: 'grd-2',
    student_id: 'std-1',
    student_name: 'أحمد براهيمي',
    group_id: 'grp-2',
    group_name: 'فوج البكالوريا - رياضيات',
    subject: 'الرياضيات',
    teacher_name: 'أ. سمير مرواني',
    exam_title: 'فرض محروس (المتتاليات العددية)',
    score: 16.0,
    max_score: 20,
    exam_date: '2026-08-12',
    notes: 'عمل جيد، يحتاج لتدريب أكثر على البرهان بالتراجع'
  },
  {
    id: 'grd-3',
    student_id: 'std-2',
    student_name: 'سارة قاسمي',
    group_id: 'grp-1',
    group_name: 'فوج البكالوريا - علوم طبيعية',
    subject: 'علوم الطبيعة والحياة',
    teacher_name: 'أ. عبد الحميد بن علي',
    exam_title: 'اختبار تقييمي 1 (آلية تركيب البروتين)',
    score: 19.0,
    max_score: 20,
    exam_date: '2026-08-05',
    notes: 'إجابة كاملة وتنظيم ممتاز'
  },
  {
    id: 'grd-4',
    student_id: 'std-3',
    student_name: 'محمد زياني',
    group_id: 'grp-3',
    group_name: 'فوج 4 متوسط - فيزياء',
    subject: 'العلوم الفيزيائية',
    teacher_name: 'أ. فريد قاسمي',
    exam_title: 'تقييم مرحلي (الظواهر الكهربائية)',
    score: 14.5,
    max_score: 20,
    exam_date: '2026-08-10',
    notes: 'تطور ملحوظ وفهم جيد للقوانين'
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
