const mongoose = require('mongoose');

const FollowerSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    follower_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
  });
  
  module.exports = mongoose.model('Follower', FollowerSchema);