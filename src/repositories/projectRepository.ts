import { API_ENDPOINTS } from '@/config/api';
import { apiClient } from '@/services/apiClient';
import type { ProgrammeKey, Project, ProjectInput } from '@/types';
import { slugify } from '@/utils';

interface BackendProjectItem {
  id: number;
  slug?: string | null;
  title?: string | null;
  titleBg?: string | null;
  titleEn?: string | null;
  programme?: string | null;
  programmeLabel?: string | null;
  programmeBg?: string | null;
  programmeEn?: string | null;
  intro?: string | null;
  shortDescription?: string | null;
  overview?: string | null;
  themeBg?: string | null;
  themeEn?: string | null;
  imageUrl?: string | null;
  imageAlt?: string | null;
  duration?: string | null;
  durationBg?: string | null;
  durationEn?: string | null;
  countries?: string[] | null;
  countriesBg?: string | null;
  countriesEn?: string | null;
  partners?: string[] | null;
  objectives?: string[] | null;
  activities?: string[] | null;
  results?: string[] | null;
  mainActivitiesBg?: string | null;
  mainActivitiesEn?: string | null;
  isFeatured?: boolean;
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

function firstNonEmpty(...values: Array<string | null | undefined>): string {
  return values.map((value) => String(value ?? '').trim()).find(Boolean) ?? '';
}

function toProject(item: BackendProjectItem): Project {
  const id = String(item.id);
  const titleEn = firstNonEmpty(item.titleEn, item.title);
  const titleBg = fallbackText(item.titleBg, titleEn);
  const title = titleEn || titleBg;
  const programmeLabel = firstNonEmpty(item.programmeEn, item.programmeLabel, item.programme, item.programmeBg);
  const programme = normalizeProgramme(programmeLabel);
  const programmeBg = fallbackText(item.programmeBg, programmeLabel);
  const programmeEn = fallbackText(item.programmeEn, programmeLabel);
  const themeEn = firstNonEmpty(item.themeEn, item.intro, item.shortDescription);
  const themeBg = fallbackText(item.themeBg, themeEn);
  const durationEn = firstNonEmpty(item.durationEn, item.duration);
  const durationBg = fallbackText(item.durationBg, durationEn);
  const countriesEn = firstNonEmpty(item.countriesEn, item.countries?.join(', '));
  const countriesBg = fallbackText(item.countriesBg, countriesEn);
  const mainActivitiesEn = firstNonEmpty(item.mainActivitiesEn, item.activities?.join('\n'), item.overview);
  const mainActivitiesBg = fallbackText(item.mainActivitiesBg, mainActivitiesEn);
  const slug = item.slug || `${slugify(title) || 'project'}-${id}`;

  return {
    id,
    slug,
    titleBg,
    titleEn,
    title,
    programme,
    programmeBg,
    programmeEn,
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
    isFeatured: item.isFeatured ?? false,
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
  if (id) form.append('Id', id);
  form.append('TitleBg', project.titleBg);
  form.append('TitleEn', project.titleEn);
  form.append('ProgrammeBg', project.programmeBg);
  form.append('ProgrammeEn', project.programmeEn);
  form.append('ThemeBg', project.themeBg);
  form.append('ThemeEn', project.themeEn);
  form.append('CountriesBg', project.countriesBg);
  form.append('CountriesEn', project.countriesEn);
  form.append('DurationBg', project.durationBg);
  form.append('DurationEn', project.durationEn);
  form.append('MainActivitiesBg', project.mainActivitiesBg);
  form.append('MainActivitiesEn', project.mainActivitiesEn);
  form.append('IsActive', String(project.isActive));

  const image = dataUrlToFile(project.image, slugify(project.titleEn || project.titleBg) || 'project-image');
  if (image) {
    form.append('Image', image);
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

  changeStatus(id: string, isActive: boolean): Promise<void> {
    return apiClient.patch<boolean>(API_ENDPOINTS.projectsChangeStatus(id, isActive)).then(() => undefined);
  },

  remove(id: string): Promise<void> {
    return apiClient.delete<boolean>(API_ENDPOINTS.projectsDelete(id)).then(() => undefined);
  },
};
