const Breed = require('../models/Breed');

// @desc    Get all breeds
// @route   GET /api/breeds
// @access  Public
exports.getAllBreeds = async (req, res, next) => {
  try {
    const { category, animalType } = req.query;
    
    const filter = { isActive: true };
    if (category) filter.category = category;
    if (animalType) filter.animalType = animalType;

    const breeds = await Breed.find(filter).sort({ animalType: 1, name: 1 });

    res.status(200).json({
      success: true,
      count: breeds.length,
      data: breeds
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get breed by ID
// @route   GET /api/breeds/:id
// @access  Public
exports.getBreedById = async (req, res, next) => {
  try {
    const breed = await Breed.findById(req.params.id);

    if (!breed) {
      return res.status(404).json({
        success: false,
        message: 'Breed not found'
      });
    }

    res.status(200).json({
      success: true,
      data: breed
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new breed (Admin only)
// @route   POST /api/breeds
// @access  Private/Admin
exports.createBreed = async (req, res, next) => {
  try {
    const breed = await Breed.create(req.body);

    res.status(201).json({
      success: true,
      data: breed
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Seed initial breed data
// @route   POST /api/breeds/seed
// @access  Public (for development)
exports.seedBreeds = async (req, res, next) => {
  try {
    const breeds = [
      // Dogs
      {
        name: 'Labrador Retriever',
        category: 'Animal',
        animalType: 'Dog',
        description: 'Friendly, outgoing, and active. Great family dogs.',
        temperament: 'Friendly, Active, Gentle',
        size: 'Large',
        suitableForIndianClimate: true,
        imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=500&h=400&fit=crop'
      },
      {
        name: 'Indian Pariah Dog',
        category: 'Animal',
        animalType: 'Dog',
        description: 'Native Indian breed, highly adaptable and intelligent.',
        temperament: 'Alert, Social, Territorial',
        size: 'Medium',
        suitableForIndianClimate: true,
        imageUrl: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500&h=400&fit=crop'
      },
      {
        name: 'German Shepherd',
        category: 'Animal',
        animalType: 'Dog',
        description: 'Intelligent, loyal, and protective. Excellent guard dogs.',
        temperament: 'Confident, Courageous, Smart',
        size: 'Large',
        suitableForIndianClimate: true,
        imageUrl: 'https://images.unsplash.com/photo-1568572933382-74d440642117?w=500&h=400&fit=crop'
      },
      {
        name: 'Beagle',
        category: 'Animal',
        animalType: 'Dog',
        description: 'Small, friendly, and curious. Great with children.',
        temperament: 'Friendly, Curious, Merry',
        size: 'Small',
        suitableForIndianClimate: true,
        imageUrl: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=500&h=400&fit=crop'
      },
      {
        name: 'Golden Retriever',
        category: 'Animal',
        animalType: 'Dog',
        description: 'Intelligent, friendly, and devoted. Perfect family companion.',
        temperament: 'Intelligent, Friendly, Devoted',
        size: 'Large',
        suitableForIndianClimate: true,
        imageUrl: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=500&h=400&fit=crop'
      },
      // Cats
      {
        name: 'Indian Street Cat',
        category: 'Animal',
        animalType: 'Cat',
        description: 'Hardy, adaptable, and low maintenance. Perfect for Indian homes.',
        temperament: 'Independent, Adaptable, Affectionate',
        size: 'Small',
        suitableForIndianClimate: true,
        imageUrl: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=500&h=400&fit=crop'
      },
      {
        name: 'Persian Cat',
        category: 'Animal',
        animalType: 'Cat',
        description: 'Gentle, calm, and affectionate. Requires regular grooming.',
        temperament: 'Calm, Gentle, Sweet',
        size: 'Medium',
        suitableForIndianClimate: false,
        imageUrl: 'https://images.unsplash.com/photo-1589883661923-6476cb0ae9f2?w=500&h=400&fit=crop'
      },
      {
        name: 'Siamese Cat',
        category: 'Animal',
        animalType: 'Cat',
        description: 'Vocal, social, and intelligent. Loves human interaction.',
        temperament: 'Social, Vocal, Intelligent',
        size: 'Medium',
        suitableForIndianClimate: true,
        imageUrl: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=500&h=400&fit=crop'
      },
      // Birds
      {
        name: 'Budgerigar (Budgie)',
        category: 'Bird',
        animalType: 'Parrot',
        description: 'Small, colorful, and easy to care for. Great for beginners.',
        temperament: 'Playful, Social, Friendly',
        size: 'Small',
        suitableForIndianClimate: true,
        imageUrl: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=500&h=400&fit=crop'
      },
      {
        name: 'Cockatiel',
        category: 'Bird',
        animalType: 'Parrot',
        description: 'Affectionate and easy to train. Loves to whistle.',
        temperament: 'Gentle, Affectionate, Social',
        size: 'Small',
        suitableForIndianClimate: true,
        imageUrl: 'https://images.unsplash.com/photo-1606567595334-d39972c85dbe?w=500&h=400&fit=crop'
      },
      {
        name: 'Indian Ringneck Parakeet',
        category: 'Bird',
        animalType: 'Parrot',
        description: 'Native to India, intelligent and can learn to talk.',
        temperament: 'Intelligent, Playful, Independent',
        size: 'Medium',
        suitableForIndianClimate: true,
        imageUrl: 'https://images.unsplash.com/photo-1615065342332-c0e5e4116b6e?w=500&h=400&fit=crop'
      },
      // Aquatic
      {
        name: 'Goldfish',
        category: 'Aquatic',
        animalType: 'Fish',
        description: 'Hardy and easy to care for. Perfect for beginners.',
        temperament: 'Peaceful, Social',
        size: 'Small',
        suitableForIndianClimate: true,
        imageUrl: 'https://images.unsplash.com/photo-1520990269108-4f2d8b1a0f47?w=500&h=400&fit=crop'
      },
      {
        name: 'Guppy',
        category: 'Aquatic',
        animalType: 'Fish',
        description: 'Colorful, small, and easy to breed. Very popular.',
        temperament: 'Peaceful, Active',
        size: 'Small',
        suitableForIndianClimate: true,
        imageUrl: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=500&h=400&fit=crop'
      },
      {
        name: 'Betta Fish',
        category: 'Aquatic',
        animalType: 'Fish',
        description: 'Beautiful fins, low maintenance. Can live in small tanks.',
        temperament: 'Territorial, Beautiful',
        size: 'Small',
        suitableForIndianClimate: true,
        imageUrl: 'https://images.unsplash.com/photo-1520990269108-4f2d8b1a0f47?w=500&h=400&fit=crop'
      },
      {
        name: 'Pomeranian',
        category: 'Animal',
        animalType: 'Dog',
        description: 'Small, fluffy, and energetic. Great apartment dogs.',
        temperament: 'Playful, Intelligent, Bold',
        size: 'Small',
        suitableForIndianClimate: true,
        imageUrl: 'https://images.unsplash.com/photo-1542328025-a2c8e1e8e4c0?w=500&h=400&fit=crop'
      },
      {
        name: 'Shih Tzu',
        category: 'Animal',
        animalType: 'Dog',
        description: 'Affectionate, playful, and outgoing. Loves companionship.',
        temperament: 'Affectionate, Playful, Outgoing',
        size: 'Small',
        suitableForIndianClimate: true,
        imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500&h=400&fit=crop'
      },
      {
        name: 'Indie Cat',
        category: 'Animal',
        animalType: 'Cat',
        description: 'Native Indian cats, resilient and loving. Low maintenance.',
        temperament: 'Resilient, Loving, Independent',
        size: 'Small',
        suitableForIndianClimate: true,
        imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500&h=400&fit=crop'
      },
      {
        name: 'Lovebird',
        category: 'Bird',
        animalType: 'Parrot',
        description: 'Small, affectionate parrots. Best kept in pairs.',
        temperament: 'Affectionate, Social, Energetic',
        size: 'Small',
        suitableForIndianClimate: true,
        imageUrl: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=500&h=400&fit=crop'
      },
      {
        name: 'Angelfish',
        category: 'Aquatic',
        animalType: 'Fish',
        description: 'Graceful and beautiful. Requires larger tanks.',
        temperament: 'Peaceful, Graceful',
        size: 'Medium',
        suitableForIndianClimate: true,
        imageUrl: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=500&h=400&fit=crop'
      }
    ];

    await Breed.deleteMany({}); // Clear existing
    const createdBreeds = await Breed.insertMany(breeds);

    res.status(201).json({
      success: true,
      message: `${createdBreeds.length} breeds seeded successfully`,
      data: createdBreeds
    });
  } catch (error) {
    next(error);
  }
};
