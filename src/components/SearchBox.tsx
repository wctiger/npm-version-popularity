import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import PackageSearchInput from "./PackageSearchInput";
import VersionFilterInput from "./VersionFilterInput";

interface SearchBoxProps {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  onSearch: (packageName: string) => void;
  isLoading: boolean;
  isCompact?: boolean;
  onVersionFilter?: (filter: string) => void;
  versionFilter?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  searchTerm,
  onSearchTermChange,
  onSearch,
  isLoading,
  isCompact = false,
  onVersionFilter,
  versionFilter,
}) => {
  if (isCompact) {
    return (
      <div className="flex items-center gap-4 mb-6 flex-wrap justify-between">
        {/* Search Input */}
        <div className="flex-[2_0_300px] max-w-md">
          <PackageSearchInput
            searchTerm={searchTerm}
            onSearchTermChange={onSearchTermChange}
            onSearch={onSearch}
            isLoading={isLoading}
          />
        </div>

        {/* Version Filter Input */}
        {onVersionFilter && (
          <div className="flex-[1_0_200px] max-w-sm ml-auto">
            <VersionFilterInput
              onVersionFilter={onVersionFilter}
              versionFilter={versionFilter}
              isLoading={isLoading}
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 p-8 w-full">
      <Card className="w-full max-w-4xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <CardHeader className="text-center pb-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            NPM Version Popularity
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Get information about package versions and their download counts
          </p>
        </CardHeader>
        <CardContent>
          <PackageSearchInput
            searchTerm={searchTerm}
            onSearchTermChange={onSearchTermChange}
            onSearch={onSearch}
            isLoading={isLoading}
            size="large"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchBox;
