import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import EmptyState from '@/components/common/EmptyState';
import ErrorState from '@/components/common/ErrorState';
import LoadingState from '@/components/common/LoadingState';
import ProjectForm from '@/components/admin/ProjectForm';
import { ROUTES } from '@/constants';
import { projectService } from '@/services/projectService';
import type { Project } from '@/types';
import styles from './ProjectEdit.module.css';

export default function ProjectEdit() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setProject(null);
      return;
    }

    let active = true;
    projectService
      .getProjectById(id)
      .then((loaded) => {
        if (active) setProject(loaded);
      })
      .catch((err) => {
        if (!active) return;
        if (err instanceof Error) setError(err.message);
        setProject(null);
      });

    return () => {
      active = false;
    };
  }, [id]);

  if (project === undefined) {
    return <LoadingState label="Loading project..." />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (!project) {
    return (
      <EmptyState
        title="Project not found"
        message="This project may have been deleted."
        action={
          <Link to={ROUTES.admin.projects} className="btn btn--secondary">
            Back to Project Management
          </Link>
        }
      />
    );
  }

  return (
    <div data-testid="admin-project-edit">
      <p className={styles.description}>
        Editing <strong>{project.title}</strong>.
      </p>
      <ProjectForm initial={project} />
    </div>
  );
}
