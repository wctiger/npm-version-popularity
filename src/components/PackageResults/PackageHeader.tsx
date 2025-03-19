import React from "react";
import { Typography, Statistic, Space, Flex, Badge, Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { PackageHeaderProps } from "./types";
import { BADGE_STYLE } from "./constants";

const { Title, Text } = Typography;

const PackageHeader: React.FC<PackageHeaderProps> = ({
  packageName,
  description,
  downloads,
  isFilterActive,
  filterCount,
  versionFilter,
  onVersionFilterChange,
}) => {
  const formattedDownloads = downloads.toLocaleString();

  return (
    <Flex align="center" justify="space-between" gap="middle" wrap="wrap">
      <Flex vertical flex={1} style={{ minWidth: "200px" }}>
        <Title level={3} style={{ margin: 0 }}>
          {packageName}
        </Title>
        {description && (
          <Text type="secondary" ellipsis={{ tooltip: description }}>
            {description}
          </Text>
        )}
      </Flex>

      <Flex vertical align="end">
        <Statistic
          title={
            <Space>
              {isFilterActive
                ? "Filtered Downloads (Last Week)"
                : "Total Downloads (Last Week)"}
              {isFilterActive && (
                <Badge count={filterCount} style={BADGE_STYLE} />
              )}
            </Space>
          }
          value={formattedDownloads}
          prefix={<DownloadOutlined />}
        />
        {isFilterActive && (
          <Space size="small">
            <Text type="secondary">Filtered by: {versionFilter}</Text>
            {onVersionFilterChange && (
              <Button
                type="link"
                size="small"
                onClick={() => onVersionFilterChange("")}
                style={{ padding: "0 4px" }}
              >
                Clear
              </Button>
            )}
          </Space>
        )}
      </Flex>
    </Flex>
  );
};

export default PackageHeader;
