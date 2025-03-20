import { useCallback, useEffect, useState } from "react";

interface SearchParamsOptions {
  /**
   * If true, update browser history instead of replacing the current entry
   * @default false
   */
  pushState?: boolean;
}

/**
 * A hook that synchronizes application state with URL search parameters.
 * It provides functions to read from and write to the URL search parameters.
 */
export function useSearchParams<
  T extends Record<string, string | number | boolean | null | undefined>
>(
  defaultValues: T,
  options: SearchParamsOptions = {}
): {
  params: T;
  setParam: <K extends keyof T>(key: K, value: T[K]) => void;
  setParams: (newParams: Partial<T>) => void;
  resetParams: () => void;
  hasParams: boolean;
} {
  const { pushState = false } = options;

  // Initialize state from URL or default values
  const [params, setParamsState] = useState<T>(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const initialParams = { ...defaultValues };

    // For each default value, check if there's a corresponding URL parameter
    Object.entries(defaultValues).forEach(([key, defaultValue]) => {
      const paramValue = urlSearchParams.get(key);

      if (paramValue !== null) {
        // Convert the string parameter to the appropriate type
        if (typeof defaultValue === "number") {
          (
            initialParams as Record<
              string,
              number | string | boolean | null | undefined
            >
          )[key] = Number(paramValue);
        } else if (typeof defaultValue === "boolean") {
          (
            initialParams as Record<
              string,
              number | string | boolean | null | undefined
            >
          )[key] = paramValue === "true";
        } else {
          (
            initialParams as Record<
              string,
              number | string | boolean | null | undefined
            >
          )[key] = paramValue;
        }
      }
    });

    return initialParams;
  });

  // Update URL when params change
  useEffect(() => {
    const urlSearchParams = new URLSearchParams();

    // Add all non-empty/non-default params to the URL
    Object.entries(params).forEach(([key, value]) => {
      if (
        value !== null &&
        value !== undefined &&
        value !== defaultValues[key as keyof T]
      ) {
        urlSearchParams.set(key, String(value));
      }
    });

    // Construct the new URL
    const newSearch = urlSearchParams.toString();
    const newUrl = newSearch
      ? `${window.location.pathname}?${newSearch}`
      : window.location.pathname;

    // Update browser history
    if (pushState) {
      window.history.pushState({ path: newUrl }, "", newUrl);
    } else {
      window.history.replaceState({ path: newUrl }, "", newUrl);
    }
  }, [params, defaultValues, pushState]);

  // Function to update a single parameter
  const setParam = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
    setParamsState((prevParams) => ({
      ...prevParams,
      [key]: value,
    }));
  }, []);

  // Function to update multiple parameters at once
  const setParams = useCallback((newParams: Partial<T>) => {
    setParamsState((prevParams) => ({
      ...prevParams,
      ...newParams,
    }));
  }, []);

  // Function to reset all parameters to default values
  const resetParams = useCallback(() => {
    setParamsState(defaultValues);
  }, [defaultValues]);

  // Check if any non-default params exist
  const hasParams = Object.entries(params).some(
    ([key, value]) => value !== defaultValues[key as keyof T]
  );

  return { params, setParam, setParams, resetParams, hasParams };
}
