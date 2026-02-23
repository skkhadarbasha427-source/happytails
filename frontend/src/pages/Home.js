import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import API from '../utils/api';
import PostCard from '../components/PostCard';
import './Home.css';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    search: ''
  });

  useEffect(() => {
    fetchPosts();
  }, [filters]);

  const fetchPosts = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.status) params.append('status', filters.status);
      if (filters.search) params.append('search', filters.search);

      const { data } = await API.get(`/posts?${params.toString()}`);
      setPosts(data.posts);
    } catch (error) {
      toast.error('Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <h1>Find Your Perfect Pet 🐾</h1>
      
      <div className="filters card">
        <div className="filter-group">
          <select name="category" value={filters.category} onChange={handleFilterChange}>
            <option value="">All Categories</option>
            <option value="Animal">Animal</option>
            <option value="Bird">Bird</option>
            <option value="Aquatic">Aquatic</option>
          </select>
        </div>
        <div className="filter-group">
          <select name="status" value={filters.status} onChange={handleFilterChange}>
            <option value="">All Status</option>
            <option value="Available">Available</option>
            <option value="Adopted">Adopted</option>
          </select>
        </div>
        <div className="filter-group">
          <input
            type="text"
            name="search"
            placeholder="Search description..."
            value={filters.search}
            onChange={handleFilterChange}
          />
        </div>
      </div>

      {loading ? (
        <p>Loading posts...</p>
      ) : posts.length === 0 ? (
        <p>No posts found</p>
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

export default Home;
