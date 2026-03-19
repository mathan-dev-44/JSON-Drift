import { useEffect, type ReactNode } from "react";
import type { FlowNode } from "@/types/flow";
import {
  ReactFlow,
  Background,
  MiniMap,
  type NodeTypes,
  Panel,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import useFlowStore from "@/store/flowStore";
import JsonNode from "./nodes/JsonNode";
import usePanelStore from "@/store/panelStore";
import LoadingOverlay from "./ui/LoadingOverlay";
import FlowControls from "./FlowControls";

const nodeTypes: NodeTypes = {
  jsonNode: JsonNode,
};

interface FlowCanvasProps {
  children?: ReactNode;
}

const proOptions = { hideAttribution: true };

const FlowCanvas = ({ children }: FlowCanvasProps) => {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    isLoading,
    setZoomToNode,
  } = useFlowStore();
  const { openPropertyPanel } = usePanelStore();
  const reactFlowInstance = useReactFlow();
  const handleNodeClick = (_event: React.MouseEvent, node: FlowNode) => {
    openPropertyPanel(node.id);
  };
  useEffect(() => {
    const zoomFn = (nodeId: string) => {
      reactFlowInstance.fitView({
        nodes: [{ id: nodeId }],
        duration: 800,
        padding: 0.3,
      });
    };
    setZoomToNode(zoomFn);
    return () => setZoomToNode(null);
  }, [reactFlowInstance, setZoomToNode]);
  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        proOptions={proOptions}
        defaultEdgeOptions={{
          style: { stroke: 'rgb(var(--jf-edge))', strokeDasharray: '5 5', strokeWidth: 1.5 },
        }}
      >
        <Background color="rgb(var(--jf-flow-bg))" gap={16} />
        <FlowControls />
        <MiniMap position="bottom-right" nodeColor="rgb(var(--jf-accent))" />
        {isLoading && (
          <Panel
            position="top-left"
            style={{
              margin: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
            }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <div className="pointer-events-auto">
                <LoadingOverlay
                  message="Converting JSON to nodes..."
                  background="transparent"
                />
              </div>
            </div>
          </Panel>
        )}
        {children}
      </ReactFlow>
    </div>
  );
};

export default FlowCanvas;
