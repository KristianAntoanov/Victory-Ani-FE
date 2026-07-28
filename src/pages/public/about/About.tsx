import { useEffect, useState } from 'react';
import {
  Anchor,
  BookOpen,
  Brain,
  GraduationCap,
  Handshake,
  Lightbulb,
  ShieldCheck,
  Sprout,
  Target,
  Users,
  Waves,
  type LucideIcon,
} from 'lucide-react';
import Seo from '@/components/common/Seo';
import PrimaryButton from '@/components/common/PrimaryButton';
import SecondaryButton from '@/components/common/SecondaryButton';
import { ASSETS, ROUTES } from '@/constants';
import { useLanguage } from '@/context/LanguageContext';
import { loc, type Localized } from '@/i18n';
import { openConsultationModal } from '@/utils/consultationModal';
import styles from './About.module.css';

interface ProcessStep {
  title: Localized;
  text: Localized;
}

interface ValueItem {
  title: Localized;
  text: Localized;
  icon: LucideIcon;
}

interface Founder {
  name: Localized;
  role: Localized;
  text: Localized;
  quote: Localized;
  icon: LucideIcon;
}

const expertise: Localized[] = [
  {
    en: 'Humanities and social sciences',
    bg: 'Хуманитарни и социални науки',
  },
  {
    en: 'Sustainability and environmental studies',
    bg: 'Устойчивост и екологични изследвания',
  },
  {
    en: 'Economics and business',
    bg: 'Икономика и бизнес',
  },
  {
    en: 'Maritime education and maritime affairs',
    bg: 'Морско образование и морско дело',
  },
  {
    en: 'Artificial intelligence and computer science',
    bg: 'Изкуствен интелект и компютърни науки',
  },
  {
    en: 'Medicine, biology and natural sciences',
    bg: 'Медицина, биология и природни науки',
  },
  {
    en: 'Education, training and social inclusion',
    bg: 'Образование, обучение и социално включване',
  },
];

const aboutNav = [
  { label: { en: 'Story & Team', bg: 'История и екип' }, href: '#story-team' },
  { label: { en: 'How we work', bg: 'Как работим' }, href: '#how-we-work' },
  { label: { en: 'Values', bg: 'Ценности' }, href: '#values' },
  { label: { en: 'Founders', bg: 'Основатели' }, href: '#founders' },
];

const processSteps: ProcessStep[] = [
  {
    title: { en: 'Listen', bg: 'Изслушваме' },
    text: {
      en: 'We begin with your idea, your organisation and the needs of the people you want to support.',
      bg: 'Започваме с вашата идея, вашата организация и нуждите на хората, които искате да подкрепите.',
    },
  },
  {
    title: { en: 'Find', bg: 'Намираме' },
    text: {
      en: 'We identify the EU programme and funding call that offer the strongest match for your ambitions.',
      bg: 'Идентифицираме европейската програма и покана за финансиране, които най-добре съответстват на вашите амбиции.',
    },
  },
  {
    title: { en: 'Shape', bg: 'Оформяме' },
    text: {
      en: 'We develop the project concept, objectives, activities, results and project logic.',
      bg: 'Разработваме проектната концепция, целите, дейностите, резултатите и логиката на проекта.',
    },
  },
  {
    title: { en: 'Connect', bg: 'Свързваме' },
    text: {
      en: 'We build a balanced partnership with the right expertise, roles and geographical coverage.',
      bg: 'Изграждаме балансирано партньорство с правилната експертиза, роли и географско покритие.',
    },
  },
  {
    title: { en: 'Build', bg: 'Изграждаме' },
    text: {
      en: 'We prepare the proposal, work plan, budget and supporting documents with care and precision.',
      bg: 'Подготвяме предложението, работния план, бюджета и придружаващите документи с внимание и прецизност.',
    },
  },
  {
    title: { en: 'Deliver', bg: 'Реализираме' },
    text: {
      en: 'We support implementation, coordination, communication, quality assurance and reporting after approval.',
      bg: 'Подкрепяме изпълнението, координацията, комуникацията, осигуряването на качество и отчитането след одобрение.',
    },
  },
];

const values: ValueItem[] = [
  {
    title: {
      en: 'Equal access to education and opportunity',
      bg: 'Равен достъп до образование и възможности',
    },
    text: {
      en: 'Every person should have access to quality education, learning opportunities and the possibility to participate fully in society.',
      bg: 'Всеки човек трябва да има достъп до качествено образование, възможности за учене и участие в обществото.',
    },
    icon: GraduationCap,
  },
  {
    title: { en: 'Ideas deserve to be heard', bg: 'Идеите заслужават да бъдат чути' },
    text: {
      en: 'Innovative ideas often begin with one person, one organisation or one local need. We help give them structure, credibility and a strong European voice.',
      bg: 'Иновативните идеи често започват от един човек, една организация или една местна нужда. Помагаме им да получат структура, надеждност и силен европейски глас.',
    },
    icon: Lightbulb,
  },
  {
    title: { en: 'Integrity and responsibility', bg: 'Почтеност и отговорност' },
    text: {
      en: 'We provide realistic advice, respect funding rules and remain transparent about opportunities, risks and responsibilities.',
      bg: 'Даваме реалистични съвети, спазваме правилата за финансиране и сме прозрачни относно възможностите, рисковете и отговорностите.',
    },
    icon: ShieldCheck,
  },
  {
    title: { en: 'Quality in every detail', bg: 'Качество във всеки детайл' },
    text: {
      en: 'Strong projects depend on clear objectives, realistic activities, reliable partnerships and precise documentation.',
      bg: 'Силните проекти зависят от ясни цели, реалистични дейности, надеждни партньорства и прецизна документация.',
    },
    icon: Target,
  },
  {
    title: { en: 'Cooperation built on trust', bg: 'Сътрудничество, изградено върху доверие' },
    text: {
      en: 'European projects are created through people. We value respectful communication, shared responsibility and long-term partnerships.',
      bg: 'Европейските проекти се създават от хора. Ценим уважителната комуникация, споделената отговорност и дългосрочните партньорства.',
    },
    icon: Handshake,
  },
  {
    title: { en: 'Innovation with meaning', bg: 'Иновации със смисъл' },
    text: {
      en: 'Innovation should respond to real needs and create practical value for education, safety, the environment, research and society.',
      bg: 'Иновациите трябва да отговарят на реални нужди и да създават практическа стойност за образованието, безопасността, околната среда, науката и обществото.',
    },
    icon: Brain,
  },
  {
    title: { en: 'Lasting value', bg: 'Трайна стойност' },
    text: {
      en: 'A successful project should continue to create value after the funding period ends through solutions that can be sustained and transferred.',
      bg: 'Успешният проект трябва да продължи да създава стойност и след края на финансирането чрез решения, които могат да се поддържат и пренасят.',
    },
    icon: Sprout,
  },
];

const founders: Founder[] = [
  {
    name: { en: 'Viktor Georgiev', bg: 'Виктор Георгиев' },
    role: { en: 'Founder', bg: 'Основател' },
    icon: Anchor,
    text: {
      en: 'A former naval captain, Viktor brings practical leadership experience, operational discipline and a strong understanding of safety, responsibility and international cooperation. During the past five years, he has worked with EU-funded projects and has developed a particular interest in Horizon Europe opportunities related to maritime affairs, marine innovation and safer and more sustainable maritime systems.',
      bg: 'Като бивш морски капитан, Виктор носи практически лидерски опит, оперативна дисциплина и силно разбиране за безопасност, отговорност и международно сътрудничество. През последните пет години работи по проекти, финансирани от ЕС, и развива особен интерес към възможностите по Horizon Europe, свързани с морското дело, морските иновации и по-безопасни и устойчиви морски системи.',
    },
    quote: {
      en: 'Through EU-funded projects, we can turn the best innovative ideas into real solutions, advance sustainability and help restore the planet for the generations to come.',
      bg: 'Чрез проекти, финансирани от ЕС, можем да превърнем най-добрите иновативни идеи в реални решения, да развиваме устойчивостта и да помагаме за възстановяването на планетата за бъдещите поколения.',
    },
  },
  {
    name: { en: 'Dr. Ana Antonova-Georgieva', bg: 'д-р Ана Антонова-Георгиева' },
    role: { en: 'Founder', bg: 'Основател' },
    icon: BookOpen,
    text: {
      en: 'Dr. Ana Antonova-Georgieva holds a PhD in Political Science focused on women\'s rights, gender equality, violence against women and human rights protection. With more than ten years of experience in EU-funded projects, she is devoted to the strategic design, development and writing of European projects, guiding ideas from their earliest stage to strong, competitive and implementation-ready proposals.',
      bg: 'Д-р Ана Антонова-Георгиева има докторска степен по политически науки с фокус върху правата на жените, равенството между половете, насилието над жени и защитата на човешките права. С повече от десет години опит в проекти, финансирани от ЕС, тя е посветена на стратегическото проектиране, развитие и писане на европейски проекти, като превежда идеите от най-ранния им етап до силни, конкурентни и готови за изпълнение предложения.',
    },
    quote: {
      en: 'I believe we have the power to design projects that can genuinely change the realities of children, opening doors to education, equality, protection and opportunity.',
      bg: 'Вярвам, че имаме силата да създаваме проекти, които наистина могат да променят реалността за децата, отваряйки врати към образование, равенство, защита и възможности.',
    },
  },
];

export default function About() {
  const { lang, t } = useLanguage();
  const [activeProcess, setActiveProcess] = useState(0);
  const [activeValue, setActiveValue] = useState(0);
  const [activeSection, setActiveSection] = useState(aboutNav[0].href);
  const selectedProcess = processSteps[activeProcess];
  const selectedValue = values[activeValue];
  const SelectedValueIcon = selectedValue.icon;

  useEffect(() => {
    const sections = aboutNav
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setActiveSection(`#${visible.target.id}`);
        }
      },
      {
        rootMargin: '-35% 0px -45% 0px',
        threshold: [0.18, 0.35, 0.55],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Seo
        title={t('about.title')}
        description={t('about.lead')}
        image={ASSETS.aboutHero}
      />

      <section className={styles.hero} data-testid="about-hero">
        <div className="container">
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <span className={`eyebrow ${styles.heroEyebrow}`}>{t('nav.about')}</span>
              <h1 className={styles.heroTitle}>
                {t('about.heroLine1')}
                <em>{t('about.heroLine2')}</em>
              </h1>
              <span className="dash" />
              <p className={styles.heroLead}>{t('about.heroLead')}</p>
              <div className={styles.heroActions}>
                <PrimaryButton
                  type="button"
                  onClick={openConsultationModal}
                  className={styles.heroButton}
                >
                  {t('about.startProject')}
                </PrimaryButton>
                <SecondaryButton to={ROUTES.services} className={styles.heroButton}>
                  {t('cta.exploreServices')}
                </SecondaryButton>
              </div>
            </div>
            <div className={styles.heroVisual} aria-hidden="true" />
          </div>

          <div className={styles.introPanel}>
            <div className={styles.introStatement}>
              <span className="eyebrow">{t('about.whyEyebrow')}</span>
              <p>{t('about.whyText')}</p>
            </div>
            <div className={styles.introActions}>
              <span>{t('about.helpTeams')}</span>
              <ul>
                <li>{t('about.helpOne')}</li>
                <li>{t('about.helpTwo')}</li>
                <li>{t('about.helpThree')}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.navWrap}>
        <div className="container">
          <nav className={styles.aboutNav} aria-label={t('about.pageSectionsLabel')}>
            {aboutNav.map((item) => (
              <a
                href={item.href}
                className={activeSection === item.href ? styles.activeNavLink : undefined}
                key={item.href}
              >
                {loc(item.label, lang)}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <section className={styles.teamSection} id="story-team">
        <div className="container">
          <div className={styles.storyGrid}>
            <div className={styles.sectionIntro}>
              <span className="eyebrow">{t('about.storyTeam')}</span>
              <h2>{t('about.journeyTitle')}</h2>
              <span className="dash" />
              <p>{t('about.journeyText')}</p>
            </div>

            <article className={styles.storyPanel}>
              <div className={styles.statPill}>
                <Users size={20} aria-hidden="true" />
                <strong>{t('about.experienceYears')}</strong>
                <span>{t('about.combinedExperience')}</span>
              </div>
              <p>
                {t('about.expertiseText')}
              </p>
              <div className={styles.expertiseGrid}>
                {expertise.map((item) => (
                  <span key={item.en}>{loc(item, lang)}</span>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.processSection} id="how-we-work">
        <div className="container">
          <div className={styles.processPanel}>
            <div className={styles.processIntro}>
              <span className="eyebrow">{t('services.processEyebrow')}</span>
              <h2>{t('about.listeningTitle')}</h2>
              <span className="dash" />
              <p>{t('about.listeningText')}</p>
              <SecondaryButton to={ROUTES.services}>{t('cta.exploreServices')}</SecondaryButton>
            </div>

            <div className={styles.processBoard}>
              <div className={styles.processRail} role="tablist" aria-label={t('about.processStepsLabel')}>
                {processSteps.map((step, index) => (
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeProcess === index}
                    aria-controls="process-detail"
                    className={activeProcess === index ? styles.activeStepButton : undefined}
                    key={step.title.en}
                    onClick={() => setActiveProcess(index)}
                  >
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    {loc(step.title, lang)}
                  </button>
                ))}
              </div>

              <article className={styles.processDetail} id="process-detail" role="tabpanel">
                <span className={styles.stepNumber}>
                  {String(activeProcess + 1).padStart(2, '0')}
                </span>
                <h3>{loc(selectedProcess.title, lang)}</h3>
                <p>{loc(selectedProcess.text, lang)}</p>
              </article>
            </div>

            <div className={styles.processSteps} aria-label={t('about.completeProcessLabel')}>
              {processSteps.map((step, index) => (
                <article className={styles.processStep} key={step.title.en}>
                  <span className={styles.stepNumber}>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{loc(step.title, lang)}</h3>
                  <p>{loc(step.text, lang)}</p>
                </article>
              ))}
            </div>
          </div>
          <p className={styles.processTagline}>{t('about.processTagline')}</p>
        </div>
      </section>

      <section className={styles.valuesSection} id="values">
        <div className="container">
          <div className={styles.valuesHeader}>
            <span className="eyebrow">{t('about.valuesEyebrow')}</span>
            <h2>{t('about.valuesTitle')}</h2>
            <span className="dash" />
          </div>
          <div className={styles.valuesShell}>
            <div className={styles.valueNav} role="tablist" aria-label={t('about.valuesLabel')}>
              {values.map((value, index) => {
                const ValueIcon = value.icon;
                return (
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeValue === index}
                    aria-controls="value-detail"
                    className={activeValue === index ? styles.activeValueButton : undefined}
                    key={value.title.en}
                    onClick={() => setActiveValue(index)}
                  >
                    <ValueIcon size={18} strokeWidth={1.7} aria-hidden="true" />
                    <span>{loc(value.title, lang)}</span>
                  </button>
                );
              })}
            </div>

            <article className={styles.valueDetail} id="value-detail" role="tabpanel">
              <span className="icon-circle">
                <SelectedValueIcon size={28} strokeWidth={1.5} aria-hidden="true" />
              </span>
              <h3>{loc(selectedValue.title, lang)}</h3>
              <p>{loc(selectedValue.text, lang)}</p>
            </article>
          </div>

        </div>
      </section>

      <section className={styles.foundersSection} id="founders">
        <div className="container">
          <div className={styles.foundersPanel}>
            <div className={styles.sectionIntro}>
              <span className="eyebrow">{t('about.founders')}</span>
              <h2>{t('about.foundersTitle')}</h2>
              <span className="dash" />
            </div>

            <div className={styles.foundersGrid}>
              {founders.map((founder) => {
                const FounderIcon = founder.icon;
                return (
                  <article className={styles.founderCard} key={founder.name.en}>
                    <div className={styles.founderHeader}>
                      <span className={styles.founderPhoto}>
                        <FounderIcon size={34} strokeWidth={1.4} aria-hidden="true" />
                      </span>
                      <div>
                        <h3>{loc(founder.name, lang)}</h3>
                        <p>{loc(founder.role, lang)}</p>
                      </div>
                    </div>
                    <p>{loc(founder.text, lang)}</p>
                    <blockquote>{loc(founder.quote, lang)}</blockquote>
                  </article>
                );
              })}
            </div>

            <div className={styles.consultCta}>
              <div>
                <Waves size={24} aria-hidden="true" />
                <strong>{t('about.readyProject')}</strong>
              </div>
              <button type="button" onClick={openConsultationModal} className="btn btn--primary">
                {t('cta.book')}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
