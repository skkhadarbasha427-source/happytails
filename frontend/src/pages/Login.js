import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
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
      toast.error(error.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await API.post('/auth/verify-otp', { email, otp });
      login(data.token, data.user);
      toast.success('Login successful!');
      
      // Check if profile is incomplete
      if (!data.user.name || !data.user.phoneNumber) {
        toast.info('Please complete your profile');
        navigate('/profile');
      } else {
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container login-container">
      <div className="login-card card">
        <h2>🐾 Welcome to Happily Tails</h2>
        <p>Login with your email</p>
        
        {!otpSent ? (
          <form onSubmit={handleSendOTP}>
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
              Don't have an account? <Link to="/register">Register here</Link>
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
              {loading ? 'Verifying...' : 'Verify OTP'}
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

export default Login;
