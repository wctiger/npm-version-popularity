import React from "react";
import { Github } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

interface AppLayoutProps {
  children: React.ReactNode;
  onLogoClick: () => void;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, onLogoClick }) => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-[var(--color-bg-canvas)]">
      <header className="sticky top-0 z-40 border-b border-[color-mix(in_srgb,var(--color-border-default),transparent_20%)] bg-[color-mix(in_srgb,var(--color-bg-canvas),transparent_10%)] backdrop-blur-xl">
        <div className="page-shell min-h-[68px] flex items-center justify-between gap-6">
          <button
            onClick={onLogoClick}
            className="group inline-flex items-center gap-3 border-0 bg-transparent p-0 font-semibold text-[var(--color-text-primary)]"
            aria-label="Return to package search"
          >
            <span className="relative h-[25px] w-[25px] rounded-full border-2 border-[var(--color-text-primary)] after:absolute after:-right-[5px] after:-top-1 after:h-[9px] after:w-[9px] after:rounded-full after:bg-[var(--color-bg-accent)] after:content-['']" />
            <span>
              version <span className="text-[var(--color-text-brand)]">signal</span>
            </span>
          </button>
          <div className="flex items-center gap-4">
            <span className="hidden font-code text-[0.7rem] uppercase tracking-[0.08em] text-[var(--color-text-tertiary)] sm:inline">
              npm adoption data
            </span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex flex-1 flex-col text-[var(--color-text-primary)]">
        <div className="page-shell flex flex-1 flex-col">{children}</div>
      </main>

      <footer className="w-full border-t border-[var(--color-border-default)] py-6">
        <div className="page-shell flex items-center justify-between gap-4 text-xs text-[var(--color-text-secondary)]">
          <span className="font-code">©{new Date().getFullYear()} · weekly npm downloads</span>
          <a
            href="https://github.com/wctiger/npm-version-popularity"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 transition-colors hover:text-[var(--color-text-primary)]"
          >
            <Github className="h-3.5 w-3.5" />
            GitHub
          </a>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
