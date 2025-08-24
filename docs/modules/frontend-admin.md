# Module: Frontend Admin (TinaCMS)

Documentation for the TinaCMS content management system integration.

## Overview

TinaCMS provides a Git-backed content management system with visual editing capabilities for markdown content.

## Related Files
- `tina/config.ts` - TinaCMS configuration
- `app/api/tina/[...routes]/route.ts` - TinaCMS API routes
- `tina/__generated__/` - Generated GraphQL schema and types
- `public/admin/` - Admin interface assets

## Architecture

```
Content Files → TinaCMS → GraphQL API → Admin Interface
     ↓                         ↓              ↓
  Markdown              Git Backend     Visual Editor
```

## Configuration

### Environment Variables

```env
# Required
NEXT_PUBLIC_TINA_CLIENT_ID=your-client-id
TINA_TOKEN=your-read-only-token

# Optional
NEXT_PUBLIC_TINA_PUBLIC_API_URL=https://content.tinajs.io/content/your-id/your-branch

# Branch configuration
GITHUB_BRANCH=main  # or from CI/CD environment
VERCEL_GIT_COMMIT_REF=main
```

### TinaCMS Setup

```typescript
// tina/config.ts
import { defineConfig } from "tinacms";

export default defineConfig({
  branch: process.env.GITHUB_BRANCH || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  
  schema: {
    collections: [
      // Define content models
    ],
  },
});
```

## Content Schema

### Blog Post Collection

```typescript
{
  name: "post",
  label: "Blog Posts",
  path: "content/blog",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
      isTitle: true,
      required: true,
    },
    {
      type: "string",
      name: "slug",
      label: "URL Slug",
      required: true,
    },
    {
      type: "string",
      name: "description",
      label: "Description",
    },
    {
      type: "datetime",
      name: "date",
      label: "Date",
      required: true,
    },
    {
      type: "string",
      name: "author",
      label: "Author",
    },
    {
      type: "string",
      name: "category",
      label: "Category",
      options: ["SEO", "Python", "Marketing", "Tech"],
    },
    {
      type: "string",
      name: "tags",
      label: "Tags",
      list: true,
    },
    {
      type: "image",
      name: "image",
      label: "Featured Image",
    },
    {
      type: "rich-text",
      name: "body",
      label: "Content",
      isBody: true,
    },
  ],
  ui: {
    router: ({ document }) => `/blog/${document._sys.filename}`,
  },
}
```

### Product Collection

```typescript
{
  name: "product",
  label: "Products",
  path: "content/products",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Product Name",
      required: true,
    },
    {
      type: "number",
      name: "price",
      label: "Price",
      required: true,
    },
    {
      type: "string",
      name: "features",
      label: "Features",
      list: true,
    },
    {
      type: "rich-text",
      name: "body",
      label: "Description",
      isBody: true,
    },
  ],
}
```

## Development Workflow

### Starting the CMS

```bash
# Start with TinaCMS
npm run dev

# This runs:
tinacms dev -c "next dev"
```

### Building for Production

```bash
# Build with TinaCMS
npm run build:tina

# This runs:
tinacms build && next build
```

## Admin Interface

### Accessing the Admin

1. Navigate to `/admin` in development
2. Login with GitHub (if configured)
3. Edit content visually
4. Changes saved to Git

### Admin Features

- Visual markdown editor
- Media management
- Real-time preview
- Git-backed versioning
- Multi-user support

## API Integration

### GraphQL API

```typescript
// app/api/tina/[...routes]/route.ts
import { createDatabase, createLocalDatabase } from "@tinacms/datalayer";

const handler = async (req: Request) => {
  const { isLocal } = getStaticPropsForTina();
  
  const database = isLocal
    ? createLocalDatabase()
    : createDatabase({
        connectionString: process.env.MONGODB_URI,
        databaseName: process.env.MONGODB_NAME,
      });
  
  return await database.request({
    query: req.body.query,
    variables: req.body.variables,
  });
};
```

### Querying Content

```typescript
import { client } from "../tina/__generated__/client";

export async function getPostData(slug: string) {
  const { data } = await client.queries.post({
    relativePath: `${slug}.md`,
  });
  
  return {
    title: data.post.title,
    content: data.post.body,
    // ... other fields
  };
}
```

## Media Management

### Image Upload Configuration

```typescript
media: {
  tina: {
    mediaRoot: "images",
    publicFolder: "public",
    static: false,
  },
}
```

### Using Images in Content

```markdown
![Alt text](/images/uploaded-image.jpg)

<!-- Or with TinaCMS media selector -->
<img src="{media.image}" alt="{media.alt}" />
```

## Custom Fields

### Creating Custom Field Components

```typescript
// tina/fields/ColorPicker.tsx
import { wrapFieldsWithMeta } from "tinacms";

export const ColorPickerField = wrapFieldsWithMeta(({ field, input }) => {
  return (
    <input
      type="color"
      value={input.value}
      onChange={(e) => input.onChange(e.target.value)}
    />
  );
});

// Register in config
fields: [
  {
    type: "string",
    name: "color",
    label: "Color",
    ui: {
      component: ColorPickerField,
    },
  },
]
```

## Authentication

### GitHub Authentication Setup

1. Create GitHub OAuth App
2. Set callback URL: `https://yourdomain.com/admin`
3. Add client ID and secret to TinaCMS Cloud
4. Configure allowed users/teams

### Local Development Auth

```typescript
// Bypass auth in development
if (process.env.NODE_ENV === "development") {
  return { authorized: true };
}
```

## Deployment

### Vercel Deployment

```json
// vercel.json
{
  "buildCommand": "npm run build:tina",
  "framework": "nextjs"
}
```

### Environment Setup

1. Add TinaCMS tokens to Vercel
2. Configure branch tracking
3. Set up preview deployments
4. Enable ISR for content updates

## Troubleshooting

### Build Errors

```bash
# Clear generated files
rm -rf tina/__generated__
rm -rf .tina

# Rebuild
npm run build:tina
```

### Content Not Updating

1. Check Git synchronization
2. Verify branch configuration
3. Clear Next.js cache
4. Rebuild TinaCMS schema

### GraphQL Errors

```typescript
// Enable debug mode
export default defineConfig({
  // ... config
  debug: process.env.NODE_ENV === "development",
});
```

## Best Practices

1. **Version control schema** - Track config.ts changes
2. **Use generated types** - Import from `__generated__`
3. **Validate content** - Add required fields
4. **Optimize media** - Use Next.js Image component
5. **Cache API responses** - Reduce build times
6. **Document collections** - Add clear labels and descriptions
7. **Test locally first** - Use local content API

## Migration from Other CMS

### From Markdown Files

```typescript
// Existing markdown files work automatically
// Just add to content/ directory
```

### From Contentful/Sanity

```typescript
// Migration script example
async function migrateContent() {
  const oldContent = await fetchFromOldCMS();
  
  for (const item of oldContent) {
    const markdown = `---
title: ${item.title}
date: ${item.date}
---

${item.content}`;
    
    fs.writeFileSync(
      `content/blog/${item.slug}.md`,
      markdown
    );
  }
}
```

## Performance Optimization

### Static Generation

```typescript
export async function generateStaticParams() {
  const posts = await client.queries.postConnection();
  
  return posts.data.postConnection.edges.map((post) => ({
    slug: post.node._sys.filename,
  }));
}
```

### ISR Configuration

```typescript
export const revalidate = 60; // Revalidate every minute
```

## See Also
- [File Inventory](../file-inventory.md)
- [Recipe: Add Blog Post](../recipes/add-blog-post.md)
- [Pattern: Data Fetching](../patterns/data-fetching-pattern.md)