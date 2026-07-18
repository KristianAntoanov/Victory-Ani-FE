import NewsForm from '@/components/admin/NewsForm';
import styles from './NewsCreate.module.css';

export default function NewsCreate() {
  return (
    <div data-testid="admin-news-create">
      <p className={styles.description}>
        Add a new article. It will be saved through the backend API and shown on the
        public Our Journal page when published.
      </p>
      <NewsForm />
    </div>
  );
}
