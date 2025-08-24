# devinschumacher.com

## Blogging with TinaCMS

### Admin URL
**🚀 Live CMS Admin Panel**: https://devinschumacher-com-git-tinacms-serpcompany.vercel.app/admin

> **Tip**: Bookmark this URL or save it to your password manager for easy access!

### How to Create a New Blog Post

1. **Go to the admin panel**: https://devinschumacher-com-git-tinacms-serpcompany.vercel.app/admin
2. **Log in** with your Tina Cloud account
3. **Click "Posts"** in the sidebar
4. **Click "Create New"** button
5. **Fill in the fields**:
   - **Title**: Your blog post title
   - **Body**: Write your content using the visual editor
6. **Click "Save"** to publish

Your post will be automatically saved to GitHub and deployed to the live site.

### Editing Existing Posts

1. Go to https://devinschumacher-com-git-tinacms-serpcompany.vercel.app/admin
2. Click on "Posts"
3. Select the post you want to edit
4. Make your changes
5. Click "Save"

### Setting Up a Custom Domain (Optional)

To make the URL easier to remember, you can:

1. **Option 1: Add a subdomain** (e.g., `cms.devinschumacher.com`)
   - Add a CNAME record pointing to `devinschumacher-com-git-tinacms-serpcompany.vercel.app`
   - Add the custom domain in Vercel project settings

2. **Option 2: Use Vercel's alias feature**
   - In Vercel dashboard, go to your project settings
   - Add an alias like `devin-cms.vercel.app` (if available)

3. **Option 3: Just bookmark it!**
   - The easiest solution - bookmark the admin URL in your browser

### Local Development

```bash
# Start the CMS and site locally
npm run dev

# Access locally at:
# Site: http://localhost:3001
# Admin: http://localhost:4001/admin/index.html
```
