import { useState } from "react";
import { fetchPackageInfo, PackageInfo } from "../services/npmService";

interface PackageSearchState {
  loading: boolean;
  error: string | null;
  packageInfo: PackageInfo | null;
  hasSearched: boolean;
}

export const usePackageSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [state, setState] = useState<PackageSearchState>({
    loading: false,
    error: null,
    packageInfo: null,
    hasSearched: false,
  });

  const searchPackage = async (packageName: string) => {
    if (!packageName.trim()) {
      setState({
        loading: false,
        error: "Please enter a package name",
        packageInfo: null,
        hasSearched: true,
      });
      return;
    }

    setState({
      loading: true,
      error: null,
      packageInfo: null,
      hasSearched: true,
    });

    try {
      const packageInfo = await fetchPackageInfo(packageName);
      setState({
        loading: false,
        error: null,
        packageInfo,
        hasSearched: true,
      });
    } catch (error) {
      setState({
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch package info",
        packageInfo: null,
        hasSearched: true,
      });
    }
  };

  return {
    searchTerm,
    setSearchTerm,
    searchPackage,
    loading: state.loading,
    error: state.error,
    packageInfo: state.packageInfo,
    hasSearched: state.hasSearched,
  };
};
