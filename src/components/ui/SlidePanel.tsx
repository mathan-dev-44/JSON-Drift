import type { CSSProperties, ReactNode } from "react";
import { Panel } from "@xyflow/react";
import type {
  PanelPosition,
  PanelPadding,
  PanelStyle,
  PanelHeader,
  PanelTransition,
} from "../../types/panel.ts";
import { CloseIcon } from "@/icons/appIcons.tsx";

type ReactFlowPanelPosition =
  | "top-left"
  | "top-right"
  | "top-center"
  | "bottom-left"
  | "bottom-right"
  | "bottom-center";

export interface SlidePanelProps {
  isOpen: boolean;
  onClose?: () => void;
  position?: PanelPosition;
  width?: string;
  padding?: PanelPadding;
  style?: PanelStyle;
  header?: PanelHeader;
  transition?: PanelTransition;
  children: ReactNode;
  ariaLabel?: string;
}

const PANEL_POSITION: Record<PanelPosition, ReactFlowPanelPosition> = {
  left: "top-left",
  right: "top-right",
};

const PANEL_STYLE: CSSProperties = {
  margin: 0,
  height: "100%",
  pointerEvents: "none",
};

const RADIUS_MAP: Record<string, string> = {
  none: "",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
};

const WRAPPER_PADDING: Record<PanelPosition, string> = {
  left: "p-3 pr-0",
  right: "p-3 pl-0",
};

export default function SlidePanel({
  isOpen,
  position = "left",
  width = "300px",
  padding = {},
  style = {},
  header,
  onClose,
  children,
}: SlidePanelProps) {
  const wrapperPad = padding.wrapper ?? WRAPPER_PADDING[position];
  const contentPad = padding.content ?? "";
  const border = style.border ?? true;
  const radius = style.borderRadius ?? "none";
  const shadow = style.shadow ?? false;
  const bg = style.backgroundColor ?? "bg-jf-bg";

  return (
    <Panel position={PANEL_POSITION[position]} style={PANEL_STYLE}>
      <div
        style={{ width: isOpen ? width : 0 }}
        className="h-full overflow-hidden pointer-events-auto transition-all duration-300 ease-in-out"
      >
        <div className={`h-full w-full ${wrapperPad}`}>
          <div
            className={`
            h-full w-full ${bg}
            ${border ? "border border-jf-border-line" : ""}
            ${RADIUS_MAP[radius]}
            ${shadow ? "shadow-xl" : ""}
            overflow-hidden flex flex-col
          `}
          >
            {header && (
              <div className="flex items-center justify-between px-4 py-3 border-b border-jf-border-line">
                <span className="text-sm font-semibold text-jf-text">
                  {header.title}
                </span>
                {header.showCloseButton && (
                  <button
                    onClick={onClose}
                    className="p-1 hover:bg-jf-bg-card rounded-lg transition-colors text-jf-text-secondary"
                  >
                    <CloseIcon />
                  </button>
                )}
              </div>
            )}
            <div className={`flex-1 overflow-auto ${contentPad}`}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
}
