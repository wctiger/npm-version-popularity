import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

// Version Filter Input Component interface
interface VersionFilterInputProps {
  onVersionFilter: (filter: string) => void;
  versionFilter?: string;
  isLoading: boolean;
}

const VersionFilterInput: React.FC<VersionFilterInputProps> = ({
  onVersionFilter,
  versionFilter = "",
  isLoading,
}) => {
  const [inputValue, setInputValue] = useState(versionFilter);

  // Sync input value with prop when it changes externally
  useEffect(() => {
    setInputValue(versionFilter);
  }, [versionFilter]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleFilterKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onVersionFilter(inputValue);
    }
  };

  const applyFilter = () => {
    onVersionFilter(inputValue);
  };

  const handleClear = () => {
    setInputValue("");
    onVersionFilter("");
  };

  return (
    <div className="flex gap-2 w-full">
      <div className="relative flex-1">
        <Input
          placeholder="Version filter (e.g., ^3.0.0)"
          value={inputValue}
          onChange={handleFilterChange}
          onKeyDown={handleFilterKeyDown}
          disabled={isLoading}
          title="Enter semver range (e.g., ^3.0.0, ~2.1, >=4.0.0)"
        />
        {inputValue && (
          <button
            onClick={handleClear}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            type="button"
          >
            ×
          </button>
        )}
      </div>
      <Button onClick={applyFilter} disabled={isLoading} variant="outline">
        <Filter className="h-4 w-4 mr-2" />
        Filter
      </Button>
    </div>
  );
};

export default VersionFilterInput;
