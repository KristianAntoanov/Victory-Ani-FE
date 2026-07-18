export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  category: string;
  publishDate: string;
  shortDescription: string;
  content: string;
  image: string;
  imageAlt: string;
  author: string;
  featured: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export type NewsArticleInput = Omit<
  NewsArticle,
  'id' | 'createdAt' | 'updatedAt'
>;

export type ProgrammeKey = 'horizon' | 'erasmus' | 'life' | 'cerv';

export interface ProjectStat {
  value: string;
  label: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  programme: ProgrammeKey;
  programmeLabel: string;
  intro: string;
  shortDescription: string;
  image: string;
  imageAlt: string;
  featured: boolean;
  overview: string;
  objectives: string[];
  activities: string[];
  results: string[];
  duration: string;
  countries: string[];
  partners: string[];
}

export type ProjectInput = Omit<Project, 'id'>;

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  description: string;
  image: string;
  imageAlt: string;
  linkedin: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  tags: string[];
}

export interface Programme {
  id: ProgrammeKey;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  focusAreas: string[];
}

export interface Organisation {
  id: string;
  name: string;
  abbr: string;
}

export interface StatItem {
  value: string;
  label: string;
  icon: string;
}

export interface ContactSubmission {
  id: string;
  fullName: string;
  email: string;
  organisation: string;
  phone: string;
  service: string;
  message: string;
  createdAt: string;
}

export type ContactSubmissionInput = Omit<ContactSubmission, 'id' | 'createdAt'>;

export interface AdminSession {
  email: string;
  token?: string;
  loggedInAt: string;
}
