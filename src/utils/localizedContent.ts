import type { Lang } from '@/i18n';
import type { NewsArticle, Project } from '@/types';

function text(bg: string | undefined, en: string | undefined, lang: Lang): string {
  return lang === 'bg' ? bg || en || '' : en || bg || '';
}

function stringList(bg: string | undefined, en: string | undefined, lang: Lang): string[] {
  return text(bg, en, lang)
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
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
    programmeLabel: text(project.programmeBg, project.programmeEn, lang),
    theme: text(project.themeBg, project.themeEn, lang),
    intro: text(project.themeBg, project.themeEn, lang),
    shortDescription: text(project.themeBg, project.themeEn, lang),
    overview: text(project.mainActivitiesBg, project.mainActivitiesEn, lang),
    imageAlt: text(project.titleBg, project.titleEn, lang),
    duration: text(project.durationBg, project.durationEn, lang),
    countries: stringList(project.countriesBg, project.countriesEn, lang),
    activities: stringList(project.mainActivitiesBg, project.mainActivitiesEn, lang),
  };
}
