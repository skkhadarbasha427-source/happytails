import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './ProfileCompletionBanner.css';

const ProfileCompletionBanner = () => {
  const { user } = useContext(AuthContext);

  // Don't show if user is not logged in or profile is complete
  if (!user || (user.name && user.phoneNumber)) {
    return null;
  }

  return (
    <div className="profile-completion-banner">
      <div className="banner-content">
        <span className="banner-icon">⚠️</span>
        <span className="banner-text">
          Your profile is incomplete. Please add your {!user.name && 'name'}{!user.name && !user.phoneNumber && ' and '}{!user.phoneNumber && 'phone number'} to continue.
        </span>
        <Link to="/profile" className="banner-button">
          Complete Profile
        </Link>
      </div>
    </div>
  );
};

export default ProfileCompletionBanner;
