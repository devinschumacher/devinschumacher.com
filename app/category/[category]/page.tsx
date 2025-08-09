import { getAllPosts } from '@/lib/blog';
import { urlMappings } from '@/lib/url-mappings';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, ArrowRight, FileText, Tag } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/site.config';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  
  // Get categories from posts
  const postCategories = posts
    .map(post => post.category)
    .filter(Boolean);
  
  // Add hardcoded categories that might be referenced in URL mappings
  const additionalCategories = [
    'SEO',
    'Best',
    'Reviews', 
    'Comparison',
    'Guides',
    'Search Volume' // Add this since it's being requested
  ];
  
  // Combine and deduplicate
  const allCategories = [...new Set([...postCategories, ...additionalCategories])];
  
  return allCategories.map((category) => ({
    category: category!.toLowerCase().replace(/\s+/g, '-'),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const categoryName = category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  return {
    title: `${categoryName} Articles | ${siteConfig.name}`,
    description: `Browse all ${categoryName} articles and guides.`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const posts = getAllPosts();
  const categorySlug = category;
  const categoryName = categorySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  // Filter posts by category (case-insensitive)
  const categoryPosts = posts.filter(post => 
    post.category?.toLowerCase().replace(/\s+/g, '-') === categorySlug
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="border-b bg-gradient-to-b from-primary/5 to-background">
          <div className="container py-16 md:py-24">
            <div className="mx-auto max-w-4xl text-center">
              <Badge className="mb-4" variant="secondary">
                <Tag className="mr-1 h-3 w-3" />
                Category
              </Badge>
              <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
                {categoryName}
              </h1>
              <p className="text-lg text-muted-foreground">
                {categoryPosts.length} {categoryPosts.length === 1 ? 'article' : 'articles'} in this category
              </p>
            </div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="container py-12 md:py-20">
          <div className="mx-auto max-w-6xl">
            {categoryPosts.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-lg text-muted-foreground">
                  No posts found in this category.
                </p>
                <Link href="/blog" className="mt-4 inline-block text-primary hover:underline">
                  ← Back to all posts
                </Link>
              </div>
            ) : (
              <>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {categoryPosts.map((post) => {
                    // Use the frontmatter slug directly if it exists
                    let postUrl;
                    
                    if (post.customSlug) {
                      // Use the custom slug from frontmatter directly
                      postUrl = post.customSlug.startsWith('/') ? post.customSlug : `/${post.customSlug}`;
                      if (!postUrl.endsWith('/')) {
                        postUrl += '/';
                      }
                    } else {
                      // Check if this post's content path has a direct URL mapping
                      const contentPath = post.slug;
                      const directUrl = Object.keys(urlMappings).find(url => 
                        urlMappings[url] === contentPath
                      );
                      
                      if (directUrl) {
                        postUrl = directUrl;
                      } else {
                        // Use the default blog route
                        postUrl = `/blog/${post.slug}/`;
                      }
                    }
                    
                    return (
                    <Link key={post.slug} href={postUrl}>
                      <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1 overflow-hidden">
                        {post.image ? (
                          <div className="aspect-video w-full overflow-hidden relative">
                            <Image
                              src={post.image}
                              alt={post.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          </div>
                        ) : (
                          <div className="aspect-video w-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                            <div className="text-center p-6">
                              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                                <FileText className="h-8 w-8 text-primary/60" />
                              </div>
                              {post.category && (
                                <Badge variant="secondary" className="text-xs">
                                  {post.category}
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}
                        <CardHeader>
                          <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                          <CardDescription className="line-clamp-3">
                            {post.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              <span>{post.author}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <time dateTime={post.date}>
                                {format(new Date(post.date), 'MMM d, yyyy')}
                              </time>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{post.readingTime}</span>
                            </div>
                          </div>
                          <div className="mt-4 flex items-center text-sm font-medium text-primary">
                            Read more
                            <ArrowRight className="ml-1 h-4 w-4" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                    );
                  })}
                </div>
                
                <div className="mt-12 text-center">
                  <Link href="/blog">
                    <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                      ← View all posts
                    </Badge>
                  </Link>
                </div>
              </>
            )}
          </div>
        </section>
        
        <Footer />
      </main>
    </>
  );
}