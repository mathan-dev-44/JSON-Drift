import { createRootRoute, Outlet } from "@tanstack/react-router";
import useTheme from "@/hooks/useTheme";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  useTheme(); // applies the active theme to CSS variables on mount and changes
  return <Outlet />;
}
