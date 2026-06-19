import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { pathToFileURL } from "node:url";

const modulePath = pathToFileURL(
  path.resolve(import.meta.dirname, "./static-pages.ts"),
).href;

test("getStaticPageSitemapEntries includes public static pages", async () => {
  const { getStaticPageSitemapEntries } = await import(modulePath);

  const entries = getStaticPageSitemapEntries("https://example.com");
  const urls = entries.map((entry) => entry.url);

  assert.ok(urls.includes("https://example.com/about/"));
  assert.ok(urls.includes("https://example.com/videos/"));
  assert.ok(!urls.includes("https://example.com/projects/"));

  assert.ok(
    entries.some(
      (entry) =>
        entry.url === "https://example.com/brands/" &&
        entry.changeFrequency === "monthly" &&
        entry.priority === 0.5,
    ),
  );
});
