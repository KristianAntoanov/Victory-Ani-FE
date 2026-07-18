import { organisations } from '@/data/organisations';
import { useLanguage } from '@/context/LanguageContext';

interface TrustedOrganisationsProps {
  variant?: 'default' | 'about';
}

export default function TrustedOrganisations({ variant = 'default' }: TrustedOrganisationsProps) {
  const isAbout = variant === 'about';
  const { t } = useLanguage();

  return (
    <section
      className={`section${isAbout ? ' trusted-section--about' : ''}`}
      aria-label={t('common.trustedBy')}
    >
      <div className={`container${isAbout ? ' trusted-container--about' : ''}`}>
        <div className={`trusted${isAbout ? ' trusted--about' : ''}`}>
          <div className="trusted__inner">
            <span className="trusted__label">{t('common.trustedBy')}</span>
            <div className="trusted__logos">
              {organisations.map((org) => (
                <span key={org.id} className="trusted__logo" title={org.name}>
                  <span className="abbr" style={{ fontFamily: 'var(--font-serif)' }}>
                    {org.abbr}
                  </span>
                  <span>{org.name}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
