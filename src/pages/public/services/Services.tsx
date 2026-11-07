import { useState } from 'react';
import {
  BarChart3,
  CheckCircle2,
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
import { ASSETS } from '@/constants';
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
      en: "From initial concept to a compelling, submission-ready application.",
      bg: 'От първата идея до готово за подаване предложение',
    },
    icon: PenLine,
    intro: {
      en: "A successful EU funding application requires more than a strong idea. It requires clearly defined objectives, planned activities, measurable results and a capable consortium. V&A Projects provides expert support throughout the entire proposal development process, from the initial concept to final submission.",
      bg: "Успешното кандидатстване за европейско финансиране изисква не само добра идея, но и ясно формулирани цели, добре планирани дейности, измерими резултати и надеждни партньори. V&A Projects предоставя експертна подкрепа през целия процес на разработване на проектното предложение, от първоначалната концепция до окончателното му подаване.",
    },
    result: {
      en: 'The result is a competitive and credible proposal in which every section supports the same project logic and responds directly to the evaluation requirements.',
      bg: 'Резултатът е конкурентно и надеждно предложение, в което всеки раздел подкрепя една и съща проектна логика и отговаря директно на изискванията за оценяване.',
    },
    support: [
      {
        title: { en: 'Call analysis and concept design', bg: "Анализ на възможностите за финансиране" },
        text: {
          en: "We examine programme requirements, expected outcomes, eligibility conditions and evaluation criteria to identify the most effective approach to developing your project idea.",
          bg: "Проучваме условията на конкретната покана, изискванията за допустимост и критериите за оценка, за да определим най-подходящия подход за разработване на вашата проектна идея.",
        },
        icon: FileSearch,
      },
      {
        title: { en: 'Project development', bg: "Разработване на проектно предложение" },
        text: {
          en: "We define project objectives, target groups and expected results, work packages and activities and establish deliverables, milestones and performance indicators.",
          bg: "Формулираме целите и очакваните резултати, определяме целевите групи и планираме дейностите, работните пакети, сроковете, индикаторите и необходимите ресурси. Подготвяме проектното предложение в съответствие с изискванията на програмата.",
        },
        icon: Target,
      },
      {
        title: { en: 'Strategic consortium building', bg: "Изграждане на международни партньорства" },
        text: {
          en: "We identify the expertise, geographical representation and organisational profiles needed and build strong international consortia.",
          bg: "Съдействаме при подбора на подходящи партньори с необходимия опит и експертиза. Подкрепяме формирането на консорциум с ясно разпределени роли, отговорности и принос към изпълнението на проекта.",
        },
        icon: Network,
      },
      {
        title: { en: "Impact, sustainability and risk management", bg: "Планиране на въздействието, устойчивостта и управлението на риска" },
        text: {
          en: "We develop strategies to maximise project impact, expected benefits and long-term use of results, and identify responses to operational and partnership risks.",
          bg: "Разработваме подход за оценка на очакваните ползи и дългосрочните резултати, планираме тяхното разпространение и последващо използване и определяме мерки за предотвратяване и управление на потенциалните рискове.",
        },
        icon: BarChart3,
      },
      {
        title: { en: 'Budget preparation', bg: 'Подготовка на бюджет' },
        text: {
          en: "We develop a realistic budget that reflects project activities, funding rules, resource requirements and partner responsibilities.",
          bg: "Разработваме реалистичен бюджет, съобразен с планираните дейности, правилата за финансиране и разпределението на ресурсите между партньорите.",
        },
        icon: PieChart,
      },
      {
        title: { en: 'Portal submission', bg: "Подаване чрез електронната платформа" },
        text: {
          en: "We coordinate the preparation of supporting documents and the final submission through the relevant EU funding platform.",
          bg: "Координираме подготовката на необходимите документи, проверяваме съответствието с изискванията на поканата и съдействаме за окончателното подаване на кандидатурата чрез съответната електронна платформа.",
        },
        icon: UploadCloud,
      },
    ],
  },
  {
    id: 'proposal-review',
    title: { en: "Expert proposal review", bg: "Консултации и експертна оценка" },
    subtitle: { en: "Independent assessment and practical recommendations to strengthen your application.", bg: "Професионален преглед на проектни предложения и препоръки за подобряването им преди подаване." },
    icon: FileCheck2,
    intro: {
      en: "Even a well-developed project proposal can contain weaknesses that affect its evaluation. V&A Projects provides independent expert reviews of EU funding applications, assessing draft proposals against programme requirements and official evaluation criteria. We identify gaps and areas for improvement, offering recommendations to strengthen the quality and competitiveness of your application.",
      bg: "Дори добре разработено проектно предложение може да съдържа пропуски, които да повлияят на оценката му. V&A Projects предлага независим експертен преглед на кандидатури, като анализира тяхното съдържание спрямо изискванията на програмата и критериите за оценка. Идентифицираме слабите места и предоставяме конкретни препоръки за повишаване на качеството и конкурентоспособността на предложението.",
    },
    result: {
      en: 'Clients receive direct, practical and prioritised recommendations, with a clear understanding of what must be strengthened, why it matters and how the proposal can be improved.',
      bg: 'Клиентите получават директни, практични и приоритизирани препоръки, с ясно разбиране какво трябва да се укрепи, защо е важно и как предложението може да бъде подобрено.',
    },
    support: [
      {
        title: { en: 'Evaluation criteria review', bg: "Преглед по критериите за оценка" },
        text: {
          en: 'We assess the proposal against the official award criteria and expected scoring requirements.',
          bg: "Анализираме проектното предложение от гледна точка на оценителите, като проверяваме доколко съдържанието отговаря на отделните критерии и изисквания.",
        },
        icon: ClipboardCheck,
      },
      {
        title: { en: "Funding call compliance", bg: "Проверка за съответствие с програмата" },
        text: {
          en: "We verify whether your application addresses the programme priorities, topic requirements, expected outcomes and eligibility conditions.",
          bg: 'Проверяваме дали кандидатурата отговаря на темата, обхвата, очакваните резултати и условията за допустимост.',
        },
        icon: CheckCircle2,
      },
      {
        title: { en: 'Project logic assessment', bg: 'Оценка на проектната логика' },
        text: {
          en: 'We examine whether needs, objectives, activities, outputs and results are clearly connected.',
          bg: "Анализираме връзката между установените потребности, цели, дейности и очакваните резултати, за да установим евентуални несъответствия.",
        },
        icon: Target,
      },
      {
        title: { en: "Content and quality assessment", bg: "Оценка на качеството на съдържанието" },
        text: {
          en: 'We review concept quality, methodology, innovation, technical approach, impact, indicators, dissemination, sustainability, work plan and resources.',
          bg: "Преглеждаме методологията, иновативните елементи, работния план, предвиденото въздействие, устойчивостта и необходимите ресурси.",
        },
        icon: FileSearch,
      },
      {
        title: { en: 'Gap identification', bg: 'Идентифициране на пропуски' },
        text: {
          en: "We highlight missing evidence, weak arguments, unclear responsibilities and unsupported claims that could weaken your application.",
          bg: "Откриваме неясноти, недостатъчно обосновани твърдения, липсваща информация и несъответствия, които могат да повлияят на крайната оценка.",
        },
        icon: ListChecks,
      },
      {
        title: { en: 'Strategic recommendations', bg: "Конкретни препоръки за подобрение" },
        text: {
          en: "We provide detailed feedback and recommendations, helping you strengthen your proposal before submission.",
          bg: "Предоставяме подробна обратна връзка с практически насоки за отстраняване на установените слабости и повишаване на качеството на проектното предложение.",
        },
        icon: Gauge,
      },
    ],
  },
  {
    id: 'quality-assurance',
    title: {
      en: 'Quality assurance, ethics and data management',
      bg: "Стандарти за качество, етика и поверителност при управлението на данни",
    },
    subtitle: {
      en: "Quality standards that guide your project to success",
      bg: "Прилагане на стандарти за качество, спазване на етичните принципи и отговорно управление на данните",
    },
    icon: ShieldCheck,
    intro: {
      en: "V&A Projects provides specialised expertise in quality assurance, ethics and data management for EU-funded projects. As a consortium partner, we develop and implement quality assurance procedures, ethical guidelines and data management practices that ensure consistent standards, safeguard participants and support the responsible handling of project information throughout implementation.",
      bg: "V&A Projects предоставя специализирана експертна подкрепа в областта на прилагането на стандарти за качество, спазването на етичните изисквания и управлението на данни в европейски проекти. Разработваме и прилагаме процедури за мониторинг и оценка, проследяваме изпълнението на заложените цели и подпомагаме партньорите в поддържането на високи стандарти през целия цикъл на проекта.",
    },
    result: {
      en: 'This service gives coordinators and partners a clear system for monitoring performance, protecting quality and maintaining readiness for reporting, reviews and audits.',
      bg: 'Тази услуга дава на координаторите и партньорите ясна система за наблюдение на изпълнението, защита на качеството и поддържане на готовност за отчитане, прегледи и одити.',
    },
    support: [
      {
        title: { en: 'Quality standards', bg: 'Стандарти за качество' },
        text: {
          en: "We establish quality criteria for activities, deliverables, outputs and internal processes, aligned with grant requirements and EU visibility obligations.",
          bg: "Разработваме критерии за дейности, продукти, резултати и вътрешни процеси, съобразени с изискванията на гранта и задълженията за видимост на ЕС.",
        },
        icon: ShieldCheck,
      },
      {
        title: { en: 'Quality assurance planning', bg: "Планиране и контрол на осигуряването на качество" },
        text: {
          en: "We develop Quality Assurance Plans that define responsibilities, review and approval procedures, decision-making processes and measurable performance indicators.",
          bg: "Изготвяме планове за осигуряване на качеството с конкретни отговорности, процедури за преглед и измерими показатели за изпълнение.",
        },
        icon: ClipboardCheck,
      },
      {
        title: { en: 'Continuous monitoring and reporting', bg: 'Непрекъснат мониторинг и отчитане' },
        text: {
          en: "We design monitoring and evaluation tools to track project progress and assess performance against milestones and targets.",
          bg: "Разработваме инструменти за проследяване на напредъка и оценка на резултатите, включително анкети, въпросници, оценъчни формуляри и отчети.",
        },
        icon: BarChart3,
      },
      {
        title: { en: "Ethical compliance", bg: "Спазване на етичните изисквания" },
        text: {
          en: "We develop ethical guidelines and procedures to support compliance with EU requirements on research integrity, informed consent, participant protection, confidentiality and the ethical involvement of vulnerable groups.",
          bg: "Разработваме етични процедури в съответствие с изискванията на ЕС относно изследователската почтеност, информираното съгласие, защитата на участниците и уязвимите групи.",
        },
        icon: CheckCircle2,
      },
      {
        title: { en: 'Data management and GDPR compliance', bg: "Управление и защита на данните" },
        text: {
          en: 'We support the preparation of Data Management Plans (DMPs) and procedures for data collection, storage, access, sharing, retention and protection in accordance with GDPR and programme requirements.',
          bg: 'Подкрепяме подготовката на планове за управление на данни (DMP) и процедури за събиране, съхранение, достъп, споделяне, запазване и защита на данни в съответствие с GDPR и изискванията на програмата.',
        },
        icon: FileCheck2,
      },
      {
        title: { en: 'Risk identification and mitigation', bg: "Оценка и управление на рискове" },
        text: {
          en: 'We assess operational, financial, technical, legal, ethical and partnership risks, then define preventive and response actions.',
          bg: "Идентифицираме потенциалните рискове и разработваме мерки за тяхното предотвратяване и ограничаване.",
        },
        icon: Gauge,
      },
    ],
  },
  {
    id: 'project-management',
    title: { en: 'Project management and implementation', bg: 'Управление и изпълнение на проекти' },
    subtitle: {
      en: "Effective coordination, efficient implementation and successful project delivery.",
      bg: "Професионална подкрепа от одобрението на проекта до постигането на значими и устойчиви резултати.",
    },
    icon: Users,
    intro: {
      en: "Successful project implementation requires coordination, planning, timely delivery and careful administrative and financial management. V&A Projects provides professional support throughout the project lifecycle, helping consortia coordinate activities, manage resources, fulfil contractual obligations and achieve their objectives.",
      bg: "Успешното изпълнение изисква ефективна координация, добро планиране, спазване на сроковете и прецизно административно и финансово управление. V&A Projects предоставя професионална подкрепа през всички етапи на реализацията, като подпомага координацията между партньорите, проследяването на напредъка, изпълнението на договорните задължения и постигането на заложените резултати.",
    },
    result: {
      en: 'Our role is to provide the discipline, coordination and practical support needed to keep the project on schedule and in line with its contractual commitments.',
      bg: 'Нашата роля е да осигурим дисциплината, координацията и практическата подкрепа, нужни проектът да остане в график и в съответствие с договорните си ангажименти.',
    },
    support: [
      {
        title: { en: "Project setup and organisation", bg: 'Стартиране на проекта' },
        text: {
          en: "We establish effective project management structures, defining procedures, partner responsibilities, communication channels and monitoring and reporting arrangements.",
          bg: "Изграждаме ефективна организация на работа, като определяме управленските процедури, отговорностите, начините за комуникация и механизмите за проследяване и отчитане.",
        },
        icon: Rocket,
      },
      {
        title: { en: 'Grant agreement preparation', bg: "Подготовка на договора за финансиране" },
        text: {
          en: "We support the collection and organisation of documentation required during the grant agreement preparation stage.",
          bg: "Съдействаме при подготовката на необходимата документация, координацията с партньорите и сключването на споразумение за финансиране.",
        },
        icon: FileCheck2,
      },
      {
        title: { en: 'Consortium coordination', bg: "Координация на партньорството" },
        text: {
          en: "We facilitate communication and collaboration among partners, coordinate responsibilities, monitor contributions and organise project meetings, documentation and follow-up activities.",
          bg: "Поддържаме активна комуникация между партньорите, координираме изпълнението на ангажиментите им и организираме работни срещи, обсъждания и последващи действия.",
        },
        icon: Handshake,
      },
      {
        title: { en: "Operational management", bg: "Оперативно управление" },
        text: {
          en: "We oversee day-to-day project activities, coordinate work packages and tasks, manage documentation and support effective decision-making and the fulfilment of partner obligations.",
          bg: "Координираме ежедневното изпълнение на проекта, следим дейностите и работните пакети, организираме документацията и подпомагаме своевременното вземане на решения.",
        },
        icon: ListChecks,
      },
      {
        title: { en: "Progress monitoring and timeline management", bg: "Проследяване на напредъка и сроковете" },
        text: {
          en: "We monitor progress against the approved work plan, track milestones and deadlines and identify potential delays to ensure timely project delivery.",
          bg: "Следим изпълнението спрямо одобрения работен план, контролираме спазването на сроковете и идентифицираме своевременно възможни забавяния и отклонения.",
        },
        icon: Gauge,
      },
      {
        title: { en: 'Deliverables and reporting', bg: "Управление на резултатите и отчитане" },
        text: {
          en: 'We coordinate deliverable review and submission, verify milestones and support periodic and final narrative and financial reporting.',
          bg: "Координираме подготовката и прегледа на проектните резултати, проследяваме изпълнението на ключовите етапи и съдействаме при изготвянето на междинни и окончателни отчети.",
        },
        icon: ClipboardCheck,
      },
    ],
  },
];

export default function Services() {
  const { lang, t } = useLanguage();
  const [activeService, setActiveService] = useState(0);
  const selected = services[activeService];
  const SelectedIcon = selected.icon;

  return (
    <>
      <Seo
        title={t('services.title')}
        description={t('services.lead')}
        image={ASSETS.servicesHero}
      />

      <section className={styles.servicesSection} data-testid="services-overview">
        <div className="container">
          <h1 className="visually-hidden">{t('services.title')}</h1>
          <div className={styles.serviceSelectorGrid} aria-label={t('services.serviceOverviewLabel')}>
            {services.map((service, index) => {
              const ServiceIcon = service.icon;
              return (
                <button
                  type="button"
                  className={`${styles.serviceSelector} ${
                    activeService === index ? styles.activeSelector : ''
                  }`.trim()}
                  key={service.id}
                  aria-pressed={activeService === index}
                  aria-controls="service-detail"
                  onClick={() => setActiveService(index)}
                >
                  <span className={styles.selectorIcon}>
                    <ServiceIcon size={28} strokeWidth={1.55} aria-hidden="true" />
                  </span>
                  <strong>{loc(service.title, lang)}</strong>
                  <span>{loc(service.subtitle, lang)}</span>
                </button>
              );
            })}
          </div>

          <article className={styles.serviceDetail} id="service-detail" key={selected.id}>
            <div className={styles.detailHeader}>
              <span className="icon-circle">
                <SelectedIcon size={30} strokeWidth={1.5} aria-hidden="true" />
              </span>
              <div>
                <span className="eyebrow">{loc(selected.subtitle, lang)}</span>
                <h2>{loc(selected.title, lang)}</h2>
              </div>
            </div>

            <p className={styles.detailIntro}>{loc(selected.intro, lang)}</p>

            <div className={styles.supportGrid}>
              {selected.support.map((item) => {
                const ItemIcon = item.icon;
                return (
                  <article className={styles.supportCard} key={item.title.en}>
                    <div className={styles.supportCardHeader}>
                      <span>
                        <ItemIcon size={24} strokeWidth={1.7} aria-hidden="true" />
                      </span>
                      <h3>{loc(item.title, lang)}</h3>
                    </div>
                    <p>{loc(item.text, lang)}</p>
                  </article>
                );
              })}
            </div>
          </article>
        </div>
      </section>

      <section className={styles.deliverySection}>
        <div className="container">
          <div className={styles.deliveryPanel}>
            <h2>{t('services.startTitle')}</h2>
            <p>{t('services.startText')}</p>
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
