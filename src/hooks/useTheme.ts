import { useEffect } from 'react';
import { setThemeToCss, themes } from '@/utils/themeUtils';
import useThemeStore from '@/store/themeStore';

export default function useTheme() {
  const { themeKey, setTheme } = useThemeStore();

  useEffect(() => {
    const theme = themes[themeKey] ?? themes['Ink Blue'];
    setThemeToCss(theme);
  }, [themeKey]);

  return { themeKey, setTheme, themes };
}
