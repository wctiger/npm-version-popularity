import React, { useMemo } from "react";
import {
  Table,
  Card,
  Typography,
  Statistic,
  Tag,
  Space,
  Flex,
  Divider,
  Progress,
  Badge,
  Button,
} from "antd";
import type { TableProps } from "antd";
import { CalendarOutlined, DownloadOutlined } from "@ant-design/icons";
import { PackageInfo, PackageVersion } from "../services/npmService";
import semver from "semver";

const { Title, Text } = Typography;

interface PackageResultsProps {
  packageInfo: PackageInfo;
  versionFilter?: string;
  onVersionFilterChange?: (filter: string) => void;
}

// Extended version type with percentage
interface VersionWithPercentage extends PackageVersion {
  percentage: number;
}

const PackageResults: React.FC<PackageResultsProps> = ({
  packageInfo,
  versionFilter = "",
  onVersionFilterChange,
}) => {
  // Apply semver filter to versions
  const filteredVersions = useMemo(() => {
    const versionsWithDownloads = packageInfo.versions.filter(
      (version) => version.downloads > 0
    );

    if (!versionFilter) {
      return versionsWithDownloads.map((version) => {
        const percentage =
          packageInfo.totalDownloads > 0
            ? (version.downloads / packageInfo.totalDownloads) * 100
            : 0;

        return {
          ...version,
          percentage: parseFloat(percentage.toFixed(2)),
        };
      });
    }

    try {
      // Clean the filter if needed - semver can be strict
      const cleanFilter = versionFilter.trim();

      // Filter versions by semver
      const filtered = versionsWithDownloads.filter((v) => {
        try {
          return semver.satisfies(v.version, cleanFilter);
        } catch {
          // If there's an error in the comparison, include the version
          return true;
        }
      });

      // Calculate total downloads for filtered versions
      const filteredTotalDownloads = filtered.reduce(
        (total, v) => total + v.downloads,
        0
      );

      // Calculate percentages based on filtered total
      return filtered.map((version) => {
        const percentage =
          filteredTotalDownloads > 0
            ? (version.downloads / filteredTotalDownloads) * 100
            : 0;

        return {
          ...version,
          percentage: parseFloat(percentage.toFixed(2)),
        };
      });
    } catch (error) {
      // If there's an error with the filter, return all versions with original percentages
      console.error("Invalid semver filter:", error);
      return versionsWithDownloads.map((version) => {
        const percentage =
          packageInfo.totalDownloads > 0
            ? (version.downloads / packageInfo.totalDownloads) * 100
            : 0;

        return {
          ...version,
          percentage: parseFloat(percentage.toFixed(2)),
        };
      });
    }
  }, [packageInfo.versions, packageInfo.totalDownloads, versionFilter]);

  // Calculate total downloads of filtered versions
  const filteredTotalDownloads = useMemo(() => {
    return filteredVersions.reduce(
      (total, version) => total + version.downloads,
      0
    );
  }, [filteredVersions]);

  const columns: TableProps<VersionWithPercentage>["columns"] = [
    {
      title: "Version",
      dataIndex: "version",
      key: "version",
      render: (version) => (
        <Tag color="green" style={{ margin: 0 }}>
          {version}
        </Tag>
      ),
      width: "15%",
    },
    {
      title: "Release Date",
      dataIndex: "date",
      key: "date",
      render: (date) => (
        <Space size="small">
          <CalendarOutlined />
          {new Date(date).toLocaleDateString()}
        </Space>
      ),
      width: "30%",
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      defaultSortOrder: "descend",
    },
    {
      title: "Downloads",
      dataIndex: "downloads",
      key: "downloads",
      render: (downloads) => (
        <Space size="small">
          <DownloadOutlined />
          {downloads.toLocaleString()}
        </Space>
      ),
      width: "25%",
      sorter: (a, b) => a.downloads - b.downloads,
    },
    {
      title: "Percent",
      dataIndex: "percentage",
      key: "percentage",
      render: (percentage) => (
        <Space size="small" align="center">
          <span>{percentage}%</span>
          <Progress
            percent={percentage}
            showInfo={false}
            strokeColor="#1890ff"
            size="small"
            style={{ width: 60 }}
          />
        </Space>
      ),
      width: "30%",
      sorter: (a, b) => a.percentage - b.percentage,
      defaultSortOrder: null, // Remove default sort on this column
    },
  ];

  // Determine if filter is active
  const isFilterActive =
    versionFilter && filteredVersions.length !== packageInfo.versions.length;

  // Format the download count to add thousand separators
  const formattedDownloads = filteredTotalDownloads.toLocaleString();

  // Filter badge details
  const filterCount = filteredVersions.length;

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Card style={{ width: "100%" }}>
        <Flex vertical gap="small">
          {/* Package Header - First Row */}
          <Flex align="center" justify="space-between" gap="middle" wrap="wrap">
            <Flex vertical flex={1} style={{ minWidth: "200px" }}>
              <Title level={3} style={{ margin: 0 }}>
                {packageInfo.name}
              </Title>
              {packageInfo.description && (
                <Text
                  type="secondary"
                  ellipsis={{ tooltip: packageInfo.description }}
                >
                  {packageInfo.description}
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
                      <Badge
                        count={filterCount}
                        style={{
                          backgroundColor: "#1890ff",
                          fontSize: "12px",
                        }}
                      />
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

          <Divider style={{ margin: "12px 0" }} />

          {/* Table Section */}
          <div style={{ width: "100%" }}>
            <Table
              columns={columns}
              dataSource={filteredVersions.map((version, index) => ({
                ...version,
                key: index,
              }))}
              pagination={{ pageSize: 15, size: "small" }}
              scroll={{ x: true }}
              style={{ width: "100%" }}
              size="small"
              bordered={false}
              className="compact-table"
            />
          </div>
        </Flex>
      </Card>
    </Space>
  );
};

export default PackageResults;
