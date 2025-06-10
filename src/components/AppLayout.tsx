import React from "react";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

interface AppLayoutProps {
  children: React.ReactNode;
  onLogoClick: () => void;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, onLogoClick }) => {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <header className="flex items-center justify-between px-6 py-4 bg-primary text-primary-foreground">
        <button
          onClick={onLogoClick}
          className="text-xl font-bold text-primary-foreground hover:text-primary-foreground/80 cursor-pointer bg-transparent border-none"
        >
          NPM Version Popularity
        </button>
        <ThemeToggle />
      </header>

      <main className="flex-1 p-6 w-full">
        <div className="max-w-7xl w-full mx-auto px-6">{children}</div>
      </main>

      <footer className="text-center w-full py-6 border-t bg-muted/50">
        <div className="flex justify-center items-center gap-4">
          <span className="text-sm text-muted-foreground">
            NPM Version Popularity ©{new Date().getFullYear()}
          </span>
          <Button variant="link" size="sm" asChild className="text-sm">
            <a
              href="https://github.com/wctiger/npm-version-popularity"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Github className="h-4 w-4" />
              View on GitHub
            </a>
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
