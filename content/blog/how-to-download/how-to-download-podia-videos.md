# How to Download Podia Videos (Cloudflare Stream Videos)

Cloudflare Stream delivers video using signed, time-limited URLs containing JSON Web Tokens (JWTs).  
These URLs point to either:

- an HLS playlist (`.m3u8`), or  
- a DASH manifest (`.mpd`).

Each manifest references CMAF/fMP4 segments (`seg_1.mp4`, `seg_2.mp4`, etc.) for audio and video.  

Because the tokens expire, you must copy the exact, **fresh URL** from the browser’s network panel.

## 🧾 Legend
```
| Component | Description |
|------------|--------------|
| **Provider** | Cloudflare Stream |
| **Protocol** | MPEG-DASH & HLS (CMAF/fMP4) |
| **Auth** | JWT signed URL (short-lived) |
| **Downloader** | yt-dlp or ffmpeg |
| **Headers Needed** | Referer, Origin, User-Agent |
| **Output** | `.mp4` (video + audio merged) |
```

## 1. 🔍 Identifying the Stream

In **Chrome DevTools → Network** filter by `.m3u8` -- look for requests like:

```
https://customer-010kwcw7rkskh8op.cloudflarestream.com/<JWT>/manifest/video.mpd?parentOrigin=https%3A%2F%2Fsubs.podia.com
```

and copy the Request URL


## 2. 💻 Download Command

```bash
yt-dlp -N 16 \
  --add-header "Referer: https://subs.podia.com/" \
  --add-header "Origin: https://subs.podia.com" \
  --user-agent "Mozilla/5.0" \
  "CLOUDFLARE_STREAM_URL"
```

Replace the `"CLOUDFLARE_STREAM_URL"` with your URL and run the yt-dlp command

### ✅ What Happens

`yt-dlp` detects the Cloudflare Stream manifest and downloads both:

- HLS video (`fhls-1410.mp4`)
- DASH audio (`fdash-968106369.m4a`)

Then, merges them automatically into a single playable file with synchronized video + audio.



## ⚠️ Notes & Troubleshooting

| Issue | Cause | Fix |
|-------|--------|-----|
| **404 Not Found** | Token expired or truncated | Reopen page → recopy manifest URL |
| **401 Unauthorized** | Missing Referer/Origin headers | Add both headers exactly as shown |
| **Audio-only file** | yt-dlp didn’t find both streams | Try `.m3u8` version or `--allow-unplayable-formats` |
| **Still failing** | Cloudflare rotating keys or custom player | Copy new manifest and retry immediately |


## Related

- [Repository](https://github.com/serpapps/podia-downloader)
- [How to Download Podia Videos (Cloudflare Stream Videos)](https://gist.github.com/devinschumacher/f198684d229ed7ca299e6e7dd41c1017)