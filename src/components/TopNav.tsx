import usePanelStore from "@/store/panelStore.ts";
import { HamburgerIcon, CloseIcon, AppLogoIcon } from "@/icons/appIcons.tsx";
import ThemeDropdown from "@/components/ui/ThemeDropdown";

const TopNav = () => {
  const { isJsonPanelOpen, toggleJsonPanel } = usePanelStore();

  return (
    <nav className="bg-jf-bg border-b border-jf-border-line px-4 py-3">
      <div className="grid grid-cols-3 items-center">
        <div className="flex items-center">
          <button
            onClick={toggleJsonPanel}
            className="p-2 hover:bg-jf-bg-card rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-jf-accent cursor-pointer"
            aria-label="Toggle panel"
            title={isJsonPanelOpen ? "Close Panel" : "Open Panel"}
          >
            {isJsonPanelOpen ? <CloseIcon /> : <HamburgerIcon />}
          </button>
        </div>

        <div className="flex items-center justify-center gap-1.5">
          <AppLogoIcon className="h-5 w-5 text-jf-accent" />
          <span className="text-base font-semibold text-jf-text">
            JSON Drift
          </span>
        </div>

        <div className="flex items-center justify-end">
          <ThemeDropdown />
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
