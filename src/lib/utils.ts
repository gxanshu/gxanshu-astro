import { DEFAULT_CONFIGURATION } from './constants';
import type { CollectionEntry } from 'astro:content';

export const formatDate = (date: Date) => {
  const formatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC', // Default to UTC to prevent timezone issues
  });

  // Ensure we're parsing the date correctly
  return formatter.format(new Date(date));
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
