import { loc, type Lang, type Localized } from '@/i18n';
import type { TeamMember } from '@/types';

type TeamMemberRecord = Omit<TeamMember, 'position' | 'description' | 'imageAlt'> & {
  position: Localized;
  description: Localized;
  imageAlt: Localized;
};

export const VIKTOR_GEORGIEV_BIOGRAPHY: Localized = {
  en: 'A former naval captain, he brings practical leadership experience, operational discipline and a strong understanding of safety, responsibility and international cooperation. During the past five years, he has worked with EU-funded projects and has developed a particular interest in Horizon Europe opportunities related to maritime affairs, marine innovation and safer and more sustainable maritime systems. His professional background allows him to connect practical maritime experience with research, education, innovation and European cooperation. He is especially interested in projects that support maritime safety, new technologies, skills development and responsible use of marine resources.',
  bg: 'A former naval captain, he brings practical leadership experience, operational discipline and a strong understanding of safety, responsibility and international cooperation. During the past five years, he has worked with EU-funded projects and has developed a particular interest in Horizon Europe opportunities related to maritime affairs, marine innovation and safer and more sustainable maritime systems. His professional background allows him to connect practical maritime experience with research, education, innovation and European cooperation. He is especially interested in projects that support maritime safety, new technologies, skills development and responsible use of marine resources.',
};

export const VIKTOR_GEORGIEV_QUOTE: Localized = {
  en: '“Discipline, responsibility and respect for the forces of nature have shaped the way I see the world. Our oceans, forests and natural systems sustain every part of our future and neglecting them comes at a price we may not be able to reverse. Through EU-funded projects, we can turn the best innovative ideas into real solutions, advance sustainability and help restore the planet for the generations to come.”',
  bg: '“Discipline, responsibility and respect for the forces of nature have shaped the way I see the world. Our oceans, forests and natural systems sustain every part of our future and neglecting them comes at a price we may not be able to reverse. Through EU-funded projects, we can turn the best innovative ideas into real solutions, advance sustainability and help restore the planet for the generations to come.”',
};

const teamMembers: TeamMemberRecord[] = [
  {
    id: 'viktor-georgiev',
    name: 'Viktor Georgiev',
    position: { en: 'Founder', bg: 'Основател' },
    description: VIKTOR_GEORGIEV_BIOGRAPHY,
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
