import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ThemeStore } from '@/types/theme';

const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      themeKey: 'Ink Blue',
      setTheme: (key: string) => set({ themeKey: key }),
    }),
    { name: 'jf-theme-key' },
  ),
);

export default useThemeStore;
