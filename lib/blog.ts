import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export interface PostMeta {
  slug: string;
  customSlug?: string;
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
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const allPostsData: PostMeta[] = [];

  // Helper function to process a file
  const processFile = (filePath: string, fileName: string, subdir?: string) => {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    const stats = readingTime(content);
    
    // Create default slug based on file location
    const defaultSlug = subdir 
      ? `${subdir}/${fileName.replace(/\.mdx?$/, '')}`
      : fileName.replace(/\.mdx?$/, '');

    return {
      slug: defaultSlug,
      customSlug: data.slug, // This is the custom slug from frontmatter
      title: data.title || fileName.replace(/\.mdx?$/, ''),
      description: data.description || '',
      date: data.date || new Date().toISOString(),
      author: data.author || 'Admin',
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
    slug: realSlug,
    content,
    meta: {
      slug: realSlug,
      customSlug: data.slug,
      title: data.title || realSlug,
      description: data.description || '',
      date: data.date || new Date().toISOString(),
      author: data.author || 'Admin',
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
  
  // Find the post with matching custom slug
  const postMeta = allPosts.find(post => post.customSlug === customSlug);
  
  if (!postMeta) {
    return null;
  }
  
  // Now get the full post content using the file-based slug
  return getPostBySlug(postMeta.slug);
}