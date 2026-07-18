/** Generate a unique id with a fallback when crypto.randomUUID is unavailable. */
export function generateId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

/** Convert a title into a URL-friendly slug (lowercase latin, dashes). */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function formatDate(iso: string, lang: 'en' | 'bg' = 'en'): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString(lang === 'bg' ? 'bg-BG' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
export const MAX_IMAGE_BYTES = 1.5 * 1024 * 1024;

export interface ImageReadResult {
  base64: string;
}

export function readImageAsBase64(file: File): Promise<ImageReadResult> {
  return new Promise((resolve, reject) => {
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      reject(new Error('Unsupported format. Please use JPG, JPEG, PNG or WEBP.'));
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      reject(new Error('File is too large. Maximum allowed size is 1.5 MB.'));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => resolve({ base64: String(reader.result) });
    reader.onerror = () => reject(new Error('Could not read the selected file.'));
    reader.readAsDataURL(file);
  });
}
