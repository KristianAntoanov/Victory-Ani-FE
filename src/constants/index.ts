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
  { labelKey: 'nav.home', path: ROUTES.home },
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
  tagline: 'Turning bold ideas into European progress.',
} as const;

export const SOCIAL = {
  linkedin: 'https://www.linkedin.com/company/v-a-projects/?viewAsMember=true',
  twitter: 'https://twitter.com/',
  youtube: 'https://www.youtube.com/',
} as const;

export const STORAGE_KEYS = {
  adminSession: 'va_admin_session',
} as const;

export const NEWS_CATEGORIES = [
  'Horizon Europe',
  'Erasmus+',
  'LIFE',
  'CERV',
  'Insights',
  'Announcements',
] as const;

export const ASSETS = {
  logoOriginal: '/assets/logo-original.png',
  heroArchitecture: '/assets/hero-architecture.png',
  servicesHero: '/assets/services-hero.png',
  programmesHero: '/assets/programmes-hero.png',
  projectsHero: '/assets/projects-hero.png',
  newsHero: '/assets/news-hero.png',
  aboutHero: '/assets/about-european-mission.png',
} as const;
