import React, { useState } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import AntdProvider from "./contexts/AntdProvider";
import AppLayout from "./components/AppLayout";
import SearchBox from "./components/SearchBox";
import PackageResults from "./components/PackageResults";
import ErrorDisplay from "./components/ErrorDisplay";
import { usePackageSearch } from "./hooks/usePackageSearch";
import "./App.css";

const AppContent: React.FC = () => {
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

  // State for version filter
  const [versionFilter, setVersionFilter] = useState("");

  // Handle logo click to reset the app to home state
  const handleLogoClick = () => {
    resetSearch();
    setSearchTerm("");
    setVersionFilter("");
  };

  const renderContent = () => {
    if (error) {
      return (
        <ErrorDisplay errorMessage={error} onReset={() => setSearchTerm("")} />
      );
    }

    if (packageInfo) {
      return (
        <PackageResults
          packageInfo={packageInfo}
          versionFilter={versionFilter}
          onVersionFilterChange={setVersionFilter}
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
        onSearchTermChange={setSearchTerm}
        onSearch={searchPackage}
        isLoading={loading}
        isCompact={showCompactSearch}
        onVersionFilter={packageInfo ? setVersionFilter : undefined}
      />
      {renderContent()}
    </AppLayout>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AntdProvider>
        <AppContent />
      </AntdProvider>
    </ThemeProvider>
  );
};

export default App;
