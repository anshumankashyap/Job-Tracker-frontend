export interface User {
  id: number;
  username: string;
  email: string;
}

export interface JobApplication {
  id: number;
  company: string;
  role: string;
  job_url?: string;
  status: 'wishlist' | 'applied' | 'interview' | 'offer' | 'rejected';
  applied_date?: string;
  notes?: string;
  resume?: string;
  job_description?: string;
  ai_feedback?: AiFeedback | null;
  created_at: string;
  updated_at: string;
}

export interface AiFeedback {
  match_score: number;
  matched_keywords: string[];
  missing_keywords: string[];
  suggestions: string[];
  overall_summary: string;
}