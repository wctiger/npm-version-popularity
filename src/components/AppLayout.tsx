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
    <div className="min-h-screen w-full flex flex-col bg-white dark:bg-gray-900">
      <header className="flex items-center justify-between px-6 py-4 bg-blue-600 text-white">
        <button
          onClick={onLogoClick}
          className="text-xl font-bold text-white hover:text-blue-100 cursor-pointer bg-transparent border-none"
        >
          NPM Version Popularity
        </button>
        <ThemeToggle />
      </header>

      <main className="flex-1 p-6 w-full">
        <div className="max-w-7xl w-full mx-auto px-6 text-gray-900 dark:text-gray-100">
          {children}
        </div>
      </main>

      <footer className="text-center w-full py-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <div className="flex justify-center items-center gap-4">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            NPM Version Popularity ©{new Date().getFullYear()}
          </span>
          <Button variant="link" size="sm" asChild className="text-sm">
            <a
              href="https://github.com/wctiger/npm-version-popularity"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-600 dark:text-blue-400"
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
