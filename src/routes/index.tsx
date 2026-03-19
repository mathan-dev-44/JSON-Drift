import { createFileRoute } from "@tanstack/react-router";
import VisualizerLayout from "@/layouts/VisualizerLayout.tsx";
import VisualizerPage from "@/pages/VisualizerPage.tsx";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <VisualizerLayout>
      <VisualizerPage />
    </VisualizerLayout>
  );
}
