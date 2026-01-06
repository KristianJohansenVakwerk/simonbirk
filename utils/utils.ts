import { format } from 'date-fns';

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
