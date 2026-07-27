import { API_ENDPOINTS } from '@/config/api';
import { apiClient } from '@/services/apiClient';
import type { NewsArticle, NewsArticleInput } from '@/types';
import { slugify } from '@/utils';

interface BackendNewsItem {
  id: number;
  title: string;
  summary: string;
  content?: string;
  imageUrl?: string | null;
  publishedOn: string;
  isActive: boolean;
  createdOn?: string | null;
  updatedOn?: string | null;
}

function toNewsArticle(item: BackendNewsItem): NewsArticle {
  const id = String(item.id);
  const titleSlug = slugify(item.title) || 'news';

  return {
    id,
    title: item.title,
    slug: `${titleSlug}-${id}`,
    category: 'Announcements',
    publishDate: item.publishedOn,
    shortDescription: item.summary,
    content: item.content ?? '',
    image: item.imageUrl ?? '',
    imageAlt: item.title,
    author: 'V&A Projects',
    featured: false,
    published: item.isActive,
    createdAt: item.createdOn ?? item.publishedOn,
    updatedAt: item.updatedOn ?? item.createdOn ?? item.publishedOn,
  };
}

function normalizePublishedOn(value: string): string {
  if (value.includes('T')) return value;
  return `${value}T00:00:00Z`;
}

function dataUrlToFile(dataUrl: string, fallbackName: string): File | null {
  const match = dataUrl.match(/^data:([^;,]+);base64,(.+)$/);
  if (!match) return null;

  const [, mime, base64] = match;
  const binary = window.atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  const extension = mime.split('/')[1] || 'jpg';
  return new File([bytes], `${fallbackName}.${extension}`, { type: mime });
}

function toFormData(article: NewsArticleInput, id?: string): FormData {
  const form = new FormData();
  if (id) form.append('id', id);
  form.append('title', article.title);
  form.append('summary', article.shortDescription);
  form.append('content', article.content);
  form.append('publishedOn', normalizePublishedOn(article.publishDate));
  form.append('isActive', String(article.published));

  const image = dataUrlToFile(article.image, slugify(article.title) || 'news-image');
  if (image) {
    form.append('image', image);
  }

  return form;
}

export const newsRepository = {
  getAll(): Promise<NewsArticle[]> {
    return apiClient.get<BackendNewsItem[]>(API_ENDPOINTS.newsSearch).then((items) => items.map(toNewsArticle));
  },

  getAllActive(): Promise<NewsArticle[]> {
    return apiClient.get<BackendNewsItem[]>(API_ENDPOINTS.newsActive).then((items) => items.map(toNewsArticle));
  },

  async getById(id: string): Promise<NewsArticle> {
    const articles = await this.getAll();
    const article = articles.find((item) => item.id === id);
    if (!article) {
      throw new Error('Article not found.');
    }
    return article;
  },

  create(article: NewsArticleInput): Promise<NewsArticle> {
    return apiClient
      .post<BackendNewsItem>(API_ENDPOINTS.newsCreate, toFormData(article))
      .then(toNewsArticle);
  },

  update(id: string, article: NewsArticleInput): Promise<NewsArticle> {
    return apiClient
      .put<BackendNewsItem>(API_ENDPOINTS.newsUpdate, toFormData(article, id))
      .then(toNewsArticle);
  },

  remove(id: string): Promise<void> {
    return apiClient.delete<boolean>(API_ENDPOINTS.newsDelete(id)).then(() => undefined);
  },
};
