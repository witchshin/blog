import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPostsByCategory } from '../utils/posts';
import type { Post } from '../types';
import PostCard from '../components/PostCard';

export default function CategoryPosts() {
  const { category } = useParams<{ category: string }>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (category) {
      getPostsByCategory(category).then((postData) => {
        setPosts(postData);
        setLoading(false);
      });
    }
  }, [category]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">로딩 중...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <Link
          to="/blog"
          className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
        >
          ← 블로그로 돌아가기
        </Link>
        <h1 className="text-4xl font-bold text-gray-900">
          카테고리: {category} ({posts.length}개 포스트)
        </h1>
      </div>

      <div className="space-y-6">
        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post.slug} post={post} />)
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600">이 카테고리에 해당하는 포스트가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}

