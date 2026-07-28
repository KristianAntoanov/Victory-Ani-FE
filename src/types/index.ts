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
  featured: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export type NewsArticleInput = Omit<NewsArticle, 'id' | 'createdAt' | 'updatedAt'>;

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
  programmeLabelBg: string;
  programmeLabelEn: string;
  programmeLabel: string;
  introBg: string;
  introEn: string;
  intro: string;
  shortDescriptionBg: string;
  shortDescriptionEn: string;
  shortDescription: string;
  image: string;
  imageAltBg: string;
  imageAltEn: string;
  imageAlt: string;
  featured: boolean;
  overviewBg: string;
  overviewEn: string;
  overview: string;
  objectivesBg: string[];
  objectivesEn: string[];
  objectives: string[];
  activitiesBg: string[];
  activitiesEn: string[];
  activities: string[];
  resultsBg: string[];
  resultsEn: string[];
  results: string[];
  durationBg: string;
  durationEn: string;
  duration: string;
  countriesBg: string[];
  countriesEn: string[];
  countries: string[];
  partnersBg: string[];
  partnersEn: string[];
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
