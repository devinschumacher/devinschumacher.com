import { notFound } from 'next/navigation';
import { getPostBySlug } from '@/lib/blog';
import { getContentPath, getAllUrlPaths } from '@/lib/url-mappings';
import { MDXContent } from '@/components/mdx-content';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, Tag } from 'lucide-react';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/site.config';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const paths = getAllUrlPaths();
  
  // Filter for /best/* paths only
  return paths
    .filter(path => path.startsWith('/best/'))
    .map((path) => ({
      slug: path.replace('/best/', '').replace(/\/$/, ''),
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const slugPath = `/best/${slug}/`;
  const contentPath = getContentPath(slugPath);
  
  if (!contentPath) {
    return {
      title: 'Not Found',
    };
  }

  const post = getPostBySlug(contentPath);
  
  if (!post) {
    return {
      title: 'Not Found',
    };
  }

  return {
    title: `${post.meta.title} | ${siteConfig.name}`,
    description: post.meta.description,
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      type: 'article',
      publishedTime: post.meta.date,
      authors: [post.meta.author],
    },
  };
}

export default async function BestPostPage({ params }: PageProps) {
  const { slug } = await params;
  const slugPath = `/best/${slug}/`;
  const contentPath = getContentPath(slugPath);
  
  if (!contentPath) {
    notFound();
  }

  const post = getPostBySlug(contentPath);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <article className="container py-12 md:py-20">
          <div className="mx-auto max-w-4xl">
            {/* Article Header */}
            <header className="mb-12">
              <Link href="/category/best">
                <Badge className="mb-4 cursor-pointer hover:bg-secondary/80 transition-colors" variant="secondary">
                  Best Of
                </Badge>
              </Link>
              
              <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
                {post.meta.title}
              </h1>
              
              {post.meta.description && (
                <p className="mb-8 text-xl text-muted-foreground">
                  {post.meta.description}
                </p>
              )}

              {/* Article Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{post.meta.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={post.meta.date}>
                    {format(new Date(post.meta.date), 'MMMM d, yyyy')}
                  </time>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.meta.readingTime}</span>
                </div>
              </div>

              {/* Tags */}
              {post.meta.tags && Array.isArray(post.meta.tags) && post.meta.tags.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {post.meta.tags.map((tag: string) => (
                    <Badge key={tag} variant="outline">
                      <Tag className="mr-1 h-3 w-3" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </header>

            {/* Featured Image */}
            {post.meta.image && (
              <div className="mb-12 overflow-hidden rounded-lg">
                <Image
                  src={post.meta.image}
                  alt={post.meta.title}
                  width={1200}
                  height={630}
                  className="w-full"
                  priority
                />
              </div>
            )}

            {/* Article Content */}
            <MDXContent source={post.content} />
          </div>
        </article>
        
        <Footer />
      </main>
    </>
  );
}