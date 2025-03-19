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
} from "antd";
import type { TableProps } from "antd";
import { CalendarOutlined, DownloadOutlined } from "@ant-design/icons";
import { PackageInfo, PackageVersion } from "../services/npmService";

const { Title, Text } = Typography;

interface PackageResultsProps {
  packageInfo: PackageInfo;
}

const PackageResults: React.FC<PackageResultsProps> = ({ packageInfo }) => {
  const columns: TableProps<PackageVersion>["columns"] = [
    {
      title: "Version",
      dataIndex: "version",
      key: "version",
      render: (version) => (
        <Tag color="blue" style={{ margin: 0 }}>
          {version}
        </Tag>
      ),
      width: "20%",
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
      width: "40%",
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
      width: "40%",
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
              dataSource={packageInfo.versions.map((version, index) => ({
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
