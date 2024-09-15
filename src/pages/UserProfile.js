import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import PostCard from '../components/PostCard';

function UserProfile() {
    const { address } = useParams();
    const { library } = useWeb3React();
    const [userInfo, setUserInfo] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchUserData() {
            if (!library || !address) return;

            const contractAddress = "0x1234567890123456789012345678901234567890"; // 替换为您的实际合约地址

            const contractABI = [
                {
                    "inputs": [
                        {
                            "internalType": "string",
                            "name": "_username",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "_profileHash",
                            "type": "string"
                        }
                    ],
                    "name": "createUser",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "string",
                            "name": "_contentHash",
                            "type": "string"
                        }
                    ],
                    "name": "createPost",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "_userToFollow",
                            "type": "address"
                        }
                    ],
                    "name": "followUser",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "_postId",
                            "type": "uint256"
                        }
                    ],
                    "name": "likePost",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "_user",
                            "type": "address"
                        }
                    ],
                    "name": "getUserPosts",
                    "outputs": [
                        {
                            "components": [
                                {
                                    "internalType": "uint256",
                                    "name": "id",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "address",
                                    "name": "author",
                                    "type": "address"
                                },
                                {
                                    "internalType": "string",
                                    "name": "contentHash",
                                    "type": "string"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "timestamp",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "likeCount",
                                    "type": "uint256"
                                }
                            ],
                            "internalType": "struct SocialMedia.Post[]",
                            "name": "",
                            "type": "tuple[]"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "name": "users",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "userAddress",
                            "type": "address"
                        },
                        {
                            "internalType": "string",
                            "name": "username",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "profileHash",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "followerCount",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "followingCount",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                }
            ];
            try {
                setLoading(true);
                // 假设您有一个合约实例
                const contract = new ethers.Contract(contractAddress, contractABI, library.getSigner());

                // 获取用户信息
                const user = await contract.users(address);
                setUserInfo({
                    username: user.username,
                    followerCount: user.followerCount.toNumber(),
                    followingCount: user.followingCount.toNumber(),
                });

                // 获取用户的帖子
                const userPosts = await contract.getUserPosts(address);
                setPosts(userPosts);

                setLoading(false);
            } catch (err) {
                console.error('获取用户数据失败:', err);
                setError('获取用户数据失败');
                setLoading(false);
            }
        }

        fetchUserData();
    }, [library, address]);

    if (loading) return <div>加载中...</div>;
    if (error) return <div>错误: {error}</div>;
    if (!userInfo) return <div>未找到用户</div>;

    return (
        <div className="user-profile">
            <h1>{userInfo.username}</h1>
            <p>地址: {address}</p>
            <p>关注者: {userInfo.followerCount}</p>
            <p>正在关注: {userInfo.followingCount}</p>

            <h2>帖子</h2>
            {posts.length === 0 ? (
                <p>该用户还没有发布任何帖子</p>
            ) : (
                posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))
            )}
        </div>
    );
}

export default UserProfile;