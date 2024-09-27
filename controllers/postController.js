const Post = require("../models/Post");

async function createPost(req, res) {
  const { text } = req.body;
  try {
    const post = new Post({
      user_id: req.user._id,
      text,
    });

    await post.save();

    res.json(post);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
}

async function getPost(req, res) {
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId).populate("user_id", "username");
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // Check if the current user has liked this post
    const userHasLiked = post.liked_by.includes(req.user._id);
    res.json({
      post,
      userHasLiked,
      likes_count: post.likes_count,
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
}

async function getUserPosts(req, res) {
  try {
    const posts = await Post.find({user_id: req.user._id});
    res.status(200).json({
      posts 
    })
  } catch (error) {
    res.status(500).json({
      msg: "Server error" 
    })
  }
}

async function getAllPosts(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    // inefficient for large user
    // const posts = await Post.find().populate('user_id', 'username');

    const posts = await Post.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user", // To flatten the user array
      },
      {
        $project: {
          text: 1, // Fields you want from Post
          likes_count: 1,
          "user.username": 1, // Include only the username from the User
        },
      },
      { $skip: skip },
      { $limit: limit },
    ]);

    const totalPosts = await Post.countDocuments();

    res.json({
      totalPosts,
      currentPage: page,
      totalPages: Math.ceil(totalPosts / limit),
      posts,
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
}

module.exports = {
  getAllPosts,
  getUserPosts,
  createPost,
  getPost
};
