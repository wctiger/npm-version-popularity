import { PackageInfo, PackageVersion } from "../../services/npmService";

export interface PackageResultsProps {
  packageInfo: PackageInfo;
  versionFilter?: string;
  onVersionFilterChange?: (filter: string) => void;
  formalOnly?: boolean;
  onFormalOnlyChange?: (formalOnly: boolean) => void;
}

export interface VersionWithPercentage extends PackageVersion {
  percentage: number;
}

export interface PackageHeaderProps {
  packageName: string;
  description?: string;
  downloads: number;
  isFilterActive: boolean;
  filterCount: number;
  versionFilter: string;
  onVersionFilterChange?: (filter: string) => void;
  formalOnly?: boolean;
  onFormalOnlyChange?: (formalOnly: boolean) => void;
}
