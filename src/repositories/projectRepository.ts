import { API_ENDPOINTS } from '@/config/api';
import { apiClient } from '@/services/apiClient';
import type { Project, ProjectInput } from '@/types';

export const projectRepository = {
  getAll(): Promise<Project[]> {
    return apiClient.get<Project[]>(API_ENDPOINTS.projects);
  },

  getById(id: string): Promise<Project> {
    return apiClient.get<Project>(API_ENDPOINTS.projectItem(id));
  },

  create(project: ProjectInput): Promise<Project> {
    return apiClient.post<Project>(API_ENDPOINTS.projects, project);
  },

  update(id: string, project: ProjectInput): Promise<Project> {
    return apiClient.put<Project>(API_ENDPOINTS.projectItem(id), project);
  },

  remove(id: string): Promise<void> {
    return apiClient.delete<void>(API_ENDPOINTS.projectItem(id));
  },
};
