import { DownloadIcon, UploadIcon } from "@/icons/appIcons";

interface JsonEditorFooterProps {
  onImport: () => void;
  onExport: () => void;
  canExport: boolean;
}

const JsonEditorFooter = ({
  onImport,
  onExport,
  canExport,
}: JsonEditorFooterProps) => {
  return (
    <div className="flex items-center gap-2 px-4 py-3 border-t border-jf-border-line shrink-0">
      <button
        onClick={onImport}
        className="flex items-center gap-2 flex-1 justify-center py-2 text-sm font-medium text-jf-text border border-jf-border-line rounded-lg hover:bg-jf-bg-card transition-colors duration-200"
      >
        <UploadIcon />
        Import
      </button>
      <button
        onClick={onExport}
        disabled={!canExport}
        className="flex items-center gap-2 flex-1 justify-center py-2 text-sm font-medium bg-jf-accent text-jf-accent-text rounded-lg hover:opacity-90 transition-opacity duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <DownloadIcon />
        Export
      </button>
    </div>
  );
};

export default JsonEditorFooter;
