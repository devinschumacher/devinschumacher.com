import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { getNetworkBrands } from "@/lib/network-brands";
import { siteConfig } from "@/site.config";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: `Brands | ${siteConfig.name}`,
  description: `Browse sites and products in the ${siteConfig.name} network.`,
  alternates: {
    canonical: `${siteConfig.url}/brands/`,
  },
  openGraph: {
    type: "website",
    locale: siteConfig.metadata.openGraph.locale,
    url: `${siteConfig.url}/brands/`,
    title: `Brands | ${siteConfig.name}`,
    description: `Browse sites and products in the ${siteConfig.name} network.`,
    siteName: siteConfig.metadata.openGraph.siteName,
  },
  twitter: {
    card: siteConfig.metadata.twitter.card,
    title: `Brands | ${siteConfig.name}`,
    description: `Browse sites and products in the ${siteConfig.name} network.`,
  },
};

export default function BrandsPage() {
  const brands = getNetworkBrands();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <section className="border-b bg-gradient-to-b from-primary/5 to-background">
          <div className="container py-12 md:py-20">
            <div className="mx-auto max-w-4xl">
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-primary">
                Network
              </p>
              <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Brands
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                A collection of sites and products in the {siteConfig.name} ecosystem.
              </p>
            </div>
          </div>
        </section>

        <section className="container py-12 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {brands.map((brand) => (
                <article
                  key={brand.slug}
                  className="rounded-lg border border-border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
                >
                  <a
                    href={brand.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col justify-between gap-6"
                  >
                    <div>
                      <h2 className="text-lg font-bold leading-7 text-foreground group-hover:text-primary">
                        {brand.name}
                      </h2>
                      <p className="mt-2 break-words text-sm text-muted-foreground">
                        {brand.hostname}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                      Visit
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
