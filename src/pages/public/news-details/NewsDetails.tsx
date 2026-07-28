import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CalendarDays, ChevronRight, Clipboard, Clock, UserRound } from 'lucide-react';
import Seo from '@/components/common/Seo';
import NewsCard from '@/components/common/NewsCard';
import EmptyState from '@/components/common/EmptyState';
import ErrorState from '@/components/common/ErrorState';
import LoadingState from '@/components/common/LoadingState';
import SecondaryButton from '@/components/common/SecondaryButton';
import { newsService } from '@/services/newsService';
import { ROUTES } from '@/constants';
import { formatDate } from '@/utils';
import { useLanguage } from '@/context/LanguageContext';
import { getNewsContent } from '@/utils/localizedContent';
import type { NewsArticle } from '@/types';
import styles from './NewsDetails.module.css';

export default function NewsDetails() {
  const { slug } = useParams<{ slug: string }>();
  const { lang, t } = useLanguage();
  const [article, setArticle] = useState<NewsArticle | null | undefined>(undefined);
  const [related, setRelated] = useState<NewsArticle[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [readingProgress, setReadingProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const articleRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!slug) return;
    const articleSlug = slug;
    let active = true;

    async function load() {
      try {
        const [found, allPublished] = await Promise.all([
          newsService.getNewsBySlug(articleSlug),
          newsService.getPublishedNews(),
        ]);
        if (!active) return;

        if (found && found.published) {
          setArticle(found);
          const categoryMatches = allPublished.filter(
            (a) => a.id !== found.id && a.category === found.category,
          );
          const fallback = allPublished.filter((a) => a.id !== found.id);
          setRelated((categoryMatches.length > 0 ? categoryMatches : fallback).slice(0, 2));
        } else {
          setArticle(null);
        }
      } catch (err) {
        if (!active) return;
        setError(err instanceof Error ? err.message : 'Could not load article.');
        setArticle(null);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, [slug]);

  useEffect(() => {
    const updateProgress = () => {
      const element = articleRef.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      setReadingProgress(Math.round((scrolled / Math.max(total, 1)) * 100));
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, [article]);

  if (article === undefined) {
    return (
      <section className="section">
        <div className="container">
          <LoadingState label="Loading article..." />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section">
        <div className="container">
          <ErrorState message={error} />
        </div>
      </section>
    );
  }

  if (article === null) {
    return (
      <section className="section">
        <div className="container">
          <EmptyState
            title={t('news.notFoundTitle')}
            message={t('news.notFoundText')}
            action={
              <Link to={ROUTES.news} className="btn btn--secondary">
                {t('cta.backToNews')}
              </Link>
            }
          />
        </div>
      </section>
    );
  }

  const content = getNewsContent(article, lang);
  const paragraphs = content.content.split(/\n\s*\n/).filter(Boolean);
  const wordCount = content.content.trim().split(/\s+/).filter(Boolean).length;
  const readingMinutes = Math.max(1, Math.ceil(wordCount / 220));
  const shareArticle = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <>
      <Seo title={content.title} description={content.summary} image={article.image} />

      <section className={styles.hero}>
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to={ROUTES.home}>{t('common.home')}</Link>
            <ChevronRight size={14} className="sep" aria-hidden="true" />
            <Link to={ROUTES.news}>{t('news.title')}</Link>
            <ChevronRight size={14} className="sep" aria-hidden="true" />
            <span>{content.title}</span>
          </nav>

          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <span className="news-tag">{article.category}</span>
              <h1 className={styles.title}>{content.title}</h1>
              <p className={styles.lead}>{content.summary}</p>
              <div className={styles.heroMeta}>
                <span>
                  <CalendarDays size={16} aria-hidden="true" />
                  {formatDate(article.publishDate, lang)}
                </span>
                <span>
                  <UserRound size={16} aria-hidden="true" />
                  {article.author}
                </span>
                <span>
                  <Clock size={16} aria-hidden="true" />
                  {readingMinutes} {t('news.minRead')}
                </span>
              </div>
            </div>

            <figure className={styles.heroImage}>
              <img src={article.image} alt={content.title} />
            </figure>
          </div>
        </div>
      </section>

      <section className={styles.articleSection}>
        <div className="container">
          <div className={styles.articleLayout}>
            <aside className={styles.articleAside}>
              <div className={styles.progressCard}>
                <span className={styles.progressLabel}>{t('common.readingProgress')}</span>
                <div className={styles.progressBar}>
                  <span style={{ width: `${readingProgress}%` }} />
                </div>
                <strong>{readingProgress}%</strong>
              </div>

              <dl className={styles.metaList}>
                <div>
                  <dt>{t('news.category')}</dt>
                  <dd>{article.category}</dd>
                </div>
                <div>
                  <dt>{t('news.published')}</dt>
                  <dd>{formatDate(article.publishDate, lang)}</dd>
                </div>
                <div>
                  <dt>{t('news.author')}</dt>
                  <dd>{article.author}</dd>
                </div>
              </dl>

              <button className={styles.copyButton} type="button" onClick={shareArticle}>
                <Clipboard size={16} aria-hidden="true" />
                {copied ? t('news.copied') : t('news.copyLink')}
              </button>
            </aside>

            <article className={styles.articleBody} ref={articleRef}>
              <p className={styles.articleDescription}>{content.summary}</p>

              {paragraphs.map((p, i) => (
                <p className={i === 0 ? styles.firstParagraph : undefined} key={i}>
                  {p}
                </p>
              ))}

              <div className={styles.articleFooter}>
                <SecondaryButton to={ROUTES.news}>{t('cta.backToNews')}</SecondaryButton>
              </div>
            </article>
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section className={styles.relatedSection} data-testid="related-news">
          <div className="container">
            <div className={styles.relatedPanel}>
              <div className={styles.relatedIntro}>
                <span className="eyebrow">{t('common.keepReading')}</span>
                <h2>{t('common.relatedArticles')}</h2>
                <span className="dash" />
              </div>
              <div className={styles.relatedGrid}>
                {related.map((a) => (
                  <NewsCard key={a.id} article={a} />
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
