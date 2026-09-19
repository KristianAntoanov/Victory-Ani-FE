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
import { getTestimonials } from '@/data/testimonials';
import { projectService } from '@/services/projectService';
import { useLanguage } from '@/context/LanguageContext';
import { getProjectContent } from '@/utils/localizedContent';
import type { ProgrammeKey, Project } from '@/types';
import styles from './Projects.module.css';

interface ProgrammeFilter {
  id: ProgrammeKey | 'all';
  label: string;
}

const getFilters = (allLabel: string): ProgrammeFilter[] => [
  { id: 'all', label: allLabel },
  { id: 'erasmus', label: 'Erasmus+' },
  { id: 'horizon', label: 'Horizon Europe' },
  { id: 'life', label: 'LIFE' },
  { id: 'cerv', label: 'CERV' },
];

const getTheme = (project: Project, lang: 'en' | 'bg') => {
  const content = getProjectContent(project, lang);
  return content.theme || content.programmeLabel;
};

export default function Projects() {
  const { lang, t } = useLanguage();
  const testimonials = getTestimonials(lang);
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
                  <p>{testimonial.quote}</p>
                  <div>
                    <strong>{testimonial.name}</strong>
                    <span>{testimonial.organisation}</span>
                    <small>{testimonial.project}</small>
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
