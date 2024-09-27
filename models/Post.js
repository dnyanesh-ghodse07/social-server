const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  likes_count: {
    type: Number,
    default: 0, // total number of likes
  },
  liked_by: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User' // Id's of user who have liked the post
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


// Add index to optimize queries on the liked_by array
PostSchema.index({ liked_by: 1 });

const Post = mongoose.model('Post', PostSchema);



module.exports = Post;
