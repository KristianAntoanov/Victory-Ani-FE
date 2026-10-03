import { useEffect, useRef, useState } from 'react';
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

const MENU_ANIMATION_MS = 260;

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(open);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) {
      setVisible(true);
      return undefined;
    }

    const timeout = window.setTimeout(() => setVisible(false), MENU_ANIMATION_MS);
    return () => window.clearTimeout(timeout);
  }, [open]);

  useEffect(() => {
    if (!visible || !open) return;
    const scrollY = window.scrollY;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key !== 'Tab') return;
      const focusable = menuRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());
    window.addEventListener('keydown', onKey);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollY);
      window.removeEventListener('keydown', onKey);
    };
  }, [visible, open, onClose]);

  if (!visible) return null;

  const closingClass = open ? '' : ' is-closing';

  return (
    <>
      <div className={`mobile-overlay${closingClass}`} onClick={onClose} role="presentation" />
      <div
        ref={menuRef}
        className={`mobile-menu${closingClass}`}
        role="dialog"
        aria-modal="true"
        aria-label={t('nav.openMenu')}
        id="mobile-menu"
        data-testid="mobile-menu"
      >
        <div className="mobile-menu__head">
          <Logo variant="sm" />
          <button
            ref={closeButtonRef}
            type="button"
            className="mobile-menu__close"
            aria-label={t('nav.closeMenu')}
            onClick={onClose}
            data-testid="mobile-menu-close"
          >
            <X size={22} aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Mobile">
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
        </nav>

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
      </div>
    </>
  );
}
