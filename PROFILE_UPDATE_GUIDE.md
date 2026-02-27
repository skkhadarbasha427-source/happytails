# Profile Update Feature Guide

## What's New

Users can now update their profile information including:
- Phone Number (10-digit validation)
- Name
- Profile Image

## User Flow

### 1. Registration
- User enters name and email
- Receives OTP
- After verification, automatically redirected to Profile page
- Prompted to complete phone number

### 2. Login
- User enters email and OTP
- If profile incomplete (missing name or phone), redirected to Profile page
- If profile complete, redirected to Home

### 3. Profile Completion Banner
- Shows at top of all pages when profile is incomplete
- Displays what information is missing
- Click "Complete Profile" to go to profile page
- Disappears once profile is complete

## Profile Page Features

### Editable Fields:
- **Phone Number**: 10-digit Indian phone number
- **Name**: User's full name
- **Profile Image**: Upload profile picture

### Current Info Display:
- Shows current email (read-only)
- Shows current phone and name if already set

### Validation:
- Phone number must be exactly 10 digits
- Image uploads supported (jpg, png, etc.)
- All fields are optional but recommended

## API Endpoints

### Update Profile
```
PUT /api/users/profile
Authorization: Bearer {token}
Content-Type: multipart/form-data

Body:
- name: string (optional)
- phoneNumber: string (optional, 10 digits)
- profileImage: file (optional)
```

**Response:**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": {
    "id": "...",
    "email": "user@example.com",
    "phoneNumber": "9876543210",
    "name": "John Doe",
    "profileImage": "https://..."
  }
}
```

## Testing Steps

1. **Register New User:**
   - Go to /register
   - Enter name and email
   - Verify OTP
   - Should redirect to /profile
   - See banner prompting to complete profile

2. **Update Profile:**
   - Enter phone number (10 digits)
   - Optionally upload profile image
   - Click "Update Profile"
   - Should see success message
   - Banner should disappear

3. **Login Existing User:**
   - Go to /login
   - Enter email and OTP
   - If profile incomplete, redirects to /profile
   - If profile complete, redirects to /home

## Files Modified

### Backend:
- `backend/controllers/userController.js` - Added phone number validation
- `backend/models/User.js` - Already had phoneNumber field

### Frontend:
- `frontend/src/pages/Profile.js` - Added phone number editing
- `frontend/src/pages/Login.js` - Added profile completion check
- `frontend/src/pages/Register.js` - Auto-redirect to profile
- `frontend/src/components/ProfileCompletionBanner.js` - New component
- `frontend/src/components/ProfileCompletionBanner.css` - Banner styles
- `frontend/src/App.js` - Added banner component

## Notes

- Phone number validation: Must be exactly 10 digits
- Profile images uploaded to Cloudinary (if configured)
- Banner only shows for logged-in users with incomplete profiles
- All profile fields are optional but recommended for better experience
