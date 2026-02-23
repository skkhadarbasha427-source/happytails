import React, { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import API from '../utils/api';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user, login } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || '');
  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState(user?.profileImage || '');
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('name', name);
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }

    try {
      const { data } = await API.put('/users/profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      login(localStorage.getItem('token'), data.user);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Phone Number</label>
            <input type="text" value={user?.phoneNumber} disabled />
          </div>

          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>

          <div className="form-group">
            <label>Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {preview && (
              <img src={preview} alt="Preview" style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '50%', marginTop: '10px' }} />
            )}
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
