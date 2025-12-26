import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPostsByTag } from '../utils/posts';
import type { Post } from '../types';
import PostCard from '../components/PostCard';

export default function TagPosts() {
  const { tag } = useParams<{ tag: string }>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (tag) {
      getPostsByTag(tag).then((postData) => {
        setPosts(postData);
        setLoading(false);
      });
    }
  }, [tag]);

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
          태그: #{tag} ({posts.length}개 포스트)
        </h1>
      </div>

      <div className="space-y-6">
        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post.slug} post={post} />)
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600">이 태그에 해당하는 포스트가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}

