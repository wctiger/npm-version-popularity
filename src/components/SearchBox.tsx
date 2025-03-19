import React, { useState } from "react";
import { Input, Button, Space, Typography, Card, Flex, Tooltip } from "antd";
import {
  SearchOutlined,
  LoadingOutlined,
  FilterOutlined,
} from "@ant-design/icons";

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
  const [versionFilter, setVersionFilter] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchTermChange(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(searchTerm);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVersionFilter(e.target.value);
  };

  const handleFilterKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onVersionFilter) {
      onVersionFilter(versionFilter);
    }
  };

  const applyFilter = () => {
    if (onVersionFilter) {
      onVersionFilter(versionFilter);
    }
  };

  if (isCompact) {
    return (
      <Flex
        align="center"
        gap="middle"
        style={{ marginBottom: "24px" }}
        wrap="wrap"
      >
        {/* Search Input */}
        <Space.Compact style={{ flex: "2 0 300px", maxWidth: "400px" }}>
          <Input
            size="middle"
            placeholder="Enter package name"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            allowClear
            disabled={isLoading}
          />
          <Button
            size="middle"
            type="primary"
            icon={isLoading ? <LoadingOutlined /> : <SearchOutlined />}
            onClick={() => onSearch(searchTerm)}
            loading={isLoading}
          >
            {isLoading ? "Searching..." : "Search"}
          </Button>
        </Space.Compact>

        {/* Version Filter Input */}
        {onVersionFilter && (
          <Space.Compact style={{ flex: "1 0 200px", maxWidth: "300px" }}>
            <Tooltip title="Enter semver range (e.g., ^3.0.0, ~2.1, >=4.0.0)">
              <Input
                size="middle"
                placeholder="Version filter (e.g., ^3.0.0)"
                value={versionFilter}
                onChange={handleFilterChange}
                onKeyDown={handleFilterKeyDown}
                allowClear
                disabled={isLoading}
              />
            </Tooltip>
            <Button
              size="middle"
              type="default"
              icon={<FilterOutlined />}
              onClick={applyFilter}
              disabled={isLoading}
            >
              Filter
            </Button>
          </Space.Compact>
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
        bordered={false}
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

          <Space.Compact style={{ width: "100%" }}>
            <Input
              size="large"
              placeholder="Enter package name (e.g., react, lodash, axios)"
              value={searchTerm}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              allowClear
              disabled={isLoading}
            />
            <Button
              size="large"
              type="primary"
              icon={isLoading ? <LoadingOutlined /> : <SearchOutlined />}
              onClick={() => onSearch(searchTerm)}
              loading={isLoading}
            >
              {isLoading ? "Searching..." : "Search"}
            </Button>
          </Space.Compact>
        </Space>
      </Card>
    </Flex>
  );
};

export default SearchBox;
