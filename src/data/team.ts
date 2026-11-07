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
  en: "Viktor Georgiev is a former naval captain with extensive experience in leading teams, making critical decisions and working in international environments. His years at sea have shaped his strong sense of responsibility, discipline and commitment to safety and environmental protection. For the past five years, he has been involved in EU-funded projects, with a particular interest in the opportunities offered by Horizon Europe in maritime affairs, technological innovation and the sustainable development of the maritime sector. Drawing on his maritime background and experience in EU-funded projects, he is particularly interested in initiatives that advance maritime safety, promote technological innovation, strengthen professional skills and encourage the responsible use of marine resources.",
  bg: "Виктор Георгиев е бивш капитан на кораб с богат опит в ръководенето на екипи, вземането на отговорни решения и работата в международна среда. Годините, прекарани в морето, са изградили у него силно чувство за отговорност, дисциплина и ангажираност към безопасността и опазването на природата. През последните пет години работи по проекти, финансирани от ЕС, с особен интерес към възможностите по програмата Horizon Europe в областта на морското дело, технологичните иновации и устойчивото развитие на морския сектор. Съчетавайки практическия си опит в мореплаването с познанията си в областта на европейските проекти, той се стреми да допринася за инициативи, свързани с морската безопасност, новите технологии, развитието на професионални умения и устойчивото използване на морските ресурси.",
};

export const VIKTOR_GEORGIEV_QUOTE: Localized = {
  en: "“The sea has taught me discipline, responsibility and respect for nature. It has shown me both the extraordinary power of the natural world and the fragility of the balance that sustains life on Earth. Our oceans, forests and ecosystems are not simply resources to be used. They are a legacy we have a responsibility to protect. I believe that science, innovation and European cooperation give us the power to turn concern into action and ideas into meaningful solutions. Protecting our planet is not just about preserving what we have today. It is about ensuring that future generations inherit a world as rich, vibrant and full of life as the one we have been privileged to know.”",
  bg: "„Морето ме научи на дисциплина, отговорност и уважение към природата. Научи ме и колко крехко е равновесието, от което зависи животът на нашата планета. Океаните, горите и природните екосистеми са безценни. Ако продължим да ги пренебрегваме, рискуваме да нанесем щети, които един ден може да се окажат необратими. Вярвам, че науката, иновациите и европейското сътрудничество ни дават възможност да намерим реални решения за опазването на околната среда. Именно чрез такива проекти можем да допринесем за едно по-устойчиво бъдеще и да съхраним природното богатство за поколенията след нас.“",
};

export const ANA_ANTONOVA_GEORGIEVA_BIOGRAPHY: Localized = {
  en: "For Ana Antonova-Georgieva, the protection of human rights is more than a professional interest. It is a cause to which she has dedicated her academic and career path. She holds a PhD in Political Science, with her research focusing on women's rights, gender equality and the fight against violence and discrimination. With over a decade of experience in EU funding, Ana specialises in the strategic planning, development and management of international projects. Her work is guided by a firm belief in the power of European cooperation to address social inequalities, protect vulnerable communities and expand access to education. She is particularly passionate about initiatives that amplify women's voices, safeguard children's rights and empower individuals to fulfil their potential.",
  bg: "За Ана Антонова-Георгиева защитата на човешките права е не просто област на професионален интерес, а кауза, на която посвещава своята академична и изследователска дейност. Тя притежава докторска степен по политически науки, като работата ѝ е съсредоточена върху правата на жените, равенството между половете и борбата с насилието и дискриминацията. Повече от десет години Ана работи в областта на европейското финансиране, като се занимава със стратегическо планиране, разработване и управление на международни проекти. В професионалната си работа тя се ръководи от убеждението, че европейското сътрудничество може да бъде мощен инструмент за преодоляване на социалните неравенства, защита на уязвимите и разширяване на възможностите за образование и развитие. Особено близки до нея са инициативите, които дават глас на жените, защитават децата и създават условия всеки човек да разгърне своя потенциал.",
};

export const ANA_ANTONOVA_GEORGIEVA_QUOTE: Localized = {
  en: "“I have always believed that no child should be denied the chance to dream, to learn and to grow up in safety, and that no woman should have to live in fear or fight for rights that are already hers. These convictions are what drive me. To me, European projects are about far more than funding and measurable results. They are an opportunity to make a difference in someone's life, to bring hope where it is needed most and to help build a fairer future for generations to come.”",
  bg: "„Винаги съм вярвала, че никое дете не бива да бъде лишено от възможността да мечтае, да учи и да расте в сигурност, както и че никоя жена не трябва да живее в страх или да се бори за права, които ѝ принадлежат. Именно тези убеждения ме водят в работата ми. За мен европейските проекти са много повече от финансиране и постигнати резултати. Те са възможност да променим нечий живот, да дадем надежда там, където тя липсва, и да изградим по-справедливо бъдеще за следващите поколения.“",
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
  // Temporarily hidden at Ana’s request. Keep the profile for easy restoration.
  /*
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
  */
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
