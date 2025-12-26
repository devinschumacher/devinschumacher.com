import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Clock, PlayCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface Video {
  slug?: string;
  title: string;
  description?: string;
  thumbnail?: string;
  url: string;
  platform: 'youtube' | 'tiktok' | 'instagram' | 'vimeo' | 'other';
  duration?: string;
  views?: string;
  category?: string;
  featured?: boolean;
  publishedAt?: string;
}

interface VideoCardProps {
  video: Video;
  showDescription?: boolean;
  showMetadata?: boolean;
  categoryColors?: Record<string, string>;
}

const platformIcons = {
  youtube: (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
  tiktok: (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  ),
  instagram: (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.405a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
    </svg>
  ),
  vimeo: (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.977 6.416c-.105 2.338-1.74 5.54-4.905 9.604-3.274 4.25-6.045 6.373-8.312 6.373-1.404 0-2.59-1.295-3.557-3.885-.647-2.372-1.295-4.744-1.943-7.116-.72-2.59-1.49-3.885-2.316-3.885-.18 0-.807.376-1.882 1.127L0 6.202c1.187-1.043 2.36-2.087 3.52-3.13 1.587-1.376 2.78-2.105 3.58-2.19 1.88-.18 3.04 1.105 3.48 3.855.47 2.97.8 4.82.99 5.55.55 2.5 1.16 3.75 1.83 3.75.52 0 1.3-.82 2.34-2.46 1.04-1.64 1.6-2.89 1.68-3.75.15-1.42-.41-2.13-1.68-2.13-.6 0-1.22.14-1.86.41 1.24-4.06 3.61-6.03 7.1-5.91 2.59.07 3.82 1.76 3.71 5.06z"/>
    </svg>
  ),
  other: (
    <PlayCircle className="h-4 w-4" />
  )
};

export function VideoCard({ 
  video, 
  showDescription = true,
  showMetadata = false,
  categoryColors = {}
}: VideoCardProps) {
  const href = video.slug ? `/videos/${video.slug}` : video.url;
  const isExternal = !video.slug && href.startsWith("http");

  return (
    <Link
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group"
    >
      <Card className="h-full overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          {video.thumbnail ? (
            <Image 
              src={video.thumbnail} 
              alt={video.title}
              width={480}
              height={270}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <PlayCircle className="h-12 w-12 text-primary/50" />
            </div>
          )}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all flex items-center justify-center">
            <svg className="h-12 w-12 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"/>
              <polygon points="10,8 16,12 10,16"/>
            </svg>
          </div>
          {video.duration && (
            <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
              {video.duration}
            </span>
          )}
        </div>
        
        {(video.title || video.category) && (
          <CardHeader className={showMetadata ? "pb-3" : ""}>
            <div className="flex items-start justify-between gap-2">
              {video.category && categoryColors[video.category] && (
                <Badge 
                  className={`${categoryColors[video.category]} mb-2`}
                  variant="secondary"
                >
                  {video.category}
                </Badge>
              )}
              <div className="flex items-center gap-1">
                {platformIcons[video.platform]}
              </div>
            </div>
            {video.title && (
              <CardTitle className="text-base line-clamp-2 group-hover:text-primary transition-colors">
                {video.title}
              </CardTitle>
            )}
          </CardHeader>
        )}
        
        {(showDescription || showMetadata) && (
          <CardContent>
            {showDescription && video.description && (
              <CardDescription className="line-clamp-2 mb-3">
                {video.description}
              </CardDescription>
            )}
            {showMetadata && video.views && (
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {video.views} views
                </span>
              </div>
            )}
          </CardContent>
        )}
      </Card>
    </Link>
  );
}
