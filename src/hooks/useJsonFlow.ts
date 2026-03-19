import { useEffect, useRef, useCallback } from "react";
import { v4 as uuid } from "uuid";
import type { ValidationStatus } from "../components/JsonInputPanel/JsonEditorHeader.tsx";
import type {
  FlowNode,
  FlowEdge,
  JsonRow,
  ValueType,
  PathSegment,
} from "../types/flow.ts";
import useFlowStore from "../store/flowStore.ts";

const DEBOUNCE_MS = 500;

// ─── Constants ─────────────────────────────────────────────────── ← NEW
const HORIZONTAL_SPACING = 400;
const ROW_HEIGHT = 33; // px per row
const NODE_PADDING = 16; // top + bottom padding
const VERTICAL_GAP = 40; // gap between sibling nodes

// ─── Helpers ─────────────────────────────────────────────────────

// ← REMOVED getPosition - now calculated dynamically

const getValueType = (value: unknown): ValueType => {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  if (typeof value === "object") return "object";
  if (typeof value === "boolean") return "boolean";
  if (typeof value === "number") return "number";
  return "string";
};

const getEntries = (value: unknown): [string, unknown][] => {
  if (Array.isArray(value)) {
    return (value as unknown[]).map((v, i) => [String(i), v]);
  }
  return Object.entries(value as Record<string, unknown>);
};

// ← NEW: Calculate node height based on row count
const calculateNodeHeight = (rowCount: number): number => {
  return rowCount * ROW_HEIGHT + NODE_PADDING;
};

// ─── Pure builders ───────────────────────────────────────────────

const buildRow = (key: string, val: unknown): JsonRow => {
  const valueType = getValueType(val);
  const isPrimitive = valueType !== "object" && valueType !== "array";
  return {
    key,
    value: val,
    valueType,
    childNodeId: isPrimitive ? null : uuid(),
  };
};

// ← UPDATED: now takes yPosition instead of siblingIndex
const buildNode = (
  id: string,
  rows: JsonRow[],
  depth: number,
  yPosition: number,
  path: PathSegment[],
  jsonPath: string,
): FlowNode => ({
  id,
  type: "jsonNode",
  position: {
    x: depth * HORIZONTAL_SPACING,
    y: yPosition,
  },
  data: { rows, depth, path, jsonPath },
});

const buildEdge = (parentId: string, nodeId: string): FlowEdge => ({
  id: `${parentId}->${nodeId}`,
  source: parentId,
  target: nodeId,
  sourceHandle: nodeId,
  type: "default",
  animated: false,
});

// ─── Recursion with dynamic positioning ────────────────────────── ← UPDATED

const buildGraph = (
  value: unknown,
  depth: number,
  startY: number,
  nodes: FlowNode[],
  edges: FlowEdge[],
  parentId: string | null,
  parentPath: PathSegment[] = [],
  jsonPath: string = "root",
  nodeId: string = uuid(),
): number => {
  const rows = getEntries(value).map(([key, val]) => buildRow(key, val));

  const currentPath =
    depth === 0 ? [{ id: nodeId, label: "root" }] : parentPath;

  nodes.push(buildNode(nodeId, rows, depth, startY, currentPath, jsonPath));

  if (parentId) {
    edges.push(buildEdge(parentId, nodeId));
  }

  const currentNodeHeight = calculateNodeHeight(rows.length);
  let childrenCumulativeHeight = 0;

  const complexRows = rows.filter((row) => row.childNodeId !== null);

  complexRows.forEach((row) => {
    const childPath = [
      ...currentPath,
      { id: row.childNodeId!, label: row.key },
    ];

    const isNumericKey = !isNaN(Number(row.key));
    let childJsonPath: string;
    if (isNumericKey) {
      childJsonPath = `${jsonPath}[${row.key}]`;
    } else {
      childJsonPath = `${jsonPath}.${row.key}`;
    }

    const childHeight = buildGraph(
      row.value,
      depth + 1,
      startY + childrenCumulativeHeight,
      nodes,
      edges,
      nodeId,
      childPath,
      childJsonPath,
      row.childNodeId!,
    );
    childrenCumulativeHeight += childHeight + VERTICAL_GAP;
  });

  return Math.max(currentNodeHeight, childrenCumulativeHeight - VERTICAL_GAP);
};

// ─── Converter ──────────────────────────────────────────────────

const convertJsonToFlow = (
  json: unknown,
): { nodes: FlowNode[]; edges: FlowEdge[] } => {
  const nodes: FlowNode[] = [];
  const edges: FlowEdge[] = [];
  buildGraph(json, 0, 0, nodes, edges, null); // ← startY = 0
  return { nodes, edges };
};

// ─── Hook ────────────────────────────────────────────────────────

interface UseJsonFlowProps {
  jsonText: string;
  status: ValidationStatus;
}

export default function useJsonFlow({ jsonText, status }: UseJsonFlowProps) {
  const { setNodes, setEdges, reset, setLoading } = useFlowStore();
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
      debounceTimer.current = null;
    }
  }, []);

  const convert = useCallback(
    (text: string) => {
      setLoading(true);
      setTimeout(() => {
        try {
          const parsed = JSON.parse(text);
          const { nodes, edges } = convertJsonToFlow(parsed);
          setNodes(nodes);
          setEdges(edges);
        } catch {
          reset();
        } finally {
          setLoading(false);
        }
      }, 100);
    },
    [setNodes, setEdges, reset, setLoading],
  );

  useEffect(() => {
    clearTimer();
    if (!jsonText || status !== "valid") {
      reset();
      return clearTimer;
    }
    debounceTimer.current = setTimeout(() => {
      convert(jsonText);
    }, DEBOUNCE_MS);
    return clearTimer;
  }, [jsonText, status, convert, reset, clearTimer]);

  useEffect(() => {
    return () => {
      clearTimer();
      reset();
    };
  }, [clearTimer, reset]);
}
