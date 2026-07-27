import { useEffect, useState } from 'react';
import {
  Anchor,
  BookOpen,
  Brain,
  GraduationCap,
  Handshake,
  Lightbulb,
  ShieldCheck,
  Sprout,
  Target,
  Users,
  Waves,
  type LucideIcon,
} from 'lucide-react';
import Seo from '@/components/common/Seo';
import PrimaryButton from '@/components/common/PrimaryButton';
import SecondaryButton from '@/components/common/SecondaryButton';
import { ASSETS, ROUTES } from '@/constants';
import { useLanguage } from '@/context/LanguageContext';
import { openConsultationModal } from '@/utils/consultationModal';
import styles from './About.module.css';

interface ProcessStep {
  title: string;
  text: string;
}

interface ValueItem {
  title: string;
  text: string;
  icon: LucideIcon;
}

interface Founder {
  name: string;
  role: string;
  text: string;
  quote: string;
  icon: LucideIcon;
}

const expertise = [
  'Humanities and social sciences',
  'Sustainability and environmental studies',
  'Economics and business',
  'Maritime education and maritime affairs',
  'Artificial intelligence and computer science',
  'Medicine, biology and natural sciences',
  'Education, training and social inclusion',
];

const aboutNav = [
  { label: 'Story & Team', href: '#story-team' },
  { label: 'How we work', href: '#how-we-work' },
  { label: 'Values', href: '#values' },
  { label: 'Founders', href: '#founders' },
];

const processSteps: ProcessStep[] = [
  {
    title: 'Listen',
    text: 'We begin with your idea, your organisation and the needs of the people you want to support.',
  },
  {
    title: 'Find',
    text: 'We identify the EU programme and funding call that offer the strongest match for your ambitions.',
  },
  {
    title: 'Shape',
    text: 'We develop the project concept, objectives, activities, results and project logic.',
  },
  {
    title: 'Connect',
    text: 'We build a balanced partnership with the right expertise, roles and geographical coverage.',
  },
  {
    title: 'Build',
    text: 'We prepare the proposal, work plan, budget and supporting documents with care and precision.',
  },
  {
    title: 'Deliver',
    text: 'We support implementation, coordination, communication, quality assurance and reporting after approval.',
  },
];

const values: ValueItem[] = [
  {
    title: 'Equal access to education and opportunity',
    text: 'Every person should have access to quality education, learning opportunities and the possibility to participate fully in society.',
    icon: GraduationCap,
  },
  {
    title: 'Ideas deserve to be heard',
    text: 'Innovative ideas often begin with one person, one organisation or one local need. We help give them structure, credibility and a strong European voice.',
    icon: Lightbulb,
  },
  {
    title: 'Integrity and responsibility',
    text: 'We provide realistic advice, respect funding rules and remain transparent about opportunities, risks and responsibilities.',
    icon: ShieldCheck,
  },
  {
    title: 'Quality in every detail',
    text: 'Strong projects depend on clear objectives, realistic activities, reliable partnerships and precise documentation.',
    icon: Target,
  },
  {
    title: 'Cooperation built on trust',
    text: 'European projects are created through people. We value respectful communication, shared responsibility and long-term partnerships.',
    icon: Handshake,
  },
  {
    title: 'Innovation with meaning',
    text: 'Innovation should respond to real needs and create practical value for education, safety, the environment, research and society.',
    icon: Brain,
  },
  {
    title: 'Lasting value',
    text: 'A successful project should continue to create value after the funding period ends through solutions that can be sustained and transferred.',
    icon: Sprout,
  },
];

const founders: Founder[] = [
  {
    name: 'Viktor Georgiev',
    role: 'Founder',
    icon: Anchor,
    text: 'A former naval captain, Viktor brings practical leadership experience, operational discipline and a strong understanding of safety, responsibility and international cooperation. During the past five years, he has worked with EU-funded projects and has developed a particular interest in Horizon Europe opportunities related to maritime affairs, marine innovation and safer and more sustainable maritime systems.',
    quote:
      'Through EU-funded projects, we can turn the best innovative ideas into real solutions, advance sustainability and help restore the planet for the generations to come.',
  },
  {
    name: 'Dr. Ana Antonova-Georgieva',
    role: 'Founder',
    icon: BookOpen,
    text: 'Dr. Ana Antonova-Georgieva holds a PhD in Political Science focused on women\'s rights, gender equality, violence against women and human rights protection. With more than ten years of experience in EU-funded projects, she is devoted to the strategic design, development and writing of European projects, guiding ideas from their earliest stage to strong, competitive and implementation-ready proposals.',
    quote:
      'I believe we have the power to design projects that can genuinely change the realities of children, opening doors to education, equality, protection and opportunity.',
  },
];

export default function About() {
  const { t } = useLanguage();
  const [activeProcess, setActiveProcess] = useState(0);
  const [activeValue, setActiveValue] = useState(0);
  const [activeSection, setActiveSection] = useState(aboutNav[0].href);
  const selectedProcess = processSteps[activeProcess];
  const selectedValue = values[activeValue];
  const SelectedValueIcon = selectedValue.icon;

  useEffect(() => {
    const sections = aboutNav
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setActiveSection(`#${visible.target.id}`);
        }
      },
      {
        rootMargin: '-35% 0px -45% 0px',
        threshold: [0.18, 0.35, 0.55],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Seo
        title={t('about.title')}
        description={t('about.lead')}
        image={ASSETS.aboutHero}
      />

      <section className={styles.hero} data-testid="about-hero">
        <div className="container">
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <span className={`eyebrow ${styles.heroEyebrow}`}>{t('nav.about')}</span>
              <h1 className={styles.heroTitle}>
                {t('about.heroLine1')}
                <em>{t('about.heroLine2')}</em>
              </h1>
              <span className="dash" />
              <p className={styles.heroLead}>{t('about.heroLead')}</p>
              <div className={styles.heroActions}>
                <PrimaryButton
                  type="button"
                  onClick={openConsultationModal}
                  className={styles.heroButton}
                >
                  {t('about.startProject')}
                </PrimaryButton>
                <SecondaryButton to={ROUTES.services} className={styles.heroButton}>
                  {t('cta.exploreServices')}
                </SecondaryButton>
              </div>
            </div>
            <div className={styles.heroVisual} aria-hidden="true" />
          </div>

          <div className={styles.introPanel}>
            <div className={styles.introStatement}>
              <span className="eyebrow">{t('about.whyEyebrow')}</span>
              <p>{t('about.whyText')}</p>
            </div>
            <div className={styles.introActions}>
              <span>{t('about.helpTeams')}</span>
              <ul>
                <li>{t('about.helpOne')}</li>
                <li>{t('about.helpTwo')}</li>
                <li>{t('about.helpThree')}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.navWrap}>
        <div className="container">
          <nav className={styles.aboutNav} aria-label="About page sections">
            {aboutNav.map((item) => (
              <a
                href={item.href}
                className={activeSection === item.href ? styles.activeNavLink : undefined}
                key={item.href}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <section className={styles.teamSection} id="story-team">
        <div className="container">
          <div className={styles.storyGrid}>
            <div className={styles.sectionIntro}>
              <span className="eyebrow">{t('about.storyTeam')}</span>
              <h2>{t('about.journeyTitle')}</h2>
              <span className="dash" />
              <p>{t('about.journeyText')}</p>
            </div>

            <article className={styles.storyPanel}>
              <div className={styles.statPill}>
                <Users size={20} aria-hidden="true" />
                <strong>20+ years</strong>
                <span>{t('about.combinedExperience')}</span>
              </div>
              <p>
                Our expertise covers the full project journey, from the first idea and the search
                for suitable funding to proposal writing, consortium development, implementation,
                communication and reporting.
              </p>
              <div className={styles.expertiseGrid}>
                {expertise.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.processSection} id="how-we-work">
        <div className="container">
          <div className={styles.processPanel}>
            <div className={styles.processIntro}>
              <span className="eyebrow">{t('services.processEyebrow')}</span>
              <h2>{t('about.listeningTitle')}</h2>
              <span className="dash" />
              <p>{t('about.listeningText')}</p>
              <SecondaryButton to={ROUTES.services}>{t('cta.exploreServices')}</SecondaryButton>
            </div>

            <div className={styles.processBoard}>
              <div className={styles.processRail} role="tablist" aria-label="Project process steps">
                {processSteps.map((step, index) => (
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeProcess === index}
                    aria-controls="process-detail"
                    className={activeProcess === index ? styles.activeStepButton : undefined}
                    key={step.title}
                    onClick={() => setActiveProcess(index)}
                  >
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    {step.title}
                  </button>
                ))}
              </div>

              <article className={styles.processDetail} id="process-detail" role="tabpanel">
                <span className={styles.stepNumber}>
                  {String(activeProcess + 1).padStart(2, '0')}
                </span>
                <h3>{selectedProcess.title}</h3>
                <p>{selectedProcess.text}</p>
              </article>
            </div>

            <div className={styles.processSteps} aria-label="Complete process overview">
              {processSteps.map((step, index) => (
                <article className={styles.processStep} key={step.title}>
                  <span className={styles.stepNumber}>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>
          </div>
          <p className={styles.processTagline}>{t('about.processTagline')}</p>
        </div>
      </section>

      <section className={styles.valuesSection} id="values">
        <div className="container">
          <div className={styles.valuesHeader}>
            <span className="eyebrow">{t('about.valuesEyebrow')}</span>
            <h2>{t('about.valuesTitle')}</h2>
            <span className="dash" />
          </div>
          <div className={styles.valuesShell}>
            <div className={styles.valueNav} role="tablist" aria-label="V&A Projects values">
              {values.map((value, index) => {
                const ValueIcon = value.icon;
                return (
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeValue === index}
                    aria-controls="value-detail"
                    className={activeValue === index ? styles.activeValueButton : undefined}
                    key={value.title}
                    onClick={() => setActiveValue(index)}
                  >
                    <ValueIcon size={18} strokeWidth={1.7} aria-hidden="true" />
                    <span>{value.title}</span>
                  </button>
                );
              })}
            </div>

            <article className={styles.valueDetail} id="value-detail" role="tabpanel">
              <span className="icon-circle">
                <SelectedValueIcon size={28} strokeWidth={1.5} aria-hidden="true" />
              </span>
              <h3>{selectedValue.title}</h3>
              <p>{selectedValue.text}</p>
            </article>
          </div>

        </div>
      </section>

      <section className={styles.foundersSection} id="founders">
        <div className="container">
          <div className={styles.foundersPanel}>
            <div className={styles.sectionIntro}>
              <span className="eyebrow">{t('about.founders')}</span>
              <h2>{t('about.foundersTitle')}</h2>
              <span className="dash" />
            </div>

            <div className={styles.foundersGrid}>
              {founders.map((founder) => {
                const FounderIcon = founder.icon;
                return (
                  <article className={styles.founderCard} key={founder.name}>
                    <div className={styles.founderHeader}>
                      <span className={styles.founderPhoto}>
                        <FounderIcon size={34} strokeWidth={1.4} aria-hidden="true" />
                      </span>
                      <div>
                        <h3>{founder.name}</h3>
                        <p>{founder.role}</p>
                      </div>
                    </div>
                    <p>{founder.text}</p>
                    <blockquote>{founder.quote}</blockquote>
                  </article>
                );
              })}
            </div>

            <div className={styles.consultCta}>
              <div>
                <Waves size={24} aria-hidden="true" />
                <strong>{t('about.readyProject')}</strong>
              </div>
              <button type="button" onClick={openConsultationModal} className="btn btn--primary">
                {t('cta.book')}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
