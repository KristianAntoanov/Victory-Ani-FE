import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProgrammeBadge from './ProgrammeBadge';
import type { Project } from '@/types';
import { ROUTES } from '@/constants';
import { useLanguage } from '@/context/LanguageContext';
import { getProjectContent } from '@/utils/localizedContent';

interface ProjectCardProps {
  project: Project;
}

/** Compact project card with image, badge, title and short description. */
export default function ProjectCard({ project }: ProjectCardProps) {
  const { lang, t } = useLanguage();
  const content = getProjectContent(project, lang);

  return (
    <article className="card project-mini" data-testid={`project-card-${project.slug}`}>
      <Link to={ROUTES.projectDetails(project.slug)} className="project-mini__img" tabIndex={-1}>
        <img src={project.image} alt={content.imageAlt} loading="lazy" />
      </Link>
      <div className="project-mini__body">
        <ProgrammeBadge label={content.programmeLabel} icon={project.programme === 'life' ? 'leaf' : undefined} />
        <h3 className="project-mini__title">
          <Link to={ROUTES.projectDetails(project.slug)}>{content.title}</Link>
        </h3>
        <p className="service-card__desc">{content.shortDescription}</p>
        <div className="project-mini__row">
          <Link to={ROUTES.projectDetails(project.slug)} className="text-link">
            {t('cta.viewProject')} <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
