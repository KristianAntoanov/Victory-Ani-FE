import { API_ENDPOINTS } from '@/config/api';
import { apiClient } from '@/services/apiClient';
import type { ContactSubmissionInput } from '@/types';

export const contactService = {
  submit(values: ContactSubmissionInput): Promise<void> {
    return apiClient.post<void>(API_ENDPOINTS.contact, values);
  },
};
