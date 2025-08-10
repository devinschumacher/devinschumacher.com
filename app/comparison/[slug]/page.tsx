import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/blog';
import { getContentPath, getAllUrlPaths } from '@/lib/url-mappings';
import { MDXContent } from '@/components/mdx-content';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, User, Tag, ArrowRight } from 'lucide-react';
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
  
  // Filter for /comparison/* paths only
  return paths
    .filter(path => path.startsWith('/comparison/'))
    .map((path) => ({
      slug: path.replace('/comparison/', '').replace(/\/$/, ''),
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const slugPath = `/comparison/${slug}/`;
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

export default async function ComparisonPostPage({ params }: PageProps) {
  const { slug } = await params;
  const slugPath = `/comparison/${slug}/`;
  const contentPath = getContentPath(slugPath);
  
  if (!contentPath) {
    notFound();
  }

  const post = getPostBySlug(contentPath);

  if (!post) {
    notFound();
  }

  // Get related posts
  const allPosts = getAllPosts();
  const relatedPosts = allPosts
    .filter(p => 
      p.slug !== post.slug && // Not the current post
      (
        // Same category
        (p.category && post.meta.category && 
         p.category.toLowerCase() === post.meta.category.toLowerCase()) ||
        // Or share at least one tag
        (p.tags && Array.isArray(p.tags) && 
         post.meta.tags && Array.isArray(post.meta.tags) && 
         p.tags.some(tag => post.meta.tags?.includes(tag)))
      )
    )
    .slice(0, 3); // Get max 3 related posts

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <article className="container py-12 md:py-20">
          <div className="mx-auto max-w-4xl">
            {/* Article Header */}
            <header className="mb-12">
              <Link href="/category/comparison">
                <Badge className="mb-4 cursor-pointer hover:bg-secondary/80 transition-colors" variant="secondary">
                  Comparison
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

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="mt-20 border-t pt-12">
              <div className="mx-auto max-w-4xl">
                <h2 className="mb-8 text-3xl font-bold">Related Posts</h2>
                <div className="grid gap-6 md:grid-cols-3">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.slug}
                      href={relatedPost.slug}
                      className="group"
                    >
                      <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1">
                        <CardHeader>
                          {relatedPost.category && (
                            <Badge variant="secondary" className="mb-2 w-fit">
                              {relatedPost.category}
                            </Badge>
                          )}
                          <CardTitle className="line-clamp-2 text-lg group-hover:text-primary transition-colors">
                            {relatedPost.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="line-clamp-3 mb-4">
                            {relatedPost.description}
                          </CardDescription>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>{relatedPost.readingTime}</span>
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}
        </article>
        
        <Footer />
      </main>
    </>
  );
}