import type { Lang } from '@/i18n';
import type { NewsArticle, Project } from '@/types';

function text(bg: string | undefined, en: string | undefined, lang: Lang): string {
  return lang === 'bg' ? bg || en || '' : en || bg || '';
}

function list(bg: string[] | undefined, en: string[] | undefined, lang: Lang): string[] {
  return lang === 'bg' ? (bg?.length ? bg : en ?? []) : en?.length ? en : bg ?? [];
}

export function getNewsContent(article: NewsArticle, lang: Lang) {
  return {
    title: text(article.titleBg, article.titleEn, lang),
    summary: text(article.summaryBg, article.summaryEn, lang),
    content: text(article.contentBg, article.contentEn, lang),
  };
}

export function getProjectContent(project: Project, lang: Lang) {
  return {
    title: text(project.titleBg, project.titleEn, lang),
    programmeLabel: text(project.programmeLabelBg, project.programmeLabelEn, lang),
    intro: text(project.introBg, project.introEn, lang),
    shortDescription: text(project.shortDescriptionBg, project.shortDescriptionEn, lang),
    overview: text(project.overviewBg, project.overviewEn, lang),
    imageAlt: text(project.imageAltBg, project.imageAltEn, lang),
    duration: text(project.durationBg, project.durationEn, lang),
    countries: list(project.countriesBg, project.countriesEn, lang),
    partners: list(project.partnersBg, project.partnersEn, lang),
    objectives: list(project.objectivesBg, project.objectivesEn, lang),
    activities: list(project.activitiesBg, project.activitiesEn, lang),
    results: list(project.resultsBg, project.resultsEn, lang),
  };
}
