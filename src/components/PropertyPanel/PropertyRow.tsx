import { useState } from "react";
import type React from "react";
import type { JsonRow } from "../../types/flow.ts";

interface PropertyRowProps {
  row: JsonRow;
  onNavigate: (nodeId: string) => void;
  onZoomToNode: (nodeId: string) => void;
}

const VALUE_COLORS: Record<string, string> = {
  string: "text-jf-val-string",
  number: "text-jf-val-number",
  boolean: "text-jf-val-boolean",
  null: "text-jf-text-secondary",
  object: "text-jf-text-secondary",
  array: "text-jf-text-secondary",
};

const TYPE_BADGE_STYLE: Record<string, React.CSSProperties> = {
  string:  { backgroundColor: "rgb(var(--jf-val-string) / 0.12)", color: "rgb(var(--jf-val-string))" },
  number:  { backgroundColor: "rgb(var(--jf-val-number) / 0.12)", color: "rgb(var(--jf-val-number))" },
  boolean: { backgroundColor: "rgb(var(--jf-val-boolean) / 0.12)", color: "rgb(var(--jf-val-boolean))" },
  null:    { backgroundColor: "rgb(var(--jf-accent) / 0.08)", color: "rgb(var(--jf-text-secondary))" },
  object:  { backgroundColor: "rgb(var(--jf-accent) / 0.08)", color: "rgb(var(--jf-text-secondary))" },
  array:   { backgroundColor: "rgb(var(--jf-accent) / 0.08)", color: "rgb(var(--jf-text-secondary))" },
};

const TYPE_ICONS: Record<string, string> = {
  string: "ABC",
  number: "123",
  boolean: "T/F",
  null: "∅",
  object: "{·}",
  array: "[·]",
};

const formatValue = (row: JsonRow): string => {
  if (row.valueType === "null") return "null";
  if (row.valueType === "string") return `"${String(row.value)}"`;
  if (row.valueType === "boolean") return String(row.value);
  return String(row.value);
};

export default function PropertyRow({
  row,
  onNavigate,
  onZoomToNode,
}: PropertyRowProps) {
  const [copied, setCopied] = useState(false);
  const isComplex = row.valueType === "object" || row.valueType === "array";
  const canNavigate = isComplex && row.childNodeId;

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    const textToCopy =
      row.valueType === "string" ? String(row.value) : formatValue(row);

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNavigate = () => {
    if (canNavigate) {
      onNavigate(row.childNodeId!);
    }
  };

  const handleZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (canNavigate) {
      onZoomToNode(row.childNodeId!);
    }
  };

  return (
    <div
      onClick={handleNavigate}
      className={`
        group relative bg-jf-bg-card border border-jf-border-line rounded-lg p-3
        transition-all duration-200
        ${canNavigate ? "cursor-pointer hover:border-jf-accent hover:shadow-md" : ""}
      `}
    >
      <div className="flex items-center gap-3">
        {/* Type Icon */}
        <div
          className="shrink-0 w-8 h-8 rounded-md flex items-center justify-center text-[10px] font-mono font-semibold"
          style={TYPE_BADGE_STYLE[row.valueType]}
        >
          {TYPE_ICONS[row.valueType]}
        </div>

        {/* Key & Value */}
        <div className="flex-1 min-w-0">
          <div className="text-xs font-medium text-jf-accent truncate">
            {row.key}
          </div>
          {!isComplex && (
            <div
              className={`text-xs font-mono truncate mt-1 ${VALUE_COLORS[row.valueType]}`}
            >
              {formatValue(row)}
            </div>
          )}
        </div>

        {/* Actions for Complex Types */}
        {canNavigate && (
          <div className="flex items-center gap-1 shrink-0">
            {/* Zoom Button */}
            <button
              onClick={handleZoom}
              className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-jf-bg rounded transition-all text-jf-text-secondary hover:text-jf-accent"
              title="Zoom to node"
            >
              <TargetIcon />
            </button>

            {/* Navigate Arrow */}
            <div className="text-jf-text-secondary group-hover:text-jf-accent transition-colors">
              <ArrowIcon />
            </div>
          </div>
        )}

        {/* Copy Button (Primitives Only) */}
        {!canNavigate && (
          <button
            onClick={handleCopy}
            className="shrink-0 opacity-0 group-hover:opacity-100 p-1.5 hover:bg-jf-bg rounded transition-all text-jf-text-secondary hover:text-jf-accent"
            aria-label="Copy value"
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
          </button>
        )}
      </div>
    </div>
  );
}

function TargetIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4" strokeWidth={2} />
      <path strokeLinecap="round" strokeWidth={2} d="M12 2v6M12 16v6M2 12h6M16 12h6" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg
      className="w-3.5 h-3.5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      className="w-3.5 h-3.5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}
