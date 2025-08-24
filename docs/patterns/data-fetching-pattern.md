# Data Fetching Pattern

Patterns for fetching and managing data in Next.js applications, including static generation, server components, and client-side fetching.

## Pattern Overview

Different data fetching strategies based on data requirements and update frequency.

## Related Files
- `lib/blog.ts`
- `lib/products.ts`
- `lib/videos.ts`
- `app/blog/[slug]/page.tsx`

## Server-Side Data Fetching

### Static Generation (Default)

```typescript
// app/blog/[slug]/page.tsx
import { getPostBySlug, getAllPosts } from '@/lib/blog';

// Generate static params at build time
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map(post => ({
    slug: post.slug,
  }));
}

// Fetch data for each page
export default async function Page({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }
  
  return <BlogPost post={post} />;
}
```

### File System Data Access

```typescript
// lib/blog.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const allPostsData: PostMeta[] = [];

  // Process files recursively
  const processFile = (filePath: string, fileName: string) => {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      slug: data.slug || fileName.replace(/\.mdx?$/, ''),
      title: data.title,
      content: content,
      // ... other fields
    };
  };

  // Read directory and subdirectories
  const files = fs.readdirSync(postsDirectory);
  files.forEach(file => {
    const fullPath = path.join(postsDirectory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      // Process subdirectory
      const subFiles = fs.readdirSync(fullPath);
      subFiles.forEach(subFile => {
        if (subFile.endsWith('.md') || subFile.endsWith('.mdx')) {
          allPostsData.push(processFile(
            path.join(fullPath, subFile),
            subFile
          ));
        }
      });
    } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
      allPostsData.push(processFile(fullPath, file));
    }
  });

  return allPostsData.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
```

### With Caching and Revalidation

```typescript
// app/api/posts/route.ts
import { NextResponse } from 'next/server';

// Cache for 1 hour
export const revalidate = 3600;

export async function GET() {
  const posts = getAllPosts();
  
  return NextResponse.json(posts, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate'
    }
  });
}
```

## Client-Side Data Fetching

### Basic Fetch Pattern

```typescript
"use client";

import { useState, useEffect } from 'react';

interface Data {
  items: Item[];
}

export function DataComponent() {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/data');
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data</div>;

  return <div>{/* Render data */}</div>;
}
```

### With Query Parameters

```typescript
"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query) {
      fetch(`/api/search?q=${encodeURIComponent(query)}`)
        .then(res => res.json())
        .then(data => setResults(data));
    }
  }, [query]);

  return <div>{/* Render results */}</div>;
}
```

### Polling Pattern

```typescript
"use client";

import { useState, useEffect } from 'react';

export function LiveData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/live-data');
      const result = await response.json();
      setData(result);
    };

    // Initial fetch
    fetchData();

    // Poll every 5 seconds
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  return <div>{/* Render live data */}</div>;
}
```

## Data Transformation Patterns

### Parsing Markdown with Frontmatter

```typescript
import matter from 'gray-matter';
import readingTime from 'reading-time';

export function parseMarkdownFile(filePath: string) {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);
  
  return {
    metadata: {
      ...data,
      readingTime: stats.text,
    },
    content,
  };
}
```

### Aggregating Data from Multiple Sources

```typescript
export async function getEnrichedPosts() {
  const posts = getAllPosts();
  
  // Enrich with additional data
  const enrichedPosts = await Promise.all(
    posts.map(async (post) => {
      const views = await getPostViews(post.slug);
      const comments = await getPostComments(post.slug);
      
      return {
        ...post,
        views,
        commentCount: comments.length,
      };
    })
  );
  
  return enrichedPosts;
}
```

## Error Handling Patterns

### Graceful Degradation

```typescript
export function getPostBySlug(slug: string) {
  try {
    const filePath = path.join(postsDirectory, `${slug}.md`);
    
    if (!fs.existsSync(filePath)) {
      console.warn(`Post not found: ${slug}`);
      return null;
    }
    
    return parseMarkdownFile(filePath);
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error);
    return null;
  }
}
```

### Fallback Data

```typescript
const DEFAULT_POSTS: PostMeta[] = [
  {
    slug: 'welcome',
    title: 'Welcome to our blog',
    description: 'Default post when no content is available',
    // ...
  }
];

export function getAllPosts(): PostMeta[] {
  try {
    const posts = loadPostsFromDisk();
    return posts.length > 0 ? posts : DEFAULT_POSTS;
  } catch (error) {
    console.error('Failed to load posts:', error);
    return DEFAULT_POSTS;
  }
}
```

## Performance Optimization

### Memoization

```typescript
let cachedPosts: PostMeta[] | null = null;
let cacheTime: number = 0;
const CACHE_DURATION = 60000; // 1 minute

export function getAllPosts(): PostMeta[] {
  const now = Date.now();
  
  if (cachedPosts && now - cacheTime < CACHE_DURATION) {
    return cachedPosts;
  }
  
  cachedPosts = loadPostsFromDisk();
  cacheTime = now;
  
  return cachedPosts;
}
```

### Parallel Data Fetching

```typescript
export async function getDashboardData() {
  const [posts, products, users] = await Promise.all([
    getAllPosts(),
    getAllProducts(),
    getAllUsers(),
  ]);
  
  return {
    posts,
    products,
    users,
  };
}
```

## Best Practices

1. **Choose the right strategy** - Static for content, dynamic for user data
2. **Handle errors gracefully** - Always provide fallbacks
3. **Optimize for performance** - Use caching and memoization
4. **Type your data** - Use TypeScript interfaces
5. **Validate external data** - Don't trust external sources
6. **Log errors for debugging** - But don't expose details to users
7. **Use loading states** - Provide feedback during data fetching

## See Also
- [API Route Pattern](./api-route-pattern.md)
- [Recipe: Add Data Source](../recipes/add-data-source.md)
- [Module: Data Persistence](../modules/data-persistence.md)