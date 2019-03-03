const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const savedProfileSchema = new Schema({
  _owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },

  title:
  {
    type: String,
    required: true,
    unique: true
  },

  parallaxDataCode: {
    type: String,
    required: true
  }
})

const SavedProfile = mongoose.model('SavedProfile', savedProfileSchema);

module.exports = SavedProfile