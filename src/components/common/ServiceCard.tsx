import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Icon from './Icon';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  tags: string[];
  to?: string;
}

export default function ServiceCard({ title, description, icon, tags, to }: ServiceCardProps) {
  return (
    <article className="card service-card" data-testid="service-card">
      <span className="icon-circle">
        <Icon name={icon} size={28} strokeWidth={1.5} />
      </span>
      <h3 className="service-card__title">{title}</h3>
      <span className="dash" />
      <p className="service-card__desc">{description}</p>
      <div className="service-card__footer">
        <div className="tag-row">
          {tags.map((tag, i) => (
            <span key={tag} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              {i > 0 ? <span className="dot" /> : null}
              {tag}
            </span>
          ))}
        </div>
        {to ? (
          <Link to={to} className="arrow-circle" aria-label={`Learn more about ${title}`}>
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        ) : null}
      </div>
    </article>
  );
}
