import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/site.config";
import { getAllVideos, getVideoBySlug } from "@/lib/videos";
import { MDXContent } from "@/components/mdx-content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, PlayCircle } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function getBaseUrl() {
  return siteConfig.url.replace(/\/$/, "");
}

function getYouTubeEmbedUrl(videoId?: string) {
  if (!videoId) return null;
  return `https://www.youtube.com/embed/${videoId}`;
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

function buildBreadcrumbSchema({
  baseUrl,
  items,
}: {
  baseUrl: string;
  items: Array<{ name: string; url: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${baseUrl}${item.url}`,
    })),
  } as const;
}

export async function generateStaticParams() {
  return getAllVideos().map((video) => ({ slug: video.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const video = getVideoBySlug(slug);
  const baseUrl = getBaseUrl();

  if (!video) {
    return { title: "Video Not Found" };
  }

  const canonical = `${baseUrl}/videos/${video.meta.slug}`;

  return {
    title: `${video.meta.title} | ${siteConfig.name}`,
    description: video.meta.description,
    alternates: { canonical },
    openGraph: {
      type: "video.other",
      title: video.meta.title,
      description: video.meta.description,
      url: canonical,
      images: video.meta.thumbnail ? [video.meta.thumbnail] : [],
    },
    twitter: {
      card: video.meta.thumbnail ? "summary_large_image" : "summary",
      title: video.meta.title,
      description: video.meta.description,
      images: video.meta.thumbnail ? [video.meta.thumbnail] : [],
    },
  };
}

export default async function VideoPage({ params }: PageProps) {
  const { slug } = await params;
  const baseUrl = getBaseUrl();
  const video = getVideoBySlug(slug);

  if (!video) {
    notFound();
  }

  const watchUrl = `${baseUrl}/videos/${video.meta.slug}`;
  const embedUrl = getYouTubeEmbedUrl(video.meta.videoId);
  const isoDuration = toIsoDuration(video.meta.duration);

  const videoObjectSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.meta.title,
    description: video.meta.description,
    uploadDate: video.meta.date,
    ...(isoDuration ? { duration: isoDuration } : {}),
    ...(video.meta.thumbnail ? { thumbnailUrl: [video.meta.thumbnail] } : {}),
    ...(video.meta.url ? { contentUrl: video.meta.url } : {}),
    ...(embedUrl ? { embedUrl } : {}),
    url: watchUrl,
    mainEntityOfPage: watchUrl,
    inLanguage: "en-US",
    isFamilyFriendly: true,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.svg`,
      },
    },
    potentialAction: {
      "@type": "WatchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: watchUrl,
      },
    },
  } as const;

  const breadcrumbSchema = buildBreadcrumbSchema({
    baseUrl,
    items: [
      { name: "Home", url: "/" },
      { name: "Videos", url: "/videos" },
      { name: video.meta.title, url: `/videos/${video.meta.slug}` },
    ],
  });

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${watchUrl}#webpage`,
    url: watchUrl,
    name: video.meta.title,
    description: video.meta.description,
    primaryImageOfPage: video.meta.thumbnail,
    isPartOf: {
      "@type": "CollectionPage",
      url: `${baseUrl}/videos`,
      name: "Videos",
    },
  } as const;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <Script
          id="video-object-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoObjectSchema) }}
        />
        <Script
          id="breadcrumb-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <Script
          id="video-webpage-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
        />

        <article className="container max-w-5xl py-12 md:py-20">
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/videos" className="hover:text-primary">
                  Videos
                </Link>
              </li>
              <li>/</li>
              <li className="text-foreground">{video.meta.title}</li>
            </ol>
          </nav>

          <header className="mb-10">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <Badge variant="secondary" className="capitalize">
                {video.meta.platform}
              </Badge>
            </div>

            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              {video.meta.title}
            </h1>

            {video.meta.description && (
              <p className="mb-6 text-xl text-muted-foreground">
                {video.meta.description}
              </p>
            )}

            <div className="flex flex-wrap gap-3">
              {video.meta.url && (
                <Button asChild>
                  <a href={video.meta.url} target="_blank" rel="noopener noreferrer">
                    Watch on {video.meta.platform}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              )}
              <Button asChild variant="outline">
                <Link href="/videos">Back to Videos</Link>
              </Button>
            </div>
          </header>

          {embedUrl ? (
            <div className="relative mb-10 overflow-hidden rounded-xl bg-black shadow-lg">
              <div className="aspect-video w-full">
                <iframe
                  src={embedUrl}
                  title={video.meta.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
            </div>
          ) : video.meta.thumbnail ? (
            <div className="relative mb-10 overflow-hidden rounded-xl bg-black shadow-lg">
              <div className="aspect-video w-full relative">
                <Image
                  src={video.meta.thumbnail}
                  alt={video.meta.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
                  priority
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <PlayCircle className="h-16 w-16 text-white/90" />
                </div>
              </div>
            </div>
          ) : null}

          <MDXContent source={video.content} />
        </article>

        <Footer />
      </main>
    </>
  );
}
