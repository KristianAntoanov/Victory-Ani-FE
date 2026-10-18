import { API_ENDPOINTS } from '@/config/api';
import { ApiError, apiClient } from '@/services/apiClient';
import type { SendNotificationRequest } from '@/types';

export const TOO_MANY_REQUESTS_MESSAGE = 'Too many requests. Please wait and try again.';
export const REQUEST_FAILED_MESSAGE = 'Your request could not be sent. Please try again.';
export const SERVER_ERROR_MESSAGE = 'Your request could not be sent. Please try again later.';

function isGenericApiErrorMessage(message: string, status: number): boolean {
  return message === `API request failed with status ${status}`;
}

export async function sendNotification(request: SendNotificationRequest): Promise<boolean> {
  try {
    return await apiClient.post<boolean>(API_ENDPOINTS.notificationSend, request);
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.status === 429) {
        throw new Error(TOO_MANY_REQUESTS_MESSAGE);
      }

      if (error.status >= 500) {
        throw new Error(SERVER_ERROR_MESSAGE);
      }

      if (error.status === 400 && !isGenericApiErrorMessage(error.message, error.status)) {
        throw new Error(error.message);
      }

      throw new Error(REQUEST_FAILED_MESSAGE);
    }

    throw new Error(SERVER_ERROR_MESSAGE);
  }
}
