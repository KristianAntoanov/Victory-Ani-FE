import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import EmptyState from '@/components/common/EmptyState';
import ErrorState from '@/components/common/ErrorState';
import LoadingState from '@/components/common/LoadingState';
import Seo from '@/components/common/Seo';
import { ROUTES } from '@/constants';
import { useLanguage } from '@/context/LanguageContext';
import { projectService } from '@/services/projectService';
import type { Project } from '@/types';
import { getProjectContent } from '@/utils/localizedContent';
import styles from './ProjectDetails.module.css';

interface ContentListProps {
  title: string;
  items: string[];
}

function ContentList({ title, items }: ContentListProps) {
  if (!items.length) return null;

  return (
    <section className={styles.contentSection}>
      <h2>{title}</h2>
      <ul>
        {items.map((item, index) => (
          <li key={`${item}-${index}`}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export default function ProjectDetails() {
  const { slug } = useParams<{ slug: string }>();
  const { lang, t } = useLanguage();
  const [project, setProject] = useState<Project | null | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setProject(null);
      return;
    }

    let active = true;
    projectService
      .getProjectBySlug(slug)
      .then((loaded) => {
        if (active) setProject(loaded ?? null);
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

  const content = getProjectContent(project, lang);
  const metadata = [
    { label: t('projectDetail.programme'), value: content.programmeLabel },
    { label: t('projectDetail.duration'), value: content.duration },
    { label: t('projectDetail.countries'), value: content.countries.join(', ') },
    { label: t('projectDetail.theme'), value: content.theme },
  ].filter((item) => item.value.trim());

  return (
    <>
      <Seo
        title={content.title}
        description={content.intro || content.overview}
        image={project.image || undefined}
      />

      <article className={styles.article}>
        <div className={styles.articleInner}>
          <Link to={ROUTES.projects} className={styles.backLink}>
            <ArrowLeft size={18} aria-hidden="true" />
            {t('cta.backToProjects')}
          </Link>

          <header className={styles.header}>
            {content.programmeLabel ? <span className="eyebrow">{content.programmeLabel}</span> : null}
            <h1>{content.title}</h1>
            {content.intro ? <p>{content.intro}</p> : null}
          </header>

          {project.image ? (
            <figure className={styles.image}>
              <img src={project.image} alt={content.imageAlt} />
            </figure>
          ) : null}

          {metadata.length ? (
            <dl className={styles.metadata}>
              {metadata.map((item) => (
                <div key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          {content.overview ? (
            <section className={styles.contentSection}>
              <h2>{t('projectDetail.overview')}</h2>
              <p>{content.overview}</p>
            </section>
          ) : null}

          <ContentList title={t('projectDetail.objectives')} items={content.objectives} />
          <ContentList
            title={t('projectDetail.activities')}
            items={project.activities?.length ? content.activities : []}
          />
          <ContentList title={t('projectDetail.outputs')} items={content.outputs} />
          <ContentList title={t('projectDetail.results')} items={content.results} />
          <ContentList title={t('projectDetail.partners')} items={content.partners} />

          <Link to={ROUTES.projects} className={styles.backLinkBottom}>
            <ArrowLeft size={18} aria-hidden="true" />
            {t('cta.backToProjects')}
          </Link>
        </div>
      </article>
    </>
  );
}
