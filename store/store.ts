'use client';

import { create } from 'zustand';

interface StoreState {
  globalIntroDone: boolean;
  setGlobalIntroDone: (done: boolean) => void;
  globalIntroPlayed: boolean;
  setGlobalIntroPlayed: (done: boolean) => void;
  globalShowMenu: boolean;
  setGlobalShowMenu: (show: boolean) => void;
  globalActiveProjectIndex: number;
  setGlobalActiveProjectIndex: (index: number) => void;
  globalStartThumbs: boolean;
  setGlobalStartThumbs: (state: boolean) => void;
  globalThumbIndex: number;
  setGlobalThumbIndex: (current: number) => void;
  globalHoverProject: boolean;
  setGlobalHoverProject: (state: boolean) => void;
  scrollPositions: Record<string, number>;
  saveScrollPosition: (path: string) => void;
  getScrollPosition: (path: string) => number | undefined;
}

export const useStore = create<StoreState>((set, get) => ({
  globalIntroDone: false,
  setGlobalIntroDone: (done: boolean) => set({ globalIntroDone: done }),
  globalIntroPlayed: false,
  setGlobalIntroPlayed: (done: boolean) => set({ globalIntroPlayed: done }),
  globalShowMenu: true,
  setGlobalShowMenu: (show: boolean) => set({ globalShowMenu: show }),
  globalStartThumbs: false,
  setGlobalStartThumbs: (state: boolean) => set({ globalStartThumbs: state }),
  globalActiveProjectIndex: 0,
  setGlobalActiveProjectIndex: (index: number) =>
    set({ globalActiveProjectIndex: index }),
  globalThumbIndex: -1,
  setGlobalThumbIndex: (current: number) => set({ globalThumbIndex: current }),
  globalHoverProject: false,
  setGlobalHoverProject: (state: boolean) => set({ globalHoverProject: state }),
  scrollPositions: {},
  saveScrollPosition: (path: string) => {
    if (typeof window !== 'undefined') {
      set((state) => ({
        scrollPositions: {
          ...state.scrollPositions,
          [path]: window.scrollY,
        },
      }));
    }
  },
  getScrollPosition: (path: string) => {
    return get().scrollPositions[path];
  },
}));
