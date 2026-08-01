import React from "react";
import { ShieldCheck } from "lucide-react";
import PackageSearchInput from "./PackageSearchInput";
import VersionFilterInput from "./VersionFilterInput";
import { IconButton } from "./ui/icon-button";

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
      <section className="mt-6 mb-0 flex flex-wrap items-center justify-between gap-4 border-b border-[var(--color-border-default)] pb-6">
        <div className="flex-[2_0_280px] max-w-lg">
          <PackageSearchInput
            searchTerm={searchTerm}
            onSearchTermChange={onSearchTermChange}
            onSearch={onSearch}
            isLoading={isLoading}
          />
        </div>
        <div className="ml-auto flex flex-[1_0_280px] flex-wrap items-center justify-end gap-2">
          {onFormalOnlyChange && (
            <IconButton
              onClick={() => onFormalOnlyChange(!formalOnly)}
              disabled={isLoading}
              variant={formalOnly ? "default" : "outline"}
              label="Stable releases only"
              aria-pressed={formalOnly}
              tooltipAlign="start"
            >
              <ShieldCheck className="h-4 w-4" />
            </IconButton>
          )}
          {onVersionFilter && (
            <div className="flex-[1_0_240px] max-w-md">
              <VersionFilterInput
                onVersionFilter={onVersionFilter}
                versionFilter={versionFilter}
                isLoading={isLoading}
              />
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-1 flex-col justify-start py-12 md:pt-20 md:pb-24">
      <div className="max-w-3xl">
        <div className="eyebrow mb-5">npm version popularity</div>
        <div className="flex flex-col items-start gap-7">
          <h1 className="m-0 max-w-[680px] text-[clamp(2.5rem,4.6vw,4.25rem)] leading-[1.02] tracking-[-0.05em] text-[var(--color-text-primary)]">
            Find the npm version people actually use.
          </h1>
          <p className="m-0 max-w-[620px] text-lg leading-relaxed text-[var(--color-text-secondary)]">
            Search a package to compare its weekly downloads by release.
          </p>
        </div>
      </div>

      <div className="relative mt-8 max-w-[780px] rounded-[var(--radius-surface)] border border-[var(--color-border-strong)] bg-[var(--color-bg-surface)] p-2 shadow-[var(--shadow-raised)] before:absolute before:-top-[7px] before:left-8 before:h-3.5 before:w-3.5 before:rounded-full before:bg-[var(--color-bg-accent)] before:content-[''] md:p-3">
        <div className="mb-2 px-2 pt-1 font-code text-[0.7rem] uppercase tracking-[0.08em] text-[var(--color-text-tertiary)]">
          Package name
        </div>
        <PackageSearchInput
          searchTerm={searchTerm}
          onSearchTermChange={onSearchTermChange}
          onSearch={onSearch}
          isLoading={isLoading}
          size="large"
        />
      </div>

      <div className="mt-5 max-w-[780px] font-code text-xs text-[var(--color-text-tertiary)]">
        Public npm packages · weekly download data
      </div>
    </section>
  );
};

export default SearchBox;
