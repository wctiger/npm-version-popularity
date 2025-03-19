import React from "react";
import { Typography, Card, Flex, Space } from "antd";
import PackageSearchInput from "./PackageSearchInput";
import VersionFilterInput from "./VersionFilterInput";

const { Title, Paragraph } = Typography;

interface SearchBoxProps {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  onSearch: (packageName: string) => void;
  isLoading: boolean;
  isCompact?: boolean;
  onVersionFilter?: (filter: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  searchTerm,
  onSearchTermChange,
  onSearch,
  isLoading,
  isCompact = false,
  onVersionFilter,
}) => {
  if (isCompact) {
    return (
      <Flex
        align="center"
        gap="middle"
        style={{ marginBottom: "24px" }}
        wrap="wrap"
        justify="space-between"
      >
        {/* Search Input */}
        <PackageSearchInput
          searchTerm={searchTerm}
          onSearchTermChange={onSearchTermChange}
          onSearch={onSearch}
          isLoading={isLoading}
          style={{ flex: "2 0 300px", maxWidth: "400px" }}
        />

        {/* Version Filter Input */}
        {onVersionFilter && (
          <VersionFilterInput
            onVersionFilter={onVersionFilter}
            isLoading={isLoading}
            style={{ flex: "1 0 200px", maxWidth: "300px", marginLeft: "auto" }}
          />
        )}
      </Flex>
    );
  }

  return (
    <Flex
      vertical
      align="center"
      gap="middle"
      style={{ padding: "2rem", width: "100%" }}
    >
      <Card
        variant="outlined"
        style={{
          width: "100%",
          maxWidth: 800,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
          padding: "1.5rem",
        }}
      >
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <div style={{ textAlign: "center" }}>
            <Title level={2}>NPM Version Popularity</Title>
            <Paragraph>
              Get information about package versions and their download counts
            </Paragraph>
          </div>

          <PackageSearchInput
            searchTerm={searchTerm}
            onSearchTermChange={onSearchTermChange}
            onSearch={onSearch}
            isLoading={isLoading}
            size="large"
            style={{ width: "100%" }}
          />
        </Space>
      </Card>
    </Flex>
  );
};

export default SearchBox;
