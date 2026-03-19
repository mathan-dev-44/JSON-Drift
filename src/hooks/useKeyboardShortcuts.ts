import { useEffect } from "react";
import usePanelStore from "../store/panelStore.ts";

export default function useKeyboardShortcuts() {
  const { closePropertyPanel } = usePanelStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closePropertyPanel();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closePropertyPanel]);
}
