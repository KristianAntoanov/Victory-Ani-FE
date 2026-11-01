import { afterEach, describe, expect, it, vi } from 'vitest';
import { ApiError, apiClient } from '@/services/apiClient';
import {
  REQUEST_FAILED_MESSAGE,
  SERVER_ERROR_MESSAGE,
  TOO_MANY_REQUESTS_MESSAGE,
  sendNotification,
} from '@/services/notificationService';
import type { SendNotificationRequest } from '@/types';

const request: SendNotificationRequest = {
  fullName: 'Ada Lovelace',
  email: 'ada@example.com',
  organisation: 'Analytical Engines Ltd',
  phone: null,
  interestedService: 'Project Writing',
  message: 'Please help us prepare a strong project proposal.',
  privacyConsent: true,
};

describe('sendNotification', () => {
  afterEach(() => vi.restoreAllMocks());

  it('posts the request to the notification endpoint and returns the API result', async () => {
    const post = vi.spyOn(apiClient, 'post').mockResolvedValue(true);

    await expect(sendNotification(request)).resolves.toBe(true);
    expect(post).toHaveBeenCalledWith('/api/Notification/Send', request);
  });

  it('surfaces a suitable HTTP 400 backend message', async () => {
    vi.spyOn(apiClient, 'post').mockRejectedValue(
      new ApiError('Privacy consent is required.', 400, { message: 'Privacy consent is required.' }),
    );

    await expect(sendNotification(request)).rejects.toThrow('Privacy consent is required.');
  });

  it('uses the rate-limit message for HTTP 429', async () => {
    vi.spyOn(apiClient, 'post').mockRejectedValue(new ApiError('Rate limited', 429));

    await expect(sendNotification(request)).rejects.toThrow(TOO_MANY_REQUESTS_MESSAGE);
  });

  it('uses the later retry message for HTTP 500 and network failures', async () => {
    vi.spyOn(apiClient, 'post').mockRejectedValue(new ApiError('Server failed', 500));
    await expect(sendNotification(request)).rejects.toThrow(SERVER_ERROR_MESSAGE);

    vi.spyOn(apiClient, 'post').mockRejectedValue(new TypeError('Network unavailable'));
    await expect(sendNotification(request)).rejects.toThrow(SERVER_ERROR_MESSAGE);
  });

  it('uses the generic request message when a 400 response has no user-facing message', async () => {
    vi.spyOn(apiClient, 'post').mockRejectedValue(new ApiError('API request failed with status 400', 400));

    await expect(sendNotification(request)).rejects.toThrow(REQUEST_FAILED_MESSAGE);
  });
});
