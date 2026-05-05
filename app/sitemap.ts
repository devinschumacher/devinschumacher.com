import { MetadataRoute } from 'next';
import { siteConfig } from '@/site.config';
import { getAllPosts } from '@/lib/blog';
import { getStaticPageSitemapEntries } from '@/lib/static-pages';

// Force static generation for sitemap with static export
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const posts = getAllPosts();

  const staticPages = getStaticPageSitemapEntries(baseUrl);

  // Blog posts
  const blogPosts = posts.map((post) => {
    const postPath = post.url ?? `/blog/${post.slug.replace(/^\/|\/$/g, '')}/`;
    const normalizedPath = postPath.startsWith('/') ? postPath : `/${postPath}`;

    return {
      url: `${baseUrl}${normalizedPath}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    };
  });

  return [...staticPages, ...blogPosts];
}
