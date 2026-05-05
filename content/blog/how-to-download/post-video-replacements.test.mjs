import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const postsDirectory = import.meta.dirname;

function readPost(fileName) {
  return fs.readFileSync(path.join(postsDirectory, fileName), "utf8");
}

test("download posts use matching public @devinschumacher1 videos", () => {
  const expectedReplacements = new Map([
    ["how-to-download-circle-so-videos-free.md", "OjdabspScTY"],
    ["how-to-download-loom-videos.md", "flv3b3bGQDQ"],
    ["how-to-download-skool-videos-and-entire-course.md", "ujWUiJxk614"],
    ["how-to-download-hls-m3u8-streaming-videos.md", "SVtC2W4GYBc"],
  ]);

  for (const [fileName, videoId] of expectedReplacements) {
    const post = readPost(fileName);

    assert.match(post, new RegExp(`youtube\\.com/(?:watch\\?v=|embed/)${videoId}`));
  }
});

test("download posts no longer embed terminated-account tutorial videos", () => {
  const terminatedVideoIds = [
    "_8XKKHj0eLs",
    "4MnyU0kPxlE",
    "hToCX2VST_A",
    "iuX_rUFVcWg",
    "tgDmBdReTqA",
  ];
  const posts = fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => [fileName, readPost(fileName)]);

  for (const [fileName, post] of posts) {
    for (const videoId of terminatedVideoIds) {
      assert.doesNotMatch(post, new RegExp(videoId), `${fileName} still references ${videoId}`);
    }
  }
});

test("download posts no longer embed the old unavailable tutorial playlist", () => {
  const posts = fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => [fileName, readPost(fileName)]);

  for (const [fileName, post] of posts) {
    assert.doesNotMatch(
      post,
      /PL5qY8HgSEm1dN9gY0Z6P4K1mCHdUvXFvH/,
      `${fileName} still references the unavailable tutorial playlist`,
    );
  }
});
