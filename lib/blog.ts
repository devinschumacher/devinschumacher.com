import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export interface PostMeta {
  slug: string; // The URL slug from markdown frontmatter (REQUIRED)
  fileSlug: string; // The file-based slug for internal use
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  category?: string;
  image?: string;
  readingTime: string;
}

export function getAllPosts(): PostMeta[] {
  console.log('getAllPosts: Current working directory:', process.cwd());
  console.log('getAllPosts: Posts directory path:', postsDirectory);
  console.log('getAllPosts: Posts directory exists:', fs.existsSync(postsDirectory));
  
  if (!fs.existsSync(postsDirectory)) {
    console.warn('getAllPosts: Posts directory does not exist, returning empty array');
    
    // Let's also check what directories do exist
    try {
      const contentDir = path.join(process.cwd(), 'content');
      console.log('getAllPosts: Content directory exists:', fs.existsSync(contentDir));
      if (fs.existsSync(contentDir)) {
        const contentItems = fs.readdirSync(contentDir);
        console.log('getAllPosts: Content directory contents:', contentItems);
      }
      
      const rootItems = fs.readdirSync(process.cwd());
      console.log('getAllPosts: Root directory contents:', rootItems.filter(item => !item.startsWith('.')));
    } catch (error) {
      console.error('getAllPosts: Error checking directory contents:', error);
    }
    
    return [];
  }

  const allPostsData: PostMeta[] = [];

  // Helper function to process a file
  const processFile = (filePath: string, fileName: string, subdir?: string) => {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    const stats = readingTime(content);
    
    // Check if slug is defined in frontmatter
    if (!data.slug) {
      throw new Error(`Blog post ${filePath} is missing required 'slug' field in frontmatter`);
    }
    
    // Create file-based slug for internal use
    const fileSlug = subdir 
      ? `${subdir}/${fileName.replace(/\.mdx?$/, '')}`
      : fileName.replace(/\.mdx?$/, '');

    return {
      slug: data.slug, // The URL slug from frontmatter (REQUIRED)
      fileSlug: fileSlug, // The file-based slug for internal use
      title: data.title || fileName.replace(/\.mdx?$/, ''),
      description: data.description || '',
      date: data.date || new Date().toISOString(),
      author: data.author || 'Devin',
      tags: data.tags || [],
      category: data.category || (subdir ? subdir.charAt(0).toUpperCase() + subdir.slice(1) : undefined),
      image: data.image,
      readingTime: stats.text,
    };
  };

  // Get posts from root blog directory
  const rootFiles = fs.readdirSync(postsDirectory);
  rootFiles
    .filter((fileName) => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
    .forEach((fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      allPostsData.push(processFile(fullPath, fileName));
    });

  // Get posts from subdirectories (like seo/)
  const subdirs = rootFiles.filter((item) => {
    const itemPath = path.join(postsDirectory, item);
    return fs.statSync(itemPath).isDirectory();
  });

  subdirs.forEach((subdir) => {
    const subdirPath = path.join(postsDirectory, subdir);
    const subdirFiles = fs.readdirSync(subdirPath);
    
    subdirFiles
      .filter((fileName) => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
      .forEach((fileName) => {
        const fullPath = path.join(subdirPath, fileName);
        allPostsData.push(processFile(fullPath, fileName, subdir));
      });
  });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx?$/, '');
  
  // Try different possible paths
  const possiblePaths = [
    path.join(postsDirectory, `${realSlug}.mdx`),
    path.join(postsDirectory, `${realSlug}.md`),
    // Also check in subdirectories
    ...fs.existsSync(postsDirectory) 
      ? fs.readdirSync(postsDirectory)
          .filter(item => fs.statSync(path.join(postsDirectory, item)).isDirectory())
          .flatMap(dir => [
            path.join(postsDirectory, dir, `${realSlug.split('/').pop()}.mdx`),
            path.join(postsDirectory, dir, `${realSlug.split('/').pop()}.md`)
          ])
      : []
  ];
  
  let fileContents;
  let foundPath;
  
  for (const filePath of possiblePaths) {
    if (fs.existsSync(filePath)) {
      fileContents = fs.readFileSync(filePath, 'utf8');
      foundPath = filePath;
      break;
    }
  }
  
  if (!fileContents) {
    return null;
  }

  const { data, content } = matter(fileContents);
  const stats = readingTime(content);

  return {
    slug: data.slug || realSlug, // Use frontmatter slug if available
    content,
    meta: {
      slug: data.slug || realSlug, // The URL slug
      fileSlug: realSlug, // The file-based slug
      title: data.title || realSlug,
      description: data.description || '',
      date: data.date || new Date().toISOString(),
      author: data.author || 'Devin',
      tags: data.tags || [],
      category: data.category,
      image: data.image,
      readingTime: stats.text,
    },
  };
}

export function getAllPostsWithCustomSlugs(): PostMeta[] {
  return getAllPosts();
}

export function getPostByCustomSlug(customSlug: string) {
  const allPosts = getAllPosts();
  
  // Find the post with matching slug from frontmatter
  const postMeta = allPosts.find(post => post.slug === customSlug);
  
  if (!postMeta) {
    return null;
  }
  
  // Now get the full post content using the file-based slug
  return getPostBySlug(postMeta.fileSlug);
}