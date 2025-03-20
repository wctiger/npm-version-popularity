import axios from "axios";

export interface NpmPackageSuggestion {
  name: string;
  version: string;
  description: string;
  score: {
    final: number;
    detail: {
      quality: number;
      popularity: number;
      maintenance: number;
    };
  };
}

interface NpmsApiResponse {
  package: {
    name: string;
    version: string;
    description: string;
    links: {
      npm: string;
      homepage?: string;
      repository?: string;
    };
  };
  score: {
    final: number;
    detail: {
      quality: number;
      popularity: number;
      maintenance: number;
    };
  };
  searchScore: number;
}

/**
 * Fetches package suggestions from npms.io API
 * @param query Search query string
 * @param size Number of suggestions to return (default: 10)
 * @returns Array of package suggestions
 */
export const fetchPackageSuggestions = async (
  query: string,
  size: number = 10
): Promise<NpmPackageSuggestion[]> => {
  if (!query.trim()) {
    return [];
  }

  try {
    const response = await axios.get<NpmsApiResponse[]>(
      `https://api.npms.io/v2/search/suggestions`,
      {
        params: { q: query, size },
      }
    );

    // Transform the response to our desired format
    return response.data.map((item: NpmsApiResponse) => ({
      name: item.package.name,
      version: item.package.version,
      description: item.package.description,
      score: item.score,
    }));
  } catch (error) {
    console.error("Error fetching package suggestions:", error);
    return [];
  }
};
