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
      // Dogs - Detailed Information
      {
        name: 'Labrador Retriever',
        category: 'Animal',
        animalType: 'Dog',
        description: 'Friendly, outgoing, and active. Great family dogs.',
        temperament: 'Friendly, intelligent, gentle',
        size: 'Large',
        suitableForIndianClimate: true,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/34/Labrador_on_Quantock_%282175262184%29.jpg',
        group: 'Sporting',
        origin: 'United Kingdom',
        weight: '55–80 lbs / 25–36 kg',
        lifespan: '10–12 years',
        whyGoodForIndia: 'Adapts well to warm climates, very popular across Indian cities',
        needs: 'Daily exercise, moderate grooming'
      },
      {
        name: 'Golden Retriever',
        category: 'Animal',
        animalType: 'Dog',
        description: 'Intelligent, friendly, and devoted. Perfect family companion.',
        temperament: 'Loyal, affectionate, smart',
        size: 'Large',
        suitableForIndianClimate: true,
        imageUrl: 'https://www.metlifepetinsurance.com/content/dam/metlifecom/us/metlifepetinsurance/images/blog/breed-spotlight/Golden-retriever-thumbnail.webp',
        group: 'Sporting',
        origin: 'Scotland',
        weight: '55–75 lbs / 25–34 kg',
        lifespan: '10–12 years',
        whyGoodForIndia: 'Adjusts well with proper grooming and shade',
        needs: 'Regular brushing, daily walks'
      },
      {
        name: 'German Shepherd',
        category: 'Animal',
        animalType: 'Dog',
        description: 'Intelligent, loyal, and protective. Excellent guard dogs.',
        temperament: 'Protective, intelligent, loyal',
        size: 'Large',
        suitableForIndianClimate: true,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/German_Shepherd_-_DSC_0346_%2810096362833%29.jpg',
        group: 'Herding',
        origin: 'Germany',
        weight: '50–90 lbs / 22–40 kg',
        lifespan: '9–13 years',
        whyGoodForIndia: 'Strong and adaptable; commonly used as guard dogs',
        needs: 'High exercise, training'
      },
      {
        name: 'Rottweiler',
        category: 'Animal',
        animalType: 'Dog',
        description: 'Confident, protective, and calm. Excellent guard dogs.',
        temperament: 'Confident, protective, calm',
        size: 'Large',
        suitableForIndianClimate: true,
        imageUrl: 'https://cdn.shopify.com/s/files/1/0571/3867/5920/files/Origin_and_History_of_Rottweiler_480x480.png?v=1717524054',
        group: 'Working',
        origin: 'Germany',
        weight: '80–135 lbs / 36–61 kg',
        lifespan: '8–10 years',
        whyGoodForIndia: 'Handles heat better than thick-coated breeds',
        needs: 'Firm training, space preferred'
      },
      {
        name: 'Doberman Pinscher',
        category: 'Animal',
        animalType: 'Dog',
        description: 'Alert, loyal, and fearless. Excellent protection dogs.',
        temperament: 'Alert, loyal, fearless',
        size: 'Large',
        suitableForIndianClimate: true,
        imageUrl: 'https://i.pinimg.com/474x/b2/5b/a7/b25ba7cad736d51422c72f994f458062.jpg',
        group: 'Working',
        origin: 'Germany',
        weight: '60–100 lbs / 27–45 kg',
        lifespan: '10–13 years',
        whyGoodForIndia: 'Short coat helps in hot weather',
        needs: 'Regular exercise, strong leadership'
      },
      {
        name: 'Beagle',
        category: 'Animal',
        animalType: 'Dog',
        description: 'Small, friendly, and curious. Great with children.',
        temperament: 'Friendly, curious, energetic',
        size: 'Small',
        suitableForIndianClimate: true,
        imageUrl: 'https://cdn.britannica.com/16/234216-050-C66F8665/beagle-hound-dog.jpg',
        group: 'Hound',
        origin: 'England',
        weight: '20–30 lbs / 9–14 kg',
        lifespan: '10–15 years',
        whyGoodForIndia: 'Adapts well to families and moderate heat',
        needs: 'Daily walks, mental stimulation'
      },
      {
        name: 'Dachshund',
        category: 'Animal',
        animalType: 'Dog',
        description: 'Brave, clever, and stubborn. Unique long body shape.',
        temperament: 'Brave, clever, stubborn',
        size: 'Small',
        suitableForIndianClimate: true,
        imageUrl: 'https://www.purina.co.uk/sites/default/files/2024-03/longhaired%20dachshund2-min.jpg?itok=1KhPl2qH',
        group: 'Hound',
        origin: 'Germany',
        weight: '16–32 lbs / 7–14 kg',
        lifespan: '12–16 years',
        whyGoodForIndia: 'Small size suits apartments',
        needs: 'Moderate exercise, avoid jumping (back care)'
      },
      {
        name: 'Chihuahua',
        category: 'Animal',
        animalType: 'Dog',
        description: 'Alert, devoted, and lively. Smallest dog breed.',
        temperament: 'Alert, devoted, lively',
        size: 'Small',
        suitableForIndianClimate: true,
        imageUrl: 'https://cdn.shopify.com/s/files/1/0604/1904/7512/files/Chihuahua_smooth_coated_480x480.jpg?v=1727804528',
        group: 'Toy',
        origin: 'Mexico',
        weight: '2–6 lbs / 1–3 kg',
        lifespan: '14–17 years',
        whyGoodForIndia: 'Tolerates warm climate well',
        needs: 'Minimal exercise'
      },
      {
        name: 'Pomeranian',
        category: 'Animal',
        animalType: 'Dog',
        description: 'Small, fluffy, and energetic. Great apartment dogs.',
        temperament: 'Active, bold, intelligent',
        size: 'Small',
        suitableForIndianClimate: true,
        imageUrl: 'https://cdn.britannica.com/41/233841-050-4FFECCF1/Pomeranian-dog.jpg',
        group: 'Toy',
        origin: 'Germany/Poland',
        weight: '3–7 lbs / 1–3 kg',
        lifespan: '12–16 years',
        whyGoodForIndia: 'Popular in India; manageable size',
        needs: 'Regular grooming'
      },
      {
        name: 'Indian Pariah Dog',
        category: 'Animal',
        animalType: 'Dog',
        description: 'Native Indian breed, highly adaptable and intelligent. Best suited for Indian climate.',
        temperament: 'Intelligent, loyal, independent',
        size: 'Medium',
        suitableForIndianClimate: true,
        imageUrl: 'https://breed-assets.wisdompanel.com/dog/street-dog-india/Indian_Street_Dog1.jpg',
        group: 'Native/Primitive',
        origin: 'India',
        weight: '30–45 lbs / 13–20 kg',
        lifespan: '13–16 years',
        whyGoodForIndia: 'Naturally adapted to Indian climate, very low maintenance, strong immunity',
        needs: 'Basic exercise, minimal grooming'
      },
      {
        name: 'Maltese',
        category: 'Animal',
        animalType: 'Dog',
        description: 'Very affectionate, gentle, loves cuddles. Perfect for apartments.',
        temperament: 'Affectionate, gentle, loving',
        size: 'Small',
        suitableForIndianClimate: true,
        imageUrl: 'https://images.openai.com/static-rsc-3/ngjMp9FQRN-m1ffxylDWxBETlCUTFPe8Vv2zgvrkocvQsnJxxawnxfvUnxjvrWjKW3gDfnMqhBjDKVAm4zu2pu-StLibRF6oKb6Vs13BryY?purpose=fullsize',
        group: 'Toy',
        origin: 'Malta',
        weight: '2–4 kg',
        lifespan: '12–15 years',
        whyGoodForIndia: 'Adapts well to apartments, families, and seniors',
        needs: 'High grooming (long silky white coat needs daily brushing), moderate energy – enjoys short walks and indoor play'
      },
      {
        name: 'Bichon Frise',
        category: 'Animal',
        animalType: 'Dog',
        description: 'Cheerful, friendly, and social. Great with families and kids.',
        temperament: 'Cheerful, friendly, social',
        size: 'Small',
        suitableForIndianClimate: true,
        imageUrl: 'https://images.openai.com/static-rsc-3/D9-QJCictKvy2oy-I5WJeyzlIQ40DCOM0WU83Q90xY3JnYcP6vKMmlWAUgyMduHQrhBzU4MLlGyQgaM9qg-8XBYkPPIE46AoO4fXTJNsF_w?purpose=fullsize',
        group: 'Non-Sporting',
        origin: 'France/Belgium',
        weight: '5–8 kg',
        lifespan: '12–15 years',
        whyGoodForIndia: 'Perfect for families with kids',
        needs: 'High grooming (curly coat needs regular trimming), moderate energy'
      },
      {
        name: 'Lhasa Apso',
        category: 'Animal',
        animalType: 'Dog',
        description: 'Loyal, independent, and loving. Great for calm homes.',
        temperament: 'Loyal, independent, loving',
        size: 'Small',
        suitableForIndianClimate: true,
        imageUrl: 'https://consumer-cms.petfinder.com/sites/default/files/images/content/Lhasa%20apso%204.jpg',
        group: 'Non-Sporting',
        origin: 'Tibet',
        weight: '5–8 kg',
        lifespan: '12–15 years',
        whyGoodForIndia: 'Adapts well to apartments and calm homes',
        needs: 'High grooming (long coat needs brushing), moderate energy'
      },
      {
        name: 'Havanese',
        category: 'Animal',
        animalType: 'Dog',
        description: 'Friendly, social, and playful. Perfect for first-time owners.',
        temperament: 'Friendly, social, playful',
        size: 'Small',
        suitableForIndianClimate: true,
        imageUrl: 'https://pethelpful.com/.image/c_fill%2Cg_faces%3Acenter/MjAxNzk1MTIwODU2MTE0NTkw/havanese-guide.jpg',
        group: 'Toy',
        origin: 'Cuba',
        weight: '4–7 kg',
        lifespan: '14–16 years',
        whyGoodForIndia: 'Great for families and first-time owners',
        needs: 'Moderate to high grooming, moderate energy'
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
