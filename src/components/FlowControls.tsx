import { useReactFlow, Panel } from "@xyflow/react";
import usePanelStore from "@/store/panelStore";

export default function FlowControls() {
  const { zoomIn, zoomOut, fitView } = useReactFlow();
  const { isJsonPanelOpen } = usePanelStore();

  const horizontal = isJsonPanelOpen;

  return (
    <Panel
      position={horizontal ? "bottom-center" : "bottom-left"}
      style={{ margin: horizontal ? "0 0 16px 0" : "0 0 16px 16px" }}
    >
      <div
        className={`flex bg-jf-bg border border-jf-border-line rounded-xl overflow-hidden shadow-lg ${
          horizontal ? "flex-row" : "flex-col"
        }`}
      >
        <ControlBtn
          onClick={() => zoomIn({ duration: 300 })}
          title="Zoom in"
          horizontal={horizontal}
        >
          <ZoomInIcon />
        </ControlBtn>

        <ControlBtn
          onClick={() => zoomOut({ duration: 300 })}
          title="Zoom out"
          horizontal={horizontal}
        >
          <ZoomOutIcon />
        </ControlBtn>

        <ControlBtn
          onClick={() => fitView({ duration: 600, padding: 0.2 })}
          title="Fit view"
          horizontal={horizontal}
          last
        >
          <FitViewIcon />
        </ControlBtn>
      </div>
    </Panel>
  );
}

function ControlBtn({
  onClick,
  title,
  horizontal,
  last = false,
  children,
}: {
  onClick: () => void;
  title: string;
  horizontal: boolean;
  last?: boolean;
  children: React.ReactNode;
}) {
  const divider = last
    ? ""
    : horizontal
      ? "border-r border-jf-border-line"
      : "border-b border-jf-border-line";

  return (
    <button
      onClick={onClick}
      title={title}
      className={`w-8 h-8 flex items-center justify-center bg-jf-bg hover:bg-jf-bg-card text-jf-text-secondary hover:text-jf-accent transition-colors duration-150 cursor-pointer ${divider}`}
    >
      {children}
    </button>
  );
}

function ZoomInIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="7" strokeWidth={2} />
      <path strokeLinecap="round" strokeWidth={2} d="M11 8v6M8 11h6M20 20l-4-4" />
    </svg>
  );
}

function ZoomOutIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="7" strokeWidth={2} />
      <path strokeLinecap="round" strokeWidth={2} d="M8 11h6M20 20l-4-4" />
    </svg>
  );
}

function FitViewIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 9V5h4M16 5h4v4M20 15v4h-4M8 19H4v-4" />
    </svg>
  );
}
