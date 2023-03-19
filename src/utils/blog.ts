import path from 'path';
import * as fs from 'fs-extra';
import matter from 'gray-matter';
import { IBlogPost } from '@/types';

const DATA_PATH = 'data';
const BLOG_PATH = 'blog';

export async function getAllPosts() {
  const basePath = path.resolve(process.cwd(), DATA_PATH, BLOG_PATH);
  if (!(await fs.pathExists(basePath))) {
    throw new Error(`Blog folder doesn't exists: ${basePath}`);
  }

  return (await fs.readdir(basePath)).map((file) => path.basename(file, '.md'));
}

export async function getPost(slug: string) {
  const basePath = path.resolve(process.cwd(), DATA_PATH, BLOG_PATH);
  if (!(await fs.pathExists(basePath))) {
    throw new Error(`Blog folder doesn't exists: ${basePath}`);
  }

  const filePath = path.resolve(basePath, `${slug}.md`);
  if (!(await fs.pathExists(filePath))) {
    throw new Error(`Markdown file doesn't exists: ${filePath}`);
  }

  const rawContents = await fs.readFile(filePath, 'utf8');
  const { data, content } = matter(rawContents);

  return {
    name: data.name,
    slug,
    description: data.description,
    contents: content,
  } as IBlogPost;
}
