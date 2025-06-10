import React, { useState, useEffect } from "react";
import { Input, Button, Space, Tooltip } from "antd";
import { FilterOutlined } from "@ant-design/icons";

// Version Filter Input Component interface
interface VersionFilterInputProps {
  onVersionFilter: (filter: string) => void;
  versionFilter?: string;
  isLoading: boolean;
  style?: React.CSSProperties;
}

const VersionFilterInput: React.FC<VersionFilterInputProps> = ({
  onVersionFilter,
  versionFilter = "",
  isLoading,
  style,
}) => {
  const [inputValue, setInputValue] = useState(versionFilter);

  // Sync input value with prop when it changes externally
  useEffect(() => {
    setInputValue(versionFilter);
  }, [versionFilter]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleFilterKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onVersionFilter(inputValue);
    }
  };

  const applyFilter = () => {
    onVersionFilter(inputValue);
  };

  const handleClear = () => {
    setInputValue("");
    onVersionFilter("");
  };

  return (
    <Space.Compact style={style}>
      <Tooltip title="Enter semver range (e.g., ^3.0.0, ~2.1, >=4.0.0)">
        <Input
          size="middle"
          placeholder="Version filter (e.g., ^3.0.0)"
          value={inputValue}
          onChange={handleFilterChange}
          onKeyDown={handleFilterKeyDown}
          allowClear
          onClear={handleClear}
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
  );
};

export default VersionFilterInput;
