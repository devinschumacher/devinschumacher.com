import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
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
        description: "",
        logo: "",
      },
      {
        slug: "zed",
        name: "Zed Brand",
        url: "https://zed.example/path",
        hostname: "zed.example",
        description: "",
        logo: "",
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

test("getNetworkBrands returns the committed brands alphabetically", async () => {
  const { getNetworkBrands } = await import(modulePath);

  const brands = getNetworkBrands();

  assert.deepEqual(
    brands.map((brand) => brand.hostname),
    [
      "boxingundefeated.com",
      "browserextensions.io",
      "keybumps.app",
      "serp.co",
      "serp.ai",
      "apps.serp.co",
      "best.serp.co",
      "dr.serp.co",
      "extensions.serp.co",
      "games.serp.co",
      "serplists.com",
      "tools.serp.co",
      "zenbujapanese.com",
    ],
  );

  for (const brand of brands) {
    assert.ok(brand.description, `${brand.slug} needs a description`);
    assert.ok(
      existsSync(path.resolve(import.meta.dirname, "../public", `.${brand.logo}`)),
      `${brand.slug} logo ${brand.logo} must exist in public/`,
    );
  }

  const normalizedUrls = brands.map((brand) => normalizeUrl(brand.url));
  assert.equal(new Set(normalizedUrls).size, brands.length);
});

function normalizeUrl(value) {
  const url = new URL(value);
  url.hash = "";
  url.search = "";
  url.pathname = url.pathname.replace(/\/+$/g, "");
  return url.toString().replace(/\/+$/g, "").toLowerCase();
}
