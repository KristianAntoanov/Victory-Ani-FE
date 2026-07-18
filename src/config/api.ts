export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/+$/, '');

export const API_ENDPOINTS = {
  authLogin: '/api/auth/login',
  news: '/api/news',
  newsItem: (id: string) => `/api/news/${encodeURIComponent(id)}`,
  projects: '/api/projects',
  projectItem: (id: string) => `/api/projects/${encodeURIComponent(id)}`,
  contact: '/api/contact-submissions',
  newsletter: '/api/newsletter',
} as const;
