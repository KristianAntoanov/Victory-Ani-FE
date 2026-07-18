import { useState } from 'react';
import {
  BarChart3,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  FileCheck2,
  FileSearch,
  Gauge,
  Handshake,
  ListChecks,
  Network,
  PenLine,
  PieChart,
  Rocket,
  ShieldCheck,
  Target,
  UploadCloud,
  Users,
  type LucideIcon,
} from 'lucide-react';
import Seo from '@/components/common/Seo';
import PrimaryButton from '@/components/common/PrimaryButton';
import SecondaryButton from '@/components/common/SecondaryButton';
import { ASSETS, ROUTES } from '@/constants';
import { useLanguage } from '@/context/LanguageContext';
import { openConsultationModal } from '@/utils/consultationModal';
import styles from './Services.module.css';

interface SupportItem {
  title: string;
  text: string;
  icon: LucideIcon;
}

interface ServiceDetail {
  id: string;
  title: string;
  subtitle: string;
  intro: string;
  result: string;
  icon: LucideIcon;
  support: SupportItem[];
}

const services: ServiceDetail[] = [
  {
    id: 'proposal-development',
    title: 'Proposal development',
    subtitle: 'From first idea to submission-ready proposal',
    icon: PenLine,
    intro:
      'A competitive EU proposal must combine a strong idea with clear objectives, credible activities, measurable results and a consortium capable of delivering the work. V&A Projects transforms early-stage concepts into complete, submission-ready proposals and manages the development process through the relevant European funding portal.',
    result:
      'The result is a competitive and credible proposal in which every section supports the same project logic and responds directly to the evaluation requirements.',
    support: [
      {
        title: 'Call analysis and concept design',
        text: 'We examine programme requirements, expected outcomes, eligibility conditions and evaluation criteria, then refine the idea into a clear project direction.',
        icon: FileSearch,
      },
      {
        title: 'Project development',
        text: 'We formulate objectives, target groups, activities, work packages, tasks, deliverables, milestones, indicators and evaluator-focused content.',
        icon: Target,
      },
      {
        title: 'Strategic consortium building',
        text: 'We identify the expertise, geography and organisational profiles needed, support partner search and collect consortium information.',
        icon: Network,
      },
      {
        title: 'Impact and risk planning',
        text: 'We define expected change, measurable benefits, sustainability, wider use and suitable responses to operational and partnership risks.',
        icon: BarChart3,
      },
      {
        title: 'Budget preparation',
        text: 'We develop a realistic budget that reflects planned work, funding rules and partner responsibilities.',
        icon: PieChart,
      },
      {
        title: 'Portal submission',
        text: 'We support preparation and final submission through the official EU funding platform.',
        icon: UploadCloud,
      },
    ],
  },
  {
    id: 'proposal-review',
    title: 'Proposal consultation and review',
    subtitle: 'Expert review before submission',
    icon: FileCheck2,
    intro:
      'Organisations that prepare proposals internally can benefit from an independent expert review before submission. We assess draft applications from the position of an evaluator and identify weaknesses that may reduce the score or create uncertainty during assessment.',
    result:
      'Clients receive direct, practical and prioritised recommendations, with a clear understanding of what must be strengthened, why it matters and how the proposal can be improved.',
    support: [
      {
        title: 'Evaluation criteria review',
        text: 'We assess the proposal against the official award criteria and expected scoring requirements.',
        icon: ClipboardCheck,
      },
      {
        title: 'Call compliance check',
        text: 'We verify whether the application responds to the topic, scope, expected outcomes and eligibility conditions.',
        icon: CheckCircle2,
      },
      {
        title: 'Project logic assessment',
        text: 'We examine whether needs, objectives, activities, outputs and results are clearly connected.',
        icon: Target,
      },
      {
        title: 'Content assessment',
        text: 'We review concept quality, methodology, innovation, technical approach, impact, indicators, dissemination, sustainability, work plan and resources.',
        icon: FileSearch,
      },
      {
        title: 'Gap identification',
        text: 'We highlight missing evidence, weak arguments, unclear responsibilities and unsupported claims.',
        icon: ListChecks,
      },
      {
        title: 'Strategic recommendations',
        text: 'We provide detailed observations, discuss main weaknesses and help prioritise revisions.',
        icon: Gauge,
      },
    ],
  },
  {
    id: 'quality-assurance',
    title: 'Quality assurance and evaluation',
    subtitle: 'Clear standards that guide your project to success',
    icon: ShieldCheck,
    intro:
      'V&A Projects develops and applies structured quality control systems that help partnerships maintain high standards, meet contractual obligations and identify problems before they affect delivery.',
    result:
      'This service gives coordinators and partners a clear system for monitoring performance, protecting quality and maintaining readiness for reporting, reviews and audits.',
    support: [
      {
        title: 'Quality standards',
        text: 'We establish criteria for activities, deliverables, outputs and internal processes, aligned with grant requirements and EU visibility obligations.',
        icon: ShieldCheck,
      },
      {
        title: 'Quality assurance planning',
        text: 'We define quality responsibilities, review procedures, decision-making processes and measurable indicators.',
        icon: ClipboardCheck,
      },
      {
        title: 'Continuous monitoring and reporting',
        text: 'We create tools for following progress, deadlines, milestones and targets, including surveys, templates and partner questionnaires.',
        icon: BarChart3,
      },
      {
        title: 'Ethics compliance',
        text: 'We support the identification and management of ethical requirements related to participants, research activities and vulnerable groups.',
        icon: CheckCircle2,
      },
      {
        title: 'Data protection and management plans',
        text: 'We help establish responsible procedures for collecting, storing, processing and sharing personal data.',
        icon: FileCheck2,
      },
      {
        title: 'Risk identification and mitigation',
        text: 'We assess operational, financial, technical, legal, ethical and partnership risks, then define preventive and response actions.',
        icon: Gauge,
      },
    ],
  },
  {
    id: 'project-management',
    title: 'Project management and implementation',
    subtitle: 'From approval to meaningful results and lasting impact',
    icon: Users,
    intro:
      'Approval is only the beginning of a successful EU-funded project. Once funding has been awarded, the partnership must coordinate activities, manage deadlines, maintain documentation, communicate effectively and meet technical and financial obligations.',
    result:
      'Our role is to provide the discipline, coordination and practical support needed to keep the project on schedule and in line with its contractual commitments.',
    support: [
      {
        title: 'Project setup',
        text: 'We establish management procedures, communication channels, templates, responsibilities and reporting arrangements.',
        icon: Rocket,
      },
      {
        title: 'Grant agreement preparation',
        text: 'We support the collection and organisation of information required during the contracting stage.',
        icon: FileCheck2,
      },
      {
        title: 'Consortium coordination',
        text: 'We facilitate partner communication, distribute responsibilities, monitor contributions and support meetings, minutes and follow-up.',
        icon: Handshake,
      },
      {
        title: 'Day-to-day management',
        text: 'We follow activities, deadlines, documents, decisions, partner obligations, work packages, tasks, deliverables and dependencies.',
        icon: ListChecks,
      },
      {
        title: 'Timetable control',
        text: 'We track progress against the approved schedule and identify delays at an early stage.',
        icon: Gauge,
      },
      {
        title: 'Deliverables and reporting',
        text: 'We coordinate deliverable review and submission, verify milestones and support periodic and final narrative and financial reporting.',
        icon: ClipboardCheck,
      },
    ],
  },
];

export default function Services() {
  const { t } = useLanguage();
  const [activeService, setActiveService] = useState(0);
  const [activeSupport, setActiveSupport] = useState(0);
  const selected = services[activeService];
  const SelectedIcon = selected.icon;
  const selectedSupport = selected.support[activeSupport] ?? selected.support[0];

  const selectService = (index: number) => {
    setActiveService(index);
    setActiveSupport(0);
  };

  const goToService = (direction: -1 | 1) => {
    selectService((activeService + direction + services.length) % services.length);
  };

  return (
    <>
      <Seo
        title={t('services.title')}
        description={t('services.lead')}
        image={ASSETS.servicesHero}
      />

      <section className={styles.hero} data-testid="services-hero">
        <div className="container">
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <span className="eyebrow">{t('services.title')}</span>
              <h1 className={styles.heroTitle}>
                {t('services.heroLine1')}
                <em>{t('services.heroLine2')}</em>
                <strong>{t('services.heroLine3')}</strong>
              </h1>
              <span className="dash" />
              <p className={styles.heroLead}>{t('services.lead')}</p>
              <div className={styles.heroActions}>
                <PrimaryButton
                  type="button"
                  onClick={openConsultationModal}
                  className={styles.heroButton}
                >
                  {t('services.chooseSupport')}
                </PrimaryButton>
                <SecondaryButton to={ROUTES.programmes} className={styles.heroButton}>
                  {t('nav.programmes')}
                </SecondaryButton>
              </div>
            </div>
            <div className={styles.heroVisual} aria-hidden="true">
              <div className={styles.heroSignal}>
                <span>4</span>
                <strong>{t('services.servicePaths')}</strong>
                <p>{t('services.servicePathsText')}</p>
              </div>
            </div>
          </div>

          <div className={styles.serviceStrip} aria-label="Service overview">
            {services.map((service, index) => {
              const ServiceIcon = service.icon;
              return (
                <button
                  type="button"
                  className={activeService === index ? styles.activeStripItem : undefined}
                  key={service.id}
                  onClick={() => selectService(index)}
                >
                  <ServiceIcon size={20} strokeWidth={1.6} aria-hidden="true" />
                  <span>{service.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.explorerSection}>
        <div className="container">
          <div className={styles.explorerPanel}>
            <aside className={styles.serviceRail} aria-label="Services">
              <span className="eyebrow">{t('services.chooseService')}</span>
              {services.map((service, index) => {
                const ServiceIcon = service.icon;
                return (
                  <button
                    type="button"
                    className={activeService === index ? styles.activeServiceButton : undefined}
                    key={service.id}
                    onClick={() => selectService(index)}
                  >
                    <ServiceIcon size={18} strokeWidth={1.6} aria-hidden="true" />
                    <span>{service.title}</span>
                  </button>
                );
              })}
            </aside>

            <article className={styles.serviceDetail}>
              <div className={styles.detailHeader}>
                <span className="icon-circle">
                  <SelectedIcon size={28} strokeWidth={1.5} aria-hidden="true" />
                </span>
                <div>
                  <span className="eyebrow">{selected.subtitle}</span>
                  <h2>{selected.title}</h2>
                </div>
              </div>

              <div className={styles.mobileServiceControls} aria-label="Browse services">
                <button type="button" onClick={() => goToService(-1)} aria-label="Previous service">
                  <ChevronLeft size={18} aria-hidden="true" />
                </button>
                <span>
                  {activeService + 1} / {services.length}
                </span>
                <button type="button" onClick={() => goToService(1)} aria-label="Next service">
                  <ChevronRight size={18} aria-hidden="true" />
                </button>
              </div>

              <p className={styles.detailIntro}>{selected.intro}</p>

              <div className={styles.supportGrid}>
                {selected.support.map((item, index) => {
                  const ItemIcon = item.icon;
                  return (
                    <button
                      type="button"
                      className={`${styles.supportCard} ${
                        activeSupport === index ? styles.activeSupportCard : ''
                      }`.trim()}
                      key={item.title}
                      aria-expanded={activeSupport === index}
                      onClick={() => setActiveSupport(index)}
                    >
                      <span>
                        <ItemIcon size={19} strokeWidth={1.7} aria-hidden="true" />
                      </span>
                      <small>{String(index + 1).padStart(2, '0')}</small>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </button>
                  );
                })}
              </div>

              <div className={styles.mobileSupportSummary} aria-live="polite">
                <strong>{selectedSupport.title}</strong>
                <p>{selectedSupport.text}</p>
              </div>

              <div className={styles.resultBox}>
                <strong>{t('services.outcome')}</strong>
                <p>{selected.result}</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.deliverySection}>
        <div className="container">
          <div className={styles.deliveryPanel}>
            <div>
              <span className="eyebrow">{t('services.howToStart')}</span>
              <h2>{t('services.startTitle')}</h2>
              <p>{t('services.startText')}</p>
            </div>
            <div className={styles.deliverySteps}>
              <span>{t('services.stepIdea')}</span>
              <span>{t('services.stepProposal')}</span>
              <span>{t('services.stepApproval')}</span>
              <span>{t('services.stepDelivery')}</span>
              <span>{t('services.stepEvaluation')}</span>
            </div>
            <PrimaryButton
              type="button"
              onClick={openConsultationModal}
              className={styles.deliveryButton}
            >
              {t('services.chooseSupport')}
            </PrimaryButton>
          </div>
        </div>
      </section>
    </>
  );
}
