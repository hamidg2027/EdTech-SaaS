export interface Student {
  id: string;
  first_name: string;
  last_name: string;
  student_code: string;
  parent_phone: string;
  created_at?: string;
}

export interface Group {
  id: string;
  name: string;
  subject: string;
  grade_level: string;
  monthly_price: number;
  created_at?: string;
  student_count?: number;
}

export interface Session {
  id: string;
  group_id: string;
  session_date: string;
  title: string;
  created_at?: string;
}

export interface AttendanceRecord {
  id?: string;
  session_id: string;
  student_id: string;
  status: 'present' | 'absent' | 'late' | 'excused';
}

export interface Payment {
  id: string;
  student_id: string;
  group_id: string;
  amount: number;
  payment_date: string;
  period_month: number;
  period_year: number;
  notes?: string;
  student?: Student;
  group?: Group;
}

export interface Grade {
  id: string;
  student_id: string;
  group_id: string;
  exam_title: string;
  score: number;
  max_score: number;
  exam_date: string;
  notes?: string;
}
