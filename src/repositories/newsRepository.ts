import { API_ENDPOINTS } from '@/config/api';
import { apiClient } from '@/services/apiClient';
import type { NewsArticle, NewsArticleInput } from '@/types';

export const newsRepository = {
  getAll(): Promise<NewsArticle[]> {
    return apiClient.get<NewsArticle[]>(API_ENDPOINTS.news);
  },

  getById(id: string): Promise<NewsArticle> {
    return apiClient.get<NewsArticle>(API_ENDPOINTS.newsItem(id));
  },

  create(article: NewsArticleInput): Promise<NewsArticle> {
    return apiClient.post<NewsArticle>(API_ENDPOINTS.news, article);
  },

  update(id: string, article: NewsArticleInput): Promise<NewsArticle> {
    return apiClient.put<NewsArticle>(API_ENDPOINTS.newsItem(id), article);
  },

  remove(id: string): Promise<void> {
    return apiClient.delete<void>(API_ENDPOINTS.newsItem(id));
  },
};
