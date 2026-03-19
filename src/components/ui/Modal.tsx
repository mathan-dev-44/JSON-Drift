import type { ReactNode } from "react";
import { CloseIcon } from "@/icons/appIcons";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="w-96 bg-jf-bg border border-jf-border-line rounded-xl shadow-2xl p-6 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-jf-text">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-jf-bg-card rounded-lg transition-colors text-jf-text-secondary"
          >
            <CloseIcon />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
