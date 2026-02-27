import React, { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import API from '../utils/api';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user, login } = useContext(AuthContext);
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const [name, setName] = useState(user?.name || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    if (name) formData.append('name', name);
    if (phoneNumber) formData.append('phoneNumber', phoneNumber);

    try {
      const { data } = await API.put('/users/profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      login(localStorage.getItem('token'), data.user);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ paddingTop: '40px' }}>
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2>Edit Profile</h2>
        
        {/* Display current profile info */}
        <div style={{ marginBottom: '20px', padding: '15px', background: '#f5f5f5', borderRadius: '8px' }}>
          <p><strong>Email:</strong> {user?.email}</p>
          {user?.phoneNumber && <p><strong>Current Phone:</strong> {user.phoneNumber}</p>}
          {user?.name && <p><strong>Current Name:</strong> {user.name}</p>}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number"
              pattern="[0-9]{10}"
              title="Please enter a valid 10-digit phone number"
            />
            <small style={{ color: '#666' }}>Enter 10-digit phone number</small>
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

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
