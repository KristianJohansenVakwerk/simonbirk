'use client';

const scrollPositions = new Map<string, number>();

export const saveScrollPosition = (path: string) => {
  scrollPositions.set(path, window.scrollY);
};

export const getScrollPosition = (path: string) => {
  return scrollPositions.get(path);
};
