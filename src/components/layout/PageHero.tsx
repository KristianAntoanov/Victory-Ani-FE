import { ASSETS } from '@/constants';
import { useLanguage } from '@/context/LanguageContext';

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  lead?: string;
  image?: string;
  imageAlt?: string;
}

export default function PageHero({
  eyebrow,
  title,
  lead,
  image = ASSETS.heroArchitecture,
  imageAlt = 'Architectural collage of European institutional buildings with EU flags',
}: PageHeroProps) {
  const { t } = useLanguage();

  return (
    <section
      className="page-hero"
      style={{ backgroundImage: `url(${image})` }}
      role="img"
      aria-label={imageAlt}
      data-testid="page-hero"
    >
      <div className="page-hero__scrim" aria-hidden="true" />
      <div className="container">
        <div className="page-hero__content">
          <span className="eyebrow">{eyebrow ?? t('common.eyebrow')}</span>
          <h1 className="page-hero__title">{title}</h1>
          <span className="dash" />
          {lead ? <p className="page-hero__lead">{lead}</p> : null}
        </div>
      </div>
    </section>
  );
}
