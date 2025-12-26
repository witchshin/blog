import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import PostDetail from './pages/PostDetail';
import TagPosts from './pages/TagPosts';
import CategoryPosts from './pages/CategoryPosts';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<PostDetail />} />
          <Route path="blog/tag/:tag" element={<TagPosts />} />
          <Route path="blog/category/:category" element={<CategoryPosts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
