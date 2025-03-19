import { useState } from "react";
import { fetchPackageInfo, PackageInfo } from "../services/npmService";

interface PackageSearchState {
  loading: boolean;
  error: string | null;
  packageInfo: PackageInfo | null;
}

export const usePackageSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [state, setState] = useState<PackageSearchState>({
    loading: false,
    error: null,
    packageInfo: null,
  });

  const searchPackage = async (packageName: string) => {
    if (!packageName.trim()) {
      setState({
        loading: false,
        error: "Please enter a package name",
        packageInfo: null,
      });
      return;
    }

    setState({
      loading: true,
      error: null,
      packageInfo: null,
    });

    try {
      const packageInfo = await fetchPackageInfo(packageName);
      setState({
        loading: false,
        error: null,
        packageInfo,
      });
    } catch (error) {
      setState({
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch package info",
        packageInfo: null,
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
  };
};
