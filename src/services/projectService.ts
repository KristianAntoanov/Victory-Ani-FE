import { projectRepository } from '@/repositories/projectRepository';
import { slugify } from '@/utils';
import type { Project, ProjectInput } from '@/types';

function toInput(project: Project): ProjectInput {
  return {
    slug: project.slug,
    titleBg: project.titleBg,
    titleEn: project.titleEn,
    title: project.title,
    programme: project.programme,
    programmeBg: project.programmeBg,
    programmeEn: project.programmeEn,
    programmeLabelBg: project.programmeLabelBg,
    programmeLabelEn: project.programmeLabelEn,
    programmeLabel: project.programmeLabel,
    introBg: project.introBg,
    introEn: project.introEn,
    intro: project.intro,
    shortDescriptionBg: project.shortDescriptionBg,
    shortDescriptionEn: project.shortDescriptionEn,
    shortDescription: project.shortDescription,
    image: project.image,
    imageAltBg: project.imageAltBg,
    imageAltEn: project.imageAltEn,
    imageAlt: project.imageAlt,
    featured: project.featured,
    overviewBg: project.overviewBg,
    overviewEn: project.overviewEn,
    overview: project.overview,
    objectivesBg: project.objectivesBg,
    objectivesEn: project.objectivesEn,
    objectives: project.objectives,
    activitiesBg: project.activitiesBg,
    activitiesEn: project.activitiesEn,
    activities: project.activities,
    resultsBg: project.resultsBg,
    resultsEn: project.resultsEn,
    results: project.results,
    durationBg: project.durationBg,
    durationEn: project.durationEn,
    duration: project.duration,
    countriesBg: project.countriesBg,
    countriesEn: project.countriesEn,
    countries: project.countries,
    partnersBg: project.partnersBg,
    partnersEn: project.partnersEn,
    partners: project.partners,
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

  async isSlugUnique(slug: string, ignoreId?: string): Promise<boolean> {
    const projects = await this.getAllAdminProjects();
    return !projects.some((project) => project.slug === slug && project.id !== ignoreId);
  },

  async generateUniqueSlug(title: string, ignoreId?: string): Promise<string> {
    const base = slugify(title) || 'project';
    let candidate = base;
    let counter = 2;
    while (!(await this.isSlugUnique(candidate, ignoreId))) {
      candidate = `${base}-${counter}`;
      counter += 1;
    }
    return candidate;
  },

  async createProject(input: ProjectInput): Promise<Project> {
    if (input.featured) {
      await this.clearOtherFeatured();
    }
    return projectRepository.create(input);
  },

  async updateProject(id: string, input: ProjectInput): Promise<Project> {
    if (input.featured) {
      await this.clearOtherFeatured(id);
    }
    return projectRepository.update(id, input);
  },

  deleteProject(id: string): Promise<void> {
    return projectRepository.remove(id);
  },

  async toggleFeatured(id: string): Promise<Project> {
    const all = await this.getAllAdminProjects();
    const existing = all.find((item) => item.id === id);
    if (!existing) {
      throw new Error('Project not found.');
    }

    const willFeature = !existing.featured;
    if (willFeature) {
      await this.clearOtherFeatured(id);
    }

    return projectRepository.update(id, {
      ...toInput(existing),
      featured: willFeature,
    });
  },

  async clearOtherFeatured(ignoreId?: string): Promise<void> {
    const all = await this.getAllAdminProjects();
    await Promise.all(
      all
        .filter((item) => item.id !== ignoreId && item.featured)
        .map((item) => projectRepository.update(item.id, { ...toInput(item), featured: false })),
    );
  },
};
