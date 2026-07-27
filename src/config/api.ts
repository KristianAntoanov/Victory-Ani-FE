export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/+$/, '');

export const API_ENDPOINTS = {
  identityLogin: '/Identity/Login',
  identityChangeTemporaryPassword: '/Identity/ChangeTemporaryPassword',
  identityTwoFactorSetup: '/Identity/TwoFactorSetup',
  identityEnableTwoFactor: '/Identity/EnableTwoFactor',
  identityLoginWithTwoFactor: '/Identity/LoginWithTwoFactor',
  identityCurrentUser: '/Identity/GetCurrentUser',
  newsActive: '/News/GetAllActive',
  newsSearch: '/News/Search',
  newsCreate: '/News/Create',
  newsUpdate: '/News/Update',
  newsDelete: (id: string) => `/News/Delete?id=${encodeURIComponent(id)}`,
  projectsActive: '/Projects/GetAllActive',
  projectsSearch: '/Projects/Search',
  projectsCreate: '/Projects/Create',
  projectsUpdate: '/Projects/Update',
  projectsDelete: (id: string) => `/Projects/Delete?id=${encodeURIComponent(id)}`,
  contact: '/contact-submissions',
  newsletter: '/newsletter',
} as const;
