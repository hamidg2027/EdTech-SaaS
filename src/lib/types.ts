export interface Teacher {
  id: string;
  full_name: string;
  subject: string;
  phone: string;
  stages?: ('ثانوي' | 'متوسط' | 'ابتدائي')[];
  email?: string;
  color?: string;
  created_at?: string;
}

export interface Group {
  id: string;
  name: string;
  subject: string;
  stage?: 'ثانوي' | 'متوسط' | 'ابتدائي' | string;
  grade_level: string;
  monthly_price: number;
  teacher_id?: string;
  teacher_name?: string;
  room?: string;
  schedule?: string;
  student_count?: number;
  created_at?: string;
}

export interface Student {
  id: string;
  first_name: string;
  last_name: string;
  student_code: string;
  parent_phone: string;
  stage?: 'ثانوي' | 'متوسط' | 'ابتدائي' | string;
  grade_level?: string;
  enrolled_groups?: string[];
  notes?: string;
  created_at?: string;
}

export interface AttendanceRecord {
  id?: string;
  session_date?: string;
  group_id?: string;
  student_id?: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  topic?: string;
}

export interface Grade {
  id: string;
  student_id: string;
  student_name: string;
  group_id: string;
  group_name: string;
  subject: string;
  teacher_name: string;
  exam_title: string;
  score: number;
  max_score: number;
  exam_date: string;
  notes?: string;
}

export interface Payment {
  id: string;
  student_id: string;
  student_name: string;
  group_id: string;
  group_name: string;
  amount: number;
  payment_date: string;
  month: string;
  status: 'paid' | 'pending';
  notes?: string;
}
