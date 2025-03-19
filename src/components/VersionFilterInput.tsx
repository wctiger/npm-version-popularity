import React, { useState } from "react";
import { Input, Button, Space, Tooltip } from "antd";
import { FilterOutlined } from "@ant-design/icons";

// Version Filter Input Component interface
interface VersionFilterInputProps {
  onVersionFilter: (filter: string) => void;
  isLoading: boolean;
  style?: React.CSSProperties;
}

const VersionFilterInput: React.FC<VersionFilterInputProps> = ({
  onVersionFilter,
  isLoading,
  style,
}) => {
  const [versionFilter, setVersionFilter] = useState("");

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVersionFilter(e.target.value);
  };

  const handleFilterKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onVersionFilter(versionFilter);
    }
  };

  const applyFilter = () => {
    onVersionFilter(versionFilter);
  };

  return (
    <Space.Compact style={style}>
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
  );
};

export default VersionFilterInput;
