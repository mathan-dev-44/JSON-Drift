import { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import type { NodeProps } from "@xyflow/react";
import type { FlowNode } from "../../types/flow.ts";
import JsonRow from "./JsonRow.tsx";
import usePanelStore from "@/store/panelStore.ts";

const JsonNode = memo(({ id, data, isConnectable }: NodeProps<FlowNode>) => {
  const hasParent = data.depth > 0;
  const { selectedNodeId } = usePanelStore();
  const isSelected = id === selectedNodeId;
  return (
    <div
      className={`bg-jf-bg rounded-lg overflow-hidden min-w-48 max-w-80 transition-shadow duration-150 ${
        isSelected
          ? "border-2 border-jf-accent shadow-lg shadow-jf-accent/25"
          : "border border-jf-border-line shadow-sm"
      }`}
    >
      {/* Target handle - left center, only if has parent */}
      {hasParent && (
        <Handle
          type="target"
          position={Position.Left}
          isConnectable={isConnectable}
          className="bg-jf-border border-jf-border-line w-2 h-2"
        />
      )}

      {/* Rows - source handles are per row inside JsonRow */}
      <div className="divide-y divide-jf-border-line">
        {data.rows.length > 0 ? (
          data.rows.map((row) => <JsonRow key={row.key} row={row} />)
        ) : (
          <span className="relative flex justify-center items-center px-3 py-1.5 hover:bg-jf-bg-card transition-colors duration-150 text-jf-text-secondary text-xs font-mono">
            Empty Items / No Data
          </span>
        )}
      </div>
    </div>
  );
});

JsonNode.displayName = "JsonNode";

export default JsonNode;
