import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import type { Post } from '../types';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-blue-600 font-semibold">{post.category}</span>
        <time className="text-sm text-gray-500">
          {format(new Date(post.date), 'yyyy년 MM월 dd일')}
        </time>
      </div>
      
      <Link to={`/blog/${post.slug}`}>
        <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
          {post.title}
        </h2>
      </Link>
      
      {post.excerpt && (
        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
      )}
      
      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map((tag) => (
          <Link
            key={tag}
            to={`/blog/tag/${tag}`}
            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-blue-100 hover:text-blue-700 transition-colors"
          >
            #{tag}
          </Link>
        ))}
      </div>
      
      <Link
        to={`/blog/${post.slug}`}
        className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
      >
        읽기 →
      </Link>
    </article>
  );
}

