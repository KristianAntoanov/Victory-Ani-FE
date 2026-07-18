import { Link } from 'react-router-dom';
import Seo from '@/components/common/Seo';
import { ROUTES } from '@/constants';
import { useLanguage } from '@/context/LanguageContext';
import styles from './NotFound.module.css';

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <>
      <Seo title={t('notFound.subtitle')} description={t('notFound.text')} />
      <section className="section">
        <div className={`container ${styles.notFound}`} data-testid="notfound-page">
          <div>
            <h1 className={styles.code}>404</h1>
            <h2 className={styles.title}>{t('notFound.subtitle')}</h2>
            <p className={styles.text}>{t('notFound.text')}</p>
            <div className={styles.actions}>
              <Link to={ROUTES.home} className="btn btn--primary">
                {t('cta.backHome')}
              </Link>
              <Link to={ROUTES.contact} className="btn btn--secondary">
                {t('cta.contactUs')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
