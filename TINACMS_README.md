# TinaCMS Setup Guide

## 🚀 Quick Start

TinaCMS is now set up on the `tinacms` branch! Here's how to use it:

### Starting the CMS

```bash
npm run dev
```

This starts both TinaCMS and Next.js development servers.

### Accessing the Admin Interface

Open your browser and go to:
- **TinaCMS Admin**: http://localhost:4001/admin/index.html
- **GraphQL Playground**: http://localhost:4001/admin/index.html#/graphql
- **Your Website**: http://localhost:3001

## 📝 Managing Content

### Creating a New Blog Post

1. Go to http://localhost:4001/admin/index.html
2. Click on "Blog Posts" in the sidebar
3. Click "Create New" button
4. Fill in the fields:
   - **URL Slug**: The path for your post (e.g., `/seo/my-new-post/`)
   - **Title**: Post title
   - **Description**: Meta description
   - **Date**: Publication date
   - **Author**: Select from dropdown
   - **Category**: Choose a category
   - **Tags**: Add relevant tags
   - **Featured Image**: Upload an image
   - **Body**: Write your content using the rich text editor

5. Click "Save" to create the post

### Editing Existing Posts

1. Go to the admin panel
2. Browse through your posts
3. Click on any post to edit
4. Make changes using the visual editor
5. Save your changes

## 🎨 Features

- **Visual Editor**: WYSIWYG editing for markdown content
- **Media Management**: Upload and manage images
- **Live Preview**: See changes in real-time
- **Git-based**: All changes are saved to your repository
- **Categories & Tags**: Organize your content
- **Rich Text**: Format text, add links, lists, and more

## ⚙️ Configuration

### Schema Definition

The blog post schema is defined in `tina/config.ts`. You can modify:
- Available categories
- Author options
- Field types and validations
- Media settings

### Environment Variables (for production)

To deploy with Tina Cloud:

1. Create a project at https://tina.io
2. Add to `.env.local`:
```
NEXT_PUBLIC_TINA_CLIENT_ID=your-client-id
TINA_TOKEN=your-token
```

## 🔧 Technical Details

### File Structure
```
/
├── tina/
│   └── config.ts          # TinaCMS configuration
├── .tina/
│   └── __generated__/     # Auto-generated types
├── app/
│   └── admin/
│       └── page.tsx       # Admin interface
└── content/
    └── blog/              # Your markdown files
```

### Development Mode

- TinaCMS runs on port 4001
- Next.js runs on port 3001
- Changes are saved directly to markdown files
- Hot reload enabled for content changes

## 📦 Production Deployment

For production:

1. Set up Tina Cloud at https://tina.io
2. Configure GitHub integration
3. Add environment variables
4. Re-enable `output: export` in `next.config.mjs`
5. Deploy to your hosting provider

## 🆘 Troubleshooting

### Admin page not loading?
- Make sure both servers are running (`npm run dev`)
- Check console for errors
- Clear Next.js cache: `rm -rf .next`

### Changes not saving?
- Ensure you have write permissions to the content directory
- Check for validation errors in the form
- Look at terminal output for errors

### Styling issues?
- TinaCMS uses its own styles in the admin interface
- Your site styles won't affect the admin panel

## 📚 Resources

- [TinaCMS Documentation](https://tina.io/docs/)
- [Schema Reference](https://tina.io/docs/schema/)
- [GitHub Integration](https://tina.io/docs/tina-cloud/dashboard/github-backed/)