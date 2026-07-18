import { API_ENDPOINTS } from '@/config/api';
import { apiClient } from '@/services/apiClient';
import type { ProgrammeKey, Project, ProjectInput } from '@/types';
import { slugify } from '@/utils';

interface BackendProjectItem {
  id: number;
  slug?: string | null;
  title: string;
  programme: ProgrammeKey;
  programmeLabel: string;
  intro: string;
  shortDescription?: string | null;
  overview: string;
  imageUrl?: string | null;
  imageAlt?: string | null;
  isFeatured: boolean;
  duration: string;
  countries: string[];
  partners: string[];
  objectives: string[];
  activities: string[];
  results: string[];
  isActive: boolean;
  createdOn?: string | null;
  updatedOn?: string | null;
}

function toStringList(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map(String).filter(Boolean);
  }
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value) as unknown;
      if (Array.isArray(parsed)) return parsed.map(String).filter(Boolean);
    } catch {
      return value
        .split(/\r?\n|,/)
        .map((item) => item.trim())
        .filter(Boolean);
    }
  }
  return [];
}

function toProject(item: BackendProjectItem): Project {
  const id = String(item.id);
  const slug = item.slug?.trim() || `${slugify(item.title) || 'project'}-${id}`;

  return {
    id,
    slug,
    title: item.title,
    programme: item.programme,
    programmeLabel: item.programmeLabel,
    intro: item.intro,
    shortDescription: item.shortDescription ?? item.intro,
    image: item.imageUrl ?? '',
    imageAlt: item.imageAlt ?? item.title,
    featured: item.isFeatured,
    overview: item.overview,
    objectives: toStringList(item.objectives),
    activities: toStringList(item.activities),
    results: toStringList(item.results),
    duration: item.duration,
    countries: toStringList(item.countries),
    partners: toStringList(item.partners),
  };
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

function appendList(form: FormData, name: keyof Pick<ProjectInput, 'countries' | 'partners' | 'objectives' | 'activities' | 'results'>, values: string[]) {
  values.forEach((value) => form.append(name, value));
}

function toFormData(project: ProjectInput, id?: string): FormData {
  const form = new FormData();
  if (id) form.append('id', id);
  form.append('slug', project.slug);
  form.append('title', project.title);
  form.append('programme', project.programme);
  form.append('programmeLabel', project.programmeLabel);
  form.append('intro', project.intro);
  form.append('shortDescription', project.shortDescription);
  form.append('overview', project.overview);
  form.append('imageAlt', project.imageAlt);
  form.append('isFeatured', String(project.featured));
  form.append('isActive', 'true');
  form.append('duration', project.duration);
  appendList(form, 'countries', project.countries);
  appendList(form, 'partners', project.partners);
  appendList(form, 'objectives', project.objectives);
  appendList(form, 'activities', project.activities);
  appendList(form, 'results', project.results);

  const image = dataUrlToFile(project.image, slugify(project.title) || 'project-image');
  if (image) {
    form.append('image', image);
  }

  return form;
}

export const projectRepository = {
  getAll(): Promise<Project[]> {
    return apiClient.get<BackendProjectItem[]>(API_ENDPOINTS.projectsSearch).then((items) => items.map(toProject));
  },

  getAllActive(): Promise<Project[]> {
    return apiClient.get<BackendProjectItem[]>(API_ENDPOINTS.projectsActive).then((items) => items.map(toProject));
  },

  async getById(id: string): Promise<Project> {
    const projects = await this.getAll();
    const project = projects.find((item) => item.id === id);
    if (!project) {
      throw new Error('Project not found.');
    }
    return project;
  },

  create(project: ProjectInput): Promise<Project> {
    return apiClient
      .post<BackendProjectItem>(API_ENDPOINTS.projectsCreate, toFormData(project))
      .then(toProject);
  },

  update(id: string, project: ProjectInput): Promise<Project> {
    return apiClient
      .put<BackendProjectItem>(API_ENDPOINTS.projectsUpdate, toFormData(project, id))
      .then(toProject);
  },

  remove(id: string): Promise<void> {
    return apiClient.delete<boolean>(API_ENDPOINTS.projectsDelete(id)).then(() => undefined);
  },
};
