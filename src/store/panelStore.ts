import { create } from "zustand";
import type { PanelStore } from "@/types/panel";

const usePanelStore = create<PanelStore>((set) => ({
  isJsonPanelOpen: true,
  toggleJsonPanel: () =>
    set((state) => ({ isJsonPanelOpen: !state.isJsonPanelOpen })),
  openJsonPanel: () => set({ isJsonPanelOpen: true }),
  closeJsonPanel: () => set({ isJsonPanelOpen: false }),

  isPropertyPanelOpen: false,
  selectedNodeId: null,
  openPropertyPanel: (nodeId) =>
    set({
      isPropertyPanelOpen: true,
      selectedNodeId: nodeId,
    }),
  closePropertyPanel: () =>
    set({
      isPropertyPanelOpen: false,
      selectedNodeId: null,
    }),
  navigateToNode: (nodeId) =>
    set({
      selectedNodeId: nodeId,
      isPropertyPanelOpen: true,
    }),
}));

export default usePanelStore;
