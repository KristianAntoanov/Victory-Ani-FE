import { API_ENDPOINTS } from '@/config/api';
import { apiClient } from '@/services/apiClient';
import type { NewsArticle, NewsArticleInput } from '@/types';
import { slugify } from '@/utils';

interface BackendNewsItem {
  id: number;
  title?: string;
  titleBg?: string;
  titleEn?: string;
  summary?: string;
  summaryBg?: string;
  summaryEn?: string;
  content?: string;
  contentBg?: string;
  contentEn?: string;
  imageUrl?: string | null;
  publishedOn: string;
  isActive: boolean;
  createdOn?: string | null;
  updatedOn?: string | null;
}

function toNewsArticle(item: BackendNewsItem): NewsArticle {
  const id = String(item.id);
  const titleEn = item.titleEn ?? item.title ?? '';
  const titleBg = item.titleBg ?? titleEn;
  const summaryEn = item.summaryEn ?? item.summary ?? '';
  const summaryBg = item.summaryBg ?? summaryEn;
  const contentEn = item.contentEn ?? item.content ?? '';
  const contentBg = item.contentBg ?? contentEn;
  const title = titleEn || titleBg;
  const titleSlug = slugify(title) || 'news';

  return {
    id,
    titleBg,
    titleEn,
    title,
    slug: `${titleSlug}-${id}`,
    category: 'Announcements',
    publishDate: item.publishedOn,
    summaryBg,
    summaryEn,
    shortDescription: summaryEn || summaryBg,
    contentBg,
    contentEn,
    content: contentEn || contentBg,
    image: item.imageUrl ?? '',
    imageAlt: title,
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
  form.append('titleBg', article.titleBg);
  form.append('titleEn', article.titleEn);
  form.append('summaryBg', article.summaryBg);
  form.append('summaryEn', article.summaryEn);
  form.append('contentBg', article.contentBg);
  form.append('contentEn', article.contentEn);
  if (article.publishDate) {
    form.append('publishedOn', normalizePublishedOn(article.publishDate));
  }
  form.append('isActive', String(article.published));

  if (article.image) {
    const image = dataUrlToFile(article.image, slugify(article.titleEn || article.titleBg) || 'news-image');
    if (image) {
      form.append('image', image);
    }
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
