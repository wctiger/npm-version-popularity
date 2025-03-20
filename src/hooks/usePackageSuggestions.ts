import { useState, useEffect, useMemo } from "react";
import debounce from "lodash/debounce";
import {
  fetchPackageSuggestions,
  NpmPackageSuggestion,
} from "../services/npmAutocompleteService";

export interface AutoCompleteOption {
  value: string;
  label: React.ReactNode;
}

/**
 * Custom hook for managing npm package suggestions
 * @param searchTerm The current search term
 * @param renderSuggestion Function to render a suggestion label component
 * @returns Suggestion options, loading state, and handle input change function
 */
export function usePackageSuggestions(
  searchTerm: string,
  renderSuggestion: (pkg: NpmPackageSuggestion) => React.ReactNode
) {
  const [suggestions, setSuggestions] = useState<AutoCompleteOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Debounced function to fetch package suggestions
  const debouncedFetchSuggestions = useMemo(
    () =>
      debounce(async (value: string) => {
        if (!value.trim() || value.length < 2) {
          setSuggestions([]);
          return;
        }

        setIsLoading(true);
        try {
          const packages = await fetchPackageSuggestions(value);
          const options = packages.map((pkg: NpmPackageSuggestion) => ({
            value: pkg.name,
            label: renderSuggestion(pkg),
          }));
          setSuggestions(options);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        } finally {
          setIsLoading(false);
        }
      }, 300),
    [renderSuggestion]
  );

  // Clear suggestions when searchTerm is empty
  useEffect(() => {
    if (!searchTerm) {
      setSuggestions([]);
    }
  }, [searchTerm]);

  // Trigger the suggestion fetching when search term changes
  const handleInputChange = (value: string) => {
    debouncedFetchSuggestions(value);
    return value;
  };

  return {
    suggestions,
    isLoading,
    handleInputChange,
  };
}
