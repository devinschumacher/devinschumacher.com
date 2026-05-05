import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { pathToFileURL } from "node:url";

const modulePath = pathToFileURL(
  path.resolve(import.meta.dirname, "./youtube-videos.ts"),
).href;

const previousVideoIds = new Set([
  "NcZYnZHl4w8",
  "GTaOBy7mxF0",
  "2Wr5IqQogW8",
  "GPyYrxMUeRE",
  "JQtS5dHpMjU",
]);

test("devinYoutubeVideos mirrors the current @devinschumacher1 channel list", async () => {
  const { DEVIN_YOUTUBE_CHANNEL_URL, devinYoutubeVideos } = await import(modulePath);

  assert.equal(DEVIN_YOUTUBE_CHANNEL_URL, "https://youtube.com/@devinschumacher1");
  assert.equal(devinYoutubeVideos.length, 20);
  assert.deepEqual(
    devinYoutubeVideos.map((video) => getYoutubeId(video.url)),
    [
      "OjdabspScTY",
      "flv3b3bGQDQ",
      "KeHqIErqLJA",
      "DX2Lr4hySpg",
      "SVtC2W4GYBc",
      "jHtHkm9uGqU",
      "ry3iQx37hZQ",
      "RjO0NivCiY0",
      "eXs51yL6UgQ",
      "g7aEw_aHnoM",
      "AxJSxDGUMt0",
      "e3Dlc87QDmA",
      "1ktvV0BfBEI",
      "lwDK2jEYbA8",
      "12BpS16ETls",
      "EcEWGobXAQU",
      "ujWUiJxk614",
      "H4nU0cTm8TY",
      "SZY_13gQIa0",
      "NV_g1ijqxLA",
    ],
  );
});

test("devinYoutubeVideos has display-ready YouTube cards and excludes the old hard-coded set", async () => {
  const { devinYoutubeVideos } = await import(modulePath);

  for (const video of devinYoutubeVideos) {
    const id = getYoutubeId(video.url);

    assert.equal(video.platform, "youtube");
    assert.ok(video.title.trim());
    assert.equal(video.thumbnail, `https://img.youtube.com/vi/${id}/maxresdefault.jpg`);
    assert.equal(previousVideoIds.has(id), false);
  }
});

function getYoutubeId(url) {
  return new URL(url).searchParams.get("v");
}
