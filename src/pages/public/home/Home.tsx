import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import Seo from '@/components/common/Seo';
import Icon from '@/components/common/Icon';
import PrimaryButton from '@/components/common/PrimaryButton';
import SecondaryButton from '@/components/common/SecondaryButton';
import ServiceCard from '@/components/common/ServiceCard';
import FeaturedProjectCard from '@/components/common/FeaturedProjectCard';
import ProjectCard from '@/components/common/ProjectCard';
import SectionTitle from '@/components/common/SectionTitle';
import EmptyState from '@/components/common/EmptyState';
import ErrorState from '@/components/common/ErrorState';
import LoadingState from '@/components/common/LoadingState';
import { ASSETS, CONTACT, ROUTES } from '@/constants';
import { getHomeServiceCards } from '@/data/services';
import { getProgrammes } from '@/data/programmes';
import { projectService } from '@/services/projectService';
import { useLanguage } from '@/context/LanguageContext';
import { useEffect, useState } from 'react';
import type { Project } from '@/types';
import styles from './Home.module.css';

const partnerLogos = [
  { name: 'Sofia University St. Kliment Ohridski', src: '/assets/logos/partners/sofia-university.png' },
  {
    name: 'Institute of Ornamental and Medicinal Plants Sofia',
    src: '/assets/logos/partners/institute-ornamental-medical-plants-sofia.png',
  },
  { name: 'Partner organisation', src: '/assets/logos/partners/partner-h-logo.png' },
  { name: 'Partner municipality', src: '/assets/logos/partners/partner-municipality-logo.png' },
  { name: 'P.U.L.S. Foundation', src: '/assets/logos/partners/pulse-foundation.png' },
  { name: 'Fu Jen Catholic University', src: '/assets/logos/partners/fu-jen-catholic-university.png' },
  { name: 'Rethink', src: '/assets/logos/partners/rethink.png' },
  { name: 'Universitat Abat Oliba CEU', src: '/assets/logos/partners/universitat-abat-oliba-ceu.png' },
  { name: 'VNU University of Economics and Business', src: '/assets/logos/partners/vnu-ueb.png' },
  { name: 'INTROMAC', src: '/assets/logos/partners/intromac.png' },
  { name: 'UiT The Arctic University of Norway', src: '/assets/logos/partners/uit-arctic-university-norway.png' },
  { name: 'IIM Indore', src: '/assets/logos/partners/iim-indore.png' },
  {
    name: 'Shanghai University of Finance and Economics',
    src: '/assets/logos/partners/shanghai-university-finance-economics.png',
  },
  { name: 'Innovagestion Ambiental', src: '/assets/logos/partners/innovagestion-ambiental.png' },
  { name: 'FundingBox', src: '/assets/logos/partners/fundingbox.png' },
  { name: 'VestaEco', src: '/assets/logos/partners/vestaeco.png' },
  { name: 'University of Nis', src: '/assets/logos/partners/university-of-nis.png' },
  { name: 'Innova Top Green', src: '/assets/logos/partners/innova-top-green.png' },
  { name: 'University of Economics in Bratislava', src: '/assets/logos/partners/euba.png' },
  { name: 'St. Kliment Ohridski', src: '/assets/logos/partners/st-kliment-ohridski.png' },
  { name: 'Technical University of Kosice', src: '/assets/logos/partners/technical-university-kosice.png' },
  { name: 'Institute of Education', src: '/assets/logos/partners/institute-of-education.png' },
  { name: 'ReMoni', src: '/assets/logos/partners/remoni.png' },
  { name: 'Universidade da Madeira', src: '/assets/logos/partners/universidade-da-madeira.png' },
  { name: 'University of Southern Denmark', src: '/assets/logos/partners/sdu.png' },
  { name: 'Universidad de Granada', src: '/assets/logos/partners/universidad-de-granada.png' },
];

export default function Home() {
  const { lang, t } = useLanguage();
  const homeServiceCards = getHomeServiceCards(lang);
  const programmes = getProgrammes(lang);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [projectsError, setProjectsError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    projectService
      .getAllProjects()
      .then((loaded) => {
        if (active) setProjects(loaded);
      })
      .catch((err) => {
        if (active) setProjectsError(err instanceof Error ? err.message : 'Could not load projects.');
      })
      .finally(() => {
        if (active) setLoadingProjects(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const featured = projects[0];
  const minis = projects.filter((p) => p.id !== featured?.id).slice(0, 2);

  return (
    <>
      <Seo
        title={`${t('home.titleLine1')} ${t('home.titleLine2')}`}
        description={t('home.lead')}
        image={ASSETS.heroArchitecture}
      />

      {/* HERO */}
      <section className={styles.hero} data-testid="home-hero">
        <div className="container">
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <span className="eyebrow">{t('common.eyebrow')}</span>
              <h1 className={styles.heroTitle}>
                {t('home.titleLine1')}
                <em>{t('home.titleLine2')}</em>
              </h1>
              <p className={styles.heroLead}>{t('home.lead')}</p>
              <div className={styles.heroActions}>
                <PrimaryButton
                  to={ROUTES.services}
                  className={styles.heroButton}
                  testId="hero-explore-services"
                >
                  {t('cta.exploreServices')}
                </PrimaryButton>
                <SecondaryButton
                  href={CONTACT.phoneHref}
                  icon={Phone}
                  className={styles.heroButton}
                  testId="hero-schedule-call"
                >
                  {CONTACT.phone}
                </SecondaryButton>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.heroCards}>
                {programmes.map((p) => (
                  <Link
                    key={p.id}
                    to={`${ROUTES.programmes}?programme=${p.id}`}
                    className={styles.programmePill}
                    data-testid={`hero-programme-${p.id}`}
                  >
                    <span className={styles.programmeIcon}>
                      <Icon name={p.icon} size={18} />
                    </span>
                    <span>
                      <span className={styles.programmeTitle}>{p.title}</span>
                      <span className={styles.programmeSub}>{p.tagline}</span>
                    </span>
                    <ArrowRight className={styles.arrowMini} size={14} aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.homeServices} data-testid="home-services">
            <div className={styles.homeServicesGrid}>
              {homeServiceCards.map((s) => (
                <ServiceCard
                  key={s.id}
                  title={s.title}
                  description={s.description}
                  icon={s.icon}
                  tags={s.tags}
                  to={ROUTES.services}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className={styles.featuredProjectsSection} data-testid="home-featured-projects">
        <div className="container">
          <div className={styles.featuredProjectsGrid}>
            <div>
              <SectionTitle eyebrow={t('home.featuredEyebrow')} title={t('home.featuredTitle')} />
              <p className={styles.featuredDescription}>{t('home.featuredText')}</p>
              <SecondaryButton to={ROUTES.projects} testId="home-view-all-projects">
                {t('cta.viewAllProjects')}
              </SecondaryButton>
            </div>

            {loadingProjects ? (
              <LoadingState label="Loading projects..." />
            ) : projectsError ? (
              <ErrorState message={projectsError} />
            ) : featured ? (
              <div className={styles.featuredCardsGrid}>
                <FeaturedProjectCard project={featured} />
                <div className={styles.miniProjectsStack}>
                  {minis.map((p) => (
                    <ProjectCard key={p.id} project={p} />
                  ))}
                </div>
              </div>
            ) : (
              <EmptyState title="No projects yet" message="Projects will appear here when they are published." />
            )}
          </div>
        </div>
      </section>

      <section className={styles.logoMarqueeSection} aria-label="Partner company logos">
        <div className={styles.logoMarquee}>
          <div className={styles.logoTrack}>
            {[...partnerLogos, ...partnerLogos].map((logo, index) => {
              const isDuplicate = index >= partnerLogos.length;
              return (
                <div
                  className={styles.logoItem}
                  key={`${logo.name}-${index}`}
                  aria-hidden={isDuplicate || undefined}
                >
                  <img src={logo.src} alt={isDuplicate ? '' : logo.name} loading="lazy" decoding="async" />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
