# Quick Reference

Essential commands, patterns, and quick solutions for common tasks.

## Development Commands

### Start Development Server
```bash
npm run dev          # Next.js with TinaCMS
pnpm dev            # Alternative with pnpm
```

### Build & Production
```bash
npm run build       # Standard Next.js build
npm run build:tina  # Build with TinaCMS
npm start           # Start production server
```

### Linting & Testing
```bash
npm run lint        # Run ESLint
npm run check-links # Check markdown links
```

## Common Code Patterns

### Creating a New Blog Post

1. **File Location:** `content/blog/[category]/your-post.md`
2. **Required Frontmatter:**
```yaml
---
slug: "your-custom-url-slug"  # REQUIRED for URL
title: "Your Post Title"
description: "Brief description"
date: "2024-01-01"
author: "Devin"
category: "SEO"
tags: ["tag1", "tag2"]
image: "/images/your-image.jpg"  # Optional
---
```

### Adding a New API Route

```typescript
// app/api/your-route/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Your logic here
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
```

### Creating a Client Component

```typescript
// components/YourComponent.tsx
"use client";

import { useState } from 'react';

export function YourComponent() {
  const [state, setState] = useState("");
  
  return (
    <div>
      {/* Component JSX */}
    </div>
  );
}
```

### Adding a New Product

```typescript
// data/products.ts
export const products = {
  'your-product-id': {
    name: 'Product Name',
    stripeProductId: 'prod_XXX',
    stripePriceId: 'price_XXX',
    price: 29.99,
    description: 'Product description',
    ghlTag: 'purchase-product-stripe',
  },
  // existing products...
}
```

## File Path Quick Reference

### Components
- UI Components: `components/ui/`
- Feature Components: `components/`
- MDX Components: `components/mdx-components.tsx`

### Content
- Blog Posts: `content/blog/[category]/`
- Products: `content/products/`
- Projects: `content/projects/`

### API Routes
- Checkout: `app/api/checkout/route.ts`
- GHL Sync: `app/api/sync-to-ghl/route.ts`
- TinaCMS: `app/api/tina/[...routes]/route.ts`

### Utilities
- Blog Utils: `lib/blog.ts`
- Product Utils: `lib/products.ts`
- General Utils: `lib/utils.ts`

## Environment Variable Setup

### Required Variables
```env
# Stripe
STRIPE_SECRET_KEY=sk_xxx
NEXT_PUBLIC_URL=https://yourdomain.com

# GoHighLevel
GHL_API_BASE_URL=https://rest.gohighlevel.com/v1
GHL_PAT_LOCATION=xxx
GHL_LOCATION_ID=xxx

# TinaCMS
NEXT_PUBLIC_TINA_CLIENT_ID=xxx
TINA_TOKEN=xxx
NEXT_PUBLIC_TINA_PUBLIC_API_URL=xxx
```

## Common Tasks

### Add Shadcn Component
```bash
npx shadcn@latest add [component-name]
```

### Update Blog Post Metadata
1. Open markdown file in `content/blog/`
2. Update frontmatter fields
3. Ensure `slug` field is present

### Create Dynamic Route
```typescript
// app/[slug]/page.tsx
export default function Page({ params }: { params: { slug: string } }) {
  return <div>Page for {params.slug}</div>;
}
```

### Handle Stripe Webhook
```typescript
// In sync-to-ghl route
const session = await stripe.checkout.sessions.retrieve(sessionId, {
  expand: ['customer', 'line_items'],
});
```

### Filter Blog Posts by Category
```typescript
const filteredPosts = posts.filter(post => 
  post.category === selectedCategory
);
```

## Styling Quick Reference

### Tailwind Classes
- Container: `container mx-auto max-w-6xl`
- Section: `py-12 md:py-20`
- Card: `rounded-lg border bg-card p-6`
- Button: `inline-flex items-center justify-center`

### Component Variants (Shadcn)
```typescript
<Button variant="default|outline|ghost|link" size="sm|default|lg">
  Click me
</Button>

<Badge variant="default|secondary|destructive|outline">
  Badge text
</Badge>
```

## Debugging Tips

### Check Blog Post Loading
```typescript
console.log('Posts directory:', postsDirectory);
console.log('Posts exist:', fs.existsSync(postsDirectory));
```

### Verify API Response
```typescript
console.log('API Response:', await response.json());
```

### Test Stripe Integration
1. Use test mode with `testMode: true`
2. Check webhook logs in Stripe Dashboard
3. Verify GHL sync in `/api/sync-to-ghl`

## Performance Optimization

### Image Optimization
```typescript
<Image
  src={imagePath}
  alt={alt}
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

### Dynamic Imports
```typescript
const Component = dynamic(() => import('./Component'), {
  loading: () => <p>Loading...</p>,
});
```

### Memoization
```typescript
const filteredData = useMemo(() => {
  return data.filter(/* filter logic */);
}, [data, filterCriteria]);
```

## See Also
- [File Inventory](./file-inventory.md) - Complete file listing
- [Code Standards](./code-standards.md) - Coding conventions
- [Recipes](./recipes/) - Step-by-step guides