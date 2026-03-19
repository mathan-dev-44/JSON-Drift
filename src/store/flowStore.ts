import { create } from "zustand";
import type { FlowNode, FlowEdge } from "@/types/flow";
import type { NodeChange, EdgeChange } from "@xyflow/react";
import { applyNodeChanges, applyEdgeChanges } from "@xyflow/react";

interface FlowStore {
  nodes: FlowNode[];
  edges: FlowEdge[];
  isLoading: boolean;
  setNodes: (nodes: FlowNode[]) => void;
  setEdges: (edges: FlowEdge[]) => void;
  setLoading: (loading: boolean) => void;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  reset: () => void;
  zoomToNode: ((nodeId: string) => void) | null;
  setZoomToNode: (fn: ((nodeId: string) => void) | null) => void;
}

const useFlowStore = create<FlowStore>((set) => ({
  nodes: [],
  edges: [],
  isLoading: false,
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  setLoading: (loading) => set({ isLoading: loading }),
  onNodesChange: (changes) =>
    set((state) => ({
      nodes: applyNodeChanges(changes, state.nodes) as FlowNode[],
    })),
  onEdgesChange: (changes) =>
    set((state) => ({
      edges: applyEdgeChanges(changes, state.edges),
    })),
  reset: () => set({ nodes: [], edges: [], isLoading: false }),
  zoomToNode: null,
  setZoomToNode: (fn) => set({ zoomToNode: fn }),
}));

export default useFlowStore;
