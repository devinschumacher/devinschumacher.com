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
  const devinSchumacher = brands.find((brand) => brand.slug === "devin-schumacher");

  assert.ok(brands.length >= 37);
  assert.deepEqual(devinSchumacher, {
    slug: "devin-schumacher",
    name: "Devin Schumacher",
    url: "https://devinschumacher.com",
    hostname: "devinschumacher.com",
  });
  assert.equal(new Set(brands.map((brand) => brand.url)).size, brands.length);
});
