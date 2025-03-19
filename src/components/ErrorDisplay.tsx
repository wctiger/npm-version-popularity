import React from "react";
import { Alert, Button, Space } from "antd";
import { ReloadOutlined } from "@ant-design/icons";

interface ErrorDisplayProps {
  errorMessage: string;
  onReset: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  errorMessage,
  onReset,
}) => {
  return (
    <Space direction="vertical" style={{ width: "100%", marginTop: "24px" }}>
      <Alert
        message="Error"
        description={errorMessage}
        type="error"
        showIcon
        action={
          <Button icon={<ReloadOutlined />} size="small" onClick={onReset}>
            Clear
          </Button>
        }
      />
    </Space>
  );
};

export default ErrorDisplay;
