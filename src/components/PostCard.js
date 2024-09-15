import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWeb3 } from '../contexts/Web3Context';
import { getFromIPFS } from '../utils/ipfsUtils';

function PostCard({ post }) {
    const [content, setContent] = useState('');
    const { contract } = useWeb3();

    useEffect(() => {
        fetchContent();
    }, []);

    async function fetchContent() {
        const ipfsContent = await getFromIPFS(post.contentHash);
        setContent(ipfsContent);
    }

    async function handleLike() {
        try {
            await contract.likePost(post.id);
            // 更新点赞状态
        } catch (error) {
            console.error('点赞失败:', error);
        }
    }

    return (
        <div className="post-card">
            <Link to={`/profile/${post.author}`}>
                <h3>{post.author}</h3>
            </Link>
            <p>{content}</p>
            <button onClick={handleLike}>点赞 ({post.likeCount})</button>
        </div>
    );
}

export default PostCard;