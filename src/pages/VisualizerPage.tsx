import FlowCanvas from "@/components/FlowCanvas.tsx";
import JsonInputPanel from "@/components/JsonInputPanel";
import PropertyPanel from "@/components/PropertyPanel";
import SlidePanel from "@/components/ui/SlidePanel";
import useKeyboardShortcuts from "@/hooks/useKeyboardShortcuts";
import usePanelStore from "@/store/panelStore.ts";
import { ReactFlowProvider } from "@xyflow/react";

export default function VisualizerPage() {
  const { isJsonPanelOpen, isPropertyPanelOpen, closePropertyPanel } =
    usePanelStore();

  useKeyboardShortcuts();

  return (
    <ReactFlowProvider>
      <FlowCanvas>
        <SlidePanel
          isOpen={isJsonPanelOpen}
          width="350px"
          style={{ border: true, borderRadius: "xl" }}
        >
          <JsonInputPanel />
        </SlidePanel>
        <SlidePanel
          isOpen={isPropertyPanelOpen}
          position="right"
          header={{
            showHeader: true,
            title: "Node Properties Panel",
            showCloseButton: true,
          }}
          padding={{ wrapper: "p-0" }}
          onClose={closePropertyPanel}
        >
          <PropertyPanel />
        </SlidePanel>
      </FlowCanvas>
    </ReactFlowProvider>
  );
}
