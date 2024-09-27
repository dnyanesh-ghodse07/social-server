const express = require('express');
const { followUser, unfollowUser } = require('../controllers/followerController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/follow', authMiddleware, followUser);
router.post('/unfollow', authMiddleware, unfollowUser);

module.exports = router;