export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/+$/, '');

export const API_ENDPOINTS = {
  identityLogin: '/Identity/Login',
  identityChangeTemporaryPassword: '/Identity/ChangeTemporaryPassword',
  identityCurrentUser: '/Identity/GetCurrentUser',
  newsActive: '/News/GetAllActive',
  newsSearch: '/News/Search',
  newsCreate: '/News/Create',
  newsUpdate: '/News/Update',
  newsChangeStatus: (id: string, isActive: boolean) =>
    `/News/ChangeStatus?id=${encodeURIComponent(id)}&isActive=${String(isActive)}`,
  newsDelete: (id: string) => `/News/Delete?id=${encodeURIComponent(id)}`,
  projectsActive: '/Projects/GetAllActive',
  projectsSearch: '/Projects/Search',
  projectsCreate: '/Projects/Create',
  projectsUpdate: '/Projects/Update',
  projectsChangeStatus: (id: string, isActive: boolean) =>
    `/Projects/ChangeStatus?id=${encodeURIComponent(id)}&isActive=${String(isActive)}`,
  projectsDelete: (id: string) => `/Projects/Delete?id=${encodeURIComponent(id)}`,
  contact: '/contact-submissions',
  newsletter: '/newsletter',
} as const;
