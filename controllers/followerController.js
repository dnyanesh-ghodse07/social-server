const Follower = require("../models/Follower");

async function followUser(req, res) {
  const { userIdToFollow } = req.body;

  try {
    const existingFollow = await Follower.findOne({
      user_id: req.user._id,
      follower_id: userIdToFollow,
    });

    if (existingFollow) {
      return res.status(400).json({
        msg: "Already follwing the user",
      });
    }

    const follow = new Follower({
      user_id: req.user._id,
      follower_id: userIdToFollow,
    });

    await follow.save();
    res.json({ msg: "User followed successfully" });
  } catch (error) {
    res.status(500).json({ msg: "server error" });
  }
}

async function unfollowUser(req, res) {
  const { userIdToUnfollow } = req.body;

  try {
    await Follower.deleteOne({
      user_id: req.user._id,
      follower_id: userIdToUnfollow,
    });

    res.json({ msg: "User unfollowed successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
}

module.exports = {
  followUser,
  unfollowUser,
};
