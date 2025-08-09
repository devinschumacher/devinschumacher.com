export const siteConfig = {
  name: "Looma",
  url: "https://getlooma.com",
  description: "Looma is how you download Loom videos, audio, transcripts, mp4s, and more - on chrome, firefox, windows or mac.",
  title: "Looma - Online Tools for Downloading loom Videos, Audio, Transcripts & More",
  author: {
    name: "Mr Video Downloader",
    email: "contact@downloadloom.com",
  },
  social: {
    youtube: "https://youtube.com/",
    twitter: "https://twitter.com/",
  },
  categories: [
    "Downloaders",
  ],
  metadata: {
    keywords: ["Looma", "loom downloader", "loom video download", "loom mp4", "loom audio download", "loom transcript", "loom to mp4", "Looma chrome", "Looma firefox", "loom download windows", "loom download mac", "online loom downloader", "free loom download"],
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: "Looma",
    },
    twitter: {
      card: "summary_large_image",
      creator: "@",
    },
  },
  // Analytics Configuration
  analytics: {
    gtmId: "GTM-57L458CF", // Google Tag Manager ID
  },
} as const;

export type SiteConfig = typeof siteConfig;