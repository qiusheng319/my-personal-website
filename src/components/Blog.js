import React from 'react';
import { Link } from 'react-router-dom';

const posts = [
    { id: 'first-post', title: '第一篇博客' },
    { id: 'second-post', title: '第二篇博客' },
];

const BlogList = () => {
    return (
        <div>
            <h1>博客列表</h1>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <Link to={`/blog/${post.id}`}>{post.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BlogList;