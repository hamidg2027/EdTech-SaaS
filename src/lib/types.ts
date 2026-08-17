export interface Group {
  id: string;
  name: string;
  subject: string;
  grade_level: string;
  monthly_price: number;
  teacher_name?: string;
  room?: string;
  schedule?: string; // e.g. "السبت 14:00 - 16:00، الثلاثاء 16:00 - 18:00"
  student_count?: number;
  created_at?: string;
}

export interface Student {
  id: string;
  first_name: string;
  last_name: string;
  student_code: string;
  parent_phone: string;
  enrolled_groups?: string[]; // array of group IDs
  notes?: string;
  created_at?: string;
}

export interface AttendanceRecord {
  id: string;
  session_date: string;
  group_id: string;
  student_id: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  topic?: string;
}

export interface Grade {
  id: string;
  student_id: string;
  student_name: string;
  group_id: string;
  group_name: string;
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
