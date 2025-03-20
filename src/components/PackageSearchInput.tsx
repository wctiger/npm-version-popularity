import React, { useMemo } from "react";
import { AutoComplete, Button, Space, Input, Spin } from "antd";
import { SearchOutlined, LoadingOutlined } from "@ant-design/icons";
import { usePackageSuggestions } from "../hooks/usePackageSuggestions";
import PackageSuggestionLabel from "./PackageSuggestionLabel";

// Package Search Input Component interface
interface PackageSearchInputProps {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  onSearch: (packageName: string) => void;
  isLoading: boolean;
  size?: "middle" | "large";
  style?: React.CSSProperties;
}

interface AutoCompleteOption {
  value: string;
  label: React.ReactNode;
}

const PackageSearchInput: React.FC<PackageSearchInputProps> = ({
  searchTerm,
  onSearchTermChange,
  onSearch,
  isLoading,
  size = "middle",
  style,
}) => {
  // Use our custom hook for package suggestions
  const {
    suggestions: packageSuggestions,
    isLoading: fetchingSuggestions,
    handleInputChange,
  } = usePackageSuggestions(searchTerm);

  // Transform raw package data into AutoComplete options
  const autoCompleteOptions = useMemo<AutoCompleteOption[]>(() => {
    return packageSuggestions.map((pkg) => ({
      value: pkg.name,
      label: <PackageSuggestionLabel package={pkg} />,
    }));
  }, [packageSuggestions]);

  const handleLocalInputChange = (value: string) => {
    onSearchTermChange(value);
    handleInputChange(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(searchTerm);
    }
  };

  const handleSelect = (value: string) => {
    onSearchTermChange(value);
    onSearch(value);
  };

  const notFoundContent = fetchingSuggestions ? (
    <div style={{ textAlign: "center", padding: "8px" }}>
      <Spin size="small" />
      <span style={{ marginLeft: "8px" }}>Searching packages...</span>
    </div>
  ) : null;

  return (
    <Space.Compact style={style}>
      <AutoComplete
        style={{ width: "100%" }}
        value={searchTerm}
        options={autoCompleteOptions}
        onSelect={handleSelect}
        onChange={handleLocalInputChange}
        notFoundContent={notFoundContent}
        backfill
      >
        <Input
          size={size}
          placeholder={
            size === "large"
              ? "Enter package name (e.g., react, lodash, axios)"
              : "Enter package name"
          }
          onKeyDown={handleKeyDown}
          allowClear
          disabled={isLoading}
        />
      </AutoComplete>
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
