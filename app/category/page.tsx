import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getAllPosts } from "@/lib/blog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function CategoriesPage() {
  const posts = await getAllPosts();
  
  // Get unique categories with post counts
  const categoryMap = new Map<string, number>();
  posts.forEach(post => {
    if (post.category) {
      const count = categoryMap.get(post.category) || 0;
      categoryMap.set(post.category, count + 1);
    }
  });
  
  // Convert to array and sort by post count
  const categories = Array.from(categoryMap.entries())
    .map(([name, count]) => ({ name, count, slug: name.toLowerCase().replace(/\s+/g, '-') }))
    .sort((a, b) => b.count - a.count);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <section className="container py-20 md:py-28">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
                Categories
              </h1>
              <p className="text-lg text-muted-foreground">
                Browse content by category
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {categories.map((category) => (
                <Link key={category.slug} href={`/category/${category.slug}`}>
                  <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">{category.name}</CardTitle>
                        <Badge variant="secondary">{category.count} posts</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-primary">
                        <span className="text-sm font-medium">View posts</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {categories.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No categories found.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}