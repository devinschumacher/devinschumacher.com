import type { MetadataRoute } from "next";

function sitemapUrl(baseUrl: string, pathname = "/"): string {
  const normalizedBaseUrl = baseUrl.replace(/\/+$/, "");
  const normalizedPathname = pathname.replace(/^\/+|\/+$/g, "");

  if (!normalizedPathname) {
    return `${normalizedBaseUrl}/`;
  }

  return `${normalizedBaseUrl}/${normalizedPathname}/`;
}

export function getStaticPageSitemapEntries(baseUrl: string): MetadataRoute.Sitemap {
  return [
    {
      url: sitemapUrl(baseUrl),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: sitemapUrl(baseUrl, "/blog/"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: sitemapUrl(baseUrl, "/about/"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: sitemapUrl(baseUrl, "/brands/"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: sitemapUrl(baseUrl, "/videos/"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: sitemapUrl(baseUrl, "/tools/character-counter/"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: sitemapUrl(baseUrl, "/contact/"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: sitemapUrl(baseUrl, "/legal/privacy/"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: sitemapUrl(baseUrl, "/legal/terms/"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: sitemapUrl(baseUrl, "/legal/dmca/"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];
}
