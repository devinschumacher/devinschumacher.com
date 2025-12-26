import type { Metadata } from "next";
import Script from "next/script";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/site.config";
import { getAllVideos } from "@/lib/videos";
import { VideoCard } from "@/components/video-card";

function getBaseUrl() {
  return siteConfig.url.replace(/\/$/, "");
}

function toIsoDuration(duration?: string) {
  if (!duration) return null;
  const parts = duration.split(":").map((part) => Number(part));
  if (parts.some((n) => Number.isNaN(n))) return null;
  const [h, m, s] =
    parts.length === 3 ? (parts as [number, number, number]) : ([0, parts[0] ?? 0, parts[1] ?? 0] as const);
  const chunks = [];
  if (h) chunks.push(`${h}H`);
  if (m) chunks.push(`${m}M`);
  if (s || chunks.length === 0) chunks.push(`${s}S`);
  return `PT${chunks.join("")}`;
}

function buildVideoListSchema({
  items,
  siteName,
  baseUrl,
}: {
  items: ReturnType<typeof getAllVideos>;
  siteName: string;
  baseUrl: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${siteName} Video Library`,
    itemListElement: items.map((video, index) => {
      const watchUrl = `${baseUrl}/videos/${video.slug}`;
      const embedUrl =
        video.platform === "youtube" && video.videoId
          ? `https://www.youtube.com/embed/${video.videoId}`
          : undefined;
      const isoDuration = toIsoDuration(video.duration);

      return {
        "@type": "ListItem",
        position: index + 1,
        url: watchUrl,
        item: {
          "@type": "VideoObject",
          name: video.title,
          description: video.description,
          url: watchUrl,
          ...(embedUrl ? { embedUrl } : {}),
          ...(video.url ? { contentUrl: video.url } : {}),
          ...(video.thumbnail ? { thumbnailUrl: [video.thumbnail] } : {}),
          uploadDate: video.date,
          ...(isoDuration ? { duration: isoDuration } : {}),
          publisher: {
            "@type": "Organization",
            name: siteName,
            logo: {
              "@type": "ImageObject",
              url: `${baseUrl}/logo.svg`,
            },
          },
        },
      };
    }),
  } as const;
}

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = getBaseUrl();
  const siteName = siteConfig.name;
  const canonical = `${baseUrl}/videos`;

  return {
    title: `Videos | ${siteName}`,
    description: `Browse videos from ${siteName}.`,
    alternates: { canonical },
    openGraph: {
      type: "website",
      title: `Videos | ${siteName}`,
      description: `Browse videos from ${siteName}.`,
      url: canonical,
    },
    twitter: {
      card: "summary_large_image",
      title: `Videos | ${siteName}`,
      description: `Browse videos from ${siteName}.`,
    },
  };
}

export default function VideosPage() {
  const baseUrl = getBaseUrl();
  const siteName = siteConfig.name;
  const videos = getAllVideos();

  const listSchema =
    videos.length > 0
      ? buildVideoListSchema({
          items: videos,
          siteName,
          baseUrl,
        })
      : null;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <section className="border-b bg-gradient-to-b from-primary/5 to-background">
          <div className="container py-16 md:py-24">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
                Videos
              </h1>
              <p className="text-lg text-muted-foreground">
                Educational content on SEO, AI, programming, and entrepreneurship
              </p>
            </div>
          </div>
        </section>

        {listSchema && (
          <Script
            id="videos-itemlist"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }}
          />
        )}

        <section className="container py-12 md:py-20">
          <div className="mx-auto max-w-6xl">
            {videos.length === 0 ? (
              <p className="text-muted-foreground">No videos yet.</p>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {videos.map((video) => (
                  <VideoCard key={video.slug} video={video} />
                ))}
              </div>
            )}
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
