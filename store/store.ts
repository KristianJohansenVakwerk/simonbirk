'use client';

import { create } from 'zustand';

import { QueryProjectsResult } from '@/sanity/types/sanity.types';

interface StoreState {
  globalIntroDone: boolean;
  setGlobalIntroDone: (done: boolean) => void;
  globalIntroPlayed: boolean;
  setGlobalIntroPlayed: (done: boolean) => void;
  globalShowMenu: boolean;
  setGlobalShowMenu: (show: boolean) => void;
  globalActiveProjectMediaLen: number;
  setGlobalActiveProjectMediaLen: (len: number) => void;
  globalActiveProjectCurrentIndex: number;
  setGlobalActiveProjectCurrentIndex: (current: number) => void;
  globalStartThumbs: boolean;
  setGlobalStartThumbs: (state: boolean) => void;
  globalThumbIndex: number;
  setGlobalThumbIndex: (current: number) => void;
  globalHoverProject: boolean;
  setGlobalHoverProject: (state: boolean) => void;
  globalScrollPosition: number;
  setGlobalScrollPosition: () => void;
  resetGlobalScrollPosition: () => void;
  globalProjectOrder: string[];
  setGlobalProjectOrder: (projects: QueryProjectsResult) => void;
}

export const useStore = create<StoreState>((set) => ({
  globalIntroDone: false,
  setGlobalIntroDone: (done: boolean) => set({ globalIntroDone: done }),
  globalIntroPlayed: false,
  setGlobalIntroPlayed: (done: boolean) => set({ globalIntroPlayed: done }),
  globalShowMenu: true,
  setGlobalShowMenu: (show: boolean) => set({ globalShowMenu: show }),
  globalStartThumbs: false,
  setGlobalStartThumbs: (state: boolean) => set({ globalStartThumbs: state }),
  globalActiveProjectMediaLen: 0,
  setGlobalActiveProjectMediaLen: (len: number) =>
    set({ globalActiveProjectMediaLen: len }),
  globalActiveProjectCurrentIndex: 1,
  setGlobalActiveProjectCurrentIndex: (current: number) =>
    set({ globalActiveProjectCurrentIndex: current }),
  globalThumbIndex: -1,
  setGlobalThumbIndex: (current: number) => set({ globalThumbIndex: current }),
  globalHoverProject: false,
  setGlobalHoverProject: (state: boolean) => set({ globalHoverProject: state }),
  globalScrollPosition: 0,
  setGlobalScrollPosition: () => {
    if (typeof window !== 'undefined') {
      set({ globalScrollPosition: window.scrollY });
    }
  },
  resetGlobalScrollPosition: () => {
    set({ globalScrollPosition: 0 });
  },
  globalProjectOrder: [],
  setGlobalProjectOrder: (projects) => {
    if (!projects?.length) {
      set({ globalProjectOrder: [] });
      return;
    }

    const projectOrder = projects
      .map((p) => p?.slug?.current)
      .filter((slug): slug is string => Boolean(slug));
    set({ globalProjectOrder: projectOrder });
  },
}));
