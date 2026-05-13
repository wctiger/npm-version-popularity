import React from "react";
import PackageSearchInput from "./PackageSearchInput";
import VersionFilterInput from "./VersionFilterInput";

interface SearchBoxProps {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  onSearch: (packageName: string) => void;
  isLoading: boolean;
  isCompact?: boolean;
  onVersionFilter?: (filter: string) => void;
  versionFilter?: string;
  formalOnly?: boolean;
  onFormalOnlyChange?: (formalOnly: boolean) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  searchTerm,
  onSearchTermChange,
  onSearch,
  isLoading,
  isCompact = false,
  onVersionFilter,
  versionFilter,
  formalOnly = false,
  onFormalOnlyChange,
}) => {
  if (isCompact) {
    return (
      <div className="flex items-center gap-4 mb-6 flex-wrap justify-between">
        <div className="flex-[2_0_300px] max-w-md">
          <PackageSearchInput
            searchTerm={searchTerm}
            onSearchTermChange={onSearchTermChange}
            onSearch={onSearch}
            isLoading={isLoading}
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap ml-auto">
          {onFormalOnlyChange && (
            <button
              onClick={() => onFormalOnlyChange(!formalOnly)}
              disabled={isLoading}
              title="Show only formal (stable) releases without pre-release tags"
              className={`h-9 px-3 text-xs rounded-md border transition-colors flex items-center gap-1.5 ${
                formalOnly
                  ? "bg-[var(--color-primary)] text-[var(--color-primary-foreground)] border-[var(--color-primary)] hover:bg-[var(--color-primary)]/90"
                  : "bg-[var(--color-bg)] text-[var(--color-text-muted)] border-[var(--color-border)] hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text)]"
              } disabled:opacity-40 disabled:pointer-events-none`}
            >
              Formal only
            </button>
          )}
          {onVersionFilter && (
            <div className="flex-[1_0_200px] max-w-sm">
              <VersionFilterInput
                onVersionFilter={onVersionFilter}
                versionFilter={versionFilter}
                isLoading={isLoading}
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full px-4">
      <div className="w-full max-w-xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-semibold text-[var(--color-text)]">
            npm Version Popularity
          </h1>
          <p className="text-lg text-[var(--color-text-muted)]">
            Explore package version downloads and popularity
          </p>
        </div>
        <PackageSearchInput
          searchTerm={searchTerm}
          onSearchTermChange={onSearchTermChange}
          onSearch={onSearch}
          isLoading={isLoading}
          size="large"
        />
      </div>
    </div>
  );
};

export default SearchBox;
