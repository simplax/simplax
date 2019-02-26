const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogPostSchema = new Schema({
  _creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: { type: String, required: true },
  blogContent: { type: String, required: true }

}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const BlogPost = mongoose.model('BlogPost', blogPostSchema);
module.exports = BlogPost;