export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/+$/, '');

export const API_ENDPOINTS = {
  identityLogin: '/api/Identity/Login',
  identityChangeTemporaryPassword: '/api/Identity/ChangeTemporaryPassword',
  identityTwoFactorSetup: '/api/Identity/TwoFactorSetup',
  identityEnableTwoFactor: '/api/Identity/EnableTwoFactor',
  identityLoginWithTwoFactor: '/api/Identity/LoginWithTwoFactor',
  identityCurrentUser: '/api/Identity/GetCurrentUser',
  newsActive: '/api/News/GetAllActive',
  newsSearch: '/api/News/Search',
  newsCreate: '/api/News/Create',
  newsUpdate: '/api/News/Update',
  newsDelete: (id: string) => `/api/News/Delete?id=${encodeURIComponent(id)}`,
  projectsActive: '/api/Projects/GetAllActive',
  projectsSearch: '/api/Projects/Search',
  projectsCreate: '/api/Projects/Create',
  projectsUpdate: '/api/Projects/Update',
  projectsDelete: (id: string) => `/api/Projects/Delete?id=${encodeURIComponent(id)}`,
  contact: '/api/contact-submissions',
  newsletter: '/api/newsletter',
} as const;
