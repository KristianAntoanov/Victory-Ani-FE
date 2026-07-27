import { loc, type Lang, type Localized } from '@/i18n';
import type { TeamMember } from '@/types';

type TeamMemberRecord = Omit<TeamMember, 'position' | 'description' | 'imageAlt'> & {
  position: Localized;
  description: Localized;
  imageAlt: Localized;
};

const teamMembers: TeamMemberRecord[] = [
  {
    id: 'viktor-georgiev',
    name: 'Viktor Georgiev',
    position: { en: 'Founder', bg: 'Основател' },
    description: {
      en: 'EU project consultant with leadership experience in maritime operations, Horizon Europe cooperation and sustainable innovation.',
      bg: 'Консултант по европейски проекти с лидерски опит в морските операции, Horizon Europe партньорства и устойчиви иновации.',
    },
    image: '/assets/team/marco.png',
    imageAlt: { en: 'Portrait of Viktor Georgiev', bg: 'Портрет на Виктор Георгиев' },
    linkedin: 'https://www.linkedin.com/company/v-a-projects/?viewAsMember=true',
  },
  {
    id: 'ana-antonova-georgieva',
    name: 'Dr. Ana Antonova-Georgieva',
    position: { en: 'Founder', bg: 'Основател' },
    description: {
      en: 'EU funding specialist focused on proposal strategy, human rights, equality, education and international cooperation.',
      bg: 'Специалист по европейско финансиране с фокус върху проектна стратегия, човешки права, равенство, образование и международно сътрудничество.',
    },
    image: '/assets/team/elena.png',
    imageAlt: { en: 'Portrait of Dr. Ana Antonova-Georgieva', bg: 'Портрет на д-р Ана Антонова-Георгиева' },
    linkedin: 'https://www.linkedin.com/company/v-a-projects/?viewAsMember=true',
  },
];

export function getTeamMembers(lang: Lang = 'en'): TeamMember[] {
  return teamMembers.map((member) => ({
    id: member.id,
    name: member.name,
    position: loc(member.position, lang),
    description: loc(member.description, lang),
    image: member.image,
    imageAlt: loc(member.imageAlt, lang),
    linkedin: member.linkedin,
  }));
}
