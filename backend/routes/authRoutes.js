const express = require('express');
const { sendOTPController, verifyOTPController, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { otpLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

router.post('/send-otp', otpLimiter, sendOTPController);
router.post('/verify-otp', verifyOTPController);
router.get('/me', protect, getMe);

module.exports = router;
