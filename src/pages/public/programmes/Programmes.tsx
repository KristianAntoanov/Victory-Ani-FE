import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Atom,
  BadgeCheck,
  ChevronDown,
  ExternalLink,
  GraduationCap,
  Leaf,
  Mail,
  MessagesSquare,
  Network,
  Scale,
  type LucideIcon,
} from 'lucide-react';
import Seo from '@/components/common/Seo';
import PrimaryButton from '@/components/common/PrimaryButton';
import SecondaryButton from '@/components/common/SecondaryButton';
import { ASSETS } from '@/constants';
import { useLanguage } from '@/context/LanguageContext';
import { loc, locList, type Localized, type LocalizedList } from '@/i18n';
import { openConsultationModal } from '@/utils/consultationModal';
import styles from './Programmes.module.css';

interface ProgrammeDetail {
  id: string;
  title: string;
  eyebrow: Localized;
  lead: Localized;
  visualCue: Localized;
  officialUrl: string;
  emailCta: Localized;
  icon: LucideIcon;
  focus: LocalizedList;
  focusTitle?: Localized;
  intro: Localized;
  supportTitle: Localized;
  support: Localized;
}

const programmes: ProgrammeDetail[] = [
  {
    id: 'erasmus',
    title: 'Erasmus+',
    eyebrow: { en: 'Education, training, youth and sport', bg: 'Образование, обучение, младеж и спорт' },
    lead: {
      en: "Erasmus+ promotes learning mobility, international cooperation and the exchange of good practices, supporting organisational development, innovation and skills development across Europe and beyond.",
      bg: "Програма „Еразъм+“ насърчава образователната мобилност, международното сътрудничество и обмена на добри практики, като подкрепя развитието на организациите, внедряването на иновации и усъвършенстването на уменията в Европа и извън нея.",
    },
    visualCue: {
      en: 'Education, mobility, teachers, learners, European cities',
      bg: 'Образование, мобилност, учители, учащи и европейски градове',
    },
    officialUrl: 'https://erasmus-plus.ec.europa.eu/',
    emailCta: { en: 'Plan an Erasmus+ project', bg: 'Планирайте Erasmus+ проект' },
    icon: GraduationCap,
    focus: {
      en: ["Key Action 1 (KA1): Learning Mobility of Individuals and Erasmus Accreditation", "Key Action 2 (KA2): Cooperation among Organisations and Institutions", "Capacity Building in higher education, vocational education and training, youth and sport", "Partnerships for Excellence, including Centres of Vocational Excellence (CoVE)"],
      bg: ["Ключова дейност 1 (KA1): Образователна мобилност и акредитация", "Ключова дейност 2 (KA2): Партньорства за сътрудничество", "Международни проекти за изграждане на капацитет в областта на образованието и обучението", "Центрове за високи постижения в областта на професионалното образование и обучение", "Партньорства за високи постижения"],
    },
    intro: {
      en: "The programme provides funding opportunities for schools, vocational education and training providers, higher education institutions, adult education organisations, youth and sports organisations, public institutions and other organisations involved in education, training and lifelong learning.\n\nIts four key priorities are inclusion and diversity, digital transformation, environment and the fight against climate change, and participation in democratic life.",
      bg: "Възможностите за финансиране са насочени към училища, институции за професионално образование и обучение, университети, организации за обучение на възрастни, младежки и спортни организации, публични институции и други участници в сферата на образованието и обучението.\n\nСред основните ѝ приоритети са приобщаването и многообразието, цифровата трансформация, околната среда и борбата с изменението на климата, както и участието в демократичния живот, общите ценности и гражданската ангажираност.",
    },
    supportTitle: {
      en: "How V&A Projects supports your Erasmus+ application",
      bg: "Как V&A Projects може да подпомогне вашата Erasmus+ кандидатура?",
    },
    support: {
      en: "We assess your organisation’s needs, priorities and international development goals, turning them into well-structured project proposals with clear objectives, relevant mobility or cooperation activities and measurable results. We also support the development of international partnerships and the preparation of work packages and project activities. Once your project is approved, we provide support with implementation and coordination, partner communication, mobility documentation, progress monitoring, quality assurance, dissemination of results and final reporting.",
      bg: "Анализираме потребностите на вашата организация, определяме приоритетите и целите за международно развитие и ги превръщаме в добре обосновани проектни предложения с конкретни дейности и измерими резултати. Съдействаме при планирането на образователни мобилности, изграждането на международни партньорства и разработването на проекти за сътрудничество. След одобрението предоставяме подкрепа при организацията и управлението на дейностите, координацията между партньорите, подготовката на документацията за мобилностите, мониторинга и осигуряването на качество, разпространението на резултатите и изготвянето на окончателния отчет.",
    },
  },
  {
    id: 'horizon',
    title: 'Horizon Europe',
    eyebrow: { en: 'Research and innovation', bg: 'Наука и иновации' },
    lead: {
      en: "Horizon Europe is the EU’s key funding programme for research and innovation, supporting scientific excellence, technological advancement and the development of innovative solutions to major global challenges.",
      bg: "„Хоризонт Европа“ е водещата програма на Европейския съюз за научни изследвания и иновации. Тя насърчава научните постижения, технологичния напредък и международното сътрудничество, като подкрепя разработването на иновативни решения за справяне с основните обществени, икономически и екологични предизвикателства.",
    },
    visualCue: {
      en: 'Nature, research, innovation and European connection',
      bg: 'Природа, изследвания, иновации и европейска свързаност',
    },
    officialUrl:
      'https://research-and-innovation.ec.europa.eu/funding/funding-opportunities/funding-programmes-and-open-calls/horizon-europe_en',
    emailCta: { en: 'Discuss a Horizon Europe idea', bg: 'Обсъдете идея за Horizon Europe' },
    icon: Atom,
    focusTitle: { en: "Main thematic areas", bg: "Основни тематични направления" },
    focus: {
      en: ["Cluster 1: Health", "Cluster 2: Culture, Creativity and Inclusive Society", "Cluster 3: Civil Security for Society", "Cluster 4: Digital, Industry and Space", "Cluster 5: Climate, Energy and Mobility", "Cluster 6: Food, Bioeconomy, Natural Resources, Agriculture and Environment"],
      bg: ["Клъстер 1: Здравеопазване", "Клъстер 2: Култура, творчество и приобщаващо общество", "Клъстер 3: Гражданска сигурност за обществото", "Клъстер 4: Цифрова сфера, промишленост и космическо пространство", "Клъстер 5: Климат, енергия и мобилност", "Клъстер 6: Храни, биоикономика, природни ресурси, селско стопанство и околна среда"],
    },
    intro: {
      en: "The programme promotes international collaboration, strengthens European competitiveness and contributes to a more sustainable, resilient and prosperous future. It offers funding opportunities for universities, research institutions, businesses, public authorities, non-governmental organisations and other stakeholders engaged in research and innovation. Many funding calls require international, multidisciplinary consortia, bringing together complementary expertise to advance scientific discoveries, accelerate innovation and translate research into practical solutions with lasting benefits for society.",
      bg: "Програмата предоставя възможности за финансиране на университети, научноизследователски институти, предприятия, публични институции, неправителствени организации и други участници в областта на науката и иновациите. Много от поканите изискват международни интердисциплинарни консорциуми, които обединяват експерти от различни държави и сфери на дейност, включително науката, технологиите, бизнеса, публичното управление и гражданското общество.",
    },
    supportTitle: {
      en: "How can V&A Projects support your Horizon Europe application?",
      bg: "Как V&A Projects може да подкрепи вашата проектна идея?",
    },
    support: {
      en: "Developing a competitive Horizon Europe proposal requires a strong scientific concept, a clear methodology, a well-structured work plan and a consortium with the right expertise. V&A Projects supports project coordinators throughout the proposal development process, from preparing and reviewing application content to coordinating partner contributions, defining responsibilities and resources and demonstrating the project's expected impact. Once funding is secured, we provide specialised support with project management, consortium coordination, quality assurance, risk management, technical reporting, communication, dissemination and exploitation of results.\n\nPlanning a Horizon Europe proposal or looking for an experienced consortium partner? Get in touch to explore opportunities for collaboration.",
      bg: "Разработването на успешно проектно предложение по „Хоризонт Европа“ изисква ясна концепция, научна обосновка, работен план и партньорство с необходимата експертиза. V&A Projects подпомага координаторите при подготовката на проектните предложения, координацията между партньорите, разпределението на задачите и ресурсите и формулирането на очакваните резултати и въздействие. След одобрението на проекта предоставяме специализирана подкрепа при управлението и координацията на дейностите, осигуряването на качество, мониторинга и управлението на рисковете, техническото отчитане, комуникацията, разпространението и използването на резултатите.\n\nПланирате проект по „Хоризонт Европа“ или търсите опитен партньор за вашия консорциум? Свържете се с нас, за да обсъдим възможностите за сътрудничество.",
    },
  },
  {
    id: 'cerv',
    title: 'CERV',
    eyebrow: { en: 'Citizens, Equality, Rights and Values', bg: 'Граждани, равенство, права и ценности' },
    lead: {
      en: "The Citizens, Equality, Rights and Values (CERV) programme promotes and protects the fundamental rights and values of the European Union. It supports the development of open, democratic, equal and inclusive societies founded on the rule of law, while encouraging civic participation, equality, non-discrimination and the protection of human rights.",
      bg: "Програмата „Граждани, равенство, права и ценности“ (CERV) защитава и насърчава основните права и ценности на Европейския съюз, като подкрепя развитието на демократични, справедливи и приобщаващи общества, основани на принципите на правовата държава. Тя насърчава гражданското участие, равенството и недискриминацията, защитата на човешките права и активната роля на гражданското общество.",
    },
    visualCue: {
      en: 'Human rights, civic spaces, European symbols',
      bg: 'Човешки права, граждански пространства и европейски символи',
    },
    officialUrl:
      'https://commission.europa.eu/funding-and-tenders/find-funding/eu-funding-programmes/citizens-equality-rights-and-values-programme/citizens-equality-rights-and-values-programme-overview_en',
    emailCta: { en: 'Explore CERV support', bg: 'Обсъдете подкрепа по CERV' },
    icon: Scale,
    focusTitle: { en: "Main CERV strands", bg: "Основни направления на CERV" },
    focus: {
      en: ["Protection and promotion of EU values", "Human rights protection, equality and non-discrimination", "Citizens’ engagement and participation in democratic life", "Daphne: Preventing and combating violence, including violence against women and children"],
      bg: ["Защита и утвърждаване на основните ценности на ЕС", "Защита на правата на човека, равенство и борба с дискриминацията", "Гражданска ангажираност и участие в демократичния живот", "„Дафне“ (Daphne): Превенция и борба с насилието, включително насилието срещу жени и деца"],
    },
    intro: {
      en: "The programme offers funding opportunities for civil society organisations, NGOs, local and public authorities, universities, educational institutions, equality bodies and other organisations committed to promoting European values and fundamental rights. Particular emphasis is placed on strengthening civil society, protecting vulnerable groups, promoting equal opportunities and encouraging active participation in democratic life.",
      bg: "Възможностите за финансиране са насочени предимно към неправителствени организации и организации на гражданското общество, но обхващат също общини, публични институции, университети, училища, органи за защита от дискриминация и други организации, работещи за утвърждаване на европейските ценности. Особено внимание се отделя на инициативи в подкрепа на уязвими групи, равните възможности и участието на гражданите в демократичния живот.",
    },
    supportTitle: {
      en: "How can V&A Projects support your CERV application?",
      bg: "Как V&A Projects може да подкрепи вашата кандидатура?",
    },
    support: {
      en: "Whether you have an initial idea or are preparing a CERV funding application, V&A Projects can support you at every stage. We help organisations develop strong project concepts, identify suitable funding opportunities, build international partnerships and prepare competitive proposals with clear objectives, well-planned activities and measurable results.\n\nOnce your project is approved, we can assist with project management, partner coordination, quality assurance, ethics and safeguarding, monitoring and evaluation, communication campaigns, stakeholder engagement and reporting.\n\nHave a CERV project in mind or looking for an experienced partner? Get in touch to discuss your idea and explore how we can work together.",
      bg: "Разработването на успешно проектно предложение по CERV изисква задълбочено разбиране на обществените проблеми, потребностите на целевите групи и възможностите за постигане на реална промяна. V&A Projects подпомага организациите при формулирането на ясни цели, планирането на дейности и очаквани резултати, изграждането на международни партньорства и подготовката на конкурентоспособни предложения за финансиране.\n\nСлед одобрението предоставяме експертна подкрепа при управлението и координацията на проекта, осигуряването на качество, спазването на етичните изисквания и защитата на участниците. Съдействаме също при организирането на информационни кампании, обществени дискусии и инициативи за гражданско участие, както и при мониторинга и оценката на постигнатите резултати и общественото въздействие.\n\nИмате идея за проект по CERV или търсите партньор с експертиза в областта на човешките права и гражданското участие? Свържете се с нас, за да обсъдим възможностите за сътрудничество.",
    },
  },
  {
    id: 'life',
    title: 'LIFE',
    eyebrow: { en: 'Environment and climate action', bg: 'Околна среда и действия за климата' },
    lead: {
      en: 'LIFE supports projects that protect nature, improve environmental quality, respond to climate change and accelerate the transition towards a cleaner economy.',
      bg: 'LIFE подкрепя проекти, които защитават природата, подобряват качеството на околната среда, отговарят на климатичните промени и ускоряват прехода към по-чиста икономика.',
    },
    visualCue: {
      en: 'Nature, landscapes, water, materials, plants and scientific illustrations',
      bg: 'Природа, пейзажи, вода, материали, растения и научни илюстрации',
    },
    officialUrl: 'https://cinea.ec.europa.eu/programmes/life_en',
    emailCta: { en: 'Explore LIFE support', bg: 'Обсъдете подкрепа по LIFE' },
    icon: Leaf,
    focus: {
      en: [
        'Nature protection and biodiversity',
        'Environmental quality',
        'Climate change response',
        'Resource-efficient economy',
      ],
      bg: [
        'Защита на природата и биоразнообразие',
        'Качество на околната среда',
        'Отговор на климатичните промени',
        'Ресурсно ефективна икономика',
      ],
    },
    intro: {
      en: 'The programme is suitable for public authorities, municipalities, environmental organisations, universities, research bodies, businesses and partnerships developing practical environmental and climate solutions. LIFE places strong emphasis on implementation, demonstration, replication and measurable environmental results.',
      bg: 'Програмата е подходяща за публични власти, общини, екологични организации, университети, научни структури, бизнеси и партньорства, които разработват практически екологични и климатични решения. LIFE поставя силен акцент върху изпълнението, демонстрацията, възпроизвеждането и измеримите екологични резултати.',
    },
    supportTitle: {
      en: 'How V&A Projects supports LIFE applicants',
      bg: 'Как V&A Projects подкрепя кандидати по LIFE',
    },
    support: {
      en: 'We support applicants in defining the environmental problem, establishing baseline conditions and translating technical solutions into a clear implementation plan. Our services may include call analysis, concept development, consortium building, work planning, indicators, risk management, budgeting, proposal writing, replication activities, policy value, stakeholder participation, communication and long-term continuation of results. For funded projects, we offer management support, quality monitoring, partner coordination, technical reporting, dissemination and documentation of environmental results.',
      bg: 'Подкрепяме кандидатите при дефиниране на екологичния проблем, установяване на базови условия и превръщане на техническите решения в ясен план за изпълнение. Услугите ни могат да включват анализ на поканата, развитие на концепция, изграждане на консорциум, работно планиране, индикатори, управление на рискове, бюджетиране, писане на предложение, дейности за възпроизвеждане, политическа стойност, участие на заинтересовани страни, комуникация и дългосрочно продължаване на резултатите. За финансирани проекти предлагаме управленска подкрепа, мониторинг на качеството, партньорска координация, техническо отчитане, разпространение и документиране на екологичните резултати.',
    },
  },
];

const getProgrammeIndex = (id: string | null) => {
  const index = programmes.findIndex((programme) => programme.id === id);
  return index >= 0 ? index : 0;
};

export default function Programmes() {
  const { lang, t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [expandedCopy, setExpandedCopy] = useState<string[]>([]);
  const [activeProgramme, setActiveProgramme] = useState(() =>
    getProgrammeIndex(searchParams.get('programme')),
  );
  const selected = programmes[activeProgramme];
  const SelectedIcon = selected.icon;

  useEffect(() => {
    setActiveProgramme(getProgrammeIndex(searchParams.get('programme')));
  }, [searchParams]);

  const toggleCopy = (copyId: string) => {
    setExpandedCopy((current) => (
      current.includes(copyId)
        ? current.filter((id) => id !== copyId)
        : [...current, copyId]
    ));
  };

  const supportCopyId = `${selected.id}-support`;

  return (
    <>
      <Seo
        title={t('programmes.title')}
        description={t('programmes.lead')}
        image={ASSETS.programmesHero}
      />

      <section className={styles.hero} data-testid="programmes-hero">
        <div className="container">
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>
                {t('programmes.heroLine1')}
                {' '}
                <em>{t('programmes.heroLine2')}</em>
                {' '}
                <strong>{t('programmes.heroLine3')}</strong>
              </h1>
              <span className="dash" />
              <p className={styles.heroLead}>{t('programmes.lead')}</p>
            </div>
          </div>

          <div className={styles.programmeWorkspace}>
            <div className={styles.programmeCards} role="tablist" aria-label={t('programmes.programmesLabel')}>
              {programmes.map((programme, index) => {
                const ProgrammeIcon = programme.icon;
                return (
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeProgramme === index}
                    aria-controls="programme-spotlight"
                    className={activeProgramme === index ? styles.activeProgrammeCard : undefined}
                    key={programme.id}
                    onClick={() => {
                      setActiveProgramme(index);
                      setSearchParams({ programme: programme.id });
                    }}
                  >
                    <span className={styles.cardIndex}>{String(index + 1).padStart(2, '0')}</span>
                    <ProgrammeIcon size={22} strokeWidth={1.6} aria-hidden="true" />
                    <strong>{programme.title}</strong>
                    <small>{loc(programme.eyebrow, lang)}</small>
                  </button>
                );
              })}
            </div>

            <article className={styles.programmeSpotlight} id="programme-spotlight" key={selected.id}>
              <div className={styles.spotlightHeader}>
                <span className="icon-circle">
                  <SelectedIcon size={30} strokeWidth={1.5} aria-hidden="true" />
                </span>
                <div>
                  <span className="eyebrow">{loc(selected.eyebrow, lang)}</span>
                  <h2>{selected.title}</h2>
                </div>
              </div>

              <p>{loc(selected.lead, lang)}</p>
              {loc(selected.intro, lang).split('\n\n').map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </article>
          </div>
        </div>
      </section>

      <section className={styles.matchSection}>
        <div className="container">
          <div className={styles.matchPanel}>
            <article className={styles.programmeDetail} id="programme-detail" role="tabpanel">
              <div className={styles.dossierGrid}>
                <div className={styles.supportColumn}>
                  <div className={styles.supportBox}>
                    <BadgeCheck size={21} strokeWidth={1.7} aria-hidden="true" />
                    <div>
                      <h3>{loc(selected.supportTitle, lang)}</h3>
                      <div
                        className={`${styles.mobileCopy} ${expandedCopy.includes(supportCopyId) ? styles.mobileCopyExpanded : ''}`.trim()}
                        id={`programme-support-${selected.id}`}
                      >
                        {loc(selected.support, lang).split('\n\n').map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                      </div>
                      <button
                        type="button"
                        className={styles.copyToggle}
                        aria-expanded={expandedCopy.includes(supportCopyId)}
                        aria-controls={`programme-support-${selected.id}`}
                        onClick={() => toggleCopy(supportCopyId)}
                      >
                        {expandedCopy.includes(supportCopyId) ? t('common.showLess') : t('common.readMore')}
                        <ChevronDown size={18} aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  <div className={styles.detailActions}>
                    <SecondaryButton href={selected.officialUrl} icon={ExternalLink}>
                      {t('programmes.visitOfficialWebsite')}
                    </SecondaryButton>
                    <PrimaryButton type="button" onClick={openConsultationModal} icon={Mail}>
                      {loc(selected.emailCta, lang)}
                    </PrimaryButton>
                  </div>
                </div>

                <div className={styles.focusPanel}>
                  <span className="eyebrow">{selected.focusTitle ? loc(selected.focusTitle, lang) : t('programmes.relevantFor')}</span>
                  <ul>
                    {locList(selected.focus, lang).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <div className={styles.visualCue}>
                    <Network size={18} strokeWidth={1.7} aria-hidden="true" />
                    <span>{loc(selected.visualCue, lang)}</span>
                  </div>
                </div>
              </div>

            </article>
          </div>
        </div>
      </section>

      <section className={styles.routeSection}>
        <div className="container">
          <div className={styles.routePanel}>
            <span className={styles.routeIcon}>
              <MessagesSquare size={28} strokeWidth={1.7} aria-hidden="true" />
            </span>
            <h2>
              {t('programmes.notSure')}
              <em>{t('programmes.routeContact')}</em>
            </h2>
            <PrimaryButton type="button" onClick={openConsultationModal}>
              {t('programmes.discussRightProgramme')}
            </PrimaryButton>
          </div>
        </div>
      </section>
    </>
  );
}
