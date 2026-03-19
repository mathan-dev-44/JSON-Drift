import { useRef, useCallback, useState } from "react";
import type { DragEvent, ChangeEvent } from "react";
import Modal from "./Modal";
import { UploadIcon } from "@/icons/appIcons";

interface FileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFileLoad: (text: string, fileName: string) => void;
  accept?: string;
  acceptLabel?: string;
  title?: string;
}

const FileUploadModal = ({
  isOpen,
  onClose,
  onFileLoad,
  accept = "*",
  acceptLabel = "All files",
  title = "Upload File",
}: FileUploadModalProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const readFile = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        onFileLoad(text, file.name);
        onClose();
      };
      reader.readAsText(file);
    },
    [onFileLoad, onClose],
  );

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file) readFile(file);
    },
    [readFile],
  );

  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) readFile(file);
    },
    [readFile],
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`
          h-40 flex flex-col items-center justify-center gap-3
          rounded-lg border-2 border-dashed cursor-pointer
          transition-colors duration-200
          ${
            isDragging
              ? "border-jf-accent bg-jf-bg-card"
              : "border-jf-border-line hover:border-jf-accent hover:bg-jf-bg-card"
          }
        `}
      >
        <UploadIcon />
        <div className="text-center">
          <p className="text-sm font-medium text-jf-text">Drop file here</p>
          <p className="text-xs text-jf-text-secondary mt-1">
            or click to browse
          </p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
      <p className="text-xs text-jf-text-secondary text-center">
        Supports {acceptLabel}
      </p>
    </Modal>
  );
};

export default FileUploadModal;
