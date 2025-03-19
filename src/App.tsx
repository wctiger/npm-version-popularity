import React, { useState } from "react";
import { Layout, ConfigProvider, theme } from "antd";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import SearchBox from "./components/SearchBox";
import PackageResults from "./components/PackageResults";
import ErrorDisplay from "./components/ErrorDisplay";
import ThemeToggle from "./components/ThemeToggle";
import { usePackageSearch } from "./hooks/usePackageSearch";
import "./App.css";

const { Header, Content, Footer } = Layout;
const { defaultAlgorithm, darkAlgorithm } = theme;

const AppContent: React.FC = () => {
  const { isDarkTheme } = useTheme();
  const {
    searchTerm,
    setSearchTerm,
    searchPackage,
    loading,
    error,
    packageInfo,
    hasSearched,
  } = usePackageSearch();

  // State for version filter
  const [versionFilter, setVersionFilter] = useState("");

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
    <ConfigProvider
      theme={{
        algorithm: isDarkTheme ? darkAlgorithm : defaultAlgorithm,
        components: {
          Layout: {
            bodyBg: isDarkTheme ? "#000000" : "#f5f5f5",
            headerBg: isDarkTheme ? "#141414" : "#001529",
            footerBg: isDarkTheme ? "#141414" : "#f0f2f5",
          },
        },
      }}
    >
      <Layout style={{ width: "100%", minHeight: "100vh" }}>
        <Header className="app-header">
          <div className="app-logo">NPM Version Checker</div>
          <ThemeToggle />
        </Header>
        <Content className="app-content">
          <div className="app-container">
            <SearchBox
              searchTerm={searchTerm}
              onSearchTermChange={setSearchTerm}
              onSearch={searchPackage}
              isLoading={loading}
              isCompact={showCompactSearch}
              onVersionFilter={packageInfo ? setVersionFilter : undefined}
            />
            {renderContent()}
          </div>
        </Content>
        <Footer className="app-footer">
          NPM Version Popularity Checker ©{new Date().getFullYear()} Created
          with Ant Design
        </Footer>
      </Layout>
    </ConfigProvider>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
