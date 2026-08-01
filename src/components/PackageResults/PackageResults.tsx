import React, { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import semver from "semver";
import { PackageResultsProps } from "./types";
import { DEFAULT_PAGE_SIZE } from "./constants";
import PackageHeader from "./PackageHeader";
import VersionsTable from "./VersionsTable";
import PopularityChart from "./PopularityChart";
import MajorVersionChart from "./MajorVersionChart";

const PackageResults: React.FC<PackageResultsProps> = ({
  packageInfo,
  versionFilter = "",
  formalOnly = false,
}) => {
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const filteredVersions = useMemo(() => {
    let versionsWithDownloads = packageInfo.versions.filter(
      (version) => version.downloads > 0
    );

    if (formalOnly) {
      versionsWithDownloads = versionsWithDownloads.filter(
        (version) =>
          semver.valid(version.version) &&
          semver.prerelease(version.version) === null
      );
    }

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
      const cleanFilter = versionFilter.trim();
      const filtered = versionsWithDownloads.filter((version) => {
        try {
          return semver.satisfies(version.version, cleanFilter);
        } catch {
          return true;
        }
      });
      const filteredTotalDownloads = filtered.reduce(
        (total, version) => total + version.downloads,
        0
      );

      return filtered.map((version) => ({
        ...version,
        percentage: parseFloat(
          (
            filteredTotalDownloads > 0
              ? (version.downloads / filteredTotalDownloads) * 100
              : 0
          ).toFixed(2)
        ),
      }));
    } catch (error) {
      console.error("Invalid semver filter:", error);
      return versionsWithDownloads.map((version) => ({
        ...version,
        percentage: parseFloat(
          (
            packageInfo.totalDownloads > 0
              ? (version.downloads / packageInfo.totalDownloads) * 100
              : 0
          ).toFixed(2)
        ),
      }));
    }
  }, [
    packageInfo.versions,
    packageInfo.totalDownloads,
    versionFilter,
    formalOnly,
  ]);

  const filteredTotalDownloads = useMemo(
    () =>
      filteredVersions.reduce(
        (total, version) => total + version.downloads,
        0
      ),
    [filteredVersions]
  );

  const isFilterActive = Boolean(
    (versionFilter || formalOnly) &&
      filteredVersions.length !== packageInfo.versions.length
  );

  return (
    <section className="w-full pb-16">
      <PackageHeader
        packageName={packageInfo.name}
        description={packageInfo.description}
        downloads={filteredTotalDownloads}
        isFilterActive={isFilterActive}
        filterCount={filteredVersions.length}
      />

      <div className="grid gap-5 xl:grid-cols-12">
        <Card className="overflow-hidden xl:col-span-8">
          <div className="flex items-end justify-between gap-4 border-b border-[var(--color-border-default)] px-6 py-5">
            <div>
              <span className="font-code text-[0.7rem] uppercase tracking-[0.08em] text-[var(--color-text-tertiary)]">
                Release index
              </span>
              <h2 className="mt-2 mb-0 text-2xl tracking-[-0.035em]">
                Versions with downloads
              </h2>
            </div>
            <span className="font-code text-xs text-[var(--color-text-brand)]">
              {filteredVersions.length} results
            </span>
          </div>
          <CardContent className="p-0">
            <VersionsTable
              versions={filteredVersions}
              pageSize={pageSize}
              onPageSizeChange={setPageSize}
            />
          </CardContent>
        </Card>

        <div className="grid gap-5 md:grid-cols-2 xl:col-span-4 xl:grid-cols-1">
          <Card>
            <CardContent className="p-6">
              <PopularityChart versions={filteredVersions} />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <MajorVersionChart versions={filteredVersions} />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PackageResults;
