import React from "react";
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
        <div className="flex-[2_0_300px] max-w-md">
          <PackageSearchInput
            searchTerm={searchTerm}
            onSearchTermChange={onSearchTermChange}
            onSearch={onSearch}
            isLoading={isLoading}
          />
        </div>
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
    <div className="flex flex-col items-center justify-center flex-1 w-full px-4">
      <div className="w-full max-w-xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-semibold text-[var(--color-text)]">
            npm Version Popularity
          </h1>
          <p className="text-lg text-[var(--color-text-muted)]">
            Explore package version downloads and popularity
          </p>
        </div>
        <PackageSearchInput
          searchTerm={searchTerm}
          onSearchTermChange={onSearchTermChange}
          onSearch={onSearch}
          isLoading={isLoading}
          size="large"
        />
      </div>
    </div>
  );
};

export default SearchBox;
