import { Link } from 'react-router-dom';
import { Mail, ShieldCheck } from 'lucide-react';
import Seo from '@/components/common/Seo';
import PageHero from '@/components/layout/PageHero';
import { ASSETS, CONTACT, ROUTES } from '@/constants';
import { useLanguage } from '@/context/LanguageContext';
import { openConsultationModal } from '@/utils/consultationModal';
import styles from './Legal.module.css';

interface LegalSection {
  title: string;
  body?: string;
  items?: string[];
}

const sections: LegalSection[] = [
  {
    title: 'Information we collect',
    body: 'We collect only the information needed to respond to enquiries, prepare consultancy work, manage communication, and operate this website.',
    items: [
      'Contact details such as name, email address, phone number, organisation, and role.',
      'Project or funding information you choose to share through forms, email, calls, or meetings.',
      'Newsletter or event preferences when you actively subscribe or request updates.',
      'Basic technical information generated when you visit the website, such as device, browser, pages viewed, and approximate usage data.',
    ],
  },
  {
    title: 'How we use it',
    items: [
      'To respond to messages, consultation requests, and funding enquiries.',
      'To prepare proposals, provide services, and manage client relationships.',
      'To send relevant updates where you have requested them or where we have another lawful basis to contact you.',
      'To improve website performance, security, user experience, and service quality.',
      'To comply with legal, accounting, administrative, and regulatory obligations.',
    ],
  },
  {
    title: 'Legal basis',
    body: 'Depending on the context, we process personal data on the basis of consent, contract preparation or performance, legitimate interests, and legal obligations. EU data protection guidance recognises these as common grounds for lawful processing.',
  },
  {
    title: 'Sharing and storage',
    items: [
      'We do not sell personal data.',
      'We may share information with trusted service providers, professional advisers, project partners, or public authorities where needed for the purposes described in this policy.',
      'We retain information only for as long as necessary for the relevant purpose, legal requirement, or legitimate business record.',
      'We use reasonable technical and organisational measures to protect personal data from unauthorised access, loss, misuse, or disclosure.',
    ],
  },
  {
    title: 'Your rights',
    body: 'Under EU data protection rules, individuals may have rights to access, correct, delete, restrict, object to processing, request portability, and withdraw consent where consent is used. You can contact us to exercise these rights.',
  },
  {
    title: 'Cookies',
    body: 'This website may use essential cookies or similar technologies to keep the site secure and functioning. If analytics or optional cookies are introduced, they should be used with the appropriate notice and consent controls.',
  },
];

const sectionsBg: LegalSection[] = [
  {
    title: 'Каква информация събираме',
    body: 'Събираме само информацията, нужна за отговор на запитвания, подготовка на консултантска работа, управление на комуникацията и функциониране на сайта.',
    items: [
      'Данни за контакт като име, имейл адрес, телефон, организация и роля.',
      'Информация за проект или финансиране, която избирате да споделите чрез форми, имейл, разговори или срещи.',
      'Предпочитания за бюлетин или събития, когато се абонирате или поискате актуализации.',
      'Основна техническа информация при посещение на сайта, като устройство, браузър, разгледани страници и приблизителни данни за ползване.',
    ],
  },
  {
    title: 'Как я използваме',
    items: [
      'За да отговаряме на съобщения, заявки за консултация и запитвания за финансиране.',
      'За подготовка на предложения, предоставяне на услуги и управление на отношения с клиенти.',
      'За изпращане на релевантни актуализации, когато сте ги поискали или имаме друго законово основание.',
      'За подобряване на производителността, сигурността, потребителското изживяване и качеството на услугите.',
      'За спазване на законови, счетоводни, административни и регулаторни задължения.',
    ],
  },
  {
    title: 'Правно основание',
    body: 'В зависимост от контекста обработваме лични данни на основание съгласие, подготовка или изпълнение на договор, легитимен интерес и законови задължения.',
  },
  {
    title: 'Споделяне и съхранение',
    items: [
      'Не продаваме лични данни.',
      'Можем да споделяме информация с доверени доставчици, професионални съветници, проектни партньори или публични органи, когато е необходимо за описаните цели.',
      'Съхраняваме информацията само толкова дълго, колкото е нужно за съответната цел, законово изискване или легитимен бизнес запис.',
      'Използваме разумни технически и организационни мерки за защита на личните данни.',
    ],
  },
  {
    title: 'Вашите права',
    body: 'Съгласно правилата на ЕС за защита на данните лицата могат да имат права на достъп, корекция, изтриване, ограничаване, възражение, преносимост и оттегляне на съгласие.',
  },
  {
    title: 'Бисквитки',
    body: 'Този сайт може да използва основни бисквитки или подобни технологии, нужни за сигурността и нормалното функциониране. Ако се въведат аналитични или допълнителни бисквитки, те следва да се използват с подходящо уведомление и съгласие.',
  },
];

export default function PrivacyPolicy() {
  const { lang, t } = useLanguage();
  const visibleSections = lang === 'bg' ? sectionsBg : sections;

  return (
    <>
      <Seo
        title={t('footer.privacy')}
        description={t('legal.privacyDescription')}
        image={ASSETS.heroArchitecture}
      />

      <PageHero
        eyebrow={t('legal.eyebrow')}
        title={t('footer.privacy')}
        lead={t('legal.privacyLead')}
      />

      <section className={styles.legalSection}>
        <div className="container">
          <div className={styles.legalShell}>
            <aside className={styles.summary} aria-label={t('legal.privacySummary')}>
              <span className={styles.summaryIcon}>
                <ShieldCheck size={26} strokeWidth={1.6} aria-hidden="true" />
              </span>
              <h2>{t('legal.privacyAtGlance')}</h2>
              <p>{t('legal.privacyAtGlanceText')}</p>
              <div className={styles.summaryMeta}>
                <div>
                  <span>{t('legal.lastUpdated')}</span>
                  <strong>July 1, 2026</strong>
                </div>
                <div>
                  <span>{t('legal.contact')}</span>
                  <button
                    type="button"
                    className={styles.summaryAction}
                    onClick={openConsultationModal}
                  >
                    <Mail size={14} aria-hidden="true" /> {CONTACT.email}
                  </button>
                </div>
              </div>
            </aside>

            <article className={styles.document}>
              <div className={styles.documentIntro}>
                <p>
                  {t('legal.privacyIntro')}
                </p>
              </div>

              {visibleSections.map((section) => (
                <section className={styles.sectionBlock} key={section.title}>
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
                  </div>
                </section>
              ))}
            </article>
          </div>

          <nav className={styles.legalNav} aria-label="Legal pages">
            <Link to={ROUTES.privacyPolicy}>{t('footer.privacy')}</Link>
            <Link to={ROUTES.termsConditions}>{t('footer.terms')}</Link>
          </nav>
        </div>
      </section>
    </>
  );
}
