import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../utils/posts';
import type { Post } from '../types';
import PostCard from '../components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllPosts()
      .then((data) => {
        console.log('Loaded posts:', data);
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading posts:', error);
        setLoading(false);
      });
  }, []);

  const recentPosts = posts.slice(0, 3);

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">로딩 중...</p>
      </div>
    );
  }

  return (
    <div>
      <section className="mb-16">
        <div className="flex items-center justify-center mb-8">
          <img 
            src={import.meta.env.BASE_URL + 'blog-icon.png'}
            alt="Blog Icon" 
            className="h-24 w-24 object-contain"
            onError={(e) => {
              console.error('Image load error:', e.currentTarget.src);
              e.currentTarget.src = '/blog/blog-icon.png';
            }}
          />
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-4 text-center">
          안녕하세요, 제 블로그에 오신 것을 환영합니다
        </h1>
        <p className="text-xl text-gray-600 mb-8 text-center">
          개발, 기술, 그리고 일상에 대한 이야기를 공유합니다.
        </p>
        <Link
          to="/blog"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          블로그 보기
        </Link>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">최신 포스트</h2>
        {recentPosts.length > 0 ? (
          <>
            <div className="space-y-6">
              {recentPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
            {posts.length > 3 && (
              <div className="mt-8 text-center">
                <Link
                  to="/blog"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  모든 포스트 보기 →
                </Link>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600">포스트가 없습니다.</p>
          </div>
        )}
      </section>
    </div>
  );
}

