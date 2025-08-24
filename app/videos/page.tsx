import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { VideoCard, type Video } from "@/components/video-card";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const videos: Video[] = [
  {
    title: "",
    thumbnail: "https://img.youtube.com/vi/NcZYnZHl4w8/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=NcZYnZHl4w8",
    platform: "youtube"
  },
  {
    title: "",
    thumbnail: "https://img.youtube.com/vi/GTaOBy7mxF0/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=GTaOBy7mxF0",
    platform: "youtube"
  },
  {
    title: "",
    thumbnail: "https://img.youtube.com/vi/2Wr5IqQogW8/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=2Wr5IqQogW8",
    platform: "youtube"
  },
  {
    title: "",
    thumbnail: "https://img.youtube.com/vi/GPyYrxMUeRE/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=GPyYrxMUeRE",
    platform: "youtube"
  },
  {
    title: "",
    thumbnail: "https://img.youtube.com/vi/JQtS5dHpMjU/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=JQtS5dHpMjU",
    platform: "youtube"
  }
];

const categoryColors: Record<string, string> = {
  'seo': 'bg-green-500/10 text-green-700 dark:text-green-400',
  'ai': 'bg-purple-500/10 text-purple-700 dark:text-purple-400',
  'programming': 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
  'entrepreneurship': 'bg-orange-500/10 text-orange-700 dark:text-orange-400',
  'marketing': 'bg-pink-500/10 text-pink-700 dark:text-pink-400',
  'lifestyle': 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-400'
};

const platformIcons = {
  youtube: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
  tiktok: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  ),
  instagram: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.405a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
    </svg>
  )
};

export default function VideosPage() {
  const allVideos = videos;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Header Section */}
        <section className="border-b bg-gradient-to-b from-primary/5 to-background">
          <div className="container py-12 md:py-20">
            <Button variant="ghost" size="sm" className="mb-6" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                back to home
              </Link>
            </Button>
            <div className="mx-auto max-w-4xl">
              <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                videos
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                educational content on seo, ai, programming, and entrepreneurship
              </p>
              
              {/* Platform Links */}
              <div className="mt-8 flex flex-wrap gap-4">
                <Button variant="outline" size="sm" asChild>
                  <Link href="https://youtube.com/@devinschumacher" target="_blank" rel="noopener noreferrer">
                    {platformIcons.youtube}
                    <span className="ml-2">youtube</span>
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="https://tiktok.com/@dvnschmchr" target="_blank" rel="noopener noreferrer">
                    {platformIcons.tiktok}
                    <span className="ml-2">tiktok</span>
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="https://instagram.com/dvnschmchr" target="_blank" rel="noopener noreferrer">
                    {platformIcons.instagram}
                    <span className="ml-2">instagram</span>
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* All Videos */}
        <section className="container py-12 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {allVideos.map((video, index) => (
                <VideoCard
                  key={index}
                  video={video}
                  showDescription={true}
                  showMetadata={true}
                  categoryColors={categoryColors}
                />
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}