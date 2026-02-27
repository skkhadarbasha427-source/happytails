# Breed API Testing Guide

## Setup Instructions

1. **Restart your backend server** (if running)
2. **Seed the breed data** first before testing other endpoints

## Postman Testing Endpoints

### 1. Seed Breed Data (Run this FIRST)
```
POST http://localhost:5000/api/breeds/seed
```
This will populate your database with sample breeds (Dogs, Cats, Birds, Fish).

**Expected Response:**
```json
{
  "success": true,
  "message": "13 breeds seeded successfully",
  "data": [...]
}
```

---

### 2. Get All Breeds
```
GET http://localhost:5000/api/breeds
```

**Expected Response:**
```json
{
  "success": true,
  "count": 13,
  "data": [
    {
      "_id": "...",
      "name": "Labrador Retriever",
      "category": "Animal",
      "animalType": "Dog",
      "description": "Friendly, outgoing, and active. Great family dogs.",
      "temperament": "Friendly, Active, Gentle",
      "size": "Large",
      "suitableForIndianClimate": true
    },
    ...
  ]
}
```

---

### 3. Get Breeds by Category
```
GET http://localhost:5000/api/breeds?category=Animal
```

**Query Parameters:**
- `category`: Animal, Bird, or Aquatic
- `animalType`: Dog, Cat, Parrot, Fish, etc.

**Examples:**
- Get all dogs: `GET http://localhost:5000/api/breeds?category=Animal&animalType=Dog`
- Get all birds: `GET http://localhost:5000/api/breeds?category=Bird`
- Get all cats: `GET http://localhost:5000/api/breeds?animalType=Cat`

---

### 4. Get Single Breed by ID
```
GET http://localhost:5000/api/breeds/{breed_id}
```
Replace `{breed_id}` with actual breed ID from the seed response.

---

### 5. Get Posts Filtered by Breed
```
GET http://localhost:5000/api/posts?breedId={breed_id}
```

**Query Parameters for Posts:**
- `category`: Animal, Bird, Aquatic
- `animalType`: Dog, Cat, Parrot, Fish
- `breedId`: Specific breed ID
- `status`: Available, Adopted

**Examples:**
- Get all available dogs: `GET http://localhost:5000/api/posts?category=Animal&animalType=Dog&status=Available`
- Get specific breed posts: `GET http://localhost:5000/api/posts?breedId=123456`

---

### 6. Create Post with Breed (Requires Authentication)
```
POST http://localhost:5000/api/posts
Headers:
  Authorization: Bearer {your_jwt_token}
  Content-Type: multipart/form-data

Body (form-data):
  category: Animal
  animalType: Dog
  breedId: {breed_id_from_breeds_list}
  petName: Max
  age: 2 years
  gender: Male
  description: Friendly Labrador looking for a loving home
  latitude: 17.385044
  longitude: 78.486671
  image: [upload file]
```

---

## Frontend Testing

1. **Start backend:** `cd backend && npm start`
2. **Start frontend:** `cd frontend && npm start`
3. **Visit:** http://localhost:3000/breeds

You should see:
- Filter by category (Animal/Bird/Aquatic)
- Filter by animal type (Dog/Cat/Parrot/Fish)
- Grid of breed cards with information
- Climate suitability badges

---

## Database Schema Updates

The Post model now includes:
- `animalType`: String (Dog, Cat, Parrot, Fish, etc.)
- `breedId`: Reference to Breed model
- `petName`: String (optional)
- `age`: String (optional)
- `gender`: Enum (Male, Female, Unknown)

---

## Notes

- Breed selection is optional when creating posts
- All breeds are pre-seeded with Indian climate suitability info
- The breeds page is publicly accessible (no login required)
- Post filtering now supports breed-based search
