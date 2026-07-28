import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Anchor,
  Atom,
  BadgeCheck,
  BookOpenCheck,
  BrainCircuit,
  ExternalLink,
  GraduationCap,
  HeartPulse,
  Leaf,
  Mail,
  Network,
  Scale,
  Sprout,
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
  intro: Localized;
  supportTitle: Localized;
  support: Localized;
}

interface ExpertiseArea {
  title: Localized;
  text: Localized;
  icon: LucideIcon;
}

const programmes: ProgrammeDetail[] = [
  {
    id: 'erasmus',
    title: 'Erasmus+',
    eyebrow: { en: 'Education, training, youth and sport', bg: 'Образование, обучение, младеж и спорт' },
    lead: {
      en: 'Erasmus+ supports learning mobility, international cooperation, organisational development, innovation and the exchange of good practices across Europe and beyond.',
      bg: 'Erasmus+ подкрепя учебната мобилност, международното сътрудничество, организационното развитие, иновациите и обмена на добри практики в Европа и извън нея.',
    },
    visualCue: {
      en: 'Education, mobility, teachers, learners, European cities',
      bg: 'Образование, мобилност, учители, учащи и европейски градове',
    },
    officialUrl: 'https://erasmus-plus.ec.europa.eu/',
    emailCta: { en: 'Plan an Erasmus+ project', bg: 'Планирайте Erasmus+ проект' },
    icon: GraduationCap,
    focus: {
      en: [
        'KA1 mobility projects and Erasmus+ accreditation',
        'KA2 cooperation partnerships',
        'Capacity Building projects',
        'Centres of Vocational Excellence',
      ],
      bg: [
        'KA1 проекти за мобилност и Erasmus+ акредитация',
        'KA2 партньорства за сътрудничество',
        'Проекти за изграждане на капацитет',
        'Центрове за професионално съвършенство',
      ],
    },
    intro: {
      en: 'The programme offers opportunities to schools, vocational education and training providers, universities, adult education organisations, youth organisations, sports bodies, public institutions and other organisations active in learning and skills development. Its current priorities place particular importance on inclusion and diversity, digital transformation, environmental responsibility and participation in democratic life.',
      bg: 'Програмата предлага възможности за училища, доставчици на професионално образование и обучение, университети, организации за образование на възрастни, младежки организации, спортни структури, публични институции и други организации, активни в ученето и развитието на умения. Актуалните приоритети поставят особен акцент върху приобщаването и многообразието, дигиталната трансформация, екологичната отговорност и участието в демократичния живот.',
    },
    supportTitle: {
      en: 'How V&A Projects supports your Erasmus+ application',
      bg: 'Как V&A Projects подкрепя вашата Erasmus+ кандидатура',
    },
    support: {
      en: 'We examine the organisation\'s needs, target groups and international development goals, then transform these priorities into clear objectives, suitable mobility or cooperation activities and measurable results. After approval, we can assist with project setup, partner communication, mobility documentation, implementation monitoring, dissemination, final reporting, consortium formation, work-package development, quality control and partner coordination.',
      bg: 'Преглеждаме нуждите на организацията, целевите групи и целите за международно развитие, след което превръщаме тези приоритети в ясни цели, подходящи мобилности или дейности за сътрудничество и измерими резултати. След одобрение можем да съдействаме със стартиране на проекта, комуникация с партньори, документация за мобилности, мониторинг на изпълнението, разпространение, финално отчитане, формиране на консорциум, разработване на работни пакети, контрол на качеството и партньорска координация.',
    },
  },
  {
    id: 'horizon',
    title: 'Horizon Europe',
    eyebrow: { en: 'Research and innovation', bg: 'Наука и иновации' },
    lead: {
      en: 'Horizon Europe supports scientific excellence, technological development, innovation and international cooperation in areas that respond to major European challenges.',
      bg: 'Horizon Europe подкрепя научното съвършенство, технологичното развитие, иновациите и международното сътрудничество в области, които отговарят на големи европейски предизвикателства.',
    },
    visualCue: {
      en: 'Nature, research, innovation and European connection',
      bg: 'Природа, изследвания, иновации и европейска свързаност',
    },
    officialUrl:
      'https://research-and-innovation.ec.europa.eu/funding/funding-opportunities/funding-programmes-and-open-calls/horizon-europe_en',
    emailCta: { en: 'Discuss a Horizon Europe idea', bg: 'Обсъдете идея за Horizon Europe' },
    icon: Atom,
    focus: {
      en: [
        'Climate, energy and transport',
        'Food, agriculture and bioeconomy',
        'Health, digital technologies and industry',
        'Culture, security, skills and social innovation',
      ],
      bg: [
        'Климат, енергия и транспорт',
        'Храни, земеделие и биоикономика',
        'Здраве, дигитални технологии и индустрия',
        'Култура, сигурност, умения и социални иновации',
      ],
    },
    intro: {
      en: 'The programme funds projects involving universities, research organisations, businesses, public authorities, NGOs, end users and other specialist organisations. Many Horizon Europe calls require multidisciplinary consortia that bring together research, technology, policy, business and societal expertise from several countries.',
      bg: 'Програмата финансира проекти с участието на университети, научни организации, бизнеси, публични власти, неправителствени организации, крайни потребители и други специализирани организации. Много покани по Horizon Europe изискват мултидисциплинарни консорциуми, които обединяват научна, технологична, политическа, бизнес и обществена експертиза от няколко държави.',
    },
    supportTitle: {
      en: 'How V&A Projects supports Horizon Europe partnerships',
      bg: 'Как V&A Projects подкрепя партньорства по Horizon Europe',
    },
    support: {
      en: 'Complex proposals require a clear relationship between the challenge, proposed solution, consortium expertise, work plan and expected European value. We support coordinators in maintaining this consistency, coordinating partner input and preparing or reviewing the application narrative. We also help consortium members define their role, tasks, resources and expected contribution, and after approval can support setup, coordination, quality assurance, risk monitoring, technical reporting, communication, dissemination and exploitation.',
      bg: 'Сложните предложения изискват ясна връзка между предизвикателството, предложеното решение, експертизата на консорциума, работния план и очакваната европейска стойност. Подкрепяме координаторите да поддържат тази последователност, да координират приноса на партньорите и да подготвят или преглеждат проектния разказ. Помагаме и на партньорите да дефинират своята роля, задачи, ресурси и очакван принос, а след одобрение можем да съдействаме със стартиране, координация, осигуряване на качество, мониторинг на рискове, техническо отчитане, комуникация, разпространение и използване на резултатите.',
    },
  },
  {
    id: 'cerv',
    title: 'CERV',
    eyebrow: { en: 'Citizens, Equality, Rights and Values', bg: 'Граждани, равенство, права и ценности' },
    lead: {
      en: 'CERV supports open, equal, inclusive and democratic societies based on the rule of law and the fundamental values of the European Union.',
      bg: 'CERV подкрепя отворени, равни, приобщаващи и демократични общества, основани на върховенството на правото и основните ценности на Европейския съюз.',
    },
    visualCue: {
      en: 'Human rights, civic spaces, European symbols',
      bg: 'Човешки права, граждански пространства и европейски символи',
    },
    officialUrl:
      'https://commission.europa.eu/funding-and-tenders/find-funding/eu-funding-programmes/citizens-equality-rights-and-values-programme/citizens-equality-rights-and-values-programme-overview_en',
    emailCta: { en: 'Explore CERV support', bg: 'Обсъдете подкрепа по CERV' },
    icon: Scale,
    focus: {
      en: [
        'Rights protection and equality',
        'Civil society and democratic participation',
        'European remembrance and shared history',
        'Prevention of violence',
      ],
      bg: [
        'Защита на права и равенство',
        'Гражданско общество и демократично участие',
        'Европейска памет и споделена история',
        'Превенция на насилието',
      ],
    },
    intro: {
      en: 'The programme is particularly relevant to NGOs, civil society organisations, municipalities, public institutions, universities, schools, equality bodies, professional networks and organisations working with communities and groups whose rights or participation may be at risk.',
      bg: 'Програмата е особено подходяща за неправителствени организации, организации на гражданското общество, общини, публични институции, университети, училища, органи по равенство, професионални мрежи и организации, работещи с общности и групи, чиито права или участие могат да бъдат изложени на риск.',
    },
    supportTitle: {
      en: 'How V&A Projects supports CERV applicants',
      bg: 'Как V&A Projects подкрепя кандидати по CERV',
    },
    support: {
      en: 'CERV proposals require a strong understanding of the social or rights-related problem, the people affected and the practical change the project intends to achieve. We help applicants define needs, target groups, objectives, activities and expected results. We can support partner identification, transnational cooperation, proposal writing, budgeting, risk planning, safeguarding, ethics, data protection, monitoring indicators, project management, stakeholder engagement, communication campaigns, policy dialogue, event planning and evaluation of social results.',
      bg: 'Предложенията по CERV изискват силно разбиране на социалния или правозащитен проблем, засегнатите хора и практическата промяна, която проектът цели да постигне. Помагаме на кандидатите да дефинират нужди, целеви групи, цели, дейности и очаквани резултати. Можем да подкрепим идентифициране на партньори, транснационално сътрудничество, писане на предложение, бюджетиране, планиране на рискове, защита на участници, етика, защита на данните, индикатори за мониторинг, управление на проекта, ангажиране на заинтересовани страни, комуникационни кампании, политически диалог, планиране на събития и оценка на социалните резултати.',
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

const expertiseAreas: ExpertiseArea[] = [
  {
    title: {
      en: 'Social Sciences, Human Rights & International Law',
      bg: 'Социални науки, човешки права и международно право',
    },
    text: {
      en: 'Social sciences, human rights protection, equality, inclusion, democratic participation, international law and rights-based policy development.',
      bg: 'Социални науки, защита на човешките права, равенство, приобщаване, демократично участие, международно право и политики, основани на права.',
    },
    icon: Scale,
  },
  {
    title: { en: 'Maritime & Blue Economy', bg: 'Морско дело и синя икономика' },
    text: {
      en: 'Maritime education, marine innovation, blue growth, safety at sea, maritime sustainability and projects linked to the future of the maritime sector.',
      bg: 'Морско образование, морски иновации, син растеж, безопасност на море, морска устойчивост и проекти, свързани с бъдещето на морския сектор.',
    },
    icon: Anchor,
  },
  {
    title: {
      en: 'Engineering, AI & Digital Technologies',
      bg: 'Инженерство, AI и дигитални технологии',
    },
    text: {
      en: 'Engineering, artificial intelligence, computer science, programming, digital systems, smart solutions and technology-driven innovation.',
      bg: 'Инженерство, изкуствен интелект, компютърни науки, програмиране, дигитални системи, умни решения и технологично водени иновации.',
    },
    icon: BrainCircuit,
  },
  {
    title: {
      en: 'Agronomy, Environment & Sustainable Development',
      bg: 'Агрономия, околна среда и устойчиво развитие',
    },
    text: {
      en: 'Agronomy, agriculture, biodiversity, natural resources, environmental protection, sustainability and green transition initiatives.',
      bg: 'Агрономия, земеделие, биоразнообразие, природни ресурси, опазване на околната среда, устойчивост и инициативи за зелен преход.',
    },
    icon: Sprout,
  },
  {
    title: { en: 'Education, Business & Innovation', bg: 'Образование, бизнес и иновации' },
    text: {
      en: 'Education and training, organisational development, entrepreneurship, business growth, innovation management, skills development and new approaches to learning and professional development.',
      bg: 'Образование и обучение, организационно развитие, предприемачество, бизнес растеж, управление на иновации, развитие на умения и нови подходи към ученето и професионалното развитие.',
    },
    icon: BookOpenCheck,
  },
  {
    title: { en: 'Health, Medicine & Life Sciences', bg: 'Здраве, медицина и науки за живота' },
    text: {
      en: 'Health, medicine, biology, life sciences, well-being, public health and research-driven solutions for healthier communities.',
      bg: 'Здраве, медицина, биология, науки за живота, благосъстояние, обществено здраве и научно базирани решения за по-здрави общности.',
    },
    icon: HeartPulse,
  },
];

const getProgrammeIndex = (id: string | null) => {
  const index = programmes.findIndex((programme) => programme.id === id);
  return index >= 0 ? index : 0;
};

export default function Programmes() {
  const { lang, t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeProgramme, setActiveProgramme] = useState(() =>
    getProgrammeIndex(searchParams.get('programme')),
  );
  const selected = programmes[activeProgramme];
  const SelectedIcon = selected.icon;

  useEffect(() => {
    setActiveProgramme(getProgrammeIndex(searchParams.get('programme')));
  }, [searchParams]);

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
              <span className="eyebrow">{t('programmes.title')}</span>
              <h1 className={styles.heroTitle}>
                {t('programmes.heroLine1')}
                <em>{t('programmes.heroLine2')}</em>
                <strong>{t('programmes.heroLine3')}</strong>
              </h1>
              <span className="dash" />
              <p className={styles.heroLead}>{t('programmes.lead')}</p>
            </div>

            <div className={styles.heroPanel}>
              <span>{t('programmes.explore')}</span>
              <strong>{t('programmes.keyProgrammes')}</strong>
              <p>{t('programmes.keyProgrammesText')}</p>
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

              <div className={styles.spotlightActions}>
                <SecondaryButton href={selected.officialUrl} icon={ExternalLink}>
                  {t('programmes.officialWebsite')}
                </SecondaryButton>
                <PrimaryButton type="button" onClick={openConsultationModal} icon={Mail}>
                  {loc(selected.emailCta, lang)}
                </PrimaryButton>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.matchSection}>
        <div className="container">
          <div className={styles.matchPanel}>
            <article className={styles.programmeDetail} id="programme-detail" role="tabpanel">
              <div className={styles.dossierTop} key={`${selected.id}-dossier`}>
                <div className={styles.dossierCard}>
                  <span className="icon-circle">
                    <SelectedIcon size={28} strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <span className="eyebrow">{t('programmes.dossier')}</span>
                  <h2>{selected.title}</h2>
                  <p>{loc(selected.intro, lang)}</p>
                </div>

                <div className={styles.dossierTimeline} aria-label={`${selected.title} ${t('programmes.supportFlowLabel')}`}>
                  <article>
                    <span>01</span>
                    <div>
                      <h3>{t('programmes.match')}</h3>
                      <p>{t('programmes.matchText')}</p>
                    </div>
                  </article>
                  <article>
                    <span>02</span>
                    <div>
                      <h3>{t('programmes.shape')}</h3>
                      <p>{t('programmes.shapeText')}</p>
                    </div>
                  </article>
                  <article>
                    <span>03</span>
                    <div>
                      <h3>{t('programmes.strengthen')}</h3>
                      <p>{t('programmes.strengthenText')}</p>
                    </div>
                  </article>
                </div>
              </div>

              <div className={styles.dossierGrid}>
                <div className={styles.supportBox}>
                  <BadgeCheck size={21} strokeWidth={1.7} aria-hidden="true" />
                  <div>
                    <h3>{loc(selected.supportTitle, lang)}</h3>
                    <p>{loc(selected.support, lang)}</p>
                  </div>
                </div>

                <div className={styles.focusPanel}>
                  <span className="eyebrow">{t('programmes.relevantFor')}</span>
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

              <div className={styles.detailActions}>
                <SecondaryButton href={selected.officialUrl} icon={ExternalLink}>
                  {t('programmes.visitOfficialWebsite')}
                </SecondaryButton>
                <PrimaryButton type="button" onClick={openConsultationModal} icon={Mail}>
                  {loc(selected.emailCta, lang)}
                </PrimaryButton>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.expertiseSection}>
        <div className="container">
          <div className={styles.expertiseHeader}>
            <span className="eyebrow">{t('programmes.expertiseEyebrow')}</span>
            <h2>{t('programmes.expertiseTitle')}</h2>
            <span className="dash" />
            <p>{t('programmes.expertiseText')}</p>
          </div>

          <div className={styles.expertiseGrid}>
            {expertiseAreas.map((area) => {
              const AreaIcon = area.icon;
              return (
                <article className={styles.expertiseCard} key={area.title.en}>
                  <span>
                    <AreaIcon size={24} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <div>
                    <h3>{loc(area.title, lang)}</h3>
                    <p>{loc(area.text, lang)}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.routeSection}>
        <div className="container">
          <div className={styles.routePanel}>
            <div>
              <span className="eyebrow">{t('programmes.notSure')}</span>
              <h2>{t('programmes.routeTitle')}</h2>
              <p>{t('programmes.routeText')}</p>
            </div>
            <div className={styles.routeSteps}>
              <span>Erasmus+</span>
              <span>Horizon Europe</span>
              <span>CERV</span>
              <span>LIFE</span>
              <span>{t('programmes.otherCalls')}</span>
            </div>
            <PrimaryButton type="button" onClick={openConsultationModal}>
              {t('programmes.discussRightProgramme')}
            </PrimaryButton>
          </div>
        </div>
      </section>
    </>
  );
}
