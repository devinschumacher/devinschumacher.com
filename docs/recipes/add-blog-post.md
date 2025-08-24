# Recipe: Add New Blog Post

Step-by-step guide to add a new blog post to the site.

## Prerequisites
- Access to `content/blog/` directory
- Understanding of markdown frontmatter

## Steps

### 1. Choose Category and Create File

Determine the appropriate category for your post and create the markdown file:

```bash
# Create in a category folder
touch content/blog/seo/your-post-title.md

# Or in root blog folder
touch content/blog/your-post-title.md
```

### 2. Add Required Frontmatter

Open the file and add the required frontmatter:

```markdown
---
slug: "your-custom-url-path"  # REQUIRED - defines the URL
title: "Your Post Title"
description: "A brief description for SEO and previews"
date: "2024-01-15"
author: "Devin"
category: "SEO"  # Or "Python", "Marketing", etc.
tags: ["keyword1", "keyword2", "keyword3"]
image: "/images/your-hero-image.jpg"  # Optional
---
```

### 3. Write Content

Add your post content below the frontmatter:

```markdown
## Introduction

Your introduction paragraph here...

## Main Section

Content with **bold** and *italic* text.

### Subsection

- Bullet point 1
- Bullet point 2

\`\`\`javascript
// Code blocks with syntax highlighting
const example = "Hello World";
\`\`\`

## Conclusion

Final thoughts...
```

### 4. Add Images (Optional)

Place images in `public/images/` and reference them:

```markdown
![Alt text](/images/your-image.jpg)
```

Or use HTML for more control:

```html
<img src="/images/your-image.jpg" alt="Alt text" width="800" height="400" />
```

### 5. Verify Slug Configuration

Ensure your `slug` field in frontmatter matches your desired URL:

```yaml
slug: "best-seo-tools-2024"  # Will be accessible at /best-seo-tools-2024/
```

### 6. Test Locally

```bash
npm run dev
# Visit http://localhost:3000/your-slug-here/
```

### 7. Check Links (Optional)

```bash
npm run check-links
```

## Example: Complete Blog Post

```markdown
---
slug: "python-web-scraping-guide"
title: "Complete Guide to Web Scraping with Python"
description: "Learn how to scrape websites using Python, BeautifulSoup, and Selenium"
date: "2024-01-15"
author: "Devin"
category: "Python"
tags: ["python", "web-scraping", "beautifulsoup", "selenium", "tutorial"]
image: "/images/python-scraping-hero.jpg"
---

## Introduction

Web scraping is a powerful technique for extracting data from websites...

## Getting Started

First, install the required packages:

\`\`\`bash
pip install beautifulsoup4 requests selenium
\`\`\`

## Basic Example with BeautifulSoup

\`\`\`python
import requests
from bs4 import BeautifulSoup

url = "https://example.com"
response = requests.get(url)
soup = BeautifulSoup(response.content, 'html.parser')

# Find all links
links = soup.find_all('a')
for link in links:
    print(link.get('href'))
\`\`\`

## Advanced Techniques

### Handling JavaScript-Rendered Content

When dealing with dynamic content...

## Best Practices

1. Respect robots.txt
2. Add delays between requests
3. Use proper headers
4. Handle errors gracefully

## Conclusion

Web scraping with Python opens up...
```

## Common Issues and Solutions

### Issue: Post Not Showing Up
**Solution:** Check that:
1. The `slug` field is present in frontmatter
2. The file has `.md` or `.mdx` extension
3. The file is in `content/blog/` directory

### Issue: Images Not Loading
**Solution:** 
1. Ensure images are in `public/images/`
2. Use absolute paths starting with `/`
3. Check file extensions match exactly

### Issue: Category Not Working
**Solution:**
1. Use consistent category names
2. Match case exactly when filtering
3. Add category to frontmatter

## Related Files
- `content/blog/` - Blog post files
- `lib/blog.ts` - Blog utility functions
- `app/blog/[slug]/page.tsx` - Blog post page component

## See Also
- [Pattern: Data Fetching](../patterns/data-fetching-pattern.md)
- [Add Category](./add-category.md)
- [File Inventory](../file-inventory.md)