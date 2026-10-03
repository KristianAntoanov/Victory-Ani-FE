import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, Phone, ShieldCheck, Target, Users, type LucideIcon } from 'lucide-react';
import ExpertiseAreas from '@/components/common/ExpertiseAreas';
import Icon from '@/components/common/Icon';
import PartnersMarquee from '@/components/common/PartnersMarquee';
import PrimaryButton from '@/components/common/PrimaryButton';
import SecondaryButton from '@/components/common/SecondaryButton';
import Seo from '@/components/common/Seo';
import ServiceCard from '@/components/common/ServiceCard';
import { ASSETS, CONTACT, ROUTES } from '@/constants';
import { useLanguage } from '@/context/LanguageContext';
import { getProgrammes } from '@/data/programmes';
import { getHomeServiceCards } from '@/data/services';
import { getTeamMembers } from '@/data/team';
import { loc, type Localized } from '@/i18n';
import styles from './About.module.css';

interface ProcessStep {
  title: Localized;
  text: Localized;
}

interface ProcessHighlight {
  title: Localized;
  text: Localized;
  icon: LucideIcon;
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

const processHighlights: ProcessHighlight[] = [
  {
    title: { en: 'Clear project logic', bg: 'Ясна проектна логика' },
    text: {
      en: 'Needs, objectives, activities, results and impact are aligned before the proposal is written.',
      bg: 'Нуждите, целите, дейностите, резултатите и въздействието се съгласуват преди писането на предложението.',
    },
    icon: Target,
  },
  {
    title: { en: 'The right partners', bg: 'Правилните партньори' },
    text: {
      en: 'Each organisation has a defined role, relevant expertise and a reason to be part of the project.',
      bg: 'Всяка организация има ясна роля, подходяща експертиза и конкретна причина да бъде част от проекта.',
    },
    icon: Users,
  },
  {
    title: { en: 'Confident delivery', bg: 'Уверено изпълнение' },
    text: {
      en: 'The project is prepared with practical management, reporting, communication and quality needs in mind.',
      bg: 'Проектът се подготвя с мисъл за управлението, отчитането, комуникацията и качеството.',
    },
    icon: ShieldCheck,
  },
];

export default function About() {
  const { lang, t } = useLanguage();
  const [activeProcess, setActiveProcess] = useState(0);
  const [expandedFounders, setExpandedFounders] = useState<string[]>([]);
  const [expandedAboutCopy, setExpandedAboutCopy] = useState<string[]>([]);
  const programmes = getProgrammes(lang);
  const services = getHomeServiceCards(lang);
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
              <span className="eyebrow">{t('common.eyebrow')}</span>
              <h1 className={styles.heroTitle}>
                {t('home.titleLine1')}
                {' '}
                <em>{t('home.titleLine2')}</em>
              </h1>
              <p className={styles.heroLead}>{t('home.lead')}</p>
              <div className={styles.heroActions}>
                <PrimaryButton to={ROUTES.services} className={styles.heroButton}>
                  {t('cta.exploreServices')}
                </PrimaryButton>
                <SecondaryButton href={CONTACT.phoneHref} icon={Phone} className={styles.heroButton}>
                  {CONTACT.phone}
                </SecondaryButton>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.heroCards}>
                {programmes.map((programme) => (
                  <Link
                    key={programme.id}
                    to={`${ROUTES.programmes}?programme=${programme.id}`}
                    className={styles.programmePill}
                  >
                    <span className={styles.programmeIcon}>
                      <Icon name={programme.icon} size={18} />
                    </span>
                    <span>
                      <span className={styles.programmeTitle}>{programme.title}</span>
                      <span className={styles.programmeSub}>{programme.tagline}</span>
                    </span>
                    <ArrowRight className={styles.arrowMini} size={14} aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.servicesSection} data-testid="about-services">
        <div className="container">
          <div className={styles.sectionHeading}>
            <h2>{t('about.whatWeDo')}</h2>
            <span className="dash" />
          </div>
          <div className={styles.servicesGrid}>
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.description}
                icon={service.icon}
                to={ROUTES.services}
                linkLabel={`${t('common.learnMoreAbout')} ${service.title}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.introSection}>
        <div className="container">
          <div className={styles.introGrid}>
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
            </article>
            <article className={styles.storyCopy}>
              <span className="eyebrow">{t('about.storyTitle')}</span>
              <h2>{t('about.storyTitle')}</h2>
              <div className={`${styles.mobileCopy} ${expandedAboutCopy.includes('story') ? styles.mobileCopyExpanded : ''}`.trim()} id="about-story-copy">
                <p>{t('about.storyText')}</p>
              </div>
              <button
                type="button"
                className={`${styles.copyToggle} ${styles.storyCopyToggle}`}
                aria-expanded={expandedAboutCopy.includes('story')}
                aria-controls="about-story-copy"
                onClick={() => toggleAboutCopy('story')}
              >
                {expandedAboutCopy.includes('story') ? t('common.showLess') : t('common.readMore')}
                <ChevronDown size={18} aria-hidden="true" />
              </button>
            </article>
          </div>
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
        description={t('programmes.expertiseText')}
        compactOnMobile
      />

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
                    id={`process-tab-${index}`}
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

              <article
                className={styles.processDetail}
                id="process-detail"
                role="tabpanel"
                aria-labelledby={`process-tab-${activeProcess}`}
              >
                <span className={styles.stepNumber}>{String(activeProcess + 1).padStart(2, '0')}</span>
                <h3>{loc(selectedProcess.title, lang)}</h3>
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

            <div className={styles.processHighlights} aria-label={t('about.completeProcessLabel')}>
              {processHighlights.map((item) => {
                const HighlightIcon = item.icon;
                return (
                  <article className={styles.processHighlight} key={item.title.en}>
                    <span className="icon-circle icon-circle--soft">
                      <HighlightIcon size={24} strokeWidth={1.6} aria-hidden="true" />
                    </span>
                    <h3>{loc(item.title, lang)}</h3>
                    <p>{loc(item.text, lang)}</p>
                  </article>
                );
              })}
            </div>
          </div>
          <p className={styles.processTagline}>{t('about.processTagline')}</p>
        </div>
      </section>

      <PartnersMarquee heading={t('about.partnersTitle')} label={t('about.partnersLabel')} />
    </>
  );
}
