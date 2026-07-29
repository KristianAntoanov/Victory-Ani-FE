export interface NewsArticle {
  id: string;
  titleBg: string;
  titleEn: string;
  title: string;
  slug: string;
  category: string;
  publishDate: string;
  summaryBg: string;
  summaryEn: string;
  shortDescription: string;
  contentBg: string;
  contentEn: string;
  content: string;
  image: string;
  imageAlt: string;
  author: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NewsArticleInput {
  titleBg: string;
  titleEn: string;
  summaryBg: string;
  summaryEn: string;
  contentBg: string;
  contentEn: string;
  publishDate?: string;
  published: boolean;
  image?: string;
}

export type ProgrammeKey = 'horizon' | 'erasmus' | 'life' | 'cerv';

export interface ProjectStat {
  value: string;
  label: string;
}

export interface Project {
  id: string;
  slug: string;
  titleBg: string;
  titleEn: string;
  title: string;
  programme: ProgrammeKey;
  programmeBg: string;
  programmeEn: string;
  programmeLabel: string;
  themeBg: string;
  themeEn: string;
  theme: string;
  image: string;
  durationBg: string;
  durationEn: string;
  duration: string;
  countriesBg: string;
  countriesEn: string;
  countries: string;
  mainActivitiesBg: string;
  mainActivitiesEn: string;
  mainActivities: string;
  isActive: boolean;
  createdOn?: string | null;
  updatedOn?: string | null;
}

export type ProjectInput = Omit<
  Project,
  'id' | 'slug' | 'title' | 'programme' | 'programmeLabel' | 'theme' | 'duration' | 'countries' | 'mainActivities' | 'createdOn' | 'updatedOn'
>;

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
