const express = require('express');
const {
  createAdoptionRequest,
  updateAdoptionRequest,
  getMyRequests
} = require('../controllers/adoptionController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/:postId', protect, createAdoptionRequest);
router.put('/:id', protect, updateAdoptionRequest);
router.get('/my-requests', protect, getMyRequests);

module.exports = router;
