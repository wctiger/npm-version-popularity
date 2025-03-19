import React from "react";
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
} from "antd";
import type { TableProps } from "antd";
import { CalendarOutlined, DownloadOutlined } from "@ant-design/icons";
import { PackageInfo, PackageVersion } from "../services/npmService";

const { Title, Text } = Typography;

interface PackageResultsProps {
  packageInfo: PackageInfo;
}

// Extended version type with percentage
interface VersionWithPercentage extends PackageVersion {
  percentage: number;
}

const PackageResults: React.FC<PackageResultsProps> = ({ packageInfo }) => {
  // Calculate percentages for each version
  const versionsWithPercentage: VersionWithPercentage[] = packageInfo.versions
    .filter((version) => version.downloads > 0)
    .map((version) => {
      const percentage =
        packageInfo.totalDownloads > 0
          ? (version.downloads / packageInfo.totalDownloads) * 100
          : 0;

      return {
        ...version,
        percentage: parseFloat(percentage.toFixed(2)),
      };
    });

  const columns: TableProps<VersionWithPercentage>["columns"] = [
    {
      title: "Version",
      dataIndex: "version",
      key: "version",
      render: (version) => (
        <Tag color="blue" style={{ margin: 0 }}>
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

  // Format the total download count to add thousand separators
  const formattedDownloads = packageInfo.totalDownloads.toLocaleString();

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

            <Statistic
              title="Total Downloads (Last Week)"
              value={formattedDownloads}
              prefix={<DownloadOutlined />}
              style={{ marginLeft: "auto" }}
            />
          </Flex>

          <Divider style={{ margin: "12px 0" }} />

          {/* Table Section */}
          <div style={{ width: "100%" }}>
            <Table
              columns={columns}
              dataSource={versionsWithPercentage.map((version, index) => ({
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
