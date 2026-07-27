import { Outlet } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ConsultationModal from '@/components/common/ConsultationModal';
import { useLanguage } from '@/context/LanguageContext';

export default function PublicLayout() {
  const { t } = useLanguage();

  return (
    <>
      <a href="#main-content" className="skip-link">
        {t('common.skipToContent')}
      </a>
      <Header />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
      <ConsultationModal />
    </>
  );
}
