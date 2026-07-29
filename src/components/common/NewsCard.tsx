import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { NewsArticle } from '@/types';
import { ROUTES } from '@/constants';
import { formatDate } from '@/utils';
import { useLanguage } from '@/context/LanguageContext';
import { getNewsContent } from '@/utils/localizedContent';

interface NewsCardProps {
  article: NewsArticle;
}

export default function NewsCard({ article }: NewsCardProps) {
  const { lang } = useLanguage();
  const content = getNewsContent(article, lang);

  return (
    <article className="card news-card" data-testid={`news-card-${article.slug}`}>
      <Link to={ROUTES.newsDetails(article.slug)} className="news-card__img" tabIndex={-1}>
        <img src={article.image} alt={content.title} loading="lazy" />
      </Link>
      <div className="news-card__body">
        <div className="featured-news__meta">
          <span className="news-date">{formatDate(article.publishDate, lang)}</span>
        </div>
        <h3 className="news-card__title">
          <Link to={ROUTES.newsDetails(article.slug)}>{content.title}</Link>
        </h3>
        <p className="service-card__desc">{content.summary}</p>
        <div className="news-card__footer">
          <span className="news-date">{article.author}</span>
          <Link
            to={ROUTES.newsDetails(article.slug)}
            className="arrow-circle"
            aria-label={`Read ${content.title}`}
          >
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
