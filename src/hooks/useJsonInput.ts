import { useState, useCallback } from "react";
import type { ValidationStatus } from "@/components/JsonInputPanel/JsonEditorHeader";

export interface UseJsonInputReturn {
  jsonText: string;
  status: ValidationStatus;
  isImportModalOpen: boolean;
  openImportModal: () => void;
  closeImportModal: () => void;
  handleEditorChange: (value: string) => void;
  handleFileLoad: (text: string) => void;
  handleExport: () => void;
}

export default function useJsonInput(): UseJsonInputReturn {
  const [jsonText, setJsonText] = useState("");
  const [status, setStatus] = useState<ValidationStatus>("idle");
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  const validate = useCallback((text: string): boolean => {
    try {
      JSON.parse(text);
      setStatus("valid");
      return true;
    } catch {
      setStatus("invalid");
      return false;
    }
  }, []);

  const handleEditorChange = useCallback(
    (value: string) => {
      setJsonText(value);
      if (!value) setStatus("idle");
      else validate(value);
    },
    [validate],
  );

  const handleFileLoad = useCallback(
    (text: string) => {
      let formatted = text;
      try {
        formatted = JSON.stringify(JSON.parse(text), null, 2);
      } catch {
        // keep original text if invalid JSON — validate() will mark it invalid
      }
      setJsonText(formatted);
      validate(formatted);
    },
    [validate],
  );

  const handleExport = useCallback(() => {
    if (!jsonText) return;
    const blob = new Blob([jsonText], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "export.json";
    a.click();
    URL.revokeObjectURL(url);
  }, [jsonText]);

  const openImportModal = useCallback(() => setIsImportModalOpen(true), []);
  const closeImportModal = useCallback(() => setIsImportModalOpen(false), []);

  return {
    jsonText,
    status,
    isImportModalOpen,
    openImportModal,
    closeImportModal,
    handleEditorChange,
    handleFileLoad,
    handleExport,
  };
}
