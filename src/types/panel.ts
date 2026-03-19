export type PanelPosition = "left" | "right";

export interface PanelStyle {
  border?: boolean;
  borderRadius?: "none" | "sm" | "md" | "lg" | "xl" | "2xl";
  shadow?: boolean;
  backgroundColor?: string;
}

export interface PanelPadding {
  wrapper?: string;
  content?: string;
}

export interface PanelHeader {
  showHeader: boolean;
  title?: string;
  showCloseButton?: boolean;
}

export interface PanelTransition {
  duration?: number;
  ease?: string;
}

export interface PanelStore {
  isJsonPanelOpen: boolean;
  toggleJsonPanel: () => void;
  openJsonPanel: () => void;
  closeJsonPanel: () => void;

  isPropertyPanelOpen: boolean;
  selectedNodeId: string | null;
  openPropertyPanel: (nodeId: string) => void;
  closePropertyPanel: () => void;
  navigateToNode: (nodeId: string) => void;
}
