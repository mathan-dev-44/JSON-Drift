import { useEffect, useRef, useCallback } from "react";
import { useMonaco } from "@monaco-editor/react";
import Editor from "@monaco-editor/react";
import type { OnChange, OnMount, Monaco } from "@monaco-editor/react";
import useTheme from "@/hooks/useTheme";
import { themes } from "@/utils/themeUtils";
import type { Theme } from "@/types/theme";

const MONACO_THEME = "jf-custom";

function buildMonacoTheme(t: Theme) {
  return {
    base: (t.group === "dark" ? "vs-dark" : "vs") as "vs" | "vs-dark",
    inherit: true,
    rules: [
      { token: "string.key.json", foreground: t.accent.replace("#", "") },
      { token: "string.value.json", foreground: t.valString.replace("#", "") },
      { token: "number.json", foreground: t.valNumber.replace("#", "") },
      { token: "keyword.json", foreground: t.valBoolean.replace("#", "") },
      { token: "string.json", foreground: t.valString.replace("#", "") },
    ],
    colors: {
      "editor.background": t.bgCard,
      "editor.foreground": t.text,
      "editor.lineHighlightBackground": t.accent + "12",
      "editorLineNumber.foreground": t.textMuted,
      "editorLineNumber.activeForeground": t.textSecondary,
      "editorCursor.foreground": t.accent,
      "editor.selectionBackground": t.accent + "35",
      "editor.inactiveSelectionBackground": t.accent + "18",
      "editorIndentGuide.background1": t.borderLine,
      "editorIndentGuide.activeBackground1": t.textMuted,
      "scrollbarSlider.background": t.textMuted + "40",
      "scrollbarSlider.hoverBackground": t.accent + "55",
      "scrollbarSlider.activeBackground": t.accent + "80",
    },
  };
}

interface MonacoEditorProps {
  value: string;
  language?: string;
  readOnly?: boolean;
  onChange?: (value: string) => void;
  onMount?: OnMount;
}

const MonacoEditor = ({
  value,
  language = "json",
  readOnly = false,
  onChange,
  onMount,
}: MonacoEditorProps) => {
  const { themeKey } = useTheme();
  const monaco = useMonaco();

  // Keep a ref so beforeMount always gets the latest theme
  const themeRef = useRef(themes[themeKey] ?? themes["Ink Blue"]);
  useEffect(() => {
    themeRef.current = themes[themeKey] ?? themes["Ink Blue"];
  }, [themeKey]);

  // Define + apply theme whenever Monaco loads or app theme changes
  useEffect(() => {
    if (!monaco) return;
    const t = themes[themeKey] ?? themes["Ink Blue"];
    monaco.editor.defineTheme(MONACO_THEME, buildMonacoTheme(t));
    monaco.editor.setTheme(MONACO_THEME);
  }, [monaco, themeKey]);

  // Define theme before the editor first renders (avoids flash of default theme)
  const handleBeforeMount = useCallback((monacoInstance: Monaco) => {
    monacoInstance.editor.defineTheme(
      MONACO_THEME,
      buildMonacoTheme(themeRef.current),
    );
  }, []);

  const handleChange: OnChange = (val) => {
    onChange?.(val ?? "");
  };

  const handleMount: OnMount = (editor, monacoInstance) => {
    // Format after content is rendered — 400ms is reliable even on slow machines
    setTimeout(() => {
      editor.getAction("editor.action.formatDocument")?.run();
    }, 400);
    onMount?.(editor, monacoInstance);
  };

  return (
    <Editor
      height="100%"
      language={language}
      value={value}
      onChange={handleChange}
      beforeMount={handleBeforeMount}
      onMount={handleMount}
      theme={MONACO_THEME}
      options={{
        minimap: { enabled: false },
        fontSize: 12,
        lineNumbers: "on",
        scrollBeyondLastLine: false,
        automaticLayout: true,
        tabSize: 2,
        wordWrap: "on",
        formatOnPaste: true,
        formatOnType: true,
        fixedOverflowWidgets: true,
        readOnly,
      }}
    />
  );
};

export default MonacoEditor;
