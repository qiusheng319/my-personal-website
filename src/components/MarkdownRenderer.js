import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MarkdownRenderer = ({ filePath }) => {
    const [content, setContent] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('尝试加载文件:', filePath);
        fetch(filePath)
            .then(response => {
                console.log('文件加载响应:', response.status, response.statusText);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(text => {
                console.log('成功加载文件内容,长度:', text.length);
                console.log('文件内容前100个字符:', text.substring(0, 100));
                setContent(text);
            })
            .catch(err => {
                console.error('加载Markdown文件时出错:', err);
                setError(`无法加载内容: ${err.message}`);
            });
    }, [filePath]);

    if (error) return <div>错误: {error}</div>;
    if (!content) return <div>加载中...</div>;

    return (
        <div>
            <p>内容长度: {content.length}</p>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
    );
};

export default MarkdownRenderer;
