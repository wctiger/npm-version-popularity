import { TableProps, Tag, Space, Progress } from "antd";
import { CalendarOutlined, DownloadOutlined } from "@ant-design/icons";
import { VersionWithPercentage } from "./types";
import { TABLE_COLUMN_WIDTHS } from "./constants";

export const versionColumns: TableProps<VersionWithPercentage>["columns"] = [
  {
    title: "Version",
    dataIndex: "version",
    key: "version",
    render: (version) => (
      <Tag color="green" style={{ margin: 0 }}>
        {version}
      </Tag>
    ),
    width: TABLE_COLUMN_WIDTHS.version,
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
    width: TABLE_COLUMN_WIDTHS.releaseDate,
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
    width: TABLE_COLUMN_WIDTHS.downloads,
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
    width: TABLE_COLUMN_WIDTHS.percentage,
    sorter: (a, b) => a.percentage - b.percentage,
  },
];
