import { newsRepository } from '@/repositories/newsRepository';
import { slugify } from '@/utils';
import type { NewsArticle, NewsArticleInput } from '@/types';

function toInput(article: NewsArticle): NewsArticleInput {
  return {
    titleBg: article.titleBg,
    titleEn: article.titleEn,
    title: article.title,
    slug: article.slug,
    category: article.category,
    publishDate: article.publishDate,
    summaryBg: article.summaryBg,
    summaryEn: article.summaryEn,
    shortDescription: article.shortDescription,
    contentBg: article.contentBg,
    contentEn: article.contentEn,
    content: article.content,
    image: article.image,
    imageAlt: article.imageAlt,
    author: article.author,
    featured: article.featured,
    published: article.published,
  };
}

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
    return articles.find((article) => article.featured);
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

  async togglePublished(id: string): Promise<NewsArticle> {
    const existing = await newsRepository.getById(id);
    if (!existing.content.trim()) {
      throw new Error('The backend News API does not expose article content in Search. Add a get-by-id endpoint before toggling status from this screen.');
    }
    return newsRepository.update(id, {
      ...toInput(existing),
      published: !existing.published,
    });
  },

  async toggleFeatured(id: string): Promise<NewsArticle> {
    const existing = await newsRepository.getById(id);
    if (!existing) {
      throw new Error('Article not found.');
    }
    throw new Error('The backend News API does not expose a featured field yet.');
  },
};
