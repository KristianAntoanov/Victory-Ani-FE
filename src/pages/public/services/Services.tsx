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
import { loc, type Localized } from '@/i18n';
import { openConsultationModal } from '@/utils/consultationModal';
import styles from './Services.module.css';

interface SupportItem {
  title: Localized;
  text: Localized;
  icon: LucideIcon;
}

interface ServiceDetail {
  id: string;
  title: Localized;
  subtitle: Localized;
  intro: Localized;
  result: Localized;
  icon: LucideIcon;
  support: SupportItem[];
}

const services: ServiceDetail[] = [
  {
    id: 'proposal-development',
    title: { en: 'Proposal development', bg: 'Разработване на проектни предложения' },
    subtitle: {
      en: 'From first idea to submission-ready proposal',
      bg: 'От първата идея до готово за подаване предложение',
    },
    icon: PenLine,
    intro: {
      en: 'A competitive EU proposal must combine a strong idea with clear objectives, credible activities, measurable results and a consortium capable of delivering the work. V&A Projects transforms early-stage concepts into complete, submission-ready proposals and manages the development process through the relevant European funding portal.',
      bg: 'Конкурентното европейско проектно предложение трябва да съчетава силна идея с ясни цели, убедителни дейности, измерими резултати и консорциум, способен да изпълни работата. V&A Projects превръща ранните концепции в цялостни предложения, готови за подаване, и управлява процеса на разработване през съответния европейски портал за финансиране.',
    },
    result: {
      en: 'The result is a competitive and credible proposal in which every section supports the same project logic and responds directly to the evaluation requirements.',
      bg: 'Резултатът е конкурентно и надеждно предложение, в което всеки раздел подкрепя една и съща проектна логика и отговаря директно на изискванията за оценяване.',
    },
    support: [
      {
        title: { en: 'Call analysis and concept design', bg: 'Анализ на поканата и дизайн на концепцията' },
        text: {
          en: 'We examine programme requirements, expected outcomes, eligibility conditions and evaluation criteria, then refine the idea into a clear project direction.',
          bg: 'Преглеждаме изискванията на програмата, очакваните резултати, условията за допустимост и критериите за оценка, след което оформяме идеята в ясна проектна посока.',
        },
        icon: FileSearch,
      },
      {
        title: { en: 'Project development', bg: 'Разработване на проекта' },
        text: {
          en: 'We formulate objectives, target groups, activities, work packages, tasks, deliverables, milestones, indicators and evaluator-focused content.',
          bg: 'Формулираме цели, целеви групи, дейности, работни пакети, задачи, продукти, етапи, индикатори и съдържание, насочено към оценителите.',
        },
        icon: Target,
      },
      {
        title: { en: 'Strategic consortium building', bg: 'Стратегическо изграждане на консорциум' },
        text: {
          en: 'We identify the expertise, geography and organisational profiles needed, support partner search and collect consortium information.',
          bg: 'Определяме нужната експертиза, географско покритие и организационни профили, подкрепяме търсенето на партньори и събираме информация за консорциума.',
        },
        icon: Network,
      },
      {
        title: { en: 'Impact and risk planning', bg: 'Планиране на въздействие и рискове' },
        text: {
          en: 'We define expected change, measurable benefits, sustainability, wider use and suitable responses to operational and partnership risks.',
          bg: 'Дефинираме очакваната промяна, измеримите ползи, устойчивостта, по-широкото използване и подходящите реакции при оперативни и партньорски рискове.',
        },
        icon: BarChart3,
      },
      {
        title: { en: 'Budget preparation', bg: 'Подготовка на бюджет' },
        text: {
          en: 'We develop a realistic budget that reflects planned work, funding rules and partner responsibilities.',
          bg: 'Разработваме реалистичен бюджет, който отразява планираната работа, правилата за финансиране и отговорностите на партньорите.',
        },
        icon: PieChart,
      },
      {
        title: { en: 'Portal submission', bg: 'Подаване през портала' },
        text: {
          en: 'We support preparation and final submission through the official EU funding platform.',
          bg: 'Подкрепяме подготовката и финалното подаване през официалната платформа на ЕС за финансиране.',
        },
        icon: UploadCloud,
      },
    ],
  },
  {
    id: 'proposal-review',
    title: { en: 'Proposal consultation and review', bg: 'Консултация и преглед на предложения' },
    subtitle: { en: 'Expert review before submission', bg: 'Експертен преглед преди подаване' },
    icon: FileCheck2,
    intro: {
      en: 'Organisations that prepare proposals internally can benefit from an independent expert review before submission. We assess draft applications from the position of an evaluator and identify weaknesses that may reduce the score or create uncertainty during assessment.',
      bg: 'Организациите, които подготвят предложения вътрешно, могат да спечелят от независим експертен преглед преди подаване. Оценяваме проектните кандидатури от позицията на оценител и откриваме слабости, които могат да намалят оценката или да създадат неяснота при оценяването.',
    },
    result: {
      en: 'Clients receive direct, practical and prioritised recommendations, with a clear understanding of what must be strengthened, why it matters and how the proposal can be improved.',
      bg: 'Клиентите получават директни, практични и приоритизирани препоръки, с ясно разбиране какво трябва да се укрепи, защо е важно и как предложението може да бъде подобрено.',
    },
    support: [
      {
        title: { en: 'Evaluation criteria review', bg: 'Преглед спрямо критериите за оценка' },
        text: {
          en: 'We assess the proposal against the official award criteria and expected scoring requirements.',
          bg: 'Оценяваме предложението спрямо официалните критерии за присъждане и очакваните изисквания за точкуване.',
        },
        icon: ClipboardCheck,
      },
      {
        title: { en: 'Call compliance check', bg: 'Проверка за съответствие с поканата' },
        text: {
          en: 'We verify whether the application responds to the topic, scope, expected outcomes and eligibility conditions.',
          bg: 'Проверяваме дали кандидатурата отговаря на темата, обхвата, очакваните резултати и условията за допустимост.',
        },
        icon: CheckCircle2,
      },
      {
        title: { en: 'Project logic assessment', bg: 'Оценка на проектната логика' },
        text: {
          en: 'We examine whether needs, objectives, activities, outputs and results are clearly connected.',
          bg: 'Преглеждаме дали нуждите, целите, дейностите, продуктите и резултатите са ясно свързани.',
        },
        icon: Target,
      },
      {
        title: { en: 'Content assessment', bg: 'Оценка на съдържанието' },
        text: {
          en: 'We review concept quality, methodology, innovation, technical approach, impact, indicators, dissemination, sustainability, work plan and resources.',
          bg: 'Преглеждаме качеството на концепцията, методологията, иновацията, техническия подход, въздействието, индикаторите, разпространението, устойчивостта, работния план и ресурсите.',
        },
        icon: FileSearch,
      },
      {
        title: { en: 'Gap identification', bg: 'Идентифициране на пропуски' },
        text: {
          en: 'We highlight missing evidence, weak arguments, unclear responsibilities and unsupported claims.',
          bg: 'Открояваме липсващи доказателства, слаби аргументи, неясни отговорности и неподкрепени твърдения.',
        },
        icon: ListChecks,
      },
      {
        title: { en: 'Strategic recommendations', bg: 'Стратегически препоръки' },
        text: {
          en: 'We provide detailed observations, discuss main weaknesses and help prioritise revisions.',
          bg: 'Предоставяме подробни наблюдения, обсъждаме основните слабости и помагаме за приоритизиране на редакциите.',
        },
        icon: Gauge,
      },
    ],
  },
  {
    id: 'quality-assurance',
    title: { en: 'Quality assurance and evaluation', bg: 'Осигуряване на качество и оценка' },
    subtitle: {
      en: 'Clear standards that guide your project to success',
      bg: 'Ясни стандарти, които водят проекта към успех',
    },
    icon: ShieldCheck,
    intro: {
      en: 'V&A Projects develops and applies structured quality control systems that help partnerships maintain high standards, meet contractual obligations and identify problems before they affect delivery.',
      bg: 'V&A Projects разработва и прилага структурирани системи за контрол на качеството, които помагат на партньорствата да поддържат високи стандарти, да изпълняват договорните си задължения и да откриват проблеми, преди да засегнат изпълнението.',
    },
    result: {
      en: 'This service gives coordinators and partners a clear system for monitoring performance, protecting quality and maintaining readiness for reporting, reviews and audits.',
      bg: 'Тази услуга дава на координаторите и партньорите ясна система за наблюдение на изпълнението, защита на качеството и поддържане на готовност за отчитане, прегледи и одити.',
    },
    support: [
      {
        title: { en: 'Quality standards', bg: 'Стандарти за качество' },
        text: {
          en: 'We establish criteria for activities, deliverables, outputs and internal processes, aligned with grant requirements and EU visibility obligations.',
          bg: 'Създаваме критерии за дейности, продукти, резултати и вътрешни процеси, съобразени с изискванията на гранта и задълженията за видимост на ЕС.',
        },
        icon: ShieldCheck,
      },
      {
        title: { en: 'Quality assurance planning', bg: 'Планиране на осигуряването на качество' },
        text: {
          en: 'We define quality responsibilities, review procedures, decision-making processes and measurable indicators.',
          bg: 'Дефинираме отговорности за качеството, процедури за преглед, процеси за вземане на решения и измерими индикатори.',
        },
        icon: ClipboardCheck,
      },
      {
        title: { en: 'Continuous monitoring and reporting', bg: 'Непрекъснат мониторинг и отчитане' },
        text: {
          en: 'We create tools for following progress, deadlines, milestones and targets, including surveys, templates and partner questionnaires.',
          bg: 'Създаваме инструменти за проследяване на напредъка, сроковете, етапите и целите, включително анкети, шаблони и партньорски въпросници.',
        },
        icon: BarChart3,
      },
      {
        title: { en: 'Ethics compliance', bg: 'Етично съответствие' },
        text: {
          en: 'We support the identification and management of ethical requirements related to participants, research activities and vulnerable groups.',
          bg: 'Подкрепяме идентифицирането и управлението на етични изисквания, свързани с участници, изследователски дейности и уязвими групи.',
        },
        icon: CheckCircle2,
      },
      {
        title: { en: 'Data protection and management plans', bg: 'Защита на данните и планове за управление' },
        text: {
          en: 'We help establish responsible procedures for collecting, storing, processing and sharing personal data.',
          bg: 'Помагаме за създаване на отговорни процедури за събиране, съхранение, обработване и споделяне на лични данни.',
        },
        icon: FileCheck2,
      },
      {
        title: { en: 'Risk identification and mitigation', bg: 'Идентифициране и ограничаване на рискове' },
        text: {
          en: 'We assess operational, financial, technical, legal, ethical and partnership risks, then define preventive and response actions.',
          bg: 'Оценяваме оперативни, финансови, технически, правни, етични и партньорски рискове, след което дефинираме превантивни и реактивни действия.',
        },
        icon: Gauge,
      },
    ],
  },
  {
    id: 'project-management',
    title: { en: 'Project management and implementation', bg: 'Управление и изпълнение на проекти' },
    subtitle: {
      en: 'From approval to meaningful results and lasting impact',
      bg: 'От одобрението до значими резултати и трайно въздействие',
    },
    icon: Users,
    intro: {
      en: 'Approval is only the beginning of a successful EU-funded project. Once funding has been awarded, the partnership must coordinate activities, manage deadlines, maintain documentation, communicate effectively and meet technical and financial obligations.',
      bg: 'Одобрението е само началото на успешния проект, финансиран от ЕС. След отпускане на финансирането партньорството трябва да координира дейности, да управлява срокове, да поддържа документация, да комуникира ефективно и да изпълнява технически и финансови задължения.',
    },
    result: {
      en: 'Our role is to provide the discipline, coordination and practical support needed to keep the project on schedule and in line with its contractual commitments.',
      bg: 'Нашата роля е да осигурим дисциплината, координацията и практическата подкрепа, нужни проектът да остане в график и в съответствие с договорните си ангажименти.',
    },
    support: [
      {
        title: { en: 'Project setup', bg: 'Стартиране на проекта' },
        text: {
          en: 'We establish management procedures, communication channels, templates, responsibilities and reporting arrangements.',
          bg: 'Създаваме управленски процедури, комуникационни канали, шаблони, отговорности и механизми за отчитане.',
        },
        icon: Rocket,
      },
      {
        title: { en: 'Grant agreement preparation', bg: 'Подготовка на грантовото споразумение' },
        text: {
          en: 'We support the collection and organisation of information required during the contracting stage.',
          bg: 'Подкрепяме събирането и организирането на информацията, необходима на етапа на договаряне.',
        },
        icon: FileCheck2,
      },
      {
        title: { en: 'Consortium coordination', bg: 'Координация на консорциума' },
        text: {
          en: 'We facilitate partner communication, distribute responsibilities, monitor contributions and support meetings, minutes and follow-up.',
          bg: 'Улесняваме комуникацията между партньорите, разпределяме отговорности, следим приноса и подкрепяме срещи, протоколи и последващи действия.',
        },
        icon: Handshake,
      },
      {
        title: { en: 'Day-to-day management', bg: 'Ежедневно управление' },
        text: {
          en: 'We follow activities, deadlines, documents, decisions, partner obligations, work packages, tasks, deliverables and dependencies.',
          bg: 'Проследяваме дейности, срокове, документи, решения, партньорски задължения, работни пакети, задачи, продукти и зависимости.',
        },
        icon: ListChecks,
      },
      {
        title: { en: 'Timetable control', bg: 'Контрол на графика' },
        text: {
          en: 'We track progress against the approved schedule and identify delays at an early stage.',
          bg: 'Проследяваме напредъка спрямо одобрения график и откриваме забавяния на ранен етап.',
        },
        icon: Gauge,
      },
      {
        title: { en: 'Deliverables and reporting', bg: 'Продукти и отчитане' },
        text: {
          en: 'We coordinate deliverable review and submission, verify milestones and support periodic and final narrative and financial reporting.',
          bg: 'Координираме прегледа и подаването на продукти, проверяваме етапи и подкрепяме периодичното и финално техническо и финансово отчитане.',
        },
        icon: ClipboardCheck,
      },
    ],
  },
];

export default function Services() {
  const { lang, t } = useLanguage();
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

          <div className={styles.serviceStrip} aria-label={t('services.serviceOverviewLabel')}>
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
                  <span>{loc(service.title, lang)}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.explorerSection}>
        <div className="container">
          <div className={styles.explorerPanel}>
            <aside className={styles.serviceRail} aria-label={t('services.servicesLabel')}>
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
                    <span>{loc(service.title, lang)}</span>
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
                  <span className="eyebrow">{loc(selected.subtitle, lang)}</span>
                  <h2>{loc(selected.title, lang)}</h2>
                </div>
              </div>

              <div className={styles.mobileServiceControls} aria-label={t('services.browseServicesLabel')}>
                <button type="button" onClick={() => goToService(-1)} aria-label={t('services.previousService')}>
                  <ChevronLeft size={18} aria-hidden="true" />
                </button>
                <span>
                  {activeService + 1} / {services.length}
                </span>
                <button type="button" onClick={() => goToService(1)} aria-label={t('services.nextService')}>
                  <ChevronRight size={18} aria-hidden="true" />
                </button>
              </div>

              <p className={styles.detailIntro}>{loc(selected.intro, lang)}</p>

              <div className={styles.supportGrid}>
                {selected.support.map((item, index) => {
                  const ItemIcon = item.icon;
                  return (
                    <button
                      type="button"
                      className={`${styles.supportCard} ${
                        activeSupport === index ? styles.activeSupportCard : ''
                      }`.trim()}
                      key={item.title.en}
                      aria-expanded={activeSupport === index}
                      onClick={() => setActiveSupport(index)}
                    >
                      <span>
                        <ItemIcon size={19} strokeWidth={1.7} aria-hidden="true" />
                      </span>
                      <small>{String(index + 1).padStart(2, '0')}</small>
                      <h3>{loc(item.title, lang)}</h3>
                      <p>{loc(item.text, lang)}</p>
                    </button>
                  );
                })}
              </div>

              <div className={styles.mobileSupportSummary} aria-live="polite">
                <strong>{loc(selectedSupport.title, lang)}</strong>
                <p>{loc(selectedSupport.text, lang)}</p>
              </div>

              <div className={styles.resultBox}>
                <strong>{t('services.outcome')}</strong>
                <p>{loc(selected.result, lang)}</p>
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
