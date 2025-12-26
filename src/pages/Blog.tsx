import { useEffect, useState } from 'react';
import { getAllPosts, groupPostsByMonth } from '../utils/posts';
import type { Post } from '../types';
import PostCard from '../components/PostCard';
import TagCloud from '../components/TagCloud';
import CategorySidebar from '../components/CategorySidebar';
import { format } from 'date-fns';

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  useEffect(() => {
    getAllPosts().then(setPosts);
  }, []);

  const groupedPosts = groupPostsByMonth(posts);
  const months = Object.keys(groupedPosts).sort().reverse();
  
  const displayPosts = selectedMonth 
    ? groupedPosts[selectedMonth] || []
    : posts;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-3">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => setSelectedMonth(null)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedMonth === null
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              전체
            </button>
            {months.map((month) => {
              const [year, monthNum] = month.split('-');
              const monthName = format(new Date(parseInt(year), parseInt(monthNum) - 1), 'yyyy년 MM월');
              return (
                <button
                  key={month}
                  onClick={() => setSelectedMonth(month)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedMonth === month
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {monthName}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          {displayPosts.length > 0 ? (
            displayPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-600">포스트가 없습니다.</p>
            </div>
          )}
        </div>
      </div>

      <div className="lg:col-span-1 space-y-6">
        <CategorySidebar />
        <TagCloud />
      </div>
    </div>
  );
}

