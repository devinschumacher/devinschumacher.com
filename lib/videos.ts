import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const videosDirectory = path.join(process.cwd(), 'content/videos');

export interface VideoMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  platform: 'youtube' | 'tiktok' | 'instagram' | 'vimeo' | 'other';
  videoId?: string;
  url: string;
  thumbnail?: string;
  duration?: string;
  views?: string;
  tags: string[];
  featured?: boolean;
}

export function getAllVideos(): VideoMeta[] {
  if (!fs.existsSync(videosDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(videosDirectory);
  const allVideosData = fileNames
    .filter((fileName) => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, '');
      const fullPath = path.join(videosDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || slug,
        description: data.description || '',
        date: data.date || new Date().toISOString(),
        platform: data.platform || 'youtube',
        videoId: data.videoId,
        url: data.url || '',
        thumbnail: data.thumbnail,
        duration: data.duration,
        views: data.views,
        tags: data.tags || [],
        featured: data.featured || false,
      };
    });

  return allVideosData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getFeaturedVideos(limit: number = 3): VideoMeta[] {
  return getAllVideos()
    .filter(video => video.featured)
    .slice(0, limit);
}

export function getVideoBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx?$/, '');
  const fullPath = path.join(videosDirectory, `${realSlug}.mdx`);
  const mdPath = path.join(videosDirectory, `${realSlug}.md`);
  
  let fileContents;
  if (fs.existsSync(fullPath)) {
    fileContents = fs.readFileSync(fullPath, 'utf8');
  } else if (fs.existsSync(mdPath)) {
    fileContents = fs.readFileSync(mdPath, 'utf8');
  } else {
    return null;
  }

  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    content,
    meta: {
      slug: realSlug,
      title: data.title || realSlug,
      description: data.description || '',
      date: data.date || new Date().toISOString(),
      platform: data.platform || 'youtube',
      videoId: data.videoId,
      url: data.url || '',
      thumbnail: data.thumbnail,
      duration: data.duration,
      views: data.views,
      tags: data.tags || [],
      featured: data.featured || false,
    },
  };
}
