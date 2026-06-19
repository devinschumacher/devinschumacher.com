import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { pathToFileURL } from "node:url";

const modulePath = pathToFileURL(
  path.resolve(import.meta.dirname, "./network-brands.ts"),
).href;

test("parseNetworkBrands returns sorted brand entries with hostnames", async () => {
  const { parseNetworkBrands } = await import(modulePath);

  assert.deepEqual(
    parseNetworkBrands({
      brands: {
        zed: { name: "Zed Brand", url: "https://zed.example/path" },
        alpha: { name: "Alpha Brand", url: "https://alpha.example/" },
      },
    }),
    [
      {
        slug: "alpha",
        name: "Alpha Brand",
        url: "https://alpha.example/",
        hostname: "alpha.example",
      },
      {
        slug: "zed",
        name: "Zed Brand",
        url: "https://zed.example/path",
        hostname: "zed.example",
      },
    ],
  );
});

test("parseNetworkBrands rejects duplicate normalized URLs", async () => {
  const { parseNetworkBrands } = await import(modulePath);

  assert.throws(
    () =>
      parseNetworkBrands({
        brands: {
          first: { name: "First", url: "https://example.com" },
          second: { name: "Second", url: "https://example.com/" },
        },
      }),
    /Duplicate network brand URL/,
  );
});

test("parseNetworkBrands rejects invalid brand URLs", async () => {
  const { parseNetworkBrands } = await import(modulePath);

  assert.throws(
    () =>
      parseNetworkBrands({
        brands: {
          bad: { name: "Bad Brand", url: "javascript:alert(1)" },
        },
      }),
    /Invalid network brand URL/,
  );
});

test("getNetworkBrands returns the committed SERP network brands data", async () => {
  const { getNetworkBrands } = await import(modulePath);

  const brands = getNetworkBrands();
  const slugs = new Set(brands.map((brand) => brand.slug));
  const expectedSlugs = new Set([
    "apps-serp-co",
    "awesome-shadcn-ui-com",
    "blocks-serp-co",
    "boxingundefeated-com",
    "browserextensions-io",
    "devinschumacher-com",
    "dlp-yt",
    "dr-serp-co",
    "extensions-serp-co",
    "games-serp-co",
    "howtodownloadvideos-com",
    "launchbuzz-io",
    "serp-ai",
    "serp-co",
    "serp-download",
    "serp-software",
    "serp-wiki",
    "serpdownloaders-com",
    "serplists-com",
    "subsmarine-com",
    "themecobra-com",
    "tools-serp-co",
  ]);
  const normalizedUrls = brands.map((brand) => normalizeUrl(brand.url));
  const devinSchumacher = brands.find((brand) => brand.slug === "devinschumacher-com");
  const launchBuzz = brands.find((brand) => brand.slug === "launchbuzz-io");
  const ytdlp = brands.find((brand) => brand.slug === "dlp-yt");

  assert.equal(brands.length, 22);
  assert.deepEqual(slugs, expectedSlugs);
  assert.deepEqual(devinSchumacher, {
    slug: "devinschumacher-com",
    name: "Devin Schumacher",
    url: "https://devinschumacher.com",
    hostname: "devinschumacher.com",
  });
  assert.deepEqual(launchBuzz, {
    slug: "launchbuzz-io",
    name: "LaunchBuzz.io",
    url: "https://launchbuzz.io",
    hostname: "launchbuzz.io",
  });
  assert.deepEqual(ytdlp, {
    slug: "dlp-yt",
    name: "yt-dlp online",
    url: "https://dlp.yt",
    hostname: "dlp.yt",
  });
  assert.equal(new Set(normalizedUrls).size, brands.length);
});

function normalizeUrl(value) {
  const url = new URL(value);
  url.hash = "";
  url.search = "";
  url.pathname = url.pathname.replace(/\/+$/g, "");
  return url.toString().replace(/\/+$/g, "").toLowerCase();
}
