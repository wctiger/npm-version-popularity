import React from "react";
import { Typography } from "antd";
import { NpmPackageSuggestion } from "../services/npmAutocompleteService";

const { Text } = Typography;

interface PackageSuggestionLabelProps {
  package: NpmPackageSuggestion;
}

const PackageSuggestionLabel: React.FC<PackageSuggestionLabelProps> = ({
  package: pkg,
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Text strong>{pkg.name}</Text>
        <Text type="secondary">{pkg.version}</Text>
      </div>
      {pkg.description && (
        <Text
          type="secondary"
          style={{
            fontSize: "12px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "100%",
          }}
        >
          {pkg.description}
        </Text>
      )}
    </div>
  );
};

export default PackageSuggestionLabel;
