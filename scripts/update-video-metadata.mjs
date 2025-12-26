import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

import matter from "gray-matter";

async function loadEnvFile(filePath) {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    for (const line of raw.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const match = /^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/.exec(trimmed);
      if (!match) continue;
      const key = match[1];
      if (process.env[key] !== undefined) continue;
      let value = match[2] ?? "";
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      process.env[key] = value;
    }
  } catch {
    // ignore missing files
  }
}

await loadEnvFile(path.join(process.cwd(), ".env.local"));
await loadEnvFile(path.join(process.cwd(), ".env"));

const VIDEOS_DIR = path.join(process.cwd(), "content", "videos");
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

const YT_ID_RE =
  /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([A-Za-z0-9_-]{11})/;

function chunk(array, size) {
  const out = [];
  for (let i = 0; i < array.length; i += size) out.push(array.slice(i, i + size));
  return out;
}

function unescapeHtml(input) {
  return input
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function formatHms(seconds) {
  if (!Number.isFinite(seconds) || seconds <= 0) return null;
  const total = Math.floor(seconds);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function parseIsoDurationToSeconds(iso) {
  if (typeof iso !== "string") return null;
  const match = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(iso.trim());
  if (!match) return null;
  const hours = match[1] ? Number(match[1]) : 0;
  const minutes = match[2] ? Number(match[2]) : 0;
  const seconds = match[3] ? Number(match[3]) : 0;
  if (![hours, minutes, seconds].every((n) => Number.isFinite(n))) return null;
  return hours * 3600 + minutes * 60 + seconds;
}

function pickBestThumbnail(thumbnails) {
  if (!thumbnails || typeof thumbnails !== "object") return null;
  const candidates = ["maxres", "standard", "high", "medium", "default"];
  for (const key of candidates) {
    const url = thumbnails?.[key]?.url;
    if (typeof url === "string" && url.trim()) return url.trim();
  }
  const first = Object.values(thumbnails).find((value) => typeof value?.url === "string" && value.url.trim());
  return first?.url?.trim() ?? null;
}

function extractYouTubeId({ videoId, url }) {
  if (typeof videoId === "string" && videoId.trim().length === 11) return videoId.trim();
  if (typeof url === "string") {
    const match = YT_ID_RE.exec(url);
    if (match) return match[1];
  }
  return null;
}

async function fetchYouTubeMetadataFromApi(ids) {
  const all = new Map();
  if (!YOUTUBE_API_KEY) return all;

  for (const partIds of chunk(ids, 50)) {
    const endpoint = new URL("https://www.googleapis.com/youtube/v3/videos");
    endpoint.searchParams.set("part", "snippet,contentDetails,statistics");
    endpoint.searchParams.set("id", partIds.join(","));
    endpoint.searchParams.set("key", YOUTUBE_API_KEY);

    const res = await fetch(endpoint, { headers: { Accept: "application/json" } });
    if (!res.ok) {
      console.warn(`[update-video-metadata] YouTube API error ${res.status} for chunk: ${partIds.join(",")}`);
      continue;
    }

    const json = await res.json();
    for (const item of json.items ?? []) {
      if (!item?.id) continue;
      all.set(String(item.id).toLowerCase(), item);
    }
  }

  return all;
}

async function scrapeYouTubeMetadata(videoId) {
  const url = `https://www.youtube.com/watch?v=${videoId}`;
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    },
  });
  if (!res.ok) throw new Error(`YouTube fetch failed (${res.status})`);
  const html = await res.text();

  const titleMatch =
    /<meta\s+name="title"\s+content="([^"]+)"/.exec(html) || /<title>(.*?)<\/title>/s.exec(html);
  const titleRaw = titleMatch?.[1] ?? "";
  const title = unescapeHtml(titleRaw).replace(/\s*-\s*YouTube\s*$/, "").trim() || null;

  const descMatch = /<meta\s+name="description"\s+content="([^"]*)"/.exec(html);
  const description = (descMatch ? unescapeHtml(descMatch[1]) : "").replace(/\s+/g, " ").trim() || null;

  const publishMatch = /"publishDate"\s*:\s*"(\d{4}-\d{2}-\d{2})"/.exec(html);
  const publishDate = publishMatch?.[1] ?? null;

  const lengthMatch = /"lengthSeconds"\s*:\s*"(\d+)"/.exec(html);
  const lengthSeconds = lengthMatch?.[1] ? Number(lengthMatch[1]) : null;

  return {
    title,
    description,
    publishedAt: publishDate ? `${publishDate}T00:00:00.000Z` : null,
    durationSeconds: Number.isFinite(lengthSeconds) ? lengthSeconds : null,
  };
}

async function main() {
  const entries = await fs.readdir(VIDEOS_DIR);
  const files = entries
    .filter((name) => name.endsWith(".md") || name.endsWith(".mdx"))
    .map((name) => path.join(VIDEOS_DIR, name));

  const parsed = [];
  for (const filePath of files) {
    const raw = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(raw);
    parsed.push({ filePath, data: data ?? {}, content });
  }

  const youtubeFiles = parsed
    .map((item) => {
      const id = extractYouTubeId({ videoId: item.data.videoId, url: item.data.url });
      return id ? { ...item, youtubeId: id } : null;
    })
    .filter(Boolean);

  const ids = Array.from(new Set(youtubeFiles.map((item) => item.youtubeId)));

  console.log(`[update-video-metadata] Found ${files.length} video files (${ids.length} YouTube IDs).`);
  if (!YOUTUBE_API_KEY) {
    console.warn("[update-video-metadata] YOUTUBE_API_KEY not set; falling back to HTML scraping.");
  }

  const apiMap = await fetchYouTubeMetadataFromApi(ids);

  let updatedCount = 0;
  let skippedCount = 0;

  for (const item of youtubeFiles) {
    const idLower = item.youtubeId.toLowerCase();
    const apiItem = apiMap.get(idLower);

    let title = null;
    let description = null;
    let publishedAt = null;
    let durationSeconds = null;
    let thumbnailUrl = null;
    let viewCount = null;

    if (apiItem) {
      title = apiItem.snippet?.title ? String(apiItem.snippet.title) : null;
      description = apiItem.snippet?.description ? String(apiItem.snippet.description) : null;
      publishedAt = apiItem.snippet?.publishedAt ? String(apiItem.snippet.publishedAt) : null;
      durationSeconds = parseIsoDurationToSeconds(apiItem.contentDetails?.duration);
      thumbnailUrl = pickBestThumbnail(apiItem.snippet?.thumbnails);
      viewCount = apiItem.statistics?.viewCount ? Number(apiItem.statistics.viewCount) : null;
    } else {
      try {
        const scraped = await scrapeYouTubeMetadata(item.youtubeId);
        title = scraped.title;
        description = scraped.description;
        publishedAt = scraped.publishedAt;
        durationSeconds = scraped.durationSeconds;
      } catch (error) {
        console.warn(`[update-video-metadata] Failed to scrape ${item.youtubeId}:`, error);
      }
    }

    const nextData = { ...item.data };
    nextData.platform = "youtube";
    nextData.videoId = item.youtubeId;
    nextData.url = nextData.url || `https://www.youtube.com/watch?v=${item.youtubeId}`;

    if (title) nextData.title = title;
    if (description) nextData.description = description;
    if (publishedAt) nextData.date = publishedAt;

    // Prefer explicit thumbnail from API, else set a stable default.
    nextData.thumbnail =
      thumbnailUrl || nextData.thumbnail || `https://img.youtube.com/vi/${item.youtubeId}/maxresdefault.jpg`;

    const duration = formatHms(durationSeconds);
    if (duration) nextData.duration = duration;

    if (Number.isFinite(viewCount)) {
      nextData.views = new Intl.NumberFormat("en-US").format(viewCount);
    }

    nextData.lastFetchedAt = new Date().toISOString();

    const nextRaw = matter.stringify(item.content, nextData);
    const currentRaw = await fs.readFile(item.filePath, "utf8");
    if (nextRaw === currentRaw) {
      skippedCount += 1;
      continue;
    }

    await fs.writeFile(item.filePath, nextRaw, "utf8");
    updatedCount += 1;
  }

  console.log(`[update-video-metadata] Updated ${updatedCount} files, skipped ${skippedCount}.`);
}

await main();
