import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAllTags } from '../utils/posts';

export default function TagCloud() {
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    getAllTags().then(setTags);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">태그</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Link
            key={tag}
            to={`/blog/tag/${tag}`}
            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-blue-100 hover:text-blue-700 transition-colors"
          >
            #{tag}
          </Link>
        ))}
      </div>
    </div>
  );
}

