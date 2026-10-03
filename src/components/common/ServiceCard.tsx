import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Icon from './Icon';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  to?: string;
  linkLabel?: string;
}

export default function ServiceCard({ title, description, icon, to, linkLabel }: ServiceCardProps) {
  return (
    <article className="card service-card" data-testid="service-card">
      <span className="icon-circle">
        <Icon name={icon} size={28} strokeWidth={1.5} />
      </span>
      <h3 className="service-card__title">{title}</h3>
      <span className="dash" />
      <p className="service-card__desc">{description}</p>
      {to ? (
        <Link to={to} className="arrow-circle" aria-label={linkLabel ?? `Learn more about ${title}`}>
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
      ) : null}
    </article>
  );
}
