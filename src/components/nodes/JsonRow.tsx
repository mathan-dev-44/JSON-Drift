import { Handle, Position } from "@xyflow/react";
import type { JsonRow as JsonRowType } from "../../types/flow.ts";

interface JsonRowProps {
  row: JsonRowType;
}

const VALUE_STYLES: Record<string, string> = {
  string: "text-jf-val-string",
  number: "text-jf-val-number",
  boolean: "text-jf-val-boolean",
  null: "text-jf-val-null",
  object: "text-jf-text-muted",
  array: "text-jf-text-muted",
};

const formatValue = (row: JsonRowType): string => {
  if (row.valueType === "null") return "null";
  if (row.valueType === "string") return `"${String(row.value)}"`;
  if (row.valueType === "object") return "{·}";
  if (row.valueType === "array") return "[·]";
  return String(row.value);
};

export default function JsonRow({ row }: JsonRowProps) {
  const isComplex = row.childNodeId !== null;

  return (
    <div className="relative flex items-center justify-between gap-4 px-3 py-1.5 hover:bg-jf-bg-card transition-colors duration-150">
      {/* Key */}
      <span className="text-xs text-jf-accent shrink-0 truncate max-w-32">
        {row.key}
      </span>

      {/* Value */}
      <span
        className={`text-xs font-mono truncate max-w-48 text-right ${VALUE_STYLES[row.valueType]}`}
      >
        {formatValue(row)}
      </span>

      {/* Per-row source handle for complex values only */}
      {isComplex && (
        <Handle
          type="source"
          position={Position.Right}
          id={row.childNodeId!}
          className="bg-jf-border border-jf-border-line w-2 h-2"
        />
      )}
    </div>
  );
}
