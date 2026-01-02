import React, { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import semver from "semver";
import { PackageResultsProps } from "./types";
import { DEFAULT_PAGE_SIZE } from "./constants";
import PackageHeader from "./PackageHeader";
import VersionsTable from "./VersionsTable";
import PopularityChart from "./PopularityChart";

const PackageResults: React.FC<PackageResultsProps> = ({
  packageInfo,
  versionFilter = "",
  onVersionFilterChange,
}) => {
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  // Apply semver filter to versions
  const filteredVersions = useMemo(() => {
    const versionsWithDownloads = packageInfo.versions.filter(
      (version) => version.downloads > 0
    );

    if (!versionFilter) {
      return versionsWithDownloads.map((version) => {
        const percentage =
          packageInfo.totalDownloads > 0
            ? (version.downloads / packageInfo.totalDownloads) * 100
            : 0;

        return {
          ...version,
          percentage: parseFloat(percentage.toFixed(2)),
        };
      });
    }

    try {
      // Clean the filter if needed - semver can be strict
      const cleanFilter = versionFilter.trim();

      // Filter versions by semver
      const filtered = versionsWithDownloads.filter((v) => {
        try {
          return semver.satisfies(v.version, cleanFilter);
        } catch {
          // If there's an error in the comparison, include the version
          return true;
        }
      });

      // Calculate total downloads for filtered versions
      const filteredTotalDownloads = filtered.reduce(
        (total, v) => total + v.downloads,
        0
      );

      // Calculate percentages based on filtered total
      return filtered.map((version) => {
        const percentage =
          filteredTotalDownloads > 0
            ? (version.downloads / filteredTotalDownloads) * 100
            : 0;

        return {
          ...version,
          percentage: parseFloat(percentage.toFixed(2)),
        };
      });
    } catch (error) {
      // If there's an error with the filter, return all versions with original percentages
      console.error("Invalid semver filter:", error);
      return versionsWithDownloads.map((version) => {
        const percentage =
          packageInfo.totalDownloads > 0
            ? (version.downloads / packageInfo.totalDownloads) * 100
            : 0;

        return {
          ...version,
          percentage: parseFloat(percentage.toFixed(2)),
        };
      });
    }
  }, [packageInfo.versions, packageInfo.totalDownloads, versionFilter]);

  // Calculate total downloads of filtered versions
  const filteredTotalDownloads = useMemo(() => {
    return filteredVersions.reduce(
      (total, version) => total + version.downloads,
      0
    );
  }, [filteredVersions]);

  // Determine if filter is active
  const isFilterActive = Boolean(
    versionFilter && filteredVersions.length !== packageInfo.versions.length
  );

  return (
    <div className="space-y-6 w-full">
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="space-y-4">
            <PackageHeader
              packageName={packageInfo.name}
              description={packageInfo.description}
              downloads={filteredTotalDownloads}
              isFilterActive={isFilterActive}
              filterCount={filteredVersions.length}
              versionFilter={versionFilter}
              onVersionFilterChange={onVersionFilterChange}
            />

            <hr className="border-t" />

            <div className="flex flex-col lg:flex-row gap-6">
              <div className="w-full lg:w-2/3">
                <VersionsTable
                  versions={filteredVersions}
                  pageSize={pageSize}
                  onPageSizeChange={setPageSize}
                />
              </div>
              <div className="w-full lg:w-1/3">
                <PopularityChart versions={filteredVersions} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PackageResults;
