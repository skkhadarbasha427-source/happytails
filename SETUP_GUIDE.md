# Happily Tails - Complete Setup Guide

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Twilio account (for OTP)
- Cloudinary account (for image storage)

## Step 1: Clone and Setup Backend

```bash
cd backend
npm install
```

## Step 2: Configure Backend Environment

Create `.env` file in backend folder:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/happily-tails
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
OTP_EXPIRE=10

# Twilio Configuration
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Getting Twilio Credentials:
1. Sign up at https://www.twilio.com/
2. Get a phone number with SMS capability
3. Copy Account SID and Auth Token from dashboard

### Getting Cloudinary Credentials:
1. Sign up at https://cloudinary.com/
2. Go to Dashboard
3. Copy Cloud Name, API Key, and API Secret

## Step 3: Start Backend Server

```bash
cd backend
npm run dev
```

Backend will run on http://localhost:5000

## Step 4: Setup Frontend

```bash
cd frontend
npm install
```

## Step 5: Configure Frontend Environment

Create `.env` file in frontend folder:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Step 6: Start Frontend

```bash
cd frontend
npm start
```

Frontend will run on http://localhost:3000

## Step 7: Test the Application

1. Open http://localhost:3000
2. Click "Login"
3. Enter phone number with country code (e.g., +1234567890)
4. Receive OTP via SMS
5. Enter OTP to login
6. Create a post with image and location
7. Browse posts and request adoption

## Project Structure

```
happily-tails/
├── backend/
│   ├── config/          # Database and service configs
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Auth, upload, error handling
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── utils/           # Helper functions
│   ├── server.js        # Entry point
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── context/     # Auth context
│   │   ├── pages/       # Page components
│   │   ├── utils/       # API client
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## API Endpoints

See `backend/API.md` for complete API documentation.

## Features Implemented

✅ Phone OTP authentication
✅ JWT-based authorization
✅ Image upload to Cloudinary
✅ GPS location capture
✅ Post creation with timestamp
✅ Category filtering (Animal/Bird/Aquatic)
✅ Search functionality
✅ Adoption request system
✅ User profile management
✅ Location-based filtering
✅ Map view with Leaflet
✅ Responsive design
✅ Rate limiting
✅ Input validation
✅ Error handling

## Security Features

- JWT authentication
- OTP verification with expiration
- Rate limiting on OTP requests
- Input validation with Joi
- MongoDB sanitization
- Helmet security headers
- CORS configuration
- Protected routes

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGODB_URI in .env

### Twilio SMS Not Sending
- Verify Twilio credentials
- Check phone number format (include country code)
- Ensure Twilio account has credits

### Image Upload Failing
- Verify Cloudinary credentials
- Check file size (max 5MB)
- Ensure file is an image format

### Location Not Working
- Enable location permissions in browser
- Use HTTPS in production

## Production Deployment

1. Set NODE_ENV=production
2. Use MongoDB Atlas for database
3. Deploy backend to Heroku/Railway/DigitalOcean
4. Deploy frontend to Vercel/Netlify
5. Update CORS and API URLs
6. Use environment variables for all secrets
7. Enable HTTPS

## Next Steps (Optional Enhancements)

- Add admin panel
- Implement real-time notifications
- Add chat between adopter and owner
- Email notifications
- Social media sharing
- Advanced search filters
- Pet categories with breeds
- Vaccination records
- Multi-image upload
- Video support
