import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import './Login.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/auth/send-otp', { email });
      setOtpSent(true);
      toast.success('OTP sent to your email!');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to send OTP';
      
      // If email already exists, redirect to login
      if (errorMessage.includes('already registered')) {
        toast.error('Email already registered. Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await API.post('/auth/verify-otp', { email, otp });
      
      // Update profile with name if provided
      if (name.trim()) {
        await API.put('/users/profile', { name }, {
          headers: { Authorization: `Bearer ${data.token}` }
        });
      }
      
      login(data.token, data.user);
      toast.success('Registration successful!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container login-container">
      <div className="login-card card">
        <h2>🐾 Join Happily Tails</h2>
        <p>Create your account</p>
        
        {!otpSent ? (
          <form onSubmit={handleSendOTP}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
            <p style={{ marginTop: '15px', textAlign: 'center' }}>
              Already have an account? <Link to="/login">Login here</Link>
            </p>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP}>
            <div className="form-group">
              <label>Enter OTP</label>
              <input
                type="text"
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength="6"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Verifying...' : 'Verify & Register'}
            </button>
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={() => setOtpSent(false)}
              style={{ marginLeft: '10px' }}
            >
              Change Email
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;
