# Code Standards

Coding conventions, style guidelines, and best practices for this codebase.

## TypeScript Standards

### Type Definitions
- Always define explicit types for function parameters and return values
- Use interfaces for object shapes, types for unions/primitives
- Avoid `any` type; use `unknown` when type is truly unknown

```typescript
// Good
interface BlogPost {
  slug: string;
  title: string;
  content: string;
}

function getPost(slug: string): BlogPost | null {
  // implementation
}

// Avoid
function getPost(slug: any): any {
  // implementation
}
```

### Async/Await Pattern
- Always use async/await over promises
- Handle errors with try/catch blocks
- Include proper error types

```typescript
export async function POST(request: Request) {
  try {
    const body = await request.json();
    // process...
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to process' },
      { status: 500 }
    );
  }
}
```

## React/Next.js Conventions

### Component Structure
1. Use functional components with TypeScript
2. Client components must have `"use client"` directive
3. Export named functions for better debugging

```typescript
"use client";

interface ComponentProps {
  title: string;
  children: React.ReactNode;
}

export function ComponentName({ title, children }: ComponentProps) {
  return (
    <div>
      <h2>{title}</h2>
      {children}
    </div>
  );
}
```

### File Organization
```
components/
├── ui/               # Reusable UI components (Shadcn)
├── Feature.tsx       # Feature-specific components
└── FeatureClient.tsx # Client-side version of Feature
```

### Hooks Usage
- Custom hooks in `lib/hooks/`
- Use `useMemo` for expensive computations
- Use `useCallback` for stable function references

```typescript
const filteredPosts = useMemo(() => {
  return posts.filter(post => /* filter logic */);
}, [posts, filterCriteria]);
```

## API Route Standards

### Route Structure
```typescript
// app/api/[route]/route.ts
import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  // Implementation
}

export async function GET(request: NextRequest) {
  // Implementation
}
```

### Error Handling
- Return appropriate HTTP status codes
- Include descriptive error messages
- Log errors for debugging

```typescript
if (!product) {
  return NextResponse.json(
    { error: 'Product not found' },
    { status: 404 }
  );
}
```

## Styling Guidelines

### Tailwind CSS
- Use Tailwind utility classes
- Avoid inline styles
- Use component variants for reusability

```typescript
// Good
<div className="container mx-auto px-4 py-8">

// Avoid
<div style={{ margin: '0 auto', padding: '2rem 1rem' }}>
```

### Component Styling Pattern
```typescript
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

export function Component({ className }: Props) {
  return (
    <div className={cn(
      "base-styles here",
      className
    )}>
      Content
    </div>
  );
}
```

## File Naming Conventions

### Components
- PascalCase for component files: `BlogArticles.tsx`
- Suffix client components: `BlogPageClient.tsx`
- Lowercase for utility files: `utils.ts`

### Routes
- Lowercase with hyphens: `sync-to-ghl`
- Dynamic routes in brackets: `[slug]`
- Catch-all routes: `[...routes]`

### Content Files
- Lowercase with hyphens: `seo-keywords.md`
- Organize by category folders

## Import Organization

Order imports as follows:
1. React/Next.js imports
2. Third-party libraries
3. Local components
4. Local utilities
5. Types/interfaces

```typescript
import { useState, useMemo } from 'react';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

import { BlogArticles } from '@/components/BlogArticles';
import { products } from '@/data/products';
import { cn } from '@/lib/utils';

import type { BlogPost } from '@/types';
```

## Content Standards

### Markdown Frontmatter
Required fields for blog posts:
```yaml
---
slug: "url-slug"        # Required for URL generation
title: "Post Title"     # Required
description: "Description" # SEO meta description
date: "2024-01-01"     # ISO date format
author: "Author Name"   # Default: "Devin"
category: "Category"    # Optional but recommended
tags: ["tag1", "tag2"]  # Array of tags
image: "/images/hero.jpg" # Optional hero image
---
```

### Image Handling
- Store in `public/images/`
- Use Next.js Image component
- Include proper alt text
- Specify sizes for responsive loading

```typescript
<Image
  src="/images/hero.jpg"
  alt="Descriptive alt text"
  width={1200}
  height={630}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

## Environment Variables

### Naming Convention
- Uppercase with underscores
- Prefix public vars with `NEXT_PUBLIC_`
- Group by service

```env
# Stripe
STRIPE_SECRET_KEY=sk_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# Public variables
NEXT_PUBLIC_URL=https://example.com
NEXT_PUBLIC_TINA_CLIENT_ID=xxx
```

### Usage Pattern
```typescript
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});
```

## Error Handling

### Try-Catch Pattern
```typescript
try {
  const result = await riskyOperation();
  return { success: true, data: result };
} catch (error) {
  console.error('Operation failed:', error);
  return { success: false, error: String(error) };
}
```

### Null Checks
```typescript
if (!data?.field) {
  return null; // or handle appropriately
}
```

## Performance Best Practices

### Dynamic Imports
```typescript
const HeavyComponent = dynamic(
  () => import('./HeavyComponent'),
  { ssr: false }
);
```

### Data Fetching
- Use static generation where possible
- Implement ISR for dynamic content
- Cache API responses appropriately

```typescript
export const revalidate = 3600; // Revalidate every hour
```

## Testing Conventions

### Test File Naming
- Component tests: `Component.test.tsx`
- API tests: `route.test.ts`
- Utility tests: `utils.test.ts`

### Test Structure
```typescript
describe('ComponentName', () => {
  it('should render correctly', () => {
    // test implementation
  });
  
  it('should handle user interaction', () => {
    // test implementation
  });
});
```

## Git Commit Standards

### Commit Message Format
```
type: brief description

- Detailed point 1
- Detailed point 2
```

Types:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Formatting
- `refactor:` Code restructuring
- `test:` Tests
- `chore:` Maintenance

## Security Standards

### API Security
- Validate all inputs
- Sanitize user data
- Use environment variables for secrets
- Implement rate limiting where appropriate

### Data Handling
- Never log sensitive information
- Use HTTPS for all external requests
- Validate webhook signatures

```typescript
// Validate Stripe webhook
const sig = request.headers.get('stripe-signature');
const event = stripe.webhooks.constructEvent(
  body,
  sig,
  process.env.STRIPE_WEBHOOK_SECRET
);
```

## See Also
- [Quick Reference](./quick-reference.md) - Common tasks
- [File Inventory](./file-inventory.md) - Project structure
- [Patterns](./patterns/) - Design patterns used