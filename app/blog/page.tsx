import { getAllPosts } from '@/lib/blog';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { BlogPageClient } from '@/components/BlogPageClient';
import { siteConfig } from '@/site.config';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Blog | ${siteConfig.name}`,
  description: 'Read our latest articles.',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <section className="border-b bg-gradient-to-b from-primary/5 to-background">
          <div className="container py-16 md:py-24">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
                Blog
              </h1>
              <p className="text-lg text-muted-foreground">
                Tips, tutorials, and insights about downloading Loom videos and more
              </p>
            </div>
          </div>
        </section>

        <BlogPageClient posts={posts} />
        
        <Footer />
      </main>
    </>
  );
}