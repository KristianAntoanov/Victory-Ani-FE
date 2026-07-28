import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Eye, EyeOff, Pencil, Plus, Trash2 } from 'lucide-react';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import EmptyState from '@/components/common/EmptyState';
import ErrorState from '@/components/common/ErrorState';
import LoadingState from '@/components/common/LoadingState';
import { ROUTES } from '@/constants';
import { projectService } from '@/services/projectService';
import { useToast } from '@/context/ToastContext';
import type { ProgrammeKey, Project } from '@/types';
import styles from './AdminProjects.module.css';

type ProgrammeFilter = ProgrammeKey | 'all';

const PROGRAMMES: Array<{ value: ProgrammeFilter; label: string }> = [
  { value: 'all', label: 'All programmes' },
  { value: 'horizon', label: 'Horizon Europe' },
  { value: 'erasmus', label: 'Erasmus+' },
  { value: 'life', label: 'LIFE' },
  { value: 'cerv', label: 'CERV' },
];

export default function AdminProjects() {
  const toast = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState('');
  const [programme, setProgramme] = useState<ProgrammeFilter>('all');
  const [toDelete, setToDelete] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    const items = await projectService.getAllAdminProjects();
    setProjects(items);
  };

  useEffect(() => {
    refresh()
      .catch((err) => setError(err instanceof Error ? err.message : 'Could not load projects.'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    let list = [...projects];
    if (search.trim()) {
      const query = search.trim().toLowerCase();
      list = list.filter(
        (project) =>
          project.title.toLowerCase().includes(query) ||
          project.titleBg.toLowerCase().includes(query) ||
          project.titleEn.toLowerCase().includes(query),
      );
    }
    if (programme !== 'all') {
      list = list.filter((project) => project.programme === programme);
    }
    return list;
  }, [projects, search, programme]);

  const handleToggleActive = async (project: Project) => {
    try {
      await projectService.toggleActive(project.id);
      await refresh();
      toast.info(project.isActive ? 'Project hidden from public pages.' : 'Project made active.');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not update project.');
    }
  };

  const confirmDelete = async () => {
    if (!toDelete) return;
    try {
      await projectService.deleteProject(toDelete.id);
      setToDelete(null);
      await refresh();
      toast.success('Project deleted.');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not delete project.');
    }
  };

  if (loading) {
    return <LoadingState label="Loading projects..." />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <div data-testid="admin-projects">
      <div className={styles.header}>
        <p className={styles.description}>
          Create, edit and manage projects. Changes are saved through the backend API and appear on the public Projects pages.
        </p>
        <Link to={ROUTES.admin.projectsCreate} className="btn btn--primary">
          <Plus size={18} aria-hidden="true" /> <span>Add Project</span>
        </Link>
      </div>

      <div className="admin-panel">
        <div className="admin-toolbar">
          <input
            className="search"
            type="search"
            placeholder="Search by title..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search by title"
          />
          <select
            value={programme}
            onChange={(event) => setProgramme(event.target.value as ProgrammeFilter)}
            aria-label="Filter by programme"
          >
            {PROGRAMMES.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        {filtered.length === 0 ? (
          <EmptyState title="No projects found" message="Try adjusting your filters, or add a new project." />
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Project</th>
                <th>Programme</th>
                <th>Duration</th>
                <th>Countries</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((project) => (
                <tr key={project.id}>
                  <td data-label="Project">
                    <div className={styles.projectCell}>
                      <img className="admin-table__thumb" src={project.image} alt="" />
                      <span className="admin-table__title">{project.title}</span>
                    </div>
                  </td>
                  <td data-label="Programme">{project.programmeLabel}</td>
                  <td data-label="Duration">{project.duration}</td>
                  <td data-label="Countries">{project.countries}</td>
                  <td data-label="Status">
                    <span className={`badge ${project.isActive ? 'badge--published' : 'badge--draft'}`}>
                      {project.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td data-label="Actions">
                    <div className="row-actions">
                      <button
                        type="button"
                        className={`icon-btn${project.isActive ? ' is-on' : ''}`}
                        title={project.isActive ? 'Deactivate' : 'Activate'}
                        aria-label={project.isActive ? 'Deactivate project' : 'Activate project'}
                        onClick={() => handleToggleActive(project)}
                      >
                        {project.isActive ? <Eye size={16} aria-hidden="true" /> : <EyeOff size={16} aria-hidden="true" />}
                      </button>
                      <a
                        href={ROUTES.projectDetails(project.slug)}
                        target="_blank"
                        rel="noreferrer"
                        className="icon-btn"
                        title="Preview"
                        aria-label="Preview project"
                      >
                        <ExternalLink size={16} aria-hidden="true" />
                      </a>
                      <Link
                        to={ROUTES.admin.projectsEdit(project.id)}
                        className="icon-btn"
                        title="Edit"
                        aria-label="Edit project"
                      >
                        <Pencil size={16} aria-hidden="true" />
                      </Link>
                      <button
                        type="button"
                        className="icon-btn icon-btn--danger"
                        title="Delete"
                        aria-label="Delete project"
                        onClick={() => setToDelete(project)}
                      >
                        <Trash2 size={16} aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <ConfirmDialog
        open={toDelete !== null}
        title="Delete project?"
        message={`"${toDelete?.title}" will be permanently removed. This action cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </div>
  );
}
