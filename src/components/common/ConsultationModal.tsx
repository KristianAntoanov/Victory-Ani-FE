import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowRight, CalendarDays, X } from 'lucide-react';
import { CONTACT } from '@/constants';
import { useLanguage } from '@/context/LanguageContext';
import { CONSULTATION_MODAL_EVENT } from '@/utils/consultationModal';

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

export default function ConsultationModal() {
  const { t } = useLanguage();
  const localizedSchema = useMemo(() => makeSchema(t), [t]);
  const [open, setOpen] = useState(false);
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

  const onSubmit = (values: FormValues) => {
    const subject = 'Consultation request from website';
    const body = [
      'Hello V&A Projects,',
      '',
      'I would like to book a consultation.',
      '',
      `Full name: ${values.fullName}`,
      `Email: ${values.email}`,
      `Organisation: ${values.organisation}`,
      `Phone: ${values.phone || '-'}`,
      `Interested service: ${values.service}`,
      '',
      'Message:',
      values.message,
      '',
      'Best regards,',
      values.fullName,
    ].join('\n');

    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    reset();
    close();
  };

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
            <div className={`form-field form-field--full${errors.service ? ' has-error' : ''}`}>
              <label htmlFor="consult-service">
                {t('contact.interestedService')} <span className="req">*</span>
              </label>
              <select id="consult-service" {...register('service')} defaultValue="">
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
              <label htmlFor="consult-message">
                {t('contact.message')} <span className="req">*</span>
              </label>
              <textarea id="consult-message" {...register('message')} />
              {errors.message ? <p className="field-error">{errors.message.message}</p> : null}
            </div>
            <div className={`form-field form-field--full${errors.privacy ? ' has-error' : ''}`}>
              <label className="checkbox-field">
                <input type="checkbox" {...register('privacy')} />
                <span>
                  {t('contact.privacyLabel')} <span className="req">*</span>
                </span>
              </label>
              {errors.privacy ? <p className="field-error">{errors.privacy.message}</p> : null}
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
