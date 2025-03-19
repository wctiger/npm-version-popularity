import React from "react";
import { Result, Button } from "antd";
import { WarningOutlined } from "@ant-design/icons";

interface ErrorDisplayProps {
  errorMessage: string;
  onReset: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  errorMessage,
  onReset,
}) => {
  return (
    <Result
      status="error"
      title="Error"
      subTitle={errorMessage}
      icon={<WarningOutlined />}
      extra={[
        <Button key="back" type="primary" onClick={onReset}>
          Try Again
        </Button>,
      ]}
    />
  );
};

export default ErrorDisplay;
