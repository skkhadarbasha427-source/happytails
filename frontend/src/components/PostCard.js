import React from 'react';
import { Link } from 'react-router-dom';
import './PostCard.css';

const PostCard = ({ post }) => {
  return (
    <div className="post-card">
      <img src={post.imageUrl} alt={post.category} className="post-image" />
      <div className="post-content">
        <span className={`badge ${post.status === 'Available' ? 'badge-success' : 'badge-secondary'}`}>
          {post.status}
        </span>
        <span className="badge badge-primary">{post.category}</span>
        <p className="post-description">{post.description.substring(0, 100)}...</p>
        <div className="post-meta">
          <span>📍 {post.location.latitude.toFixed(2)}, {post.location.longitude.toFixed(2)}</span>
          <span>🕒 {new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        <Link to={`/posts/${post._id}`} className="btn btn-primary">View Details</Link>
      </div>
    </div>
  );
};

export default PostCard;
