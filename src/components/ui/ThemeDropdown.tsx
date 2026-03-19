import { useState, useRef, useEffect } from 'react';
import useTheme from '@/hooks/useTheme';
import { themes } from '@/utils/themeUtils';
import type { Theme } from '@/types/theme';

export default function ThemeDropdown() {
  const { themeKey, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onOutside);
    return () => document.removeEventListener('mousedown', onOutside);
  }, [open]);

  const current = themes[themeKey] ?? themes['Ink Blue'];
  const lightThemes = Object.values(themes).filter((t) => t.group === 'light');
  const darkThemes = Object.values(themes).filter((t) => t.group === 'dark');

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg hover:bg-jf-bg-card transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-jf-accent cursor-pointer"
        title="Change theme"
        aria-label="Change theme"
      >
        {/* Swatch: bgCard with accent ring */}
        <span
          className="w-3.5 h-3.5 rounded-sm flex-shrink-0"
          style={{
            background: current.bgCard,
            boxShadow: `0 0 0 1.5px ${current.accent}`,
          }}
        />
        <span className="text-xs text-jf-text-secondary hidden sm:block max-w-24 truncate">
          {current.name}
        </span>
        <svg
          className="w-3 h-3 text-jf-text-secondary flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1.5 w-52 bg-jf-bg border border-jf-border-line rounded-xl shadow-2xl z-50 overflow-hidden">
          <div className="max-h-80 overflow-y-auto jf-scrollbar py-1.5">
            <SectionLabel label="Light" />
            {lightThemes.map((theme) => (
              <ThemeOption
                key={theme.name}
                theme={theme}
                isActive={themeKey === theme.name}
                onClick={() => { setTheme(theme.name); setOpen(false); }}
              />
            ))}

            <div className="mx-3 my-1 border-t border-jf-border-line" />

            <SectionLabel label="Dark" />
            {darkThemes.map((theme) => (
              <ThemeOption
                key={theme.name}
                theme={theme}
                isActive={themeKey === theme.name}
                onClick={() => { setTheme(theme.name); setOpen(false); }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="px-3 pt-1 pb-0.5 text-xs font-semibold text-jf-text-muted uppercase tracking-wider select-none">
      {label}
    </div>
  );
}

function ThemeOption({
  theme,
  isActive,
  onClick,
}: {
  theme: Theme;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2.5 px-3 py-1.5 text-xs text-jf-text hover:bg-jf-bg-card transition-colors duration-100 cursor-pointer ${
        isActive ? 'bg-jf-bg-card' : ''
      }`}
    >
      {/* Color swatch */}
      <span
        className="w-4 h-4 rounded flex-shrink-0"
        style={{
          background: theme.bgCard,
          boxShadow: isActive
            ? `0 0 0 1.5px ${theme.accent}`
            : `0 0 0 1px ${theme.borderLine}`,
        }}
      />
      <span className="truncate flex-1 text-left">{theme.name}</span>
      {isActive && (
        <svg
          className="w-3 h-3 text-jf-accent ml-auto flex-shrink-0"
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </button>
  );
}
