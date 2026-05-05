import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const postsDirectory = import.meta.dirname;
const unavailableYoutubeIds = [
  "-j6y-5t37os",
  "9V93EB7rEC8",
  "GbnPrh0q6-Y",
  "KlTFADCkNe8",
  "Mrwk8G5gzx8",
  "NcZYnZHl4w8",
  "OHRy6jTf5II",
  "RPuWi7yEbtc",
  "T3OrbtTDAFA",
  "YF8AZsWmR7g",
  "Yoglg9pNRc8",
  "ak2JiS2Ntyw",
  "hiIhOt5SVdk",
  "vJX1GvAhDio",
];

function getMarkdownFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      return getMarkdownFiles(fullPath);
    }

    return entry.name.endsWith(".md") ? [fullPath] : [];
  });
}

test("blog posts do not reference unavailable YouTube videos", () => {
  for (const filePath of getMarkdownFiles(postsDirectory)) {
    const post = fs.readFileSync(filePath, "utf8");
    const relativePath = path.relative(process.cwd(), filePath);

    for (const videoId of unavailableYoutubeIds) {
      assert.doesNotMatch(post, new RegExp(videoId), `${relativePath} references ${videoId}`);
    }
  }
});

test("blog posts use the current YouTube channel for subscription links", () => {
  const oldChannelPatterns = [
    /youtube\.com\/channel\/UCnzb7gSRT1PgYJoK3TFnOTA/,
    /serp\.ly\/@devinschumacher\/youtube/,
  ];

  for (const filePath of getMarkdownFiles(postsDirectory)) {
    const post = fs.readFileSync(filePath, "utf8");
    const relativePath = path.relative(process.cwd(), filePath);

    for (const pattern of oldChannelPatterns) {
      assert.doesNotMatch(post, pattern, `${relativePath} references an old YouTube channel link`);
    }
  }
});
