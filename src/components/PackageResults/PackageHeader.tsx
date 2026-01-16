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
}) => {
  const formattedDownloads = downloads.toLocaleString();

  return (
    <div className="flex items-center justify-between gap-6 flex-wrap">
      <div className="flex flex-col flex-1 min-w-[200px]">
        <div className="flex items-center gap-2">
          <a
            href={`https://www.npmjs.com/package/${packageName}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl font-semibold text-[var(--color-npm)] hover:text-[var(--color-npm-hover)] transition-colors flex items-center gap-1.5"
          >
            {packageName}
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
        {description && (
          <p
            className="text-[var(--color-text-muted)] text-sm truncate mt-0.5"
            title={description}
          >
            {description}
          </p>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <div className="text-xs text-[var(--color-text-muted)] mb-0.5">
            {isFilterActive ? "Filtered" : "Total"} Downloads (Last Week)
          </div>
          <div className="flex items-center justify-end gap-2">
            <span className="text-xl font-semibold tabular-nums">{formattedDownloads}</span>
            {isFilterActive && (
              <Badge variant="secondary" className="text-xs font-normal">
                {filterCount} versions
              </Badge>
            )}
          </div>
        </div>

        {isFilterActive && onVersionFilterChange && (
          <button
            onClick={() => onVersionFilterChange("")}
            className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
          >
            Clear filter
          </button>
        )}
      </div>
    </div>
  );
};

export default PackageHeader;
