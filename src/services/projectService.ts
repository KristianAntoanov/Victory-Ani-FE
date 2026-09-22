import { projectRepository } from '@/repositories/projectRepository';
import type { Project, ProjectInput } from '@/types';

export const projectService = {
  getAllProjects(): Promise<Project[]> {
    return projectRepository.getAllActive();
  },

  getAllAdminProjects(): Promise<Project[]> {
    return projectRepository.getAll();
  },

  getProjectById(id: string): Promise<Project> {
    return projectRepository.getById(id);
  },

  async getProjectBySlug(slug: string): Promise<Project | undefined> {
    const projects = await this.getAllProjects();
    return projects.find((project) => project.slug === slug);
  },

  async createProject(input: ProjectInput): Promise<Project> {
    return projectRepository.create(input);
  },

  async updateProject(id: string, input: ProjectInput): Promise<Project> {
    return projectRepository.update(id, input);
  },

  deleteProject(id: string): Promise<void> {
    return projectRepository.remove(id);
  },

  toggleActive(id: string, isActive: boolean): Promise<void> {
    return projectRepository.changeStatus(id, isActive);
  },
};
