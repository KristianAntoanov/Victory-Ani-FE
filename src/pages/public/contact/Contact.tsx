import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react';
import Seo from '@/components/common/Seo';
import { CONTACT } from '@/constants';
import { contactService } from '@/services/contactService';
import { useToast } from '@/context/ToastContext';
import { useLanguage } from '@/context/LanguageContext';
import { openConsultationModal } from '@/utils/consultationModal';
import type { ContactSubmissionInput } from '@/types';
import styles from './Contact.module.css';

const SERVICE_KEYS = [
  'footer.svcProgrammes',
  'footer.svcWriting',
  'footer.svcManagement',
  'footer.svcPartner',
  'contact.svcGeneral',
];

const makeSchema = (t: (key: string) => string) =>
  z.object({
    fullName: z.string().min(1, t('validation.nameRequired')),
    email: z.string().min(1, t('validation.emailRequired')).email(t('validation.email')),
    organisation: z.string().min(1, t('validation.orgRequired')),
    phone: z.string().optional().or(z.literal('')),
    service: z.string().min(1, t('validation.serviceRequired')),
    message: z.string().min(10, t('validation.messageMin')),
    privacy: z.literal(true, {
      errorMap: () => ({ message: t('validation.privacy') }),
    }),
  });
type FormValues = z.infer<ReturnType<typeof makeSchema>>;

export default function Contact() {
  const toast = useToast();
  const { t } = useLanguage();
  const localizedSchema = useMemo(() => makeSchema(t), [t]);
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(localizedSchema),
    defaultValues: {
      fullName: '',
      email: '',
      organisation: '',
      phone: '',
      service: '',
      message: '',
      privacy: false as unknown as true,
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const submission: ContactSubmissionInput = {
        fullName: values.fullName,
        email: values.email,
        organisation: values.organisation,
        phone: values.phone ?? '',
        service: values.service,
        message: values.message,
      };
      await contactService.submit(submission);
      setSubmitted(true);
      reset();
      toast.success(t('contact.sent'));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t('contact.submitError'));
    }
  };

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
                    <div className={`form-field form-field--full${errors.service ? ' has-error' : ''}`}>
                      <label htmlFor="c-service">
                        {t('contact.interestedService')} <span className="req">*</span>
                      </label>
                      <select id="c-service" {...register('service')} data-testid="contact-service" defaultValue="">
                        <option value="" disabled>
                          {t('contact.selectService')}
                        </option>
                        {SERVICE_KEYS.map((key) => (
                          <option key={key} value={t(key)}>
                            {t(key)}
                          </option>
                        ))}
                      </select>
                      {errors.service ? <p className="field-error">{errors.service.message}</p> : null}
                    </div>
                    <div className={`form-field form-field--full${errors.message ? ' has-error' : ''}`}>
                      <label htmlFor="c-msg">
                        {t('contact.message')} <span className="req">*</span>
                      </label>
                      <textarea id="c-msg" {...register('message')} data-testid="contact-message" />
                      {errors.message ? <p className="field-error">{errors.message.message}</p> : null}
                    </div>
                    <div className={`form-field form-field--full${errors.privacy ? ' has-error' : ''}`}>
                      <label className="checkbox-field">
                        <input type="checkbox" {...register('privacy')} data-testid="contact-privacy" />
                        <span>
                          {t('contact.privacyLabel')} <span className="req">*</span>
                        </span>
                      </label>
                      {errors.privacy ? <p className="field-error">{errors.privacy.message}</p> : null}
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
