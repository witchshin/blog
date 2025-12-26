import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAllCategories } from '../utils/posts';

export default function CategorySidebar() {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    getAllCategories().then(setCategories);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">카테고리</h3>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category}>
            <Link
              to={`/blog/category/${category}`}
              className="text-gray-700 hover:text-blue-600 transition-colors block py-1"
            >
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

