import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, Eye, EyeOff, Star, ExternalLink } from 'lucide-react';
import { newsService } from '@/services/newsService';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import EmptyState from '@/components/common/EmptyState';
import ErrorState from '@/components/common/ErrorState';
import LoadingState from '@/components/common/LoadingState';
import { ROUTES, NEWS_CATEGORIES } from '@/constants';
import { formatDate } from '@/utils';
import { useToast } from '@/context/ToastContext';
import type { NewsArticle } from '@/types';
import styles from './AdminNews.module.css';

type StatusFilter = 'all' | 'published' | 'draft';
type SortOrder = 'newest' | 'oldest';

export default function AdminNews() {
  const toast = useToast();
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<StatusFilter>('all');
  const [category, setCategory] = useState<string>('all');
  const [sort, setSort] = useState<SortOrder>('newest');
  const [toDelete, setToDelete] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    const articles = await newsService.getAllNews();
    setNews(articles);
  };

  useEffect(() => {
    refresh()
      .catch((err) => setError(err instanceof Error ? err.message : 'Could not load articles.'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    let list = [...news];
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((n) => n.title.toLowerCase().includes(q));
    }
    if (status !== 'all') {
      list = list.filter((n) => (status === 'published' ? n.published : !n.published));
    }
    if (category !== 'all') {
      list = list.filter((n) => n.category === category);
    }
    list.sort((a, b) => {
      const da = new Date(a.publishDate).getTime();
      const db = new Date(b.publishDate).getTime();
      return sort === 'newest' ? db - da : da - db;
    });
    return list;
  }, [news, search, status, category, sort]);

  const handleTogglePublished = async (article: NewsArticle) => {
    try {
      await newsService.togglePublished(article.id);
      await refresh();
      toast.info(article.published ? 'Article hidden (set to draft).' : 'Article published.');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not update article.');
    }
  };

  const handleToggleFeatured = async (article: NewsArticle) => {
    try {
      await newsService.toggleFeatured(article.id);
      await refresh();
      toast.info(article.featured ? 'Removed from featured.' : 'Marked as featured.');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not update article.');
    }
  };

  const confirmDelete = async () => {
    if (!toDelete) return;
    try {
      await newsService.deleteNews(toDelete.id);
      setToDelete(null);
      await refresh();
      toast.success('Article deleted.');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not delete article.');
    }
  };

  if (loading) {
    return <LoadingState label="Loading articles..." />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <div data-testid="admin-news">
      <div className={styles.header}>
        <p className={styles.description}>
          Create, edit, publish and feature journal articles. Changes are saved through the backend API and appear on the
          public Our Journal page.
        </p>
        <Link to={ROUTES.admin.newsCreate} className="btn btn--primary" data-testid="news-add-button">
          <Plus size={18} aria-hidden="true" /> <span>Add Journal Article</span>
        </Link>
      </div>

      <div className="admin-panel">
        <div className="admin-toolbar">
          <input
            className="search"
            type="search"
            placeholder="Search by title…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search by title"
            data-testid="news-search"
          />
          <select value={status} onChange={(e) => setStatus(e.target.value as StatusFilter)} aria-label="Filter by status" data-testid="news-filter-status">
            <option value="all">All statuses</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
          </select>
          <select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Filter by category" data-testid="news-filter-category">
            <option value="all">All categories</option>
            {NEWS_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value as SortOrder)} aria-label="Sort by date" data-testid="news-sort">
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            title="No articles found"
            message="Try adjusting your filters, or add a new article."
          />
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Article</th>
                <th>Category</th>
                <th>Publish Date</th>
                <th>Last Updated</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.id} data-testid={`news-row-${a.slug}`}>
                  <td data-label="Article">
                    <div className={styles.articleCell}>
                      <img className="admin-table__thumb" src={a.image} alt="" />
                      <span className="admin-table__title">{a.title}</span>
                      {a.featured ? <span className="badge badge--featured"><Star size={12} /> Featured</span> : null}
                    </div>
                  </td>
                  <td data-label="Category">{a.category}</td>
                  <td data-label="Publish Date">{formatDate(a.publishDate)}</td>
                  <td data-label="Last Updated">{formatDate(a.updatedAt)}</td>
                  <td data-label="Status">
                    <span className={`badge ${a.published ? 'badge--published' : 'badge--draft'}`}>
                      {a.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td data-label="Actions">
                    <div className="row-actions">
                      <button
                        type="button"
                        className={`icon-btn${a.featured ? ' is-on' : ''}`}
                        title={a.featured ? 'Unfeature' : 'Mark as featured'}
                        aria-label={a.featured ? 'Unfeature article' : 'Mark article as featured'}
                        onClick={() => handleToggleFeatured(a)}
                        data-testid={`feature-toggle-${a.slug}`}
                      >
                        <Star size={16} aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        className="icon-btn"
                        title={a.published ? 'Unpublish' : 'Publish'}
                        aria-label={a.published ? 'Unpublish article' : 'Publish article'}
                        onClick={() => handleTogglePublished(a)}
                        data-testid={`publish-toggle-${a.slug}`}
                      >
                        {a.published ? <EyeOff size={16} aria-hidden="true" /> : <Eye size={16} aria-hidden="true" />}
                      </button>
                      <a
                        href={ROUTES.newsDetails(a.slug)}
                        target="_blank"
                        rel="noreferrer"
                        className="icon-btn"
                        title="Preview"
                        aria-label="Preview article"
                        data-testid={`preview-${a.slug}`}
                      >
                        <ExternalLink size={16} aria-hidden="true" />
                      </a>
                      <Link
                        to={ROUTES.admin.newsEdit(a.id)}
                        className="icon-btn"
                        title="Edit"
                        aria-label="Edit article"
                        data-testid={`edit-${a.slug}`}
                      >
                        <Pencil size={16} aria-hidden="true" />
                      </Link>
                      <button
                        type="button"
                        className="icon-btn icon-btn--danger"
                        title="Delete"
                        aria-label="Delete article"
                        onClick={() => setToDelete(a)}
                        data-testid={`delete-${a.slug}`}
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
        title="Delete article?"
        message={`"${toDelete?.title}" will be permanently removed. This action cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </div>
  );
}
