import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../contexts/Web3Context';
import CreatePost from '../components/CreatePost';
import Feed from '../components/Feed';

function Home() {
    const { active, account } = useWeb3();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (active) {
            // 从智能合约获取帖子
            fetchPosts();
        }
    }, [active]);

    async function fetchPosts() {
        // 实现从智能合约获取帖子的逻辑
    }

    return (
        <div className="home">
            <h1>欢迎来到去中心化社交平台</h1>
            {active ? (
                <>
                    <CreatePost onPostCreated={fetchPosts} />
                    <Feed posts={posts} />
                </>
            ) : (
                <p>请连接您的钱包以使用平台功能</p>
            )}
        </div>
    );
}

export default Home;