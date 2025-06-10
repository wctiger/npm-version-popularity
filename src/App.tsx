import React, { useEffect } from "react";
import AppLayout from "./components/AppLayout";
import SearchBox from "./components/SearchBox";
import PackageResults from "./components/PackageResults";
import ErrorDisplay from "./components/ErrorDisplay";
import { usePackageSearch } from "./hooks/usePackageSearch";
import { useSearchParams } from "./hooks/useSearchParams";

const AppContent: React.FC = () => {
  // URL params state management
  const { params, setParam, resetParams } = useSearchParams({
    q: "",
    filter: "",
  });

  const {
    searchTerm,
    setSearchTerm,
    searchPackage,
    loading,
    error,
    packageInfo,
    hasSearched,
    resetSearch,
  } = usePackageSearch();

  // Sync URL params with local state
  useEffect(() => {
    if (params.q && params.q !== searchTerm) {
      setSearchTerm(params.q);
      // Auto-search if there's a package name in URL
      if (params.q.trim()) {
        searchPackage(params.q);
      }
    }
  }, [params.q, searchTerm, setSearchTerm, searchPackage]);

  // Update URL when search term changes
  useEffect(() => {
    if (searchTerm !== params.q) {
      setParam("q", searchTerm);
    }
  }, [searchTerm, params.q, setParam]);

  // Handle search term changes
  const handleSearchTermChange = (value: string) => {
    setSearchTerm(value);
    setParam("q", value);
  };

  // Handle version filter changes
  const handleVersionFilterChange = (filter: string) => {
    setParam("filter", filter);
  };

  // Handle logo click to reset the app to home state
  const handleLogoClick = () => {
    resetSearch();
    setSearchTerm("");
    resetParams();
  };

  const renderContent = () => {
    if (error) {
      return (
        <ErrorDisplay
          errorMessage={error}
          onReset={() => {
            setSearchTerm("");
            setParam("q", "");
          }}
        />
      );
    }

    if (packageInfo) {
      return (
        <PackageResults
          packageInfo={packageInfo}
          versionFilter={params.filter}
          onVersionFilterChange={handleVersionFilterChange}
        />
      );
    }

    return null;
  };

  // Determine if we should show the compact search box
  const showCompactSearch = Boolean(
    packageInfo || (loading && hasSearched) || (error && hasSearched)
  );

  return (
    <AppLayout onLogoClick={handleLogoClick}>
      <SearchBox
        searchTerm={searchTerm}
        onSearchTermChange={handleSearchTermChange}
        onSearch={searchPackage}
        isLoading={loading}
        isCompact={showCompactSearch}
        onVersionFilter={packageInfo ? handleVersionFilterChange : undefined}
        versionFilter={params.filter}
      />
      {renderContent()}
    </AppLayout>
  );
};

const App: React.FC = () => {
  return <AppContent />;
};

export default App;
