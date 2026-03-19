import useJsonInput from "@/hooks/useJsonInput.ts";
import JsonEditorHeader from "./JsonEditorHeader.tsx";
import MonacoEditor from "../ui/MonacoEditor.tsx";
import JsonEditorFooter from "./JsonEditorFooter.tsx";
import FileUploadModal from "../ui/FileUploadModal.tsx";
import useJsonFlow from "@/hooks/useJsonFlow.ts";
import { useEffect } from "react";
import { data } from "@/data/inputJson.ts";

export default function JsonInputPanel() {
  const {
    jsonText,
    status,
    isImportModalOpen,
    openImportModal,
    closeImportModal,
    handleEditorChange,
    handleFileLoad,
    handleExport,
  } = useJsonInput();

  useJsonFlow({ jsonText, status });

  useEffect(() => {
    if (!jsonText) handleEditorChange(JSON.stringify(data, null, 2));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative flex flex-col h-full">
      <JsonEditorHeader status={status} />
      <div className="flex-1 overflow-hidden">
        <MonacoEditor value={jsonText} onChange={handleEditorChange} />
      </div>
      <JsonEditorFooter
        onImport={openImportModal}
        onExport={handleExport}
        canExport={status === "valid"}
      />
      <FileUploadModal
        isOpen={isImportModalOpen}
        onClose={closeImportModal}
        onFileLoad={handleFileLoad}
        accept=".json"
        acceptLabel=".json files only"
        title="Import JSON"
      />
    </div>
  );
}
