import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Star, FileText, FileCheck2, FileClock, FolderKanban } from 'lucide-react';
import { newsService } from '@/services/newsService';
import { projectService } from '@/services/projectService';
import { ROUTES } from '@/constants';
import ErrorState from '@/components/common/ErrorState';
import LoadingState from '@/components/common/LoadingState';
import { formatDate } from '@/utils';
import type { NewsArticle, Project } from '@/types';
import styles from './AdminDashboard.module.css';

type DashboardPanel = 'journal' | 'projects';

export default function AdminDashboard() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [activePanel, setActivePanel] = useState<DashboardPanel>('journal');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const [loadedNews, loadedProjects] = await Promise.all([
          newsService.getAllNews(),
          projectService.getAllProjects(),
        ]);
        if (!active) return;
        setNews(loadedNews);
        setProjects(loadedProjects);
      } catch (err) {
        if (active) setError(err instanceof Error ? err.message : 'Could not load dashboard data.');
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  const stats = useMemo(
    () => ({
      total: news.length,
      published: news.filter((n) => n.published).length,
      drafts: news.filter((n) => !n.published).length,
      featured: news.filter((n) => n.featured).length,
      projects: projects.length,
    }),
    [news, projects],
  );

  const recentNews = useMemo(
    () =>
      [...news]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5),
    [news],
  );
  const recentProjects = useMemo(() => projects.slice(0, 5), [projects]);
  const isJournal = activePanel === 'journal';

  if (loading) {
    return <LoadingState label="Loading dashboard..." />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <div data-testid="admin-dashboard">
      <div className={styles.header}>
        <Link
          to={isJournal ? ROUTES.admin.newsCreate : ROUTES.admin.projectsCreate}
          className="btn btn--primary"
          data-testid={isJournal ? 'dashboard-add-news' : 'dashboard-add-project'}
        >
          <Plus size={18} aria-hidden="true" />
          <span>{isJournal ? 'Add Journal Article' : 'Add Project'}</span>
        </Link>
      </div>

      <div className="admin-stats">
        <div className="admin-stat" data-testid="stat-total">
          <FileText className={styles.iconBordo} size={22} aria-hidden="true" />
          <div className="admin-stat__value">{stats.total}</div>
          <div className="admin-stat__label">Total Articles</div>
        </div>
        <div className="admin-stat" data-testid="stat-published">
          <FileCheck2 className={styles.iconGreen} size={22} aria-hidden="true" />
          <div className="admin-stat__value">{stats.published}</div>
          <div className="admin-stat__label">Published</div>
        </div>
        <div className="admin-stat" data-testid="stat-drafts">
          <FileClock className={styles.iconMuted} size={22} aria-hidden="true" />
          <div className="admin-stat__value">{stats.drafts}</div>
          <div className="admin-stat__label">Drafts</div>
        </div>
        <div className="admin-stat" data-testid="stat-featured">
          <Star className={styles.iconBordo} size={22} aria-hidden="true" />
          <div className="admin-stat__value">{stats.featured}</div>
          <div className="admin-stat__label">Featured</div>
        </div>
        <div className="admin-stat" data-testid="stat-projects">
          <FolderKanban className={styles.iconGreen} size={22} aria-hidden="true" />
          <div className="admin-stat__value">{stats.projects}</div>
          <div className="admin-stat__label">Projects</div>
        </div>
      </div>

      <div className="admin-panel">
        <div className="admin-panel__head">
          <h2 className={styles.panelTitle}>
            {isJournal ? 'Recently Added Journal Articles' : 'Recently Added Projects'}
          </h2>
          <button
            type="button"
            className={`btn btn--ghost ${styles.panelSwitch}`}
            onClick={() => setActivePanel(isJournal ? 'projects' : 'journal')}
          >
            <span>{isJournal ? 'Show Projects' : 'Show Journal'}</span>
          </button>
        </div>

        {isJournal && recentNews.length === 0 ? (
          <p className={styles.emptyText}>No articles yet.</p>
        ) : null}

        {!isJournal && recentProjects.length === 0 ? (
          <p className={styles.emptyText}>No projects yet.</p>
        ) : null}

        {isJournal && recentNews.length > 0 ? (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentNews.map((a) => (
                <tr key={a.id}>
                  <td data-label="Title">
                    <Link to={ROUTES.admin.newsEdit(a.id)} className="admin-table__title">
                      {a.title}
                    </Link>
                  </td>
                  <td data-label="Category">{a.category}</td>
                  <td data-label="Date">{formatDate(a.publishDate)}</td>
                  <td data-label="Status">
                    <span className={`badge ${a.published ? 'badge--published' : 'badge--draft'}`}>
                      {a.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}

        {!isJournal && recentProjects.length > 0 ? (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Project</th>
                <th>Programme</th>
                <th>Duration</th>
                <th>Featured</th>
              </tr>
            </thead>
            <tbody>
              {recentProjects.map((project) => (
                <tr key={project.id}>
                  <td data-label="Project">
                    <Link to={ROUTES.admin.projectsEdit(project.id)} className="admin-table__title">
                      {project.title}
                    </Link>
                  </td>
                  <td data-label="Programme">{project.programmeLabel}</td>
                  <td data-label="Duration">{project.duration}</td>
                  <td data-label="Featured">
                    {project.featured ? <span className="badge badge--featured">Featured</span> : 'No'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}

        <div className={styles.panelFooter}>
          <Link to={isJournal ? ROUTES.admin.news : ROUTES.admin.projects} className="btn btn--secondary">
            View all {isJournal ? 'journal articles' : 'projects'}
          </Link>
        </div>
      </div>
    </div>
  );
}
