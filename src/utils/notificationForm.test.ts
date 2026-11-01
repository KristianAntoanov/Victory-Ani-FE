import { describe, expect, it } from 'vitest';
import {
  createSubmissionGuard,
  makeNotificationFormSchema,
  toSendNotificationRequest,
  type NotificationFormValues,
} from '@/utils/notificationForm';

const validValues: NotificationFormValues = {
  fullName: 'Ada Lovelace',
  email: 'ada@example.com',
  organisation: 'Analytical Engines Ltd',
  phone: '',
  interestedService: 'EU Programmes',
  message: 'Please help us identify a suitable funding programme.',
  privacyConsent: true,
};

describe('notification form', () => {
  it('maps form fields to the backend contract and converts empty phone to null', () => {
    expect(toSendNotificationRequest(validValues)).toEqual({
      fullName: 'Ada Lovelace',
      email: 'ada@example.com',
      organisation: 'Analytical Engines Ltd',
      phone: null,
      interestedService: 'EU Programmes',
      message: 'Please help us identify a suitable funding programme.',
      privacyConsent: true,
    });
  });

  it('requires privacy consent and the required form fields', () => {
    const schema = makeNotificationFormSchema((key) => key);
    const result = schema.safeParse({
      ...validValues,
      fullName: '',
      email: 'not-an-email',
      organisation: '',
      interestedService: undefined,
      message: '',
      privacyConsent: false,
    });

    expect(result.success).toBe(false);
    if (result.success) return;

    expect(result.error.issues.map((issue) => issue.path[0])).toEqual(
      expect.arrayContaining([
        'fullName',
        'email',
        'organisation',
        'interestedService',
        'message',
        'privacyConsent',
      ]),
    );
  });

  it('prevents duplicate work while a submission is running', async () => {
    const guard = createSubmissionGuard();
    let resolveAction!: () => void;
    const actionPromise = new Promise<void>((resolve) => {
      resolveAction = resolve;
    });
    const action = async () => actionPromise;

    const firstSubmission = guard.run(action);
    const duplicateSubmission = guard.run(action);

    expect(await duplicateSubmission).toBeUndefined();
    expect(resolveAction).toBeTypeOf('function');

    resolveAction();
    await firstSubmission;
    await expect(guard.run(async () => 'accepted')).resolves.toBe('accepted');
  });
});
