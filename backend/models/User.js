const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
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
