import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { X, CalendarDays } from 'lucide-react';
import Logo from '@/components/common/Logo';
import LanguageToggle from '@/components/common/LanguageToggle';
import { NAV_ITEMS } from '@/constants';
import { useLanguage } from '@/context/LanguageContext';
import { openConsultationModal } from '@/utils/consultationModal';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const { t } = useLanguage();

  useEffect(() => {
    if (!open) return;
    const scrollY = window.scrollY;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollY);
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <div className="mobile-overlay" onClick={onClose} role="presentation" />
      <nav
        className="mobile-menu"
        aria-label="Mobile"
        id="mobile-menu"
        data-testid="mobile-menu"
      >
        <div className="mobile-menu__head">
          <Logo variant="sm" />
          <button
            type="button"
            className="mobile-menu__close"
            aria-label={t('nav.closeMenu')}
            onClick={onClose}
            data-testid="mobile-menu-close"
          >
            <X size={22} aria-hidden="true" />
          </button>
        </div>

        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onClose}
            className={({ isActive }) => `mobile-nav-link${isActive ? ' is-active' : ''}`}
            data-testid={`mobile-nav-link-${item.labelKey.replace('.', '-')}`}
          >
            {t(item.labelKey)}
          </NavLink>
        ))}

        <LanguageToggle className="mobile-language" />

        <button
          type="button"
          className="btn btn--primary btn--block"
          onClick={() => {
            onClose();
            window.setTimeout(openConsultationModal, 0);
          }}
          data-testid="mobile-book-consultation"
        >
          <span>{t('cta.book')}</span>
          <CalendarDays size={16} aria-hidden="true" />
        </button>
      </nav>
    </>
  );
}
