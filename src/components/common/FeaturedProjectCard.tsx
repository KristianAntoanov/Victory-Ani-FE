import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProgrammeBadge from './ProgrammeBadge';
import type { Project } from '@/types';
import { ROUTES } from '@/constants';
import { useLanguage } from '@/context/LanguageContext';

interface FeaturedProjectCardProps {
  project: Project;
}

export default function FeaturedProjectCard({ project }: FeaturedProjectCardProps) {
  const { t } = useLanguage();

  return (
    <article className="card featured-project" data-testid="featured-project-card">
      <Link to={ROUTES.projectDetails(project.slug)} className="featured-project__img" tabIndex={-1}>
        <img src={project.image} alt={project.imageAlt} loading="lazy" />
      </Link>
      <div className="featured-project__body">
        <ProgrammeBadge label={project.programmeLabel} icon={project.programme === 'life' ? 'leaf' : undefined} />
        <h3 className="project-mini__title" style={{ fontSize: 'var(--fs-h3)' }}>
          <Link to={ROUTES.projectDetails(project.slug)}>{project.title}</Link>
        </h3>
        <span className="dash" />
        <p className="service-card__desc">{project.intro}</p>
        <Link
          to={ROUTES.projectDetails(project.slug)}
          className="text-link"
          style={{ marginTop: 'var(--space-3)' }}
        >
          {t('cta.viewProject')} <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
