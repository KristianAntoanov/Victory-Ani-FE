import { newsRepository } from '@/repositories/newsRepository';
import { slugify } from '@/utils';
import type { NewsArticle, NewsArticleInput } from '@/types';

function toInput(article: NewsArticle): NewsArticleInput {
  return {
    title: article.title,
    slug: article.slug,
    category: article.category,
    publishDate: article.publishDate,
    shortDescription: article.shortDescription,
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
    const articles = await this.getAllNews();
    return articles.filter((article) => article.published);
  },

  async getFeaturedNews(): Promise<NewsArticle | undefined> {
    const articles = await this.getPublishedNews();
    return articles.find((article) => article.featured);
  },

  getNewsById(id: string): Promise<NewsArticle> {
    return newsRepository.getById(id);
  },

  async getNewsBySlug(slug: string): Promise<NewsArticle | undefined> {
    const articles = await this.getAllNews();
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
    return newsRepository.update(id, {
      ...toInput(existing),
      published: !existing.published,
    });
  },

  async toggleFeatured(id: string): Promise<NewsArticle> {
    const all = await newsRepository.getAll();
    const existing = all.find((item) => item.id === id);
    if (!existing) {
      throw new Error('Article not found.');
    }

    const willFeature = !existing.featured;
    if (willFeature) {
      await Promise.all(
        all
          .filter((item) => item.id !== id && item.featured)
          .map((item) => newsRepository.update(item.id, { ...toInput(item), featured: false })),
      );
    }

    return newsRepository.update(id, {
      ...toInput(existing),
      featured: willFeature,
    });
  },
};
