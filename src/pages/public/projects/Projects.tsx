import { useEffect, useMemo, useState } from 'react';
import {
  CalendarDays,
  FolderKanban,
  Globe2,
  Handshake,
  Layers3,
  MessageSquareQuote,
} from 'lucide-react';
import Seo from '@/components/common/Seo';
import ProgrammeBadge from '@/components/common/ProgrammeBadge';
import ProjectCard from '@/components/common/ProjectCard';
import EmptyState from '@/components/common/EmptyState';
import ErrorState from '@/components/common/ErrorState';
import LoadingState from '@/components/common/LoadingState';
import PrimaryButton from '@/components/common/PrimaryButton';
import SecondaryButton from '@/components/common/SecondaryButton';
import { ASSETS, ROUTES } from '@/constants';
import { projectService } from '@/services/projectService';
import { useLanguage } from '@/context/LanguageContext';
import { loc, type Localized } from '@/i18n';
import { getProjectContent } from '@/utils/localizedContent';
import type { ProgrammeKey, Project } from '@/types';
import styles from './Projects.module.css';

interface ProgrammeFilter {
  id: ProgrammeKey | 'all';
  label: string;
}

interface Testimonial {
  name: string;
  role: Localized;
  project: Localized;
  quote: Localized;
}

const getFilters = (allLabel: string): ProgrammeFilter[] => [
  { id: 'all', label: allLabel },
  { id: 'erasmus', label: 'Erasmus+' },
  { id: 'horizon', label: 'Horizon Europe' },
  { id: 'life', label: 'LIFE' },
  { id: 'cerv', label: 'CERV' },
];

const testimonials: Testimonial[] = [
  {
    name: 'Assoc. Prof. Dr Iliyana Ankova-Stoyanova',
    role: {
      en: 'Sofia University “St. Kliment Ohridski”',
      bg: 'Софийски университет „Св. Климент Охридски“',
    },
    project: {
      en: 'Erasmus+ Capacity Building in Higher Education proposal',
      bg: 'Erasmus+ предложение за изграждане на капацитет във висшето образование',
    },
    quote: {
      en: 'V&A Projects brought structure, precision and strategic direction to the development of a complex proposal. Their support was particularly valuable in shaping the project logic, organising the work packages and coordinating consortium contributions.',
      bg: 'V&A Projects внесоха структура, прецизност и стратегическа посока в разработването на сложно проектно предложение. Тяхната подкрепа беше особено ценна при оформянето на проектната логика, организирането на работните пакети и координирането на приноса на консорциума.',
    },
  },
  {
    name: 'Daniela Atanasova',
    role: {
      en: 'Teacher, Primary School “Hristo Botev”, Ekzarh Antimovo',
      bg: 'Учител, ОУ „Христо Ботев“, с. Екзарх Антимово',
    },
    project: {
      en: 'Erasmus+ KA1 mobility project',
      bg: 'Erasmus+ KA1 проект за мобилност',
    },
    quote: {
      en: 'Working with V&A Projects made the entire Erasmus+ process feel clear and manageable. We received reliable support at every stage, from planning and preparation to the organisation of our mobility.',
      bg: 'Работата с V&A Projects направи целия Erasmus+ процес ясен и управляем. Получихме надеждна подкрепа на всеки етап - от планирането и подготовката до организацията на нашата мобилност.',
    },
  },
  {
    name: 'Alexandra Vassileva',
    role: {
      en: 'Institute of Ornamental and Medicinal Plants, Sofia, Bulgaria',
      bg: 'Институт по декоративни и лечебни растения, София, България',
    },
    project: { en: 'Horizon Europe proposal', bg: 'Horizon Europe предложение' },
    quote: {
      en: 'They helped transform a technically ambitious idea into a clear and well-organised project concept that responded directly to the call requirements and clarified partner roles.',
      bg: 'Те помогнаха технически амбициозна идея да се превърне в ясна и добре организирана проектна концепция, която отговаря директно на изискванията на поканата и изяснява ролите на партньорите.',
    },
  },
  {
    name: 'Dr. Admira Boshnyaku',
    role: { en: 'ACTA Foundation, Sofia, Bulgaria', bg: 'Фондация ACTA, София, България' },
    project: { en: 'Horizon Europe proposal', bg: 'Horizon Europe предложение' },
    quote: {
      en: 'V&A Projects is our trusted and highly committed partner. Their organisation, attention to detail and ability to bring together a diverse international consortium are essential to the quality of any final application.',
      bg: 'V&A Projects е наш доверен и силно ангажиран партньор. Тяхната организация, внимание към детайла и способност да обединяват разнообразен международен консорциум са съществени за качеството на всяка финална кандидатура.',
    },
  },
  {
    name: 'Tsvetelina Tomova',
    role: {
      en: 'Teacher, 148 Secondary School “Prof. Dr Lyubomir Miletich”, Sofia, Bulgaria',
      bg: 'Учител, 148 СУ „Проф. д-р Любомир Милетич“, София, България',
    },
    project: {
      en: 'Erasmus+ KA1 mobility project',
      bg: 'Erasmus+ KA1 проект за мобилност',
    },
    quote: {
      en: 'The preparation was clear, the documentation was carefully organised and we always knew what was expected from us. The mobility was an inspiring professional experience.',
      bg: 'Подготовката беше ясна, документацията беше внимателно организирана и винаги знаехме какво се очаква от нас. Мобилността беше вдъхновяващо професионално преживяване.',
    },
  },
  {
    name: 'Tatyana Lepoeva',
    role: {
      en: 'Principal, 135 Secondary School “Jan Amos Komensky”, Sofia, Bulgaria',
      bg: 'Директор, 135 СУ „Ян Амос Коменски“, София, България',
    },
    project: { en: 'Erasmus+ KA1 project', bg: 'Erasmus+ KA1 проект' },
    quote: {
      en: 'They understood our institutional needs and helped us translate them into clear objectives and a realistic project plan, reducing the administrative burden on our team.',
      bg: 'Те разбраха нашите институционални нужди и ни помогнаха да ги превърнем в ясни цели и реалистичен проектен план, като намалиха административната тежест за екипа ни.',
    },
  },
  {
    name: 'Dr. Kristina Stefanova',
    role: { en: 'ERI-BAS, Sofia, Bulgaria', bg: 'ЕРИ-БАН, София, България' },
    project: { en: 'Horizon Europe proposal', bg: 'Horizon Europe предложение' },
    quote: {
      en: 'Thank you for your excellent coordination and hard work in preparing our Horizon Europe proposal. It was a pleasure collaborating with you.',
      bg: 'Благодарим за отличната координация и усилената работа при подготовката на нашето Horizon Europe предложение. Беше удоволствие да работим с вас.',
    },
  },
];

const getTheme = (project: Project, lang: 'en' | 'bg') => {
  const content = getProjectContent(project, lang);
  return content.theme || content.programmeLabel;
};

export default function Projects() {
  const { lang, t } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const filters = getFilters(t('projects.allProjects'));
  const [activeFilter, setActiveFilter] = useState<ProgrammeFilter['id']>('all');

  useEffect(() => {
    let active = true;
    projectService
      .getAllProjects()
      .then((loaded) => {
        if (active) setProjects(loaded);
      })
      .catch((err) => {
        if (active) setError(err instanceof Error ? err.message : 'Could not load projects.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const filteredProjects = useMemo(
    () =>
      activeFilter === 'all'
        ? projects
        : projects.filter((project) => project.programme === activeFilter),
    [activeFilter, projects],
  );
  const featuredProject = filteredProjects[0] ?? projects[0];
  const countriesCount = new Set(projects.flatMap((project) => getProjectContent(project, lang).countries)).size;
  const programmeCount = new Set(projects.map((project) => project.programme)).size;
  const featuredContent = featuredProject ? getProjectContent(featuredProject, lang) : null;

  return (
    <>
      <Seo
        title={t('projects.title')}
        description={t('projects.lead')}
        image={ASSETS.projectsHero}
      />

      <section className={styles.hero} data-testid="projects-hero">
        <div className="container">
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <span className="eyebrow">{t('projects.eyebrow')}</span>
              <h1 className={styles.heroTitle}>
                {t('projects.heroLine1')}
                <em>{t('projects.heroLine2')}</em>
              </h1>
              <span className="dash" />
              <p className={styles.heroLead}>{t('projects.lead')}</p>
            </div>

            <div className={styles.heroSummary} aria-label="Project portfolio summary">
              <div>
                <strong>{projects.length}</strong>
                <span>{t('projects.countProjects')}</span>
              </div>
              <div>
                <strong>{programmeCount}</strong>
                <span>{t('projects.countProgrammes')}</span>
              </div>
              <div>
                <strong>{countriesCount}</strong>
                <span>{t('projects.countCountries')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.projectsSection} data-testid="projects-grid">
        <div className="container">
          <div className={styles.portfolioShell}>
            <div className={styles.filterBar} role="tablist" aria-label="Filter projects">
              {filters.map((filter) => (
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeFilter === filter.id}
                  className={activeFilter === filter.id ? styles.activeFilter : undefined}
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {loading ? (
              <LoadingState label="Loading projects..." />
            ) : error ? (
              <ErrorState message={error} />
            ) : !featuredProject ? (
              <EmptyState title="No projects yet" message="Projects will appear here when they are added." />
            ) : (
              <article className={styles.featurePanel}>
                <figure className={styles.featureImage}>
                  <img src={featuredProject.image} alt={featuredContent?.imageAlt ?? ''} />
                </figure>

                <div className={styles.featureContent}>
                  <ProgrammeBadge
                    label={featuredContent?.programmeLabel ?? ''}
                    icon={featuredProject.programme === 'life' ? 'leaf' : undefined}
                  />
                  <h2>{featuredContent?.title}</h2>
                  <p>{featuredContent?.overview}</p>

                  <div className={styles.featureFacts}>
                    <span>
                      <CalendarDays size={16} aria-hidden="true" />
                      {featuredContent?.duration}
                    </span>
                    <span>
                      <Globe2 size={16} aria-hidden="true" />
                      {featuredContent?.countries.join(', ')}
                    </span>
                    <span>
                      <Layers3 size={16} aria-hidden="true" />
                      {getTheme(featuredProject, lang)}
                    </span>
                  </div>

                  <div className={styles.featureActions}>
                    <PrimaryButton to={ROUTES.projectDetails(featuredProject.slug)}>
                      {t('cta.viewProject')}
                    </PrimaryButton>
                    <SecondaryButton to={ROUTES.programmes}>{t('projects.exploreProgrammes')}</SecondaryButton>
                  </div>
                </div>
              </article>
            )}

            <div className={styles.projectsHeader}>
              <div>
                <span className="eyebrow">{t('projects.listEyebrow')}</span>
                <h2>{t('projects.listTitle')}</h2>
              </div>
              <p>{t('projects.listText')}</p>
            </div>

            {!loading && !error ? (
              <div className={styles.projectsGrid}>
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className={styles.testimonialsSection}>
        <div className="container">
          <div className={styles.testimonialsHeader}>
            <span className="eyebrow">{t('projects.clientVoices')}</span>
            <h2>{t('projects.clientTitle')}</h2>
            <span className="dash" />
          </div>
          <div className={styles.testimonialViewport}>
            <div className={styles.testimonialTrack}>
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <article className={styles.testimonialCard} key={`${testimonial.name}-${index}`}>
                  <MessageSquareQuote size={24} strokeWidth={1.5} aria-hidden="true" />
                  <p>{loc(testimonial.quote, lang)}</p>
                  <div>
                    <strong>{testimonial.name}</strong>
                    <span>{loc(testimonial.role, lang)}</span>
                    <small>{loc(testimonial.project, lang)}</small>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.addSection}>
        <div className="container">
          <div className={styles.addPanel}>
            <FolderKanban size={26} aria-hidden="true" />
            <div>
              <span className="eyebrow">{t('projects.growingPortfolio')}</span>
              <h2>{t('projects.growingTitle')}</h2>
              <p>{t('projects.growingText')}</p>
            </div>
            <Handshake size={26} aria-hidden="true" />
          </div>
        </div>
      </section>
    </>
  );
}
