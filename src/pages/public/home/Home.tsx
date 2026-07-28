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
  { name: 'BStack', src: '/assets/logos/bstack.png' },
  { name: 'AetherWorks', src: '/assets/logos/aetherworks.svg' },
  { name: 'CodeNest', src: '/assets/logos/codenest.svg' },
  { name: 'GreenLine', src: '/assets/logos/greenline.svg' },
  { name: 'Lumina Labs', src: '/assets/logos/lumina-labs.svg' },
  { name: 'NordPeak', src: '/assets/logos/nordpeak.svg' },
  { name: 'PixelCraft', src: '/assets/logos/pixelcraft.svg' },
  { name: 'QuantumHub', src: '/assets/logos/quantumhub.svg' },
  { name: 'SkyBridge', src: '/assets/logos/skybridge.svg' },
  { name: 'TerraForge', src: '/assets/logos/terraforge.svg' },
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
            {[...partnerLogos, ...partnerLogos].map((logo, index) => (
              <div className={styles.logoItem} key={`${logo.name}-${index}`}>
                <img src={logo.src} alt={logo.name} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
