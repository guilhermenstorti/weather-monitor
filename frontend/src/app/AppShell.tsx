import { useEffect, useState, type ReactNode } from "react";
import { ReadmeSidebar } from "../components/ReadmeSidebar";
import { IconButton } from "../components/ui/IconButton";
import { InfoIcon } from "../components/ui/InfoIcon";

interface AppShellProps {
  children: ReactNode;
}

const OPEN_INFO_LABEL = "Open project information";

export const AppShell = ({ children }: AppShellProps) => {
  const [isReadmeOpen, setIsReadmeOpen] = useState(false);

  useEffect(() => {
    if (!isReadmeOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsReadmeOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isReadmeOpen]);

  return (
    <div className="flex w-full items-start">
      <div className="min-w-0 flex-1">
        {!isReadmeOpen && (
          <IconButton
            className="fixed right-4 top-4 z-20 bg-white/15 text-white hover:bg-white/25"
            onClick={() => setIsReadmeOpen(true)}
            aria-label={OPEN_INFO_LABEL}
          >
            <InfoIcon className="h-5 w-5" />
          </IconButton>
        )}
        {children}
      </div>
      <ReadmeSidebar isOpen={isReadmeOpen} onClose={() => setIsReadmeOpen(false)} />
    </div>
  );
};
