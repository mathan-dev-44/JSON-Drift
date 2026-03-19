import type { Theme } from '@/types/theme';

const hexToRgbSpaces = (hex: string): string => {
  if (!hex || hex.length < 7) return '0 0 0';
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r} ${g} ${b}`;
};

// Syntax highlight colors for light backgrounds
const LS = {
  valString: '#16a34a',
  valNumber: '#2563eb',
  valBoolean: '#d97706',
  valNull: '#dc2626',
};

// Syntax highlight colors for dark backgrounds
const DS = {
  valString: '#4ade80',
  valNumber: '#60a5fa',
  valBoolean: '#fbbf24',
  valNull: '#f87171',
};

export const themes: Record<string, Theme> = {
  // ─── Light themes ─────────────────────────────────────────────────────────

  Daylight: {
    name: 'Daylight', group: 'light',
    bg: '#FFFFFF', bgCard: '#F4F5FA',
    border: '#D9D9D9', borderLine: '#E5E9EB',
    text: '#000000',
    textSecondary: '#7F7F7F', textMuted: '#A6A6A6', textSubtle: '#D9D9D9',
    accent: '#3b82f6', accentText: '#ffffff',
    flowBg: '#E5E9EB', edgeColor: '#A6A6A6',
    ...LS,
  },

  Sunrise: {
    name: 'Sunrise', group: 'light',
    bg: '#FFFFFF', bgCard: '#F4F4F4',
    border: '#D9D9D9', borderLine: '#E5E9EB',
    text: '#000000',
    textSecondary: '#A6A6A6', textMuted: '#BFBFBF', textSubtle: '#D9D9D9',
    accent: '#f97316', accentText: '#ffffff',
    flowBg: '#E5E9EB', edgeColor: '#BFBFBF',
    valString: '#15803d', valNumber: '#1d4ed8', valBoolean: '#c2410c', valNull: '#dc2626',
  },

  'Champagne Silk': {
    name: 'Champagne Silk', group: 'light',
    bg: '#FFFCF7', bgCard: '#F9F4E8',
    border: '#E8DCC6', borderLine: '#E8DCC6',
    text: '#3D3426',
    textSecondary: '#B5A688', textMuted: '#CFC0A4', textSubtle: '#F2EDE1',
    accent: '#d97706', accentText: '#ffffff',
    flowBg: '#E8DCC6', edgeColor: '#CFC0A4',
    valString: '#15803d', valNumber: '#1d4ed8', valBoolean: '#b45309', valNull: '#dc2626',
  },

  'Pearl Mist': {
    name: 'Pearl Mist', group: 'light',
    bg: '#FCFCFD', bgCard: '#F4F6F9',
    border: '#DDE3EB', borderLine: '#DDE3EB',
    text: '#2A3441',
    textSecondary: '#A6B5C4', textMuted: '#C2CDD8', textSubtle: '#EDF0F4',
    accent: '#0ea5e9', accentText: '#ffffff',
    flowBg: '#DDE3EB', edgeColor: '#C2CDD8',
    ...LS,
  },

  'Sage Whisper': {
    name: 'Sage Whisper', group: 'light',
    bg: '#FDFEFE', bgCard: '#F4F7F5',
    border: '#DCE8DF', borderLine: '#DCE8DF',
    text: '#2A3D2F',
    textSecondary: '#A4B8A9', textMuted: '#C0CFC4', textSubtle: '#EDF2EE',
    accent: '#0891b2', accentText: '#ffffff',
    flowBg: '#DCE8DF', edgeColor: '#C0CFC4',
    valString: '#15803d', valNumber: '#0284c7', valBoolean: '#d97706', valNull: '#dc2626',
  },

  'Powder Blue': {
    name: 'Powder Blue', group: 'light',
    bg: '#FCFDFF', bgCard: '#F0F6FB',
    border: '#D2E4F0', borderLine: '#D2E4F0',
    text: '#1E3A4D',
    textSecondary: '#9BB9C8', textMuted: '#B8CDD9', textSubtle: '#E6EEF3',
    accent: '#0284c7', accentText: '#ffffff',
    flowBg: '#D2E4F0', edgeColor: '#B8CDD9',
    ...LS,
  },

  'Blossom Pink': {
    name: 'Blossom Pink', group: 'light',
    bg: '#FEFCFD', bgCard: '#F8F2F5',
    border: '#E6D2DB', borderLine: '#E6D2DB',
    text: '#3D2A32',
    textSecondary: '#B5A0AE', textMuted: '#CDB8C4', textSubtle: '#F1E6EA',
    accent: '#db2777', accentText: '#ffffff',
    flowBg: '#E6D2DB', edgeColor: '#CDB8C4',
    valString: '#16a34a', valNumber: '#7c3aed', valBoolean: '#d97706', valNull: '#e11d48',
  },

  'Golden Hour': {
    name: 'Golden Hour', group: 'light',
    bg: '#FEFDF9', bgCard: '#F8F3E8',
    border: '#E9DCC2', borderLine: '#E9DCC2',
    text: '#3E3320',
    textSecondary: '#BAA583', textMuted: '#D1C19F', textSubtle: '#F3EDDF',
    accent: '#d97706', accentText: '#ffffff',
    flowBg: '#E9DCC2', edgeColor: '#D1C19F',
    valString: '#15803d', valNumber: '#1d4ed8', valBoolean: '#b45309', valNull: '#dc2626',
  },

  'Pure White': {
    name: 'Pure White', group: 'light',
    bg: '#FFFFFF', bgCard: '#F8F9FA',
    border: '#E1E5E9', borderLine: '#E1E5E9',
    text: '#1A1D21',
    textSecondary: '#9AA0A6', textMuted: '#C1C7CD', textSubtle: '#E8EAED',
    accent: '#3b82f6', accentText: '#ffffff',
    flowBg: '#E1E5E9', edgeColor: '#C1C7CD',
    ...LS,
  },

  'Warm Cream': {
    name: 'Warm Cream', group: 'light',
    bg: '#FEFDFB', bgCard: '#F7F5F2',
    border: '#E6E2DD', borderLine: '#E6E2DD',
    text: '#2C2925',
    textSecondary: '#A19C96', textMuted: '#C8C3BD', textSubtle: '#F0EDEA',
    accent: '#b45309', accentText: '#ffffff',
    flowBg: '#E6E2DD', edgeColor: '#C8C3BD',
    valString: '#15803d', valNumber: '#1d4ed8', valBoolean: '#92400e', valNull: '#dc2626',
  },

  'Cool Gray': {
    name: 'Cool Gray', group: 'light',
    bg: '#FAFBFC', bgCard: '#F4F6F8',
    border: '#D8DDE4', borderLine: '#D8DDE4',
    text: '#1F2937',
    textSecondary: '#9CA3AB', textMuted: '#B8BFC7', textSubtle: '#EBEEF2',
    accent: '#6366f1', accentText: '#ffffff',
    flowBg: '#D8DDE4', edgeColor: '#B8BFC7',
    ...LS,
  },

  'Soft Blue': {
    name: 'Soft Blue', group: 'light',
    bg: '#FBFCFE', bgCard: '#F0F4F8',
    border: '#D4E0ED', borderLine: '#D4E0ED',
    text: '#1E293B',
    textSecondary: '#94A3B0', textMuted: '#B0BCC9', textSubtle: '#E7ECEF',
    accent: '#0ea5e9', accentText: '#ffffff',
    flowBg: '#D4E0ED', edgeColor: '#B0BCC9',
    ...LS,
  },

  'Mint Fresh': {
    name: 'Mint Fresh', group: 'light',
    bg: '#FBFEFE', bgCard: '#F2F8F6',
    border: '#D6E8E0', borderLine: '#D6E8E0',
    text: '#1B2D26',
    textSecondary: '#96B5A0', textMuted: '#B3C9BC', textSubtle: '#E8F1EC',
    accent: '#0891b2', accentText: '#ffffff',
    flowBg: '#D6E8E0', edgeColor: '#B3C9BC',
    valString: '#15803d', valNumber: '#0284c7', valBoolean: '#d97706', valNull: '#dc2626',
  },

  'Rose Blush': {
    name: 'Rose Blush', group: 'light',
    bg: '#FEFCFD', bgCard: '#F8F3F5',
    border: '#E8D8DD', borderLine: '#E8D8DD',
    text: '#2D1B21',
    textSecondary: '#B596A0', textMuted: '#C9B3BC', textSubtle: '#F1E8EC',
    accent: '#e11d48', accentText: '#ffffff',
    flowBg: '#E8D8DD', edgeColor: '#C9B3BC',
    valString: '#16a34a', valNumber: '#7c3aed', valBoolean: '#d97706', valNull: '#be123c',
  },

  'Lavender Mist': {
    name: 'Lavender Mist', group: 'light',
    bg: '#FDFCFE', bgCard: '#F6F3F8',
    border: '#E5D8E8', borderLine: '#E5D8E8',
    text: '#291B2D',
    textSecondary: '#B296B5', textMuted: '#C6B3C9', textSubtle: '#EFE8F1',
    accent: '#7c3aed', accentText: '#ffffff',
    flowBg: '#E5D8E8', edgeColor: '#C6B3C9',
    valString: '#16a34a', valNumber: '#2563eb', valBoolean: '#b45309', valNull: '#dc2626',
  },

  'Paper White': {
    name: 'Paper White', group: 'light',
    bg: '#FDFDFD', bgCard: '#F6F7F8',
    border: '#E0E4E7', borderLine: '#E0E4E7',
    text: '#212529',
    textSecondary: '#9DA5AB', textMuted: '#BFC5CA', textSubtle: '#EAECEE',
    accent: '#4f46e5', accentText: '#ffffff',
    flowBg: '#E0E4E7', edgeColor: '#BFC5CA',
    ...LS,
  },

  Platinum: {
    name: 'Platinum', group: 'light',
    bg: '#F9FAFB', bgCard: '#F1F3F4',
    border: '#D5D9DC', borderLine: '#D5D9DC',
    text: '#202124',
    textSecondary: '#999FA5', textMuted: '#B6BCC1', textSubtle: '#E8EAEB',
    accent: '#4f46e5', accentText: '#ffffff',
    flowBg: '#D5D9DC', edgeColor: '#B6BCC1',
    ...LS,
  },

  Ivory: {
    name: 'Ivory', group: 'light',
    bg: '#FFFEF9', bgCard: '#F8F6F0',
    border: '#E7E3D9', borderLine: '#E7E3D9',
    text: '#2B2722',
    textSecondary: '#A29D91', textMuted: '#C4BFB3', textSubtle: '#F0EDE7',
    accent: '#b45309', accentText: '#ffffff',
    flowBg: '#E7E3D9', edgeColor: '#C4BFB3',
    valString: '#15803d', valNumber: '#1d4ed8', valBoolean: '#92400e', valNull: '#dc2626',
  },

  // ─── Dark themes ──────────────────────────────────────────────────────────

  Midnight: {
    name: 'Midnight', group: 'dark',
    bg: '#000000', bgCard: '#232323',
    border: '#212121', borderLine: '#212121',
    text: '#FFFFFF',
    textSecondary: '#808080', textMuted: '#595959', textSubtle: '#262626',
    accent: '#60a5fa', accentText: '#000000',
    flowBg: '#141414', edgeColor: '#595959',
    ...DS,
  },

  Eclipse: {
    name: 'Eclipse', group: 'dark',
    bg: '#050C24', bgCard: '#2A3045',
    border: '#495271', borderLine: '#495271',
    text: '#FFFFFF',
    textSecondary: '#828692', textMuted: '#5C6170', textSubtle: '#2A3045',
    accent: '#818cf8', accentText: '#050C24',
    flowBg: '#0d1530', edgeColor: '#5C6170',
    ...DS,
  },

  'Ink Blue': {
    name: 'Ink Blue', group: 'dark',
    bg: '#0D0F11', bgCard: '#1A1F26',
    border: '#2B3540', borderLine: '#2B3540',
    text: '#E5EFFF',
    textSecondary: '#797F88', textMuted: '#585D64', textSubtle: '#2D3134',
    accent: '#60a5fa', accentText: '#0D0F11',
    flowBg: '#141a21', edgeColor: '#585D64',
    ...DS,
  },

  'Deep Space': {
    name: 'Deep Space', group: 'dark',
    bg: '#080A0C', bgCard: '#101418',
    border: '#202E2E', borderLine: '#202E2E',
    text: '#DCE6F5',
    textSecondary: '#6E747D', textMuted: '#4B5058', textSubtle: '#23272C',
    accent: '#38bdf8', accentText: '#080A0C',
    flowBg: '#0e1214', edgeColor: '#4B5058',
    ...DS,
  },

  'Midnight Blue': {
    name: 'Midnight Blue', group: 'dark',
    bg: '#0B0D14', bgCard: '#141923',
    border: '#232A3A', borderLine: '#232A3A',
    text: '#E1EBFA',
    textSecondary: '#737A87', textMuted: '#505662', textSubtle: '#282D37',
    accent: '#60a5fa', accentText: '#0B0D14',
    flowBg: '#121520', edgeColor: '#505662',
    ...DS,
  },

  'Charcoal Professional': {
    name: 'Charcoal Professional', group: 'dark',
    bg: '#121418', bgCard: '#20242A',
    border: '#30363E', borderLine: '#30363E',
    text: '#EBF0F8',
    textSecondary: '#80868E', textMuted: '#5F646C', textSubtle: '#34383E',
    accent: '#60a5fa', accentText: '#121418',
    flowBg: '#1a1e24', edgeColor: '#5F646C',
    ...DS,
  },

  'Warm Dark': {
    name: 'Warm Dark', group: 'dark',
    bg: '#100E0D', bgCard: '#1E1B19',
    border: '#2E2A27', borderLine: '#2E2A27',
    text: '#F5F0EB',
    textSecondary: '#7D7975', textMuted: '#5C5854', textSubtle: '#322F2C',
    accent: '#fb923c', accentText: '#100E0D',
    flowBg: '#181614', edgeColor: '#5C5854',
    valString: '#86efac', valNumber: '#93c5fd', valBoolean: '#fcd34d', valNull: '#fca5a5',
  },

  'Purple Haze': {
    name: 'Purple Haze', group: 'dark',
    bg: '#0F0D12', bgCard: '#1C1921',
    border: '#2C2832', borderLine: '#2C2832',
    text: '#F0EBF8',
    textSecondary: '#7B7781', textMuted: '#5A5660', textSubtle: '#302D34',
    accent: '#a78bfa', accentText: '#0F0D12',
    flowBg: '#161320', edgeColor: '#5A5660',
    valString: '#86efac', valNumber: '#93c5fd', valBoolean: '#fcd34d', valNull: '#fca5a5',
  },

  'Forest Night': {
    name: 'Forest Night', group: 'dark',
    bg: '#0C100E', bgCard: '#181E1B',
    border: '#262E2A', borderLine: '#262E2A',
    text: '#EBF5F0',
    textSecondary: '#757D79', textMuted: '#545C58', textSubtle: '#2A302D',
    accent: '#4ade80', accentText: '#0C100E',
    flowBg: '#141a17', edgeColor: '#545C58',
    valString: '#86efac', valNumber: '#93c5fd', valBoolean: '#fcd34d', valNull: '#fca5a5',
  },

  'OLED Black': {
    name: 'OLED Black', group: 'dark',
    bg: '#000000', bgCard: '#12161A',
    border: '#23282D', borderLine: '#23282D',
    text: '#FFFFFF',
    textSecondary: '#80858A', textMuted: '#555A5F', textSubtle: '#282C30',
    accent: '#60a5fa', accentText: '#000000',
    flowBg: '#0a0c0e', edgeColor: '#555A5F',
    ...DS,
  },

  'Slate Storm': {
    name: 'Slate Storm', group: 'dark',
    bg: '#0F1116', bgCard: '#1C2028',
    border: '#2D333E', borderLine: '#2D333E',
    text: '#E2E8F0',
    textSecondary: '#7B818A', textMuted: '#5A606A', textSubtle: '#30343C',
    accent: '#7dd3fc', accentText: '#0F1116',
    flowBg: '#161a22', edgeColor: '#5A606A',
    ...DS,
  },

  Obsidian: {
    name: 'Obsidian', group: 'dark',
    bg: '#0A0C0F', bgCard: '#161B22',
    border: '#21272E', borderLine: '#21272E',
    text: '#F0F6FF',
    textSecondary: '#707880', textMuted: '#4D545C', textSubtle: '#252A31',
    accent: '#60a5fa', accentText: '#0A0C0F',
    flowBg: '#121620', edgeColor: '#4D545C',
    ...DS,
  },

  'Twilight Navy': {
    name: 'Twilight Navy', group: 'dark',
    bg: '#0E0F14', bgCard: '#1A1C24',
    border: '#2A2D38', borderLine: '#2A2D38',
    text: '#E8ECFA',
    textSecondary: '#767C88', textMuted: '#545862', textSubtle: '#2C2F36',
    accent: '#818cf8', accentText: '#0E0F14',
    flowBg: '#14162c', edgeColor: '#545862',
    ...DS,
  },
};

export const setThemeToCss = (theme: Theme): void => {
  const root = document.documentElement;
  root.style.setProperty('--jf-bg', hexToRgbSpaces(theme.bg));
  root.style.setProperty('--jf-bg-card', hexToRgbSpaces(theme.bgCard));
  root.style.setProperty('--jf-text', hexToRgbSpaces(theme.text));
  root.style.setProperty('--jf-text-secondary', hexToRgbSpaces(theme.textSecondary));
  root.style.setProperty('--jf-text-muted', hexToRgbSpaces(theme.textMuted));
  root.style.setProperty('--jf-text-subtle', hexToRgbSpaces(theme.textSubtle));
  root.style.setProperty('--jf-accent', hexToRgbSpaces(theme.accent));
  root.style.setProperty('--jf-accent-text', hexToRgbSpaces(theme.accentText));
  root.style.setProperty('--jf-border', hexToRgbSpaces(theme.border));
  root.style.setProperty('--jf-border-line', hexToRgbSpaces(theme.borderLine));
  root.style.setProperty('--jf-flow-bg', hexToRgbSpaces(theme.flowBg));
  root.style.setProperty('--jf-val-string', hexToRgbSpaces(theme.valString));
  root.style.setProperty('--jf-val-number', hexToRgbSpaces(theme.valNumber));
  root.style.setProperty('--jf-val-boolean', hexToRgbSpaces(theme.valBoolean));
  root.style.setProperty('--jf-val-null', hexToRgbSpaces(theme.valNull));
  root.style.setProperty('--jf-edge', hexToRgbSpaces(theme.edgeColor));
};
