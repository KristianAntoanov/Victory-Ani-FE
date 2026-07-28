import { projectRepository } from '@/repositories/projectRepository';
import type { Project, ProjectInput } from '@/types';

function toInput(project: Project): ProjectInput {
  return {
    titleBg: project.titleBg,
    titleEn: project.titleEn,
    programmeBg: project.programmeBg,
    programmeEn: project.programmeEn,
    themeBg: project.themeBg,
    themeEn: project.themeEn,
    image: project.image,
    durationBg: project.durationBg,
    durationEn: project.durationEn,
    countriesBg: project.countriesBg,
    countriesEn: project.countriesEn,
    mainActivitiesBg: project.mainActivitiesBg,
    mainActivitiesEn: project.mainActivitiesEn,
    isActive: project.isActive,
  };
}

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

  async toggleActive(id: string): Promise<Project> {
    const all = await this.getAllAdminProjects();
    const existing = all.find((item) => item.id === id);
    if (!existing) {
      throw new Error('Project not found.');
    }

    return projectRepository.update(id, {
      ...toInput(existing),
      isActive: !existing.isActive,
    });
  },
};
