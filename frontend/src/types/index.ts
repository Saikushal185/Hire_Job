/**
 * Common TypeScript utility types for HireMind
 */

// API Response wrapper
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

// Job types
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salary_min?: number;
  salary_max?: number;
  job_type: 'full-time' | 'part-time' | 'contract' | 'internship';
  posted_date: string;
  apply_url: string;
  skills: string[];
}

// User profile
export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  resume_url?: string;
  created_at: string;
  updated_at: string;
}

// Resume score
export interface ResumeScore {
  id: string;
  resume_name: string;
  total_score: number;
  breakdown: ScoreBreakdown;
  feedback: string[];
  created_at: string;
}

export interface ScoreBreakdown {
  contactInfo: number;
  education: number;
  experience: number;
  skills: number;
  summary: number;
}

// Company types
export interface Company {
  id: string;
  name: string;
  logo_url?: string;
  website?: string;
  industry?: string;
  size?: string;
  description?: string;
}

// Applied job tracking
export interface AppliedJob {
  id: string;
  job_id: string;
  user_id: string;
  status: 'applied' | 'interview' | 'offer' | 'rejected';
  applied_date: string;
  notes?: string;
}

// Pagination
export interface PaginationParams {
  page: number;
  limit: number;
  total: number;
}

// Generic nullable type
export type Nullable<T> = T | null;
