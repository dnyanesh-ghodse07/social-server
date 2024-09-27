const express = require("express");
const {
  createPost,
  getAllPosts,
  getPost,
  getUserPosts,
} = require("../controllers/postController");
const { likePost, unlikePost } = require("../controllers/likeController");
const {
  commentOnPost,
  getCommentsForPost,
} = require("../controllers/commentController");
const { repostPost } = require("../controllers/repostController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// @route POST /api/posts
router.post("/", authMiddleware, createPost);

// @route GET /api/posts
router.get("/", getAllPosts);

router.get("/users/:userId", authMiddleware, getUserPosts);

// @route GET /api/posts
router.get("/:postId", authMiddleware, getPost);

// Like a post
router.post("/:postId/like", authMiddleware, likePost);

// Dislike a post
router.post("/:postId/dislike", authMiddleware, unlikePost);

// Repost a post
router.post("/:postId/repost", authMiddleware, repostPost);

// comment on post
router.post("/:postId/comment", authMiddleware, commentOnPost);

router.get("/:postId/comment", authMiddleware, getCommentsForPost);

module.exports = router;
