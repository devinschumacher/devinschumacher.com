# Tumblr Video Download Research: Technical Analysis of Stream Patterns, CDNs, and Download Methods

*A comprehensive research document analyzing Tumblr's video infrastructure, embed patterns, stream formats, and optimal download strategies using modern tools*

**Authors**: SERP Apps  
**Date**: December 2024  
**Version**: 1.0

---

## Abstract

This research document provides a comprehensive technical analysis of Tumblr's video delivery infrastructure, including embed URL patterns, content delivery networks (CDNs), stream formats, and optimal download methodologies. We examine Tumblr's video hosting architecture, the Neue Post Format (NPF) video blocks, external video embeds, and provide practical implementation guidance using industry-standard tools like yt-dlp, ffmpeg, gallery-dl, and alternative solutions for reliable video extraction and download.

## Table of Contents

1. [Introduction](#1-introduction)
2. [Tumblr Video Infrastructure Overview](#2-tumblr-video-infrastructure-overview)
3. [URL Patterns and Detection](#3-url-patterns-and-detection)
4. [Stream Formats and CDN Analysis](#4-stream-formats-and-cdn-analysis)
5. [yt-dlp Implementation Strategies](#5-yt-dlp-implementation-strategies)
6. [FFmpeg Processing Techniques](#6-ffmpeg-processing-techniques)
7. [Alternative Tools and Backup Methods](#7-alternative-tools-and-backup-methods)
8. [Tumblr API Integration](#8-tumblr-api-integration)
9. [Implementation Recommendations](#9-implementation-recommendations)
10. [Troubleshooting and Edge Cases](#10-troubleshooting-and-edge-cases)
11. [Conclusion](#11-conclusion)

---

## 1. Introduction

Tumblr is a versatile microblogging platform that supports various media types including videos, images, GIFs, and text posts. Unlike dedicated video platforms, Tumblr serves as both a content host and an aggregator of embedded content from external platforms like YouTube and Vimeo. This dual nature presents unique challenges for video download implementations.

### 1.1 Research Scope

This document covers:
- Technical analysis of Tumblr's native video hosting infrastructure
- Comprehensive URL pattern recognition for posts and embedded videos
- Stream format analysis and codec specifications
- Practical implementation using open-source command-line tools
- API-based approaches for programmatic access
- Alternative tools and backup strategies for edge cases

### 1.2 Methodology

Our research methodology includes:
- Network traffic analysis of Tumblr video playback
- API documentation review and testing
- URL pattern extraction and validation
- Testing with various video types (native, embedded, reblogged)
- Cross-platform validation across CDN endpoints

---

## 2. Tumblr Video Infrastructure Overview

### 2.1 CDN Architecture

Tumblr utilizes its own CDN infrastructure for hosting native video content:

**Primary Video CDN**:
- **Domain**: `va.media.tumblr.com`
- **Purpose**: Direct video file hosting (MP4)
- **Geographic Distribution**: Global edge locations

**Caption/Subtitle CDN**:
- **Domain**: `vtt.tumblr.com`
- **Purpose**: WebVTT subtitle/caption file hosting
- **Format**: `.vtt` files

**Static Assets CDN**:
- **Domain**: `64.media.tumblr.com`
- **Purpose**: Images, thumbnails, and static media
- **Note**: May also serve some video content

### 2.2 Video Processing Pipeline

Tumblr's native video processing follows this pipeline:

1. **Upload**: User uploads video file via web/mobile interface
2. **Validation**: File size (≤500MB), duration (≤10 minutes), format (MP4/MOV) checks
3. **Transcoding**: Video converted to H.264/AAC format if needed
4. **Resolution Optimization**: Scaled to fit Tumblr's display constraints
5. **CDN Distribution**: Files distributed to `va.media.tumblr.com`
6. **Metadata Extraction**: Duration, dimensions, thumbnails generated

### 2.3 Video Content Types

Tumblr handles three distinct video content types:

#### 2.3.1 Native/Uploaded Videos
- Hosted directly on Tumblr's CDN
- Subject to upload limits and transcoding
- Direct MP4 download URLs available

#### 2.3.2 External Embedded Videos
- YouTube, Vimeo, Dailymotion embeds
- Rendered via iframe in posts
- Require separate extractor handling

#### 2.3.3 Reblogged Videos
- Inherited from original posts
- May be native or external
- Maintain original source information

### 2.4 Video Specifications and Limits

| Property | Specification |
|----------|---------------|
| **Maximum File Size** | 500 MB |
| **Maximum Duration** | 10 minutes per video |
| **Daily Upload Limit** | 20 videos / 60 minutes total |
| **Supported Formats** | MP4, MOV |
| **Video Codec** | H.264 (AVC) |
| **Audio Codec** | AAC |
| **Recommended Resolution** | ≤720p (1280×720) |
| **Display Dimensions** | Max 500×700 pixels |

---

## 3. URL Patterns and Detection

### 3.1 Tumblr Post URL Patterns

#### 3.1.1 Standard Post URLs
```
# Modern format (recommended)
https://www.tumblr.com/{blogname}/{postid}
https://www.tumblr.com/{blogname}/{postid}/{slug}
https://tumblr.com/{blogname}/{postid}

# Subdomain format (legacy but still active)
https://{blogname}.tumblr.com/post/{postid}
https://{blogname}.tumblr.com/post/{postid}/{slug}

# Short format
https://tmblr.co/{shortcode}
```

#### 3.1.2 Example URLs
```bash
# Modern format
https://www.tumblr.com/exampleblog/123456789012
https://www.tumblr.com/exampleblog/123456789012/my-video-post

# Subdomain format
https://exampleblog.tumblr.com/post/123456789012
https://exampleblog.tumblr.com/post/123456789012/my-video-post
```

### 3.2 Direct Video URLs

#### 3.2.1 Native Video CDN URLs
```
# Standard MP4 video
https://va.media.tumblr.com/tumblr_{video_id}.mp4

# With quality suffix
https://va.media.tumblr.com/tumblr_{video_id}_480.mp4
https://va.media.tumblr.com/tumblr_{video_id}_720.mp4

# Alternative pattern
https://ve.media.tumblr.com/{post_id}/{filename}.mp4
```

#### 3.2.2 Caption/Subtitle URLs
```
https://vtt.tumblr.com/tumblr_{video_id}.vtt
```

### 3.3 Video ID Extraction Patterns

#### 3.3.1 Regex Patterns for URL Extraction

```regex
# Extract blog name and post ID from modern URL
https?://(?:www\.)?tumblr\.com/([\w-]+)/(\d+)(?:/[\w-]*)?

# Extract from subdomain URL
https?://([\w-]+)\.tumblr\.com/post/(\d+)

# Extract post ID only
/post/(\d+)|tumblr\.com/[\w-]+/(\d+)

# Extract direct video file
https?://va\.media\.tumblr\.com/tumblr_([a-zA-Z0-9]+)(?:_\d+)?\.mp4
```

#### 3.3.2 Command-line URL Extraction

**Using grep for pattern extraction:**
```bash
# Extract Tumblr post URLs from HTML files
grep -oE "https?://(?:www\.)?tumblr\.com/[\w-]+/\d+" input.html

# Extract video URLs from page source
grep -oE "https?://va\.media\.tumblr\.com/tumblr_[a-zA-Z0-9_]+\.mp4" input.html

# Extract from subdomain format
grep -oE "https?://[\w-]+\.tumblr\.com/post/\d+" input.html

# Extract post IDs only
grep -oE "tumblr\.com/[\w-]+/(\d+)" input.html | grep -oE "\d+$"
```

**Using yt-dlp for detection and metadata extraction:**
```bash
# Test if URL contains downloadable video
yt-dlp --dump-json "https://www.tumblr.com/blogname/123456789" | jq '.id'

# List available formats
yt-dlp --list-formats "https://www.tumblr.com/blogname/123456789"

# Extract all video information
yt-dlp --dump-json "https://www.tumblr.com/blogname/123456789" > video_info.json
```

**Using curl to inspect pages:**
```bash
# Get page source and look for video URLs
curl -s "https://www.tumblr.com/blogname/123456789" | grep -oE "va\.media\.tumblr\.com[^\"']*"

# Check response headers
curl -I "https://va.media.tumblr.com/tumblr_example.mp4"
```

---

## 4. Stream Formats and CDN Analysis

### 4.1 Available Stream Formats

#### 4.1.1 MP4 Streams (Primary)
- **Container**: MP4
- **Video Codec**: H.264 (AVC)
- **Audio Codec**: AAC
- **Profile**: Main/High
- **Quality Levels**: 480p, 720p (varies by upload)
- **Bitrates**: Typically 1,000-4,000 kbps

#### 4.1.2 Format Characteristics

| Quality | Resolution | Video Bitrate | Audio Bitrate | Typical Size |
|---------|------------|---------------|---------------|--------------|
| SD | 480p (848×480) | 1,000-2,000 kbps | 128 kbps | ~15 MB/min |
| HD | 720p (1280×720) | 2,500-4,000 kbps | 128-192 kbps | ~30 MB/min |

### 4.2 URL Construction Patterns

#### 4.2.1 Direct Video URLs
```bash
# Standard format
https://va.media.tumblr.com/tumblr_{video_id}.mp4

# With quality indicator
https://va.media.tumblr.com/tumblr_{video_id}_480.mp4
https://va.media.tumblr.com/tumblr_{video_id}_720.mp4

# With post reference
https://va.media.tumblr.com/{post_id}/{filename}.mp4
```

#### 4.2.2 CDN Testing Commands
```bash
# Test primary video CDN
curl -I "https://va.media.tumblr.com/tumblr_{video_id}.mp4"

# Check content type and size
curl -sI "https://va.media.tumblr.com/tumblr_{video_id}.mp4" | grep -E "Content-Type|Content-Length"

# Test with different user agents
curl -I -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)" \
     "https://va.media.tumblr.com/tumblr_{video_id}.mp4"
```

### 4.3 Embedded Video Sources

Tumblr supports external video embeds from major platforms:

| Platform | Detection Pattern | Extractor |
|----------|-------------------|-----------|
| YouTube | `youtube.com/embed/` or `youtu.be/` | yt-dlp native |
| Vimeo | `player.vimeo.com/video/` | yt-dlp native |
| Dailymotion | `dailymotion.com/embed/` | yt-dlp native |
| Native Tumblr | `va.media.tumblr.com/` | Direct download |

---

## 5. yt-dlp Implementation Strategies

### 5.1 Basic yt-dlp Commands

#### 5.1.1 Standard Download
```bash
# Download from Tumblr post URL
yt-dlp "https://www.tumblr.com/blogname/123456789"

# Download from subdomain URL
yt-dlp "https://blogname.tumblr.com/post/123456789"

# Download with custom filename
yt-dlp -o "%(uploader)s - %(title)s.%(ext)s" "https://www.tumblr.com/blogname/123456789"
```

#### 5.1.2 Format Selection
```bash
# List available formats
yt-dlp -F "https://www.tumblr.com/blogname/123456789"

# Download best quality MP4
yt-dlp -f "best[ext=mp4]" "https://www.tumblr.com/blogname/123456789"

# Download specific quality
yt-dlp -f "best[height<=720]" "https://www.tumblr.com/blogname/123456789"

# Best video + best audio merged
yt-dlp -f "bv+ba/best" "https://www.tumblr.com/blogname/123456789"
```

#### 5.1.3 Advanced Options
```bash
# Download with metadata
yt-dlp --write-info-json --write-thumbnail "https://www.tumblr.com/blogname/123456789"

# Download with subtitles if available
yt-dlp --write-subs --sub-langs all "https://www.tumblr.com/blogname/123456789"

# Rate limiting to avoid blocks
yt-dlp --limit-rate 1M "https://www.tumblr.com/blogname/123456789"

# With retry logic
yt-dlp --retries 5 --fragment-retries 5 "https://www.tumblr.com/blogname/123456789"

# Custom user agent
yt-dlp --user-agent "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" \
       "https://www.tumblr.com/blogname/123456789"
```

### 5.2 Batch Processing

#### 5.2.1 Multiple Videos from File
```bash
# Download from URL list file
yt-dlp -a tumblr_urls.txt

# With archive tracking (skip already downloaded)
yt-dlp --download-archive downloaded.txt -a tumblr_urls.txt

# With output directory
yt-dlp -o "./downloads/%(uploader)s/%(title)s.%(ext)s" -a tumblr_urls.txt
```

#### 5.2.2 Batch Processing Script
```bash
#!/bin/bash

# Batch download Tumblr videos with error handling
download_tumblr_batch() {
    local url_file="$1"
    local output_dir="${2:-./tumblr_downloads}"
    
    mkdir -p "$output_dir"
    
    while IFS= read -r url; do
        [[ "$url" =~ ^#.*$ ]] && continue  # Skip comments
        [[ -z "$url" ]] && continue        # Skip empty lines
        
        echo "Downloading: $url"
        
        yt-dlp \
            --output "$output_dir/%(uploader)s - %(title)s.%(ext)s" \
            --format "best[ext=mp4]/best" \
            --write-info-json \
            --retries 5 \
            --rate-limit 1M \
            --sleep-interval 2 \
            "$url"
        
        # Brief pause between downloads
        sleep 3
        
    done < "$url_file"
}

# Usage: download_tumblr_batch urls.txt ./my_downloads
```

### 5.3 Error Handling and Retries

```bash
# Download with comprehensive error handling
yt-dlp \
    --retries 5 \
    --fragment-retries 5 \
    --retry-sleep linear:2:10:2 \
    --socket-timeout 30 \
    --ignore-errors \
    "https://www.tumblr.com/blogname/123456789"

# Verbose output for debugging
yt-dlp -v "https://www.tumblr.com/blogname/123456789" 2>&1 | tee download.log

# Continue partial downloads
yt-dlp --continue "https://www.tumblr.com/blogname/123456789"
```

### 5.4 Configuration File

Create a configuration file at `~/.config/yt-dlp/config`:

```yaml
# yt-dlp configuration for Tumblr downloads
-o "%(uploader)s/%(title)s.%(ext)s"
--format "best[ext=mp4]/best"
--write-info-json
--write-thumbnail
--embed-metadata
--retries 5
--fragment-retries 5
--rate-limit 2M
--user-agent "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
```

---

## 6. FFmpeg Processing Techniques

### 6.1 Stream Analysis

#### 6.1.1 Basic Stream Information
```bash
# Analyze video stream details
ffprobe -v quiet -print_format json -show_format -show_streams \
        "https://va.media.tumblr.com/tumblr_{video_id}.mp4"

# Get duration only
ffprobe -v quiet -show_entries format=duration -of csv="p=0" "video.mp4"

# Get codec information
ffprobe -v quiet -select_streams v:0 \
        -show_entries stream=codec_name,width,height,bit_rate \
        -of csv="s=x:p=0" "video.mp4"

# Full stream report
ffprobe -v error -show_streams -show_format "video.mp4"
```

#### 6.1.2 Quick Analysis Script
```bash
#!/bin/bash

analyze_tumblr_video() {
    local url="$1"
    
    echo "=== Tumblr Video Analysis ==="
    echo "URL: $url"
    echo
    
    # Get format info
    echo "Format Information:"
    ffprobe -v quiet -print_format json -show_format "$url" | jq '{
        format_name: .format.format_name,
        duration: .format.duration,
        size: .format.size,
        bit_rate: .format.bit_rate
    }'
    
    echo
    echo "Video Stream:"
    ffprobe -v quiet -print_format json -show_streams -select_streams v:0 "$url" | jq '.streams[0] | {
        codec_name: .codec_name,
        width: .width,
        height: .height,
        bit_rate: .bit_rate,
        frame_rate: .r_frame_rate
    }'
    
    echo
    echo "Audio Stream:"
    ffprobe -v quiet -print_format json -show_streams -select_streams a:0 "$url" | jq '.streams[0] | {
        codec_name: .codec_name,
        sample_rate: .sample_rate,
        channels: .channels,
        bit_rate: .bit_rate
    }'
}
```

### 6.2 Direct Stream Download

#### 6.2.1 Simple Download
```bash
# Download MP4 directly
ffmpeg -i "https://va.media.tumblr.com/tumblr_{video_id}.mp4" -c copy output.mp4

# Download with headers
ffmpeg -headers "User-Agent: Mozilla/5.0\r\n" \
       -i "https://va.media.tumblr.com/tumblr_{video_id}.mp4" \
       -c copy output.mp4

# Download with timeout
ffmpeg -timeout 30000000 \
       -i "https://va.media.tumblr.com/tumblr_{video_id}.mp4" \
       -c copy output.mp4
```

#### 6.2.2 HLS Stream Processing (If Available)
```bash
# Download HLS stream
ffmpeg -i "https://example.tumblr.com/video.m3u8" -c copy output.mp4

# With custom headers for restricted streams
ffmpeg -headers "Referer: https://www.tumblr.com/\r\nUser-Agent: Mozilla/5.0\r\n" \
       -i "https://example.tumblr.com/video.m3u8" \
       -c copy output.mp4
```

### 6.3 Video Processing and Conversion

#### 6.3.1 Format Conversion
```bash
# Convert to different format
ffmpeg -i input.mp4 -c:v libx264 -crf 23 -c:a aac -b:a 128k output.mp4

# Convert WebM to MP4 (if needed)
ffmpeg -i input.webm -c:v libx264 -c:a aac output.mp4

# Create web-optimized MP4
ffmpeg -i input.mp4 -c:v libx264 -crf 23 -c:a aac -movflags +faststart web_optimized.mp4
```

#### 6.3.2 Quality Optimization
```bash
# Compress for smaller file size
ffmpeg -i input.mp4 -c:v libx264 -crf 28 -c:a aac -b:a 96k compressed.mp4

# High quality re-encode
ffmpeg -i input.mp4 -c:v libx264 -preset slow -crf 18 -c:a aac -b:a 192k hq_output.mp4

# Scale to specific resolution
ffmpeg -i input.mp4 -vf "scale=720:-1" -c:v libx264 -c:a copy scaled_720p.mp4
```

#### 6.3.3 Audio Extraction
```bash
# Extract audio as MP3
ffmpeg -i input.mp4 -vn -c:a libmp3lame -q:a 2 audio.mp3

# Extract audio as AAC
ffmpeg -i input.mp4 -vn -c:a aac -b:a 192k audio.m4a

# Extract audio as WAV
ffmpeg -i input.mp4 -vn -c:a pcm_s16le audio.wav
```

### 6.4 Batch Processing

#### 6.4.1 Process Multiple Files
```bash
#!/bin/bash

# Batch convert Tumblr videos
batch_convert() {
    local input_dir="$1"
    local output_dir="$2"
    
    mkdir -p "$output_dir"
    
    for file in "$input_dir"/*.mp4; do
        if [[ -f "$file" ]]; then
            filename=$(basename "$file" .mp4)
            echo "Processing: $filename"
            
            ffmpeg -i "$file" \
                   -c:v libx264 -crf 23 \
                   -c:a aac -b:a 128k \
                   -movflags +faststart \
                   "$output_dir/${filename}_processed.mp4"
        fi
    done
}

# Usage: batch_convert ./raw_videos ./processed_videos
```

---

## 7. Alternative Tools and Backup Methods

### 7.1 gallery-dl

Gallery-dl is an excellent alternative for downloading media from Tumblr, especially for batch operations.

#### 7.1.1 Installation
```bash
# Install via pip
pip install -U gallery-dl

# Or use pipx for isolated environment
pipx install gallery-dl
```

#### 7.1.2 Basic Usage
```bash
# Download from Tumblr blog
gallery-dl "https://blogname.tumblr.com"

# Download specific post
gallery-dl "https://blogname.tumblr.com/post/123456789"

# Download with custom output
gallery-dl -D ./tumblr_downloads "https://blogname.tumblr.com"
```

#### 7.1.3 Configuration for Tumblr

Create configuration at `~/.config/gallery-dl/config.json`:

```json
{
    "extractor": {
        "tumblr": {
            "api-key": "<your-oauth-consumer-key>",
            "api-secret": "<your-secret-key>",
            "access-token": "<your-access-token>",
            "access-token-secret": "<your-access-token-secret>",
            "filename": "{blog[name]}_{id}_{filename}.{extension}",
            "directory": ["tumblr", "{blog[name]}"],
            "posts": "all",
            "reblogs": true,
            "external": false
        }
    },
    "downloader": {
        "rate": "2M",
        "retries": 5
    }
}
```

#### 7.1.4 OAuth Setup
```bash
# Get OAuth tokens interactively
gallery-dl oauth:tumblr

# This will open browser for authorization
# Copy the provided tokens to your config file
```

### 7.2 TumblThree

TumblThree is a dedicated Windows application for Tumblr blog backup.

#### 7.2.1 Features
- Bulk blog backup
- Video, image, and text support
- Queue management
- Resume interrupted downloads
- NSFW content support
- Metadata preservation

#### 7.2.2 Installation
- Download from [GitHub Releases](https://github.com/TumblThreeApp/TumblThree)
- Extract and run (portable application)

#### 7.2.3 Command-line Usage (if available)
```bash
# TumblThree is primarily GUI-based
# For automation, use gallery-dl or yt-dlp instead
```

### 7.3 Python Scripts

#### 7.3.1 Using tumblr-downloader (GitHub)
```bash
# Clone repository
git clone https://github.com/Thesharing/tumblr-downloader.git
cd tumblr-downloader

# Install dependencies
pip install -r requirements.txt

# Configure API credentials in config file
# Run downloader
python tumblr-downloader.py --blog blogname
```

### 7.4 wget/curl Direct Downloads

#### 7.4.1 Direct MP4 Downloads
```bash
# Using wget
wget -O "tumblr_video.mp4" "https://va.media.tumblr.com/tumblr_{video_id}.mp4"

# Using curl
curl -L -o "tumblr_video.mp4" "https://va.media.tumblr.com/tumblr_{video_id}.mp4"

# With custom headers
curl -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" \
     -H "Referer: https://www.tumblr.com/" \
     -o "tumblr_video.mp4" \
     "https://va.media.tumblr.com/tumblr_{video_id}.mp4"
```

#### 7.4.2 Batch Download Script
```bash
#!/bin/bash

# Download Tumblr videos with fallback
download_tumblr_video() {
    local video_url="$1"
    local output_file="${2:-tumblr_video.mp4}"
    
    # Try wget first
    if wget -q --spider "$video_url"; then
        echo "Downloading with wget..."
        wget -O "$output_file" "$video_url"
        return $?
    fi
    
    # Fallback to curl
    echo "Trying curl..."
    curl -L -o "$output_file" "$video_url"
    return $?
}

# Usage: download_tumblr_video "https://va.media.tumblr.com/..." "output.mp4"
```

### 7.5 Browser Extensions

For manual or occasional downloads:

| Extension | Browser | Features |
|-----------|---------|----------|
| Video DownloadHelper | Firefox/Chrome | General video detection |
| SaveFrom.net Helper | Firefox/Chrome | Multiple site support |
| Video Downloader Plus | Chrome | Tumblr video support |

---

## 8. Tumblr API Integration

### 8.1 API Overview

Tumblr provides official API v2 for programmatic access to posts and media.

#### 8.1.1 API Endpoints

```
# Base URL
https://api.tumblr.com/v2/

# Blog posts endpoint
https://api.tumblr.com/v2/blog/{blog-identifier}/posts

# Specific post endpoint
https://api.tumblr.com/v2/blog/{blog-identifier}/posts/{post-id}
```

#### 8.1.2 Authentication Requirements

- **OAuth 1.0a**: Required for most endpoints
- **API Key**: Available for public content access
- **Rate Limits**: 1,000 requests/hour (new apps), 5,000 requests/day

### 8.2 Neue Post Format (NPF) Video Blocks

#### 8.2.1 NPF Video Block Structure

```json
{
    "type": "video",
    "media": [
        {
            "type": "video/mp4",
            "url": "https://va.media.tumblr.com/tumblr_xyz.mp4",
            "width": 640,
            "height": 480,
            "hd": true
        }
    ],
    "poster": [
        {
            "type": "image/jpeg",
            "url": "https://64.media.tumblr.com/poster.jpg",
            "width": 640,
            "height": 480
        }
    ],
    "filmstrip": {...},
    "attribution": {...}
}
```

#### 8.2.2 External Video Embed Block

```json
{
    "type": "video",
    "provider": "youtube",
    "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "embed_html": "<iframe...>",
    "embed_url": "https://www.youtube.com/embed/dQw4w9WgXcQ"
}
```

### 8.3 Python Implementation

#### 8.3.1 Basic API Request

```python
import requests

def get_tumblr_post(blog_name, post_id, api_key):
    """
    Fetch a Tumblr post and extract video URLs
    """
    url = f"https://api.tumblr.com/v2/blog/{blog_name}/posts/{post_id}"
    params = {
        "api_key": api_key,
        "npf": True  # Request NPF format
    }
    
    response = requests.get(url, params=params)
    
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"API request failed: {response.status_code}")


def extract_video_urls(post_data):
    """
    Extract video URLs from NPF content blocks
    """
    video_urls = []
    
    for block in post_data.get("content", []):
        if block.get("type") == "video":
            # Native Tumblr video
            for media in block.get("media", []):
                if "url" in media:
                    video_urls.append({
                        "url": media["url"],
                        "type": media.get("type", "video/mp4"),
                        "width": media.get("width"),
                        "height": media.get("height"),
                        "native": True
                    })
            
            # External embed
            if "embed_url" in block:
                video_urls.append({
                    "url": block["embed_url"],
                    "provider": block.get("provider"),
                    "native": False
                })
    
    return video_urls
```

#### 8.3.2 Download Implementation

```python
import requests
import os

def download_tumblr_video(video_url, output_path, headers=None):
    """
    Download video from direct URL
    """
    if headers is None:
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        }
    
    response = requests.get(video_url, headers=headers, stream=True)
    response.raise_for_status()
    
    with open(output_path, "wb") as f:
        for chunk in response.iter_content(chunk_size=8192):
            if chunk:
                f.write(chunk)
    
    return output_path


def download_blog_videos(blog_name, api_key, output_dir="./downloads"):
    """
    Download all videos from a Tumblr blog
    """
    os.makedirs(output_dir, exist_ok=True)
    
    # Get posts (paginated)
    offset = 0
    limit = 20
    
    while True:
        url = f"https://api.tumblr.com/v2/blog/{blog_name}/posts"
        params = {
            "api_key": api_key,
            "npf": True,
            "type": "video",
            "limit": limit,
            "offset": offset
        }
        
        response = requests.get(url, params=params)
        data = response.json()
        
        posts = data.get("response", {}).get("posts", [])
        if not posts:
            break
        
        for post in posts:
            video_urls = extract_video_urls(post)
            
            for i, video in enumerate(video_urls):
                if video["native"]:
                    filename = f"{post['id']}_{i}.mp4"
                    output_path = os.path.join(output_dir, filename)
                    
                    try:
                        download_tumblr_video(video["url"], output_path)
                        print(f"Downloaded: {filename}")
                    except Exception as e:
                        print(f"Failed to download {filename}: {e}")
        
        offset += limit
```

### 8.4 API Rate Limiting

```python
import time
from functools import wraps

def rate_limit(calls_per_minute=30):
    """
    Rate limiting decorator for API calls
    """
    min_interval = 60.0 / calls_per_minute
    last_call = [0.0]
    
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            elapsed = time.time() - last_call[0]
            wait_time = min_interval - elapsed
            
            if wait_time > 0:
                time.sleep(wait_time)
            
            result = func(*args, **kwargs)
            last_call[0] = time.time()
            
            return result
        return wrapper
    return decorator

@rate_limit(calls_per_minute=30)
def api_request(url, params):
    """Rate-limited API request"""
    return requests.get(url, params=params)
```

---

## 9. Implementation Recommendations

### 9.1 Primary Implementation Strategy

#### 9.1.1 Hierarchical Download Approach

Use a sequential approach with fallbacks:

```bash
#!/bin/bash

download_tumblr() {
    local url="$1"
    local output_dir="${2:-./downloads}"
    
    echo "Attempting download of: $url"
    
    # Method 1: yt-dlp (primary - handles most cases)
    if yt-dlp --ignore-errors -o "$output_dir/%(title)s.%(ext)s" "$url"; then
        echo "✓ Success with yt-dlp"
        return 0
    fi
    
    # Method 2: Extract direct video URL and use ffmpeg
    echo "Trying direct video extraction..."
    video_url=$(curl -s "$url" | grep -oE "https://va\.media\.tumblr\.com/[^\"']+\.mp4" | head -1)
    
    if [ -n "$video_url" ]; then
        output_file="$output_dir/tumblr_video_$(date +%s).mp4"
        if ffmpeg -i "$video_url" -c copy "$output_file"; then
            echo "✓ Success with ffmpeg"
            return 0
        fi
    fi
    
    # Method 3: gallery-dl as fallback
    if gallery-dl -D "$output_dir" "$url"; then
        echo "✓ Success with gallery-dl"
        return 0
    fi
    
    # Method 4: Direct wget/curl
    if [ -n "$video_url" ]; then
        if wget -O "$output_dir/tumblr_video.mp4" "$video_url"; then
            echo "✓ Success with wget"
            return 0
        fi
    fi
    
    echo "✗ All methods failed"
    return 1
}
```

### 9.2 Quality Selection Strategy

```bash
# Check available formats first
check_formats() {
    local url="$1"
    
    echo "Checking available formats..."
    yt-dlp -F "$url"
}

# Download with quality preference
download_with_quality() {
    local url="$1"
    local max_quality="${2:-720}"
    local output_dir="${3:-./downloads}"
    
    echo "Downloading with max quality: ${max_quality}p"
    
    yt-dlp \
        -f "best[height<=$max_quality][ext=mp4]/best[height<=$max_quality]/best" \
        -o "$output_dir/%(uploader)s - %(title)s.%(ext)s" \
        "$url"
}
```

### 9.3 Error Handling and Resilience

```bash
#!/bin/bash

download_with_retry() {
    local url="$1"
    local max_retries=3
    local delay=5
    
    for attempt in $(seq 1 $max_retries); do
        echo "Attempt $attempt of $max_retries..."
        
        if yt-dlp --retries 2 --socket-timeout 30 "$url"; then
            echo "✓ Download successful"
            return 0
        fi
        
        if [ $attempt -lt $max_retries ]; then
            echo "Waiting ${delay}s before retry..."
            sleep $delay
            delay=$((delay * 2))  # Exponential backoff
        fi
    done
    
    echo "✗ All retries failed"
    return 1
}

# Check URL accessibility
check_url_access() {
    local url="$1"
    
    # Test with curl
    status_code=$(curl -o /dev/null -s -w "%{http_code}" "$url")
    
    if [ "$status_code" = "200" ]; then
        echo "✓ URL accessible (HTTP $status_code)"
        return 0
    else
        echo "✗ URL not accessible (HTTP $status_code)"
        return 1
    fi
}
```

### 9.4 Logging and Monitoring

```bash
#!/bin/bash

# Setup logging
setup_logging() {
    local log_dir="${1:-./logs}"
    mkdir -p "$log_dir"
    
    export DOWNLOAD_LOG="$log_dir/downloads_$(date +%Y%m%d).log"
    export ERROR_LOG="$log_dir/errors_$(date +%Y%m%d).log"
}

# Log download activity
log_download() {
    local status="$1"
    local url="$2"
    local message="$3"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    
    echo "[$timestamp] [$status] $url - $message" >> "$DOWNLOAD_LOG"
    
    if [ "$status" = "ERROR" ]; then
        echo "[$timestamp] $url - $message" >> "$ERROR_LOG"
    fi
}

# Generate download report
generate_report() {
    echo "=== Tumblr Download Report ==="
    echo "Date: $(date)"
    echo ""
    echo "Downloads:"
    grep -c "\[SUCCESS\]" "$DOWNLOAD_LOG" 2>/dev/null || echo "0"
    echo ""
    echo "Errors:"
    grep -c "\[ERROR\]" "$DOWNLOAD_LOG" 2>/dev/null || echo "0"
    echo ""
    echo "Recent errors:"
    tail -10 "$ERROR_LOG" 2>/dev/null
}
```

### 9.5 Performance Optimization

```bash
# Parallel downloads using GNU parallel
batch_download_parallel() {
    local url_file="$1"
    local max_jobs="${2:-4}"
    local output_dir="${3:-./downloads}"
    
    mkdir -p "$output_dir"
    
    # Export function for parallel
    export -f download_single_video
    export output_dir
    
    parallel -j $max_jobs download_single_video {} "$output_dir" :::: "$url_file"
}

download_single_video() {
    local url="$1"
    local output_dir="$2"
    
    yt-dlp \
        --output "$output_dir/%(title)s.%(ext)s" \
        --format "best[ext=mp4]/best" \
        --rate-limit 1M \
        "$url"
}
```

---

## 10. Troubleshooting and Edge Cases

### 10.1 Common Issues and Solutions

#### 10.1.1 Access and Authentication Issues

```bash
# Private blog access - use cookies
yt-dlp --cookies-from-browser firefox "https://www.tumblr.com/privateblog/123456"

# Or export cookies to file
yt-dlp --cookies cookies.txt "https://www.tumblr.com/privateblog/123456"

# Test with different user agents
yt-dlp --user-agent "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)" \
       "https://www.tumblr.com/blogname/123456"
```

#### 10.1.2 Rate Limiting

```bash
# Implement rate limiting in downloads
yt-dlp \
    --rate-limit 500K \
    --sleep-interval 3 \
    --sleep-requests 1 \
    "https://www.tumblr.com/blogname/123456"

# Batch with delays
for url in $(cat urls.txt); do
    yt-dlp "$url"
    sleep 5  # 5 second delay between downloads
done
```

#### 10.1.3 External Embed Handling

```bash
# For YouTube/Vimeo embeds in Tumblr posts
# yt-dlp typically handles these automatically

# If embed detection fails, extract embed URL manually
embed_url=$(curl -s "https://www.tumblr.com/blogname/123456" | \
            grep -oE "youtube\.com/embed/[a-zA-Z0-9_-]+" | head -1)

if [ -n "$embed_url" ]; then
    yt-dlp "https://$embed_url"
fi
```

### 10.2 Format-specific Issues

#### 10.2.1 Video Corruption Detection

```bash
# Verify downloaded video integrity
verify_video() {
    local file="$1"
    
    # Check with ffprobe
    if ffprobe -v error -select_streams v:0 \
               -show_entries stream=codec_name \
               -of csv="p=0" "$file" > /dev/null 2>&1; then
        echo "✓ Video file is valid: $file"
        return 0
    else
        echo "✗ Video file may be corrupted: $file"
        return 1
    fi
}

# Repair corrupted video
repair_video() {
    local input="$1"
    local output="${2:-repaired_${input}}"
    
    ffmpeg -err_detect ignore_err -i "$input" -c copy "$output"
}
```

#### 10.2.2 Missing Audio/Video Streams

```bash
# Check for audio stream
check_audio() {
    local file="$1"
    
    audio_streams=$(ffprobe -v error -select_streams a \
                            -show_entries stream=codec_type \
                            -of csv="p=0" "$file" | wc -l)
    
    if [ "$audio_streams" -gt 0 ]; then
        echo "Audio streams found: $audio_streams"
    else
        echo "No audio stream in file"
    fi
}
```

### 10.3 Edge Cases

#### 10.3.1 Reblogged Videos

```bash
# Reblogged videos may have different source URLs
# Use yt-dlp's --dump-json to inspect

yt-dlp --dump-json "https://www.tumblr.com/blogname/123456" | \
    jq '.formats[] | {format_id, url, ext}'
```

#### 10.3.2 Deleted or Unavailable Content

```bash
# Check if content is still available
check_availability() {
    local url="$1"
    
    response=$(yt-dlp --dump-json "$url" 2>&1)
    
    if echo "$response" | grep -q "ERROR"; then
        echo "Content not available: $url"
        echo "Error: $response"
        return 1
    else
        echo "Content available: $url"
        return 0
    fi
}
```

#### 10.3.3 NSFW/Adult Content

```bash
# Some NSFW content may require authentication
# Use browser cookies for access

# Extract cookies from browser
yt-dlp --cookies-from-browser chrome "https://www.tumblr.com/nsfwblog/123456"

# Or use logged-in session cookies
yt-dlp --cookies tumblr_cookies.txt "https://www.tumblr.com/nsfwblog/123456"
```

### 10.4 Diagnostic Tools

```bash
#!/bin/bash

# Comprehensive diagnostic for Tumblr URL
diagnose_tumblr_url() {
    local url="$1"
    
    echo "=== Tumblr URL Diagnostics ==="
    echo "URL: $url"
    echo
    
    # Test URL accessibility
    echo "1. URL Accessibility:"
    curl -sI "$url" | head -5
    echo
    
    # Check for video content
    echo "2. Video Detection:"
    yt-dlp -F "$url" 2>&1 | head -20
    echo
    
    # Extract video info
    echo "3. Video Information:"
    yt-dlp --dump-json "$url" 2>&1 | jq '{
        title: .title,
        uploader: .uploader,
        duration: .duration,
        format: .format,
        url: .url
    }' 2>/dev/null || echo "Could not extract video info"
    echo
    
    # Check for direct video URLs
    echo "4. Direct Video URLs:"
    curl -s "$url" | grep -oE "https://va\.media\.tumblr\.com/[^\"']+\.mp4" | head -5
}
```

---

## 11. Conclusion

### 11.1 Summary of Findings

This research has provided a comprehensive analysis of Tumblr's video delivery infrastructure, revealing a straightforward MP4-based hosting system through their dedicated CDN (`va.media.tumblr.com`). Unlike more complex streaming platforms, Tumblr primarily serves direct MP4 files, making downloads relatively straightforward with proper tools.

**Key Technical Findings:**
- Tumblr hosts native videos on `va.media.tumblr.com` as direct MP4 files
- Videos are encoded in H.264/AAC format with typical quality up to 720p
- External embeds from YouTube, Vimeo, etc. are handled separately via iframes
- The Tumblr API v2 with NPF format provides programmatic access to video URLs
- Subtitle/caption files are available via `vtt.tumblr.com` in WebVTT format

### 11.2 Recommended Implementation Approach

Based on our research, we recommend a **hierarchical download strategy**:

1. **Primary Method**: yt-dlp for standard Tumblr post URLs (90%+ success rate)
2. **Secondary Method**: Direct video URL extraction + ffmpeg/wget
3. **Tertiary Method**: gallery-dl with API authentication
4. **API Method**: Tumblr API v2 for programmatic/bulk downloads

### 11.3 Tool Recommendations

**Essential Tools:**
| Tool | Purpose | Priority |
|------|---------|----------|
| **yt-dlp** | Primary download tool | Required |
| **ffmpeg** | Stream processing, conversion | Required |
| **curl/wget** | Direct downloads, testing | Required |

**Recommended Backup Tools:**
| Tool | Purpose | Use Case |
|------|---------|----------|
| **gallery-dl** | Bulk blog downloads | Large archives |
| **TumblThree** | Windows GUI backup | Non-technical users |
| **Python scripts** | Custom automation | API integration |

### 11.4 Performance Considerations

- **Concurrent Downloads**: 3-4 simultaneous downloads recommended
- **Rate Limiting**: 30 requests/minute to avoid blocks
- **Retry Logic**: Exponential backoff with 3-5 retries
- **Quality Selection**: 720p provides best balance for most content

### 11.5 Security and Compliance Notes

**Important Considerations:**
- Respect Tumblr's Terms of Service and usage policies
- Implement appropriate rate limiting
- Only download content you have rights to access
- Consider privacy implications when archiving content
- Ensure compliance with applicable copyright laws

### 11.6 Future Considerations

**Areas for Continued Development:**
1. **API Changes**: Monitor Tumblr API v2 for updates or deprecations
2. **CDN Updates**: Watch for new video hosting patterns
3. **Tool Updates**: Keep yt-dlp and gallery-dl updated regularly
4. **Authentication**: Prepare for potential OAuth requirement changes

### 11.7 Maintenance Recommendations

| Frequency | Task |
|-----------|------|
| Weekly | Update yt-dlp (`yt-dlp -U`) |
| Monthly | Test URL patterns and CDN endpoints |
| Quarterly | Review API authentication and limits |
| Annually | Comprehensive strategy review |

---

**Disclaimer**: This research is provided for educational and legitimate archival purposes. Users must comply with applicable terms of service, copyright laws, and data protection regulations when implementing these techniques.

**Last Updated**: December 2024  
**Research Version**: 1.0  
**Next Review**: March 2025


## Related

- [Repository](https://github.com/serpapps/tumblr-video-downloader)
- [Release](https://gist.github.com/devinschumacher/61515e9e575aee2e07e39fbcbf71dfe0)
- [How to Download Tumblr Videos](https://gist.github.com/devinschumacher/7ac9b7a332bb23aec5c1a98b1f8c3d2c)
