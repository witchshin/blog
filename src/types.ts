export interface PostMetadata {
  title: string;
  date: string;
  tags: string[];
  category: string;
  slug: string;
  excerpt?: string;
}

export interface Post extends PostMetadata {
  content: string;
  html: string;
}

