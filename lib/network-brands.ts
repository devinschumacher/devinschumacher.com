import networkBrandsData from "./data/network-brands.json" with { type: "json" };

export type NetworkBrandEntry = {
  slug: string;
  name: string;
  url: string;
  hostname: string;
  description: string;
  logo: string;
  order: number;
};

type RawNetworkBrand = {
  name?: string;
  url?: string;
  description?: string;
  logo?: string;
  order?: number;
};

type RawNetworkBrandsData = {
  brands?: Record<string, RawNetworkBrand>;
};

export function getNetworkBrands(): NetworkBrandEntry[] {
  return parseNetworkBrands(networkBrandsData);
}

export function parseNetworkBrands(data: RawNetworkBrandsData): NetworkBrandEntry[] {
  const brands = data.brands ?? {};
  const seenUrls = new Map<string, string>();

  return Object.entries(brands)
    .map(([slug, brand]) => toNetworkBrandEntry(slug, brand, seenUrls))
    .sort(compareNetworkBrands);
}

function toNetworkBrandEntry(
  slug: string,
  brand: RawNetworkBrand,
  seenUrls: Map<string, string>,
): NetworkBrandEntry {
  const cleanSlug = slug.trim();
  const name = brand.name?.trim();
  const url = brand.url?.trim();
  const description = brand.description?.trim() ?? "";
  const logo = brand.logo?.trim() ?? "";
  const order = brand.order ?? Number.MAX_SAFE_INTEGER;

  if (!cleanSlug) {
    throw new Error("Network brand slug must not be empty");
  }

  if (!name) {
    throw new Error(`Network brand "${cleanSlug}" must include a name`);
  }

  if (!url) {
    throw new Error(`Network brand "${cleanSlug}" must include a URL`);
  }

  const parsedUrl = parseBrandUrl(cleanSlug, url);
  const normalizedUrl = normalizeBrandUrl(parsedUrl);
  const existingSlug = seenUrls.get(normalizedUrl);

  if (existingSlug) {
    throw new Error(
      `Duplicate network brand URL "${url}" for "${cleanSlug}" duplicates "${existingSlug}"`,
    );
  }

  seenUrls.set(normalizedUrl, cleanSlug);

  return {
    slug: cleanSlug,
    name,
    url,
    hostname: parsedUrl.hostname,
    description,
    logo,
    order,
  };
}

function parseBrandUrl(slug: string, value: string): URL {
  try {
    const url = new URL(value);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      throw new Error("unsupported protocol");
    }
    return url;
  } catch {
    throw new Error(`Invalid network brand URL for "${slug}": ${value}`);
  }
}

function normalizeBrandUrl(url: URL): string {
  const normalized = new URL(url.toString());
  normalized.hash = "";
  normalized.search = "";
  normalized.pathname = normalized.pathname.replace(/\/+$/g, "");
  return normalized.toString().replace(/\/+$/g, "").toLowerCase();
}

function compareNetworkBrands(first: NetworkBrandEntry, second: NetworkBrandEntry): number {
  return (
    first.order - second.order ||
    first.name.localeCompare(second.name) ||
    first.hostname.localeCompare(second.hostname) ||
    first.slug.localeCompare(second.slug)
  );
}
