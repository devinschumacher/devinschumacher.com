import { getPostBySlug, getAllPosts } from '@/lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, FileText } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/site.config';

const components = {
  h1: ({ children }: any) => (
    <h1 className="mb-6 text-4xl font-bold tracking-tight">{children}</h1>
  ),
  h2: ({ children }: any) => (
    <h2 className="mb-4 mt-8 text-3xl font-semibold tracking-tight">{children}</h2>
  ),
  h3: ({ children }: any) => (
    <h3 className="mb-3 mt-6 text-2xl font-semibold tracking-tight">{children}</h3>
  ),
  h4: ({ children }: any) => (
    <h4 className="mb-2 mt-4 text-xl font-semibold tracking-tight">{children}</h4>
  ),
  p: ({ children }: any) => (
    <p className="mb-4 leading-7">{children}</p>
  ),
  a: ({ href, children }: any) => (
    <Link
      href={href as string}
      className="font-medium text-primary underline underline-offset-4 hover:no-underline"
    >
      {children}
    </Link>
  ),
  ul: ({ children }: any) => (
    <ul className="mb-4 ml-6 list-disc space-y-2">{children}</ul>
  ),
  ol: ({ children }: any) => (
    <ol className="mb-4 ml-6 list-decimal space-y-2">{children}</ol>
  ),
  li: ({ children }: any) => (
    <li className="leading-7">{children}</li>
  ),
  blockquote: ({ children }: any) => (
    <blockquote className="my-6 border-l-4 border-primary pl-6 italic">
      {children}
    </blockquote>
  ),
  code: ({ children }: any) => (
    <code className="rounded bg-muted px-1 py-0.5 font-mono text-sm">
      {children}
    </code>
  ),
  pre: ({ children }: any) => (
    <pre className="mb-4 overflow-x-auto rounded-lg bg-muted p-4">
      {children}
    </pre>
  ),
  img: ({ src, alt }: any) => (
    <Image
      src={src as string}
      alt={alt as string}
      width={800}
      height={400}
      className="my-8 rounded-lg"
    />
  ),
  hr: () => <hr className="my-8 border-t border-border" />,
  table: ({ children }: any) => (
    <div className="mb-4 overflow-x-auto">
      <table className="w-full border-collapse">{children}</table>
    </div>
  ),
  th: ({ children }: any) => (
    <th className="border border-border bg-muted px-4 py-2 text-left font-semibold">
      {children}
    </th>
  ),
  td: ({ children }: any) => (
    <td className="border border-border px-4 py-2">{children}</td>
  ),
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
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
      images: post.meta.image ? [post.meta.image] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.meta.title,
      description: post.meta.description,
      images: post.meta.image ? [post.meta.image] : [],
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <article className="container max-w-4xl py-12 md:py-20">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/blog" className="hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>/</li>
              <li className="text-foreground">{post.meta.title}</li>
            </ol>
          </nav>

          {/* Hero Image or Fallback */}
          {post.meta.image ? (
            <div className="mb-12 aspect-video w-full overflow-hidden rounded-lg relative">
              <Image
                src={post.meta.image}
                alt={post.meta.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
            </div>
          ) : (
            <div className="mb-12 aspect-video w-full rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-6">
                  <FileText className="h-10 w-10 text-primary/60" />
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {post.meta.tags.slice(0, 3).map((tag: string) => (
                    <Badge key={tag} variant="secondary" className="text-sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Post Header */}
          <header className="mb-12">
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              {post.meta.title}
            </h1>
            
            <p className="mb-6 text-xl text-muted-foreground">
              {post.meta.description}
            </p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{post.meta.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.meta.date}>
                  {format(new Date(post.meta.date), 'MMMM d, yyyy')}
                </time>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.meta.readingTime}</span>
              </div>
            </div>

            {/* Tags */}
            {post.meta.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {post.meta.tags.map((tag: string) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </header>

          {/* Post Content */}
          <div className="prose prose-gray max-w-none dark:prose-invert">
            <MDXRemote source={post.content} components={components} />
          </div>

          {/* Post Footer */}
          <footer className="mt-12 border-t pt-8">
            <div className="flex items-center justify-between">
              <Link
                href="/blog"
                className="text-sm font-medium text-primary hover:underline"
              >
                ← Back to Blog
              </Link>
              <div className="flex gap-4">
                <Link
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    post.meta.title
                  )}&url=${encodeURIComponent(
                    `${siteConfig.url}/blog/${post.meta.slug}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Share on Twitter
                </Link>
              </div>
            </div>
          </footer>
        </article>
        
        <Footer />
      </main>
    </>
  );
}