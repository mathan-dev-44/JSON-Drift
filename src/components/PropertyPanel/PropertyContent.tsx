import type { JsonRow } from "../../types/flow.ts";
import PropertyRow from "./PropertyRow.tsx";

interface PropertyContentProps {
  rows: JsonRow[];
  onNavigate: (nodeId: string) => void;
  onZoomToNode: (nodeId: string) => void;
}

export default function PropertyContent({
  rows,
  onNavigate,
  onZoomToNode,
}: PropertyContentProps) {
  return (
    <div className="flex-1 overflow-y-auto p-3 space-y-2 jf-scrollbar">
      {rows.map((row, index) => (
        <PropertyRow
          key={`${row.key}-${index}`}
          row={row}
          onNavigate={onNavigate}
          onZoomToNode={onZoomToNode}
        />
      ))}
    </div>
  );
}
