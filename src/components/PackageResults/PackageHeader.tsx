import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download } from "lucide-react";
import { PackageHeaderProps } from "./types";

const PackageHeader: React.FC<PackageHeaderProps> = ({
  packageName,
  description,
  downloads,
  isFilterActive,
  filterCount,
  versionFilter,
  onVersionFilterChange,
}) => {
  const formattedDownloads = downloads.toLocaleString();

  return (
    <div className="flex items-center justify-between gap-6 flex-wrap">
      <div className="flex flex-col flex-1 min-w-[200px]">
        <h3 className="text-2xl font-bold mb-1">{packageName}</h3>
        {description && (
          <p
            className="text-muted-foreground text-sm truncate"
            title={description}
          >
            {description}
          </p>
        )}
      </div>

      <div className="flex flex-col items-end">
        <div className="text-right mb-2">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm text-muted-foreground">
              {isFilterActive
                ? "Filtered Downloads (Last Week)"
                : "Total Downloads (Last Week)"}
            </span>
            {isFilterActive && (
              <Badge variant="secondary" className="text-xs">
                {filterCount}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Download className="h-5 w-5 text-muted-foreground" />
            <span className="text-2xl font-bold">{formattedDownloads}</span>
          </div>
        </div>

        {isFilterActive && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">
              Filtered by: {versionFilter}
            </span>
            {onVersionFilterChange && (
              <Button
                variant="link"
                size="sm"
                onClick={() => onVersionFilterChange("")}
                className="h-auto p-0 text-xs"
              >
                Clear
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PackageHeader;
