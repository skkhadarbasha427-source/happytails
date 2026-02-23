const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    enum: ['Animal', 'Bird', 'Aquatic'],
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    }
  },
  status: {
    type: String,
    enum: ['Available', 'Adopted'],
    default: 'Available'
  }
}, {
  timestamps: true
});

// Index for location-based queries
postSchema.index({ 'location.latitude': 1, 'location.longitude': 1 });
postSchema.index({ category: 1, status: 1 });

module.exports = mongoose.model('Post', postSchema);
