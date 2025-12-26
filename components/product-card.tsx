import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Sparkles } from "lucide-react";
import type { ProductMeta } from "@/lib/products";

export function ProductCard({ product }: { product: ProductMeta }) {
  return (
    <Card className="group relative overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 h-full">
      <Link href={`/products/${product.slug}`} className="block">
        {product.image ? (
          <div className="aspect-video w-full overflow-hidden relative bg-muted">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={product.featured}
            />
          </div>
        ) : (
          <div className="aspect-video w-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <Sparkles className="h-7 w-7 text-primary/60" />
            </div>
          </div>
        )}
      </Link>

      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <Badge variant="secondary" className="capitalize">
            {product.category.replace(/-/g, " ")}
          </Badge>
          {product.badge && (
            <Badge variant="outline" className="text-xs">
              {product.badge}
            </Badge>
          )}
        </div>

        <Link href={`/products/${product.slug}`}>
          <CardTitle className="mt-3 line-clamp-2 text-2xl group-hover:text-primary transition-colors">
            {product.title}
          </CardTitle>
        </Link>

        {product.description && (
          <CardDescription className="mt-2 line-clamp-2 text-base">
            {product.description}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent>
        {(product.price || product.originalPrice) && (
          <div className="mb-5 flex items-baseline gap-2">
            {product.price && (
              <span className="text-xl font-semibold">
                {product.currency ? `${product.currency} ` : ""}
                {product.price}
              </span>
            )}
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {product.currency ? `${product.currency} ` : ""}
                {product.originalPrice}
              </span>
            )}
          </div>
        )}

        {product.highlights && product.highlights.length > 0 && (
          <ul className="mb-6 text-sm text-muted-foreground space-y-1">
            {product.highlights.slice(0, 4).map((highlight) => (
              <li key={highlight} className="line-clamp-1">
                {highlight}
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap gap-2">
          <Button asChild variant="secondary" className="flex-1 min-w-[140px]">
            <Link href={`/products/${product.slug}`}>View</Link>
          </Button>
          {product.url && (
            <Button asChild variant="outline" className="flex-1 min-w-[140px]">
              <a href={product.url} target="_blank" rel="noopener noreferrer">
                {product.cta || "Learn More"}
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

