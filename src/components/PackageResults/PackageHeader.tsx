import React from "react";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { PackageHeaderProps } from "./types";

const PackageHeader: React.FC<PackageHeaderProps> = ({
  packageName,
  description,
  downloads,
  isFilterActive,
  filterCount,
  onVersionFilterChange,
  onFormalOnlyChange,
}) => {
  const clearFilters = () => {
    onVersionFilterChange?.("");
    onFormalOnlyChange?.(false);
  };

  return (
    <header className="grid gap-8 py-10 md:grid-cols-[minmax(0,1.45fr)_minmax(260px,0.55fr)] md:items-end md:py-14">
      <div>
        <div className="eyebrow mb-5">Package signal</div>
        <div>
          <a
            href={`https://www.npmjs.com/package/${packageName}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex max-w-full items-start gap-3 text-[var(--color-text-primary)] no-underline transition-colors hover:text-[var(--color-text-brand)]"
          >
            <h1 className="m-0 overflow-hidden text-ellipsis text-[clamp(3rem,7vw,6.5rem)] leading-[0.9] tracking-[-0.065em]">
              {packageName}
            </h1>
            <ExternalLink className="mt-2 h-5 w-5 shrink-0 md:mt-3" />
          </a>
        </div>
        {description && (
          <p className="mt-5 mb-0 max-w-2xl text-base leading-relaxed text-[var(--color-text-secondary)]">
            {description}
          </p>
        )}
      </div>

      <div className="border-l-[3px] border-[var(--color-bg-accent)] pl-5">
        <span className="font-code text-[0.7rem] uppercase tracking-[0.08em] text-[var(--color-text-tertiary)]">
          {isFilterActive ? "Filtered downloads" : "Downloads last week"}
        </span>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <strong className="text-3xl font-semibold tabular-nums tracking-[-0.035em]">
            {downloads.toLocaleString()}
          </strong>
          {isFilterActive && (
            <Badge variant="secondary">{filterCount} versions</Badge>
          )}
        </div>
        {isFilterActive && (onVersionFilterChange || onFormalOnlyChange) && (
          <button
            onClick={clearFilters}
            className="mt-4 border-0 bg-transparent p-0 font-code text-xs text-[var(--color-text-brand)] underline-offset-4 hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>
    </header>
  );
};

export default PackageHeader;
