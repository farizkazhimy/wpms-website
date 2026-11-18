import type { CollectionEntry } from 'astro:content';
import { dict, fmt } from '~/i18n';

export type Stage = CollectionEntry<'journal'>['data']['stage'];

export function stageLabel(stage: Stage): string {
  if (stage === 'news') return dict.journal.stages.news;
  return `${fmt(dict.journal.stage, { n: stage })} · ${dict.journal.stages[stage]}`;
}

export const journalHref = (id: string) => `/journal/${id}/`;
export const stageHref = (stage: string) => `/journal/tahap/${stage}/`;
