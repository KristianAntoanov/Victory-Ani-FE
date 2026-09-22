import { newsRepository } from '@/repositories/newsRepository';
import { slugify } from '@/utils';
import type { NewsArticle, NewsArticleInput } from '@/types';

export const newsService = {
  async getAllNews(): Promise<NewsArticle[]> {
    const articles = await newsRepository.getAll();
    return [...articles].sort(
      (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime(),
    );
  },

  async getPublishedNews(): Promise<NewsArticle[]> {
    const articles = await newsRepository.getAllActive();
    return [...articles].sort(
      (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime(),
    );
  },

  async getFeaturedNews(): Promise<NewsArticle | undefined> {
    const articles = await this.getPublishedNews();
    return articles[0];
  },

  getNewsById(id: string): Promise<NewsArticle> {
    return newsRepository.getById(id);
  },

  async getNewsBySlug(slug: string): Promise<NewsArticle | undefined> {
    const articles = await this.getPublishedNews();
    return articles.find((article) => article.slug === slug);
  },

  async isSlugUnique(slug: string, ignoreId?: string): Promise<boolean> {
    const articles = await newsRepository.getAll();
    return !articles.some((article) => article.slug === slug && article.id !== ignoreId);
  },

  async generateUniqueSlug(title: string, ignoreId?: string): Promise<string> {
    const base = slugify(title) || 'news';
    let candidate = base;
    let counter = 2;
    while (!(await this.isSlugUnique(candidate, ignoreId))) {
      candidate = `${base}-${counter}`;
      counter += 1;
    }
    return candidate;
  },

  createNews(input: NewsArticleInput): Promise<NewsArticle> {
    return newsRepository.create(input);
  },

  updateNews(id: string, input: NewsArticleInput): Promise<NewsArticle> {
    return newsRepository.update(id, input);
  },

  deleteNews(id: string): Promise<void> {
    return newsRepository.remove(id);
  },

  togglePublished(id: string, published: boolean): Promise<void> {
    return newsRepository.changeStatus(id, published);
  },
};
