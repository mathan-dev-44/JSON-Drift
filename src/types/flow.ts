import type { Node, Edge } from "@xyflow/react";

export type ValueType =
  | "string"
  | "number"
  | "boolean"
  | "null"
  | "object"
  | "array";

export interface JsonRow {
  key: string;
  value: unknown;
  valueType: ValueType;
  childNodeId: string | null;
}

export interface PathSegment {
  id: string;
  label: string;
}

export interface FlowNodeData extends Record<string, unknown> {
  rows: JsonRow[];
  depth: number;
  path: PathSegment[];
  jsonPath: string;
}

export type FlowNode = Node<FlowNodeData>;
export type FlowEdge = Edge;
