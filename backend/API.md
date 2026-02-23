# Happily Tails API Documentation

Base URL: `http://localhost:5000/api`

## Authentication Endpoints

### Send OTP
```
POST /auth/send-otp
Content-Type: application/json

{
  "phoneNumber": "+1234567890"
}

Response: { "success": true, "message": "OTP sent successfully" }
```

### Verify OTP
```
POST /auth/verify-otp
Content-Type: application/json

{
  "phoneNumber": "+1234567890",
  "otp": "123456"
}

Response: {
  "success": true,
  "token": "jwt_token",
  "user": { "id": "...", "phoneNumber": "...", "name": "..." }
}
```

### Get Current User
```
GET /auth/me
Authorization: Bearer {token}

Response: { "success": true, "user": {...} }
```

## Post Endpoints

### Create Post
```
POST /posts
Authorization: Bearer {token}
Content-Type: multipart/form-data

Fields:
- image: File
- category: "Animal" | "Bird" | "Aquatic"
- description: string
- latitude: number
- longitude: number

Response: { "success": true, "post": {...} }
```

### Get All Posts
```
GET /posts?category=Animal&status=Available&search=dog&lat=40.7128&lng=-74.0060&radius=50

Response: { "success": true, "count": 10, "posts": [...] }
```

### Get Single Post
```
GET /posts/:id

Response: { "success": true, "post": {...} }
```

### Update Post
```
PUT /posts/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "description": "Updated description",
  "status": "Adopted"
}

Response: { "success": true, "post": {...} }
```

### Delete Post
```
DELETE /posts/:id
Authorization: Bearer {token}

Response: { "success": true, "message": "Post deleted successfully" }
```

## User Endpoints

### Update Profile
```
PUT /users/profile
Authorization: Bearer {token}
Content-Type: multipart/form-data

Fields:
- name: string
- profileImage: File (optional)

Response: { "success": true, "user": {...} }
```

### Get My Posts
```
GET /users/my-posts
Authorization: Bearer {token}

Response: { "success": true, "count": 5, "posts": [...] }
```

### Get Adoption Requests (for my posts)
```
GET /users/adoption-requests
Authorization: Bearer {token}

Response: { "success": true, "count": 3, "requests": [...] }
```

## Adoption Endpoints

### Create Adoption Request
```
POST /adoptions/:postId
Authorization: Bearer {token}

Response: { "success": true, "adoptionRequest": {...} }
```

### Update Adoption Request Status
```
PUT /adoptions/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "Approved" | "Rejected"
}

Response: { "success": true, "adoptionRequest": {...} }
```

### Get My Adoption Requests
```
GET /adoptions/my-requests
Authorization: Bearer {token}

Response: { "success": true, "count": 2, "requests": [...] }
```

## Error Responses

All endpoints return errors in this format:
```json
{
  "success": false,
  "message": "Error message"
}
```

Common status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error
