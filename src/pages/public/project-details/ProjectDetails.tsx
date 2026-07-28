import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CalendarDays, ChevronRight, Globe2, Handshake, Landmark } from 'lucide-react';
import Seo from '@/components/common/Seo';
import ProgrammeBadge from '@/components/common/ProgrammeBadge';
import ProjectCard from '@/components/common/ProjectCard';
import EmptyState from '@/components/common/EmptyState';
import ErrorState from '@/components/common/ErrorState';
import LoadingState from '@/components/common/LoadingState';
import SecondaryButton from '@/components/common/SecondaryButton';
import { ROUTES } from '@/constants';
import { projectService } from '@/services/projectService';
import { useLanguage } from '@/context/LanguageContext';
import { getProjectContent } from '@/utils/localizedContent';
import type { Project } from '@/types';
import styles from './ProjectDetails.module.css';

export default function ProjectDetails() {
  const { slug } = useParams<{ slug: string }>();
  const { lang, t } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [project, setProject] = useState<Project | null | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [readingProgress, setReadingProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!slug) {
      setProject(null);
      return;
    }

    let active = true;
    projectService
      .getAllProjects()
      .then((loaded) => {
        if (!active) return;
        setProjects(loaded);
        setProject(loaded.find((item) => item.slug === slug) ?? null);
      })
      .catch((err) => {
        if (!active) return;
        setError(err instanceof Error ? err.message : 'Could not load project.');
        setProject(null);
      });

    return () => {
      active = false;
    };
  }, [slug]);

  useEffect(() => {
    const updateProgress = () => {
      const element = contentRef.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      setReadingProgress(Math.round((scrolled / Math.max(total, 1)) * 100));
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, [project]);

  if (project === undefined) {
    return (
      <section className="section">
        <div className="container">
          <LoadingState label="Loading project..." />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section">
        <div className="container">
          <ErrorState message={error} />
        </div>
      </section>
    );
  }

  if (!project) {
    return (
      <section className="section">
        <div className="container">
          <EmptyState
            title={t('projectDetail.notFoundTitle')}
            message={t('projectDetail.notFoundText')}
            action={
              <Link to={ROUTES.projects} className="btn btn--secondary">
                {t('cta.backToProjects')}
              </Link>
            }
          />
        </div>
      </section>
    );
  }

  const related = projects.filter((p) => p.id !== project.id && p.programme === project.programme).slice(0, 3);
  const relatedFallback = related.length > 0 ? related : projects.filter((p) => p.id !== project.id).slice(0, 3);
  const content = getProjectContent(project, lang);

  return (
    <>
      <Seo title={content.title} description={content.intro} image={project.image} />

      <section className={styles.hero}>
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to={ROUTES.home}>{t('common.home')}</Link>
            <ChevronRight size={14} className="sep" aria-hidden="true" />
            <Link to={ROUTES.projects}>{t('nav.projects')}</Link>
            <ChevronRight size={14} className="sep" aria-hidden="true" />
            <span>{content.title}</span>
          </nav>

          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <ProgrammeBadge
                label={content.programmeLabel}
                icon={project.programme === 'life' ? 'leaf' : undefined}
              />
              <h1 className={styles.title}>{content.title}</h1>
              <p className={styles.lead}>{content.intro}</p>
              <div className={styles.heroMeta}>
                <span>
                  <CalendarDays size={16} aria-hidden="true" />
                  {content.duration}
                </span>
                <span>
                  <Globe2 size={16} aria-hidden="true" />
                  {content.countries.length} {t('projects.countCountries')}
                </span>
                <span>
                  <Handshake size={16} aria-hidden="true" />
                  {content.partners.length} {t('projectDetail.partners').toLowerCase()}
                </span>
              </div>
            </div>

            <figure className={styles.heroImage}>
              <img src={project.image} alt={content.imageAlt} />
            </figure>
          </div>
        </div>
      </section>

      <section className={styles.detailSection}>
        <div className="container">
          <div className={styles.detailLayout}>
            <aside className={styles.projectAside}>
              <div className={styles.progressCard}>
                <span className={styles.progressLabel}>{t('common.readingProgress')}</span>
                <div className={styles.progressBar}>
                  <span style={{ width: `${readingProgress}%` }} />
                </div>
                <strong>{readingProgress}%</strong>
              </div>

              <div className={styles.factCard}>
                <span className={styles.factIcon}>
                  <Landmark size={24} aria-hidden="true" />
                </span>
                <span className={styles.factLabel}>{t('projectDetail.programme')}</span>
                <strong>{content.programmeLabel}</strong>
              </div>

              <dl className={styles.metaList}>
                <div>
                  <dt>{t('projectDetail.duration')}</dt>
                  <dd>{content.duration}</dd>
                </div>
                <div>
                  <dt>{t('projectDetail.countries')}</dt>
                  <dd>{content.countries.join(', ')}</dd>
                </div>
                <div>
                  <dt>{t('projectDetail.partners')}</dt>
                  <dd>{content.partners.join(', ')}</dd>
                </div>
              </dl>
            </aside>

            <div className={styles.contentPanel} ref={contentRef}>
              <section className={styles.overviewBlock}>
                <span className="eyebrow">{t('projectDetail.overview')}</span>
                <h2>{t('projectDetail.impactTitle')}</h2>
                <p>{content.overview}</p>
              </section>

              <div className={styles.infoGrid}>
                <section className={styles.infoCard}>
                  <h3>{t('projectDetail.objectives')}</h3>
                  <ul>
                    {content.objectives.map((o) => (
                      <li key={o}>{o}</li>
                    ))}
                  </ul>
                </section>

                <section className={styles.infoCard}>
                  <h3>{t('projectDetail.activities')}</h3>
                  <ul>
                    {content.activities.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>
                </section>

                <section className={`${styles.infoCard} ${styles.resultsCard}`}>
                  <h3>{t('projectDetail.results')}</h3>
                  <ul>
                    {content.results.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </section>
              </div>

              <div className={styles.detailActions}>
                <SecondaryButton to={ROUTES.projects} icon={ArrowLeft}>
                  {t('cta.backToProjects')}
                </SecondaryButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.relatedSection} data-testid="related-projects">
        <div className="container">
          <div className={styles.relatedPanel}>
            <div className={styles.relatedIntro}>
              <span className="eyebrow">{t('common.keepExploring')}</span>
              <h2>{t('common.relatedProjects')}</h2>
              <span className="dash" />
            </div>
            <div className={styles.relatedGrid}>
              {relatedFallback.slice(0, 2).map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
