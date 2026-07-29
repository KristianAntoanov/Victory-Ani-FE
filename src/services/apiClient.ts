import { API_BASE_URL } from '@/config/api';
import { authSessionService } from '@/services/authSessionService';

type RequestBody = BodyInit | Record<string, unknown> | unknown[] | null | undefined;

interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: RequestBody;
}

const inFlightGetRequests = new Map<string, Promise<unknown>>();

export class ApiError extends Error {
  status: number;
  details: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

function buildUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

function buildBody(body: RequestBody): BodyInit | undefined {
  if (body === undefined || body === null) return undefined;
  if (body instanceof FormData || body instanceof Blob || typeof body === 'string') {
    return body;
  }
  return JSON.stringify(body);
}

async function parseResponse(response: Response): Promise<unknown> {
  if (response.status === 204) return undefined;

  const text = await response.text();
  if (!text) return undefined;

  const contentType = response.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    return JSON.parse(text);
  }

  return text;
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const token = authSessionService.getToken();
  const headers = new Headers(options.headers);
  const method = (options.method ?? 'GET').toUpperCase();

  if (options.body !== undefined && !(options.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const url = buildUrl(path);
  const dedupeKey = `${method} ${url} ${headers.get('Authorization') ?? ''}`;

  if (method === 'GET' && !options.signal) {
    const existing = inFlightGetRequests.get(dedupeKey);
    if (existing) return existing as Promise<T>;
  } else if (method !== 'GET') {
    inFlightGetRequests.clear();
  }

  const requestPromise = (async () => {
    const response = await fetch(url, {
      ...options,
      method,
      headers,
      body: buildBody(options.body),
    });
    const payload = await parseResponse(response);

    if (!response.ok) {
      const message =
        typeof payload === 'object' && payload !== null && 'message' in payload
          ? String((payload as { message: unknown }).message)
          : `API request failed with status ${response.status}`;
      throw new ApiError(message, response.status, payload);
    }

    return payload;
  })();

  if (method === 'GET' && !options.signal) {
    inFlightGetRequests.set(dedupeKey, requestPromise);
    const clearRequest = () => {
      if (inFlightGetRequests.get(dedupeKey) === requestPromise) {
        inFlightGetRequests.delete(dedupeKey);
      }
    };
    requestPromise.then(clearRequest, clearRequest);
  }

  return requestPromise as Promise<T>;
}

export const apiClient = {
  get: <T>(path: string, options?: RequestOptions) => request<T>(path, { ...options, method: 'GET' }),
  post: <T>(path: string, body?: RequestBody, options?: RequestOptions) =>
    request<T>(path, { ...options, method: 'POST', body }),
  put: <T>(path: string, body?: RequestBody, options?: RequestOptions) =>
    request<T>(path, { ...options, method: 'PUT', body }),
  patch: <T>(path: string, body?: RequestBody, options?: RequestOptions) =>
    request<T>(path, { ...options, method: 'PATCH', body }),
  delete: <T>(path: string, options?: RequestOptions) => request<T>(path, { ...options, method: 'DELETE' }),
};
