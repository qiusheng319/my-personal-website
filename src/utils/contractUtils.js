import { ethers } from 'ethers';
import SocialMediaABI from '../abis/SocialMedia.json';

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

export async function getContract(signer) {
    return new ethers.Contract(contractAddress, SocialMediaABI.abi, signer);
}

export async function createUser(contract, username, profileHash) {
    try {
        const tx = await contract.createUser(username, profileHash);
        await tx.wait();
        return true;
    } catch (error) {
        console.error('创建用户失败:', error);
        throw error;
    }
}

export async function createPost(contract, contentHash) {
    try {
        const tx = await contract.createPost(contentHash);
        await tx.wait();
        return true;
    } catch (error) {
        console.error('创建帖子失败:', error);
        throw error;
    }
}

export async function followUser(contract, userToFollow) {
    try {
        const tx = await contract.followUser(userToFollow);
        await tx.wait();
        return true;
    } catch (error) {
        console.error('关注用户失败:', error);
        throw error;
    }
}

export async function likePost(contract, postId) {
    try {
        const tx = await contract.likePost(postId);
        await tx.wait();
        return true;
    } catch (error) {
        console.error('点赞帖子失败:', error);
        throw error;
    }
}

export async function getPosts(contract, startIndex, count) {
    try {
        const posts = await contract.getPosts(startIndex, count);
        return posts;
    } catch (error) {
        console.error('获取帖子失败:', error);
        throw error;
    }
}

export async function getUserProfile(contract, userAddress) {
    try {
        const profile = await contract.users(userAddress);
        return profile;
    } catch (error) {
        console.error('获取用户资料失败:', error);
        throw error;
    }
}