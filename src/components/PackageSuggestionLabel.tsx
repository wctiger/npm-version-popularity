import React from "react";
import { NpmPackageSuggestion } from "../services/npmAutocompleteService";

interface PackageSuggestionLabelProps {
  package: NpmPackageSuggestion;
}

const PackageSuggestionLabel: React.FC<PackageSuggestionLabelProps> = ({
  package: pkg,
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <span className="font-medium text-sm">{pkg.name}</span>
        <span className="text-xs text-muted-foreground">v{pkg.version}</span>
      </div>
      {pkg.description && (
        <span className="text-xs text-muted-foreground truncate mt-1">
          {pkg.description}
        </span>
      )}
    </div>
  );
};

export default PackageSuggestionLabel;
