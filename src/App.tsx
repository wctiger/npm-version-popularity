import React, { useState } from "react";
import { Layout, ConfigProvider, theme, Typography, Button } from "antd";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import SearchBox from "./components/SearchBox";
import PackageResults from "./components/PackageResults";
import ErrorDisplay from "./components/ErrorDisplay";
import ThemeToggle from "./components/ThemeToggle";
import { GithubOutlined } from "@ant-design/icons";
import { usePackageSearch } from "./hooks/usePackageSearch";
import "./App.css";

const { Header, Content, Footer } = Layout;
const { defaultAlgorithm, darkAlgorithm } = theme;
const { Link } = Typography;

// Define a vibrant primary color
const primaryColor = "#238636"; // GitHub green

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
    <ConfigProvider
      theme={{
        algorithm: isDarkTheme ? darkAlgorithm : defaultAlgorithm,
        token: {
          colorPrimary: primaryColor,
        },
        components: {
          Layout: {
            bodyBg: isDarkTheme ? "#000000" : "#f5f5f5",
            headerBg: isDarkTheme ? "#141414" : "#24292F",
            footerBg: isDarkTheme ? "#141414" : "#f0f2f5",
          },
          Button: {
            colorPrimaryHover: isDarkTheme ? "#2EA043" : "#2EA043",
          },
          Progress: {
            colorInfo: primaryColor,
          },
        },
      }}
    >
      <Layout style={{ width: "100%", minHeight: "100vh" }}>
        <Header className="app-header">
          <Link
            className="app-logo"
            onClick={handleLogoClick}
            style={{ color: "white", cursor: "pointer" }}
          >
            NPM Version Popularity
          </Link>
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
          <div className="footer-content">
            <span>NPM Version Popularity ©{new Date().getFullYear()}</span>
            <Button
              type="link"
              href="https://github.com/wctiger/npm-version-popularity"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "14px" }}
              icon={<GithubOutlined />}
              aria-label="View on GitHub"
            >
              View on GitHub
            </Button>
          </div>
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
