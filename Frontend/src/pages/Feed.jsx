import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:3000/posts');
            setPosts(response.data.posts || []);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching posts:', error);
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="feed-section">
                <h1>Feed</h1>
                <div className="loading-spinner"></div>
            </div>
        );
    }

    return (
        <div className="feed-section">
            <h1>Feed</h1>
            {posts.length === 0 ? (
                <div className="no-posts">No posts yet. Be the first to share!</div>
            ) : (
                posts.map((post) => (
                    <div key={post._id} className="post_card">
                        {post.image && (
                            <div className="image-container">
                                <img 
                                    src={post.image} 
                                    alt={post.caption} 
                                    className="post-image"
                                />
                            </div>
                        )}
                        <p className="post-caption">{post.caption}</p>
                        <div className="post-actions">
                            <button>❤️ Like</button>
                            <button>💬 Comment</button>
                            <button>📤 Share</button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Feed;