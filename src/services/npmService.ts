import axios from "axios";

export interface PackageVersion {
  version: string;
  date: string;
  downloads: number;
}

export interface PackageInfo {
  name: string;
  versions: PackageVersion[];
  totalDownloads: number;
  description?: string;
}

const NPM_REGISTRY_URL = "https://registry.npmjs.org";
const NPM_VERSIONS_API_URL =
  "https://api.npmjs.org/versions/<package-name>/last-week";

/**
 * Fetches package information from the npm registry
 */
export const fetchPackageInfo = async (
  packageName: string
): Promise<PackageInfo> => {
  try {
    // Encode package name for URL safety
    const encodedPackageName = encodeURIComponent(packageName);

    // Fetch basic package info from npm registry
    const registryResponse = await axios.get(
      `${NPM_REGISTRY_URL}/${encodedPackageName}`
    );
    const versionData = registryResponse.data.versions || {};
    const description = registryResponse.data.description;

    // Get all versions and their publish dates
    const versions: PackageVersion[] = Object.keys(versionData).map(
      (version) => {
        const publishedDate = registryResponse.data.time?.[version] || "";
        return {
          version,
          date: publishedDate,
          downloads: 0, // We'll fill this in with actual download counts
        };
      }
    );

    // Get download counts for all versions
    const downloadsByVersionResponse = await axios.get(
      NPM_VERSIONS_API_URL.replace("<package-name>", encodedPackageName)
    );

    // map the downloads by version back to each version
    versions.forEach((version) => {
      version.downloads =
        downloadsByVersionResponse.data.downloads[version.version] || 0;
    });

    // calculate total downloads by aggregating numbers from all the versions
    const totalDownloads = versions.reduce(
      (acc, version) => acc + version.downloads,
      0
    );

    // Sort versions by date (newest first)
    versions.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return {
      name: packageName,
      versions,
      totalDownloads,
      description,
    };
  } catch (error) {
    console.error("Error fetching package info:", error);
    throw new Error(`Failed to fetch package info for ${packageName}`);
  }
};
