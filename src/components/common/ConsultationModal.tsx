import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, CalendarDays, X } from 'lucide-react';
import { ROUTES } from '@/constants';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/context/ToastContext';
import { sendNotification, SERVER_ERROR_MESSAGE } from '@/services/notificationService';
import { CONSULTATION_MODAL_EVENT } from '@/utils/consultationModal';
import {
  createSubmissionGuard,
  INTERESTED_SERVICE_OPTIONS,
  makeNotificationFormSchema,
  toSendNotificationRequest,
  type NotificationFormValues,
} from '@/utils/notificationForm';

export default function ConsultationModal() {
  const { t } = useLanguage();
  const toast = useToast();
  const localizedSchema = useMemo(() => makeNotificationFormSchema(t), [t]);
  const [open, setOpen] = useState(false);
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

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(CONSULTATION_MODAL_EVENT, onOpen);
    return () => window.removeEventListener(CONSULTATION_MODAL_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  const onSubmit = (values: NotificationFormValues) =>
    submissionGuard.current.run(async () => {
      try {
        await sendNotification(toSendNotificationRequest(values));
        reset();
        close();
        toast.success(t('contact.sent'));
      } catch (err) {
        toast.error(err instanceof Error ? err.message : SERVER_ERROR_MESSAGE);
      }
    });

  if (!open) return null;

  return (
    <div className="consult-modal-overlay" role="presentation" onMouseDown={close}>
      <div
        className="consult-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="consult-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="consult-modal__head">
          <span className="consult-modal__icon">
            <CalendarDays size={24} aria-hidden="true" />
          </span>
          <div>
            <h2 id="consult-modal-title">{t('contact.title')}</h2>
            <p>{t('contact.lead')}</p>
          </div>
          <button
            type="button"
            className="consult-modal__close"
            aria-label={t('nav.closeMenu')}
            onClick={close}
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate data-testid="consultation-form">
          <div className="form-grid consult-modal__form">
            <div className={`form-field${errors.fullName ? ' has-error' : ''}`}>
              <label htmlFor="consult-name">
                {t('contact.fullName')} <span className="req">*</span>
              </label>
              <input id="consult-name" type="text" {...register('fullName')} />
              {errors.fullName ? <p className="field-error">{errors.fullName.message}</p> : null}
            </div>
            <div className={`form-field${errors.email ? ' has-error' : ''}`}>
              <label htmlFor="consult-email">
                {t('contact.email')} <span className="req">*</span>
              </label>
              <input id="consult-email" type="email" {...register('email')} />
              {errors.email ? <p className="field-error">{errors.email.message}</p> : null}
            </div>
            <div className={`form-field${errors.organisation ? ' has-error' : ''}`}>
              <label htmlFor="consult-org">
                {t('contact.organisation')} <span className="req">*</span>
              </label>
              <input id="consult-org" type="text" {...register('organisation')} />
              {errors.organisation ? <p className="field-error">{errors.organisation.message}</p> : null}
            </div>
            <div className="form-field">
              <label htmlFor="consult-phone">{t('contact.phone')}</label>
              <input id="consult-phone" type="tel" {...register('phone')} />
            </div>
            <div className={`form-field form-field--full${errors.interestedService ? ' has-error' : ''}`}>
              <label htmlFor="consult-service">
                {t('contact.interestedService')} <span className="req">*</span>
              </label>
              <select id="consult-service" {...register('interestedService')} defaultValue="">
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
              <label htmlFor="consult-message">
                {t('contact.message')} <span className="req">*</span>
              </label>
              <textarea id="consult-message" {...register('message')} />
              {errors.message ? <p className="field-error">{errors.message.message}</p> : null}
            </div>
            <div className={`form-field form-field--full${errors.privacyConsent ? ' has-error' : ''}`}>
              <label className="checkbox-field">
                <input type="checkbox" {...register('privacyConsent')} />
                <span>
                  {t('contact.privacyLabel')} <span className="req">*</span>
                </span>
              </label>
              <Link className="form-privacy-link" to={ROUTES.privacyPolicy} onClick={close}>{t('contact.privacyLink')}</Link>
              {errors.privacyConsent ? (
                <p className="field-error">{errors.privacyConsent.message}</p>
              ) : null}
            </div>
          </div>

          <div className="consult-modal__actions">
            <button type="button" className="btn btn--ghost" onClick={close}>
              {t('nav.closeMenu')}
            </button>
            <button
              type="submit"
              className="btn btn--primary"
              disabled={isSubmitting}
              data-testid="consultation-submit"
            >
              <span>{isSubmitting ? t('cta.sending') : t('cta.sendRequest')}</span>
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
