import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { expertiseAreas } from '@/data/expertise';
import { useLanguage } from '@/context/LanguageContext';
import { loc } from '@/i18n';
import styles from './ExpertiseAreas.module.css';

interface ExpertiseAreasProps {
  title: string;
  description: string;
  eyebrow?: string;
  id?: string;
  compactOnMobile?: boolean;
}

export default function ExpertiseAreas({
  title,
  description,
  eyebrow,
  id,
  compactOnMobile = false,
}: ExpertiseAreasProps) {
  const { lang, t } = useLanguage();
  const [showAll, setShowAll] = useState(false);
  const gridId = id ? `${id}-grid` : undefined;

  return (
    <section className={styles.section} id={id}>
      <div className="container">
        <div className={styles.header}>
          <div>
            {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
            <h2>{title}</h2>
            <span className="dash" />
          </div>
          <p>{description}</p>
        </div>

        <div
          className={`${styles.grid} ${compactOnMobile && !showAll ? styles.compactMobile : ''}`.trim()}
          id={gridId}
        >
          {expertiseAreas.map((area) => {
            const AreaIcon = area.icon;
            return (
              <article className={styles.card} key={area.title.en}>
                <span className={styles.icon}>
                  <AreaIcon size={25} strokeWidth={1.6} aria-hidden="true" />
                </span>
                <div>
                  <h3>{loc(area.title, lang)}</h3>
                  <p>{loc(area.text, lang)}</p>
                </div>
              </article>
            );
          })}
        </div>

        {compactOnMobile ? (
          <button
            type="button"
            className={styles.mobileToggle}
            aria-expanded={showAll}
            aria-controls={gridId}
            onClick={() => setShowAll((current) => !current)}
          >
            {showAll ? t('common.showFewerAreas') : t('common.showAllAreas')}
            <ChevronDown size={18} aria-hidden="true" />
          </button>
        ) : null}
      </div>
    </section>
  );
}
