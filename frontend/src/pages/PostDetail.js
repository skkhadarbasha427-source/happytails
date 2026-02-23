import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import API from '../utils/api';
import { AuthContext } from '../context/AuthContext';

const PostDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const { data } = await API.get(`/posts/${id}`);
      setPost(data.post);
    } catch (error) {
      toast.error('Failed to fetch post');
    } finally {
      setLoading(false);
    }
  };

  const handleAdoptionRequest = async () => {
    if (!user) {
      toast.error('Please login to request adoption');
      navigate('/login');
      return;
    }

    try {
      await API.post(`/adoptions/${id}`);
      toast.success('Adoption request sent!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send request');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await API.delete(`/posts/${id}`);
        toast.success('Post deleted successfully');
        navigate('/my-posts');
      } catch (error) {
        toast.error('Failed to delete post');
      }
    }
  };

  if (loading) return <div className="container">Loading...</div>;
  if (!post) return <div className="container">Post not found</div>;

  const isOwner = user && post.userId._id === user._id;

  return (
    <div className="container">
      <div className="card">
        <img src={post.imageUrl} alt={post.category} style={{ width: '100%', maxHeight: '500px', objectFit: 'cover', borderRadius: '8px' }} />
        
        <div style={{ marginTop: '20px' }}>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
            <span className={`badge ${post.status === 'Available' ? 'badge-success' : 'badge-secondary'}`}>
              {post.status}
            </span>
            <span className="badge badge-primary">{post.category}</span>
          </div>

          <h2>{post.category} for Adoption</h2>
          <p style={{ fontSize: '18px', color: '#555', margin: '15px 0' }}>{post.description}</p>

          <div style={{ marginBottom: '20px' }}>
            <p><strong>Posted by:</strong> {post.userId.name || post.userId.phoneNumber}</p>
            <p><strong>Posted on:</strong> {new Date(post.createdAt).toLocaleString()}</p>
            <p><strong>Location:</strong> {post.location.latitude.toFixed(4)}, {post.location.longitude.toFixed(4)}</p>
          </div>

          <div style={{ height: '300px', marginBottom: '20px' }}>
            <MapContainer
              center={[post.location.latitude, post.location.longitude]}
              zoom={13}
              style={{ height: '100%', borderRadius: '8px' }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[post.location.latitude, post.location.longitude]}>
                <Popup>Pet Location</Popup>
              </Marker>
            </MapContainer>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            {!isOwner && post.status === 'Available' && (
              <button onClick={handleAdoptionRequest} className="btn btn-primary">
                Request Adoption
              </button>
            )}
            {isOwner && (
              <button onClick={handleDelete} className="btn btn-danger">
                Delete Post
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
