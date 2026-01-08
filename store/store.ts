'use client';

import { create } from 'zustand';

interface StoreState {
  globalIntroDone: boolean;
  setGlobalIntroDone: (done: boolean) => void;
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
}

export const useStore = create<StoreState>((set) => ({
  globalIntroDone: true,
  setGlobalIntroDone: (done: boolean) => set({ globalIntroDone: done }),
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
}));
