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

export default function About() {
  const { lang, t } = useLanguage();
  const [activeProcess, setActiveProcess] = useState(0);
  const [expandedFounders, setExpandedFounders] = useState<string[]>([]);
  const [expandedAboutCopy, setExpandedAboutCopy] = useState<string[]>([]);
  const programmes = getProgrammes(lang);
  const founders = getTeamMembers(lang).filter((member) =>
    ['viktor-georgiev', 'ana-antonova-georgieva'].includes(member.id),
  );
  const selectedProcess = processSteps[activeProcess];

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
          <h2 id="founders-heading" className="visually-hidden">{t('about.founders')}</h2>
          <div className={styles.foundersGrid}>
            {founders.map((founder) => (
              <article className={styles.founderCard} key={founder.id}>
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
          <div className={styles.sectionHeading}>
            <h2>{t('services.processEyebrow')}</h2>
            <span className="dash" />
          </div>

          <div className={styles.processPanel}>
            <div className={styles.processBoard}>
              <div className={styles.processRail} role="tablist" aria-label={t('about.processStepsLabel')}>
                {processSteps.map((step, index) => (
                  <button
                    type="button"
                    role="tab"
                    id={`process-tab-${index}`}
                    aria-selected={activeProcess === index}
                    aria-controls="process-detail"
                    className={activeProcess === index ? styles.activeStepButton : undefined}
                    key={step.title.en}
                    onClick={() => setActiveProcess(index)}
                  >
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <strong>{loc(step.title, lang)}</strong>
                  </button>
                ))}
              </div>

              <article
                className={styles.processDetail}
                id="process-detail"
                role="tabpanel"
                aria-labelledby={`process-tab-${activeProcess}`}
              >
                <div className={styles.processDetailHead}>
                  <span className={styles.stepNumber}>{String(activeProcess + 1).padStart(2, '0')}</span>
                  <h3>{loc(selectedProcess.title, lang)}</h3>
                </div>
                <p>{loc(selectedProcess.text, lang)}</p>
              </article>
            </div>

            <ol className={styles.processMobile} aria-label={t('about.processStepsLabel')}>
              {processSteps.map((step, index) => (
                <li className={activeProcess === index ? styles.activeMobileStep : undefined} key={step.title.en}>
                  <button
                    type="button"
                    aria-expanded={activeProcess === index}
                    aria-controls={`mobile-process-detail-${index}`}
                    onClick={() => setActiveProcess(index)}
                  >
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <strong>{loc(step.title, lang)}</strong>
                    <ChevronDown size={18} aria-hidden="true" />
                  </button>
                  {activeProcess === index ? (
                    <p id={`mobile-process-detail-${index}`}>{loc(step.text, lang)}</p>
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <PartnersMarquee heading={t('about.partnersTitle')} label={t('about.partnersLabel')} />
    </>
  );
}
