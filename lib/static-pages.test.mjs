import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { pathToFileURL } from "node:url";

const modulePath = pathToFileURL(
  path.resolve(import.meta.dirname, "./static-pages.ts"),
).href;

test("getStaticPageSitemapEntries includes the brands page", async () => {
  const { getStaticPageSitemapEntries } = await import(modulePath);

  const entries = getStaticPageSitemapEntries("https://example.com");

  assert.ok(
    entries.some(
      (entry) =>
        entry.url === "https://example.com/brands" &&
        entry.changeFrequency === "monthly" &&
        entry.priority === 0.5,
    ),
  );
});
