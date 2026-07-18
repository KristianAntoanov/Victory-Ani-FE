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
import { openConsultationModal } from '@/utils/consultationModal';
import styles from './Programmes.module.css';

interface ProgrammeDetail {
  id: string;
  title: string;
  eyebrow: string;
  lead: string;
  visualCue: string;
  officialUrl: string;
  emailCta: string;
  icon: LucideIcon;
  focus: string[];
  intro: string;
  supportTitle: string;
  support: string;
}

interface ExpertiseArea {
  title: string;
  text: string;
  icon: LucideIcon;
}

const programmes: ProgrammeDetail[] = [
  {
    id: 'erasmus',
    title: 'Erasmus+',
    eyebrow: 'Education, training, youth and sport',
    lead:
      'Erasmus+ supports learning mobility, international cooperation, organisational development, innovation and the exchange of good practices across Europe and beyond.',
    visualCue: 'Education, mobility, teachers, learners, European cities',
    officialUrl: 'https://erasmus-plus.ec.europa.eu/',
    emailCta: 'Plan an Erasmus+ project',
    icon: GraduationCap,
    focus: [
      'KA1 mobility projects and Erasmus+ accreditation',
      'KA2 cooperation partnerships',
      'Capacity Building projects',
      'Centres of Vocational Excellence',
    ],
    intro:
      'The programme offers opportunities to schools, vocational education and training providers, universities, adult education organisations, youth organisations, sports bodies, public institutions and other organisations active in learning and skills development. Its current priorities place particular importance on inclusion and diversity, digital transformation, environmental responsibility and participation in democratic life.',
    supportTitle: 'How V&A Projects supports your Erasmus+ application',
    support:
      'We examine the organisation\'s needs, target groups and international development goals, then transform these priorities into clear objectives, suitable mobility or cooperation activities and measurable results. After approval, we can assist with project setup, partner communication, mobility documentation, implementation monitoring, dissemination, final reporting, consortium formation, work-package development, quality control and partner coordination.',
  },
  {
    id: 'horizon',
    title: 'Horizon Europe',
    eyebrow: 'Research and innovation',
    lead:
      'Horizon Europe supports scientific excellence, technological development, innovation and international cooperation in areas that respond to major European challenges.',
    visualCue: 'Nature, research, innovation and European connection',
    officialUrl:
      'https://research-and-innovation.ec.europa.eu/funding/funding-opportunities/funding-programmes-and-open-calls/horizon-europe_en',
    emailCta: 'Discuss a Horizon Europe idea',
    icon: Atom,
    focus: [
      'Climate, energy and transport',
      'Food, agriculture and bioeconomy',
      'Health, digital technologies and industry',
      'Culture, security, skills and social innovation',
    ],
    intro:
      'The programme funds projects involving universities, research organisations, businesses, public authorities, NGOs, end users and other specialist organisations. Many Horizon Europe calls require multidisciplinary consortia that bring together research, technology, policy, business and societal expertise from several countries.',
    supportTitle: 'How V&A Projects supports Horizon Europe partnerships',
    support:
      'Complex proposals require a clear relationship between the challenge, proposed solution, consortium expertise, work plan and expected European value. We support coordinators in maintaining this consistency, coordinating partner input and preparing or reviewing the application narrative. We also help consortium members define their role, tasks, resources and expected contribution, and after approval can support setup, coordination, quality assurance, risk monitoring, technical reporting, communication, dissemination and exploitation.',
  },
  {
    id: 'cerv',
    title: 'CERV',
    eyebrow: 'Citizens, Equality, Rights and Values',
    lead:
      'CERV supports open, equal, inclusive and democratic societies based on the rule of law and the fundamental values of the European Union.',
    visualCue: 'Human rights, civic spaces, European symbols',
    officialUrl:
      'https://commission.europa.eu/funding-and-tenders/find-funding/eu-funding-programmes/citizens-equality-rights-and-values-programme/citizens-equality-rights-and-values-programme-overview_en',
    emailCta: 'Explore CERV support',
    icon: Scale,
    focus: [
      'Rights protection and equality',
      'Civil society and democratic participation',
      'European remembrance and shared history',
      'Prevention of violence',
    ],
    intro:
      'The programme is particularly relevant to NGOs, civil society organisations, municipalities, public institutions, universities, schools, equality bodies, professional networks and organisations working with communities and groups whose rights or participation may be at risk.',
    supportTitle: 'How V&A Projects supports CERV applicants',
    support:
      'CERV proposals require a strong understanding of the social or rights-related problem, the people affected and the practical change the project intends to achieve. We help applicants define needs, target groups, objectives, activities and expected results. We can support partner identification, transnational cooperation, proposal writing, budgeting, risk planning, safeguarding, ethics, data protection, monitoring indicators, project management, stakeholder engagement, communication campaigns, policy dialogue, event planning and evaluation of social results.',
  },
  {
    id: 'life',
    title: 'LIFE',
    eyebrow: 'Environment and climate action',
    lead:
      'LIFE supports projects that protect nature, improve environmental quality, respond to climate change and accelerate the transition towards a cleaner economy.',
    visualCue: 'Nature, landscapes, water, materials, plants and scientific illustrations',
    officialUrl: 'https://cinea.ec.europa.eu/programmes/life_en',
    emailCta: 'Explore LIFE support',
    icon: Leaf,
    focus: [
      'Nature protection and biodiversity',
      'Environmental quality',
      'Climate change response',
      'Resource-efficient economy',
    ],
    intro:
      'The programme is suitable for public authorities, municipalities, environmental organisations, universities, research bodies, businesses and partnerships developing practical environmental and climate solutions. LIFE places strong emphasis on implementation, demonstration, replication and measurable environmental results.',
    supportTitle: 'How V&A Projects supports LIFE applicants',
    support:
      'We support applicants in defining the environmental problem, establishing baseline conditions and translating technical solutions into a clear implementation plan. Our services may include call analysis, concept development, consortium building, work planning, indicators, risk management, budgeting, proposal writing, replication activities, policy value, stakeholder participation, communication and long-term continuation of results. For funded projects, we offer management support, quality monitoring, partner coordination, technical reporting, dissemination and documentation of environmental results.',
  },
];

const expertiseAreas: ExpertiseArea[] = [
  {
    title: 'Social Sciences, Human Rights & International Law',
    text: 'Social sciences, human rights protection, equality, inclusion, democratic participation, international law and rights-based policy development.',
    icon: Scale,
  },
  {
    title: 'Maritime & Blue Economy',
    text: 'Maritime education, marine innovation, blue growth, safety at sea, maritime sustainability and projects linked to the future of the maritime sector.',
    icon: Anchor,
  },
  {
    title: 'Engineering, AI & Digital Technologies',
    text: 'Engineering, artificial intelligence, computer science, programming, digital systems, smart solutions and technology-driven innovation.',
    icon: BrainCircuit,
  },
  {
    title: 'Agronomy, Environment & Sustainable Development',
    text: 'Agronomy, agriculture, biodiversity, natural resources, environmental protection, sustainability and green transition initiatives.',
    icon: Sprout,
  },
  {
    title: 'Education, Business & Innovation',
    text: 'Education and training, organisational development, entrepreneurship, business growth, innovation management, skills development and new approaches to learning and professional development.',
    icon: BookOpenCheck,
  },
  {
    title: 'Health, Medicine & Life Sciences',
    text: 'Health, medicine, biology, life sciences, well-being, public health and research-driven solutions for healthier communities.',
    icon: HeartPulse,
  },
];

const getProgrammeIndex = (id: string | null) => {
  const index = programmes.findIndex((programme) => programme.id === id);
  return index >= 0 ? index : 0;
};

export default function Programmes() {
  const { t } = useLanguage();
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
            <div className={styles.programmeCards} role="tablist" aria-label="European programmes">
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
                    <small>{programme.eyebrow}</small>
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
                  <span className="eyebrow">{selected.eyebrow}</span>
                  <h2>{selected.title}</h2>
                </div>
              </div>

              <p>{selected.lead}</p>

              <div className={styles.spotlightActions}>
                <SecondaryButton href={selected.officialUrl} icon={ExternalLink}>
                  {t('programmes.officialWebsite')}
                </SecondaryButton>
                <PrimaryButton type="button" onClick={openConsultationModal} icon={Mail}>
                  {selected.emailCta}
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
                  <p>{selected.intro}</p>
                </div>

                <div className={styles.dossierTimeline} aria-label={`${selected.title} support flow`}>
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
                    <h3>{selected.supportTitle}</h3>
                    <p>{selected.support}</p>
                  </div>
                </div>

                <div className={styles.focusPanel}>
                  <span className="eyebrow">{t('programmes.relevantFor')}</span>
                  <ul>
                    {selected.focus.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <div className={styles.visualCue}>
                    <Network size={18} strokeWidth={1.7} aria-hidden="true" />
                    <span>{selected.visualCue}</span>
                  </div>
                </div>
              </div>

              <div className={styles.detailActions}>
                <SecondaryButton href={selected.officialUrl} icon={ExternalLink}>
                  {t('programmes.visitOfficialWebsite')}
                </SecondaryButton>
                <PrimaryButton type="button" onClick={openConsultationModal} icon={Mail}>
                  {selected.emailCta}
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
                <article className={styles.expertiseCard} key={area.title}>
                  <span>
                    <AreaIcon size={24} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <div>
                    <h3>{area.title}</h3>
                    <p>{area.text}</p>
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
