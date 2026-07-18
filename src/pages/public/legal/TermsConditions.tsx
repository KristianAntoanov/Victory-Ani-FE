import { Link } from 'react-router-dom';
import { FileText, Mail } from 'lucide-react';
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
    title: 'Using this website',
    body: 'By using this website, you agree to use it lawfully, respectfully, and only for legitimate information, enquiry, or business purposes.',
    items: [
      'You must not misuse the website, attempt unauthorised access, disrupt its operation, or submit harmful content.',
      'Website content is provided for general information and may be updated, corrected, or removed at any time.',
      'External links may lead to third-party websites or platforms that are governed by their own terms and policies.',
    ],
  },
  {
    title: 'Our services',
    body: 'V&A Projects provides EU funding consultancy, programme guidance, proposal writing, project management support, training, and related advisory services.',
    items: [
      'A service relationship starts only when both sides agree the scope, deliverables, timing, and commercial terms.',
      'Information on this website is not a funding guarantee, legal advice, financial advice, or a binding offer.',
      'Funding decisions are made by the relevant public authorities, programme bodies, evaluators, or contracting organisations.',
    ],
  },
  {
    title: 'Your responsibilities',
    items: [
      'You are responsible for providing accurate, complete, and timely information for enquiries and consultancy work.',
      'You must have the right to share any project, organisational, partner, or personal information you provide to us.',
      'You remain responsible for internal decisions, approvals, budgets, commitments, and final submissions unless otherwise agreed in writing.',
    ],
  },
  {
    title: 'Intellectual property',
    body: 'The website design, text, graphics, structure, and brand materials belong to V&A Projects or their respective owners. You may view and share public pages for ordinary business reference, but you may not copy, reproduce, resell, or modify the content for commercial use without permission.',
  },
  {
    title: 'Liability',
    body: 'We work carefully to keep website information useful and accurate, but we do not promise that every page will always be complete, current, or error-free. To the extent permitted by law, V&A Projects is not liable for indirect losses, missed opportunities, or decisions made solely based on website content.',
  },
  {
    title: 'Updates and contact',
    body: 'We may update these Terms & Conditions from time to time. Continued use of the website after updates means the revised terms apply. For questions about these terms, contact us by email.',
  },
];

const sectionsBg: LegalSection[] = [
  {
    title: 'Използване на сайта',
    body: 'Като използвате този сайт, се съгласявате да го използвате законосъобразно, уважително и само за легитимни информационни, запитващи или бизнес цели.',
    items: [
      'Не трябва да злоупотребявате със сайта, да опитвате неоторизиран достъп, да нарушавате работата му или да подавате вредно съдържание.',
      'Съдържанието е предоставено за обща информация и може да бъде актуализирано, коригирано или премахнато по всяко време.',
      'Външни връзки могат да водят към сайтове или платформи на трети страни със собствени условия и политики.',
    ],
  },
  {
    title: 'Нашите услуги',
    body: 'V&A Projects предоставя консултации за европейско финансиране, програмни насоки, писане на предложения, управление на проекти, обучение и свързани консултантски услуги.',
    items: [
      'Услугата започва само когато двете страни договорят обхват, резултати, срокове и търговски условия.',
      'Информацията на сайта не е гаранция за финансиране, правен или финансов съвет, нито обвързваща оферта.',
      'Решенията за финансиране се вземат от съответните публични органи, програмни структури, оценители или договарящи организации.',
    ],
  },
  {
    title: 'Вашите отговорности',
    items: [
      'Вие отговаряте за предоставянето на точна, пълна и навременна информация за запитвания и консултантска работа.',
      'Трябва да имате право да споделяте всяка проектна, организационна, партньорска или лична информация, която ни предоставяте.',
      'Оставате отговорни за вътрешни решения, одобрения, бюджети, ангажименти и финални подавания, освен ако не е договорено друго писмено.',
    ],
  },
  {
    title: 'Интелектуална собственост',
    body: 'Дизайнът, текстът, графиките, структурата и бранд материалите на сайта принадлежат на V&A Projects или на съответните им собственици. Можете да разглеждате и споделяте публични страници за обичайна бизнес справка, но не можете да копирате, възпроизвеждате, препродавате или променяте съдържанието за търговска употреба без разрешение.',
  },
  {
    title: 'Отговорност',
    body: 'Работим внимателно, за да поддържаме информацията полезна и точна, но не обещаваме, че всяка страница винаги ще бъде пълна, актуална или без грешки. Доколкото законът позволява, V&A Projects не носи отговорност за косвени загуби, пропуснати възможности или решения, взети само въз основа на съдържанието на сайта.',
  },
  {
    title: 'Актуализации и контакт',
    body: 'Можем да актуализираме тези Общи условия периодично. Продължаването на използването на сайта след актуализации означава, че ревизираните условия се прилагат. За въпроси се свържете с нас по имейл.',
  },
];

export default function TermsConditions() {
  const { lang, t } = useLanguage();
  const visibleSections = lang === 'bg' ? sectionsBg : sections;

  return (
    <>
      <Seo
        title={t('footer.terms')}
        description={t('legal.termsDescription')}
        image={ASSETS.heroArchitecture}
      />

      <PageHero
        eyebrow={t('legal.eyebrow')}
        title={t('footer.terms')}
        lead={t('legal.termsLead')}
      />

      <section className={styles.legalSection}>
        <div className="container">
          <div className={styles.legalShell}>
            <aside className={styles.summary} aria-label={t('legal.termsSummary')}>
              <span className={styles.summaryIcon}>
                <FileText size={26} strokeWidth={1.6} aria-hidden="true" />
              </span>
              <h2>{t('legal.simpleTerms')}</h2>
              <p>{t('legal.simpleTermsText')}</p>
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
                  {t('legal.termsIntro')}
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
