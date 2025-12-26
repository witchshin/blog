import frontMatter from 'front-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import type { Post, PostMetadata } from '../types';

export async function parseMarkdown(content: string): Promise<Post> {
  const { attributes, body } = frontMatter<{
    title?: string;
    date?: string;
    tags?: string[];
    category?: string;
    slug?: string;
    excerpt?: string;
  }>(content);
  
  const processedContent = await remark()
    .use(remarkHtml)
    .process(body);
  
  const html = processedContent.toString();
  
  return {
    title: attributes.title || '',
    date: attributes.date || '',
    tags: attributes.tags || [],
    category: attributes.category || '',
    slug: attributes.slug || '',
    excerpt: attributes.excerpt || '',
    content: body,
    html: html,
  };
}

export function extractMetadata(content: string): PostMetadata {
  const { attributes } = frontMatter<{
    title?: string;
    date?: string;
    tags?: string[];
    category?: string;
    slug?: string;
    excerpt?: string;
  }>(content);
  
  return {
    title: attributes.title || '',
    date: attributes.date || '',
    tags: attributes.tags || [],
    category: attributes.category || '',
    slug: attributes.slug || '',
    excerpt: attributes.excerpt || '',
  };
}

