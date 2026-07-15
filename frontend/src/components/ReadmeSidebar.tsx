import { ReadmeContent } from "./ReadmeContent";
import { CloseIcon } from "./ui/CloseIcon";
import { IconButton } from "./ui/IconButton";

interface ReadmeSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CLOSE_LABEL = "Close project information";

export const ReadmeSidebar = ({ isOpen, onClose }: ReadmeSidebarProps) => (
  <aside
    className={`sticky top-0 h-screen shrink-0 overflow-hidden bg-white text-slate-900 shadow-2xl transition-[width] duration-300 ease-in-out ${
      isOpen ? "w-full sm:w-[500px]" : "w-0"
    }`}
    aria-hidden={!isOpen}
    {...(!isOpen ? { inert: "" } : {})}
  >
    <div className="flex h-full w-full flex-col sm:w-[500px]">
      <header className="flex shrink-0 items-center justify-between border-b border-slate-200 px-5 py-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">About this project</h2>
        <IconButton className="text-slate-500 hover:bg-slate-100" onClick={onClose} aria-label={CLOSE_LABEL}>
          <CloseIcon className="h-5 w-5" />
        </IconButton>
      </header>
      <div className="flex-1 overflow-y-auto px-5 py-6">
        <ReadmeContent />
      </div>
    </div>
  </aside>
);
