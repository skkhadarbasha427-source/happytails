const AdoptionRequest = require('../models/AdoptionRequest');
const Post = require('../models/Post');

// @desc    Create adoption request
// @route   POST /api/adoptions/:postId
// @access  Private
exports.createAdoptionRequest = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    if (post.status === 'Adopted') {
      return res.status(400).json({ success: false, message: 'Pet already adopted' });
    }

    // Can't adopt own post
    if (post.userId.toString() === req.user.id) {
      return res.status(400).json({ success: false, message: 'Cannot adopt your own post' });
    }

    // Check if already requested
    const existingRequest = await AdoptionRequest.findOne({
      postId: req.params.postId,
      requesterId: req.user.id
    });

    if (existingRequest) {
      return res.status(400).json({ success: false, message: 'Already requested adoption' });
    }

    const adoptionRequest = await AdoptionRequest.create({
      postId: req.params.postId,
      requesterId: req.user.id
    });

    res.status(201).json({
      success: true,
      adoptionRequest
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update adoption request status
// @route   PUT /api/adoptions/:id
// @access  Private
exports.updateAdoptionRequest = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!['Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const adoptionRequest = await AdoptionRequest.findById(req.params.id).populate('postId');

    if (!adoptionRequest) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }

    // Check if user owns the post
    if (adoptionRequest.postId.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    adoptionRequest.status = status;
    await adoptionRequest.save();

    // If approved, mark post as adopted
    if (status === 'Approved') {
      adoptionRequest.postId.status = 'Adopted';
      await adoptionRequest.postId.save();
    }

    res.status(200).json({
      success: true,
      adoptionRequest
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's adoption requests
// @route   GET /api/adoptions/my-requests
// @access  Private
exports.getMyRequests = async (req, res, next) => {
  try {
    const requests = await AdoptionRequest.find({ requesterId: req.user.id })
      .populate('postId')
      .populate({
        path: 'postId',
        populate: { path: 'userId', select: 'name phoneNumber' }
      })
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
