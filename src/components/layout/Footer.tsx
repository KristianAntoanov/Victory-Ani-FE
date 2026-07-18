import { Link } from 'react-router-dom';
import { Mail, Phone, Linkedin, Twitter, Youtube } from 'lucide-react';
import Logo from '@/components/common/Logo';
import { CONTACT, ROUTES, SOCIAL } from '@/constants';
import { useLanguage } from '@/context/LanguageContext';
import { openConsultationModal } from '@/utils/consultationModal';

const QUICK_LINKS = [
  { labelKey: 'nav.about', to: ROUTES.about },
  { labelKey: 'nav.team', to: ROUTES.team },
  { labelKey: 'nav.projects', to: ROUTES.projects },
  { labelKey: 'nav.news', to: ROUTES.news },
  { labelKey: 'nav.services', to: ROUTES.services },
  { labelKey: 'nav.programmes', to: ROUTES.programmes },
];

const OUR_SERVICES = [
  'footer.svcProgrammes',
  'footer.svcWriting',
  'footer.svcManagement',
  'footer.svcTraining',
  'footer.svcPartner',
];

const RESOURCES = [
  { labelKey: 'footer.resNews', to: ROUTES.news },
  { labelKey: 'footer.resEvents', to: ROUTES.news },
  { labelKey: 'footer.resStories', to: ROUTES.projects },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="site-footer" data-testid="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo />
            <p>{t('footer.brandTagline')}</p>
            <div className="footer-contact">
              <button type="button" onClick={openConsultationModal}>
                <Mail size={16} aria-hidden="true" /> {CONTACT.email}
              </button>
              <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}>
                <Phone size={16} aria-hidden="true" /> {CONTACT.phone}
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>{t('footer.quickLinks')}</h4>
            <ul>
              {QUICK_LINKS.map((l) => (
                <li key={l.labelKey}>
                  <Link to={l.to}>{t(l.labelKey)}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>{t('footer.ourServices')}</h4>
            <ul>
              {OUR_SERVICES.map((key) => (
                <li key={key}>
                  <Link to={ROUTES.services}>{t(key)}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>{t('footer.resources')}</h4>
            <ul>
              {RESOURCES.map((r) => (
                <li key={r.labelKey}>
                  <Link to={r.to}>{t(r.labelKey)}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-newsletter footer-col">
            <h4>{t('newsletter.followUs')}</h4>
            <div className="footer-social">
              <a href={SOCIAL.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <Linkedin size={18} aria-hidden="true" />
              </a>
              <a href={SOCIAL.twitter} target="_blank" rel="noreferrer" aria-label="X (Twitter)">
                <Twitter size={18} aria-hidden="true" />
              </a>
              <a href={SOCIAL.youtube} target="_blank" rel="noreferrer" aria-label="YouTube">
                <Youtube size={18} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {currentYear} V&A Projects. {t('footer.rights')}</span>
          <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--color-bordo)' }}>
            {t('footer.tagline')}
          </span>
          <div className="footer-bottom__links">
            <Link to={ROUTES.privacyPolicy}>{t('footer.privacy')}</Link>
            <Link to={ROUTES.termsConditions}>{t('footer.terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
