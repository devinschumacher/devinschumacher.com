import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Sparkles } from "lucide-react";
import { siteConfig } from "@/site.config";
import { getAllProducts, getProductBySlug } from "@/lib/products";
import { MDXContent } from "@/components/mdx-content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: `${product.meta.title} | ${siteConfig.name}`,
    description: product.meta.description,
    openGraph: {
      title: product.meta.title,
      description: product.meta.description,
      type: "article",
      images: product.meta.image ? [product.meta.image] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: product.meta.title,
      description: product.meta.description,
      images: product.meta.image ? [product.meta.image] : [],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <article className="container max-w-5xl py-12 md:py-20">
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/products" className="hover:text-primary">
                  Products
                </Link>
              </li>
              <li>/</li>
              <li className="text-foreground">{product.meta.title}</li>
            </ol>
          </nav>

          {product.meta.image ? (
            <div className="mb-10 aspect-video w-full overflow-hidden rounded-lg relative bg-muted">
              <Image
                src={product.meta.image}
                alt={product.meta.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
                priority
              />
            </div>
          ) : (
            <div className="mb-10 aspect-video w-full rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <Sparkles className="h-10 w-10 text-primary/60" />
              </div>
            </div>
          )}

          <header className="mb-10">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <Badge variant="secondary" className="capitalize">
                {product.meta.category.replace(/-/g, " ")}
              </Badge>
              {product.meta.badge && (
                <Badge variant="outline">{product.meta.badge}</Badge>
              )}
            </div>

            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              {product.meta.title}
            </h1>

            {product.meta.description && (
              <p className="mb-6 text-xl text-muted-foreground">
                {product.meta.description}
              </p>
            )}

            {(product.meta.price || product.meta.originalPrice) && (
              <div className="mb-6 flex items-baseline gap-2">
                {product.meta.price && (
                  <span className="text-2xl font-semibold">
                    {product.meta.currency ? `${product.meta.currency} ` : ""}
                    {product.meta.price}
                  </span>
                )}
                {product.meta.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    {product.meta.currency ? `${product.meta.currency} ` : ""}
                    {product.meta.originalPrice}
                  </span>
                )}
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              {product.meta.url && (
                <Button asChild>
                  <a href={product.meta.url} target="_blank" rel="noopener noreferrer">
                    {product.meta.cta || "Learn More"}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              )}
              <Button asChild variant="outline">
                <Link href="/products">Back to Products</Link>
              </Button>
            </div>
          </header>

          {product.meta.highlights && product.meta.highlights.length > 0 && (
            <section className="mb-10">
              <Card>
                <CardHeader>
                  <CardTitle>Highlights</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="ml-6 list-disc space-y-2 text-muted-foreground">
                    {product.meta.highlights.map((highlight: string) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </section>
          )}

          <MDXContent source={product.content} />
        </article>

        <Footer />
      </main>
    </>
  );
}
