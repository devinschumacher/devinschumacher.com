export const siteConfig = {
  name: "Devin Schumacher",
  url: "https://devinschumacher.com",
  description: "Devin Schumacher",
  title: "Devin Schumacher",
  author: {
    name: "Devin Schumacher",
    email: "dmca@devinschumacher.com",
  },
  social: {
    youtube: "https://www.youtube.com/@devinschumacher1?sub_confirmation=1",
    twitter: "https://serp.ly/@devin/twitter",
  },
  categories: [
    "SEO",
    "Reviews",
    "Best",
  ],
  metadata: {
    keywords: ["Devin Schumacher"],
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: "Devin Schumacher",
    },
    twitter: {
      card: "summary_large_image",
      creator: "@dvnschmchr",
    },
  },
  // serp.ly links to our products get ?via={tenantId} for Dub attribution.
  // Only links listed here are tagged; everything else stays as-is.
  serply: {
    via: "devinschumacher.com",
    attributedLinks: [
      "https://serp.ly/circle-downloader",
      "https://serp.ly/coursera-downloader",
      "https://serp.ly/loom-video-downloader",
      "https://serp.ly/m3u8-downloader",
      "https://serp.ly/onlyfans-downloader",
      "https://serp.ly/skool-video-downloader",
      "https://serp.ly/tiktok-downloader",
      "https://serp.ly/udemy-video-downloader",
      "https://serp.ly/vimeo-video-downloader",
      "https://serp.ly/whop-video-downloader",
      "https://serp.ly/wistia-video-downloader",
      "https://serp.ly/youtube-downloader",
    ],
  },
  // Analytics Configuration
  analytics: {
    gtmId: "GTM-NFB664F",
  },
} as const;

export type SiteConfig = typeof siteConfig;
