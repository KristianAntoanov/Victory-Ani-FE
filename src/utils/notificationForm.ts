import { z } from 'zod';
import type { InterestedService, SendNotificationRequest } from '@/types';

export const INTERESTED_SERVICE_OPTIONS: readonly {
  value: InterestedService;
  labelKey: string;
}[] = [
  { value: 'EU Programmes', labelKey: 'footer.svcProgrammes' },
  { value: 'Project Writing', labelKey: 'footer.svcWriting' },
  { value: 'Management Services', labelKey: 'footer.svcManagement' },
  { value: 'Partner Search', labelKey: 'footer.svcPartner' },
  { value: 'General Enquiry', labelKey: 'contact.svcGeneral' },
];

const INTERESTED_SERVICE_VALUES = INTERESTED_SERVICE_OPTIONS.map(({ value }) => value) as [
  InterestedService,
  ...InterestedService[],
];

export const makeNotificationFormSchema = (t: (key: string) => string) =>
  z.object({
    fullName: z.string().min(1, t('validation.nameRequired')),
    email: z.string().min(1, t('validation.emailRequired')).email(t('validation.email')),
    organisation: z.string().min(1, t('validation.orgRequired')),
    phone: z.string().optional(),
    interestedService: z.enum(INTERESTED_SERVICE_VALUES, {
      errorMap: () => ({ message: t('validation.serviceRequired') }),
    }),
    message: z.string().min(10, t('validation.messageMin')),
    privacyConsent: z.literal(true, {
      errorMap: () => ({ message: t('validation.privacy') }),
    }),
  });

export type NotificationFormValues = z.infer<ReturnType<typeof makeNotificationFormSchema>>;

export function toSendNotificationRequest(values: NotificationFormValues): SendNotificationRequest {
  return {
    fullName: values.fullName,
    email: values.email,
    organisation: values.organisation,
    phone: values.phone?.trim() || null,
    interestedService: values.interestedService,
    message: values.message,
    privacyConsent: values.privacyConsent,
  };
}

export interface SubmissionGuard {
  run<T>(action: () => Promise<T>): Promise<T | undefined>;
}

export function createSubmissionGuard(): SubmissionGuard {
  let running = false;

  return {
    async run<T>(action: () => Promise<T>): Promise<T | undefined> {
      if (running) return undefined;

      running = true;
      try {
        return await action();
      } finally {
        running = false;
      }
    },
  };
}
