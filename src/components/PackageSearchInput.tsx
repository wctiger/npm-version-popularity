import React from "react";
import { Input, Button, Space } from "antd";
import { SearchOutlined, LoadingOutlined } from "@ant-design/icons";

// Package Search Input Component interface
interface PackageSearchInputProps {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  onSearch: (packageName: string) => void;
  isLoading: boolean;
  size?: "middle" | "large";
  style?: React.CSSProperties;
}

const PackageSearchInput: React.FC<PackageSearchInputProps> = ({
  searchTerm,
  onSearchTermChange,
  onSearch,
  isLoading,
  size = "middle",
  style,
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
    <Space.Compact style={style}>
      <Input
        size={size}
        placeholder={
          size === "large"
            ? "Enter package name (e.g., react, lodash, axios)"
            : "Enter package name"
        }
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        allowClear
        disabled={isLoading}
      />
      <Button
        size={size}
        type="primary"
        icon={isLoading ? <LoadingOutlined /> : <SearchOutlined />}
        onClick={() => onSearch(searchTerm)}
        loading={isLoading}
      >
        {isLoading ? "Searching..." : "Search"}
      </Button>
    </Space.Compact>
  );
};

export default PackageSearchInput;
