const express = require('express');
const {
  updateProfile,
  getMyPosts,
  getAdoptionRequests
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.put('/profile', protect, upload.single('profileImage'), updateProfile);
router.get('/my-posts', protect, getMyPosts);
router.get('/adoption-requests', protect, getAdoptionRequests);

module.exports = router;
