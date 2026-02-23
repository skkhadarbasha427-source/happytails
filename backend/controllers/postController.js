const Post = require('../models/Post');
const { uploadImage, deleteImage } = require('../utils/cloudinaryService');
const { validatePost } = require('../utils/validators');

// @desc    Create new post
// @route   POST /api/posts
// @access  Private
exports.createPost = async (req, res, next) => {
  try {
    const { error } = validatePost(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload an image' });
    }

    // Upload image to Cloudinary
    const imageUrl = await uploadImage(req.file.buffer, 'happily-tails/posts');

    const post = await Post.create({
      userId: req.user.id,
      category: req.body.category,
      description: req.body.description,
      imageUrl,
      location: {
        latitude: parseFloat(req.body.latitude),
        longitude: parseFloat(req.body.longitude)
      }
    });

    res.status(201).json({
      success: true,
      post
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all posts with filters
// @route   GET /api/posts
// @access  Public
exports.getPosts = async (req, res, next) => {
  try {
    const { category, status, search, lat, lng, radius } = req.query;
    
    let query = {};

    if (category) query.category = category;
    if (status) query.status = status;
    if (search) query.description = { $regex: search, $options: 'i' };

    // Location-based filtering (simple distance calculation)
    if (lat && lng && radius) {
      const latitude = parseFloat(lat);
      const longitude = parseFloat(lng);
      const radiusInDegrees = parseFloat(radius) / 111; // Rough conversion: 1 degree ≈ 111km

      query['location.latitude'] = {
        $gte: latitude - radiusInDegrees,
        $lte: latitude + radiusInDegrees
      };
      query['location.longitude'] = {
        $gte: longitude - radiusInDegrees,
        $lte: longitude + radiusInDegrees
      };
    }

    const posts = await Post.find(query)
      .populate('userId', 'name phoneNumber profileImage')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: posts.length,
      posts
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single post
// @route   GET /api/posts/:id
// @access  Public
exports.getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('userId', 'name phoneNumber profileImage');

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    res.status(200).json({
      success: true,
      post
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private
exports.updatePost = async (req, res, next) => {
  try {
    let post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    // Check ownership
    if (post.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const { description, status } = req.body;
    if (description) post.description = description;
    if (status) post.status = status;

    await post.save();

    res.status(200).json({
      success: true,
      post
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    // Check ownership
    if (post.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    // Delete image from Cloudinary
    await deleteImage(post.imageUrl);

    await post.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
