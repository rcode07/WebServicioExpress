export interface EnrollmentStep {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'pending';
  date?: string;
}