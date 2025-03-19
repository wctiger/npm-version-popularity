import React from "react";
import { Table } from "antd";
import { VersionWithPercentage } from "./types";
import { versionColumns } from "./tableConfig";

interface VersionsTableProps {
  versions: VersionWithPercentage[];
  pageSize: number;
  onPageSizeChange: (newSize: number) => void;
}

const VersionsTable: React.FC<VersionsTableProps> = ({
  versions,
  pageSize,
  onPageSizeChange,
}) => {
  return (
    <Table
      columns={versionColumns}
      dataSource={versions.map((version, index) => ({
        ...version,
        key: index,
      }))}
      pagination={{
        pageSize: pageSize,
        size: "small",
        onChange: (_, newPageSize) => {
          if (newPageSize !== pageSize) {
            onPageSizeChange(newPageSize);
          }
        },
      }}
      scroll={{ x: true }}
      style={{ width: "100%" }}
      size="small"
      bordered={false}
      className="compact-table"
    />
  );
};

export default VersionsTable;
