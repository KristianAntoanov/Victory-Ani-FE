import { useEffect, useState } from 'react';
import { MessageSquareQuote } from 'lucide-react';
import Seo from '@/components/common/Seo';
import ProjectCard from '@/components/common/ProjectCard';
import EmptyState from '@/components/common/EmptyState';
import ErrorState from '@/components/common/ErrorState';
import LoadingState from '@/components/common/LoadingState';
import { ASSETS } from '@/constants';
import { getTestimonials } from '@/data/testimonials';
import { projectService } from '@/services/projectService';
import { useLanguage } from '@/context/LanguageContext';
import { getProjectContent } from '@/utils/localizedContent';
import type { Project } from '@/types';
import styles from './Projects.module.css';

export default function Projects() {
  const { lang, t } = useLanguage();
  const testimonials = getTestimonials(lang);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const countriesCount = new Set(projects.flatMap((project) => getProjectContent(project, lang).countries)).size;
  const programmeCount = new Set(projects.map((project) => project.programme)).size;

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
              <h1 className={styles.heroTitle}>
                {t('projects.heroLine1')}
                {' '}
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
            {loading ? (
              <LoadingState label="Loading projects..." />
            ) : error ? (
              <ErrorState message={error} />
            ) : projects.length === 0 ? (
              <EmptyState title="No projects yet" message="Projects will appear here when they are added." />
            ) : (
              <div className={styles.projectsGrid}>
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className={styles.testimonialsSection}>
        <div className="container">
          <div className={styles.testimonialsHeader}>
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
    </>
  );
}
