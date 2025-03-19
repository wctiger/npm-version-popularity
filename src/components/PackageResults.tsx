import React from "react";
import { Table, Card, Typography, Statistic, Tag, Space, Button } from "antd";
import type { TableProps } from "antd";
import {
  CalendarOutlined,
  DownloadOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { PackageInfo, PackageVersion } from "../services/npmService";

const { Title, Paragraph } = Typography;

interface PackageResultsProps {
  packageInfo: PackageInfo;
  onBack: () => void;
}

const PackageResults: React.FC<PackageResultsProps> = ({
  packageInfo,
  onBack,
}) => {
  const columns: TableProps<PackageVersion>["columns"] = [
    {
      title: "Version",
      dataIndex: "version",
      key: "version",
      render: (version) => <Tag color="blue">{version}</Tag>,
      width: "20%",
    },
    {
      title: "Release Date",
      dataIndex: "date",
      key: "date",
      render: (date) => (
        <Space>
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
        <Space>
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
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={onBack}
        style={{ marginBottom: "1rem" }}
      >
        Back to Search
      </Button>

      <Card style={{ width: "100%" }}>
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <div>
            <Title level={2}>{packageInfo.name}</Title>
            {packageInfo.description && (
              <Paragraph>{packageInfo.description}</Paragraph>
            )}
          </div>

          <Statistic
            title="Total Downloads (Last Month)"
            value={formattedDownloads}
            prefix={<DownloadOutlined />}
          />

          <div style={{ width: "100%" }}>
            <Title level={4}>Version History</Title>
            <Table
              columns={columns}
              dataSource={packageInfo.versions.map((version, index) => ({
                ...version,
                key: index,
              }))}
              pagination={{ pageSize: 10 }}
              scroll={{ x: true }}
              style={{ width: "100%" }}
            />
          </div>
        </Space>
      </Card>
    </Space>
  );
};

export default PackageResults;
