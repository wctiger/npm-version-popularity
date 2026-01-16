import React from "react";
import { Github } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

interface AppLayoutProps {
  children: React.ReactNode;
  onLogoClick: () => void;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, onLogoClick }) => {
  return (
    <div className="h-screen w-full flex flex-col bg-[var(--color-bg)] overflow-hidden">
      <header className="flex-none flex items-center justify-between px-6 py-3 border-b border-[var(--color-border)]">
        <button
          onClick={onLogoClick}
          className="text-lg font-semibold text-[var(--color-text)] hover:text-[var(--color-primary)] cursor-pointer bg-transparent border-none transition-colors"
        >
          npm versions
        </button>
        <ThemeToggle />
      </header>

      <main className="flex-1 w-full overflow-hidden flex flex-col">
        <div className="max-w-7xl w-full mx-auto px-6 text-[var(--color-text)] h-full flex flex-col py-6">
          {children}
        </div>
      </main>

      <footer className="text-center w-full py-4 border-t border-[var(--color-border)]">
        <div className="flex justify-center items-center gap-3">
          <span className="text-xs text-[var(--color-text-muted)]">
            ©{new Date().getFullYear()}
          </span>
          <span className="text-[var(--color-border)]">·</span>
          <a
            href="https://github.com/wctiger/npm-version-popularity"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
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
