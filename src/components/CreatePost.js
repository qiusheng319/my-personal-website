import React, { useState } from 'react';
import { useWeb3 } from '../contexts/Web3Context';
import { uploadToIPFS } from '../utils/ipfsUtils';

function CreatePost({ onPostCreated }) {
    const [content, setContent] = useState('');
    const { contract } = useWeb3();

    async function handleSubmit(e) {
        e.preventDefault();
        if (!content.trim()) return;

        try {
            const contentHash = await uploadToIPFS(content);
            await contract.createPost(contentHash);
            setContent('');
            onPostCreated();
        } catch (error) {
            console.error('发布帖子失败:', error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
      <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="分享您的想法..."
      />
            <button type="submit">发布</button>
        </form>
    );
}

export default CreatePost;