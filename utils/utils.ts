import { format } from 'date-fns';
import {
  QueryProjectsResult,
  QuerySettingsResult,
} from '@/sanity/types/sanity.types';

export const formatClasses = (classNames: string) => {
  return classNames.split(' ').filter(Boolean).join('\n ');
};

export const formatDate = (date: string, dateFormat?: string) => {
  const f = dateFormat ? dateFormat : 'yyyy';

  if (!date) return '';

  return format(new Date(date), f);
};

export const checkIfBottom = () => {
  const scrollPosition = window.scrollY;
  const wh = window.innerHeight;
  const scrollHeight = document.documentElement.scrollHeight;

  return Math.floor(scrollPosition + wh) === scrollHeight;
};

export const getRandomProjects = (
  projects: QueryProjectsResult | null,
  count: number,
): QueryProjectsResult => {
  if (!projects || projects.length === 0 || count <= 0) {
    return [];
  }

  const shuffled = [...projects].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
};
