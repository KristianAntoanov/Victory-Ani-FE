import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import NewsForm from '@/components/admin/NewsForm';
import EmptyState from '@/components/common/EmptyState';
import ErrorState from '@/components/common/ErrorState';
import LoadingState from '@/components/common/LoadingState';
import { newsService } from '@/services/newsService';
import { ROUTES } from '@/constants';
import type { NewsArticle } from '@/types';
import styles from './NewsEdit.module.css';

export default function NewsEdit() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<NewsArticle | null | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setArticle(null);
      return;
    }

    let active = true;
    newsService
      .getNewsById(id)
      .then((loaded) => {
        if (active) setArticle(loaded);
      })
      .catch((err) => {
        if (!active) return;
        if (err instanceof Error) setError(err.message);
        setArticle(null);
      });

    return () => {
      active = false;
    };
  }, [id]);

  if (article === undefined) {
    return <LoadingState label="Loading article..." />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (!article) {
    return (
      <EmptyState
        title="Article not found"
        message="This article may have been deleted."
        action={
          <Link to={ROUTES.admin.news} className="btn btn--secondary">
            Back to Journal Management
          </Link>
        }
      />
    );
  }

  return (
    <div data-testid="admin-news-edit">
      <p className={styles.description}>
        Editing <strong>{article.title}</strong>.
      </p>
      <NewsForm initial={article} />
    </div>
  );
}
