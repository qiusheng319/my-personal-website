import React from 'react';
import PostCard from './PostCard';

function Feed({ posts }) {
    return (
        <div className="feed">
            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    );
}

export default Feed;