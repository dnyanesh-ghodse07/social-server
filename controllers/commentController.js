const Comment = require('../models/Comment'); // Create a Comment model similar to User and Post models

// @desc Comment on a post
exports.commentOnPost = async (req, res) => {
  const { text } = req.body;
  const {postId} = req.params;

  try {
    const comment = new Comment({
      user_id: req.user._id,
      post_id: postId,
      text,
    });

    await comment.save();
    res.json(comment);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// @desc Get comments for a post
exports.getCommentsForPost = async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await Comment.find({ post_id: postId }).populate('user_id', 'username');
    res.json(comments);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
