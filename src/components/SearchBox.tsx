import React from "react";
import { Input, Button, Space, Typography, Card, Flex } from "antd";
import { SearchOutlined, LoadingOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

interface SearchBoxProps {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  onSearch: (packageName: string) => void;
  isLoading: boolean;
  isCompact?: boolean;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  searchTerm,
  onSearchTermChange,
  onSearch,
  isLoading,
  isCompact = false,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchTermChange(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(searchTerm);
    }
  };

  if (isCompact) {
    return (
      <Flex align="center" style={{ marginBottom: "24px" }}>
        <Space.Compact style={{ width: "100%", maxWidth: "600px" }}>
          <Input
            size="middle"
            placeholder="Enter package name (e.g., react, lodash, axios)"
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
