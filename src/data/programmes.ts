import { loc, type Lang, type Localized } from '@/i18n';
import type { Programme, ProgrammeKey } from '@/types';

type ProgrammeRecord = Omit<Programme, 'title' | 'tagline' | 'description'> & {
  title: Localized;
  tagline: Localized;
  description: Localized;
};

const programmes: ProgrammeRecord[] = [
  {
    id: 'horizon',
    title: { en: 'Horizon Europe', bg: 'Horizon Europe' },
    tagline: { en: 'Research and innovation', bg: 'Наука и иновации' },
    description: {
      en: 'Funding for ambitious research, technology and innovation partnerships.',
      bg: 'Финансиране за амбициозни партньорства в науката, технологиите и иновациите.',
    },
    icon: 'atom',
    focusAreas: ['Research', 'Innovation', 'Impact'],
  },
  {
    id: 'erasmus',
    title: { en: 'Erasmus+', bg: 'Erasmus+' },
    tagline: { en: 'Education and mobility', bg: 'Образование и мобилност' },
    description: {
      en: 'Support for learning mobility, cooperation and organisational development.',
      bg: 'Подкрепа за учебна мобилност, сътрудничество и организационно развитие.',
    },
    icon: 'graduation-cap',
    focusAreas: ['Mobility', 'Skills', 'Cooperation'],
  },
  {
    id: 'life',
    title: { en: 'LIFE Programme', bg: 'Програма LIFE' },
    tagline: { en: 'Environment and climate', bg: 'Околна среда и климат' },
    description: {
      en: 'Projects for nature protection, climate action and cleaner systems.',
      bg: 'Проекти за защита на природата, климатични действия и по-чисти системи.',
    },
    icon: 'leaf',
    focusAreas: ['Climate', 'Nature', 'Sustainability'],
  },
  {
    id: 'cerv',
    title: { en: 'CERV', bg: 'CERV' },
    tagline: { en: 'Rights and values', bg: 'Права и ценности' },
    description: {
      en: 'Funding for equality, civic participation and democratic values.',
      bg: 'Финансиране за равенство, гражданско участие и демократични ценности.',
    },
    icon: 'users',
    focusAreas: ['Rights', 'Equality', 'Participation'],
  },
];

export function getProgrammes(lang: Lang = 'en'): Programme[] {
  return programmes.map((programme) => ({
    id: programme.id as ProgrammeKey,
    title: loc(programme.title, lang),
    tagline: loc(programme.tagline, lang),
    description: loc(programme.description, lang),
    icon: programme.icon,
    focusAreas: programme.focusAreas,
  }));
}
