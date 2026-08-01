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
        <span className="text-sm font-semibold text-[var(--color-text-primary)]">
          {pkg.name}
        </span>
        <span className="font-code text-xs text-[var(--color-text-brand)]">
          v{pkg.version}
        </span>
      </div>
      {pkg.description && (
        <span className="mt-1 truncate text-xs text-[var(--color-text-secondary)]">
          {pkg.description}
        </span>
      )}
    </div>
  );
};

export default PackageSuggestionLabel;
