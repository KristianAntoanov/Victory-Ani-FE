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
      en: 'Social Sciences, Human Rights & International Law',
      bg: 'Социални науки, човешки права и международно право',
    },
    text: {
      en: 'Social sciences, human rights protection, equality, inclusion, democratic participation, international law and rights-based policy development.',
      bg: 'Социални науки, защита на човешките права, равенство, приобщаване, демократично участие, международно право и политики, основани на права.',
    },
    icon: Scale,
  },
  {
    title: { en: 'Maritime & Blue Economy', bg: 'Морско дело и синя икономика' },
    text: {
      en: 'Maritime education, marine innovation, blue growth, safety at sea, maritime sustainability and projects linked to the future of the maritime sector.',
      bg: 'Морско образование, морски иновации, син растеж, безопасност на море, морска устойчивост и проекти, свързани с бъдещето на морския сектор.',
    },
    icon: Anchor,
  },
  {
    title: {
      en: 'Engineering, AI & Digital Technologies',
      bg: 'Инженерство, AI и дигитални технологии',
    },
    text: {
      en: 'Engineering, artificial intelligence, computer science, programming, digital systems, smart solutions and technology-driven innovation.',
      bg: 'Инженерство, изкуствен интелект, компютърни науки, програмиране, дигитални системи, умни решения и технологично водени иновации.',
    },
    icon: BrainCircuit,
  },
  {
    title: {
      en: 'Agronomy, Environment & Sustainable Development',
      bg: 'Агрономия, околна среда и устойчиво развитие',
    },
    text: {
      en: 'Agronomy, agriculture, biodiversity, natural resources, environmental protection, sustainability and green transition initiatives.',
      bg: 'Агрономия, земеделие, биоразнообразие, природни ресурси, опазване на околната среда, устойчивост и инициативи за зелен преход.',
    },
    icon: Sprout,
  },
  {
    title: { en: 'Education, Business & Innovation', bg: 'Образование, бизнес и иновации' },
    text: {
      en: 'Education and training, organisational development, entrepreneurship, business growth, innovation management, skills development and new approaches to learning and professional development.',
      bg: 'Образование и обучение, организационно развитие, предприемачество, бизнес растеж, управление на иновации, развитие на умения и нови подходи към ученето и професионалното развитие.',
    },
    icon: BookOpenCheck,
  },
  {
    title: { en: 'Health, Medicine & Life Sciences', bg: 'Здраве, медицина и науки за живота' },
    text: {
      en: 'Health, medicine, biology, life sciences, well-being, public health and research-driven solutions for healthier communities.',
      bg: 'Здраве, медицина, биология, науки за живота, благосъстояние, обществено здраве и научно базирани решения за по-здрави общности.',
    },
    icon: HeartPulse,
  },
];
