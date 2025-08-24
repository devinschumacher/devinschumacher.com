# File Inventory

Complete listing of all significant files and directories in the codebase.

## Directory Structure

```
devinschumacher.com/
├── app/                    # Next.js 15 App Router
│   ├── api/               # API routes
│   │   ├── checkout/      # Stripe checkout API
│   │   ├── sync-to-ghl/   # GoHighLevel CRM sync
│   │   ├── test-checkout/ # Test checkout endpoint
│   │   └── tina/          # TinaCMS API routes
│   ├── [slug]/            # Dynamic page routes
│   ├── about/             # About page
│   ├── best/              # Best-of listicles
│   ├── blog/              # Blog posts and listings
│   ├── category/          # Category pages
│   ├── comparison/        # Comparison pages
│   ├── contact/           # Contact page
│   ├── legal/             # Legal pages (privacy, terms, DMCA)
│   ├── projects/          # Projects showcase
│   ├── reviews/           # Review pages
│   ├── serply/            # Serply page
│   ├── success/           # Payment success page
│   ├── test-stripe/       # Stripe test page
│   ├── tools/             # Online tools
│   └── videos/            # Video content
├── components/            # React components
│   ├── ui/               # Shadcn UI components
│   └── [*.tsx]           # Feature components
├── content/              # Markdown content
│   ├── blog/             # Blog posts organized by category
│   ├── posts/            # General posts
│   ├── products/         # Product descriptions
│   ├── projects/         # Project descriptions
│   └── videos/           # Video metadata
├── data/                 # Data files
│   └── products.ts       # Product catalog with Stripe IDs
├── lib/                  # Utility functions
│   ├── blog.ts           # Blog post utilities
│   ├── brands.ts         # Brand configurations
│   ├── posthog.ts        # Analytics client
│   ├── products.ts       # Product utilities
│   ├── url-mappings.ts   # URL mapping logic
│   ├── utils.ts          # General utilities
│   └── videos.ts         # Video utilities
├── public/               # Static assets
│   ├── admin/            # TinaCMS admin
│   ├── images/           # Image assets
│   └── [files]           # Other static files
├── tina/                 # TinaCMS configuration
│   ├── __generated__/     # Generated TinaCMS files
│   └── config.ts         # TinaCMS config
└── [config files]        # Configuration files
```

## Key Configuration Files

### Root Configuration
- `next.config.mjs` - Next.js configuration
- `package.json` - Dependencies and scripts
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `components.json` - Shadcn UI components config
- `postcss.config.mjs` - PostCSS configuration
- `site.config.ts` - Site-wide configuration
- `vercel.json` - Vercel deployment config

### Application Files
- `app/layout.tsx` - Root layout with providers
- `app/page.tsx` - Homepage
- `app/globals.css` - Global styles
- `app/global-error.tsx` - Global error boundary
- `app/robots.ts` - Robots.txt generation
- `app/sitemap.ts` - Sitemap generation

## API Routes

### `/api/checkout`
- **File:** `app/api/checkout/route.ts`
- **Purpose:** Stripe checkout session creation
- **Method:** POST
- **Dependencies:** Stripe SDK, products catalog

### `/api/sync-to-ghl`
- **File:** `app/api/sync-to-ghl/route.ts`
- **Purpose:** Sync Stripe purchases to GoHighLevel CRM
- **Method:** POST
- **Dependencies:** Stripe SDK, GHL API

### `/api/test-checkout`
- **File:** `app/api/test-checkout/route.ts`
- **Purpose:** Test mode for checkout flow
- **Method:** POST

### `/api/tina/[...routes]`
- **File:** `app/api/tina/[...routes]/route.ts`
- **Purpose:** TinaCMS GraphQL API
- **Methods:** GET, POST

## Component Library

### UI Components (Shadcn)
- `badge.tsx` - Badge component
- `button.tsx` - Button component
- `card.tsx` - Card component
- `input.tsx` - Input component
- `label.tsx` - Label component
- `progress.tsx` - Progress indicator
- `select.tsx` - Select dropdown
- `tabs.tsx` - Tab navigation

### Feature Components
- `BlogArticles.tsx` - Blog article cards
- `BlogPageClient.tsx` - Client-side blog filtering
- `Footer.tsx` - Site footer
- `GoogleTagManager.tsx` - GTM integration
- `Hero111.tsx` - Hero section component
- `Logo.tsx` - Logo component
- `Navbar.tsx` - Navigation bar
- `PostHogProvider.tsx` - Analytics provider
- `code-block.tsx` - Code highlighting
- `image-lightbox.tsx` - Image viewer
- `mdx-components.tsx` - MDX components
- `mdx-content.tsx` - MDX content renderer
- `project-card.tsx` - Project cards
- `video-card.tsx` - Video cards

## Content Structure

### Blog Content (`content/blog/`)
- `artificial-intelligence/` - AI articles
- `best/` - Best-of lists and comparisons
- `git/` - Git tutorials
- `marketing/` - Marketing articles
- `python/` - Python tutorials
- `seo/` - SEO guides
- `tech/` - Technical tutorials

### Product Content (`content/products/`)
- Product markdown files with metadata
- Stripe integration details

### Project Content (`content/projects/`)
- Project showcase markdown files

## Data Models

### Product (`data/products.ts`)
```typescript
{
  name: string
  stripeProductId: string
  stripePriceId: string
  price: number
  description: string
  ghlTag: string
}
```

### Blog Post (`lib/blog.ts`)
```typescript
interface PostMeta {
  slug: string
  fileSlug: string
  title: string
  description: string
  date: string
  author: string
  tags: string[]
  category?: string
  image?: string
  readingTime: string
}
```

## Environment Variables Required
- `STRIPE_SECRET_KEY` - Stripe API key
- `NEXT_PUBLIC_URL` - Public site URL
- `GHL_API_BASE_URL` - GoHighLevel API URL
- `GHL_PAT_LOCATION` - GHL authentication token
- `GHL_LOCATION_ID` - GHL location identifier
- `NEXT_PUBLIC_TINA_CLIENT_ID` - TinaCMS client ID
- `TINA_TOKEN` - TinaCMS authentication token
- `NEXT_PUBLIC_TINA_PUBLIC_API_URL` - TinaCMS API URL
- `GITHUB_BRANCH` / `VERCEL_GIT_COMMIT_REF` - Git branch for CMS

## See Also
- [Quick Reference](./quick-reference.md) - Common tasks and commands
- [Code Standards](./code-standards.md) - Coding conventions
- [Module: Frontend Admin](./modules/frontend-admin.md) - TinaCMS details