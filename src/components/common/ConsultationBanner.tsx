import { CalendarDays, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { openConsultationModal } from '@/utils/consultationModal';

interface ConsultationBannerProps {
  title?: string;
  text?: string;
  variant?: 'default' | 'wide';
}

export default function ConsultationBanner({
  title,
  text,
  variant = 'default',
}: ConsultationBannerProps) {
  const isWide = variant === 'wide';
  const { t } = useLanguage();
  const bannerTitle = title ?? t('consult.title');
  const bannerText = text ?? t('consult.text');

  return (
    <section className={`section${isWide ? ' consult-section--wide' : ''}`}>
      <div className={`container${isWide ? ' consult-container--wide' : ''}`}>
        <div
          className={`consult-banner${isWide ? ' consult-banner--wide' : ''}`}
          data-testid="consultation-banner"
        >
          <span className="consult-banner__icon">
            <CalendarDays size={26} aria-hidden="true" />
          </span>
          <h3 className="consult-banner__title">{bannerTitle}</h3>
          <p className="consult-banner__text">{bannerText}</p>
          <button
            type="button"
            onClick={openConsultationModal}
            className="btn btn--primary"
            data-testid="consultation-cta"
          >
            <span>{t('cta.book')}</span>
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
