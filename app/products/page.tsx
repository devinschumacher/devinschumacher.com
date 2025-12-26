import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/site.config";
import { getAllProducts } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

export const metadata: Metadata = {
  title: `Products | ${siteConfig.name}`,
  description: "Tools, templates, and courses.",
};

export default function ProductsPage() {
  const products = getAllProducts();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <section className="border-b bg-gradient-to-b from-primary/5 to-background">
          <div className="container py-16 md:py-24">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
                Products
              </h1>
              <p className="text-lg text-muted-foreground">
                Tools, templates, and courses I&apos;ve built and recommend
              </p>
            </div>
          </div>
        </section>

        <section className="container py-12 md:py-20">
          <div className="mx-auto max-w-6xl">
            {products.length === 0 ? (
              <p className="text-muted-foreground">No products found.</p>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}

