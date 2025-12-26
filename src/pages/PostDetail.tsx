import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPostBySlug } from '../utils/posts';
import type { Post } from '../types';
import { format } from 'date-fns';

export default function PostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      getPostBySlug(slug).then((postData) => {
        setPost(postData);
        setLoading(false);
      });
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">로딩 중...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">포스트를 찾을 수 없습니다.</p>
        <Link to="/blog" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
          블로그로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="mb-6">
          <Link
            to="/blog"
            className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
          >
            ← 블로그로 돌아가기
          </Link>
        </div>

        <div className="mb-6">
          <span className="text-sm text-blue-600 font-semibold">{post.category}</span>
          <time className="text-sm text-gray-500 ml-4">
            {format(new Date(post.date), 'yyyy년 MM월 dd일')}
          </time>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>

        <div className="flex flex-wrap gap-2 mb-8">
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

        <div
          className="prose-custom"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </div>
    </article>
  );
}

