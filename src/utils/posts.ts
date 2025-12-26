import type { Post, PostMetadata } from '../types';
import { parseMarkdown, extractMetadata } from './markdown';

// 마크다운 파일들을 동적으로 import하기 위한 함수
async function importAllPosts() {
  // Vite의 glob 패턴을 사용하여 마크다운 파일들을 동적으로 import
  const postsModules = import.meta.glob('/src/posts/**/*.md', { 
    eager: false,
    query: '?raw'
  });

  console.log('Found markdown files:', Object.keys(postsModules));

  const posts: Post[] = [];
  
  for (const path in postsModules) {
    try {
      console.log(`Loading post from: ${path}`);
      const module = await postsModules[path]();
      
      // ?raw를 사용하면 문자열이 직접 반환됨
      let content: string;
      if (typeof module === 'string') {
        content = module;
      } else if (module && typeof module === 'object' && 'default' in module) {
        content = (module as { default: string }).default;
      } else {
        console.warn(`Unexpected module format for ${path}:`, module);
        continue;
      }
      
      console.log(`Content loaded, length: ${content?.length || 0}`);
      
      if (!content) {
        console.warn(`Empty content for ${path}`);
        continue;
      }
      
      const post = await parseMarkdown(content);
      console.log(`Post parsed: ${post.title} (${post.slug})`);
      posts.push(post);
    } catch (error) {
      console.error(`Error loading post from ${path}:`, error);
      if (error instanceof Error) {
        console.error('Error details:', error.message, error.stack);
      }
    }
  }
  
  console.log(`Total posts loaded: ${posts.length}`);
  return posts;
}

export async function getAllPosts(): Promise<Post[]> {
  const posts = await importAllPosts();
  return posts.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getAllPosts();
  return posts.find(post => post.slug === slug) || null;
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter(post => post.tags.includes(tag));
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter(post => post.category === category);
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const tagSet = new Set<string>();
  posts.forEach(post => {
    post.tags.forEach(tag => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
}

export async function getAllCategories(): Promise<string[]> {
  const posts = await getAllPosts();
  const categorySet = new Set<string>();
  posts.forEach(post => {
    if (post.category) {
      categorySet.add(post.category);
    }
  });
  return Array.from(categorySet).sort();
}

export function groupPostsByMonth(posts: Post[]): Record<string, Post[]> {
  const grouped: Record<string, Post[]> = {};
  
  posts.forEach(post => {
    const date = new Date(post.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    if (!grouped[monthKey]) {
      grouped[monthKey] = [];
    }
    grouped[monthKey].push(post);
  });
  
  return grouped;
}

