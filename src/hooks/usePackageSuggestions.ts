import { useState, useEffect, useMemo } from "react";
import debounce from "lodash/debounce";
import {
  fetchPackageSuggestions,
  NpmPackageSuggestion,
} from "../services/npmAutocompleteService";

/**
 * Custom hook for managing npm package suggestions
 * @param searchTerm The current search term
 * @returns Raw package suggestion data, loading state, and input change handler
 */
export function usePackageSuggestions(searchTerm: string) {
  const [suggestions, setSuggestions] = useState<NpmPackageSuggestion[]>([]);
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
          setSuggestions(packages);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        } finally {
          setIsLoading(false);
        }
      }, 300),
    []
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
