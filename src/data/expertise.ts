import {
  Anchor,
  BookOpenCheck,
  BrainCircuit,
  HeartPulse,
  Scale,
  Sprout,
  type LucideIcon,
} from 'lucide-react';
import type { Localized } from '@/i18n';

export interface ExpertiseArea {
  title: Localized;
  text: Localized;
  icon: LucideIcon;
}

export const expertiseAreas: ExpertiseArea[] = [
  {
    title: {
      en: 'Social sciences, human rights & international law',
      bg: 'Социални науки, права на човека и международно право',
    },
    text: {
      en: 'Social sciences, human rights protection, equality, inclusion, democratic participation, international law and rights-based policy development.',
      bg: 'Социални науки, защита на правата на човека, равенство и социално приобщаване, демократично участие, международно право и политики в областта на интеграцията.',
    },
    icon: Scale,
  },
  {
    title: { en: 'Maritime & blue economy', bg: 'Морско дело и синя икономика' },
    text: {
      en: 'Maritime education, nautical science, marine innovation, blue growth, safety at sea, maritime sustainability and projects linked to the future of the maritime sector.',
      bg: 'Морско дело, морски технологии и иновации, безопасност на корабоплаването, устойчиво използване на морските ресурси и развитие на синята икономика.',
    },
    icon: Anchor,
  },
  {
    title: {
      en: 'Engineering, AI & digital technologies',
      bg: 'Изкуствен интелект и цифрови технологии',
    },
    text: {
      en: 'Computer science, artificial intelligence, programming, digital systems, smart solutions and technology-driven innovation.',
      bg: 'Компютърни науки, програмиране, цифрови системи, интелигентни технологични решения и иновации.',
    },
    icon: BrainCircuit,
  },
  {
    title: {
      en: 'Agronomy, environment & sustainable development',
      bg: 'Агрономия, околна среда и устойчиво развитие',
    },
    text: {
      en: 'Agronomy, agriculture, biodiversity, natural resources, environmental protection, sustainability and green transition initiatives.',
      bg: 'Земеделие, биоразнообразие, управление на природните ресурси, опазване на околната среда, устойчиво развитие и инициативи за зелен преход.',
    },
    icon: Sprout,
  },
  {
    title: { en: 'Education, entrepreneurship & innovation', bg: 'Образование, предприемачество и иновации' },
    text: {
      en: 'Education and vocational training, entrepreneurship and business growth, professional skills development, organisational development and the implementation of innovative approaches and solutions.',
      bg: 'Развитие на образованието и професионалното обучение, насърчаване на предприемачеството и бизнес растежа, усъвършенстване на професионалните умения, организационно развитие и внедряване на иновативни подходи и решения.',
    },
    icon: BookOpenCheck,
  },
  {
    title: { en: 'Health & medicine', bg: 'Медицина и здравеопазване' },
    text: {
      en: 'Medical research, public health and well-being, and the development of research-based solutions to improve quality of life and promote healthier communities.',
      bg: 'Медицина, обществено здраве, превенция на заболяванията, подобряване на качеството на живот и разработване на научно обосновани решения за по-здраво общество.',
    },
    icon: HeartPulse,
  },
];
