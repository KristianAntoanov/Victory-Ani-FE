export const ROUTES = {
  home: '/',
  about: '/about',
  team: '/team',
  projects: '/projects',
  projectDetails: (slug: string) => `/projects/${slug}`,
  news: '/news',
  newsDetails: (slug: string) => `/news/${slug}`,
  services: '/services',
  programmes: '/programmes',
  contact: '/contact',
  privacyPolicy: '/privacy-policy',
  termsConditions: '/terms-and-conditions',
  admin: {
    login: '/admin/login',
    dashboard: '/admin',
    news: '/admin/news',
    newsCreate: '/admin/news/create',
    newsEdit: (id: string) => `/admin/news/${id}/edit`,
    projects: '/admin/projects',
    projectsCreate: '/admin/projects/create',
    projectsEdit: (id: string) => `/admin/projects/${id}/edit`,
  },
} as const;

export interface NavItem {
  labelKey: string;
  path: string;
}

export const NAV_ITEMS: NavItem[] = [
  { labelKey: 'nav.about', path: ROUTES.about },
  { labelKey: 'nav.services', path: ROUTES.services },
  { labelKey: 'nav.programmes', path: ROUTES.programmes },
  { labelKey: 'nav.projects', path: ROUTES.projects },
  { labelKey: 'nav.news', path: ROUTES.news },
];

export const CONTACT = {
  email: 'info@va-projects.eu',
  phone: '+359 888 934 068',
  phoneHref: 'tel:+359888934068',
} as const;

export const SITE_URL = 'https://va-projects.eu';

export const SOCIAL = {
  linkedin: 'https://www.linkedin.com/company/v-a-projects/?viewAsMember=true',
  facebook: 'https://www.facebook.com/people/VA-projects/61580956823568/',
  instagram: 'https://www.instagram.com/va_projects.eu',
} as const;

export const STORAGE_KEYS = {
  adminSession: 'va_admin_session',
} as const;

export const ASSETS = {
  logoOriginal: '/assets/logo-original.webp',
  heroArchitecture: '/assets/hero-architecture.webp',
  servicesHero: '/assets/services-hero.webp',
  programmesHero: '/assets/programmes-hero.webp',
  projectsHero: '/assets/projects-hero.webp',
  newsHero: '/assets/news-hero.webp',
} as const;
