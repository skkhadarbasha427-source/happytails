const mongoose = require('mongoose');

const breedSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['Animal', 'Bird', 'Aquatic'],
    required: true
  },
  animalType: {
    type: String,
    required: true,
    trim: true // e.g., 'Dog', 'Cat', 'Parrot', 'Fish'
  },
  description: {
    type: String,
    trim: true
  },
  temperament: {
    type: String,
    trim: true
  },
  size: {
    type: String,
    enum: ['Small', 'Medium', 'Large', 'Extra Large'],
    required: true
  },
  suitableForIndianClimate: {
    type: Boolean,
    default: true
  },
  imageUrl: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

breedSchema.index({ category: 1, animalType: 1 });
breedSchema.index({ name: 1 });

module.exports = mongoose.model('Breed', breedSchema);
