import { siteConfig } from "../site.config.ts";

// serp.ly attribution: links listed in siteConfig.serply.attributedLinks carry
// ?via={tenantId} so Dub can attribute clicks to this site, matching the
// emd-monorepo sites. Every other link is returned unchanged.
const SERPLY_HOSTS = new Set(["serp.ly", "www.serp.ly"]);

function linkKey(url: URL): string {
  return url.pathname.replace(/\/+$/, "").toLowerCase();
}

const attributedPaths = new Set(
  siteConfig.serply.attributedLinks.map((link) => linkKey(new URL(link))),
);

export function addSerplyVia(href: string, via: string = siteConfig.serply.via): string {
  try {
    const url = new URL(href);
    if (
      (url.protocol !== "http:" && url.protocol !== "https:") ||
      !SERPLY_HOSTS.has(url.hostname) ||
      !attributedPaths.has(linkKey(url))
    ) {
      return href;
    }

    url.searchParams.set("via", via);
    return url.toString();
  } catch {
    return href;
  }
}
