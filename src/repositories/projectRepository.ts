import { API_ENDPOINTS } from '@/config/api';
import { apiClient } from '@/services/apiClient';
import type { ProgrammeKey, Project, ProjectInput } from '@/types';
import { slugify } from '@/utils';

interface BackendProjectItem {
  id: number;
  titleBg: string;
  titleEn: string;
  programmeBg: string;
  programmeEn: string;
  themeBg: string;
  themeEn: string;
  imageUrl?: string | null;
  durationBg: string;
  durationEn: string;
  countriesBg: string;
  countriesEn: string;
  mainActivitiesBg: string;
  mainActivitiesEn: string;
  isActive: boolean;
  createdOn?: string | null;
  updatedOn?: string | null;
}

function normalizeProgramme(value: unknown): ProgrammeKey {
  const text = String(value ?? '').trim().toLowerCase();
  if (text.includes('erasmus')) return 'erasmus';
  if (text.includes('life')) return 'life';
  if (text.includes('cerv')) return 'cerv';
  return 'horizon';
}

function fallbackText(primary: string | null | undefined, fallback: string | null | undefined): string {
  return primary ?? fallback ?? '';
}

function toProject(item: BackendProjectItem): Project {
  const id = String(item.id);
  const titleEn = item.titleEn;
  const titleBg = fallbackText(item.titleBg, titleEn);
  const title = titleEn || titleBg;
  const programme = normalizeProgramme(item.programmeEn ?? item.programmeBg);
  const programmeLabel = item.programmeEn || item.programmeBg || programme;
  const themeEn = item.themeEn;
  const themeBg = fallbackText(item.themeBg, themeEn);
  const durationEn = item.durationEn;
  const durationBg = fallbackText(item.durationBg, durationEn);
  const countriesEn = item.countriesEn;
  const countriesBg = fallbackText(item.countriesBg, countriesEn);
  const mainActivitiesEn = item.mainActivitiesEn;
  const mainActivitiesBg = fallbackText(item.mainActivitiesBg, mainActivitiesEn);
  const slug = `${slugify(title) || 'project'}-${id}`;

  return {
    id,
    slug,
    titleBg,
    titleEn,
    title,
    programme,
    programmeBg: item.programmeBg,
    programmeEn: item.programmeEn,
    programmeLabel,
    themeBg,
    themeEn,
    theme: themeEn || themeBg,
    image: item.imageUrl ?? '',
    durationBg,
    durationEn,
    duration: durationEn || durationBg,
    countriesBg,
    countriesEn,
    countries: countriesEn || countriesBg,
    mainActivitiesBg,
    mainActivitiesEn,
    mainActivities: mainActivitiesEn || mainActivitiesBg,
    isActive: item.isActive,
    createdOn: item.createdOn,
    updatedOn: item.updatedOn,
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

function toFormData(project: ProjectInput, id?: string): FormData {
  const form = new FormData();
  if (id) form.append('id', id);
  form.append('titleBg', project.titleBg);
  form.append('titleEn', project.titleEn);
  form.append('programmeBg', project.programmeBg);
  form.append('programmeEn', project.programmeEn);
  form.append('themeBg', project.themeBg);
  form.append('themeEn', project.themeEn);
  form.append('countriesBg', project.countriesBg);
  form.append('countriesEn', project.countriesEn);
  form.append('durationBg', project.durationBg);
  form.append('durationEn', project.durationEn);
  form.append('mainActivitiesBg', project.mainActivitiesBg);
  form.append('mainActivitiesEn', project.mainActivitiesEn);
  form.append('isActive', String(project.isActive));

  const image = dataUrlToFile(project.image, slugify(project.titleEn || project.titleBg) || 'project-image');
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
