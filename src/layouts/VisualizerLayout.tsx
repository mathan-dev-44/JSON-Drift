import type { ReactNode } from "react";
import TopNav from "@/components/TopNav.tsx";

interface VisualizerLayoutProps {
  children: ReactNode;
}

export default function VisualizerLayout({ children }: VisualizerLayoutProps) {
  return (
    <div className="h-screen w-screen flex flex-col bg-jf-bg-card">
      <TopNav />
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  );
}
