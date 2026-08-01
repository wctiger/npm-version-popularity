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
      <section className="my-8 flex flex-wrap items-center justify-between gap-4 border-b border-[var(--color-border-default)] pb-8">
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
            <button
              onClick={() => onFormalOnlyChange(!formalOnly)}
              disabled={isLoading}
              title="Show only stable releases without prerelease tags"
              className={`h-11 rounded-[var(--radius-control)] border px-4 font-code text-[0.7rem] uppercase tracking-[0.06em] transition-colors ${
                formalOnly
                  ? "border-[var(--color-bg-brand)] bg-[var(--color-bg-brand)] text-[var(--color-text-inverse)] hover:bg-[var(--color-bg-brand-hover)]"
                  : "border-[var(--color-border-default)] bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text-primary)]"
              } disabled:pointer-events-none disabled:opacity-40`}
            >
              Formal only
            </button>
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
    <section className="flex flex-1 flex-col justify-center py-16 md:py-24">
      <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1.55fr)_minmax(280px,0.65fr)]">
        <div>
          <div className="eyebrow mb-6">npm version intelligence</div>
          <h1 className="m-0 max-w-[850px] text-[clamp(3.4rem,8.5vw,7.8rem)] leading-[0.84] tracking-[-0.07em] text-[var(--color-text-primary)]">
            Find the version{" "}
            <em className="text-[var(--color-text-brand)]">everyone chose.</em>
          </h1>
        </div>
        <p className="m-0 max-w-[30rem] text-lg leading-relaxed text-[var(--color-text-secondary)]">
          Compare one week of npm downloads across every release. See the
          versions teams actually run before you install or upgrade.
        </p>
      </div>

      <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(420px,1.45fr)] lg:items-stretch">
        <div className="flex flex-col justify-between border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] p-6 shadow-[var(--shadow-low)] md:p-8">
          <div>
            <span className="font-code text-[0.7rem] uppercase tracking-[0.08em] text-[var(--color-text-tertiary)]">
              Start with a package
            </span>
            <h2 className="mt-3 mb-8 text-[clamp(1.7rem,3vw,2.4rem)] leading-tight tracking-[-0.035em]">
              Search the public npm registry
            </h2>
          </div>
          <PackageSearchInput
            searchTerm={searchTerm}
            onSearchTermChange={onSearchTermChange}
            onSearch={onSearch}
            isLoading={isLoading}
            size="large"
          />
        </div>

        <div className="signal-path">
          <div className="signal-step">
            <span>01 · Package</span>
            <strong>Choose any public npm package</strong>
          </div>
          <div className="signal-step">
            <span>02 · Releases</span>
            <strong>Compare every downloaded version</strong>
          </div>
          <div className="signal-step">
            <span>03 · Adoption</span>
            <strong>Spot the dominant production signal</strong>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchBox;
