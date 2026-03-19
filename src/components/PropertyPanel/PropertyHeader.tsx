import type { PathSegment } from "../../types/flow.ts";
import Breadcrumb from "../ui/Breadcrumb.tsx";

interface PropertyHeaderProps {
  path: PathSegment[];
  currentNodeId: string;
  onNavigate: (nodeId: string) => void;
  onZoomToNode: (nodeId: string) => void;
}

export default function PropertyHeader({
  path,
  currentNodeId,
  onNavigate,
  onZoomToNode,
}: PropertyHeaderProps) {
  const handleZoom = () => {
    onZoomToNode(currentNodeId);
  };

  return (
    <div className="shrink-0 px-4 py-3 border-b border-jf-border-line">
      <div className="flex items-center justify-between gap-2">
        {/* Breadcrumb */}
        <div className="flex-1 min-w-0">
          <Breadcrumb items={path} onItemClick={onNavigate} />
        </div>

        {/* Zoom to Node */}
        <button
          onClick={handleZoom}
          className="shrink-0 p-1.5 hover:bg-jf-bg-card rounded-lg transition-colors text-jf-text-secondary hover:text-jf-accent"
          title="Zoom to node"
        >
          <TargetIcon />
        </button>
      </div>
    </div>
  );
}

function TargetIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      {/* Circle — the node being targeted */}
      <circle cx="12" cy="12" r="4" strokeWidth={2} />
      {/* Four crosshair lines with gap around the circle */}
      <path
        strokeLinecap="round"
        strokeWidth={2}
        d="M12 2v6M12 16v6M2 12h6M16 12h6"
      />
    </svg>
  );
}
