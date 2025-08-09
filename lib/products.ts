import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const productsDirectory = path.join(process.cwd(), 'content/products');

export interface ProductMeta {
  slug: string;
  title: string;
  description: string;
  category: 'course' | 'ebook' | 'template' | 'service' | 'other';
  price?: string;
  originalPrice?: string;
  currency?: string;
  image?: string;
  url?: string;
  cta?: string;
  tags: string[];
  featured?: boolean;
  badge?: string;
  highlights?: string[];
}

export function getAllProducts(): ProductMeta[] {
  if (!fs.existsSync(productsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(productsDirectory);
  const allProductsData = fileNames
    .filter((fileName) => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, '');
      const fullPath = path.join(productsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || slug,
        description: data.description || '',
        category: data.category || 'other',
        price: data.price,
        originalPrice: data.originalPrice,
        currency: data.currency || 'USD',
        image: data.image,
        url: data.url,
        cta: data.cta || 'Learn More',
        tags: data.tags || [],
        featured: data.featured || false,
        badge: data.badge,
        highlights: data.highlights || [],
      };
    });

  return allProductsData.sort((a, b) => {
    // Featured products first
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });
}

export function getFeaturedProducts(limit: number = 3): ProductMeta[] {
  return getAllProducts()
    .filter(product => product.featured)
    .slice(0, limit);
}

export function getProductBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx?$/, '');
  const fullPath = path.join(productsDirectory, `${realSlug}.mdx`);
  const mdPath = path.join(productsDirectory, `${realSlug}.md`);
  
  let fileContents;
  if (fs.existsSync(fullPath)) {
    fileContents = fs.readFileSync(fullPath, 'utf8');
  } else if (fs.existsSync(mdPath)) {
    fileContents = fs.readFileSync(mdPath, 'utf8');
  } else {
    return null;
  }

  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    content,
    meta: {
      slug: realSlug,
      title: data.title || realSlug,
      description: data.description || '',
      category: data.category || 'other',
      price: data.price,
      originalPrice: data.originalPrice,
      currency: data.currency || 'USD',
      image: data.image,
      url: data.url,
      cta: data.cta || 'Learn More',
      tags: data.tags || [],
      featured: data.featured || false,
      badge: data.badge,
      highlights: data.highlights || [],
    },
  };
}