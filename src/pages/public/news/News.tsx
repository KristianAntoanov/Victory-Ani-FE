import { useEffect, useState } from 'react';
import Seo from '@/components/common/Seo';
import NewsCard from '@/components/common/NewsCard';
import ConsultationBanner from '@/components/common/ConsultationBanner';
import EmptyState from '@/components/common/EmptyState';
import ErrorState from '@/components/common/ErrorState';
import LoadingState from '@/components/common/LoadingState';
import SectionTitle from '@/components/common/SectionTitle';
import SecondaryButton from '@/components/common/SecondaryButton';
import { ASSETS } from '@/constants';
import { newsService } from '@/services/newsService';
import { useLanguage } from '@/context/LanguageContext';
import type { NewsArticle } from '@/types';
import styles from './News.module.css';

export default function News() {
  const { t } = useLanguage();
  const [published, setPublished] = useState<NewsArticle[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    newsService
      .getPublishedNews()
      .then((articles) => {
        if (active) setPublished(articles);
      })
      .catch((err) => {
        if (active) setError(err instanceof Error ? err.message : 'Could not load news.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const hasMoreArticles = published.length > 4;
  const visibleArticles = hasMoreArticles && !showAll ? published.slice(0, 4) : published;

  return (
    <>
      <Seo
        title={t('news.title')}
        description={t('news.lead')}
        image={ASSETS.newsHero}
      />

      <section className={styles.hero} data-testid="news-hero">
        <div className="container">
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <span className="eyebrow">{t('common.eyebrow')}</span>
              <h1 className={styles.heroTitle}>{t('news.title')}</h1>
              <span className="dash" />
              <p className={styles.heroLead}>{t('news.lead')}</p>
            </div>
            <div className={styles.heroVisual} aria-hidden="true" />
          </div>
        </div>
      </section>

      {loading ? (
        <section className={styles.newsSection}>
          <div className="container">
            <div className={styles.newsPanel}>
              <LoadingState label="Loading news..." />
            </div>
          </div>
        </section>
      ) : error ? (
        <section className={styles.newsSection}>
          <div className="container">
            <div className={styles.newsPanel}>
              <ErrorState message={error} />
            </div>
          </div>
        </section>
      ) : published.length === 0 ? (
        <section className={styles.newsSection}>
          <div className="container">
            <div className={styles.newsPanel}>
              <EmptyState
                title={t('news.emptyTitle')}
                message={t('news.emptyText')}
              />
            </div>
          </div>
        </section>
      ) : (
        <section className={styles.newsSection} data-testid="news-grid">
          <div className="container">
            <div className={styles.newsPanel}>
              <div className={styles.newsIntro}>
                <SectionTitle eyebrow={t('common.latestUpdates')} title={t('common.fundingInsights')} />
                <p>{t('news.introText')}</p>
              </div>

              <div className={styles.articlesBlock}>
                <div className={styles.articlesGrid}>
                  {visibleArticles.map((a) => (
                    <NewsCard key={a.id} article={a} />
                  ))}
                </div>
              </div>

              {hasMoreArticles && !showAll ? (
                <div className={styles.articlesActions}>
                  <SecondaryButton
                    type="button"
                    onClick={() => setShowAll(true)}
                    testId="news-view-all"
                  >
                    {t('cta.viewAll')}
                  </SecondaryButton>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      )}

      <ConsultationBanner variant="wide" />
    </>
  );
}
