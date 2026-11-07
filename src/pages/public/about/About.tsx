import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import ExpertiseAreas from '@/components/common/ExpertiseAreas';
import Icon from '@/components/common/Icon';
import PartnersMarquee from '@/components/common/PartnersMarquee';
import Seo from '@/components/common/Seo';
import { ASSETS, ROUTES } from '@/constants';
import { useLanguage } from '@/context/LanguageContext';
import { getProgrammes } from '@/data/programmes';
import { getTeamMembers } from '@/data/team';
import { loc, type Localized } from '@/i18n';
import styles from './About.module.css';

interface ProcessStep {
  title: Localized;
  text: Localized;
}

const processSteps: ProcessStep[] = [
  {
    title: { en: "Listen", bg: "Изслушваме" },
    text: { en: "We start by understanding your idea, learning about your organisation and identifying the needs of the people you aim to support.", bg: "В основата на нашата работа стоят вашата идея, потребностите на вашата организация и хората, до които искате да достигнете." },
  },
  {
    title: { en: "Identify", bg: "Избираме" },
    text: { en: "We explore EU funding opportunities to identify the programme and call that best match your organisation’s goals, needs and ambitions.", bg: "Проучваме възможностите за европейско финансиране и избираме най-подходящата програма и покана за кандидатстване според целите и потребностите на вашата организация." },
  },
  {
    title: { en: "Develop the concept", bg: "Разработваме" },
    text: { en: "We turn your idea into a clear project concept with specific objectives, activities and expected results.", bg: "Превръщаме вашата идея в ясна и добре обоснована проектна концепция, като определяме целите, планираме дейностите и очертаваме очакваните резултати." },
  },
  {
    title: { en: "Build partnerships", bg: "Създаваме партньорства" },
    text: { en: "We select suitable partners based on their experience and expertise, define their roles and responsibilities and build a balanced international partnership for successful project implementation.", bg: "Подбираме подходящите партньори според техния опит и експертиза, определяме ролите и отговорностите им и изграждаме балансирано международно партньорство за успешното изпълнение на проекта." },
  },
  {
    title: { en: "Prepare the proposal", bg: "Подготвяме проектно предложение" },
    text: { en: "We prepare the proposal, work plan, budget and supporting documents with care and precision in compliance with the funding requirements.", bg: "Разработваме цялостното проектно предложение, работния план, бюджета и необходимата документация, като обръщаме внимание на всеки детайл и изискванията на програмата за финансиране." },
  },
  {
    title: { en: "Manage implementation", bg: "Управляваме изпълнението" },
    text: { en: "We support implementation, coordination, communication, quality assurance and reporting after approval.", bg: "След одобрението на проекта продължаваме да ви подкрепяме при изпълнението на дейностите, координацията между партньорите, комуникацията, осигуряването на качество и подготовката на необходимите отчети." },
  },
];

export default function About() {
  const { lang, t } = useLanguage();
  const [expandedFounders, setExpandedFounders] = useState<string[]>([]);
  const [expandedAboutCopy, setExpandedAboutCopy] = useState<string[]>([]);
  const [activeProcessStep, setActiveProcessStep] = useState(0);
  const programmes = getProgrammes(lang);
  const selectedProcessStep = processSteps[activeProcessStep];
  const founders = getTeamMembers(lang).filter((member) =>
    member.id === 'viktor-georgiev',
  );

  const toggleFounder = (founderId: string) => {
    setExpandedFounders((current) => (
      current.includes(founderId)
        ? current.filter((id) => id !== founderId)
        : [...current, founderId]
    ));
  };

  const toggleAboutCopy = (sectionId: string) => {
    setExpandedAboutCopy((current) => (
      current.includes(sectionId)
        ? current.filter((id) => id !== sectionId)
        : [...current, sectionId]
    ));
  };

  return (
    <>
      <Seo
        title={t('about.title')}
        description={t('home.lead')}
        image={ASSETS.heroArchitecture}
        canonicalPath={ROUTES.about}
      />

      <section className={styles.hero} data-testid="about-hero">
        <div className="container">
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>
                <span className={styles.heroTitleLine}>{t('home.titleLine1')}</span>
                <em className={styles.heroTitleAccent}>{t('home.titleLine2')}</em>
              </h1>
              <p className={styles.heroLead}>{t('home.lead')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.introSection}>
        <div className="container">
          <article className={styles.introCopy}>
            <h2>{t('about.introTitle')}</h2>
            <span className="dash" />
            <div className={`${styles.mobileCopy} ${expandedAboutCopy.includes('intro') ? styles.mobileCopyExpanded : ''}`.trim()} id="about-intro-copy">
              <p>{t('about.introText')}</p>
            </div>
            <button
              type="button"
              className={styles.copyToggle}
              aria-expanded={expandedAboutCopy.includes('intro')}
              aria-controls="about-intro-copy"
              onClick={() => toggleAboutCopy('intro')}
            >
              {expandedAboutCopy.includes('intro') ? t('common.showLess') : t('common.readMore')}
              <ChevronDown size={18} aria-hidden="true" />
            </button>

            <div className={styles.programmeGrid} aria-label={t('programmes.programmesLabel')}>
              {programmes.map((programme) => (
                <Link
                  key={programme.id}
                  to={`${ROUTES.programmes}?programme=${programme.id}`}
                  className={styles.programmePill}
                >
                  <span className={styles.programmeIcon}>
                    <Icon name={programme.icon} size={22} />
                  </span>
                  <span className={styles.programmeTitle}>{programme.title}</span>
                  <ArrowRight className={styles.arrowMini} size={16} aria-hidden="true" />
                </Link>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className={styles.foundersSection} aria-labelledby="founders-heading">
        <div className="container">
          <h2 id="founders-heading" className={styles.founderHeading}>{t('about.founder')}</h2>
          <div className={styles.foundersGrid}>
            {founders.map((founder) => (
              <article
                className={`${styles.founderCard} ${expandedFounders.includes(founder.id) ? '' : styles.founderCardCollapsed}`.trim()}
                key={founder.id}
              >
                <figure className={styles.founderImage}>
                  <img
                    src={founder.image}
                    alt={founder.imageAlt}
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
                <div className={styles.founderContent}>
                  <header>
                    <h3>{founder.name}</h3>
                    <p>{founder.position}</p>
                  </header>
                  <div
                    className={`${styles.founderDetails} ${expandedFounders.includes(founder.id) ? styles.founderDetailsExpanded : ''}`.trim()}
                    id={`founder-details-${founder.id}`}
                  >
                    <p>{founder.description}</p>
                    {founder.quote ? <blockquote>{founder.quote}</blockquote> : null}
                  </div>
                  <button
                    type="button"
                    className={styles.founderToggle}
                    aria-expanded={expandedFounders.includes(founder.id)}
                    aria-controls={`founder-details-${founder.id}`}
                    onClick={() => toggleFounder(founder.id)}
                  >
                    {expandedFounders.includes(founder.id) ? t('common.showLess') : t('common.readMore')}
                    <ChevronDown size={18} aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ExpertiseAreas
        id="areas-of-expertise"
        title={t('programmes.expertiseEyebrow')}
        description=""
        compactOnMobile
      />

      <section className={styles.processSection} id="how-we-work">
        <div className="container">
          <div className={`${styles.sectionHeading} ${styles.processHeading}`}>
            <h2>{t('services.processEyebrow')}</h2>
            <span className="dash" />
          </div>

          <ol className={styles.processTabs} role="tablist" aria-label={t('about.processStepsLabel')}>
            {processSteps.map((step, index) => (
              <li key={step.title.en}>
                <button
                  type="button"
                  role="tab"
                  id={`process-step-${index}`}
                  aria-selected={activeProcessStep === index}
                  aria-controls="process-step-text"
                  className={activeProcessStep === index ? styles.activeProcessStep : undefined}
                  onClick={() => setActiveProcessStep(index)}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{loc(step.title, lang)}</strong>
                </button>
              </li>
            ))}
          </ol>

          <div
            className={styles.processTextPanel}
            id="process-step-text"
            role="tabpanel"
            aria-labelledby={`process-step-${activeProcessStep}`}
            key={selectedProcessStep.title.en}
          >
            <p>{loc(selectedProcessStep.text, lang)}</p>
          </div>
        </div>
      </section>

      <PartnersMarquee heading={t('about.partnersTitle')} label={t('about.partnersLabel')} />
    </>
  );
}
