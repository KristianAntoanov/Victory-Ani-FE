import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, CalendarDays } from 'lucide-react';
import Logo from '@/components/common/Logo';
import LanguageToggle from '@/components/common/LanguageToggle';
import MobileMenu from './MobileMenu';
import { NAV_ITEMS, ROUTES } from '@/constants';
import { useLanguage } from '@/context/LanguageContext';
import { openConsultationModal } from '@/utils/consultationModal';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`} data-testid="site-header">
      <div className="container header-inner">
        <Link to={ROUTES.home} aria-label="V&A Projects — home" data-testid="header-logo-link">
          <Logo />
        </Link>

        <nav className="nav-desktop" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}
              data-testid={`nav-link-${item.labelKey.replace('.', '-')}`}
            >
              {t(item.labelKey)}
            </NavLink>
          ))}
        </nav>

        <LanguageToggle className="header-language" />

        <button
          type="button"
          onClick={openConsultationModal}
          className="btn btn--primary header-cta"
          data-testid="header-book-consultation"
        >
          <span>{t('cta.book')}</span>
          <CalendarDays size={16} aria-hidden="true" />
        </button>

        <button
          type="button"
          className="hamburger"
          aria-label={t('nav.openMenu')}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
          data-testid="mobile-menu-open"
        >
          <Menu size={28} aria-hidden="true" />
        </button>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
