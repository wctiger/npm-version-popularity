import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";
import { usePackageSuggestions } from "../hooks/usePackageSuggestions";
import PackageSuggestionLabel from "./PackageSuggestionLabel";

interface PackageSearchInputProps {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  onSearch: (packageName: string) => void;
  isLoading: boolean;
  size?: "default" | "large";
}

const PackageSearchInput: React.FC<PackageSearchInputProps> = ({
  searchTerm,
  onSearchTermChange,
  onSearch,
  isLoading,
  size = "default",
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const {
    suggestions: packageSuggestions,
    isLoading: fetchingSuggestions,
    handleInputChange,
  } = usePackageSuggestions(searchTerm);

  const handleLocalInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onSearchTermChange(value);
    handleInputChange(value);
    setShowSuggestions(value.length > 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(searchTerm);
      setShowSuggestions(false);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (packageName: string) => {
    onSearchTermChange(packageName);
    onSearch(packageName);
    setShowSuggestions(false);
  };

  const handleSearchClick = () => {
    onSearch(searchTerm);
    setShowSuggestions(false);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const inputHeight = size === "large" ? "h-14" : "h-11";
  const buttonHeight = size === "large" ? "h-14 px-6" : "h-11 px-4";

  return (
    <div className="relative w-full">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            ref={inputRef}
            value={searchTerm}
            onChange={handleLocalInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => searchTerm.length > 0 && setShowSuggestions(true)}
            placeholder="Try react, vite, lodash…"
            disabled={isLoading}
            autoFocus={size === "large"}
            aria-label="Package name"
            className={`${inputHeight} ${size === "large" ? "text-base" : ""}`}
          />
          {showSuggestions &&
            (packageSuggestions.length > 0 || fetchingSuggestions) && (
              <div
                ref={suggestionsRef}
                className="custom-scrollbar absolute top-full right-0 left-0 z-50 mt-2 max-h-64 overflow-y-auto rounded-[var(--radius-control)] border border-[var(--color-border-default)] bg-[var(--color-bg-elevated)] shadow-[var(--shadow-raised)]"
              >
                {fetchingSuggestions && (
                  <div className="flex items-center justify-center p-4 text-sm text-[var(--color-text-secondary)]">
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Searching...
                  </div>
                )}
                {packageSuggestions.map((pkg) => (
                  <div
                    key={pkg.name}
                    className="cursor-pointer border-b border-[var(--color-border-default)] p-3 transition-colors last:border-b-0 hover:bg-[var(--color-bg-subtle)]"
                    onClick={() => handleSuggestionClick(pkg.name)}
                  >
                    <PackageSuggestionLabel package={pkg} />
                  </div>
                ))}
              </div>
            )}
        </div>

        <Button
          onClick={handleSearchClick}
          disabled={isLoading}
          className={buttonHeight}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Search className="h-4 w-4" />
          )}
          <span className={size === "large" ? "inline" : "sr-only"}>
            Search
          </span>
        </Button>
      </div>
    </div>
  );
};

export default PackageSearchInput;
