import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import semver from "semver";
import { VersionWithPercentage } from "./types";

interface VersionsTableProps {
  versions: VersionWithPercentage[];
  pageSize: number;
  onPageSizeChange: (newSize: number) => void;
}

type SortField = "version" | "date" | "downloads" | "percentage";
type SortDirection = "asc" | "desc";

const SortIcon = ({
  field,
  currentSortField,
  sortDirection,
}: {
  field: SortField;
  currentSortField: SortField;
  sortDirection: SortDirection;
}) => {
  if (currentSortField !== field) return null;
  return sortDirection === "asc" ? (
    <ChevronUp className="h-4 w-4 ml-1" />
  ) : (
    <ChevronDown className="h-4 w-4 ml-1" />
  );
};

const VersionsTable: React.FC<VersionsTableProps> = ({
  versions,
  pageSize,
  onPageSizeChange,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  // Sort versions
  const sortedVersions = [...versions].sort((a, b) => {
    let cmp: number;

    if (sortField === "version") {
      const aValid = semver.valid(a.version);
      const bValid = semver.valid(b.version);
      if (aValid && bValid) {
        cmp = semver.compare(aValid, bValid);
      } else if (aValid) {
        cmp = 1;
      } else if (bValid) {
        cmp = -1;
      } else {
        cmp = a.version.localeCompare(b.version);
      }
    } else if (sortField === "date") {
      cmp = new Date(a.date).getTime() - new Date(b.date).getTime();
    } else {
      const aValue = a[sortField] as number;
      const bValue = b[sortField] as number;
      cmp = aValue - bValue;
    }

    return sortDirection === "asc" ? cmp : -cmp;
  });

  // Paginate versions
  const totalPages = Math.ceil(sortedVersions.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedVersions = sortedVersions.slice(
    startIndex,
    startIndex + pageSize
  );

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  return (
    <div className="space-y-4 flex flex-col">
      <div className="flex-1">
        <Table>
          <TableHeader className="sticky top-0 bg-background z-10">
            <TableRow>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort("version")}
              >
                <div className="flex items-center">
                  Version
                  <SortIcon
                    field="version"
                    currentSortField={sortField}
                    sortDirection={sortDirection}
                  />
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort("date")}
              >
                <div className="flex items-center">
                  Release Date
                  <SortIcon
                    field="date"
                    currentSortField={sortField}
                    sortDirection={sortDirection}
                  />
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort("downloads")}
              >
                <div className="flex items-center">
                  Downloads
                  <SortIcon
                    field="downloads"
                    currentSortField={sortField}
                    sortDirection={sortDirection}
                  />
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort("percentage")}
              >
                <div className="flex items-center">
                  Percent
                  <SortIcon
                    field="percentage"
                    currentSortField={sortField}
                    sortDirection={sortDirection}
                  />
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedVersions.map((version, index) => (
              <TableRow key={`${version.version}-${index}`} className="border-[var(--color-border-subtle)]">
                <TableCell className="py-2.5">
                  <Badge variant="secondary" className="font-mono text-xs">
                    {version.version}
                  </Badge>
                </TableCell>
                <TableCell className="py-2.5 text-[var(--color-text-muted)] tabular-nums">
                  {new Date(version.date).toLocaleDateString()}
                </TableCell>
                <TableCell className="py-2.5 tabular-nums">
                  {version.downloads.toLocaleString()}
                </TableCell>
                <TableCell className="py-2.5">
                  <div className="flex items-center gap-3">
                    <span className="text-sm tabular-nums min-w-[3rem]">
                      {version.percentage}%
                    </span>
                    <Progress value={version.percentage} className="w-16" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex-none flex items-center justify-between pt-3 border-t border-[var(--color-border-subtle)]">
        <div className="flex items-center gap-2">
          <span className="text-xs text-[var(--color-text-muted)]">Rows</span>
          <select
            value={pageSize}
            onChange={(e) => {
              onPageSizeChange(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="h-8 px-2 text-xs border border-[var(--color-border)] rounded-md bg-[var(--color-bg)] text-[var(--color-text)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
          >
            <option value={8}>8</option>
            <option value={12}>12</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-[var(--color-text-muted)] tabular-nums">
            {startIndex + 1}–{Math.min(startIndex + pageSize, sortedVersions.length)} of {sortedVersions.length}
          </span>
          <div className="flex gap-1">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="h-8 w-8 flex items-center justify-center rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text-muted)] hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text)] disabled:opacity-40 disabled:pointer-events-none transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="h-8 w-8 flex items-center justify-center rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text-muted)] hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text)] disabled:opacity-40 disabled:pointer-events-none transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VersionsTable;
