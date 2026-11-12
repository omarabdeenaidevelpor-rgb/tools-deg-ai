export interface User {
  id: string;
  username: string;
  email?: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  studio: string;
  status: 'draft' | 'in_progress' | 'completed' | 'archived';
  created_at: string;
  updated_at: string;
  data: any;
}

export interface DashboardStats {
  total_projects: number;
  completed: number;
  in_progress: number;
  drafts: number;
  exported_files: number;
  storage_used: number;
  storage_total: number;
}

export interface Activity {
  id: string;
  action: string;
  project_name?: string;
  studio?: string;
  created_at: string;
}

export interface AIProvider {
  id: string;
  name: string;
  endpoint?: string;
  model?: string;
  is_active: boolean;
  is_default: boolean;
}

export interface MediaAsset {
  id: string;
  filename: string;
  url: string;
  type: string;
  size: number;
  project_id?: string;
  created_at: string;
}

export interface DigitalProduct {
  id: string;
  name: string;
  description?: string;
  category: string;
  cover_image?: string;
  price?: number;
  status: 'draft' | 'review' | 'ready' | 'published' | 'archived';
  files?: string[];
  tags?: string[];
  created_at: string;
  updated_at: string;
}

export interface AutomationWorkflow {
  id: string;
  name: string;
  description?: string;
  steps: any[];
  schedule?: string;
  is_active: boolean;
  last_run?: string;
  created_at: string;
}

export interface BrandProject {
  id: string;
  project_id: string;
  business_name: string;
  industry: string;
  description?: string;
  target_audience?: string;
  country?: string;
  language: string;
  brand_personality?: string;
  preferred_colors?: string[];
  design_style?: string;
  logo_concepts?: any[];
  color_palette?: {
    primary: string[];
    secondary: string[];
  };
  typography?: {
    primary: string;
    secondary: string;
  };
  stationery?: any[];
}

export interface CVProject {
  id: string;
  project_id: string;
  personal_info: {
    name: string;
    email: string;
    phone: string;
    location: string;
    website?: string;
    linkedin?: string;
  };
  summary: string;
  experience: any[];
  education: any[];
  skills: string[];
  certifications?: any[];
  languages?: string[];
  projects?: any[];
  template: string;
}

export interface WebsiteProject {
  id: string;
  project_id: string;
  category: string;
  business_name: string;
  description: string;
  pages: any[];
  design_style: string;
  color_palette: string[];
  content: any;
}

export interface EbookProject {
  id: string;
  project_id: string;
  title: string;
  subtitle?: string;
  language: string;
  category: string;
  target_audience: string;
  style: string;
  length: number;
  outline: any[];
  chapters: any[];
  cover_image?: string;
}

export interface CourseProject {
  id: string;
  project_id: string;
  name: string;
  description: string;
  target_audience: string;
  objectives: string[];
  level: string;
  duration: string;
  modules: any[];
  lessons: any[];
  quizzes?: any[];
}

export interface TemplateProject {
  id: string;
  project_id: string;
  category: string;
  name: string;
  description?: string;
  content: any;
  fields: any[];
}

export interface MarketingCampaign {
  id: string;
  project_id: string;
  name: string;
  objective: string;
  target_audience: string;
  message: string;
  concept: string;
  content: any[];
  channels: string[];
  cta: string;
}