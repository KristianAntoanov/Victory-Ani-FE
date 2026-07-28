import { API_ENDPOINTS } from '@/config/api';
import { apiClient } from '@/services/apiClient';
import type { ProgrammeKey, Project, ProjectInput } from '@/types';
import { slugify } from '@/utils';

interface BackendProjectItem {
  id: number;
  slug?: string | null;
  title?: string;
  titleBg?: string;
  titleEn?: string;
  programme?: string;
  programmeBg?: string;
  programmeEn?: string;
  programmeLabel?: string;
  programmeLabelBg?: string;
  programmeLabelEn?: string;
  intro?: string;
  introBg?: string;
  introEn?: string;
  shortDescription?: string | null;
  shortDescriptionBg?: string | null;
  shortDescriptionEn?: string | null;
  overview?: string;
  overviewBg?: string;
  overviewEn?: string;
  imageUrl?: string | null;
  imageAlt?: string | null;
  imageAltBg?: string | null;
  imageAltEn?: string | null;
  isFeatured: boolean;
  duration?: string;
  durationBg?: string | null;
  durationEn?: string | null;
  countries?: string[];
  countriesBg?: string[];
  countriesEn?: string[];
  partners?: string[];
  partnersBg?: string[];
  partnersEn?: string[];
  objectives?: string[];
  objectivesBg?: string[];
  objectivesEn?: string[];
  activities?: string[];
  activitiesBg?: string[];
  activitiesEn?: string[];
  results?: string[];
  resultsBg?: string[];
  resultsEn?: string[];
  isActive: boolean;
  createdOn?: string | null;
  updatedOn?: string | null;
}

const PROGRAMME_LABELS: Record<ProgrammeKey, { bg: string; en: string }> = {
  horizon: { bg: 'Horizon Europe', en: 'Horizon Europe' },
  erasmus: { bg: 'Erasmus+', en: 'Erasmus+' },
  life: { bg: 'LIFE Programme', en: 'LIFE Programme' },
  cerv: { bg: 'CERV', en: 'CERV' },
};

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
  const titleEn = fallbackText(item.titleEn, item.title);
  const titleBg = fallbackText(item.titleBg, titleEn);
  const title = titleEn || titleBg;
  const programme = normalizeProgramme(item.programmeEn ?? item.programmeBg ?? item.programme);
  const labels = PROGRAMME_LABELS[programme];
  const programmeLabelEn = fallbackText(item.programmeLabelEn, item.programmeLabel) || labels.en;
  const programmeLabelBg = fallbackText(item.programmeLabelBg, programmeLabelEn) || labels.bg;
  const introEn = fallbackText(item.introEn, item.intro);
  const introBg = fallbackText(item.introBg, introEn);
  const shortDescriptionEn = fallbackText(item.shortDescriptionEn, item.shortDescription) || introEn;
  const shortDescriptionBg = fallbackText(item.shortDescriptionBg, shortDescriptionEn) || introBg;
  const overviewEn = fallbackText(item.overviewEn, item.overview);
  const overviewBg = fallbackText(item.overviewBg, overviewEn);
  const imageAltEn = fallbackText(item.imageAltEn, item.imageAlt) || title;
  const imageAltBg = fallbackText(item.imageAltBg, imageAltEn) || titleBg;
  const durationEn = fallbackText(item.durationEn, item.duration);
  const durationBg = fallbackText(item.durationBg, durationEn);
  const countriesEn = toStringList(item.countriesEn ?? item.countries);
  const countriesBg = toStringList(item.countriesBg ?? countriesEn);
  const partnersEn = toStringList(item.partnersEn ?? item.partners);
  const partnersBg = toStringList(item.partnersBg ?? partnersEn);
  const objectivesEn = toStringList(item.objectivesEn ?? item.objectives);
  const objectivesBg = toStringList(item.objectivesBg ?? objectivesEn);
  const activitiesEn = toStringList(item.activitiesEn ?? item.activities);
  const activitiesBg = toStringList(item.activitiesBg ?? activitiesEn);
  const resultsEn = toStringList(item.resultsEn ?? item.results);
  const resultsBg = toStringList(item.resultsBg ?? resultsEn);
  const slug = item.slug?.trim() || `${slugify(title) || 'project'}-${id}`;

  return {
    id,
    slug,
    titleBg,
    titleEn,
    title,
    programme,
    programmeBg: item.programmeBg ?? item.programme ?? programme,
    programmeEn: item.programmeEn ?? item.programme ?? programme,
    programmeLabelBg,
    programmeLabelEn,
    programmeLabel: programmeLabelEn || programmeLabelBg,
    introBg,
    introEn,
    intro: introEn || introBg,
    shortDescriptionBg,
    shortDescriptionEn,
    shortDescription: shortDescriptionEn || shortDescriptionBg,
    image: item.imageUrl ?? '',
    imageAltBg,
    imageAltEn,
    imageAlt: imageAltEn || imageAltBg,
    featured: item.isFeatured,
    overviewBg,
    overviewEn,
    overview: overviewEn || overviewBg,
    objectivesBg,
    objectivesEn,
    objectives: objectivesEn.length ? objectivesEn : objectivesBg,
    activitiesBg,
    activitiesEn,
    activities: activitiesEn.length ? activitiesEn : activitiesBg,
    resultsBg,
    resultsEn,
    results: resultsEn.length ? resultsEn : resultsBg,
    durationBg,
    durationEn,
    duration: durationEn || durationBg,
    countriesBg,
    countriesEn,
    countries: countriesEn.length ? countriesEn : countriesBg,
    partnersBg,
    partnersEn,
    partners: partnersEn.length ? partnersEn : partnersBg,
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

function appendList(form: FormData, name: string, values: string[]) {
  values.forEach((value) => form.append(name, value));
}

function toFormData(project: ProjectInput, id?: string): FormData {
  const form = new FormData();
  if (id) form.append('id', id);
  form.append('slug', project.slug);
  form.append('titleBg', project.titleBg);
  form.append('titleEn', project.titleEn);
  form.append('programmeBg', project.programmeBg);
  form.append('programmeEn', project.programmeEn);
  form.append('programmeLabelBg', project.programmeLabelBg);
  form.append('programmeLabelEn', project.programmeLabelEn);
  form.append('introBg', project.introBg);
  form.append('introEn', project.introEn);
  form.append('shortDescriptionBg', project.shortDescriptionBg);
  form.append('shortDescriptionEn', project.shortDescriptionEn);
  form.append('overviewBg', project.overviewBg);
  form.append('overviewEn', project.overviewEn);
  form.append('imageAltBg', project.imageAltBg);
  form.append('imageAltEn', project.imageAltEn);
  form.append('isFeatured', String(project.featured));
  form.append('isActive', 'true');
  form.append('durationBg', project.durationBg);
  form.append('durationEn', project.durationEn);
  appendList(form, 'countriesBg', project.countriesBg);
  appendList(form, 'countriesEn', project.countriesEn);
  appendList(form, 'partnersBg', project.partnersBg);
  appendList(form, 'partnersEn', project.partnersEn);
  appendList(form, 'objectivesBg', project.objectivesBg);
  appendList(form, 'objectivesEn', project.objectivesEn);
  appendList(form, 'activitiesBg', project.activitiesBg);
  appendList(form, 'activitiesEn', project.activitiesEn);
  appendList(form, 'resultsBg', project.resultsBg);
  appendList(form, 'resultsEn', project.resultsEn);

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
