const Like = require("../models/Like");
const Post = require("../models/Post");

// @desc Like a post
async function likePost(req, res) {
  // const { postId } = req.body;
  console.log(req.params);
  const {postId} = req.params;
  console.log(postId);
  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    //check post liked already
    if (post.liked_by.includes(req.user._id)) {
      return res.status(400).json({ msg: "Post already liked" });
    }

    // Increment the like
    post.likes_count += 1;
    post.liked_by.push(req.user._id);

    await post.save();

    res.json({ msg: "Post liked", likes_count: post.likes_count });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
}

// @desc Unlike a post
async function unlikePost(req, res) {
  // const { postId } = req.body;
  const {postId} = req.params;
  console.log(postId);

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // Check if the user has not liked the post
    if (!post.liked_by.includes(req.user._id)) {
      return res.status(400).json({ msg: "Post has not been liked yet" });
    }

    post.likes_count -= 1;
    post.liked_by = post.liked_by.filter(userId => userId.toString() !== req.user._id.toString());

    await post.save();

    res.json({ msg: "Post unliked", likes_count: post.likes_count });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
}

module.exports = { likePost, unlikePost };
