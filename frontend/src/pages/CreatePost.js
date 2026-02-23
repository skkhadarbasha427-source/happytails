import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../utils/api';

const CreatePost = () => {
  const [formData, setFormData] = useState({
    category: 'Animal',
    description: '',
    image: null
  });
  const [location, setLocation] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          toast.error('Please enable location access');
        }
      );
    }
  }, []);

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!location) {
      toast.error('Location not available');
      return;
    }

    if (!formData.image) {
      toast.error('Please select an image');
      return;
    }

    setLoading(true);
    const data = new FormData();
    data.append('image', formData.image);
    data.append('category', formData.category);
    data.append('description', formData.description);
    data.append('latitude', location.latitude);
    data.append('longitude', location.longitude);

    try {
      await API.post('/posts', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Post created successfully!');
      navigate('/my-posts');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2>Post a Pet for Adoption</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Category</label>
            <select name="category" value={formData.category} onChange={handleChange} required>
              <option value="Animal">Animal</option>
              <option value="Bird">Bird</option>
              <option value="Aquatic">Aquatic</option>
            </select>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the pet..."
              required
            />
          </div>

          <div className="form-group">
            <label>Upload Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              required
            />
            {preview && (
              <img src={preview} alt="Preview" style={{ width: '100%', marginTop: '10px', borderRadius: '8px' }} />
            )}
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              value={location ? `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}` : 'Getting location...'}
              disabled
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading || !location}>
            {loading ? 'Creating...' : 'Create Post'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
