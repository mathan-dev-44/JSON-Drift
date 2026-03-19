export interface Theme {
  name: string;
  group: 'light' | 'dark';
  bg: string;
  bgCard: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  textSubtle: string;
  accent: string;
  accentText: string;
  border: string;
  borderLine: string;
  flowBg: string;
  valString: string;
  valNumber: string;
  valBoolean: string;
  valNull: string;
  edgeColor: string;
}

export interface ThemeStore {
  themeKey: string;
  setTheme: (key: string) => void;
}
