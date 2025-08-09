export const siteConfig = {
  name: "Devin Schumacher",
  url: "https://devinschumacher.com",
  description: "Devin Schumacher",
  title: "Devin Schumacher",
  author: {
    name: "Devin Schumacher",
    email: "yeahright@devinschumacher.com",
  },
  social: {
    youtube: "https://www.youtube.com/@devinschumacher?sub_confirmation=1",
    twitter: "https://twitter.com/@dvnschmchr",
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
  // Analytics Configuration
  analytics: {
    gtmId: "GTM-NFB664F",
  },
} as const;

export type SiteConfig = typeof siteConfig;