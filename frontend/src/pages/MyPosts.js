import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import API from '../utils/api';
import PostCard from '../components/PostCard';

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const fetchMyPosts = async () => {
    try {
      const { data } = await API.get('/users/my-posts');
      setPosts(data.posts);
    } catch (error) {
      toast.error('Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>My Posts</h1>
      {loading ? (
        <p>Loading...</p>
      ) : posts.length === 0 ? (
        <p>You haven't posted any pets yet</p>
      ) : (
        <div className="grid">
          {posts.map(post => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPosts;
