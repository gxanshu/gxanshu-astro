import { DEFAULT_CONFIGURATION } from './constants';
import type { CollectionEntry } from 'astro:content';

export const formatDate = (date: Date) => {
  const formatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
  return formatter.format(new Date(date));
};

export const formatDateDot = (date: Date) => {
  const d = new Date(date);
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${y}.${m}.${day}`;
};

export const formatDateYearMonth = (date: Date) => {
  const d = new Date(date);
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  return `${y}.${m}`;
};

export const generateAbsoluteUrl = (path: string) =>
  DEFAULT_CONFIGURATION.baseUrl.concat(path);

export const isDevelopment = () => import.meta.env.MODE === 'development';

export const includeDraft = (draft: boolean) => {
  if (isDevelopment()) return true;
  return draft !== true;
};

const parseJobDate = (dateStr: string): number => {
  if (dateStr === 'Present') return Date.now();
  return new Date(dateStr).getTime();
};

export const sortJobsByDate = (jobs: CollectionEntry<'jobs'>[]) => {
  return jobs.sort((current, next) => {
    const currentEnd = parseJobDate(current.data.to);
    const nextEnd = parseJobDate(next.data.to);
    if (nextEnd !== currentEnd) return nextEnd - currentEnd;
    return parseJobDate(next.data.from) - parseJobDate(current.data.from);
  });
};
