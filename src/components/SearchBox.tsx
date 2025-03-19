import React from "react";
import { Input, Button, Space, Typography, Card, Flex } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

interface SearchBoxProps {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  onSearch: (packageName: string) => void;
  isLoading: boolean;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  searchTerm,
  onSearchTermChange,
  onSearch,
  isLoading,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchTermChange(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(searchTerm);
    }
  };

  return (
    <Flex vertical align="center" gap="middle" style={{ padding: "2rem" }}>
      <Card
        bordered={false}
        style={{
          width: "100%",
          maxWidth: 600,
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
            />
            <Button
              size="large"
              type="primary"
              icon={<SearchOutlined />}
              onClick={() => onSearch(searchTerm)}
              loading={isLoading}
            >
              Search
            </Button>
          </Space.Compact>
        </Space>
      </Card>
    </Flex>
  );
};

export default SearchBox;
