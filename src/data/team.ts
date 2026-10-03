import { loc, type Lang, type Localized } from '@/i18n';
import type { TeamMember } from '@/types';

type TeamMemberRecord = Omit<TeamMember, 'name' | 'position' | 'description' | 'imageAlt' | 'quote'> & {
  name: Localized;
  position: Localized;
  description: Localized;
  imageAlt: Localized;
  quote: Localized;
};

export const VIKTOR_GEORGIEV_BIOGRAPHY: Localized = {
  en: 'A former naval captain, he brings practical leadership experience, operational discipline and a strong understanding of safety, responsibility and international cooperation. During the past five years, he has worked with EU-funded projects and has developed a particular interest in Horizon Europe opportunities related to maritime affairs, marine innovation and safer and more sustainable maritime systems. His professional background allows him to connect practical maritime experience with research, education, innovation and European cooperation. He is especially interested in projects that support maritime safety, new technologies, skills development and responsible use of marine resources.',
  bg: 'Като бивш морски капитан, той носи практически лидерски опит, оперативна дисциплина и задълбочено разбиране за безопасността, отговорността и международното сътрудничество. През последните пет години работи по проекти, финансирани от ЕС, и развива особен интерес към възможностите по Horizon Europe, свързани с морското дело, морските иновации и по-безопасните и устойчиви морски системи. Професионалният му опит му позволява да свързва практическите морски знания с науката, образованието, иновациите и европейското сътрудничество. Той проявява специален интерес към проекти за морска безопасност, нови технологии, развитие на умения и отговорно използване на морските ресурси.',
};

export const VIKTOR_GEORGIEV_QUOTE: Localized = {
  en: '“Discipline, responsibility and respect for the forces of nature have shaped the way I see the world. Our oceans, forests and natural systems sustain every part of our future and neglecting them comes at a price we may not be able to reverse. Through EU-funded projects, we can turn the best innovative ideas into real solutions, advance sustainability and help restore the planet for the generations to come.”',
  bg: '„Дисциплината, отговорността и уважението към силите на природата са оформили начина, по който виждам света. Океаните, горите и природните системи поддържат всяка част от нашето бъдеще, а пренебрегването им има цена, която може да не успеем да обърнем. Чрез проекти, финансирани от ЕС, можем да превърнем най-добрите иновативни идеи в реални решения, да насърчим устойчивостта и да помогнем за възстановяването на планетата за бъдещите поколения.“',
};

export const ANA_ANTONOVA_GEORGIEVA_BIOGRAPHY: Localized = {
  en: 'Dr. Ana Antonova-Georgieva holds a PhD in Political Science focused on women\'s rights, gender equality, violence against women and human rights protection. With more than ten years of experience in EU-funded projects, she is devoted to the strategic design, development and writing of European projects, guiding ideas from their earliest stage to strong, competitive and implementation-ready proposals.',
  bg: 'Д-р Ана Антонова-Георгиева има докторска степен по политически науки с фокус върху правата на жените, равенството между половете, насилието над жени и защитата на човешките права. С повече от десет години опит в проекти, финансирани от ЕС, тя е посветена на стратегическото проектиране, развитие и писане на европейски проекти, като превежда идеите от най-ранния им етап до силни, конкурентни и готови за изпълнение предложения.',
};

export const ANA_ANTONOVA_GEORGIEVA_QUOTE: Localized = {
  en: '“I believe we have the power to design projects that can genuinely change the realities of children, opening doors to education, equality, protection and opportunity.”',
  bg: '„Вярвам, че имаме силата да създаваме проекти, които наистина могат да променят реалността за децата, отваряйки врати към образование, равенство, защита и възможности.“',
};

const teamMembers: TeamMemberRecord[] = [
  {
    id: 'viktor-georgiev',
    name: { en: 'Viktor Georgiev', bg: 'Виктор Георгиев' },
    position: { en: 'Founder', bg: 'Основател' },
    description: VIKTOR_GEORGIEV_BIOGRAPHY,
    image: '/assets/team/viktor-georgiev.webp',
    imageAlt: { en: 'Portrait of Viktor Georgiev', bg: 'Портрет на Виктор Георгиев' },
    linkedin: 'https://www.linkedin.com/company/v-a-projects/?viewAsMember=true',
    quote: VIKTOR_GEORGIEV_QUOTE,
  },
  {
    id: 'ana-antonova-georgieva',
    name: { en: 'Dr. Ana Antonova-Georgieva', bg: 'д-р Ана Антонова-Георгиева' },
    position: { en: 'Founder', bg: 'Основател' },
    description: ANA_ANTONOVA_GEORGIEVA_BIOGRAPHY,
    image: '/assets/team/ana-antonova-georgieva.webp',
    imageAlt: { en: 'Portrait of Dr. Ana Antonova-Georgieva', bg: 'Портрет на д-р Ана Антонова-Георгиева' },
    linkedin: 'https://www.linkedin.com/company/v-a-projects/?viewAsMember=true',
    quote: ANA_ANTONOVA_GEORGIEVA_QUOTE,
  },
];

export function getTeamMembers(lang: Lang = 'en'): TeamMember[] {
  return teamMembers.map((member) => ({
    id: member.id,
    name: loc(member.name, lang),
    position: loc(member.position, lang),
    description: loc(member.description, lang),
    image: member.image,
    imageAlt: loc(member.imageAlt, lang),
    linkedin: member.linkedin,
    quote: loc(member.quote, lang),
  }));
}
