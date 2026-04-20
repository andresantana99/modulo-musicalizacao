import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Tema = 'light' | 'dark';

interface UIState {
  tema: Tema;
  zoom: number;
  setTema: (t: Tema) => void;
  setZoom: (z: number) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      tema: 'light',
      zoom: 100,
      setTema: (tema) => set({ tema }),
      setZoom: (zoom) => set({ zoom }),
    }),
    { name: 'ui-preferences' },
  ),
);
