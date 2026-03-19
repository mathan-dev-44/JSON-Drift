import usePanelStore from "../../store/panelStore.ts";
import useFlowStore from "../../store/flowStore.ts";
import PropertyHeader from "./PropertyHeader.tsx";
import PropertyContent from "./PropertyContent.tsx";
import { useCallback } from "react";

export default function PropertyPanel() {
  const { selectedNodeId, navigateToNode } = usePanelStore();
  const { nodes, zoomToNode } = useFlowStore();

  const selectedNode = nodes.find((node) => node.id === selectedNodeId);

  const handleZoomToNode = useCallback(
    (nodeId: string) => {
      zoomToNode?.(nodeId);
    },
    [zoomToNode],
  );

  const handleNavigate = useCallback(
    (nodeId: string) => {
      navigateToNode(nodeId);
    },
    [navigateToNode],
  );

  if (!selectedNode) {
    return null;
  }

  return (
    <div className="h-full flex flex-col">
      <PropertyHeader
        path={selectedNode.data.path}
        onNavigate={handleNavigate}
        currentNodeId={selectedNodeId!}
        onZoomToNode={handleZoomToNode}
      />
      <PropertyContent
        rows={selectedNode.data.rows}
        onNavigate={navigateToNode}
        onZoomToNode={handleZoomToNode}
      />
    </div>
  );
}
