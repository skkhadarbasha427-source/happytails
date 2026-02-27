const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  phoneNumber: {
    type: String,
    trim: true,
    sparse: true  // Allows multiple null values
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    trim: true
  },
  profileImage: {
    type: String,
    default: ''
  },
  otp: {
    code: String,
    expiresAt: Date
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
