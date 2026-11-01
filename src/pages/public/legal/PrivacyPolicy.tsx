import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUpRight, Building2, Mail, ShieldCheck } from 'lucide-react';
import Seo from '@/components/common/Seo';
import { ASSETS, CONTACT, ROUTES } from '@/constants';
import { useLanguage } from '@/context/LanguageContext';
import { openConsultationModal } from '@/utils/consultationModal';
import styles from './Legal.module.css';

interface LegalSection {
  title: string;
  body?: string;
  items?: string[];
  externalLink?: { label: string; href: string };
}

const sections: LegalSection[] = [
  {
    title: 'Information we receive',
    body: 'When you contact us through the website, we receive the information you choose to provide.',
    items: [
      'The Contact form asks for your name, email address, organisation, service of interest and message. A phone number is optional.',
      'The consultation dialog sends your enquiry through the website after you confirm the form and privacy consent.',
      'The website and hosting provider may process technical request data, such as IP address and browser information, to deliver and secure the website.',
    ],
  },
  {
    title: 'Purposes and legal grounds',
    body: 'We use your details to respond to enquiries and discuss a possible consultancy service.',
    items: [
      'Where your request concerns a possible agreement with you, we may process the data to take steps at your request before a contract (GDPR Article 6(1)(b)).',
      'For other business enquiries and website security, we may rely on our legitimate interest in handling requested communication and keeping the website secure (Article 6(1)(f)).',
      'If a client relationship follows, contract performance or a legal obligation may provide the relevant legal ground (Article 6(1)(b) or (c)).',
    ],
  },
  {
    title: 'Recipients and external services',
    body: 'People working on your enquiry and providers of hosting, technical support or email may access the information needed for their tasks. We may share information with professional advisers or authorities when required by law or necessary to protect a legal claim. We do not sell personal data.',
    items: [
      'The site loads fonts from Google Fonts. Your browser connects to Google to fetch them.',
      'Social media links lead to external platforms only when you click them; their own privacy notices then apply.',
    ],
  },
  {
    title: 'How long we keep information',
    body: 'We keep enquiry information while we review and answer the request. After that, we retain correspondence only where it is needed for a resulting contract, applicable legal obligations or the establishment, exercise or defence of legal claims. Technical log retention depends on the hosting provider’s settings.',
  },
  {
    title: 'Your rights',
    body: 'You can email us to exercise your data protection rights. Depending on the situation, you may request:',
    items: [
      'Access to, correction or deletion of your data, or restriction of its processing.',
      'An objection to processing based on legitimate interests, or data portability where applicable.',
      'Withdrawal of consent where a specific activity is based on consent; withdrawal does not affect earlier lawful processing.',
    ],
    externalLink: { label: 'Complain to the Bulgarian data protection authority', href: 'https://cpdp.bg/home-default/подаване-на-жалби-и-сигнали-до-кзлд/' },
  },
  {
    title: 'Browser storage and cookies',
    body: 'The site saves your selected language in your browser’s local storage so it is remembered on your next visit. The staff administration area uses temporary browser storage for its session. The public website currently has no advertising or analytics trackers. If optional tracking is added, this notice and the required consent controls will be updated.',
  },
];

const sectionsBg: LegalSection[] = [
  {
    title: 'Каква информация получаваме',
    body: 'Когато се свържете с нас през сайта, получаваме информацията, която решите да ни предоставите.',
    items: [
      'Формата „Контакт“ изисква име, имейл, организация, интересуваща ви услуга и съобщение. Телефонът е по избор.',
      'Прозорецът „Запазете консултация“ изпраща запитването през сайта след потвърждение на формата и съгласието за поверителност.',
      'Сайтът и доставчикът на хостинг могат да обработват технически данни за заявката, като IP адрес и данни за браузъра, за да доставят и защитават сайта.',
    ],
  },
  {
    title: 'Цели и правни основания',
    body: 'Използваме данните ви, за да отговорим на запитването и да обсъдим възможна консултантска услуга.',
    items: [
      'Когато искането ви е свързано с евентуален договор с вас, можем да обработваме данните за стъпки по ваше искане преди сключването му (чл. 6, пар. 1, б. „б“ от GDPR).',
      'При други делови запитвания и за сигурността на сайта можем да се позовем на легитимния си интерес да водим поисканата комуникация и да поддържаме защитен сайт (чл. 6, пар. 1, б. „е“).',
      'Ако възникнат отношения с клиент, приложимо основание може да бъде изпълнение на договор или законово задължение (чл. 6, пар. 1, б. „б“ или „в“).',
    ],
  },
  {
    title: 'Получатели и външни услуги',
    body: 'Достъп до необходимите данни могат да имат хората, които работят по запитването, и доставчици на хостинг, техническа поддръжка или електронна поща. Можем да предоставим информация на професионални консултанти или органи, когато законът го изисква или това е нужно за защита на правен интерес. Не продаваме лични данни.',
    items: [
      'Сайтът зарежда шрифтове чрез Google Fonts. За целта браузърът ви се свързва с Google.',
      'Връзките към социални мрежи водят към външни платформи само когато ги отворите; след това важат техните политики.',
    ],
  },
  {
    title: 'Колко дълго пазим информацията',
    body: 'Пазим данните от запитването, докато го разгледаме и отговорим. След това съхраняваме кореспонденцията само когато е нужна за последващ договор, приложимо законово задължение или установяване, упражняване или защита на правни претенции. Срокът на техническите записи зависи от настройките на доставчика на хостинг.',
  },
  {
    title: 'Вашите права',
    body: 'Можете да ни пишете на посочения имейл, за да упражните правата си. Според случая можете да поискате:',
    items: [
      'Достъп, поправка или изтриване на данните ви или ограничаване на обработването им.',
      'Възражение срещу обработване на основание легитимен интерес или преносимост на данните, когато е приложимо.',
      'Оттегляне на съгласие, когато конкретна дейност се основава на такова; това не засяга законосъобразното обработване преди оттеглянето.',
    ],
    externalLink: { label: 'Подаване на жалба до Комисията за защита на личните данни', href: 'https://cpdp.bg/home-default/подаване-на-жалби-и-сигнали-до-кзлд/' },
  },
  {
    title: 'Съхранение в браузъра и бисквитки',
    body: 'Сайтът запазва избрания от вас език в локалното хранилище на браузъра, за да го помни при следващо посещение. Администраторската част използва временно хранилище за служебната сесия. Публичният сайт към момента няма рекламни или аналитични инструменти. Ако се добавят такива, тази политика и необходимите настройки за съгласие ще бъдат актуализирани предварително.',
  },
];

export default function PrivacyPolicy() {
  const { lang, t } = useLanguage();
  const visibleSections = lang === 'bg' ? sectionsBg : sections;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) {
        setActiveIndex(Number((visible[0].target as HTMLElement).dataset.policyIndex));
      }
    }, { rootMargin: '-18% 0px -65% 0px' });

    document.querySelectorAll<HTMLElement>('[data-policy-index]').forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [lang]);

  const contentLabel = lang === 'bg' ? 'Съдържание' : 'On this page';
  const companyName = '„В енд А Проджектс“ ООД';

  return (
    <>
      <Seo
        title={t('footer.privacy')}
        description={t('legal.privacyDescription')}
        image={ASSETS.heroArchitecture}
        canonicalPath={ROUTES.privacyPolicy}
      />

      <header className={styles.hero} id="privacy-top">
        <div className="container">
          <div className={styles.heroContent}>
            <span className={styles.heroEyebrow}><ShieldCheck size={18} aria-hidden="true" /> {t('legal.eyebrow')}</span>
            <h1>{t('footer.privacy')}</h1>
            <p>{t('legal.privacyLead')}</p>
            <div className={styles.heroMeta}>
              <span>{t('legal.lastUpdated')}: {lang === 'bg' ? '14 октомври 2026 г.' : '14 October 2026'}</span>
              <a href="#privacy-content">{contentLabel} <ArrowDown size={17} aria-hidden="true" /></a>
            </div>
          </div>
        </div>
      </header>

      <section className={styles.legalSection} id="privacy-content">
        <div className="container">
          <div className={styles.legalShell}>
            <aside className={styles.summary} aria-label={contentLabel}>
              <div className={styles.sidebarHeader}>
                <span>{contentLabel}</span>
                <small>{String(activeIndex + 1).padStart(2, '0')} / {String(visibleSections.length).padStart(2, '0')}</small>
              </div>
              <div className={styles.progressTrack} aria-hidden="true"><span style={{ width: `${((activeIndex + 1) / visibleSections.length) * 100}%` }} /></div>
              <nav className={styles.sectionNav} aria-label={contentLabel}>
                {visibleSections.map((section, index) => (
                  <a
                    key={section.title}
                    href={`#policy-section-${index + 1}`}
                    className={activeIndex === index ? styles.activeLink : undefined}
                    aria-current={activeIndex === index ? 'location' : undefined}
                    onClick={() => setActiveIndex(index)}
                  >
                    <span>{String(index + 1).padStart(2, '0')}</span>{section.title}
                  </a>
                ))}
              </nav>
              <a className={styles.sidebarEmail} href={`mailto:${CONTACT.email}`}><Mail size={16} aria-hidden="true" />{CONTACT.email}</a>
            </aside>

            <article className={styles.document}>
              <div className={styles.documentIntro}>
                <span className={styles.introEyebrow}>{lang === 'bg' ? 'ПОВЕРИТЕЛНОСТ НАКРАТКО' : 'PRIVACY AT A GLANCE'}</span>
                <p>{t('legal.privacyIntro')}</p>
                <div className={styles.companyCard}>
                  <div className={styles.companyTitle}><Building2 size={22} aria-hidden="true" /><span>{lang === 'bg' ? 'Администратор на личните данни' : 'Data controller'}</span></div>
                  <strong>{companyName}</strong>
                  <dl>
                    <div><dt>{lang === 'bg' ? 'ЕИК' : 'Company number'}</dt><dd>208026885</dd></div>
                    <div><dt>{lang === 'bg' ? 'Седалище и адрес' : 'Registered address'}</dt><dd>{lang === 'bg' ? 'БЪЛГАРИЯ, гр. София (1000), р-н Възраждане, ж.к. „Сердика“, бл. 18, вх. А, ап. 10' : '18 Serdika residential complex, entrance A, apartment 10, Vazrazhdane district, 1000 Sofia, Bulgaria'}</dd></div>
                    <div><dt>{lang === 'bg' ? 'Контакт' : 'Contact'}</dt><dd><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></dd></div>
                  </dl>
                </div>
              </div>

              {visibleSections.map((section, index) => (
                <section className={styles.sectionBlock} key={section.title} id={`policy-section-${index + 1}`} data-policy-index={index}>
                  <span className={styles.sectionNumber}>{String(index + 1).padStart(2, '0')} / {String(visibleSections.length).padStart(2, '0')}</span>
                  <h2>{section.title}</h2>
                  <div>
                    {section.body ? <p>{section.body}</p> : null}
                    {section.items ? (
                      <ul>
                        {section.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ) : null}
                    {section.externalLink ? (
                      <a className={styles.externalLink} href={section.externalLink.href} target="_blank" rel="noreferrer">
                        {section.externalLink.label} <ArrowUpRight size={16} aria-hidden="true" />
                      </a>
                    ) : null}
                  </div>
                </section>
              ))}
              <div className={styles.contactCard}>
                <div className={styles.contactIcon}><Mail size={24} aria-hidden="true" /></div>
                <div>
                  <h2>{lang === 'bg' ? 'Въпрос за личните ви данни?' : 'A question about your data?'}</h2>
                  <p>{lang === 'bg' ? 'Пишете ни директно и ще разгледаме искането ви.' : 'Email us directly and we will review your request.'}</p>
                </div>
                <button type="button" onClick={openConsultationModal} aria-haspopup="dialog">
                  {lang === 'bg' ? 'Пишете ни' : 'Email us'} <ArrowUpRight size={16} aria-hidden="true" />
                </button>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
