import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { pathToFileURL } from "node:url";

const modulePath = pathToFileURL(
  path.resolve(import.meta.dirname, "./serply.ts"),
).href;

const configPath = pathToFileURL(
  path.resolve(import.meta.dirname, "../site.config.ts"),
).href;

test("addSerplyVia tags every link in siteConfig.serply.attributedLinks", async () => {
  const { addSerplyVia } = await import(modulePath);
  const { siteConfig } = await import(configPath);

  assert.ok(siteConfig.serply.attributedLinks.length > 0);
  for (const link of siteConfig.serply.attributedLinks) {
    assert.equal(addSerplyVia(link), `${link}?via=devinschumacher.com`);
  }
});

test("addSerplyVia handles variants of a listed link", async () => {
  const { addSerplyVia } = await import(modulePath);

  assert.equal(
    addSerplyVia("https://serp.ly/onlyfans-downloader"),
    "https://serp.ly/onlyfans-downloader?via=devinschumacher.com",
  );
  assert.equal(
    addSerplyVia("https://serp.ly/loom-video-downloader/"),
    "https://serp.ly/loom-video-downloader/?via=devinschumacher.com",
  );
  assert.equal(
    addSerplyVia("https://serp.ly/youtube-downloader?via=old&x=1"),
    "https://serp.ly/youtube-downloader?via=devinschumacher.com&x=1",
  );
});

test("addSerplyVia leaves non-product links alone", async () => {
  const { addSerplyVia } = await import(modulePath);

  for (const href of [
    "https://serp.ly/@devinschumacher/youtube",
    "https://serp.ly/ahrefs/",
    "https://serp.ly/best/ctr-manipulation",
    "https://serp.ly/some-unlisted-downloader",
    "https://example.com/onlyfans-downloader",
    "/blog/how-to-download-onlyfans-profiles-videos-images/",
    "#section",
  ]) {
    assert.equal(addSerplyVia(href), href);
  }
});
