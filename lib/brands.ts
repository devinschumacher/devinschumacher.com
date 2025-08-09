import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const brandsDirectory = path.join(process.cwd(), 'content/brands');

export interface BrandMeta {
  slug: string;
  name: string;
  description: string;
  logo?: string;
  url?: string;
  category?: 'client' | 'partner' | 'sponsor' | 'feature';
  featured?: boolean;
  order?: number;
}

export function getAllBrands(): BrandMeta[] {
  if (!fs.existsSync(brandsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(brandsDirectory);
  const allBrandsData = fileNames
    .filter((fileName) => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, '');
      const fullPath = path.join(brandsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        name: data.name || slug,
        description: data.description || '',
        logo: data.logo,
        url: data.url,
        category: data.category,
        featured: data.featured || false,
        order: data.order || 999,
      };
    });

  return allBrandsData.sort((a, b) => {
    // Sort by order first, then by name
    if (a.order !== b.order) {
      return a.order - b.order;
    }
    return a.name.localeCompare(b.name);
  });
}

export function getFeaturedBrands(limit?: number): BrandMeta[] {
  const brands = getAllBrands().filter(brand => brand.featured);
  return limit ? brands.slice(0, limit) : brands;
}

export function getBrandsByCategory(category: string): BrandMeta[] {
  return getAllBrands().filter(brand => brand.category === category);
}

export function getBrandBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx?$/, '');
  const fullPath = path.join(brandsDirectory, `${realSlug}.mdx`);
  const mdPath = path.join(brandsDirectory, `${realSlug}.md`);
  
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
      name: data.name || realSlug,
      description: data.description || '',
      logo: data.logo,
      url: data.url,
      category: data.category,
      featured: data.featured || false,
      order: data.order || 999,
    },
  };
}