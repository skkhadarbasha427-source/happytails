const User = require('../models/User');
const Post = require('../models/Post');
const AdoptionRequest = require('../models/AdoptionRequest');
const { uploadImage } = require('../utils/cloudinaryService');
const { validateProfile } = require('../utils/validators');

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateProfile = async (req, res, next) => {
  try {
    const { error } = validateProfile(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const user = await User.findById(req.user.id);
    
    if (req.body.name) user.name = req.body.name;
    
    // Handle profile image upload
    if (req.file) {
      const imageUrl = await uploadImage(req.file.buffer, 'happily-tails/profiles');
      user.profileImage = imageUrl;
    }

    await user.save();

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's posts
// @route   GET /api/users/my-posts
// @access  Private
exports.getMyPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({ userId: req.user.id }).sort('-createdAt');
    
    res.status(200).json({
      success: true,
      count: posts.length,
      posts
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get adoption requests for user's posts
// @route   GET /api/users/adoption-requests
// @access  Private
exports.getAdoptionRequests = async (req, res, next) => {
  try {
    const userPosts = await Post.find({ userId: req.user.id }).select('_id');
    const postIds = userPosts.map(post => post._id);

    const requests = await AdoptionRequest.find({ postId: { $in: postIds } })
      .populate('requesterId', 'name phoneNumber profileImage')
      .populate('postId', 'category description imageUrl')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: requests.length,
      requests
    });
  } catch (error) {
    next(error);
  }
};
