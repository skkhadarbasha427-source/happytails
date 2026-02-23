# Happily Tails - Animal Adoption Platform

A full-stack MERN application for animal adoption and rescue.

## Tech Stack
- Frontend: React.js
- Backend: Node.js + Express.js
- Database: MongoDB
- Authentication: Phone OTP + JWT
- Storage: Cloudinary
- Location: Browser GPS API

## Project Structure
```
happily-tails/
├── backend/          # Express API
└── frontend/         # React app
```

## Setup Instructions

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Configure environment variables
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=your_twilio_phone
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NODE_ENV=development
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_GOOGLE_MAPS_API_KEY=your_maps_key
```

## API Documentation

See `backend/API.md` for detailed endpoint documentation.

## Features
- Phone OTP authentication
- Pet posting with image upload
- GPS location capture
- Adoption request system
- User profiles
- Category filtering
- Location-based sorting
