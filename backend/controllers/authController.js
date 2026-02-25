const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { sendOTP } = require('../utils/emailService');
const { validateEmail, validateOTP } = require('../utils/validators');

// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

// @desc    Send OTP to email
// @route   POST /api/auth/send-otp
// @access  Public
exports.sendOTPController = async (req, res, next) => {
  try {
    const { error } = validateEmail(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const { email } = req.body;
    const otp = generateOTP();
    const otpExpire = new Date(Date.now() + parseInt(process.env.OTP_EXPIRE || 10) * 60 * 1000);

    // Find or create user
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email });
    }

    // Save OTP
    user.otp = { code: otp, expiresAt: otpExpire };
    await user.save();

    // Send OTP via Email
    await sendOTP(email, otp);

    res.status(200).json({
      success: true,
      message: 'OTP sent successfully to your email'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Verify OTP and login
// @route   POST /api/auth/verify-otp
// @access  Public
exports.verifyOTPController = async (req, res, next) => {
  try {
    const { error } = validateOTP(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Development mode: Accept any OTP
    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ Development mode: Accepting any OTP for ${email}`);
      
      // Mark as verified and clear OTP
      user.isVerified = true;
      user.otp = undefined;
      await user.save();

      const token = generateToken(user._id);

      return res.status(200).json({
        success: true,
        token,
        user: {
          id: user._id,
          email: user.email,
          phoneNumber: user.phoneNumber,
          name: user.name,
          profileImage: user.profileImage
        }
      });
    }

    // Production mode: Verify OTP
    // Check OTP
    if (!user.otp || user.otp.code !== otp) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    // Check expiration
    if (new Date() > user.otp.expiresAt) {
      return res.status(400).json({ success: false, message: 'OTP expired' });
    }

    // Mark as verified and clear OTP
    user.isVerified = true;
    user.otp = undefined;
    await user.save();

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        phoneNumber: user.phoneNumber,
        name: user.name,
        profileImage: user.profileImage
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user
    });
  } catch (error) {
    next(error);
  }
};
