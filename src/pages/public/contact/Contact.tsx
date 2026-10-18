import { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react';
import Seo from '@/components/common/Seo';
import { CONTACT, ROUTES } from '@/constants';
import { sendNotification, SERVER_ERROR_MESSAGE } from '@/services/notificationService';
import { useToast } from '@/context/ToastContext';
import { useLanguage } from '@/context/LanguageContext';
import { openConsultationModal } from '@/utils/consultationModal';
import {
  createSubmissionGuard,
  INTERESTED_SERVICE_OPTIONS,
  makeNotificationFormSchema,
  toSendNotificationRequest,
  type NotificationFormValues,
} from '@/utils/notificationForm';
import styles from './Contact.module.css';

export default function Contact() {
  const toast = useToast();
  const { t } = useLanguage();
  const localizedSchema = useMemo(() => makeNotificationFormSchema(t), [t]);
  const [submitted, setSubmitted] = useState(false);
  const submissionGuard = useRef(createSubmissionGuard());
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NotificationFormValues>({
    resolver: zodResolver(localizedSchema),
    defaultValues: {
      fullName: '',
      email: '',
      organisation: '',
      phone: '',
      interestedService: undefined,
      message: '',
      privacyConsent: false as unknown as true,
    },
  });

  const onSubmit = (values: NotificationFormValues) =>
    submissionGuard.current.run(async () => {
      try {
        await sendNotification(toSendNotificationRequest(values));
        setSubmitted(true);
        reset();
        toast.success(t('contact.sent'));
      } catch (err) {
        toast.error(err instanceof Error ? err.message : SERVER_ERROR_MESSAGE);
      }
    });

  return (
    <>
      <Seo
        title={t('contact.title')}
        description={t('contact.lead')}
      />

      <section className="section">
        <div className="container">
          <span className="eyebrow">{t('common.getInTouch')}</span>
          <h1 className={`page-hero__title ${styles.title}`}>
            {t('contact.title')}
          </h1>
          <span className="dash" />
          <p className={`page-hero__lead ${styles.lead}`}>{t('contact.lead')}</p>

          <div className={styles.contactGrid}>
            <div className={styles.contactInfo}>
              <div className={styles.contactInfoItem}>
                <span className={styles.contactIcon}>
                  <Mail size={20} aria-hidden="true" />
                </span>
                <div>
                  <strong>{t('contact.email')}</strong>
                  <p className="service-card__desc">
                    <button
                      type="button"
                      className={styles.contactAction}
                      onClick={openConsultationModal}
                    >
                      {CONTACT.email}
                    </button>
                  </p>
                </div>
              </div>
              <div className={styles.contactInfoItem}>
                <span className={styles.contactIcon}>
                  <Phone size={20} aria-hidden="true" />
                </span>
                <div>
                  <strong>{t('contact.phone')}</strong>
                  <p className="service-card__desc">
                    <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
                  </p>
                </div>
              </div>
              <div className={styles.contactInfoItem}>
                <span className={styles.contactIcon}>
                  <MapPin size={20} aria-hidden="true" />
                </span>
                <div>
                  <strong>{t('contact.office')}</strong>
                  <p className="service-card__desc">{t('contact.officeText')}</p>
                </div>
              </div>
            </div>

            <div className={styles.contactCard}>
              {submitted ? (
                <div className={styles.successBox} data-testid="contact-success">
                  <CheckCircle2 className={styles.successIcon} size={56} aria-hidden="true" />
                  <h3 className={styles.successTitle}>{t('contact.successTitle')}</h3>
                  <p className="service-card__desc">{t('contact.successText')}</p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className={`btn btn--secondary ${styles.topSpace}`}
                    data-testid="contact-send-another"
                  >
                    {t('cta.sendAnother')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate data-testid="contact-form">
                  <div className="form-grid">
                    <div className={`form-field${errors.fullName ? ' has-error' : ''}`}>
                      <label htmlFor="c-name">
                        {t('contact.fullName')} <span className="req">*</span>
                      </label>
                      <input id="c-name" type="text" {...register('fullName')} data-testid="contact-name" />
                      {errors.fullName ? <p className="field-error">{errors.fullName.message}</p> : null}
                    </div>
                    <div className={`form-field${errors.email ? ' has-error' : ''}`}>
                      <label htmlFor="c-email">
                        {t('contact.email')} <span className="req">*</span>
                      </label>
                      <input id="c-email" type="email" {...register('email')} data-testid="contact-email" />
                      {errors.email ? <p className="field-error">{errors.email.message}</p> : null}
                    </div>
                    <div className={`form-field${errors.organisation ? ' has-error' : ''}`}>
                      <label htmlFor="c-org">
                        {t('contact.organisation')} <span className="req">*</span>
                      </label>
                      <input id="c-org" type="text" {...register('organisation')} data-testid="contact-org" />
                      {errors.organisation ? <p className="field-error">{errors.organisation.message}</p> : null}
                    </div>
                    <div className="form-field">
                      <label htmlFor="c-phone">{t('contact.phone')}</label>
                      <input id="c-phone" type="tel" {...register('phone')} data-testid="contact-phone" />
                    </div>
                    <div className={`form-field form-field--full${errors.interestedService ? ' has-error' : ''}`}>
                      <label htmlFor="c-service">
                        {t('contact.interestedService')} <span className="req">*</span>
                      </label>
                      <select
                        id="c-service"
                        {...register('interestedService')}
                        data-testid="contact-service"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          {t('contact.selectService')}
                        </option>
                        {INTERESTED_SERVICE_OPTIONS.map(({ value, labelKey }) => (
                          <option key={value} value={value}>
                            {t(labelKey)}
                          </option>
                        ))}
                      </select>
                      {errors.interestedService ? (
                        <p className="field-error">{errors.interestedService.message}</p>
                      ) : null}
                    </div>
                    <div className={`form-field form-field--full${errors.message ? ' has-error' : ''}`}>
                      <label htmlFor="c-msg">
                        {t('contact.message')} <span className="req">*</span>
                      </label>
                      <textarea id="c-msg" {...register('message')} data-testid="contact-message" />
                      {errors.message ? <p className="field-error">{errors.message.message}</p> : null}
                    </div>
                    <div className={`form-field form-field--full${errors.privacyConsent ? ' has-error' : ''}`}>
                      <label className="checkbox-field">
                        <input
                          type="checkbox"
                          {...register('privacyConsent')}
                          data-testid="contact-privacy"
                        />
                        <span>
                          {t('contact.privacyLabel')} <span className="req">*</span>
                        </span>
                      </label>
                      <Link className="form-privacy-link" to={ROUTES.privacyPolicy}>{t('contact.privacyLink')}</Link>
                      {errors.privacyConsent ? (
                        <p className="field-error">{errors.privacyConsent.message}</p>
                      ) : null}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className={`btn btn--primary ${styles.topSpace}`}
                    disabled={isSubmitting}
                    data-testid="contact-submit"
                  >
                    {isSubmitting ? t('cta.sending') : t('cta.sendRequest')}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
