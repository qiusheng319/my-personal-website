import React from 'react';
import { useParams } from 'react-router-dom';
import MarkdownRenderer from '../components/MarkdownRenderer';

const BlogPost = () => {
    const { id } = useParams();
    const filePath = `${process.env.PUBLIC_URL}/posts/${id}.md`;

    return (
        <div>
            <h1>博客文章</h1>
            <p>加载文件: {filePath}</p>
            <MarkdownRenderer filePath={filePath} />
        </div>
    );
};

export default BlogPost;