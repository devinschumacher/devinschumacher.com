import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  image?: string;
  readingTime: string;
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      const stats = readingTime(content);

      return {
        slug,
        title: data.title || slug,
        description: data.description || '',
        date: data.date || new Date().toISOString(),
        author: data.author || 'Admin',
        tags: data.tags || [],
        image: data.image,
        readingTime: stats.text,
      };
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
  const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);
  const mdPath = path.join(postsDirectory, `${realSlug}.md`);
  
  let fileContents;
  if (fs.existsSync(fullPath)) {
    fileContents = fs.readFileSync(fullPath, 'utf8');
  } else if (fs.existsSync(mdPath)) {
    fileContents = fs.readFileSync(mdPath, 'utf8');
  } else {
    return null;
  }

  const { data, content } = matter(fileContents);
  const stats = readingTime(content);

  return {
    slug: realSlug,
    content,
    meta: {
      slug: realSlug,
      title: data.title || realSlug,
      description: data.description || '',
      date: data.date || new Date().toISOString(),
      author: data.author || 'Admin',
      tags: data.tags || [],
      image: data.image,
      readingTime: stats.text,
    },
  };
}