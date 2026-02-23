const mongoose = require('mongoose');

const adoptionRequestSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  requesterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  }
}, {
  timestamps: true
});

// Prevent duplicate requests
adoptionRequestSchema.index({ postId: 1, requesterId: 1 }, { unique: true });

module.exports = mongoose.model('AdoptionRequest', adoptionRequestSchema);
