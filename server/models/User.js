const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    _github: Number,
    githubUsername: String,
    imageUrl: String

  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
