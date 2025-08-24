# DevinSchumacher.com Documentation

Comprehensive implementation-focused documentation for the Next.js 15 marketing website with blog, e-commerce, and CRM integration.

## Project Overview

This is a modern marketing website built with Next.js 15, featuring:
- **Blog System** - Markdown-based blog with categories and tags
- **E-commerce** - Stripe integration for digital products
- **CRM Integration** - GoHighLevel synchronization
- **CMS** - TinaCMS for content management
- **SEO Optimized** - Built for search engine visibility

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS, Stripe, TinaCMS, Shadcn UI

## Directory Structure

```
docs/
├── index.md              # This file - main navigation
├── file-inventory.md     # Complete file listing
├── quick-reference.md    # Commands and snippets
├── code-standards.md     # Coding conventions
├── enhancements.md       # Issues and improvements
├── patterns/             # Design patterns
├── recipes/              # Step-by-step guides
└── modules/              # System modules
```

## Quick Links - "I want to..."

### Content Management
- [Add a new blog post](./recipes/add-blog-post.md)
- [Create a product page](./recipes/add-product.md)
- [Update site content](./modules/frontend-admin.md)

### Development
- [Create an API endpoint](./recipes/add-api-endpoint.md)
- [Add a client component](./patterns/client-component-pattern.md)
- [Implement data fetching](./patterns/data-fetching-pattern.md)

### Integration
- [Set up Stripe payments](./modules/stripe-integration.md)
- [Configure GHL sync](./modules/ghl-integration.md)
- [Add product to catalog](./recipes/add-product.md)

### Quick Reference
- [Common commands](./quick-reference.md#development-commands)
- [Environment variables](./quick-reference.md#environment-variable-setup)
- [File paths](./quick-reference.md#file-path-quick-reference)

## Modules

Detailed documentation for major system components:

### [Stripe Integration](./modules/stripe-integration.md)
Complete payment processing system with Stripe Checkout, webhook handling, and test mode support. Handles product catalog, checkout sessions, and payment confirmation.

### [GoHighLevel Integration](./modules/ghl-integration.md)
CRM synchronization that automatically creates/updates contacts after purchases, applies tags for automation, and manages customer data.

### [Frontend Admin (TinaCMS)](./modules/frontend-admin.md)
Git-backed CMS with visual editing, allowing content updates through a web interface with version control and preview capabilities.

## Patterns

Reusable design patterns used throughout the codebase:

### [API Route Pattern](./patterns/api-route-pattern.md)
Standard structure for Next.js API routes with error handling, validation, and TypeScript types.

### [Client Component Pattern](./patterns/client-component-pattern.md)
Interactive components with state management, event handlers, and browser-only features.

### [Data Fetching Pattern](./patterns/data-fetching-pattern.md)
Strategies for fetching data including static generation, server components, and client-side fetching.

## Recipes

Step-by-step guides for common tasks:

### [Add Blog Post](./recipes/add-blog-post.md)
Create and publish a new blog post with proper frontmatter, SEO optimization, and category assignment.

### [Add API Endpoint](./recipes/add-api-endpoint.md)
Create a new API route with proper structure, error handling, and TypeScript types.

### [Add Product](./recipes/add-product.md)
Set up a new product with Stripe integration, checkout flow, and CRM synchronization.

## Core Documentation

### [File Inventory](./file-inventory.md)
Complete listing of all files and directories with descriptions, including configuration files, components, and content structure.

### [Quick Reference](./quick-reference.md)
Essential commands, code snippets, and patterns for rapid development. Includes common tasks and troubleshooting.

### [Code Standards](./code-standards.md)
Coding conventions, style guidelines, and best practices including TypeScript standards, React patterns, and security practices.

### [Enhancements](./enhancements.md)
Documented issues, improvements, and refactoring opportunities found during analysis, organized by priority and category.

## Getting Started

### Prerequisites
- Node.js 18+ and npm/pnpm
- Stripe account (for payments)
- GoHighLevel account (optional, for CRM)
- TinaCMS account (optional, for CMS)

### Installation
```bash
# Clone repository
git clone [repository-url]

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Start development server
npm run dev
```

### Key Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run linter
npm run check-links  # Check markdown links
```

## Architecture Overview

```
User Request → Next.js App Router → Page/API Route
                    ↓
            Component Rendering
                    ↓
        Data Fetching (Static/Dynamic)
                    ↓
            External Services
        (Stripe, GHL, TinaCMS)
```

## Project Structure

### Frontend
- **App Router** - Next.js 15 app directory structure
- **Components** - Reusable UI and feature components
- **Styling** - Tailwind CSS with Shadcn UI components

### Backend
- **API Routes** - RESTful endpoints for integrations
- **Data Layer** - File-based content with markdown
- **Services** - Stripe and GHL integrations

### Content
- **Blog Posts** - Markdown files with frontmatter
- **Products** - Product catalog with Stripe IDs
- **Projects** - Portfolio and case studies

## Best Practices Summary

1. **Always use TypeScript** for type safety
2. **Follow component patterns** for consistency
3. **Handle errors gracefully** in all API routes
4. **Use environment variables** for configuration
5. **Implement loading states** for better UX
6. **Test integrations** in test mode first
7. **Document new patterns** as you create them

## Common Tasks

### Publishing Content
1. Create markdown file in appropriate directory
2. Add required frontmatter
3. Test locally with `npm run dev`
4. Commit and push changes

### Adding Features
1. Plan component structure
2. Implement with TypeScript
3. Add necessary API routes
4. Test thoroughly
5. Update documentation

### Debugging
1. Check browser console for errors
2. Review API response in Network tab
3. Check server logs in terminal
4. Verify environment variables

## Support & Resources

### Internal Resources
- [Quick Reference](./quick-reference.md) - Common solutions
- [Enhancements](./enhancements.md) - Known issues
- [Code Standards](./code-standards.md) - Guidelines

### External Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Stripe API Reference](https://stripe.com/docs/api)
- [TinaCMS Docs](https://tina.io/docs)
- [Shadcn UI Components](https://ui.shadcn.com)

## Contributing

When adding new features:
1. Follow existing patterns
2. Add TypeScript types
3. Include error handling
4. Update relevant documentation
5. Test in development and production modes

## Maintenance

### Regular Tasks
- Update dependencies monthly
- Review and fix any security issues
- Monitor error logs
- Update documentation for new features
- Backup content files

### Performance Monitoring
- Check Core Web Vitals
- Monitor API response times
- Review bundle size
- Optimize images

---

**Last Updated:** 2024
**Documentation Version:** 1.0.0
**Project Status:** Active Development

For questions or issues, refer to the [Enhancements](./enhancements.md) document or create an issue in the repository.