import { loc, locList, type Lang, type Localized, type LocalizedList } from '@/i18n';
import type { ServiceItem } from '@/types';

type ServiceRecord = Omit<ServiceItem, 'title' | 'description' | 'tags'> & {
  title: Localized;
  description: Localized;
  tags: LocalizedList;
};

const homeServices: ServiceRecord[] = [
  {
    id: 'proposal-development',
    title: { en: 'Proposal development', bg: 'Разработване на проектни предложения' },
    description: {
      en: 'We shape project ideas into clear objectives, work plans, budgets and impact narratives.',
      bg: 'Оформяме проектни идеи в ясни цели, работни планове, бюджети и аргументи за въздействие.',
    },
    icon: 'pen-line',
    tags: { en: ['Concept', 'Writing', 'Submission'], bg: ['Концепция', 'Писане', 'Подаване'] },
  },
  {
    id: 'proposal-review',
    title: { en: 'Proposal review', bg: 'Преглед на предложения' },
    description: {
      en: 'We assess draft applications against call logic, evaluator expectations and eligibility rules.',
      bg: 'Оценяваме проектни предложения спрямо логиката на поканата, очакванията на оценителите и правилата.',
    },
    icon: 'file-search',
    tags: { en: ['Review', 'Compliance', 'Advice'], bg: ['Преглед', 'Съответствие', 'Насоки'] },
  },
  {
    id: 'project-management',
    title: { en: 'Project management', bg: 'Управление на проекти' },
    description: {
      en: 'We support approved projects with coordination, documentation, reporting and quality control.',
      bg: 'Подкрепяме одобрени проекти с координация, документация, отчитане и контрол на качеството.',
    },
    icon: 'users',
    tags: { en: ['Delivery', 'Reporting', 'Quality'], bg: ['Изпълнение', 'Отчитане', 'Качество'] },
  },
];

export function getHomeServiceCards(lang: Lang = 'en'): ServiceItem[] {
  return homeServices.map((service) => ({
    id: service.id,
    title: loc(service.title, lang),
    description: loc(service.description, lang),
    icon: service.icon,
    tags: locList(service.tags, lang),
  }));
}
