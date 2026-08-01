import { PackageInfo, PackageVersion } from "../../services/npmService";

export interface PackageResultsProps {
  packageInfo: PackageInfo;
  versionFilter?: string;
  formalOnly?: boolean;
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
}
