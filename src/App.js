import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import BlogList from './components/Blog';
import BlogPost from './components/BlogPost';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div>
        <nav>
          <ul>
            <li><Link to="/">首页</Link></li>
            <li><Link to="/blog">博客</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<h1>欢迎来到我的个人网站</h1>} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogPost />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
