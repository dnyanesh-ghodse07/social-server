const Repost = require('../models/Repost');

// @desc Repost a post
async function repostPost(req, res) {
  const { postId } = req.body;

  try {
    const repost = new Repost({
      user_id: req.user._id,
      original_post_id: postId,
    });

    await repost.save();
    res.json({ msg: 'Post reposted successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = {repostPost};

