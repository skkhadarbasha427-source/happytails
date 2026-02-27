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
    required: true,
    trim: true
  },
  suitableForIndianClimate: {
    type: Boolean,
    default: true
  },
  imageUrl: {
    type: String
  },
  group: {
    type: String,
    trim: true // e.g., 'Sporting', 'Herding', 'Working', 'Hound', 'Toy', 'Native/Primitive'
  },
  origin: {
    type: String,
    trim: true // e.g., 'United Kingdom', 'Germany', 'India'
  },
  weight: {
    type: String,
    trim: true // e.g., '55–80 lbs / 25–36 kg'
  },
  lifespan: {
    type: String,
    trim: true // e.g., '10–12 years'
  },
  whyGoodForIndia: {
    type: String,
    trim: true
  },
  needs: {
    type: String,
    trim: true // e.g., 'Daily exercise, moderate grooming'
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
